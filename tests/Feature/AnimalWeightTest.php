<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\AnimalWeight;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

final class AnimalWeightTest extends TestCase
{
    use RefreshDatabase;

    public function test_carer_can_record_weight_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        $weightData = [
            'weight_kg' => 15.75,
            'measured_at' => '2025-09-12 10:00:00',
            'notes' => 'Regular check-up',
        ];

        $response = $this->postJson("/api/animals/{$animal->id}/weights", $weightData);

        $response->assertCreated()
            ->assertJsonPath('data.weight_kg', '15.75')
            ->assertJsonPath('data.animal_id', $animal->id)
            ->assertJsonPath('data.recorded_by.id', $user->id)
            ->assertJsonPath('data.notes', 'Regular check-up');

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

        Sanctum::actingAs($user);

        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 15.75,
        ]);

        $response->assertForbidden();
    }

    public function test_weight_defaults_to_current_time_if_not_provided(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 12.5,
        ]);

        $response->assertCreated();

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

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/animals/{$animal->id}/weights");

        $response->assertOk()
            ->assertJsonCount(3, 'data')
            // Should be ordered by measured_at descending (newest first)
            ->assertJsonPath('data.0.weight_kg', '12.00') // 2025-09-12
            ->assertJsonPath('data.1.weight_kg', '11.00') // 2025-09-11
            ->assertJsonPath('data.2.weight_kg', '10.00'); // 2025-09-10
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

        Sanctum::actingAs($user);

        $response = $this->getJson("/api/animals/{$animal->id}/weights");

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

        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/animal-weights/{$weight->id}");

        $response->assertNoContent();

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

        Sanctum::actingAs($user);

        $response = $this->deleteJson("/api/animal-weights/{$weight->id}");

        $response->assertForbidden();

        $this->assertDatabaseHas('animal_weights', [
            'id' => $weight->id,
        ]);
    }

    public function test_weight_validation_works(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        // Test required weight_kg
        $response = $this->postJson("/api/animals/{$animal->id}/weights", []);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['weight_kg']);

        // Test weight must be positive
        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 0,
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['weight_kg']);

        // Test weight must be positive (negative)
        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => -5,
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['weight_kg']);

        // Test weight upper bound
        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 250,
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['weight_kg']);

        // Test invalid date
        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 15.5,
            'measured_at' => 'invalid-date',
        ]);
        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['measured_at']);

        // Test valid weight passes validation
        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 15.5,
        ]);
        $response->assertCreated();
    }

    public function test_unauthenticated_user_cannot_manage_weights(): void
    {
        $animal = Animal::factory()->create();

        $response = $this->getJson("/api/animals/{$animal->id}/weights");
        $response->assertUnauthorized();

        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 10.0,
        ]);
        $response->assertUnauthorized();
    }

    public function test_weight_response_includes_recorded_by_information(): void
    {
        $user = User::factory()->create(['name' => 'John Doe']);
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        Sanctum::actingAs($user);

        $response = $this->postJson("/api/animals/{$animal->id}/weights", [
            'weight_kg' => 15.5,
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.recorded_by.name', 'John Doe')
            ->assertJsonPath('data.recorded_by.id', $user->id);
    }
}
