import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { companies, sectors, fundingRounds, companyInvestors, investors } from '@/lib/schema'
import { eq, and, desc, asc, ilike, or, sql } from 'drizzle-orm'
import { z } from 'zod'

const QuerySchema = z.object({
  sector:  z.string().optional(),
  stage:   z.string().optional(),
  search:  z.string().optional(),
  sort:    z.enum(['raised', 'valuation', 'employees', 'founded', 'name']).optional().default('raised'),
  order:   z.enum(['asc', 'desc']).optional().default('desc'),
  portfolio: z.coerce.boolean().optional(),
  page:    z.coerce.number().min(1).optional().default(1),
  limit:   z.coerce.number().min(1).max(100).optional().default(50),
})

export async function GET(req: NextRequest) {
  try {
    const params = QuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    )

    const conditions = [eq(companies.status, 'live')]

    if (params.sector)    conditions.push(eq(sectors.slug, params.sector))
    if (params.portfolio) conditions.push(eq(companies.isPortfolio, true))
    if (params.stage)     conditions.push(eq(companies.stage, params.stage as any))
    if (params.search) {
      const q = `%${params.search}%`
      conditions.push(
        or(
          ilike(companies.name, q),
          ilike(companies.tagline, q),
          ilike(companies.description, q),
        )!
      )
    }

    const sortCol = {
      raised:    companies.totalRaisedUsd,
      valuation: companies.lastValuationUsd,
      employees: companies.employeesCount,
      founded:   companies.foundedYear,
      name:      companies.name,
    }[params.sort]

    const orderFn = params.order === 'asc' ? asc : desc
    const offset = (params.page - 1) * params.limit

    const rows = await db
      .select({
        id:               companies.id,
        slug:             companies.slug,
        name:             companies.name,
        tagline:          companies.tagline,
        website:          companies.website,
        foundedYear:      companies.foundedYear,
        stage:            companies.stage,
        isPortfolio:      companies.isPortfolio,
        totalRaisedUsd:   companies.totalRaisedUsd,
        lastValuationUsd: companies.lastValuationUsd,
        employeesCount:   companies.employeesCount,
        employeesRange:   companies.employeesRange,
        logoUrl:          companies.logoUrl,
        featured:         companies.featured,
        viewsCount:       companies.viewsCount,
        sector: {
          id:       sectors.id,
          name:     sectors.name,
          slug:     sectors.slug,
          colorHex: sectors.colorHex,
        },
      })
      .from(companies)
      .leftJoin(sectors, eq(companies.sectorId, sectors.id))
      .where(and(...conditions))
      .orderBy(orderFn(sortCol ?? companies.totalRaisedUsd))
      .limit(params.limit)
      .offset(offset)

    // Считаем total для пагинации
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(companies)
      .leftJoin(sectors, eq(companies.sectorId, sectors.id))
      .where(and(...conditions))

    return NextResponse.json({
      data: rows,
      meta: {
        total: Number(count),
        page: params.page,
        limit: params.limit,
        pages: Math.ceil(Number(count) / params.limit),
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: (err as z.ZodError).flatten().fieldErrors }, { status: 400 })
    }
    console.error('[GET /api/companies]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
