<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\AnimalResource;
use App\Models\Animal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

final class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Animal::class);

        // List animals assigned to current user
        $animals = Animal::where('foster_carer_id', $request->user()->id)
            ->with(['fosterCarer', 'photos'])
            ->get();

        return AnimalResource::collection($animals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): AnimalResource
    {
        Gate::authorize('create', Animal::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => ['sometimes', Rule::in(['cat', 'dog', 'other'])],
            'dob' => 'nullable|date',
            'sex' => ['sometimes', Rule::in(['male', 'female', 'unknown'])],
            'medical_conditions' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => ['sometimes', Rule::in(['in_foster', 'available', 'adopted'])],
        ]);

        // Assign to current user by default
        $animal = Animal::create([
            'foster_carer_id' => $request->user()->id,
            ...$validated,
        ]);

        $animal->load(['fosterCarer', 'photos']);

        return new AnimalResource($animal);
    }

    /**
     * Display the specified resource.
     */
    public function show(Animal $animal): AnimalResource
    {
        Gate::authorize('view', $animal);

        $animal->load(['fosterCarer', 'photos']);

        return new AnimalResource($animal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Animal $animal): AnimalResource
    {
        Gate::authorize('update', $animal);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'species' => ['sometimes', Rule::in(['cat', 'dog', 'other'])],
            'dob' => 'nullable|date',
            'sex' => ['sometimes', Rule::in(['male', 'female', 'unknown'])],
            'medical_conditions' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => ['sometimes', Rule::in(['in_foster', 'available', 'adopted'])],
            'foster_carer_id' => 'sometimes|nullable|exists:users,id',
        ]);

        $animal->update($validated);
        $animal->load(['fosterCarer', 'photos']);

        return new AnimalResource($animal);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Animal $animal)
    {
        Gate::authorize('delete', $animal);

        $animal->delete(); // Soft delete

        return response()->json(null, 204);
    }
}
