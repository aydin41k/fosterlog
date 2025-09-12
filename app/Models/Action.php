<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ActionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Action extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'performed_by',
        'type',
        'details',
        'performed_at',
    ];

    protected $casts = [
        'type' => ActionType::class,
        'details' => 'array',
        'performed_at' => 'datetime',
    ];

    public function animal(): BelongsTo
    {
        return $this->belongsTo(Animal::class);
    }

    public function performedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'performed_by');
    }
}
