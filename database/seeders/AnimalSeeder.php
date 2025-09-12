<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Database\Seeder;

final class AnimalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users and create some animals for them
        $users = User::all();
        
        foreach ($users as $user) {
            Animal::factory()
                ->count(rand(2, 5))
                ->create(['foster_carer_id' => $user->id]);
        }

        // Create some animals without foster carers (available for adoption)
        Animal::factory()
            ->count(3)
            ->create([
                'foster_carer_id' => null,
                'status' => 'available',
            ]);
    }
}
