<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\ActionType;
use App\Http\Resources\ActionResource;
use App\Models\Action;
use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

final class ActionController extends Controller
{
    /**
     * Display a listing of actions for an animal.
     */
    public function index(Request $request, Animal $animal): AnonymousResourceCollection
    {
        Gate::authorize('viewAny', Action::class);
        
        // Only allow viewing actions for animals assigned to current user
        if ($request->user()->id !== $animal->foster_carer_id) {
            abort(403);
        }

        $query = $animal->actions()->with('performedBy:id,name');

        // Filter by type if specified
        if ($request->has('type')) {
            $type = $request->query('type');
            
            // Validate the type parameter
            if (!in_array($type, ['food', 'medication'])) {
                return response()->json([
                    'error' => 'Invalid type. Must be "food" or "medication".'
                ], 400);
            }
            
            $query->where('type', $type);
        }

        $actions = $query->orderBy('performed_at', 'desc')->get();

        return ActionResource::collection($actions);
    }

    /**
     * Store a newly created action.
     */
    public function store(Request $request, Animal $animal): ActionResource
    {
        Gate::authorize('create', [Action::class, $animal]);

        // Basic validation
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(['food', 'medication'])],
            'performed_at' => 'nullable|date',
            'details' => 'required|array',
        ]);

        // Type-specific validation
        $this->validateDetailsForType($validated['type'], $validated['details']);

        $action = Action::create([
            'animal_id' => $animal->id,
            'performed_by' => $request->user()->id,
            'type' => ActionType::from($validated['type']),
            'details' => $validated['details'],
            'performed_at' => $validated['performed_at'] ?? now(),
        ]);

        return new ActionResource($action->load('performedBy:id,name'));
    }

    /**
     * Remove the specified action.
     */
    public function destroy(Action $action)
    {
        Gate::authorize('delete', $action);

        $action->delete();

        return response()->json(null, 204);
    }

    /**
     * Validate details based on action type.
     */
    private function validateDetailsForType(string $type, array $details): void
    {
        if ($type === 'food') {
            // Validate food details
            if (!isset($details['amount_g'])) {
                abort(422, 'Food actions require "amount_g" in details.');
            }

            if (!is_numeric($details['amount_g']) || $details['amount_g'] <= 0) {
                abort(422, 'Food "amount_g" must be a positive number.');
            }

            // Optional fields validation
            if (isset($details['brand']) && !is_string($details['brand']) && !is_null($details['brand'])) {
                abort(422, 'Food "brand" must be a string or null.');
            }

            if (isset($details['notes']) && !is_string($details['notes']) && !is_null($details['notes'])) {
                abort(422, 'Food "notes" must be a string or null.');
            }

        } elseif ($type === 'medication') {
            // Validate medication details
            if (!isset($details['name']) || !is_string($details['name']) || empty(trim($details['name']))) {
                abort(422, 'Medication actions require "name" as a non-empty string in details.');
            }

            if (!isset($details['dose']) || !is_string($details['dose']) || empty(trim($details['dose']))) {
                abort(422, 'Medication actions require "dose" as a non-empty string in details.');
            }

            // Optional notes validation
            if (isset($details['notes']) && !is_string($details['notes']) && !is_null($details['notes'])) {
                abort(422, 'Medication "notes" must be a string or null.');
            }
        }
    }
}
