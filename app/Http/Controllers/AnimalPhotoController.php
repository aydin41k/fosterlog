<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\AnimalPhotoResource;
use App\Models\Animal;
use App\Models\AnimalPhoto;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

final class AnimalPhotoController extends Controller
{
    /**
     * Display a listing of photos for an animal.
     */
    public function index(Animal $animal): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', AnimalPhoto::class);

        $photos = $animal->photos()->with('uploadedBy')->get();

        return AnimalPhotoResource::collection($photos);
    }

    /**
     * Store a newly uploaded photo for an animal.
     */
    public function store(Request $request, Animal $animal): AnimalPhotoResource
    {
        Gate::authorize('create', [AnimalPhoto::class, $animal]);

        $validated = $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'caption' => 'nullable|string|max:255',
            'is_primary' => 'nullable|boolean',
        ]);

        // Convert string boolean to actual boolean
        if (isset($validated['is_primary'])) {
            $validated['is_primary'] = filter_var($validated['is_primary'], FILTER_VALIDATE_BOOLEAN);
        }

        // Store the photo in public/animals/{animal_id}/
        $path = $request->file('photo')->store("public/animals/{$animal->id}");

        $animalPhoto = AnimalPhoto::create([
            'animal_id' => $animal->id,
            'uploaded_by' => $request->user()->id,
            'path' => $path,
            'caption' => $validated['caption'] ?? null,
            'is_primary' => $validated['is_primary'] ?? false,
        ]);

        return new AnimalPhotoResource($animalPhoto->fresh(['uploadedBy']));
    }

    /**
     * Update the specified photo (caption and primary status).
     */
    public function update(Request $request, AnimalPhoto $animalPhoto): AnimalPhotoResource
    {
        Gate::authorize('update', $animalPhoto);

        $validated = $request->validate([
            'caption' => 'nullable|string|max:255',
            'is_primary' => 'nullable|boolean',
        ]);

        // Convert string boolean to actual boolean
        if (isset($validated['is_primary'])) {
            $validated['is_primary'] = filter_var($validated['is_primary'], FILTER_VALIDATE_BOOLEAN);
        }

        $animalPhoto->update($validated);

            return new AnimalPhotoResource($animalPhoto->fresh(['uploadedBy']));
    }

    /**
     * Remove the specified photo from storage.
     */
    public function destroy(AnimalPhoto $animalPhoto)
    {
        Gate::authorize('delete', $animalPhoto);

        // Delete the file from storage
        Storage::delete($animalPhoto->path);

        // Delete the record
        $animalPhoto->delete();

        return response()->json(null, 204);
    }
}
