import { Head, Link, usePage } from '@inertiajs/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PublicTopbar from '@/components/public-topbar'

type PublicCat = {
  id: number
  name: string
  slug: string
  age_years_months?: string | null
  latest_weight_kg?: number | null
  primary_photo_url?: string | null
  status: 'in_foster' | 'available' | 'adopted' | string
  status_label: string
}

type PageProps = {
  cats: PublicCat[]
}

export default function PublicCatsGallery() {
  const { cats } = usePage<PageProps>().props

  return (
    <>
      <Head title="Cats in Foster Care" />
      <PublicTopbar />
      <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-4 md:px-6 md:py-8">
        <header className="mb-4 flex items-baseline justify-between">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Cats in Foster Care</h1>
          <span className="text-sm text-muted-foreground">{cats.length} {cats.length === 1 ? 'cat' : 'cats'}</span>
        </header>

        {cats.length === 0 ? (
          <p className="text-sm text-muted-foreground">No cats to show right now.</p>
        ) : (
          <ul
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4"
            aria-label="Cat gallery"
          >
            {cats.map((cat) => {
              const available = cat.status === 'available'
              return (
                <li key={cat.id}>
                  <Link href={`/adopt/cats/${cat.slug}`} className="block focus:outline-none">
                    <Card
                      className={
                        'overflow-hidden transition-colors ' +
                        (available ? 'border-primary/50' : '')
                      }
                    >
                      <div className="relative aspect-square w-full overflow-hidden bg-muted">
                        {cat.primary_photo_url ? (
                          <img
                            src={cat.primary_photo_url}
                            alt={`${cat.name} photo`}
                            className="size-full object-cover object-center"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            No photo
                          </div>
                        )}
                        {available && (
                          <div className="absolute right-2 top-2">
                            <Badge className="bg-primary/85 text-primary-foreground" variant="default">
                              Available
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-2 md:p-3">
                        <p className="truncate text-sm font-medium">{cat.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {cat.age_years_months ?? 'Age unknown'}
                          {cat.latest_weight_kg && ` • ${cat.latest_weight_kg} kg`}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
