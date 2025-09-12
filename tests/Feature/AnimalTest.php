<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class AnimalTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_their_animals(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        
        $userAnimals = Animal::factory()->count(2)->create(['foster_carer_id' => $user->id]);
        $otherUserAnimals = Animal::factory()->count(1)->create(['foster_carer_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/animals');

        $response->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.foster_carer_id', $user->id)
            ->assertJsonPath('data.1.foster_carer_id', $user->id);
    }

    public function test_authenticated_user_can_create_animal(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $animalData = [
            'name' => 'Fluffy',
            'species' => 'cat',
            'dob' => '2020-01-15',
            'sex' => 'female',
            'medical_conditions' => 'None',
            'description' => 'Very friendly cat',
            'status' => 'in_foster',
        ];

        $response = $this->postJson('/api/animals', $animalData);

        $response->assertCreated()
            ->assertJsonPath('data.name', 'Fluffy')
            ->assertJsonPath('data.species', 'cat')
            ->assertJsonPath('data.foster_carer_id', $user->id);

        $this->assertDatabaseHas('animals', [
            'name' => 'Fluffy',
            'species' => 'cat',
            'foster_carer_id' => $user->id,
        ]);
    }

    public function test_slug_is_auto_generated_from_name(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/animals', [
            'name' => 'Test Animal Name',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.slug', 'test-animal-name');
    }

    public function test_slug_uniqueness_is_enforced(): void
    {
        $user = User::factory()->create();
        
        // Create first animal
        Animal::factory()->create([
            'name' => 'Duplicate Name',
            'slug' => 'duplicate-name',
            'foster_carer_id' => $user->id,
        ]);

        Sanctum::actingAs($user);

        // Create second animal with same name
        $response = $this->postJson('/api/animals', [
            'name' => 'Duplicate Name',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.slug', 'duplicate-name-1');
    }

    public function test_carer_can_view_any_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/animals/{$animal->id}");

        $response->assertOk()
            ->assertJsonPath('data.id', $animal->id)
            ->assertJsonPath('data.foster_carer_id', $otherUser->id);
    }

    public function test_carer_can_only_update_their_own_animals(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $otherAnimal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        // Can update own animal
        $response = $this->putJson("/api/animals/{$animal->id}", [
            'name' => 'Updated Name',
        ]);
        $response->assertOk();

        // Cannot update other user's animal
        $response = $this->putJson("/api/animals/{$otherAnimal->id}", [
            'name' => 'Hacked Name',
        ]);
        $response->assertForbidden();
    }

    public function test_carer_can_only_delete_their_own_animals(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $otherAnimal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        // Can delete own animal
        $response = $this->deleteJson("/api/animals/{$animal->id}");
        $response->assertNoContent();
        $this->assertSoftDeleted('animals', ['id' => $animal->id]);

        // Cannot delete other user's animal
        $response = $this->deleteJson("/api/animals/{$otherAnimal->id}");
        $response->assertForbidden();
        $this->assertDatabaseHas('animals', ['id' => $otherAnimal->id]);
    }

    public function test_public_can_view_animal_by_slug(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create([
            'name' => 'Public Animal',
            'slug' => 'public-animal',
            'foster_carer_id' => $user->id,
        ]);

        $response = $this->getJson("/public/animals/{$animal->slug}");

        $response->assertOk()
            ->assertJsonPath('data.name', 'Public Animal')
            ->assertJsonPath('data.slug', 'public-animal')
            ->assertJsonMissing(['foster_carer_id']); // Should not include foster carer PII
    }

    public function test_public_animal_endpoint_excludes_foster_carer_pii(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $response = $this->getJson("/public/animals/{$animal->slug}");

        $response->assertOk();

        // Ensure foster carer information is not included
        $responseData = $response->json('data');
        $this->assertArrayNotHasKey('foster_carer_id', $responseData);
        $this->assertArrayNotHasKey('foster_carer', $responseData);
    }

    public function test_unauthenticated_user_cannot_access_animal_api(): void
    {
        $response = $this->getJson('/api/animals');
        $response->assertUnauthorized();
    }

    public function test_animal_validation_works(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        // Test required name
        $response = $this->postJson('/api/animals', []);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name']);

        // Test invalid species
        $response = $this->postJson('/api/animals', [
            'name' => 'Test Animal',
            'species' => 'invalid_species',
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['species']);

        // Test invalid sex
        $response = $this->postJson('/api/animals', [
            'name' => 'Test Animal',
            'sex' => 'invalid_sex',
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['sex']);

        // Test invalid status
        $response = $this->postJson('/api/animals', [
            'name' => 'Test Animal',
            'status' => 'invalid_status',
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['status']);
    }

    public function test_available_scope_works(): void
    {
        Animal::factory()->create(['status' => 'available']);
        Animal::factory()->create(['status' => 'in_foster']);
        Animal::factory()->create(['status' => 'adopted']);

        $availableAnimals = Animal::available()->get();
        
        $this->assertCount(1, $availableAnimals);
        $this->assertEquals('available', $availableAnimals->first()->status);
    }

    public function test_slug_updates_when_name_changes(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create([
            'name' => 'Original Name',
            'foster_carer_id' => $user->id,
        ]);

        $originalSlug = $animal->slug;

        Sanctum::actingAs($user);

        $response = $this->putJson("/api/animals/{$animal->id}", [
            'name' => 'New Name',
        ]);

        $response->assertOk();
        $animal->refresh();
        
        $this->assertNotEquals($originalSlug, $animal->slug);
        $this->assertEquals('new-name', $animal->slug);
    }
}
