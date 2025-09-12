<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicAnimalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes for animals
Route::get('/public/animals/{slug}', [PublicAnimalController::class, 'show'])
    ->name('animals.public.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = request()->user();

        // Get animal count for current user
        $animalCount = $user->animals()->count();

        // Get today's actions count
        $todayActions = \App\Models\Action::whereHas('animal', function ($query) use ($user) {
            $query->where('foster_carer_id', $user->id);
        })->whereDate('performed_at', today())->count();

        // Get latest weight recordings (last 5)
        $latestWeights = \App\Models\AnimalWeight::with(['animal'])
            ->whereHas('animal', function ($query) use ($user) {
                $query->where('foster_carer_id', $user->id);
            })
            ->orderBy('measured_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'animals_count' => $animalCount,
                'today_actions' => $todayActions,
                'latest_weights' => $latestWeights,
            ],
        ]);
    })->name('dashboard');

    // Animal management routes
    Route::get('animals', function () {
        $user = request()->user();
        $animals = $user->animals()
            ->with(['photos'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('animals/index', [
            'animals' => $animals,
        ]);
    })->name('animals.index');

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

    // Foster Carer Profile management routes
    Route::put('user/profile', [ProfileController::class, 'updateProfile'])
        ->name('foster.profile.update');
    Route::post('user/profile/photo', [ProfileController::class, 'uploadPhoto'])
        ->name('foster.profile.photo.upload');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
