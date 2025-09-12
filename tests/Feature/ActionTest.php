<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Action;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class ActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_carer_can_record_food_action_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        $foodData = [
            'type' => 'food',
            'details' => [
                'amount_g' => 150,
                'brand' => 'Royal Canin',
                'notes' => 'Morning meal',
            ],
            'performed_at' => '2025-09-12 08:00:00',
        ];

        $response = $this->postJson("/api/animals/{$animal->id}/actions", $foodData);

        $response->assertCreated()
            ->assertJsonPath('data.type', 'food')
            ->assertJsonPath('data.details.amount_g', 150)
            ->assertJsonPath('data.details.brand', 'Royal Canin')
            ->assertJsonPath('data.details.notes', 'Morning meal')
            ->assertJsonPath('data.animal_id', $animal->id)
            ->assertJsonPath('data.performed_by.id', $user->id);

        $this->assertDatabaseHas('actions', [
            'animal_id' => $animal->id,
            'performed_by' => $user->id,
            'type' => 'food',
        ]);
    }

    public function test_carer_can_record_medication_action_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        $medicationData = [
            'type' => 'medication',
            'details' => [
                'name' => 'Heartgard',
                'dose' => '10mg',
                'notes' => 'Monthly heartworm prevention',
            ],
            'performed_at' => '2025-09-12 10:00:00',
        ];

        $response = $this->postJson("/api/animals/{$animal->id}/actions", $medicationData);

        $response->assertCreated()
            ->assertJsonPath('data.type', 'medication')
            ->assertJsonPath('data.details.name', 'Heartgard')
            ->assertJsonPath('data.details.dose', '10mg')
            ->assertJsonPath('data.details.notes', 'Monthly heartworm prevention')
            ->assertJsonPath('data.animal_id', $animal->id)
            ->assertJsonPath('data.performed_by.id', $user->id);

        $this->assertDatabaseHas('actions', [
            'animal_id' => $animal->id,
            'performed_by' => $user->id,
            'type' => 'medication',
        ]);
    }

    public function test_food_action_validation_works(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        // Test missing amount_g
        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'brand' => 'Test Brand',
            ],
        ]);
        $response->assertStatus(422);

        // Test invalid amount_g (zero)
        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'amount_g' => 0,
                'brand' => 'Test Brand',
            ],
        ]);
        $response->assertStatus(422);

        // Test valid food action
        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'amount_g' => 100,
            ],
        ]);
        $response->assertCreated();
    }

    public function test_medication_action_validation_works(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        // Test missing name
        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'dose' => '5mg',
            ],
        ]);
        $response->assertStatus(422);

        // Test missing dose
        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'name' => 'Test Medicine',
            ],
        ]);
        $response->assertStatus(422);

        // Test valid medication action
        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'name' => 'Test Medicine',
                'dose' => '5mg',
            ],
        ]);
        $response->assertCreated();
    }

    public function test_carer_cannot_record_action_for_others_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        Sanctum::actingAs($user);

        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'amount_g' => 100,
            ],
        ]);

        $response->assertForbidden();
    }

    public function test_carer_can_filter_actions_by_type(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        // Create food and medication actions
        Action::factory()->food()->create([
            'animal_id' => $animal->id,
            'performed_by' => $user->id,
        ]);

        Action::factory()->medication()->create([
            'animal_id' => $animal->id,
            'performed_by' => $user->id,
        ]);

        Sanctum::actingAs($user);

        // Test filter by food
        $response = $this->getJson("/api/animals/{$animal->id}/actions?type=food");
        $response->assertOk()
            ->assertJsonCount(1, 'data');

        $actions = $response->json('data');
        $this->assertEquals('food', $actions[0]['type']);

        // Test filter by medication
        $response = $this->getJson("/api/animals/{$animal->id}/actions?type=medication");
        $response->assertOk()
            ->assertJsonCount(1, 'data');

        $actions = $response->json('data');
        $this->assertEquals('medication', $actions[0]['type']);
    }

    public function test_carer_can_delete_action_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $action = Action::factory()->create([
            'animal_id' => $animal->id,
            'performed_by' => $user->id,
        ]);

        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/actions/{$action->id}");

        $response->assertNoContent();

        $this->assertDatabaseMissing('actions', [
            'id' => $action->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_manage_actions(): void
    {
        $animal = Animal::factory()->create();

        $response = $this->getJson("/api/animals/{$animal->id}/actions");
        $response->assertUnauthorized();

        $response = $this->postJson("/api/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => ['amount_g' => 100],
        ]);
        $response->assertUnauthorized();
    }
}
