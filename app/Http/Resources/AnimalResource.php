<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class AnimalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'species' => $this->species,
            'dob' => $this->dob?->format('Y-m-d'),
            'sex' => $this->sex,
            'medical_conditions' => $this->medical_conditions,
            'description' => $this->description,
            'status' => $this->status,
            'slug' => $this->slug,
            'foster_carer_id' => $this->foster_carer_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Computed fields
            'primary_photo_url' => $this->when($this->relationLoaded('photos'), function () {
                $primaryPhoto = $this->primaryPhoto();
                return $primaryPhoto ? $primaryPhoto->url : null;
            }),
            'age_years_months' => $this->when($this->dob, function () {
                return $this->getAgeYearsMonths();
            }),
            'status_label' => $this->getStatusLabel(),
            
            // Relationships
            'foster_carer' => $this->when($this->relationLoaded('fosterCarer'), function () {
                return new UserResource($this->fosterCarer);
            }),
            'photos' => $this->when($this->relationLoaded('photos'), function () {
                return AnimalPhotoResource::collection($this->photos);
            }),
            'weights' => $this->when($this->relationLoaded('weights'), function () {
                return AnimalWeightResource::collection($this->weights);
            }),
            'actions' => $this->when($this->relationLoaded('actions'), function () {
                return ActionResource::collection($this->actions);
            }),
        ];
    }

    /**
     * Calculate approximate age in years and months.
     */
    private function getAgeYearsMonths(): ?string
    {
        if (!$this->dob) {
            return null;
        }

        $dob = Carbon::parse($this->dob);
        $now = Carbon::now();
        
        $years = $dob->diffInYears($now);
        $months = $dob->copy()->addYears($years)->diffInMonths($now);
        
        if ($years === 0) {
            return $months === 1 ? '1 month' : "{$months} months";
        }
        
        if ($months === 0) {
            return $years === 1 ? '1 year' : "{$years} years";
        }
        
        $yearText = $years === 1 ? 'year' : 'years';
        $monthText = $months === 1 ? 'month' : 'months';
        
        return "{$years} {$yearText}, {$months} {$monthText}";
    }

    /**
     * Get human-readable status label.
     */
    private function getStatusLabel(): string
    {
        if (!$this->status) {
            return 'Unknown';
        }

        return match ($this->status) {
            'in_foster' => 'In Foster Care',
            'available' => 'Available for Adoption',
            'adopted' => 'Adopted',
            default => ucfirst(str_replace('_', ' ', $this->status)),
        };
    }
}
