import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Activity, Calendar, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: animals.index().url,
    },
    {
        title: 'Animal Details',
        href: '',
    },
    {
        title: 'Actions',
        href: '',
    },
];

interface Animal {
    id: number;
    name: string;
    species: string;
}

interface Action {
    id: number;
    type: string;
    details: Record<string, string | number | null>;
    performed_at: string;
    performed_by: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface AnimalsActionsProps {
    animal: Animal;
    actions: Action[];
    filter_type: string;
}

export default function AnimalsActions() {
    const { animal, actions, filter_type } = usePage<AnimalsActionsProps>().props;

    const handleFilterChange = (value: string) => {
        const url = new URL(window.location.href);
        if (value === 'all') {
            url.searchParams.delete('type');
        } else {
            url.searchParams.set('type', value);
        }
        router.visit(url.toString());
    };

    const getActionTypeLabel = (type: string) => {
        switch (type) {
            case 'food': return 'Food';
            case 'medication': return 'Medication';
            case 'exercise': return 'Exercise';
            case 'medical': return 'Medical';
            case 'veterinary': return 'Veterinary';
            case 'other': return 'Other';
            default: return type;
        }
    };

    const getActionTypeColor = (type: string) => {
        switch (type) {
            case 'food': return 'default';
            case 'medication': return 'destructive';
            case 'exercise': return 'secondary';
            case 'medical': return 'outline';
            case 'veterinary': return 'outline';
            case 'other': return 'secondary';
            default: return 'outline';
        }
    };

    const renderActionDetails = (action: Action) => {
        switch (action.type) {
            case 'food':
                return (
                    <div className="text-sm">
                        <p><strong>Amount:</strong> {action.details.amount_g}g</p>
                        {action.details.brand && <p><strong>Brand:</strong> {action.details.brand}</p>}
                        {action.details.notes && <p><strong>Notes:</strong> {action.details.notes}</p>}
                    </div>
                );
            case 'medication':
                return (
                    <div className="text-sm">
                        <p><strong>Name:</strong> {action.details.name}</p>
                        <p><strong>Dose:</strong> {action.details.dose}</p>
                        {action.details.notes && <p><strong>Notes:</strong> {action.details.notes}</p>}
                    </div>
                );
            default:
                return (
                    <div className="text-sm">
                        {Object.entries(action.details).map(([key, value]) => (
                            <p key={key}><strong>{key}:</strong> {String(value)}</p>
                        ))}
                    </div>
                );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${animal.name} - Actions`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={animals.show(animal.id).url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pet
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{animal.name} - Actions</h1>
                        <p className="text-muted-foreground">
                            Care activity history and tracking.
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <label htmlFor="type-filter" className="text-sm font-medium">
                                Filter by type:
                            </label>
                            <Select value={filter_type} onValueChange={handleFilterChange}>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Actions</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="medication">Medication</SelectItem>
                                    <SelectItem value="exercise">Exercise</SelectItem>
                                    <SelectItem value="medical">Medical</SelectItem>
                                    <SelectItem value="veterinary">Veterinary</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Actions ({actions.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {actions.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Details</TableHead>
                                        <TableHead>Performed By</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {actions.map((action) => (
                                        <TableRow key={action.id}>
                                            <TableCell>
                                                <Badge variant={getActionTypeColor(action.type) as "default" | "destructive" | "secondary" | "outline"}>
                                                    {getActionTypeLabel(action.type)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {renderActionDetails(action)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {action.performed_by.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {new Date(action.performed_at).toLocaleString()}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8">
                                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No actions found</h3>
                                <p className="text-muted-foreground mb-4">
                                    {filter_type === 'all'
                                        ? `Start recording care activities for ${animal.name}.`
                                        : `No ${filter_type} actions found for ${animal.name}.`
                                    }
                                </p>
                                {filter_type !== 'all' && (
                                    <Button
                                        variant="outline"
                                        onClick={() => handleFilterChange('all')}
                                        className="mr-2"
                                    >
                                        Show All Actions
                                    </Button>
                                )}
                                <Button asChild>
                                    <Link href={animals.show(animal.id).url}>
                                        Add Actions
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
