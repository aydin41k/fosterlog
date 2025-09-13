import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import animals from '@/routes/animals/index';
import actionRoutes from '@/routes/actions/index';
import { useCallback, useEffect, useState } from 'react';
import { Activity, Filter, Plus, Trash2, UtensilsCrossed, Pill } from 'lucide-react';
import { getXsrfToken } from '@/lib/csrf';

interface Animal {
    id: number;
    name: string;
}

interface Action {
    id: number;
    animal_id: number;
    performed_by: number;
    type: string;
    details: {
        amount_g?: number;
        brand?: string;
        dose?: string;
        name?: string;
        notes?: string;
    };
    performed_at: string;
    performed_by?: {
        name: string;
    };
}

interface ActionsTabProps {
    animal: Animal;
}

export default function ActionsTab({ animal }: ActionsTabProps) {
    const { toast } = useToast();
    const [actions, setActions] = useState<Action[]>([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<string>('food');

    const [formData, setFormData] = useState({
        performed_at: new Date().toISOString(),
        amount_g: '',
        brand: '',
        food_notes: '',
        medication_name: '',
        dose: '',
        medication_notes: '',
    });

    const fetchActions = useCallback(async () => {
        try {
            const url = typeFilter === 'all'
                ? animals.actions.url(animal.id)
                : animals.actions.url(animal.id, { query: { type: typeFilter } });

            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin',
            });
            if (response.ok) {
                const data = await response.json();
                setActions(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch actions:', error);
        } finally {
            setLoading(false);
        }
    }, [animal.id, typeFilter]);

    // Fetch actions on mount and when dependencies change
    useEffect(() => {
        fetchActions();
    }, [fetchActions]);

    const handleAddAction = async (e: React.FormEvent) => {
        e.preventDefault();

        // Build details object based on action type
        const details: Record<string, unknown> = {};

        if (actionType === 'food') {
            details.amount_g = parseFloat(formData.amount_g);
            if (formData.brand) details.brand = formData.brand;
            if (formData.food_notes) details.notes = formData.food_notes;
        } else if (actionType === 'medication') {
            details.name = formData.medication_name;
            details.dose = formData.dose;
            if (formData.medication_notes) details.notes = formData.medication_notes;
        }

        try {
            const response = await fetch(animals.actions.store.url(animal.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    type: actionType,
                    details: details,
                    performed_at: formData.performed_at,
                }),
                credentials: 'same-origin',
            });

            if (response.ok) {
                const newAction = await response.json();
                // Optimistic UI update
                setActions(prev => [newAction.data, ...prev]);
                setAddDialogOpen(false);
                setFormData({
                    performed_at: new Date().toISOString(),
                    amount_g: '',
                    brand: '',
                    food_notes: '',
                    medication_name: '',
                    dose: '',
                    medication_notes: '',
                });

                toast({
                    title: 'Success',
                    description: `${actionType === 'food' ? 'Food' : 'Medication'} action recorded successfully`,
                });
            } else {
                const error = await response.json();
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to record action',
                    variant: 'destructive',
                });
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to record action',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteAction = async (actionId: number) => {
        try {
            const response = await fetch(actionRoutes.destroy.url(actionId), {
                method: 'DELETE',
                headers: {
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                // Optimistic UI update
                setActions(prev => prev.filter(action => action.id !== actionId));

                toast({
                    title: 'Success',
                    description: 'Action deleted successfully',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete action',
                    variant: 'destructive',
                });
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to delete action',
                variant: 'destructive',
            });
        }
    };

    const getActionIcon = (type: string) => {
        switch (type) {
            case 'food':
                return <UtensilsCrossed className="h-4 w-4" />;
            case 'medication':
                return <Pill className="h-4 w-4" />;
            default:
                return <Activity className="h-4 w-4" />;
        }
    };

    const getActionDetails = (action: Action) => {
        if (action.type === 'food') {
            return (
                <div className="text-sm">
                    <span className="font-medium">{action.details.amount_g}g</span>
                    {action.details.brand && <span> of {action.details.brand}</span>}
                    {action.details.notes && <p className="text-muted-foreground mt-1">{action.details.notes}</p>}
                </div>
            );
        } else if (action.type === 'medication') {
            return (
                <div className="text-sm">
                    <span className="font-medium">{action.details.name}</span>
                    <span> - {action.details.dose}</span>
                    {action.details.notes && <p className="text-muted-foreground mt-1">{action.details.notes}</p>}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header with Filter */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Actions</h3>
                    <p className="text-sm text-muted-foreground">
                        Track care activities for {animal.name}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-32">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="medication">Medication</SelectItem>
                        </SelectContent>
                    </Select>

                    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Action
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Record New Action</DialogTitle>
                                <DialogDescription>
                                    Add a new care activity for {animal.name}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddAction}>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="type">Action Type</Label>
                                        <Select
                                            value={actionType}
                                            onValueChange={(value) => {
                                                setActionType(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="food">Food</SelectItem>
                                                <SelectItem value="medication">Medication</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="performed_at">Date & Time</Label>
                                        <Input
                                            id="performed_at"
                                            type="datetime-local"
                                            value={formData.performed_at}
                                            onChange={(e) => setFormData(prev => ({ ...prev, performed_at: e.target.value }))}
                                            required
                                        />
                                    </div>

                                    {actionType === 'food' && (
                                        <>
                                            <div>
                                                <Label htmlFor="amount_g">Amount (grams)</Label>
                                                <Input
                                                    id="amount_g"
                                                    type="number"
                                                    min="0.1"
                                                    step="0.1"
                                                    value={formData.amount_g}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, amount_g: e.target.value }))}
                                                    placeholder="e.g. 250"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="brand">Brand (optional)</Label>
                                                <Input
                                                    id="brand"
                                                    value={formData.brand}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                                                    placeholder="e.g. Royal Canin"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="food_notes">Notes (optional)</Label>
                                                <Textarea
                                                    id="food_notes"
                                                    value={formData.food_notes}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, food_notes: e.target.value }))}
                                                    placeholder="Additional notes"
                                                    rows={2}
                                                />
                                            </div>
                                        </>
                                    )}

                                    {actionType === 'medication' && (
                                        <>
                                            <div>
                                                <Label htmlFor="medication_name">Medication Name</Label>
                                                <Input
                                                    id="medication_name"
                                                    value={formData.medication_name}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, medication_name: e.target.value }))}
                                                    placeholder="e.g. Frontline"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="dose">Dose</Label>
                                                <Input
                                                    id="dose"
                                                    value={formData.dose}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, dose: e.target.value }))}
                                                    placeholder="e.g. 1 tablet"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="medication_notes">Notes (optional)</Label>
                                                <Textarea
                                                    id="medication_notes"
                                                    value={formData.medication_notes}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, medication_notes: e.target.value }))}
                                                    placeholder="Administration notes"
                                                    rows={2}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <DialogFooter className="mt-6">
                                    <Button type="submit">
                                        Record Action
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Actions List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="animate-pulse space-y-2">
                                    <div className="h-4 bg-muted rounded w-1/4"></div>
                                    <div className="h-6 bg-muted rounded w-3/4"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : actions.length > 0 ? (
                <div className="space-y-4">
                    {actions.map((action) => (
                        <Card key={action.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                            {getActionIcon(action.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="capitalize">
                                                    {action.type}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(action.performed_at).toLocaleString()}
                                                </span>
                                            </div>
                                            {getActionDetails(action)}
                                            {action.performed_by && (
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    By {action.performed_by.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteAction(action.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="mr-1 h-3 w-3" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No actions recorded</h3>
                        <p className="text-muted-foreground mb-4">
                            Start tracking care activities for {animal.name}
                        </p>
                        <Button onClick={() => setAddDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Record First Action
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
