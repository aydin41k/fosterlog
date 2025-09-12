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
import { ArrowLeft, Calendar, Heart, Image, Scale, Activity, Edit, Trash2 } from 'lucide-react';
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
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
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

                {/* Animal Info Header */}
                <div className="flex items-center gap-4">
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
                    <Card>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{animal.description}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Tabs */}
                <Card>
                    <CardContent className="p-0">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="photos" className="flex items-center gap-2">
                                    <Image className="h-4 w-4" />
                                    Photos
                                </TabsTrigger>
                                <TabsTrigger value="weights" className="flex items-center gap-2">
                                    <Scale className="h-4 w-4" />
                                    Weights
                                </TabsTrigger>
                                <TabsTrigger value="actions" className="flex items-center gap-2">
                                    <Activity className="h-4 w-4" />
                                    Actions
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="photos" className="p-6">
                                <PhotosTab animal={animal} />
                            </TabsContent>

                            <TabsContent value="weights" className="p-6">
                                <WeightsTab animal={animal} />
                            </TabsContent>

                            <TabsContent value="actions" className="p-6">
                                <ActionsTab animal={animal} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
            </ErrorBoundary>
        </AppLayout>
    );
}
