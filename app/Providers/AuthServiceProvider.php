<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Action;
use App\Models\Animal;
use App\Models\AnimalPhoto;
use App\Models\AnimalWeight;
use App\Models\ResidentPet;
use App\Policies\ActionPolicy;
use App\Policies\AnimalPhotoPolicy;
use App\Policies\AnimalPolicy;
use App\Policies\AnimalWeightPolicy;
use App\Policies\ResidentPetPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

final class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Animal::class => AnimalPolicy::class,
        AnimalPhoto::class => AnimalPhotoPolicy::class,
        AnimalWeight::class => AnimalWeightPolicy::class,
        Action::class => ActionPolicy::class,
        ResidentPet::class => ResidentPetPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Define additional gates if needed
        Gate::define('view-any-animal', function ($user) {
            return true; // Carers can view any animal
        });
    }
}
