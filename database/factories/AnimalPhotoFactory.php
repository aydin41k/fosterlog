<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnimalPhoto>
 */
class AnimalPhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'path' => 'public/animals/1/test-photo.jpg',
            'caption' => $this->faker->optional(0.7)->sentence(),
            'is_primary' => false,
        ];
    }
}
