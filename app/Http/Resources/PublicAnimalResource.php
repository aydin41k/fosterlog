<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class PublicAnimalResource extends JsonResource
{
    /**
     * Transform the resource into an array for public access.
     * Excludes foster carer PII and sensitive information.
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
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Publicly safe foster parent display name when relation is loaded
            'foster_parent_name' => $this->when($this->relationLoaded('fosterCarer'), function () {
                return $this->fosterCarer?->name;
            }),
            
            // Computed fields
            'primary_photo_url' => $this->when($this->relationLoaded('photos'), function () {
                $primaryPhoto = $this->primaryPhoto();
                return $primaryPhoto ? $primaryPhoto->url : null;
            }),
            'age_years_months' => $this->when($this->dob, function () {
                return $this->getAgeYearsMonths();
            }),
            'status_label' => $this->getStatusLabel(),
            // Latest weight in kg when relation is available
            'latest_weight_kg' => $this->when($this->relationLoaded('weights'), function () {
                $latest = $this->weights->sortByDesc('measured_at')->first();
                return $latest ? $latest->weight_kg : null;
            }),
            
            // Public photos (no upload info)
            'photos' => $this->when($this->relationLoaded('photos'), function () {
                return $this->photos->map(function ($photo) {
                    return [
                        'id' => $photo->id,
                        'url' => $photo->url,
                        'caption' => $photo->caption,
                        'is_primary' => $photo->is_primary,
                    ];
                });
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

        // Mirror AnimalResource formatting: weeks for very young, months up to ~2 years, then years
        $days = $dob->copy()->diffInDays($now);

        if ($days < 84) { // under 12 weeks
            $weeks = (int) floor($dob->copy()->diffInWeeks($now));
            return $weeks === 1 ? '1 week old' : "{$weeks} weeks old";
        }

        if ($days < 730) { // under 2 years
            $months = (int) floor($dob->copy()->diffInMonths($now));
            if ($months > 11) {
                $years = (int) floor($dob->copy()->diffInYears($now));
                $yearOld = $years === 1 ? '1 year old' : "{$years} years old";
                $months -= 12;
                if (!$months) {
                    return $yearOld;
                }
                $monthOld = $months === 1 ? '1 month old' : "{$months} months old";
                return "{$yearOld}, {$monthOld}";
            }
            return $months === 1 ? '1 month old' : "{$months} months old";
        }

        return floor($dob->copy()->diffInYears($now)) . ' years old';
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
