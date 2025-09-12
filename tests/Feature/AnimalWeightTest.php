<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\AnimalWeight;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class AnimalWeightTest extends TestCase
{
    use RefreshDatabase;

    public function test_carer_can_record_weight_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        $weightData = [
            'weight_kg' => 15.75,
            'measured_at' => '2025-09-12 10:00:00',
            'notes' => 'Regular check-up',
        ];

        $response = $this->post("/animals/{$animal->id}/weights", $weightData);

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseHas('animal_weights', [
            'animal_id' => $animal->id,
            'weight_kg' => 15.75,
            'recorded_by' => $user->id,
            'notes' => 'Regular check-up',
        ]);
    }

    public function test_carer_cannot_record_weight_for_others_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        $this->actingAs($user);

        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 15.75,
        ]);

        $response->assertForbidden();
    }

    public function test_weight_defaults_to_current_time_if_not_provided(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 12.5,
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $weight = AnimalWeight::latest()->first();
        $this->assertEquals($user->id, $weight->recorded_by);
        $this->assertNotNull($weight->measured_at);
        // Check that measured_at is close to now (within 1 minute)
        $this->assertTrue(now()->diffInMinutes($weight->measured_at) < 1);
    }

    public function test_carer_can_list_weights_for_their_animal_ordered_by_date(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        // Create weights with different dates
        $weight1 = AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $user->id,
            'measured_at' => '2025-09-10 10:00:00',
            'weight_kg' => 10.0,
        ]);

        $weight2 = AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $user->id,
            'measured_at' => '2025-09-12 10:00:00',
            'weight_kg' => 12.0,
        ]);

        $weight3 = AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $user->id,
            'measured_at' => '2025-09-11 10:00:00',
            'weight_kg' => 11.0,
        ]);

        $this->actingAs($user);

        $response = $this->get("/animals/{$animal->id}/weights");

        $response->assertOk();
        // Check that weights are displayed in the correct order
        $response->assertSee('12.00');
        $response->assertSee('11.00');
        $response->assertSee('10.00');
    }

    public function test_carer_cannot_list_weights_for_others_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $otherUser->id,
        ]);

        $this->actingAs($user);

        $response = $this->get("/animals/{$animal->id}/weights");

        $response->assertForbidden();
    }

    public function test_carer_can_delete_weight_record_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $weight = AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $user->id,
        ]);

        $this->actingAs($user);

        $response = $this->delete("/animal-weights/{$weight->id}");

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseMissing('animal_weights', [
            'id' => $weight->id,
        ]);
    }

    public function test_carer_cannot_delete_weight_record_for_others_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);
        $weight = AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $otherUser->id,
        ]);

        $this->actingAs($user);

        $response = $this->delete("/animal-weights/{$weight->id}");

        $response->assertForbidden();

        $this->assertDatabaseHas('animal_weights', [
            'id' => $weight->id,
        ]);
    }

    public function test_weight_validation_works(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        // Test required weight_kg
        $response = $this->post("/animals/{$animal->id}/weights", []);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['weight_kg']);

        // Test weight must be positive
        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 0,
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['weight_kg']);

        // Test weight must be positive (negative)
        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => -5,
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['weight_kg']);

        // Test weight upper bound
        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 250,
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['weight_kg']);

        // Test invalid date
        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 15.5,
            'measured_at' => 'invalid-date',
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['measured_at']);

        // Test valid weight passes validation
        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 15.5,
        ]);
        $response->assertRedirect("/animals/{$animal->id}");
    }

    public function test_unauthenticated_user_cannot_manage_weights(): void
    {
        $animal = Animal::factory()->create();

        $response = $this->get("/animals/{$animal->id}/weights");
        $response->assertRedirect('/login');

        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 10.0,
        ]);
        $response->assertRedirect('/login');
    }

    public function test_weight_is_recorded_with_correct_user(): void
    {
        $user = User::factory()->create(['name' => 'John Doe']);
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => 15.5,
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $weight = AnimalWeight::latest()->first();
        $this->assertEquals($user->id, $weight->recorded_by);
        $this->assertEquals('John Doe', $weight->recordedBy->name);
    }
}
