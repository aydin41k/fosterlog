import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import animals from '@/routes/animals/index';
import animalWeights from '@/routes/animal-weights/index';
import { useCallback, useEffect, useState } from 'react';
import { Plus, Scale, Trash2, TrendingUp } from 'lucide-react';
import { getXsrfToken } from '@/lib/csrf';

interface Animal {
    id: number;
    name: string;
}

interface AnimalWeight {
    id: number;
    animal_id: number;
    measured_at: string;
    weight_kg: string;
    notes?: string;
    recorded_by: number;
    recorded_by?: {
        name: string;
    };
}

interface WeightsTabProps {
    animal: Animal;
}

export default function WeightsTab({ animal }: WeightsTabProps) {
    const { toast } = useToast();
    const [weights, setWeights] = useState<AnimalWeight[]>([]);
    const [loading, setLoading] = useState(true);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const addForm = useForm({
        weight_kg: '',
        measured_at: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const fetchWeights = useCallback(async () => {
        try {
            const response = await fetch(animals.weights.url(animal.id), {
                headers: { 'Accept': 'application/json' },
                credentials: 'same-origin',
            });
            if (response.ok) {
                const data = await response.json();
                setWeights(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch weights:', error);
        } finally {
            setLoading(false);
        }
    }, [animal.id]);

    // Fetch weights on mount and when dependencies change
    useEffect(() => {
        fetchWeights();
    }, [fetchWeights]);

    const handleAddWeight = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(animals.weights.store.url(animal.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': getXsrfToken(),
                },
                body: JSON.stringify({
                    weight_kg: addForm.data.weight_kg,
                    measured_at: addForm.data.measured_at,
                    notes: addForm.data.notes,
                }),
                credentials: 'same-origin',
            });

            if (response.ok) {
                const newWeight = await response.json();
                // Optimistic UI update
                setWeights(prev => [newWeight.data, ...prev]);
                setAddDialogOpen(false);
                addForm.reset();

                toast({
                    title: 'Success',
                    description: 'Weight record added successfully',
                });
            } else {
                const error = await response.json();
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to add weight record',
                    variant: 'destructive',
                });
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to add weight record',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteWeight = async (weightId: number) => {
        try {
            const response = await fetch(animalWeights.destroy.url(weightId), {
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
                setWeights(prev => prev.filter(weight => weight.id !== weightId));

                toast({
                    title: 'Success',
                    description: 'Weight record deleted successfully',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete weight record',
                    variant: 'destructive',
                });
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to delete weight record',
                variant: 'destructive',
            });
        }
    };

    // Simple chart data (last 10 weights)
    const chartData = weights
        .slice(0, 10)
        .reverse()
        .map((weight, index) => ({
            date: new Date(weight.measured_at).toLocaleDateString(),
            weight: parseFloat(weight.weight_kg),
            index,
        }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Weight Records</h3>
                    <p className="text-sm text-muted-foreground">
                        Track {animal.name}'s weight over time
                    </p>
                </div>
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Weight
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Weight Record</DialogTitle>
                            <DialogDescription>
                                Record a new weight measurement for {animal.name}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddWeight}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="weight_kg">Weight (kg)</Label>
                                    <Input
                                        id="weight_kg"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        max="200"
                                        value={addForm.data.weight_kg}
                                        onChange={(e) => addForm.setData('weight_kg', e.target.value)}
                                        placeholder="Enter weight in kg"
                                        required
                                    />
                                    {addForm.errors.weight_kg && (
                                        <p className="text-sm text-destructive mt-1">
                                            {addForm.errors.weight_kg}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="measured_at">Date Measured</Label>
                                    <Input
                                        id="measured_at"
                                        type="date"
                                        value={addForm.data.measured_at}
                                        onChange={(e) => addForm.setData('measured_at', e.target.value)}
                                        required
                                    />
                                    {addForm.errors.measured_at && (
                                        <p className="text-sm text-destructive mt-1">
                                            {addForm.errors.measured_at}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="notes">Notes (optional)</Label>
                                    <Textarea
                                        id="notes"
                                        value={addForm.data.notes}
                                        onChange={(e) => addForm.setData('notes', e.target.value)}
                                        placeholder="Any additional notes"
                                        rows={3}
                                    />
                                    {addForm.errors.notes && (
                                        <p className="text-sm text-destructive mt-1">
                                            {addForm.errors.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter className="mt-6">
                                <Button type="submit" disabled={addForm.processing}>
                                    {addForm.processing ? 'Adding...' : 'Add Weight'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Simple Weight Chart */}
            {chartData.length > 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Weight Trend (Last 10 Records)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48 flex items-end gap-2">
                            {chartData.map((point, index) => {
                                const maxWeight = Math.max(...chartData.map(p => p.weight));
                                const minWeight = Math.min(...chartData.map(p => p.weight));
                                const range = maxWeight - minWeight || 1;
                                const height = ((point.weight - minWeight) / range) * 100;

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                                            style={{ height: `${Math.max(height, 5)}%` }}
                                            title={`${point.weight}kg on ${point.date}`}
                                        />
                                        <span className="text-xs text-muted-foreground rotate-45 origin-center">
                                            {point.date}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Weight Records List */}
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="animate-pulse space-y-2">
                                    <div className="h-4 bg-muted rounded w-1/4"></div>
                                    <div className="h-6 bg-muted rounded w-1/6"></div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : weights.length > 0 ? (
                <div className="space-y-4">
                    {weights.map((weight) => (
                        <Card key={weight.id}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                                            <Scale className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold">{weight.weight_kg} kg</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(weight.measured_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {weight.recorded_by && (
                                                <p className="text-sm text-muted-foreground">
                                                    Recorded by {weight.recorded_by.name}
                                                </p>
                                            )}
                                            {weight.notes && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {weight.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteWeight(weight.id)}
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
                        <Scale className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No weight records</h3>
                        <p className="text-muted-foreground mb-4">
                            Start tracking {animal.name}'s weight by adding the first record
                        </p>
                        <Button onClick={() => setAddDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Weight Record
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
