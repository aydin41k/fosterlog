<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\AnimalPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

final class AnimalPhotoController extends Controller
{
    /**
     * Display a listing of photos for an animal.
     */
    public function index(Animal $animal): \Inertia\Response
    {
        Gate::authorize('view', $animal);

        $photos = $animal->photos()->with('uploadedBy')->get();

        return Inertia::render('animals/photos', [
            'animal' => $animal,
            'photos' => $photos,
        ]);
    }

    /**
     * Store a newly uploaded photo for an animal.
     */
    public function store(Request $request, Animal $animal): \Illuminate\Http\RedirectResponse|\App\Http\Resources\AnimalPhotoResource
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

        // Store the photo on the public disk in animals/{animal_id}/
        // This ensures files are under storage/app/public and served via /storage
        $path = $request->file('photo')->store("animals/{$animal->id}", 'public');

        $photo = AnimalPhoto::create([
            'animal_id' => $animal->id,
            'uploaded_by' => $request->user()->id,
            // Store normalized path without the "public/" prefix
            'path' => $path,
            'caption' => $validated['caption'] ?? null,
            'is_primary' => $validated['is_primary'] ?? false,
        ]);

        if ($request->expectsJson()) {
            return new \App\Http\Resources\AnimalPhotoResource($photo->load('uploadedBy'));
        }

        return redirect()->route('animals.show', $animal)->with('success', 'Photo uploaded successfully.');
    }

    /**
     * Update the specified photo (caption and primary status).
     */
    public function update(Request $request, AnimalPhoto $animalPhoto): \Illuminate\Http\RedirectResponse|\App\Http\Resources\AnimalPhotoResource
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

        if ($request->expectsJson()) {
            return new \App\Http\Resources\AnimalPhotoResource($animalPhoto->load('uploadedBy'));
        }

        return redirect()->route('animals.show', $animalPhoto->animal)->with('success', 'Photo updated successfully.');
    }

    /**
     * Remove the specified photo from storage.
     */
    public function destroy(Request $request, AnimalPhoto $animalPhoto): \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
    {
        Gate::authorize('delete', $animalPhoto);

        // Delete the file from the public disk. Normalize in case legacy paths contain 'public/'.
        $relativePath = ltrim(str_replace('public/', '', $animalPhoto->path), '/');
        Storage::disk('public')->delete($relativePath);

        // Delete the record
        $animalPhoto->delete();

        if ($request->expectsJson()) {
            return response()->noContent();
        }

        return redirect()->route('animals.show', $animalPhoto->animal)->with('success', 'Photo deleted successfully.');
    }
}
