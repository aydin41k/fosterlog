<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Animal;
use App\Models\AnimalWeight;
use App\Models\User;

final class AnimalWeightPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Authenticated users can view weights
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AnimalWeight $animalWeight): bool
    {
        return $user->id === $animalWeight->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can create models for an animal.
     */
    public function create(User $user, Animal $animal): bool
    {
        return $user->id === $animal->foster_carer_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, AnimalWeight $animalWeight): bool
    {
        return $user->id === $animalWeight->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AnimalWeight $animalWeight): bool
    {
        return $user->id === $animalWeight->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AnimalWeight $animalWeight): bool
    {
        return $user->id === $animalWeight->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AnimalWeight $animalWeight): bool
    {
        return $user->id === $animalWeight->animal->foster_carer_id;
    }
}
