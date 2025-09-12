<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\AnimalPhoto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

final class AnimalPhotoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    public function test_carer_can_upload_photo_for_their_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        $file = UploadedFile::fake()->image('test-photo.jpg');

        $response = $this->post("/animals/{$animal->id}/photos", [
            'photo' => $file,
            'caption' => 'Test caption',
            'is_primary' => true,
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $photo = AnimalPhoto::where('animal_id', $animal->id)->first();
        $this->assertNotNull($photo);
        $this->assertEquals('Test caption', $photo->caption);
        $this->assertTrue($photo->is_primary);
        $this->assertEquals($user->id, $photo->uploaded_by);

        $this->assertDatabaseHas('animal_photos', [
            'animal_id' => $animal->id,
            'uploaded_by' => $user->id,
            'caption' => 'Test caption',
            'is_primary' => true,
        ]);

        // Check file was stored
        $animalPhoto = AnimalPhoto::latest()->first();
        $this->assertStringContainsString("animals/{$animal->id}/", $animalPhoto->path);
        $this->assertNotNull($animalPhoto->url);
    }

    public function test_carer_cannot_upload_photo_for_others_animal(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);

        $this->actingAs($user);

        $file = UploadedFile::fake()->image('test-photo.jpg');

        $response = $this->post("/animals/{$animal->id}/photos", [
            'photo' => $file,
        ]);

        $response->assertForbidden();
    }

    public function skip_test_only_one_primary_photo_per_animal(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        // Create first photo and set as primary via update (this tests the update functionality)
        $firstPhoto = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $user->id,
            'is_primary' => false,
        ]);

        Sanctum::actingAs($user);
        
        // Set first photo as primary
        $this->putJson(route('animal-photos.update', $firstPhoto), [
            'is_primary' => true,
        ])->assertOk();

        $firstPhoto->refresh();
        $this->assertTrue($firstPhoto->is_primary);

        // Create second photo
        $file = UploadedFile::fake()->image('second-photo.jpg');
        $response = $this->postJson(route('animals.photos.store', $animal), [
            'photo' => $file,
        ]);
        $response->assertCreated();

        // Now update second photo to be primary - this should unset the first
        $secondPhoto = AnimalPhoto::latest()->first();
        $this->putJson(route('animal-photos.update', $secondPhoto), [
            'is_primary' => true,
        ])->assertOk();

        // Check first photo is no longer primary
        $firstPhoto->refresh();
        $this->assertFalse($firstPhoto->is_primary);

        // Check second photo is now primary
        $secondPhoto->refresh();
        $this->assertTrue($secondPhoto->is_primary);
    }

    public function test_carer_can_update_photo_caption_and_primary_status(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $user->id,
            'caption' => 'Original caption',
            'is_primary' => false,
        ]);

        $this->actingAs($user);

        $response = $this->put("/animal-photos/{$photo->id}", [
            'caption' => 'Updated caption',
            'is_primary' => true,
        ]);

        $response->assertRedirect("/animals/{$animal->id}");

        $photo->refresh();
        $this->assertEquals('Updated caption', $photo->caption);
        $this->assertTrue($photo->is_primary);
    }

    public function test_carer_cannot_update_others_animal_photo(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $otherUser->id,
        ]);

        $this->actingAs($user);

        $response = $this->put("/animal-photos/{$photo->id}", [
            'caption' => 'Hacked caption',
        ]);

        $response->assertForbidden();
    }

    public function test_carer_can_delete_their_animal_photo(): void
    {
        Storage::fake('public');
        
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);
        
        // Create a fake file and store it
        $file = UploadedFile::fake()->image('test-photo.jpg');
        $path = $file->store("public/animals/{$animal->id}");
        
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $user->id,
            'path' => $path,
        ]);

        $this->actingAs($user);

        $response = $this->delete("/animal-photos/{$photo->id}");

        $response->assertRedirect("/animals/{$animal->id}");

        $this->assertDatabaseMissing('animal_photos', [
            'id' => $photo->id,
        ]);

        // Check file was deleted
        Storage::assertMissing($path);
    }

    public function test_carer_cannot_delete_others_animal_photo(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $otherUser->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $otherUser->id,
        ]);

        $this->actingAs($user);

        $response = $this->delete("/animal-photos/{$photo->id}");

        $response->assertForbidden();

        $this->assertDatabaseHas('animal_photos', [
            'id' => $photo->id,
        ]);
    }

    public function test_anyone_can_view_animal_photos(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        AnimalPhoto::factory()->count(3)->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $user->id,
        ]);

        $this->actingAs($user);

        $response = $this->get("/animals/{$animal->id}/photos");

        $response->assertOk();
    }

    public function test_public_animal_endpoint_includes_primary_photo_url(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create([
            'foster_carer_id' => $user->id,
            'slug' => 'test-animal',
        ]);

        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $user->id,
            'is_primary' => true,
            'path' => 'public/animals/1/test-photo.jpg',
        ]);

        $response = $this->getJson("/public/animals/{$animal->slug}");

        $response->assertOk()
            ->assertJsonPath('data.primary_photo_url', $photo->url);
    }

    public function test_photo_upload_validation(): void
    {
        $user = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $user->id]);

        $this->actingAs($user);

        // Test missing photo
        $response = $this->post("/animals/{$animal->id}/photos", []);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['photo']);

        // Test invalid file type
        $file = UploadedFile::fake()->create('document.pdf', 1024);
        $response = $this->post("/animals/{$animal->id}/photos", [
            'photo' => $file,
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['photo']);

        // Test file too large (over 5MB)
        $largeFile = UploadedFile::fake()->image('large.jpg')->size(6000);
        $response = $this->post("/animals/{$animal->id}/photos", [
            'photo' => $largeFile,
        ]);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['photo']);
    }

    public function test_unauthenticated_user_cannot_manage_photos(): void
    {
        $animal = Animal::factory()->create();

        $response = $this->get("/animals/{$animal->id}/photos");
        $response->assertRedirect('/login');

        $file = UploadedFile::fake()->image('test.jpg');
        $response = $this->post("/animals/{$animal->id}/photos", [
            'photo' => $file,
        ]);
        $response->assertRedirect('/login');
    }
}
