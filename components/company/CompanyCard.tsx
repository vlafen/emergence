'use client'

import { formatMoney, formatEmployees, stageLabel, getInitials, cn } from '@/lib/utils'
import type { Company, Sector } from '@/lib/schema'

type CompanyWithSector = Company & { sector: Sector | null }

interface Props {
  company: CompanyWithSector
  onClick?: (company: CompanyWithSector) => void
  maxRaised?: number
}

export function CompanyCard({ company: co, onClick, maxRaised = 1 }: Props) {
  const pct = co.totalRaisedUsd ? Math.round((co.totalRaisedUsd / maxRaised) * 100) : 0
  const initials = getInitials(co.name)
  const sectorColor = co.sector?.colorHex ?? '#888780'

  return (
    <div
      onClick={() => onClick?.(co)}
      className={cn(
        'group relative rounded-2xl p-5 cursor-pointer transition-all duration-200',
        'bg-[#0d0d1a] border border-white/7',
        'hover:bg-[#111124] hover:border-white/14 hover:-translate-y-0.5',
        co.isPortfolio && 'border-[#5CD2A2]/20',
      )}
      style={co.isPortfolio ? {
        // тонкая светящаяся линия сверху у портфельных
        backgroundImage: `linear-gradient(to bottom, rgba(92,210,162,0.04) 0%, transparent 60%)`,
      } : undefined}
    >
      {/* Portfolio top line */}
      {co.isPortfolio && (
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#5CD2A2]/50 to-transparent" />
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/8 bg-white/5">
          {co.logoUrl ? (
            <img
              src={co.logoUrl}
              alt={co.name}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : (
            <span className="text-xs font-bold text-white/40">{initials}</span>
          )}
        </div>

        {/* Name + badges */}
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold leading-tight truncate">{co.name}</div>
          {co.tagline && (
            <div className="text-xs text-white/40 mt-0.5 leading-snug line-clamp-1">{co.tagline}</div>
          )}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {co.sector && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: `${sectorColor}18`,
                  color: sectorColor,
                  border: `1px solid ${sectorColor}30`,
                }}
              >
                {co.sector.name}
              </span>
            )}
            {co.stage && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#6FA3EF]/12 text-[#6FA3EF] border border-[#6FA3EF]/20">
                {stageLabel(co.stage)}
              </span>
            )}
            {co.isPortfolio && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#5CD2A2]/12 text-[#5CD2A2] border border-[#5CD2A2]/25">
                ★ Portfolio
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#080810] rounded-lg px-2.5 py-2">
          <div className="font-mono text-sm font-medium text-[#5CD2A2]">{formatMoney(co.totalRaisedUsd)}</div>
          <div className="text-[9px] uppercase tracking-widest text-white/25 mt-0.5">Привлечено</div>
        </div>
        <div className="bg-[#080810] rounded-lg px-2.5 py-2">
          <div className="font-mono text-sm font-medium">{formatMoney(co.lastValuationUsd)}</div>
          <div className="text-[9px] uppercase tracking-widest text-white/25 mt-0.5">Оценка</div>
        </div>
        <div className="bg-[#080810] rounded-lg px-2.5 py-2">
          <div className="font-mono text-sm font-medium">{formatEmployees(co.employeesCount, co.employeesRange)}</div>
          <div className="text-[9px] uppercase tracking-widest text-white/25 mt-0.5">Сотрудники</div>
        </div>
      </div>

      {/* Raised bar */}
      <div className="flex items-center gap-2 text-[10px] text-white/25">
        <span className="font-mono">{co.foundedYear ?? '—'}</span>
        <div className="flex-1 h-0.5 bg-white/6 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5CD2A2] rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono">{formatMoney(co.totalRaisedUsd)}</span>
      </div>
    </div>
  )
}
