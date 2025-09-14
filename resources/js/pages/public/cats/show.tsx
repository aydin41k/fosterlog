import { Head, Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import PublicTopbar from '@/components/public-topbar'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type PublicPhoto = { id: number; url: string; caption?: string | null; is_primary?: boolean }
type PublicAnimal = {
  id: number
  name: string
  slug: string
  species: string
  sex?: string | null
  description?: string | null
  status: string
  status_label: string
  dob?: string | null
  age_years_months?: string | null
  primary_photo_url?: string | null
  latest_weight_kg?: number | null
  photos?: PublicPhoto[]
}

type Weight = { id: number; weight_kg: number; measured_at: string; notes?: string | null }
type Action = { id: number; type: string; details: Record<string, unknown>; performed_at: string }

type PageProps = {
  animal: PublicAnimal
  weights: Weight[]
  actions: Action[]
}

export default function PublicCatDetails() {
  const { animal, weights, actions } = usePage<PageProps>().props
  const available = animal.status === 'available'
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

  const primaryUrl =
    animal.photos?.find((p) => p.is_primary)?.url || animal.primary_photo_url || animal.photos?.[0]?.url

  return (
    <>
      <Head title={`${animal.name} — Foster Cat`} />

      <PublicTopbar />
      <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-4 md:px-6 md:py-6">
        <nav className="mb-3 text-sm">
          <Link href="/adopt/cats" className="text-muted-foreground hover:underline">
            ← Back to cats
          </Link>
        </nav>

        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{animal.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {animal.age_years_months ?? 'Age unknown'}
              {animal.sex ? ` • ${capitalize(animal.sex)}` : ''}
            </p>
          </div>
          <div>{available && <Badge className="h-6" variant="default">Available for Adoption</Badge>}</div>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className={available ? 'border-primary/50' : undefined}>
            <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-muted">
              {primaryUrl ? (
                <img src={primaryUrl} alt={`${animal.name} photo`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">No photo</div>
              )}
            </div>
            {animal.photos && animal.photos.length > 1 && (
              <CardContent className="p-2">
                <ul className="grid grid-cols-6 gap-2">
                  {animal.photos.map((p) => (
                    <li key={p.id} className="overflow-hidden rounded-md border">
                      <button
                        type="button"
                        className="block h-14 w-full cursor-zoom-in"
                        aria-label={p.caption ? `View ${p.caption}` : 'View photo'}
                        onClick={() => setLightboxUrl(p.url)}
                      >
                        <img src={p.url} alt={p.caption ?? ''} className="h-14 w-full object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-4">
                <ul className="grid grid-cols-2 gap-3 text-sm">
                  <li>
                    <span className="text-muted-foreground">Status</span>
                    <div className="mt-0.5">{animal.status_label}</div>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Age</span>
                    <div className="mt-0.5">{animal.age_years_months ?? 'Unknown'}</div>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Weight</span>
                    <div className="mt-0.5">{formatWeight(animal.latest_weight_kg)}</div>
                  </li>
                  {animal.sex && (
                    <li>
                      <span className="text-muted-foreground">Sex</span>
                      <div className="mt-0.5">{capitalize(animal.sex)}</div>
                    </li>
                  )}
                </ul>
                  <Separator className="my-3" />
                  <p className="text-sm text-muted-foreground">About</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    {animal.description?.trim() || 'This foster cat is settling in. More details soon.'}
                  </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="mb-2 text-sm font-medium">Weight History</p>
                {weights.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No weights recorded yet.</p>
                ) : (
                  <ul className="max-h-56 space-y-2 overflow-auto pr-1">
                    {weights.map((w) => (
                      <li key={w.id} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{new Date(w.measured_at).toLocaleDateString()}</span>
                        <span className="font-medium">{formatWeight(w.weight_kg)} kg</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="mb-2 text-sm font-medium">Care History</p>
                {actions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No care actions recorded yet.</p>
                ) : (
                  <ul className="max-h-56 space-y-2 overflow-auto pr-1">
                    {actions.filter((a) => a.type !== 'food').map((a) => (
                      <li key={a.id} className="text-sm">
                        <div className="flex items-center justify-between">
                          <span className="capitalize text-muted-foreground">{a.type}</span>
                          <span className="text-xs text-muted-foreground">{new Date(a.performed_at).toLocaleDateString()}</span>
                        </div>
                        {renderActionSummary(a)}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lightbox dialog for full-size image */}
        <Dialog open={!!lightboxUrl} onOpenChange={(open) => !open && setLightboxUrl(null)}>
          <DialogContent className="p-0 sm:max-w-3xl">
            {lightboxUrl && (
              <div className="relative">
                <img src={lightboxUrl} alt="Full size photo" className="h-full w-full rounded-md object-contain" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

function formatWeight(w?: number | string | null) {
  if (typeof w === 'number') return `${w.toFixed(1)} kg`
  if (typeof w === 'string') return w
  return 'Unknown'
}

function renderActionSummary(a: Action) {
  const d = a.details || {}
  switch (a.type) {
    case 'food': {
      const amount = typeof d.amount_g === 'number' ? `${d.amount_g} g` : 'Food'
      return <p className="text-sm">{amount}</p>
    }
    case 'medication': {
      const name = d.name || 'Medication'
      const dose = d.dose ? ` — ${d.dose}` : ''
      return (
        <p className="text-sm">
          {name}
          {dose}
        </p>
      )
    }
    case 'exercise':
    case 'medical':
    case 'veterinary':
    case 'other':
    default:
      return <p className="text-sm">Recorded</p>
  }
}
