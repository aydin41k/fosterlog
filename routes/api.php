<?php

declare(strict_types=1);

use App\Http\Controllers\ActionController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AnimalPhotoController;
use App\Http\Controllers\AnimalWeightController;
use App\Http\Controllers\ResidentPetController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('resident-pets', ResidentPetController::class);
    Route::apiResource('animals', AnimalController::class);
    
    // Animal photo routes
    Route::get('animals/{animal}/photos', [AnimalPhotoController::class, 'index']);
    Route::post('animals/{animal}/photos', [AnimalPhotoController::class, 'store']);
    Route::put('animal-photos/{animalPhoto}', [AnimalPhotoController::class, 'update']);
    Route::delete('animal-photos/{animalPhoto}', [AnimalPhotoController::class, 'destroy']);
    
    // Animal weight routes
    Route::get('animals/{animal}/weights', [AnimalWeightController::class, 'index']);
    Route::post('animals/{animal}/weights', [AnimalWeightController::class, 'store']);
    Route::delete('animal-weights/{animalWeight}', [AnimalWeightController::class, 'destroy']);
    
    // Animal action routes
    Route::get('animals/{animal}/actions', [ActionController::class, 'index']);
    Route::post('animals/{animal}/actions', [ActionController::class, 'store']);
    Route::delete('actions/{action}', [ActionController::class, 'destroy']);
});
