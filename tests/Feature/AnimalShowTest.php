<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Action;
use App\Models\Animal;
use App\Models\AnimalPhoto;
use App\Models\AnimalWeight;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class AnimalShowTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_animals_show_page_loads(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
            'name' => 'Test Animal',
        ]);

        $response = $this->get("/animals/{$animal->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('animals/show')
            ->has('animal')
            ->where('animal.name', 'Test Animal')
            ->where('animal.id', $animal->id)
        );
    }

    public function test_animals_show_page_with_photos(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $this->user->id,
        ]);

        $response = $this->get("/animals/{$animal->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('animals/show')
            ->has('photos', 1)
            ->where('photos.0.id', $photo->id)
        );
    }

    public function test_can_view_others_animal(): void
    {
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $otherUser->id,
        ]);

        $response = $this->get("/animals/{$animal->id}");

        $response->assertStatus(200); // Policy allows viewing any animal
    }

    public function test_photo_upload_via_web(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        // Create a fake image file
        $image = \Illuminate\Http\UploadedFile::fake()->image('test.jpg');

        $response = $this->post("/animals/{$animal->id}/photos", [
            'photo' => $image,
            'caption' => 'Test photo',
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseHas('animal_photos', [
            'animal_id' => $animal->id,
            'caption' => 'Test photo',
        ]);
    }

    public function test_weight_record_creation(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $response = $this->post("/animals/{$animal->id}/weights", [
            'weight_kg' => '5.5',
            'measured_at' => '2024-01-01',
            'notes' => 'Monthly check',
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseHas('animal_weights', [
            'animal_id' => $animal->id,
            'weight_kg' => '5.50',
            'notes' => 'Monthly check',
        ]);
    }

    public function test_action_record_creation_food(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'food',
            'details' => [
                'amount_g' => 250,
                'brand' => 'Royal Canin',
                'notes' => 'Morning feeding',
            ],
            'performed_at' => now()->toISOString(),
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseHas('actions', [
            'animal_id' => $animal->id,
            'type' => 'food',
        ]);
    }

    public function test_action_record_creation_medication(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $response = $this->post("/animals/{$animal->id}/actions", [
            'type' => 'medication',
            'details' => [
                'name' => 'Frontline',
                'dose' => '1 pipette',
                'notes' => 'Monthly flea treatment',
            ],
            'performed_at' => now()->toISOString(),
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseHas('actions', [
            'animal_id' => $animal->id,
            'type' => 'medication',
        ]);
    }

    public function test_photo_deletion(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $this->user->id,
        ]);

        $response = $this->delete("/animal-photos/{$photo->id}");

        $response->assertRedirect("/animals/{$animal->id}");
        $this->assertDatabaseMissing('animal_photos', ['id' => $photo->id]);
    }

    public function test_weight_deletion(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $weight = AnimalWeight::factory()->create([
            'animal_id' => $animal->id,
            'recorded_by' => $this->user->id,
        ]);

        $response = $this->delete("/animal-weights/{$weight->id}");

        $response->assertRedirect("/animals/{$animal->id}");
        $this->assertDatabaseMissing('animal_weights', ['id' => $weight->id]);
    }

    public function test_action_deletion(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $action = Action::factory()->create([
            'animal_id' => $animal->id,
            'performed_by' => $this->user->id,
        ]);

        $response = $this->delete("/actions/{$action->id}");

        $response->assertRedirect("/animals/{$animal->id}");
        $this->assertDatabaseMissing('actions', ['id' => $action->id]);
    }
}
