<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AnimalPhotoController;
use App\Http\Controllers\AnimalWeightController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicAnimalController;
use App\Http\Controllers\ResidentPetController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes for animals
Route::get('/public/animals/{slug}', [PublicAnimalController::class, 'show'])
    ->name('animals.public.show');

// Public-facing adoption pages
Route::get('/adopt/cats', [PublicAnimalController::class, 'gallery'])->name('public.cats.gallery');
Route::get('/adopt/cats/{slug}', [PublicAnimalController::class, 'details'])->name('public.cats.details');

Route::middleware(['auth', 'verified'])->group(function () {
    // Keep the dashboard route for compatibility, but redirect to Pets (Animals index)
    Route::get('dashboard', function () {
        return redirect()->route('animals.index');
    })->name('dashboard');

    // Animal management routes
    Route::get('animals', [AnimalController::class, 'index'])->name('animals.index');

    Route::get('animals/create', function () {
        return Inertia::render('animals/create');
    })->name('animals.create');

    Route::get('animals/{animal}/edit', function (\App\Models\Animal $animal) {
        // Authorize that the user owns this animal
        \Illuminate\Support\Facades\Gate::authorize('update', $animal);

        return Inertia::render('animals/edit', [
            'animal' => $animal->load(['photos']),
        ]);
    })->name('animals.edit');

    Route::get('animals/{animal}', [AnimalController::class, 'show'])->name('animals.show');

    // Resident pet routes
    Route::resource('resident-pets', ResidentPetController::class);

    // Additional animal routes (CRUD operations)
    Route::post('animals', [AnimalController::class, 'store'])->name('animals.store');
    Route::put('animals/{animal}', [AnimalController::class, 'update'])->name('animals.update');
    Route::delete('animals/{animal}', [AnimalController::class, 'destroy'])->name('animals.destroy');

    // Animal photo routes
    Route::post('animals/{animal}/photos', [AnimalPhotoController::class, 'store'])->name('animals.photos.store');
    Route::put('animal-photos/{animalPhoto}', [AnimalPhotoController::class, 'update'])->name('animal-photos.update');
    Route::delete('animal-photos/{animalPhoto}', [AnimalPhotoController::class, 'destroy'])->name('animal-photos.destroy');

    // Animal weight routes
    Route::post('animals/{animal}/weights', [AnimalController::class, 'storeWeight'])->name('animals.weights.store');
    Route::delete('animal-weights/{animalWeight}', [AnimalWeightController::class, 'destroy'])->name('animal-weights.destroy');

    // Animal action routes
    Route::post('animals/{animal}/actions', [AnimalController::class, 'storeAction'])->name('animals.actions.store');
    Route::delete('actions/{action}', [ActionController::class, 'destroy'])->name('actions.destroy');

    // Additional animal view routes
    Route::get('animals/{animal}/photos', [AnimalController::class, 'photos'])->name('animals.photos');
    Route::get('animals/{animal}/weights', [AnimalController::class, 'weights'])->name('animals.weights');
    Route::get('animals/{animal}/actions', [AnimalController::class, 'actions'])->name('animals.actions');

    // Foster Carer Profile management routes
    Route::put('user/profile', [ProfileController::class, 'updateProfile'])
        ->name('foster.profile.update');
    Route::post('user/profile/photo', [ProfileController::class, 'uploadPhoto'])
        ->name('foster.profile.photo.upload');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
