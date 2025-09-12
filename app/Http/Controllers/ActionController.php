<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\ActionType;
use App\Models\Action;
use App\Models\Animal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

final class ActionController extends Controller
{
    /**
     * Display a listing of actions for an animal.
     */
    public function index(Request $request, Animal $animal): \Inertia\Response
    {
        Gate::authorize('view', $animal);

        $query = $animal->actions()->with('performedBy:id,name');

        // Filter by type if specified
        if ($request->has('type')) {
            $type = $request->query('type');

            // Validate the type parameter
            if (!in_array($type, ['food', 'medication'])) {
                abort(400, 'Invalid type. Must be "food" or "medication".');
            }

            $query->where('type', $type);
        }

        $actions = $query->orderBy('performed_at', 'desc')->get();

        return Inertia::render('animals/actions', [
            'animal' => $animal,
            'actions' => $actions,
            'filter_type' => $request->get('type', 'all'),
        ]);
    }

    /**
     * Store a newly created action.
     */
    public function store(Request $request, Animal $animal): \Illuminate\Http\RedirectResponse
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

        Action::create([
            'animal_id' => $animal->id,
            'performed_by' => $request->user()->id,
            'type' => ActionType::from($validated['type']),
            'details' => $validated['details'],
            'performed_at' => $validated['performed_at'] ?? now(),
        ]);

        return redirect()->route('animals.show', $animal)->with('success', 'Action recorded successfully.');
    }

    /**
     * Remove the specified action.
     */
    public function destroy(Action $action): \Illuminate\Http\RedirectResponse
    {
        Gate::authorize('delete', $action);

        $action->delete();

        return redirect()->route('animals.show', $action->animal)->with('success', 'Action deleted successfully.');
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
