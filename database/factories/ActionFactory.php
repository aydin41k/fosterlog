<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Action>
 */
class ActionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['food', 'medication']);
        
        return [
            'type' => $type,
            'details' => $this->generateDetailsForType($type),
            'performed_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Create a food action.
     */
    public function food(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'food',
            'details' => [
                'amount_g' => $this->faker->numberBetween(50, 500),
                'brand' => $this->faker->optional(0.7)->company,
                'notes' => $this->faker->optional(0.3)->sentence,
            ],
        ]);
    }

    /**
     * Create a medication action.
     */
    public function medication(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'medication',
            'details' => [
                'name' => $this->faker->randomElement(['Heartgard', 'Frontline', 'Metacam', 'Antibiotics']),
                'dose' => $this->faker->randomElement(['5mg', '10mg', '1 tablet', '2ml', '0.5ml']),
                'notes' => $this->faker->optional(0.4)->sentence,
            ],
        ]);
    }

    /**
     * Generate appropriate details based on type.
     */
    private function generateDetailsForType(string $type): array
    {
        if ($type === 'food') {
            return [
                'amount_g' => $this->faker->numberBetween(50, 500),
                'brand' => $this->faker->optional(0.7)->company,
                'notes' => $this->faker->optional(0.3)->sentence,
            ];
        } else { // medication
            return [
                'name' => $this->faker->randomElement(['Heartgard', 'Frontline', 'Metacam', 'Antibiotics']),
                'dose' => $this->faker->randomElement(['5mg', '10mg', '1 tablet', '2ml', '0.5ml']),
                'notes' => $this->faker->optional(0.4)->sentence,
            ];
        }
    }
}
