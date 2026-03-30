'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

export type SortKey = 'raised' | 'valuation' | 'employees' | 'founded' | 'name'
export type ViewMode = 'grid' | 'table'

export interface Filters {
  search:    string
  sector:    string
  stage:     string
  portfolio: boolean
  sort:      SortKey
  order:     'asc' | 'desc'
}

interface Sector { slug: string; name: string; colorHex: string }

interface Props {
  sectors:   Sector[]
  filters:   Filters
  onChange:  (f: Filters) => void
  total:     number
  view:      ViewMode
  onView:    (v: ViewMode) => void
}

const STAGES = [
  { value: 'pre_seed',    label: 'Pre-Seed'  },
  { value: 'seed',        label: 'Seed'      },
  { value: 'series_a',   label: 'Series A'  },
  { value: 'series_b',   label: 'Series B'  },
  { value: 'series_c',   label: 'Series C'  },
  { value: 'growth',     label: 'Growth'    },
]

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'raised',    label: '↓ Привлечено' },
  { value: 'valuation', label: '↓ Оценка'     },
  { value: 'employees', label: '↓ Команда'    },
  { value: 'founded',   label: '↓ Год'        },
  { value: 'name',      label: 'A→Z Название' },
]

export function CompanyFilters({ sectors, filters, onChange, total, view, onView }: Props) {
  const set = useCallback(
    (patch: Partial<Filters>) => onChange({ ...filters, ...patch }),
    [filters, onChange]
  )

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: search + sort + view */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">⌕</span>
          <input
            type="text"
            placeholder="Компания, инвестор, ниша…"
            value={filters.search}
            onChange={e => set({ search: e.target.value })}
            className="w-full bg-[#0d0d1a] border border-white/8 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-white/25 outline-none focus:border-[#5CD2A2]/40 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => set({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs"
            >✕</button>
          )}
        </div>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={e => set({ sort: e.target.value as SortKey })}
          className="bg-[#0d0d1a] border border-white/8 rounded-lg px-3 py-2 text-sm text-white/70 outline-none cursor-pointer"
        >
          {SORTS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Portfolio toggle */}
        <button
          onClick={() => set({ portfolio: !filters.portfolio })}
          className={cn(
            'px-3 py-2 rounded-lg text-xs font-semibold border transition-all',
            filters.portfolio
              ? 'bg-[#5CD2A2]/15 border-[#5CD2A2]/30 text-[#5CD2A2]'
              : 'bg-transparent border-white/8 text-white/40 hover:text-white/60'
          )}
        >
          ★ Portfolio
        </button>

        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden border border-white/8 ml-auto">
          <button
            onClick={() => onView('grid')}
            className={cn('px-3 py-2 text-sm transition-colors', view === 'grid' ? 'bg-[#13132a] text-[#5CD2A2]' : 'bg-[#0d0d1a] text-white/30 hover:text-white/50')}
            title="Grid"
          >⊞</button>
          <button
            onClick={() => onView('table')}
            className={cn('px-3 py-2 text-sm transition-colors border-l border-white/8', view === 'table' ? 'bg-[#13132a] text-[#5CD2A2]' : 'bg-[#0d0d1a] text-white/30 hover:text-white/50')}
            title="Table"
          >☰</button>
        </div>

        <span className="font-mono text-xs text-white/25 whitespace-nowrap">{total} компаний</span>
      </div>

      {/* Row 2: sector pills */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => set({ sector: '' })}
          className={cn(
            'px-3 py-1 rounded-full text-[11px] font-semibold border transition-all',
            !filters.sector
              ? 'bg-[#5CD2A2] border-[#5CD2A2] text-[#021a10]'
              : 'bg-transparent border-white/8 text-white/40 hover:border-white/18 hover:text-white/70'
          )}
        >
          Все
        </button>
        {sectors.map(s => (
          <button
            key={s.slug}
            onClick={() => set({ sector: s.slug === filters.sector ? '' : s.slug })}
            className="px-3 py-1 rounded-full text-[11px] font-semibold border transition-all"
            style={filters.sector === s.slug ? {
              background: `${s.colorHex}20`,
              borderColor: `${s.colorHex}40`,
              color: s.colorHex,
            } : {
              background: 'transparent',
              borderColor: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {s.name}
          </button>
        ))}

        {/* Stage filter */}
        <div className="ml-auto">
          <select
            value={filters.stage}
            onChange={e => set({ stage: e.target.value })}
            className="bg-[#0d0d1a] border border-white/8 rounded-full px-3 py-1 text-[11px] font-semibold text-white/40 outline-none cursor-pointer"
          >
            <option value="">Все стадии</option>
            {STAGES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
