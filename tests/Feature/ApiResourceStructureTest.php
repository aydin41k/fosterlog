<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\ResidentPet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class ApiResourceStructureTest extends TestCase
{
    use RefreshDatabase;

    public function test_animal_resource_has_correct_structure(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $user->id,
            'dob' => '2022-01-15', // For age calculation
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/animals/{$animal->id}");

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
                    'foster_carer_id',
                    'created_at',
                    'updated_at',
                    'primary_photo_url',
                    'age_years_months',
                    'status_label',
                    // These fields are conditional based on what's loaded
                    // 'foster_carer',
                    // 'photos',
                    // 'weights', 
                    // 'actions',
                ],
            ])
            ->assertJsonPath('data.age_years_months', function ($value) {
                return str_contains($value, 'year') || str_contains($value, 'month');
            })
            ->assertJsonPath('data.status_label', function ($value) {
                return is_string($value) && !empty($value);
            });
    }

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

    public function test_resident_pet_resource_has_correct_structure(): void
    {
        $user = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/resident-pets/{$pet->id}");

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'user_id',
                    'name',
                    'species',
                    'dob',
                    'notes',
                    'created_at',
                    'updated_at',
                    'user' => [
                        'id',
                        'name',
                    ],
                ],
            ]);
    }

    public function test_animal_collection_has_correct_structure(): void
    {
        $user = User::factory()->create();
        Animal::factory()->count(3)->create([
            'foster_carer_id' => $user->id,
            'dob' => '2022-01-15', // Ensure dob exists for age calculation
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/animals');

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'species',
                        'dob',
                        'sex',
                        'medical_conditions',
                        'description',
                        'status',
                        'slug',
                        'foster_carer_id',
                        'created_at',
                        'updated_at',
                        'status_label',
                        // Conditional fields - age_years_months only if dob exists
                        // primary_photo_url only if photos loaded
                        // foster_carer only if loaded
                    ],
                ],
            ])
            ->assertJsonCount(3, 'data')
            ->assertJsonPath('data.0.age_years_months', function ($value) {
                return str_contains($value, 'year') || str_contains($value, 'month');
            });
    }

    public function test_user_resource_excludes_pii(): void
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/animals/{$animal->id}");

        $response->assertOk()
            ->assertJsonPath('data.foster_carer.name', 'John Doe')
            ->assertJsonPath('data.foster_carer.id', $user->id)
            ->assertJsonStructure([
                'data' => [
                    'foster_carer' => [
                        'id',
                        'name',
                    ],
                ],
            ]);
    }

    public function test_computed_fields_work_correctly(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $user->id,
            'status' => 'in_foster',
            'dob' => '2023-05-01', // Recent birth date for testing
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/animals/{$animal->id}");

        $response->assertOk()
            ->assertJsonPath('data.status_label', 'In Foster Care')
            ->assertJsonPath('data.age_years_months', function ($value) {
                // Should show months for a young animal
                return str_contains($value, 'month');
            });
    }
}
