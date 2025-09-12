<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\PublicAnimalResource;
use App\Models\Animal;

final class PublicAnimalController extends Controller
{
    /**
     * Display the specified animal by slug for public access.
     * Returns animal data without PII of carer.
     */
    public function show(string $slug): PublicAnimalResource
    {
        $animal = Animal::where('slug', $slug)
            ->with(['photos'])
            ->firstOrFail();

        return new PublicAnimalResource($animal);
    }
}
