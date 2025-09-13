import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes/index';
import { request } from '@/routes/password/index';
import login from '@/routes/login/index';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout title="Welcome back" description="Sign in to continue">
            <Head title="Log in" />

            <div className="w-full space-y-8">
                {/* Status message */}
                {status && (
                    <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
                        <p className="text-sm font-medium text-green-800">{status}</p>
                    </div>
                )}

                <Form {...login.store.form()} resetOnSuccess={['password']} className="space-y-6">
                    {({ processing, errors }) => (
                        <>
                            {/* Email Field */}
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-base font-semibold text-foreground">
                                    Email address
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="your@email.com"
                                        className="pl-12 h-14 text-base border-2 rounded-xl focus:border-primary/50 transition-colors"
                                        inputMode="email"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-base font-semibold text-foreground">
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink 
                                            href={request()} 
                                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" 
                                            tabIndex={5}
                                        >
                                            Forgot?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="pl-12 pr-12 h-14 text-base border-2 rounded-xl focus:border-primary/50 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center touch-manipulation"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember me checkbox */}
                            <div className="flex items-center space-x-3 pt-1">
                                <Checkbox 
                                    id="remember" 
                                    name="remember" 
                                    tabIndex={3}
                                    className="h-6 w-6 border-2"
                                />
                                <Label 
                                    htmlFor="remember" 
                                    className="text-base text-muted-foreground cursor-pointer select-none"
                                >
                                    Remember me
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <LoaderCircle className="h-5 w-5 animate-spin mr-3" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </>
                    )}
                </Form>

                {/* Sign up link */}
                <div className="text-center pt-2">
                    <p className="text-base text-muted-foreground">
                        Don't have an account?{' '}
                        <TextLink 
                            href={register()} 
                            tabIndex={5}
                            className="font-semibold text-primary hover:text-primary/80 transition-colors"
                        >
                            Sign up
                        </TextLink>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
