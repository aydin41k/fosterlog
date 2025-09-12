<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Animal;
use App\Models\AnimalPhoto;
use App\Models\User;

final class AnimalPhotoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Authenticated users can view photos
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AnimalPhoto $animalPhoto): bool
    {
        return true; // All authenticated users can view photos
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
    public function update(User $user, AnimalPhoto $animalPhoto): bool
    {
        return $user->id === $animalPhoto->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AnimalPhoto $animalPhoto): bool
    {
        return $user->id === $animalPhoto->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AnimalPhoto $animalPhoto): bool
    {
        return $user->id === $animalPhoto->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AnimalPhoto $animalPhoto): bool
    {
        return $user->id === $animalPhoto->animal->foster_carer_id;
    }
}
