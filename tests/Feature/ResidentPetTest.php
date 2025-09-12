<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\ResidentPet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class ResidentPetTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_their_resident_pets(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        
        $userPets = ResidentPet::factory()->count(2)->create(['user_id' => $user->id]);
        $otherUserPets = ResidentPet::factory()->count(1)->create(['user_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/resident-pets');

        $response->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.user_id', $user->id)
            ->assertJsonPath('data.1.user_id', $user->id);
    }

    public function test_authenticated_user_can_create_resident_pet(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $petData = [
            'name' => 'Fluffy',
            'species' => 'cat',
            'dob' => '2020-01-15',
            'notes' => 'Very friendly cat',
        ];

        $response = $this->postJson('/api/resident-pets', $petData);

        $response->assertCreated()
            ->assertJsonPath('data.name', 'Fluffy')
            ->assertJsonPath('data.species', 'cat')
            ->assertJsonPath('data.user_id', $user->id);

        $this->assertDatabaseHas('resident_pets', [
            'name' => 'Fluffy',
            'species' => 'cat',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_view_their_own_resident_pet(): void
    {
        $user = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/resident-pets/{$pet->id}");

        $response->assertOk()
            ->assertJsonPath('data.id', $pet->id)
            ->assertJsonPath('data.user_id', $user->id);
    }

    public function test_user_cannot_view_another_users_resident_pet(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/resident-pets/{$pet->id}");

        $response->assertForbidden();
    }

    public function test_user_can_update_their_own_resident_pet(): void
    {
        $user = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);

        $updateData = [
            'name' => 'Updated Name',
            'species' => 'dog',
        ];

        $response = $this->putJson("/api/resident-pets/{$pet->id}", $updateData);

        $response->assertOk()
            ->assertJsonPath('data.name', 'Updated Name')
            ->assertJsonPath('data.species', 'dog');

        $this->assertDatabaseHas('resident_pets', [
            'id' => $pet->id,
            'name' => 'Updated Name',
            'species' => 'dog',
        ]);
    }

    public function test_user_cannot_update_another_users_resident_pet(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->putJson("/api/resident-pets/{$pet->id}", [
            'name' => 'Hacked Name',
        ]);

        $response->assertForbidden();
    }

    public function test_user_can_delete_their_own_resident_pet(): void
    {
        $user = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/resident-pets/{$pet->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('resident_pets', [
            'id' => $pet->id,
        ]);
    }

    public function test_user_cannot_delete_another_users_resident_pet(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/resident-pets/{$pet->id}");

        $response->assertForbidden();

        $this->assertDatabaseHas('resident_pets', [
            'id' => $pet->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_access_resident_pets(): void
    {
        $response = $this->getJson('/api/resident-pets');
        $response->assertUnauthorized();
    }

    public function test_create_resident_pet_validates_required_fields(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/resident-pets', []);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'species']);
    }

    public function test_create_resident_pet_validates_species_enum(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/resident-pets', [
            'name' => 'Test Pet',
            'species' => 'invalid_species',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['species']);
    }

    public function test_create_resident_pet_validates_date_format(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/resident-pets', [
            'name' => 'Test Pet',
            'species' => 'cat',
            'dob' => 'invalid-date',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['dob']);
    }
}
