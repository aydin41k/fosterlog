<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

final class Animal extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'species',
        'dob',
        'sex',
        'medical_conditions',
        'description',
        'status',
        'foster_carer_id',
    ];

    protected $casts = [
        'dob' => 'date',
    ];

    protected static function booted(): void
    {
        static::creating(function (Animal $animal) {
            if (empty($animal->slug)) {
                $animal->slug = $animal->generateUniqueSlug($animal->name);
            }
        });

        static::updating(function (Animal $animal) {
            if ($animal->isDirty('name')) {
                $animal->slug = $animal->generateUniqueSlug($animal->name);
            }
        });
    }

    public function fosterCarer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'foster_carer_id');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(AnimalPhoto::class);
    }

    public function primaryPhoto(): ?AnimalPhoto
    {
        return $this->photos()->where('is_primary', true)->first();
    }

    public function weights(): HasMany
    {
        return $this->hasMany(AnimalWeight::class);
    }

    public function actions(): HasMany
    {
        return $this->hasMany(Action::class);
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->where('status', 'available');
    }

    protected function generateUniqueSlug(string $name): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 1;

        while (static::where('slug', $slug)->where('id', '!=', $this->id ?? 0)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    // Only use slug for route key in specific contexts - API uses ID by default
}
