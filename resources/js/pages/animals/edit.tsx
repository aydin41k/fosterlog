import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals/index';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pets',
        href: animals.index().url,
    },
    {
        title: 'Edit Animal',
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
}

interface AnimalFormData {
    name: string;
    species: string;
    dob: string;
    sex: string;
    medical_conditions: string;
    description: string;
    status: string;
}

interface AnimalsEditProps {
    animal: Animal;
    [key: string]: unknown;
}

export default function AnimalsEdit() {
    const { animal } = usePage<AnimalsEditProps>().props;

    const form = useForm<AnimalFormData>({
        name: animal.name || '',
        species: animal.species || '',
        dob: animal.dob || '',
        sex: animal.sex || '',
        medical_conditions: animal.medical_conditions || '',
        description: animal.description || '',
        status: animal.status || 'in_foster',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.put(animals.update(animal.id).url, {
            onSuccess: () => {
                router.visit(animals.index().url);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${animal.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={animals.index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pets
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit {animal.name}</h1>
                        <p className="text-muted-foreground">
                            Update animal information.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Animal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        placeholder="Enter animal name"
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="text-sm text-destructive">{form.errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="species">Species</Label>
                                    <Select
                                        value={form.data.species}
                                        onValueChange={(value) => form.setData('species', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select species" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cat">Cat</SelectItem>
                                            <SelectItem value="dog">Dog</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.species && (
                                        <p className="text-sm text-destructive">{form.errors.species}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        value={form.data.dob}
                                        onChange={(e) => form.setData('dob', e.target.value)}
                                    />
                                    {form.errors.dob && (
                                        <p className="text-sm text-destructive">{form.errors.dob}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sex">Sex</Label>
                                    <Select
                                        value={form.data.sex}
                                        onValueChange={(value) => form.setData('sex', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select sex" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="unknown">Unknown</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.sex && (
                                        <p className="text-sm text-destructive">{form.errors.sex}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={form.data.status}
                                        onValueChange={(value) => form.setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in_foster">In Foster Care</SelectItem>
                                            <SelectItem value="available">Available for Adoption</SelectItem>
                                            <SelectItem value="adopted">Adopted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {form.errors.status && (
                                        <p className="text-sm text-destructive">{form.errors.status}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="medical_conditions">Medical Conditions</Label>
                                <Textarea
                                    id="medical_conditions"
                                    value={form.data.medical_conditions}
                                    onChange={(e) => form.setData('medical_conditions', e.target.value)}
                                    placeholder="List any medical conditions or special needs"
                                    rows={3}
                                />
                                {form.errors.medical_conditions && (
                                    <p className="text-sm text-destructive">{form.errors.medical_conditions}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                    placeholder="Additional information about the animal"
                                    rows={4}
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-destructive">{form.errors.description}</p>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={form.processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {form.processing ? 'Saving...' : 'Update Animal'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(animals.index().url)}
                                    disabled={form.processing}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
