import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMoney(usd: number | null | undefined): string {
  if (!usd) return '—'
  if (usd >= 1_000_000_000) return `$${(usd / 1_000_000_000).toFixed(1)}B`
  if (usd >= 1_000_000)     return `$${(usd / 1_000_000).toFixed(0)}M`
  if (usd >= 1_000)         return `$${(usd / 1_000).toFixed(0)}K`
  return `$${usd}`
}

export function formatEmployees(n: number | null | undefined, range?: string | null): string {
  if (range) return range
  if (!n) return '—'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function stageLabel(stage: string | null | undefined): string {
  const map: Record<string, string> = {
    pre_seed:    'Pre-Seed',
    seed:        'Seed',
    series_a:    'Series A',
    series_b:    'Series B',
    series_c:    'Series C',
    series_d_plus:'Series D+',
    growth:      'Growth',
    ipo:         'IPO',
    acquired:    'Acquired',
    bootstrapped:'Bootstrapped',
  }
  return stage ? (map[stage] ?? stage) : '—'
}

export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
