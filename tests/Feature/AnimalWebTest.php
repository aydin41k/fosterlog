<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class AnimalWebTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'email_verified_at' => now(),
        ]);
        $this->actingAs($this->user);
    }

    public function test_animals_index_page_loads(): void
    {
        // Create some test animals
        Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
            'name' => 'Test Cat',
            'species' => 'cat',
        ]);

        Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
            'name' => 'Test Dog',
            'species' => 'dog',
        ]);

        // Visit the page and check the Inertia component
        $this->get('/animals')
            ->assertInertia(fn ($page) => $page
                ->component('animals/index')
                ->has('animals', 2)
                ->where('animals.0.name', 'Test Cat')
                ->where('animals.1.name', 'Test Dog')
            );
    }

    public function test_animals_create_page_loads(): void
    {
        $response = $this->get('/animals/create');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('animals/create')
        );
    }

    public function test_animals_edit_page_loads(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
            'name' => 'Editable Cat',
        ]);

        $response = $this->get("/animals/{$animal->id}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('animals/edit')
            ->has('animal')
            ->where('animal.name', 'Editable Cat')
        );
    }

    public function test_cannot_edit_others_animal(): void
    {
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $otherUser->id,
        ]);

        $response = $this->get("/animals/{$animal->id}/edit");

        $response->assertStatus(403);
    }

    public function test_dashboard_shows_stats(): void
    {
        // Create some test data
        Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
        ]);

        $response = $this->get('/dashboard');

        $response->assertRedirect(route('animals.index'));
    }

    public function test_animal_show_page_loads(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
            'name' => 'Show Test Animal',
            'species' => 'cat',
        ]);

        $response = $this->get("/animals/{$animal->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('animals/show')
            ->has('animal')
            ->where('animal.name', 'Show Test Animal')
            ->where('animal.species', 'cat')
        );
    }

    public function test_animal_can_be_deleted(): void
    {
        $animal = Animal::factory()->create([
            'foster_carer_id' => $this->user->id,
            'name' => 'Delete Test Animal',
        ]);

        // Verify animal exists before deletion
        $this->assertDatabaseHas('animals', [
            'id' => $animal->id,
            'name' => 'Delete Test Animal',
        ]);

        // Delete the animal
        $response = $this->delete("/animals/{$animal->id}");

        // Assert redirect to animals index with success message
        $response->assertRedirect('/animals');
        $response->assertSessionHas('success', 'Animal deleted successfully.');

        // Verify animal is soft deleted
        $this->assertSoftDeleted('animals', [
            'id' => $animal->id,
            'name' => 'Delete Test Animal',
        ]);
    }

    public function test_cannot_delete_others_animal(): void
    {
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $otherUser->id,
        ]);

        $response = $this->delete("/animals/{$animal->id}");

        $response->assertStatus(403);

        // Verify animal still exists and is not deleted
        $this->assertDatabaseHas('animals', [
            'id' => $animal->id,
        ]);
    }
}
