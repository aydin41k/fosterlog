import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Edit, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Animals',
        href: animals.index().url,
    },
];

interface Animal {
    id: number;
    name: string;
    species: string;
    status: string;
    primary_photo_url?: string;
    status_label: string;
    age_years_months?: string;
}

interface AnimalsIndexProps {
    animals: Animal[];
    [key: string]: unknown;
}

export default function AnimalsIndex() {
    const { animals: animalsList } = usePage<AnimalsIndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Pets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Pets</h1>
                        <p className="text-muted-foreground">
                            Manage your foster pets and their information.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={animals.create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add a Pet
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Pets ({animalsList.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {animalsList.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Photo</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Species</TableHead>
                                        <TableHead>Age</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {animalsList.map((animal) => (
                                        <TableRow key={animal.id}>
                                            <TableCell>
                                                {animal.primary_photo_url ? (
                                                    <img
                                                        src={animal.primary_photo_url}
                                                        alt={`${animal.name} photo`}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                                                        <span className="text-xs text-muted-foreground">
                                                            No photo
                                                        </span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {animal.name}
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {animal.species || 'Unknown'}
                                            </TableCell>
                                            <TableCell>
                                                {animal.age_years_months || 'Unknown'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        animal.status === 'available'
                                                            ? 'default'
                                                            : animal.status === 'in_foster'
                                                            ? 'secondary'
                                                            : 'outline'
                                                    }
                                                >
                                                    {animal.status_label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/animals/${animal.id}`}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground mb-4">
                                    You haven't added any animals yet.
                                </p>
                                <Button asChild>
                                    <Link href={animals.create().url}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Your First Animal
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
