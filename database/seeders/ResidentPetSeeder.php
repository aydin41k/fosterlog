<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\ResidentPet;
use App\Models\User;
use Illuminate\Database\Seeder;

final class ResidentPetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users and create some resident pets for them
        $users = User::all();
        
        foreach ($users as $user) {
            ResidentPet::factory()
                ->count(rand(1, 3))
                ->create(['user_id' => $user->id]);
        }
    }
}
