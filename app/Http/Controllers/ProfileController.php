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
            Storage::disk('public')->delete($user->profile_photo_path);
        }
        
        // Store the new photo
        $path = $request->file('photo')->store('profiles', 'public');
        
        // Update user's profile photo path
        $user->update(['profile_photo_path' => $path]);
        
        return response()->json([
            'message' => 'Profile photo uploaded successfully',
            'photo_url' => Storage::url($path),
            'path' => $path
        ]);
    }
}
