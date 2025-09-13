import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
// No dialog needed for Approach 1 (upload on submit)
import AppLayout from '@/layouts/app-layout';
import animals from '@/routes/animals/index';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Foster Pets',
        href: animals.index().url,
    },
    {
        title: 'Add a Foster Pet',
        href: animals.create().url,
    },
];

interface AnimalFormData {
    name: string;
    species: string;
    dob: string;
    sex: string;
    medical_conditions: string;
    description: string;
    status: string;
    // Approach 1: allow single photo + caption on create
    photo: File | null;
    caption: string;
}

export default function AnimalsCreate() {
    const form = useForm<AnimalFormData>({
        name: '',
        species: 'cat',
        dob: '',
        sex: 'unknown',
        medical_conditions: '',
        description: '',
        status: 'in_foster',
        photo: null,
        caption: '',
    });

    // Local preview URL for the selected image (mobile friendly UX)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    useEffect(() => {
        if (form.data.photo) {
            const url = URL.createObjectURL(form.data.photo);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreviewUrl(null);
        return undefined;
    }, [form.data.photo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Inertia will send multipart FormData automatically because we include a File
        form.post(animals.store.form().action, {
            onSuccess: () => {
                router.visit(animals.index().url);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a Foster Pet" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 pb-28">
                {/* Mobile sticky header */}
                <div className="md:hidden sticky top-0 z-40 -mx-4 -mt-4 flex items-center gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <Button variant="outline" size="icon" asChild className="rounded-full">
                        <Link href={animals.index().url} aria-label="Back">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="min-w-0">
                        <h1 className="truncate text-base font-semibold">Add New Foster Pet</h1>
                        <p className="text-xs text-muted-foreground">Create a pet and add a photo</p>
                    </div>
                </div>

                {/* Desktop header */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={animals.index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pets
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Add New Animal</h1>
                        <p className="text-muted-foreground">
                            Add a new animal to your foster care.
                        </p>
                    </div>
                </div>

                <form id="animal-create-form" onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Animal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Primary Photo (optional) */}
                            <div className="space-y-3">
                                <Label htmlFor="photo" className="text-sm">Primary Photo (optional)</Label>
                                <div className="relative overflow-hidden rounded-xl border">
                                    {previewUrl ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // trigger file input
                                                const el = document.getElementById('photo-input') as HTMLInputElement | null;
                                                el?.click();
                                            }}
                                            className="group block w-full"
                                            aria-label="Change photo"
                                        >
                                            <img src={previewUrl} alt="Selected preview" className="h-56 w-full object-cover" />
                                            <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                                                <span className="text-xs font-medium text-white/90">Tap to change</span>
                                                <span className="text-xs text-white/80">{form.data.photo?.name}</span>
                                            </div>
                                        </button>
                                    ) : (
                                        <label htmlFor="photo-input" className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 bg-muted/40 p-4 text-center">
                                            <Camera className="h-6 w-6 text-muted-foreground" />
                                            <span className="text-sm font-medium">Add a photo</span>
                                            <span className="text-xs text-muted-foreground">JPG, PNG or GIF up to 5MB</span>
                                        </label>
                                    )}
                                    <input
                                        id="photo-input"
                                        className="sr-only"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            form.setData('photo', file);
                                        }}
                                    />
                                </div>
                                {form.errors.photo && (
                                    <p className="text-sm text-destructive">{String(form.errors.photo)}</p>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="caption">Photo Caption (optional)</Label>
                                    <Textarea
                                        id="caption"
                                        value={form.data.caption}
                                        onChange={(e) => form.setData('caption', e.target.value)}
                                        placeholder="Add a caption for the photo"
                                        rows={3}
                                    />
                                    {form.errors.caption && (
                                        <p className="text-sm text-destructive">{form.errors.caption}</p>
                                    )}
                                </div>
                            </div>

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
                                <Label htmlFor="description">Notes</Label>
                                <Textarea
                                    id="description"
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                    placeholder="Additional information about the pet"
                                    rows={4}
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-destructive">{form.errors.description}</p>
                                )}
                            </div>

                            

                            {/* Desktop actions */}
                            <div className="hidden md:flex gap-4 pt-4">
                                <Button type="submit" disabled={form.processing} className="h-10 px-6">
                                    <Save className="mr-2 h-4 w-4" />
                                    {form.processing ? 'Saving...' : 'Save'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(animals.index().url)}
                                    disabled={form.processing}
                                    className="h-10 px-6"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>

                {/* Mobile sticky action bar */}
                <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-12 flex-1"
                            onClick={() => router.visit(animals.index().url)}
                            disabled={form.processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="animal-create-form"
                            className="h-12 flex-1"
                            disabled={form.processing}
                        >
                            <Save className="mr-2 h-5 w-5" />
                            {form.processing ? 'Saving…' : 'Save'}
                        </Button>
                    </div>
                    <div className="h-[env(safe-area-inset-bottom)]" />
                </div>
            </div>
        </AppLayout>
    );
}
