import AppLogo from '@/components/app-logo'
import { Button } from '@/components/ui/button'
import animals from '@/routes/animals/index'
import { login } from '@/routes/index'
import { Link, usePage } from '@inertiajs/react'
import type { SharedData } from '@/types'

export default function PublicTopbar() {
  const { auth } = usePage<SharedData>().props as Partial<SharedData>
  const isLoggedIn = !!auth?.user

  return (
    <header className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 md:py-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <AppLogo />
        </Link>
        <nav className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button asChild>
              <Link href={animals.index().url}>My Account</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={login()}>Log in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
