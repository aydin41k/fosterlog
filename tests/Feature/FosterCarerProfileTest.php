<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

final class FosterCarerProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_update_profile_information(): void
    {
        $user = User::factory()->create();

        $profileData = [
            'phone' => '+61 400 123 456',
            'address_line' => '123 Main Street',
            'suburb' => 'Melbourne',
            'state' => 'Victoria',
            'postcode' => '3000',
            'country' => 'Australia',
            'space_details' => 'Large backyard with play area, 3 bedrooms available for foster children.',
        ];

        $response = $this
            ->actingAs($user)
            ->putJson(route('foster.profile.update'), $profileData);

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Profile updated successfully',
            ])
            ->assertJsonPath('user.phone', $profileData['phone'])
            ->assertJsonPath('user.address_line', $profileData['address_line'])
            ->assertJsonPath('user.suburb', $profileData['suburb'])
            ->assertJsonPath('user.state', $profileData['state'])
            ->assertJsonPath('user.postcode', $profileData['postcode'])
            ->assertJsonPath('user.country', $profileData['country'])
            ->assertJsonPath('user.space_details', $profileData['space_details']);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'phone' => $profileData['phone'],
            'address_line' => $profileData['address_line'],
            'suburb' => $profileData['suburb'],
            'state' => $profileData['state'],
            'postcode' => $profileData['postcode'],
            'country' => $profileData['country'],
            'space_details' => $profileData['space_details'],
        ]);
    }

    public function test_unauthenticated_user_cannot_update_profile(): void
    {
        $profileData = [
            'phone' => '+61 400 123 456',
            'address_line' => '123 Main Street',
        ];

        $response = $this->putJson(route('foster.profile.update'), $profileData);

        $response->assertUnauthorized();
    }

    public function test_profile_update_validates_input(): void
    {
        $user = User::factory()->create();

        // Test validation with invalid data
        $response = $this
            ->actingAs($user)
            ->putJson(route('foster.profile.update'), [
                'phone' => str_repeat('1', 25), // Too long
                'address_line' => str_repeat('a', 300), // Too long
                'space_details' => str_repeat('a', 6000), // Too long
            ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['phone', 'address_line', 'space_details']);
    }

    public function test_profile_fields_are_nullable(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->putJson(route('foster.profile.update'), []);

        $response->assertOk();
    }

    public function test_authenticated_user_can_upload_profile_photo(): void
    {
        Storage::fake('public');
        
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('profile.jpg', 800, 600);

        $response = $this
            ->actingAs($user)
            ->postJson(route('foster.profile.photo.upload'), [
                'photo' => $file,
            ]);

        $response
            ->assertOk()
            ->assertJson([
                'message' => 'Profile photo uploaded successfully',
            ])
            ->assertJsonStructure([
                'photo_url',
                'path',
            ]);

        // Verify file was stored
        $responsePath = $response->json('path');
        Storage::disk('public')->assertExists($responsePath);

        // Verify database was updated
        $user->refresh();
        $this->assertEquals($responsePath, $user->profile_photo_path);
    }

    public function test_unauthenticated_user_cannot_upload_profile_photo(): void
    {
        Storage::fake('public');
        
        $file = UploadedFile::fake()->image('profile.jpg');

        $response = $this->postJson(route('foster.profile.photo.upload'), [
            'photo' => $file,
        ]);

        $response->assertUnauthorized();
    }

    public function test_profile_photo_upload_validates_file(): void
    {
        Storage::fake('public');
        
        $user = User::factory()->create();

        // Test without file
        $response = $this
            ->actingAs($user)
            ->postJson(route('foster.profile.photo.upload'), []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['photo']);

        // Test with non-image file
        $file = UploadedFile::fake()->create('document.pdf', 1000);

        $response = $this
            ->actingAs($user)
            ->postJson(route('foster.profile.photo.upload'), [
                'photo' => $file,
            ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['photo']);

        // Test with oversized file (3MB)
        $file = UploadedFile::fake()->image('large.jpg')->size(3000);

        $response = $this
            ->actingAs($user)
            ->postJson(route('foster.profile.photo.upload'), [
                'photo' => $file,
            ]);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['photo']);
    }

    public function test_uploading_new_photo_deletes_old_photo(): void
    {
        Storage::fake('public');
        
        $user = User::factory()->create([
            'profile_photo_path' => 'profiles/old-photo.jpg',
        ]);

        // Create the old file to simulate existing photo
        Storage::disk('public')->put('profiles/old-photo.jpg', 'old photo content');

        $newFile = UploadedFile::fake()->image('new-profile.jpg');

        $response = $this
            ->actingAs($user)
            ->postJson(route('foster.profile.photo.upload'), [
                'photo' => $newFile,
            ]);

        $response->assertOk();

        // Verify old file was deleted
        Storage::disk('public')->assertMissing('profiles/old-photo.jpg');

        // Verify new file exists
        $newPath = $response->json('path');
        Storage::disk('public')->assertExists($newPath);
    }

    public function test_profile_photo_is_stored_in_correct_directory(): void
    {
        Storage::fake('public');
        
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('profile.jpg');

        $response = $this
            ->actingAs($user)
            ->postJson(route('foster.profile.photo.upload'), [
                'photo' => $file,
            ]);

        $response->assertOk();

        $path = $response->json('path');
        $this->assertStringStartsWith('profiles/', $path);
    }
}
