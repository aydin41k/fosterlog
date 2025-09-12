import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Scale } from 'lucide-react';

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
        title: 'Weights',
        href: '',
    },
];

interface Animal {
    id: number;
    name: string;
    species: string;
}

interface AnimalWeight {
    id: number;
    weight_kg: number;
    measured_at: string;
    notes?: string;
    recorded_by: number;
    created_at: string;
    updated_at: string;
}

interface AnimalsWeightsProps {
    animal: Animal;
    weights: AnimalWeight[];
}

export default function AnimalsWeights() {
    const { animal, weights } = usePage<AnimalsWeightsProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${animal.name} - Weights`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={animals.show(animal.id).url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pet
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{animal.name} - Weights</h1>
                        <p className="text-muted-foreground">
                            Track weight measurements over time.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="h-5 w-5" />
                            Weight History ({weights.length} records)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {weights.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Weight</TableHead>
                                        <TableHead>Notes</TableHead>
                                        <TableHead>Recorded</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {weights.map((weight) => (
                                        <TableRow key={weight.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {new Date(weight.measured_at).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {weight.weight_kg} kg
                                            </TableCell>
                                            <TableCell>
                                                {weight.notes || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(weight.created_at).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8">
                                <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No weight records yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start tracking {animal.name}'s weight by adding the first measurement.
                                </p>
                                <Button asChild>
                                    <Link href={animals.show(animal.id).url}>
                                        Add First Weight Record
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
