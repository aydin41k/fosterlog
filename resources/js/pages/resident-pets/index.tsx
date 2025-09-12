import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
// Using hardcoded routes for resident-pets since they're not auto-generated
const residentPetsRoutes = {
    index: () => ({ url: '/resident-pets' }),
    create: () => ({ url: '/resident-pets/create' }),
    show: (id: number) => ({ url: `/resident-pets/${id}` }),
    edit: (id: number) => ({ url: `/resident-pets/${id}/edit` }),
};
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Heart, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Resident Pets',
        href: '',
    },
];

interface ResidentPet {
    id: number;
    name: string;
    species: string;
    dob?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface ResidentPetsIndexProps {
    residentPets: ResidentPet[];
}

export default function ResidentPetsIndex() {
    const { residentPets } = usePage<ResidentPetsIndexProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Resident Pets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Resident Pets</h1>
                        <p className="text-muted-foreground">
                            Manage your household pets and their information.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={residentPetsRoutes.create().url}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Pet
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Resident Pets ({residentPets.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {residentPets.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Species</TableHead>
                                        <TableHead>Age</TableHead>
                                        <TableHead>Notes</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {residentPets.map((pet) => (
                                        <TableRow key={pet.id}>
                                            <TableCell className="font-medium">
                                                {pet.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="capitalize">
                                                    {pet.species}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {pet.dob ? new Date(pet.dob).toLocaleDateString() : 'Unknown'}
                                            </TableCell>
                                            <TableCell>
                                                {pet.notes || '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={residentPetsRoutes.show(pet.id).url}>
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
                                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No resident pets yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Add your household pets to keep track of their information.
                                </p>
                                <Button asChild>
                                    <Link href={residentPetsRoutes.create().url}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Your First Pet
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
