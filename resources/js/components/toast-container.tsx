import { useToast } from '@/hooks/use-toast';
import { Toast } from '@/components/ui/toast';

export function ToastContainer() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    title={toast.title}
                    description={toast.description}
                    variant={toast.variant}
                    onClose={() => dismiss(toast.id)}
                />
            ))}
        </div>
    );
}
