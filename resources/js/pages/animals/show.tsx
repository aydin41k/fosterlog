import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import ErrorBoundary from '@/components/error-boundary';
import animals from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, Form } from '@inertiajs/react';
import { ArrowLeft, Heart, Image, Scale, Activity, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ActionsTab from './components/actions-tab-simple';
import PhotosTab from './components/photos-tab';
import WeightsTab from './components/weights-tab';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: animals.index().url,
    },
    {
        title: 'Animal Details',
        href: '',
    },
];

interface Animal {
    id: number;
    name: string;
    species: string;
    dob: string;
    sex: string;
    medical_conditions: string;
    description: string;
    status: string;
    status_label: string;
    age_years_months: string;
    primary_photo_url?: string;
    foster_carer_id: number;
}

interface AnimalsShowProps {
    animal: Animal;
    [key: string]: unknown;
}

export default function AnimalsShow() {
    const { animal } = usePage<AnimalsShowProps>().props;
    const [activeTab, setActiveTab] = useState('photos');
    const editUrl = animal?.id ? animals.edit.url(animal.id) : animals.index().url;
    const pageTitle = animal?.name ? `${animal.name} - Details` : 'Animal Details';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ErrorBoundary>
            <Head title={pageTitle} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-hidden rounded-none p-0 md:rounded-xl md:p-4">
                {/* Desktop header */}
                <div className="hidden md:flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={animals.index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pets
                        </Link>
                    </Button>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={editUrl}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Delete Animal</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete {animal.name}? This action cannot be undone and will permanently remove all associated data including photos, weights, and actions.
                                </DialogDescription>
                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    {animal?.id && (
                                        <Form {...animals.destroy.form(animal.id)} className="inline">
                                            {() => (
                                                <Button variant="destructive" type="submit">
                                                    Delete Animal
                                                </Button>
                                            )}
                                        </Form>
                                    )}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Mobile hero header */}
                <div className="md:hidden relative">
                    {animal.primary_photo_url ? (
                        <img
                            src={animal.primary_photo_url}
                            alt={`${animal.name} photo`}
                            className="h-56 w-full object-cover"
                        />
                    ) : (
                        <div className="h-56 w-full bg-muted flex items-center justify-center">
                            <Heart className="h-10 w-10 text-muted-foreground" />
                        </div>
                    )}
                    {/* Top controls */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                        <Button variant="secondary" size="icon" asChild className="rounded-full bg-background/80 backdrop-blur">
                            <Link href={animals.index().url} aria-label="Back">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="icon" asChild className="rounded-full bg-background/80 backdrop-blur">
                                <Link href={editUrl} aria-label="Edit">
                                    <Edit className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur" aria-label="More">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Delete Animal</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete {animal.name}? This action cannot be undone and will permanently remove all associated data including photos, weights, and actions.
                                    </DialogDescription>
                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <Button variant="secondary">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        {animal?.id && (
                                            <Form {...animals.destroy.form(animal.id)} className="inline">
                                                {() => (
                                                    <Button variant="destructive" type="submit">
                                                        Delete Animal
                                                    </Button>
                                                )}
                                            </Form>
                                        )}
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    {/* Gradient overlay + name */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                        <h1 className="text-2xl font-bold drop-shadow-sm">{animal.name}</h1>
                        <div className="mt-2 flex items-center gap-2">
                            <Badge variant="secondary" className="capitalize text-foreground">
                                {animal.species}
                            </Badge>
                            <Badge variant="secondary" className="capitalize text-foreground">
                                {animal.sex}
                            </Badge>
                            <Badge
                                variant={
                                    animal.status === 'available'
                                        ? 'default'
                                        : animal.status === 'in_foster'
                                        ? 'secondary'
                                        : 'outline'
                                }
                                className="text-foreground"
                            >
                                {animal.status_label}
                            </Badge>
                        </div>
                        <p className="mt-1 text-sm opacity-90">{animal.age_years_months}</p>
                    </div>
                </div>

                {/* Desktop: Animal Info Header */}
                <div className="hidden md:flex items-center gap-4">
                    {animal.primary_photo_url ? (
                        <img
                            src={animal.primary_photo_url}
                            alt={`${animal.name} photo`}
                            className="h-16 w-16 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                            <Heart className="h-8 w-8 text-muted-foreground" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold">{animal.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                                {animal.species}
                            </Badge>
                            <Badge variant="secondary">
                                {animal.sex}
                            </Badge>
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
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {animal.age_years_months}
                        </p>
                    </div>
                </div>

                {/* Medical Conditions */}
                {animal.medical_conditions && (
                    <Card className="mx-4 md:mx-0">
                        <CardHeader>
                            <CardTitle>Medical Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{animal.medical_conditions}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Description */}
                {animal.description && (
                    <Card className="mx-4 md:mx-0">
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{animal.description}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Tabs */}
                <div className="md:mx-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="photos" className="flex items-center justify-center gap-2 py-3">
                                    <Image className="h-4 w-4" />
                                    Photos
                                </TabsTrigger>
                                <TabsTrigger value="weights" className="flex items-center justify-center gap-2 py-3">
                                    <Scale className="h-4 w-4" />
                                    Weigh-in
                                </TabsTrigger>
                                <TabsTrigger value="actions" className="flex items-center justify-center gap-2 py-3">
                                    <Activity className="h-4 w-4" />
                                    Actions
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="photos" className="p-4 md:p-6">
                            <PhotosTab animal={animal} />
                        </TabsContent>

                        <TabsContent value="weights" className="p-4 md:p-6">
                            <WeightsTab animal={animal} />
                        </TabsContent>

                        <TabsContent value="actions" className="p-4 md:p-6">
                            <ActionsTab animal={animal} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            </ErrorBoundary>
        </AppLayout>
    );
}
