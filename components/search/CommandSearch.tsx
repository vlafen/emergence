'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Result = {
  type: 'company' | 'fund'
  name: string
  sub: string
  raised?: string
  sector?: string
  color?: string
}

const COMPANIES: Result[] = [
  { type: 'company', name: 'Formation Bio', sub: 'Drug Development AI · Health · Series C', raised: '$248M', sector: 'Health', color: '#16a34a' },
  { type: 'company', name: 'EvenUp', sub: 'Personal Injury Law · Legal · Series C', raised: '$135M', sector: 'Legal', color: '#7c3aed' },
  { type: 'company', name: 'Prosper', sub: 'RCM Platform · Health · Series B', raised: '$127M', sector: 'Health', color: '#16a34a' },
  { type: 'company', name: 'Harper', sub: 'Commercial Insurance · Financial · Series B', raised: '$110M', sector: 'Financial', color: '#2563eb' },
  { type: 'company', name: 'Crosby', sub: 'Contract Lifecycle · Legal · Series B', raised: '$95M', sector: 'Legal', color: '#7c3aed' },
  { type: 'company', name: 'Scale Medicine', sub: 'Precision Medicine · Health · Series B', raised: '$89M', sector: 'Health', color: '#16a34a' },
  { type: 'company', name: 'Mechanical Orchard', sub: 'Legacy Modernization · Software · Series B', raised: '$75M', sector: 'Software', color: '#d97706' },
  { type: 'company', name: 'Irving', sub: 'M&A Diligence · Legal · Series A', raised: '$45M', sector: 'Legal', color: '#7c3aed' },
  { type: 'company', name: 'LightTable', sub: 'Construction AI · Industrial · Series A', raised: '$42M', sector: 'Industrial', color: '#b45309' },
  { type: 'company', name: 'Tessera', sub: 'API Integration · Software · Series A', raised: '$41M', sector: 'Software', color: '#d97706' },
  { type: 'company', name: 'AirOps', sub: 'GTM Automation · GTM · Series A', raised: '$38M', sector: 'GTM', color: '#0891b2' },
  { type: 'company', name: 'XBOW', sub: 'Autonomous Pentesting · Security · Series A', raised: '$35M', sector: 'Security', color: '#dc2626' },
  { type: 'company', name: 'Outbound AI', sub: 'Voice AI · Health · Series A', raised: '$34M', sector: 'Health', color: '#16a34a' },
  { type: 'company', name: 'Tribe AI', sub: 'AI Consulting · AI Impl. · Series A', raised: '$33M', sector: 'AI Impl.', color: '#15803d' },
  { type: 'company', name: 'Rivet', sub: 'Accounting AI · Financial · Series A', raised: '$31M', sector: 'Financial', color: '#2563eb' },
  { type: 'company', name: 'Rubie', sub: 'QA Automation · Software · Series A', raised: '$28M', sector: 'Software', color: '#d97706' },
  { type: 'company', name: 'Norm AI', sub: 'Regulatory Compliance · Legal · Series A', raised: '$27M', sector: 'Legal', color: '#7c3aed' },
  { type: 'company', name: 'Docshield', sub: 'Document Automation · Financial · Series A', raised: '$22M', sector: 'Financial', color: '#2563eb' },
  { type: 'company', name: 'RunSybil', sub: 'AI Red Teaming · Security · Seed', raised: '$12M', sector: 'Security', color: '#dc2626' },
  { type: 'company', name: 'Evidenza', sub: 'Market Research AI · GTM · Seed', raised: '$8M', sector: 'GTM', color: '#0891b2' },
]

const FUNDS: Result[] = [
  { type: 'fund', name: 'Emergence Capital', sub: 'Lead Fund · 10 portfolio companies · $680M deployed' },
  { type: 'fund', name: 'a16z', sub: 'VC · Tier 1 · AUM $35B' },
  { type: 'fund', name: 'Sequoia', sub: 'VC · Tier 1 · AUM $85B' },
  { type: 'fund', name: 'Google Ventures', sub: 'CVC · Tier 1 · AUM $8B' },
  { type: 'fund', name: 'Bessemer', sub: 'VC · Tier 1 · AUM $20B' },
  { type: 'fund', name: 'Accel', sub: 'VC · Tier 1 · AUM $14B' },
  { type: 'fund', name: 'Tiger Global', sub: 'Hedge Fund · Tier 1 · AUM $50B' },
  { type: 'fund', name: 'Index Ventures', sub: 'VC · Tier 1 · AUM $10B' },
  { type: 'fund', name: 'Y Combinator', sub: 'Accelerator · Tier 1' },
  { type: 'fund', name: 'Salesforce Ventures', sub: 'CVC · Tier 1 · AUM $3B' },
]

const ALL = [...COMPANIES, ...FUNDS]

function ini(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function CommandSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const results = query.length > 0
    ? ALL.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : ALL.slice(0, 6)

  const openSearch = useCallback(() => {
    setOpen(true)
    setQuery('')
    setSelected(0)
  }, [])

  const navigate = useCallback((r: Result) => {
    setOpen(false)
    if (r.type === 'company') {
      router.push(`/company/${toSlug(r.name)}`)
    } else {
      router.push(`/fund/${toSlug(r.name)}`)
    }
  }, [router])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
      if (e.key === 'Escape') setOpen(false)
      if (open) {
        if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, results.length - 1))
        if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0))
        if (e.key === 'Enter' && results[selected]) navigate(results[selected])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, results, selected, openSearch, navigate])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh',
      }}
      onClick={() => setOpen(false)}
    >
      <div
        style={{
          width: 560,
          background: 'var(--bg2)',
          border: '1px solid var(--border2)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* INPUT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 16, color: 'var(--t3)' }}>⌕</span>
          <input
            autoFocus
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search companies, funds, sectors…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: 'var(--text)', fontFamily: 'Inter, sans-serif',
            }}
          />
          <kbd style={{ fontSize: 10, color: 'var(--t3)', background: 'var(--bg3)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border)' }}>ESC</kbd>
        </div>

        {/* RESULTS */}
        <div style={{ maxHeight: 380, overflowY: 'auto' }}>
          {results.length === 0 && (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--t3)', fontSize: 13 }}>
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {query === '' && (
            <div style={{ padding: '10px 16px 4px', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--t3)' }}>
              Recent
            </div>
          )}

          {results.map((r, i) => (
            <div
              key={i}
              onClick={() => navigate(r)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                background: i === selected ? 'var(--ac-bg)' : 'transparent',
                borderLeft: i === selected ? '2px solid var(--ac)' : '2px solid transparent',
                cursor: 'pointer', transition: 'background .1s',
              }}
              onMouseEnter={() => setSelected(i)}
            >
              {/* Avatar */}
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#fff',
                background: r.type === 'company' ? (r.color || 'var(--ac)') : 'var(--bg3)',
                border: r.type === 'fund' ? '1px solid var(--border)' : 'none',
              }}>
                {r.type === 'fund' ? '🏦' : ini(r.name)}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: 'var(--t3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.sub}</div>
              </div>

              {/* Right badge */}
              {r.raised && (
                <div style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', fontWeight: 500, color: 'var(--ac-t)', flexShrink: 0 }}>
                  {r.raised}
                </div>
              )}
              {r.type === 'fund' && (
                <div style={{ fontSize: 10, color: 'var(--t3)', background: 'var(--bg3)', padding: '2px 7px', borderRadius: 4, flexShrink: 0 }}>
                  Fund
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, fontSize: 10, color: 'var(--t3)' }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>ESC close</span>
          <span style={{ marginLeft: 'auto' }}>⌘K to open</span>
        </div>
      </div>
    </div>
  )
}
