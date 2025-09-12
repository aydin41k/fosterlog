<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\ResidentPet;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

        $this->actingAs($user);

        $response = $this->get('/resident-pets');

        $response->assertOk();
        // Check that the page contains the user's pets
        $response->assertSee($userPets[0]->name);
        $response->assertSee($userPets[1]->name);
        // Should not see other user's pets
        $response->assertDontSee($otherUserPets[0]->name);
    }

    public function test_authenticated_user_can_create_resident_pet(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $petData = [
            'name' => 'Fluffy',
            'species' => 'cat',
            'dob' => '2020-01-15',
            'notes' => 'Very friendly cat',
        ];

        $response = $this->post('/resident-pets', $petData);

        $response->assertRedirect('/resident-pets');

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

        $this->actingAs($user);

        $response = $this->get("/resident-pets/{$pet->id}");

        $response->assertOk();
        $response->assertSee($pet->name);
    }

    public function test_user_cannot_view_another_users_resident_pet(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $otherUser->id]);

        $this->actingAs($user);

        $response = $this->get("/resident-pets/{$pet->id}");

        $response->assertForbidden();
    }

    public function test_user_can_update_their_own_resident_pet(): void
    {
        $user = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $updateData = [
            'name' => 'Updated Name',
            'species' => 'dog',
        ];

        $response = $this->put("/resident-pets/{$pet->id}", $updateData);

        $response->assertRedirect("/resident-pets/{$pet->id}");

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

        $this->actingAs($user);

        $response = $this->put("/resident-pets/{$pet->id}", [
            'name' => 'Hacked Name',
        ]);

        $response->assertForbidden();
    }

    public function test_user_can_delete_their_own_resident_pet(): void
    {
        $user = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->delete("/resident-pets/{$pet->id}");

        $response->assertRedirect('/resident-pets');

        $this->assertDatabaseMissing('resident_pets', [
            'id' => $pet->id,
        ]);
    }

    public function test_user_cannot_delete_another_users_resident_pet(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $pet = ResidentPet::factory()->create(['user_id' => $otherUser->id]);

        $this->actingAs($user);

        $response = $this->delete("/resident-pets/{$pet->id}");

        $response->assertForbidden();

        $this->assertDatabaseHas('resident_pets', [
            'id' => $pet->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_access_resident_pets(): void
    {
        $response = $this->get('/resident-pets');
        $response->assertRedirect('/login');
    }

    public function test_create_resident_pet_validates_required_fields(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/resident-pets', []);

        $response->assertRedirect();
        $response->assertSessionHasErrors(['name', 'species']);
    }

    public function test_create_resident_pet_validates_species_enum(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/resident-pets', [
            'name' => 'Test Pet',
            'species' => 'invalid_species',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasErrors(['species']);
    }

    public function test_create_resident_pet_validates_date_format(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->post('/resident-pets', [
            'name' => 'Test Pet',
            'species' => 'cat',
            'dob' => 'invalid-date',
        ]);

        $response->assertRedirect();
        $response->assertSessionHasErrors(['dob']);
    }
}
