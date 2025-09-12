<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Action;
use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_carer_can_record_food_action_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        $foodData = [
            'type' => 'food',
            'details' => [
                'amount_g' => 150,
                'brand' => 'Royal Canin',
                'notes' => 'Morning meal',
            ],
            'performed_at' => '2025-09-12 08:00:00',
        ];

        $response = $this->post("/animals/{$animal->id}/actions", $foodData);

        $response->assertRedirect("/animals/{$animal->id}");

        $action = Action::where('animal_id', $animal->id)->first();
        $this->assertEquals('food', $action->type->value);
        $this->assertEquals(150, $action->details['amount_g']);
        $this->assertEquals('Royal Canin', $action->details['brand']);
        $this->assertEquals('Morning meal', $action->details['notes']);
        $this->assertEquals($user->id, $action->performed_by);

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

        $this->actingAs($user);

        $medicationData = [
            'type' => 'medication',
            'details' => [
                'name' => 'Heartgard',
                'dose' => '10mg',
                'notes' => 'Monthly heartworm prevention',
            ],
            'performed_at' => '2025-09-12 10:00:00',
        ];

        $response = $this->post("/animals/{$animal->id}/actions", $medicationData);

        $response->assertRedirect("/animals/{$animal->id}");

        $action = Action::where('animal_id', $animal->id)->where('type', 'medication')->first();
        $this->assertEquals('medication', $action->type->value);
        $this->assertEquals('Heartgard', $action->details['name']);
        $this->assertEquals('10mg', $action->details['dose']);
        $this->assertEquals('Monthly heartworm prevention', $action->details['notes']);
        $this->assertEquals($user->id, $action->performed_by);

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

        $this->actingAs($user);

        // Test missing amount_g
        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'brand' => 'Test Brand',
            ],
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors();

        // Test invalid amount_g (zero)
        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'amount_g' => 0,
                'brand' => 'Test Brand',
            ],
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors();

        // Test valid food action
        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'amount_g' => 100,
            ],
        ]);
        $response->assertRedirect("/animals/{$animal->id}");
    }

    public function test_medication_action_validation_works(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        // Test missing name
        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'dose' => '5mg',
            ],
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors();

        // Test missing dose
        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'name' => 'Test Medicine',
            ],
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors();

        // Test valid medication action
        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'name' => 'Test Medicine',
                'dose' => '5mg',
            ],
        ]);
        $response->assertRedirect("/animals/{$animal->id}");
    }

    public function test_carer_cannot_record_action_for_others_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        $this->actingAs($user);

        $response = $this->post("/animals/{$animal->id}/actions", [
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

        $this->actingAs($user);

        // Test filter by food
        $response = $this->get("/animals/{$animal->id}/actions?type=food");
        $response->assertOk();

        // Test filter by medication
        $response = $this->get("/animals/{$animal->id}/actions?type=medication");
        $response->assertOk();
    }

    public function test_carer_can_delete_action_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $action = Action::factory()->create([
            'animal_id' => $animal->id,
            'performed_by' => $user->id,
        ]);

        $this->actingAs($user);

        $response = $this->delete("/actions/{$action->id}");

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseMissing('actions', [
            'id' => $action->id,
        ]);
    }

    public function test_unauthenticated_user_cannot_manage_actions(): void
    {
        $animal = Animal::factory()->create();

        $response = $this->get("/animals/{$animal->id}/actions");
        $response->assertRedirect('/login');

        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => ['amount_g' => 100],
        ]);
        $response->assertRedirect('/login');
    }
}
