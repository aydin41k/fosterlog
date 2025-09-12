import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        animals_count: number;
        today_actions: number;
        latest_weights: Array<{
            id: number;
            animal: {
                name: string;
            };
            weight_kg: string;
            measured_at: string;
        }>;
    };
    [key: string]: unknown;
}

export default function Dashboard() {
    const { stats } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Quick Stats */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">My Pets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.animals_count}</div>
                            <p className="text-xs text-muted-foreground">
                                Pets in foster care
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today's Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.today_actions}</div>
                            <p className="text-xs text-muted-foreground">
                                Actions performed today
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Latest Weights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.latest_weights.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Recent weight recordings
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Latest Weight Recordings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Weight Recordings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {stats.latest_weights.length > 0 ? (
                            <div className="space-y-4">
                                {stats.latest_weights.map((weight) => (
                                    <div key={weight.id} className="flex items-center justify-between border-b pb-2">
                                        <div>
                                            <p className="font-medium">{weight.animal.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(weight.measured_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">{weight.weight_kg} kg</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No weight recordings yet.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
