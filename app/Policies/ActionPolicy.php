<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Action;
use App\Models\Animal;
use App\Models\User;

final class ActionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Authenticated users can view actions
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Action $action): bool
    {
        return $user->id === $action->animal->foster_carer_id;
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
    public function update(User $user, Action $action): bool
    {
        return $user->id === $action->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Action $action): bool
    {
        return $user->id === $action->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Action $action): bool
    {
        return $user->id === $action->animal->foster_carer_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Action $action): bool
    {
        return $user->id === $action->animal->foster_carer_id;
    }
}
