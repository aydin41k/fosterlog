<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Animal;
use App\Models\AnimalPhoto;
use App\Models\User;
use App\Policies\AnimalPhotoPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class AnimalPhotoPolicyTest extends TestCase
{
    use RefreshDatabase;

    private AnimalPhotoPolicy $policy;

    protected function setUp(): void
    {
        parent::setUp();
        $this->policy = new AnimalPhotoPolicy();
    }

    public function test_view_any_allows_all_authenticated_users(): void
    {
        $user = User::factory()->create();

        $result = $this->policy->viewAny($user);

        $this->assertTrue($result);
    }

    public function test_view_allows_all_authenticated_users(): void
    {
        $user = User::factory()->create();
        $fosterCarer = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $fosterCarer->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $fosterCarer->id,
        ]);

        $result = $this->policy->view($user, $photo);

        $this->assertTrue($result);
    }

    public function test_create_allows_only_foster_carer(): void
    {
        $fosterCarer = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $fosterCarer->id]);

        // Foster carer can create
        $result = $this->policy->create($fosterCarer, $animal);
        $this->assertTrue($result);

        // Other user cannot create
        $result = $this->policy->create($otherUser, $animal);
        $this->assertFalse($result);
    }

    public function test_update_allows_only_foster_carer(): void
    {
        $fosterCarer = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $fosterCarer->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $fosterCarer->id,
        ]);

        // Foster carer can update
        $result = $this->policy->update($fosterCarer, $photo);
        $this->assertTrue($result);

        // Other user cannot update
        $result = $this->policy->update($otherUser, $photo);
        $this->assertFalse($result);
    }

    public function test_delete_allows_only_foster_carer(): void
    {
        $fosterCarer = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $fosterCarer->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $fosterCarer->id,
        ]);

        // Foster carer can delete
        $result = $this->policy->delete($fosterCarer, $photo);
        $this->assertTrue($result);

        // Other user cannot delete
        $result = $this->policy->delete($otherUser, $photo);
        $this->assertFalse($result);
    }

    public function test_restore_allows_only_foster_carer(): void
    {
        $fosterCarer = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $fosterCarer->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $fosterCarer->id,
        ]);

        // Foster carer can restore
        $result = $this->policy->restore($fosterCarer, $photo);
        $this->assertTrue($result);

        // Other user cannot restore
        $result = $this->policy->restore($otherUser, $photo);
        $this->assertFalse($result);
    }

    public function test_force_delete_allows_only_foster_carer(): void
    {
        $fosterCarer = User::factory()->create();
        $otherUser = User::factory()->create();
        $animal = Animal::factory()->create(['foster_carer_id' => $fosterCarer->id]);
        $photo = AnimalPhoto::factory()->create([
            'animal_id' => $animal->id,
            'uploaded_by' => $fosterCarer->id,
        ]);

        // Foster carer can force delete
        $result = $this->policy->forceDelete($fosterCarer, $photo);
        $this->assertTrue($result);

        // Other user cannot force delete
        $result = $this->policy->forceDelete($otherUser, $photo);
        $this->assertFalse($result);
    }
}
