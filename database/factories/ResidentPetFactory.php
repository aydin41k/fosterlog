<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ResidentPet>
 */
class ResidentPetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $species = $this->faker->randomElement(['cat', 'dog', 'other']);
        
        return [
            'name' => $this->faker->firstName(),
            'species' => $species,
            'dob' => $this->faker->optional(0.8)->dateTimeBetween('-15 years', '-1 month')?->format('Y-m-d'),
            'notes' => $this->faker->optional(0.6)->sentence(),
        ];
    }
}
