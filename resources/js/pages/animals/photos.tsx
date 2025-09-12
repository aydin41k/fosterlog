import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, Image, User } from 'lucide-react';

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
        title: 'Photos',
        href: '',
    },
];

interface Animal {
    id: number;
    name: string;
    species: string;
}

interface AnimalPhoto {
    id: number;
    path: string;
    caption?: string;
    is_primary: boolean;
    created_at: string;
    uploaded_by: {
        id: number;
        name: string;
    };
}

interface AnimalsPhotosProps {
    animal: Animal;
    photos: AnimalPhoto[];
}

export default function AnimalsPhotos() {
    const { animal, photos } = usePage<AnimalsPhotosProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${animal.name} - Photos`} />
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
                        <h1 className="text-2xl font-bold">{animal.name} - Photos</h1>
                        <p className="text-muted-foreground">
                            Photo gallery and management.
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Image className="h-5 w-5" />
                            Photos ({photos.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {photos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {photos.map((photo) => (
                                    <Card key={photo.id} className="overflow-hidden">
                                        <div className="aspect-square relative">
                                            <img
                                                src={`/storage/${photo.path}`}
                                                alt={photo.caption || `${animal.name} photo`}
                                                className="w-full h-full object-cover"
                                            />
                                            {photo.is_primary && (
                                                <Badge
                                                    variant="default"
                                                    className="absolute top-2 right-2"
                                                >
                                                    Primary
                                                </Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-4">
                                            {photo.caption && (
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {photo.caption}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {photo.uploaded_by.name}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(photo.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No photos yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start building a photo gallery for {animal.name}.
                                </p>
                                <Button asChild>
                                    <Link href={animals.show(animal.id).url}>
                                        Add Photos
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
