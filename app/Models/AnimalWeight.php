<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class AnimalWeight extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'measured_at',
        'weight_kg',
        'notes',
        'recorded_by',
    ];

    protected $casts = [
        'measured_at' => 'datetime',
        'weight_kg' => 'decimal:2',
    ];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
