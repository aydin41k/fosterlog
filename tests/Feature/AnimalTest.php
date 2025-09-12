<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

        $this->actingAs($user);

        $response = $this->get('/animals');

        $response->assertOk();
        // Check that the page contains the user's animals
        $response->assertSee($userAnimals[0]->name);
        $response->assertSee($userAnimals[1]->name);
        // Should not see other user's animals
        $response->assertDontSee($otherUserAnimals[0]->name);
    }

    public function test_authenticated_user_can_create_animal(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $animalData = [
            'name' => 'Fluffy',
            'species' => 'cat',
            'dob' => '2020-01-15',
            'sex' => 'female',
            'medical_conditions' => 'None',
            'description' => 'Very friendly cat',
            'status' => 'in_foster',
        ];

        $response = $this->post('/animals', $animalData);

        $response->assertRedirect('/animals');

        $this->assertDatabaseHas('animals', [
            'name' => 'Fluffy',
            'species' => 'cat',
            'foster_carer_id' => $user->id,
        ]);
    }

    public function test_slug_is_auto_generated_from_name(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/animals', [
            'name' => 'Test Animal Name',
        ]);

        $response->assertRedirect('/animals');

        $animal = Animal::where('name', 'Test Animal Name')->first();
        $this->assertEquals('test-animal-name', $animal->slug);
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

        $this->actingAs($user);

        // Create second animal with same name
        $response = $this->post('/animals', [
            'name' => 'Duplicate Name',
        ]);

        $response->assertRedirect('/animals');

        $animal = Animal::where('name', 'Duplicate Name')->where('slug', 'duplicate-name-1')->first();
        $this->assertNotNull($animal);
    }

    public function test_carer_can_view_any_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        $this->actingAs($user);

        $response = $this->get("/animals/{$animal->id}");

        $response->assertOk();
        $response->assertSee($animal->name);
    }

    public function test_carer_can_only_update_their_own_animals(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $otherAnimal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        $this->actingAs($user);

        // Can update own animal
        $response = $this->put("/animals/{$animal->id}", [
            'name' => 'Updated Name',
        ]);
        $response->assertRedirect("/animals/{$animal->id}");

        // Cannot update other user's animal
        $response = $this->put("/animals/{$otherAnimal->id}", [
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

        $this->actingAs($user);

        // Can delete own animal
        $response = $this->delete("/animals/{$animal->id}");
        $response->assertRedirect('/animals');
        $this->assertSoftDeleted('animals', ['id' => $animal->id]);

        // Cannot delete other user's animal
        $response = $this->delete("/animals/{$otherAnimal->id}");
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

    public function test_unauthenticated_user_cannot_access_animals(): void
    {
        $response = $this->get('/animals');
        $response->assertRedirect('/login');
    }

    public function test_animal_validation_works(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Test required name
        $response = $this->post('/animals', []);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['name']);

        // Test invalid species
        $response = $this->post('/animals', [
            'name' => 'Test Animal',
            'species' => 'invalid_species',
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['species']);

        // Test invalid sex
        $response = $this->post('/animals', [
            'name' => 'Test Animal',
            'sex' => 'invalid_sex',
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['sex']);

        // Test invalid status
        $response = $this->post('/animals', [
            'name' => 'Test Animal',
            'status' => 'invalid_status',
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['status']);
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

        $this->actingAs($user);

        $response = $this->put("/animals/{$animal->id}", [
            'name' => 'New Name',
        ]);

        $response->assertRedirect("/animals/{$animal->id}");
        $animal->refresh();

        $this->assertNotEquals($originalSlug, $animal->slug);
        $this->assertEquals('new-name', $animal->slug);
    }
}
