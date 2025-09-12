<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ApiResourceStructureTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the public animal endpoint returns correct JSON structure without PII.
     * This is the only API endpoint that remains after migrating to web routes.
     */
    public function test_public_animal_resource_excludes_pii(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $user->id,
            'dob' => '2021-06-01',
        ]);

        $response = $this->getJson("/public/animals/{$animal->slug}");

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'species',
                    'dob',
                    'sex',
                    'medical_conditions',
                    'description',
                    'status',
                    'slug',
                    'created_at',
                    'updated_at',
                    'primary_photo_url',
                    'age_years_months',
                    'status_label',
                    'photos',
                ],
            ])
            ->assertJsonMissing(['foster_carer_id'])
            ->assertJsonMissing(['foster_carer'])
            ->assertJsonPath('data.age_years_months', function ($value) {
                return str_contains($value, 'year') || str_contains($value, 'month');
            });
    }
}
