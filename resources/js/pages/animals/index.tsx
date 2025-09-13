import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Edit, Plus, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Foster Pets',
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
    photos: Array<{
        id: number;
        url: string;
        is_primary: boolean;
        caption?: string;
    }>;
}

interface AnimalsIndexProps {
    animals: Animal[];
    [key: string]: unknown;
}

export default function AnimalsIndex() {
    const { animals: animalsList } = usePage<AnimalsIndexProps>().props;

    // Default: show fostered and available pets only
    const [showAll, setShowAll] = useState(false);
    const displayedAnimals = useMemo(() => {
        if (showAll) return animalsList;
        return animalsList.filter(
            (a) => a.status === 'in_foster' || a.status === 'available'
        );
    }, [animalsList, showAll]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Pets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 pb-24 md:pb-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAll((s) => !s)}
                            className="hidden md:inline-flex"
                        >
                            {showAll ? 'Show Foster & Available' : 'Show All Pets'}
                        </Button>
                        <Button asChild className="hidden md:inline-flex">
                            <Link href={animals.create().url}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add a Pet
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile: each pet is its own Card */}
                <div className="md:hidden">
                    {displayedAnimals.length > 0 ? (
                        <>
                            <div className="px-1 text-sm font-medium text-muted-foreground">
                                {showAll
                                    ? `All Pets (${animalsList.length})`
                                    : `Foster & Available (${displayedAnimals.length})`}
                            </div>
                            <div className="mt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowAll((s) => !s)}
                                    className="w-full"
                                >
                                    {showAll ? 'Show Foster & Available' : 'Show All Pets'}
                                </Button>
                            </div>
                            <ul className="mt-2 space-y-3">
                                {displayedAnimals.map((animal) => (
                                    <li key={animal.id}>
                                        <Link
                                            href={`/animals/${animal.id}`}
                                            className="block active:opacity-80"
                                            aria-label={`View details for ${animal.name}`}
                                        >
                                            <Card className="shadow-sm">
                                                <CardContent className="p-3">
                                                    <div className="flex items-center gap-3">
                                                        {animal.photos.length ? (
                                                            <img
                                                                src={animal.photos.filter((photo) => photo.is_primary)[0].url}
                                                                alt={`${animal.name} photo`}
                                                                className="h-12 w-12 flex-none rounded-md object-cover"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 flex-none rounded-md bg-muted flex items-center justify-center">
                                                                <span className="text-[10px] text-muted-foreground">No photo</span>
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="min-w-0 truncate font-medium">
                                                                    {animal.name}
                                                                </span>
                                                                {animal.status === 'adopted' && (
                                                                    <Badge variant="destructive">Adopted</Badge>
                                                                )}
                                                                {animal.status === 'available' && (
                                                                    <Badge variant="default">Available</Badge>
                                                                )}
                                                                {animal.status === 'in_foster' && (
                                                                    <Badge variant="secondary">In Foster</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                                You haven't added any pets yet.
                            </p>
                            <Button asChild>
                                <Link href={animals.create().url}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Your First Pet
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Desktop: table inside Card */}
                <div className="hidden md:block">
                    <Card className="md:shadow-sm">
                        <CardHeader>
                            <CardTitle>
                                {showAll
                                    ? `Pets (${animalsList.length})`
                                    : `Pets (${displayedAnimals.length} of ${animalsList.length})`}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {displayedAnimals.length > 0 ? (
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
                                {displayedAnimals.map((animal) => (
                                    <TableRow key={animal.id} className={animal.status === 'adopted' ? 'opacity-60' : undefined}>
                                        <TableCell>
                                            {animal.primary_photo_url ? (
                                                <img
                                                    src={animal.primary_photo_url}
                                                    alt={`${animal.name} photo`}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                                                    <span className="text-xs text-muted-foreground">No photo</span>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{animal.name}</TableCell>
                                        <TableCell className="capitalize">{animal.species || 'Unknown'}</TableCell>
                                        <TableCell>{animal.age_years_months || 'Unknown'}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    animal.status === 'available'
                                                        ? 'default'
                                                        : animal.status === 'in_foster'
                                                        ? 'secondary'
                                                        : animal.status === 'adopted'
                                                        ? 'destructive'
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
                                        You haven't added any pets yet.
                                    </p>
                                    <Button asChild>
                                        <Link href={animals.create().url}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Your First Pet
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Mobile floating action button */}
                <div className="md:hidden">
                    <Button
                        asChild
                        className="fixed bottom-16 right-4 h-12 w-12 rounded-full shadow-lg"
                        aria-label="Add a pet"
                    >
                        <Link href={animals.create().url}>
                            <Plus className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
