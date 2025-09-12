<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

final class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        Gate::authorize('viewAny', Animal::class);

        // List animals assigned to current user
        $animals = Animal::where('foster_carer_id', $request->user()->id)
            ->with(['fosterCarer', 'photos'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('animals/index', [
            'animals' => $animals,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
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
        Animal::create([
            'foster_carer_id' => $request->user()->id,
            ...$validated,
        ]);

        return redirect()->route('animals.index')->with('success', 'Animal created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Animal $animal): \Inertia\Response
    {
        Gate::authorize('view', $animal);

        $animal->load(['fosterCarer', 'photos', 'weights', 'actions']);

        // Build plain arrays to avoid `{ data: ... }` wrappers from collections
        $animalArray = (new \App\Http\Resources\AnimalResource($animal))
            ->toArray(request());
        $photosArray = $animal->photos->map(fn ($p) =>
            (new \App\Http\Resources\AnimalPhotoResource($p))->toArray(request())
        );
        $weightsArray = $animal->weights
            ->sortByDesc('measured_at')
            ->values()
            ->map(fn ($w) => (new \App\Http\Resources\AnimalWeightResource($w))->toArray(request()));
        $actionsArray = $animal->actions()
            ->with('performedBy')
            ->orderBy('performed_at', 'desc')
            ->get()
            ->map(fn ($a) => (new \App\Http\Resources\ActionResource($a))->toArray(request()));

        return Inertia::render('animals/show', [
            'animal' => $animalArray,
            'photos' => $photosArray,
            'weights' => $weightsArray,
            'actions' => $actionsArray,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Animal $animal): \Illuminate\Http\RedirectResponse
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

        return redirect()->route('animals.show', $animal)->with('success', 'Animal updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Animal $animal): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('delete', $animal);

        $animal->delete(); // Soft delete

        return redirect()->route('animals.index')->with('success', 'Animal deleted successfully.');
    }

    /**
     * Get photos for a specific animal.
     */
    public function photos(Animal $animal, Request $request): \Inertia\Response|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('view', $animal);
        $photos = $animal->photos()->with('uploadedBy')->orderBy('created_at', 'desc')->get();

        if ($request->expectsJson()) {
            return \App\Http\Resources\AnimalPhotoResource::collection($photos);
        }

        return Inertia::render('animals/photos', [
            'animal' => $animal,
            'photos' => $photos,
        ]);
    }

    /**
     * Get weights for a specific animal.
     */
    public function weights(Animal $animal, Request $request): \Inertia\Response|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('update', $animal);
        $weights = $animal->weights()->with('recordedBy')->orderBy('measured_at', 'desc')->get();

        if ($request->expectsJson()) {
            return \App\Http\Resources\AnimalWeightResource::collection($weights);
        }

        return Inertia::render('animals/weights', [
            'animal' => $animal,
            'weights' => $weights,
        ]);
    }

    /**
     * Store a new weight record for an animal.
     */
    public function storeWeight(Request $request, Animal $animal): \Illuminate\Http\RedirectResponse|\App\Http\Resources\AnimalWeightResource
    {
        Gate::authorize('update', $animal);

        $validated = $request->validate([
            'weight_kg' => 'required|numeric|min:0.01|max:200.00',
            'measured_at' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        $weight = $animal->weights()->create([
            'weight_kg' => $validated['weight_kg'],
            'measured_at' => $validated['measured_at'] ?? now(),
            'notes' => $validated['notes'] ?? null,
            'recorded_by' => $request->user()->id,
        ]);

        if ($request->expectsJson()) {
            return new \App\Http\Resources\AnimalWeightResource($weight->load('recordedBy'));
        }

        return redirect()->route('animals.show', $animal)->with('success', 'Weight record added successfully.');
    }

    /**
     * Get actions for a specific animal.
     */
    public function actions(Animal $animal, Request $request): \Inertia\Response|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        Gate::authorize('update', $animal);

        $query = $animal->actions()->with('performedBy')->orderBy('performed_at', 'desc');

        // Filter by type if provided
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        $actions = $query->get();

        if ($request->expectsJson()) {
            return \App\Http\Resources\ActionResource::collection($actions);
        }

        return Inertia::render('animals/actions', [
            'animal' => $animal,
            'actions' => $actions,
            'filter_type' => $request->get('type', 'all'),
        ]);
    }

    /**
     * Store a new action for an animal.
     */
    public function storeAction(Request $request, Animal $animal): \Illuminate\Http\RedirectResponse|\App\Http\Resources\ActionResource
    {
        Gate::authorize('update', $animal);

        $validated = $request->validate([
            'type' => 'required|in:food,medication,exercise,medical,veterinary,other',
            'details' => 'required|array',
            'performed_at' => 'nullable|date',
        ]);

        // Additional validation based on action type
        if ($validated['type'] === 'food') {
            $request->validate([
                'details.amount_g' => 'required|numeric|min:0.01|max:10000',
            ]);
        } elseif ($validated['type'] === 'medication') {
            $request->validate([
                'details.name' => 'required|string|max:255',
                'details.dose' => 'required|string|max:255',
            ]);
        }

        $action = $animal->actions()->create([
            'type' => $validated['type'],
            'details' => $validated['details'],
            'performed_at' => $validated['performed_at'] ?? now(),
            'performed_by' => $request->user()->id,
        ]);

        if ($request->expectsJson()) {
            return new \App\Http\Resources\ActionResource($action->load('performedBy'));
        }

        return redirect()->route('animals.show', $animal)->with('success', 'Action recorded successfully.');
    }
}
