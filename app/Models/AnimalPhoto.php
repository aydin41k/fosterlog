<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

final class AnimalPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'uploaded_by',
        'path',
        'caption',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    protected $appends = [
        'url',
    ];

    protected static function booted(): void
    {
        static::creating(function (AnimalPhoto $photo) {
            if ($photo->is_primary) {
                // Unset any existing primary photo for this animal
                static::where('animal_id', $photo->animal_id)
                    ->where('is_primary', true)
                    ->update(['is_primary' => false]);
            }
        });

        static::updating(function (AnimalPhoto $photo) {
            if ($photo->isDirty('is_primary') && $photo->is_primary) {
                // Unset any existing primary photo for this animal
                static::where('animal_id', $photo->animal_id)
                    ->where('id', '!=', $photo->id)
                    ->where('is_primary', true)
                    ->update(['is_primary' => false]);
            }
        });
    }

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function getUrlAttribute(): string
    {
        // Prefer a host-agnostic relative URL to avoid APP_URL mismatches in dev
        // Storage::url('public/animals/7/foo.jpg') => '/storage/animals/7/foo.jpg'
        $path = $this->path;
        $relative = '/storage/' . ltrim(str_replace('public/', '', $path), '/');
        return $relative;
    }
}
