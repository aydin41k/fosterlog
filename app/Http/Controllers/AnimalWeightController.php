<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalWeight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

final class AnimalWeightController extends Controller
{
    /**
     * Display a listing of weight records for an animal.
     */
    public function index(Animal $animal): \Inertia\Response
    {
        Gate::authorize('view', $animal);

        $weights = $animal->weights()
            ->with('recordedBy:id,name')
            ->orderBy('measured_at', 'desc')
            ->get();

        return Inertia::render('animals/weights', [
            'animal' => $animal,
            'weights' => $weights,
        ]);
    }

    /**
     * Store a newly created weight record.
     */
    public function store(Request $request, Animal $animal): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('create', [AnimalWeight::class, $animal]);

        $validated = $request->validate([
            'weight_kg' => 'required|numeric|min:0.01|max:200.00',
            'measured_at' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        AnimalWeight::create([
            'animal_id' => $animal->id,
            'recorded_by' => $request->user()->id,
            'measured_at' => $validated['measured_at'] ?? now(),
            'weight_kg' => $validated['weight_kg'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()->route('animals.show', $animal)->with('success', 'Weight record added successfully.');
    }

    /**
     * Remove the specified weight record.
     */
    public function destroy(AnimalWeight $animalWeight): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('delete', $animalWeight);

        $animalWeight->delete();

        return redirect()->route('animals.show', $animalWeight->animal)->with('success', 'Weight record deleted successfully.');
    }
}
