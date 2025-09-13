<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\PublicAnimalResource;
use App\Models\Animal;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    /**
     * Public gallery of cats in foster care (and available).
     */
    public function gallery(): \Inertia\Response
    {
        $cats = Animal::query()
            ->where('species', 'cat')
            ->whereIn('status', ['in_foster', 'available'])
            ->with(['photos', 'weights'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Map to public resource arrays for the gallery
        $catsArray = $cats->map(function ($cat) {
            /** @var \App\Models\Animal $cat */
            return (new PublicAnimalResource($cat))->toArray(request());
        });

        return Inertia::render('public/cats/index', [
            'cats' => $catsArray,
        ]);
    }

    /**
     * Public details page for a specific cat by slug.
     */
    public function details(string $slug): \Inertia\Response
    {
        $animal = Animal::where('slug', $slug)
            ->where('species', 'cat')
            ->with(['photos', 'weights', 'actions']) // do not load user relations to avoid PII
            ->firstOrFail();

        $animalArray = (new PublicAnimalResource($animal))->toArray(request());

        // Build weights and actions arrays without user relations
        $weightsArray = $animal->weights
            ->sortByDesc('measured_at')
            ->values()
            ->map(fn ($w) => (new \App\Http\Resources\AnimalWeightResource($w))->toArray(request()));

        $actionsArray = $animal->actions()
            ->orderBy('performed_at', 'desc')
            ->get()
            ->map(fn ($a) => (new \App\Http\Resources\ActionResource($a))->toArray(request()));

        return Inertia::render('public/cats/show', [
            'animal' => $animalArray,
            'weights' => $weightsArray,
            'actions' => $actionsArray,
        ]);
    }
}
