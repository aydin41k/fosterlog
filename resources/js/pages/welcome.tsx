import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import animals from '@/routes/animals/index';
import { login, register } from '@/routes/index';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Activity, Camera, PawPrint, Pill, Scale, ShieldCheck } from 'lucide-react';

export default function Welcome() {
    const { auth, quote } = usePage<SharedData>().props;

    return (
        <>
            <Head title="FosterLog">
                <meta
                    name="description"
                    content="FosterLog helps foster carers organize everything for each pet — photos, weights, food, medications, and more."
                />
            </Head>

            <div className="relative min-h-screen bg-background text-foreground">
                {/* Decorative pattern */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-background" />
                    <PlaceholderPattern className="absolute -top-24 left-1/2 h-[900px] w-[900px] -translate-x-1/2 stroke-muted/40 [mask-image:radial-gradient(closest-side,white,transparent)]" />
                </div>

                {/* Top navigation */}
                <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                    <Link href="/" className="flex items-center">
                        <AppLogo />
                    </Link>

                    <nav className="flex items-center gap-2">
                        <div className="hidden md:block">
                            <Button asChild variant="ghost">
                                <Link href="/adopt/cats">Browse Cats</Link>
                            </Button>
                        </div>
                        {auth?.user ? (
                            <Button asChild variant="secondary">
                                <Link href={animals.index().url}>My Account</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href={login()}>Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={register()}>Get Started</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero */}
                <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8 md:pb-24 md:pt-14">
                    <div className="grid items-center gap-10 md:grid-cols-2">
                        <section className="space-y-6">
                            <div className="flex flex-wrap gap-3 justify-center md:hidden">
                                {auth?.user ? (
                                    <>
                                        <Button asChild size="lg" variant="secondary">
                                            <Link href="/adopt/cats">Browse Cats</Link>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button asChild size="lg">
                                            <Link href={register()}>Create an account</Link>
                                        </Button>
                                        <Button asChild size="lg" variant="outline">
                                            <Link href={login()}>Log in</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                            <div>
                                <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                                    Manage every foster pet with care
                                </h1>
                                <p className="mt-3 max-w-prose text-lg text-muted-foreground">
                                    FosterLog keeps photos, weights, feeding, and medications beautifully organized —
                                    so you can focus on giving great care.
                                </p>
                            </div>
                            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                        <PawPrint className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium leading-none">Foster-ready</p>
                                        <p className="mt-1 text-sm text-muted-foreground">Built around real foster workflows.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                        <Camera className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium leading-none">Photo management</p>
                                        <p className="mt-1 text-sm text-muted-foreground">Upload, set primary, and share updates.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                        <Scale className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium leading-none">Weight tracking</p>
                                        <p className="mt-1 text-sm text-muted-foreground">Visual trends and quick logging.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
                                        <Pill className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium leading-none">Care actions</p>
                                        <p className="mt-1 text-sm text-muted-foreground">Track food and medications reliably.</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <section className="relative order-first overflow-hidden rounded-xl border bg-card shadow-sm md:order-none">
                            <img
                                src="/fosterlog_logo.jpg"
                                alt="FosterLog screenshot"
                                className="h-full w-full object-cover opacity-95"
                                loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                        </section>
                    </div>

                    {/* Social proof / quote */}
                    <section className="mt-14 grid gap-6 rounded-xl border bg-card p-6 shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-center">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ShieldCheck className="h-4 w-4" />
                            Privacy-first. Your foster data stays with you.
                        </div>
                        <div className="hidden h-8 w-px bg-border md:block" />
                        <blockquote className="text-balance text-sm text-muted-foreground md:text-center">
                            “{quote?.message ?? 'The right tool makes caring easier.'}” — {quote?.author ?? 'FosterLog'}
                        </blockquote>
                    </section>

                    {/* Secondary features */}
                    <section className="mt-12 grid gap-6 sm:grid-cols-2">
                        <FeatureCard
                            icon={<Activity className="h-5 w-5" />}
                            title="Everything in one place"
                            description="Animals, photos, weights, and actions come together in a clean, unified UI."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="h-5 w-5" />}
                            title="Policy-aware access"
                            description="Only you can manage your foster pets. Secure by default with web auth."
                        />
                    </section>
                </main>

                <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} FosterLog. Made for foster carers.
                    {' '}
                    <Link href={login()} className="underline-offset-2 hover:underline">
                        Log in
                    </Link>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex gap-3 rounded-lg border bg-card p-4 shadow-sm">
            <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">{icon}</div>
            <div>
                <p className="font-medium leading-none">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
