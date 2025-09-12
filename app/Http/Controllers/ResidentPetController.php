<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\ResidentPet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

final class ResidentPetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        Gate::authorize('viewAny', ResidentPet::class);

        $residentPets = ResidentPet::where('user_id', $request->user()->id)
            ->with(['user'])
            ->get();

        return Inertia::render('resident-pets/index', [
            'residentPets' => $residentPets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('create', ResidentPet::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => ['required', Rule::in(['cat', 'dog', 'other'])],
            'dob' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        ResidentPet::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return redirect()->route('resident-pets.index')->with('success', 'Resident pet added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ResidentPet $residentPet): \Inertia\Response
    {
        Gate::authorize('view', $residentPet);

        $residentPet->load(['user']);

        return Inertia::render('resident-pets/show', [
            'residentPet' => $residentPet,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ResidentPet $residentPet): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('update', $residentPet);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'species' => ['sometimes', 'required', Rule::in(['cat', 'dog', 'other'])],
            'dob' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $residentPet->update($validated);

        return redirect()->route('resident-pets.show', $residentPet)->with('success', 'Resident pet updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResidentPet $residentPet): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('delete', $residentPet);

        $residentPet->delete();

        return redirect()->route('resident-pets.index')->with('success', 'Resident pet deleted successfully.');
    }
}
