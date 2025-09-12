<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\AnimalWeightResource;
use App\Models\Animal;
use App\Models\AnimalWeight;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

final class AnimalWeightController extends Controller
{
    /**
     * Display a listing of weight records for an animal.
     */
    public function index(Animal $animal): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', AnimalWeight::class);
        
        // Only allow viewing weights for animals assigned to current user
        if (request()->user()->id !== $animal->foster_carer_id) {
            abort(403);
        }

        $weights = $animal->weights()
            ->with('recordedBy:id,name')
            ->orderBy('measured_at', 'desc')
            ->get();

        return AnimalWeightResource::collection($weights);
    }

    /**
     * Store a newly created weight record.
     */
    public function store(Request $request, Animal $animal): AnimalWeightResource
    {
        Gate::authorize('create', [AnimalWeight::class, $animal]);

        $validated = $request->validate([
            'weight_kg' => 'required|numeric|min:0.01|max:200.00',
            'measured_at' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        $animalWeight = AnimalWeight::create([
            'animal_id' => $animal->id,
            'recorded_by' => $request->user()->id,
            'measured_at' => $validated['measured_at'] ?? now(),
            'weight_kg' => $validated['weight_kg'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return new AnimalWeightResource($animalWeight->load('recordedBy:id,name'));
    }

    /**
     * Remove the specified weight record.
     */
    public function destroy(AnimalWeight $animalWeight)
    {
        Gate::authorize('delete', $animalWeight);

        $animalWeight->delete();

        return response()->json(null, 204);
    }
}
