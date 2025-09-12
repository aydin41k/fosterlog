<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnimalWeight>
 */
class AnimalWeightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'measured_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'weight_kg' => $this->faker->randomFloat(2, 0.5, 50.0), // Between 0.5kg and 50kg
            'notes' => $this->faker->optional(0.4)->sentence(),
        ];
    }
}
