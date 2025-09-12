<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\ResidentPetResource;
use App\Models\ResidentPet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

final class ResidentPetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', ResidentPet::class);

        $residentPets = ResidentPet::where('user_id', $request->user()->id)
            ->with(['user'])
            ->get();

        return ResidentPetResource::collection($residentPets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): ResidentPetResource
    {
        Gate::authorize('create', ResidentPet::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => ['required', Rule::in(['cat', 'dog', 'other'])],
            'dob' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $residentPet = ResidentPet::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        $residentPet->load(['user']);

        return new ResidentPetResource($residentPet);
    }

    /**
     * Display the specified resource.
     */
    public function show(ResidentPet $residentPet): ResidentPetResource
    {
        Gate::authorize('view', $residentPet);

        $residentPet->load(['user']);

        return new ResidentPetResource($residentPet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ResidentPet $residentPet): ResidentPetResource
    {
        Gate::authorize('update', $residentPet);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'species' => ['sometimes', 'required', Rule::in(['cat', 'dog', 'other'])],
            'dob' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $residentPet->update($validated);

        $residentPet->load(['user']);

        return new ResidentPetResource($residentPet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResidentPet $residentPet)
    {
        Gate::authorize('delete', $residentPet);

        $residentPet->delete();

        return response()->json(null, 204);
    }
}
