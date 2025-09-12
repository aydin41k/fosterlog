import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { ArrowLeft, Calendar, Heart, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resident Pets',
        href: residentPetsRoutes.index().url,
    },
    {
        title: 'Pet Details',
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

interface ResidentPetsShowProps {
    residentPet: ResidentPet;
}

export default function ResidentPetsShow() {
    const { residentPet } = usePage<ResidentPetsShowProps>().props;

    const calculateAge = (dob: string | undefined) => {
        if (!dob) return 'Unknown';

        const birthDate = new Date(dob);
        const today = new Date();
        const ageInMs = today.getTime() - birthDate.getTime();
        const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));

        if (ageInDays < 30) {
            return `${ageInDays} days old`;
        }

        const ageInMonths = Math.floor(ageInDays / 30.44);
        if (ageInMonths < 12) {
            return `${ageInMonths} months old`;
        }

        const ageInYears = Math.floor(ageInMonths / 12);
        const remainingMonths = ageInMonths % 12;

        if (remainingMonths === 0) {
            return `${ageInYears} years old`;
        }

        return `${ageInYears} years, ${remainingMonths} months old`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${residentPet.name} - Details`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={residentPetsRoutes.index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pets
                        </Link>
                    </Button>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={residentPetsRoutes.edit(residentPet.id).url}>
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Pet Info Header */}
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                        <Heart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{residentPet.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                                {residentPet.species}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">
                            {calculateAge(residentPet.dob)}
                        </p>
                    </div>
                </div>

                {/* Pet Info Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Date of Birth</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {residentPet.dob ? new Date(residentPet.dob).toLocaleDateString() : 'Unknown'}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Species</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold capitalize">{residentPet.species}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Owner</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-semibold">{residentPet.user.name}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notes */}
                {residentPet.notes && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{residentPet.notes}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
