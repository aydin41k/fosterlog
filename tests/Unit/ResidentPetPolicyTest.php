<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\ResidentPet;
use App\Models\User;
use App\Policies\ResidentPetPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class ResidentPetPolicyTest extends TestCase
{
    use RefreshDatabase;

    private ResidentPetPolicy $policy;

    protected function setUp(): void
    {
        parent::setUp();
        $this->policy = new ResidentPetPolicy();
    }

    public function test_view_any_allows_all_authenticated_users(): void
    {
        $user = User::factory()->create();

        $result = $this->policy->viewAny($user);

        $this->assertTrue($result);
    }

    public function test_view_allows_only_owner(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $residentPet = ResidentPet::factory()->create(['user_id' => $owner->id]);

        // Owner can view
        $result = $this->policy->view($owner, $residentPet);
        $this->assertTrue($result);

        // Other user cannot view
        $result = $this->policy->view($otherUser, $residentPet);
        $this->assertFalse($result);
    }

    public function test_create_allows_all_authenticated_users(): void
    {
        $user = User::factory()->create();

        $result = $this->policy->create($user);

        $this->assertTrue($result);
    }

    public function test_update_allows_only_owner(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $residentPet = ResidentPet::factory()->create(['user_id' => $owner->id]);

        // Owner can update
        $result = $this->policy->update($owner, $residentPet);
        $this->assertTrue($result);

        // Other user cannot update
        $result = $this->policy->update($otherUser, $residentPet);
        $this->assertFalse($result);
    }

    public function test_delete_allows_only_owner(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $residentPet = ResidentPet::factory()->create(['user_id' => $owner->id]);

        // Owner can delete
        $result = $this->policy->delete($owner, $residentPet);
        $this->assertTrue($result);

        // Other user cannot delete
        $result = $this->policy->delete($otherUser, $residentPet);
        $this->assertFalse($result);
    }

    public function test_restore_allows_only_owner(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $residentPet = ResidentPet::factory()->create(['user_id' => $owner->id]);

        // Owner can restore
        $result = $this->policy->restore($owner, $residentPet);
        $this->assertTrue($result);

        // Other user cannot restore
        $result = $this->policy->restore($otherUser, $residentPet);
        $this->assertFalse($result);
    }

    public function test_force_delete_allows_only_owner(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $residentPet = ResidentPet::factory()->create(['user_id' => $owner->id]);

        // Owner can force delete
        $result = $this->policy->forceDelete($owner, $residentPet);
        $this->assertTrue($result);

        // Other user cannot force delete
        $result = $this->policy->forceDelete($otherUser, $residentPet);
        $this->assertFalse($result);
    }
}
