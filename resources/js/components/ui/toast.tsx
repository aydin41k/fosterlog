import { X } from 'lucide-react';
import { Button } from './button';

interface ToastProps {
    title: string;
    description?: string;
    variant?: 'default' | 'destructive';
    onClose: () => void;
}

export function Toast({ title, description, variant = 'default', onClose }: ToastProps) {
    const bgColor = variant === 'destructive' ? 'bg-destructive' : 'bg-primary';
    const textColor = 'text-primary-foreground';

    return (
        <div className={`fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg ${bgColor} ${textColor}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h4 className="font-semibold">{title}</h4>
                    {description && <p className="text-sm opacity-90 mt-1">{description}</p>}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="ml-2 h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
