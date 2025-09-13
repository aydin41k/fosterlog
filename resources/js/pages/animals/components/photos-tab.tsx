import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm, usePage } from '@inertiajs/react';
import animals from '@/routes/animals/index';
import animalPhotos from '@/routes/animal-photos/index';
import { useState } from 'react';
import { Camera, Star, Trash2, Upload, Loader2 } from 'lucide-react';
import { getXsrfToken } from '@/lib/csrf';

interface Animal {
    id: number;
    name: string;
}

interface AnimalPhoto {
    id: number;
    animal_id: number;
    uploaded_by: number;
    path: string;
    caption?: string;
    is_primary: boolean;
    url: string;
    created_at: string;
}

interface PhotosTabProps {
    animal: Animal;
}

export default function PhotosTab({ animal }: PhotosTabProps) {
    const DEBUG = false;
    const { toast } = useToast();
    const { props } = usePage();
    const [photos, setPhotos] = useState<AnimalPhoto[]>((props as { photos?: AnimalPhoto[] }).photos || []);
    const [uploading, setUploading] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; photoId: number | null }>({ open: false, photoId: null });
    const [confirmPrimary, setConfirmPrimary] = useState<{ open: boolean; photoId: number | null }>({ open: false, photoId: null });
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [settingPrimaryId, setSettingPrimaryId] = useState<number | null>(null);

    // Debug: log mount and animal context
    if (DEBUG) {
         
        console.log('[PhotosTab] mount', { animal });
    }

    const uploadForm = useForm({
        photo: null as File | null,
        caption: '',
    });

    const handlePhotoUpload = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e && 'preventDefault' in e) e.preventDefault();

        if (!uploadForm.data.photo) {
            if (DEBUG) {
                 
                console.warn('[PhotosTab] Upload clicked without photo selected');
            }
            toast({
                title: 'Error',
                description: 'Please select a photo to upload',
                variant: 'destructive',
            });
            return;
        }

        if (!animal || typeof animal.id !== 'number') {
            if (DEBUG) {
                 
                console.error('[PhotosTab] Missing animal.id; cannot build upload URL', { animal });
            }
            toast({ title: 'Error', description: 'Animal context not ready', variant: 'destructive' });
            return;
        }

        setUploading(true);

        try {
            const token = getXsrfToken();
            const url = animals.photos.url(animal.id);
            if (DEBUG) {
                 
                console.log('[PhotosTab] Starting upload', {
                    url,
                    hasToken: !!token,
                    caption: uploadForm.data.caption,
                    fileName: uploadForm.data.photo?.name,
                    fileType: uploadForm.data.photo?.type,
                    fileSize: uploadForm.data.photo?.size,
                });
            }
            const formData = new FormData();
            formData.append('photo', uploadForm.data.photo);
            formData.append('caption', uploadForm.data.caption);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': token,
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData,
                credentials: 'same-origin',
            });

            if (DEBUG) {
                 
                console.log('[PhotosTab] Upload response', response.status, response.statusText);
            }
            if (response.ok) {
                const newPhoto = await response.json();

                // Optimistic UI update
                setPhotos(prev => [...prev, newPhoto.data]);

                setUploadDialogOpen(false);
                uploadForm.reset();

                toast({
                    title: 'Success',
                    description: 'Photo uploaded successfully',
                });
            } else {
                let error: Record<string, unknown> = {};
                try {
                    error = await response.json();
                } catch {
                     
                    console.error('[PhotosTab] Failed to parse error JSON');
                }
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to upload photo',
                    variant: 'destructive',
                });
                if (DEBUG) {
                     
                    console.error('[PhotosTab] Upload failed', { status: response.status, error });
                }
            }
        } catch (err) {
            if (DEBUG) {
                 
                console.error('[PhotosTab] Upload threw error', err);
            }
            toast({
                title: 'Error',
                description: 'Failed to upload photo',
                variant: 'destructive',
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSetPrimary = async (photoId: number) => {
        try {
            setSettingPrimaryId(photoId);
            const url = animalPhotos.update.url(photoId);
            if (DEBUG) {
                
                console.log('[PhotosTab] Set primary', { photoId, url });
            }
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ is_primary: true }),
                credentials: 'same-origin',
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: 'Primary photo updated',
                });
                // Force a full refresh to reflect new primary photo across the page
                window.location.reload();
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to set primary photo',
                    variant: 'destructive',
                });
                if (DEBUG) {
                    
                    console.error('[PhotosTab] Set primary failed', response.status);
                }
            }
        } catch (err) {
            if (DEBUG) {
                 
                console.error('[PhotosTab] Set primary threw error', err);
            }
            toast({
                title: 'Error',
                description: 'Failed to set primary photo',
                variant: 'destructive',
            });
        } finally {
            setSettingPrimaryId(null);
            setConfirmPrimary({ open: false, photoId: null });
        }
    };

    const handleDeletePhoto = async (photoId: number) => {
        try {
            setDeletingId(photoId);
            const url = animalPhotos.destroy.url(photoId);
            if (DEBUG) {
                 
                console.log('[PhotosTab] Delete photo', { photoId, url });
            }
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                // Optimistic UI update
                setPhotos(prev => prev.filter(photo => photo.id !== photoId));

                toast({
                    title: 'Success',
                    description: 'Photo deleted successfully',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to delete photo',
                    variant: 'destructive',
                });
            }
        } catch (err) {
            if (DEBUG) {
                 
                console.error('[PhotosTab] Delete threw error', err);
            }
            toast({
                title: 'Error',
                description: 'Failed to delete photo',
                variant: 'destructive',
            });
        } finally {
            setDeletingId(null);
            setConfirmDelete({ open: false, photoId: null });
        }
    };

    const safePostUrl = animal && typeof animal.id === 'number' ? animals.photos.url(animal.id) : 'N/A';

    return (
        <div className="space-y-6">
            {/* Upload Photo Button */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold">Photos</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage photos for {animal.name}
                    </p>
                </div>
                <Dialog
                    open={uploadDialogOpen}
                    onOpenChange={(open) => {
                        if (DEBUG) {
                             
                            console.log('[PhotosTab] Dialog open change', open);
                        }
                        setUploadDialogOpen(open);
                    }}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Photo</DialogTitle>
                            <DialogDescription>
                                Add a new photo for {animal.name}
                            </DialogDescription>
                        </DialogHeader>
                        <form>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="photo">Photo</Label>
                                    <Input
                                        id="photo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            uploadForm.setData('photo', file);
                                            if (DEBUG) {
                                                 
                                                console.log('[PhotosTab] File selected', file ? { name: file.name, type: file.type, size: file.size } : null);
                                            }
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="caption">Caption (optional)</Label>
                                    <Textarea
                                        id="caption"
                                        value={uploadForm.data.caption}
                                        onChange={(e) => uploadForm.setData('caption', e.target.value)}
                                        placeholder="Add a caption for this photo"
                                        rows={3}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            onClick={(e) => {
                                if (DEBUG) {
                                     
                                    console.log('[PhotosTab] Upload button clicked', { uploading, hasPhoto: !!uploadForm.data.photo });
                                }
                                void handlePhotoUpload(e);
                            }}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Photos Grid */}
            {photos.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {photos.map((photo) => (
                        <Card key={photo.id}>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div className="relative">
                                        <img
                                            src={photo.url}
                                            alt={photo.caption || 'Animal photo'}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        {photo.is_primary && (
                                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-current" />
                                                Primary
                                            </div>
                                        )}
                                    </div>

                                    {photo.caption && (
                                        <p className="text-sm text-muted-foreground">{photo.caption}</p>
                                    )}

                                    <div className="flex gap-2">
                                        {!photo.is_primary && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setConfirmPrimary({ open: true, photoId: photo.id })}
                                                disabled={settingPrimaryId !== null}
                                            >
                                                {settingPrimaryId === photo.id ? (
                                                    <>
                                                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                                        Setting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Star className="mr-1 h-3 w-3" />
                                                        Set Primary
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setConfirmDelete({ open: true, photoId: photo.id })}
                                            className="text-destructive hover:text-destructive"
                                            disabled={deletingId !== null}
                                        >
                                            {deletingId === photo.id ? (
                                                <>
                                                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="mr-1 h-3 w-3" />
                                                    Delete
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-8 text-center">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No photos yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Upload some photos to get started
                        </p>
                        <Button onClick={() => {
                            if (DEBUG) {
                                 
                                console.log('[PhotosTab] Open dialog via CTA');
                            }
                            setUploadDialogOpen(true);
                        }}>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload First Photo
                        </Button>
                    </CardContent>
                </Card>
            )}

            {DEBUG && (
                <div className="text-xs text-muted-foreground">
                    <div>Debug:</div>
                    <pre className="whitespace-pre-wrap break-words">{JSON.stringify({
                        uploading,
                        uploadDialogOpen,
                        hasPhoto: !!uploadForm.data.photo,
                        csrf: (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ? 'present' : 'missing',
                        postUrl: safePostUrl,
                    }, null, 2)}</pre>
                </div>
            )}

            {/* Confirm Delete Dialog */}
            <Dialog open={confirmDelete.open} onOpenChange={(open) => setConfirmDelete({ open, photoId: open ? confirmDelete.photoId : null })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Photo</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this photo? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setConfirmDelete({ open: false, photoId: null })}
                            disabled={deletingId !== null}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => confirmDelete.photoId && void handleDeletePhoto(confirmDelete.photoId)}
                            disabled={deletingId !== null}
                        >
                            {deletingId !== null ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Set Primary Dialog */}
            <Dialog
                open={confirmPrimary.open}
                onOpenChange={(open) =>
                    setConfirmPrimary({ open, photoId: open ? confirmPrimary.photoId : null })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Set as Primary</DialogTitle>
                        <DialogDescription>
                            Make this the primary photo? This will replace the current primary photo.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setConfirmPrimary({ open: false, photoId: null })}
                            disabled={settingPrimaryId !== null}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={() => confirmPrimary.photoId && void handleSetPrimary(confirmPrimary.photoId)}
                            disabled={settingPrimaryId !== null}
                        >
                            {settingPrimaryId !== null ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Setting...
                                </>
                            ) : (
                                'Set Primary'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
