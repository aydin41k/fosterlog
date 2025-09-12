<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\ResidentPet;
use App\Models\User;

final class ResidentPetPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Users can view their own resident pets
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ResidentPet $residentPet): bool
    {
        return $user->id === $residentPet->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // Authenticated users can create resident pets
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ResidentPet $residentPet): bool
    {
        return $user->id === $residentPet->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ResidentPet $residentPet): bool
    {
        return $user->id === $residentPet->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ResidentPet $residentPet): bool
    {
        return $user->id === $residentPet->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ResidentPet $residentPet): bool
    {
        return $user->id === $residentPet->user_id;
    }
}
