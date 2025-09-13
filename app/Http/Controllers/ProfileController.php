<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

final class ProfileController extends Controller
{
    /**
     * Update the authenticated user's profile information.
     */
    public function updateProfile(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        
        $user->update($request->validated());
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user->fresh()
        ]);
    }
    
    /**
     * Upload and store the user's profile photo.
     */
    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // 2MB max
        ]);
        
        $user = $request->user();
        
        // Delete old profile photo if exists
        if ($user->profile_photo_path) {
            // Try to delete from Azure first, fall back to public
            try {
                Storage::disk('azure')->delete($user->profile_photo_path);
            } catch (\Exception $e) {
                Storage::disk('public')->delete($user->profile_photo_path);
            }
        }
        
        // Try Azure storage first, fall back to public if not available
        try {
            $path = $request->file('photo')->store('profiles', 'azure');
        } catch (\Exception $e) {
            $path = $request->file('photo')->store('profiles', 'public');
        }
        
        // Update user's profile photo path
        $user->update(['profile_photo_path' => $path]);
        
        // Generate URL with fallback
        try {
            $photoUrl = Storage::disk('azure')->url($path);
        } catch (\Exception $e) {
            $photoUrl = Storage::disk('public')->url($path);
        }

        return response()->json([
            'message' => 'Profile photo uploaded successfully',
            'photo_url' => $photoUrl,
            'path' => $path
        ]);
    }
}
