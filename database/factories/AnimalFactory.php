<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Animal>
 */
class AnimalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $species = $this->faker->randomElement(['cat', 'dog', 'other']);
        $sex = $this->faker->randomElement(['male', 'female', 'unknown']);
        $status = $this->faker->randomElement(['in_foster', 'available', 'adopted']);
        
        return [
            'name' => $this->faker->firstName(),
            'species' => $species,
            'dob' => $this->faker->optional(0.8)->dateTimeBetween('-10 years', '-1 month')?->format('Y-m-d'),
            'sex' => $sex,
            'medical_conditions' => $this->faker->optional(0.3)->sentence(),
            'description' => $this->faker->optional(0.7)->paragraph(),
            'status' => $status,
        ];
    }
}
