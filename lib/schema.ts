import {
  pgTable, uuid, text, boolean, integer, bigint,
  smallint, numeric, timestamp, date, pgEnum, char, index
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ── Enums ──────────────────────────────────────────────────
export const userRoleEnum = pgEnum('user_role', ['admin', 'analyst', 'subscriber'])
export const companyStatusEnum = pgEnum('company_status', ['draft', 'live', 'archived'])
export const fundingStageEnum = pgEnum('funding_stage', [
  'pre_seed','seed','series_a','series_b','series_c',
  'series_d_plus','growth','ipo','acquired','bootstrapped',
])

// ── Users ──────────────────────────────────────────────────
export const users = pgTable('users', {
  id:          uuid('id').primaryKey().defaultRandom(),
  clerkId:     text('clerk_id').unique().notNull(),
  email:       text('email').unique().notNull(),
  name:        text('name'),
  role:        userRoleEnum('role').default('subscriber').notNull(),
  avatarUrl:   text('avatar_url'),
  company:     text('company'),
  isActive:    boolean('is_active').default(true),
  lastSeenAt:  timestamp('last_seen_at', { withTimezone: true }),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// ── Sectors ────────────────────────────────────────────────
export const sectors = pgTable('sectors', {
  id:          uuid('id').primaryKey().defaultRandom(),
  name:        text('name').unique().notNull(),
  slug:        text('slug').unique().notNull(),
  colorHex:    text('color_hex').notNull().default('#5CD2A2'),
  description: text('description'),
  sortOrder:   integer('sort_order').default(0),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ── Companies ──────────────────────────────────────────────
export const companies = pgTable('companies', {
  id:               uuid('id').primaryKey().defaultRandom(),
  slug:             text('slug').unique().notNull(),
  name:             text('name').notNull(),
  tagline:          text('tagline'),
  description:      text('description'),
  website:          text('website'),
  foundedYear:      smallint('founded_year'),
  headquarters:     text('headquarters'),
  country:          char('country', { length: 2 }),
  sectorId:         uuid('sector_id').references(() => sectors.id),
  stage:            fundingStageEnum('stage'),
  status:           companyStatusEnum('status').default('draft'),
  isPortfolio:      boolean('is_portfolio').default(false),
  totalRaisedUsd:   bigint('total_raised_usd', { mode: 'number' }),
  lastValuationUsd: bigint('last_valuation_usd', { mode: 'number' }),
  employeesCount:   integer('employees_count'),
  employeesRange:   text('employees_range'),
  logoUrl:          text('logo_url'),
  logoR2Key:        text('logo_r2_key'),
  featured:         boolean('featured').default(false),
  viewsCount:       integer('views_count').default(0),
  createdBy:        uuid('created_by').references(() => users.id),
  publishedAt:      timestamp('published_at', { withTimezone: true }),
  createdAt:        timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:        timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => ({
  sectorIdx:    index('idx_companies_sector').on(t.sectorId),
  stageIdx:     index('idx_companies_stage').on(t.stage),
  statusIdx:    index('idx_companies_status').on(t.status),
  portfolioIdx: index('idx_companies_portfolio').on(t.isPortfolio),
  raisedIdx:    index('idx_companies_raised').on(t.totalRaisedUsd),
}))

// ── Funding Rounds ─────────────────────────────────────────
export const fundingRounds = pgTable('funding_rounds', {
  id:             uuid('id').primaryKey().defaultRandom(),
  companyId:      uuid('company_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  roundType:      fundingStageEnum('round_type').notNull(),
  amountUsd:      bigint('amount_usd', { mode: 'number' }),
  valuationUsd:   bigint('valuation_usd', { mode: 'number' }),
  announcedDate:  date('announced_date'),
  leadInvestor:   text('lead_investor'),
  notes:          text('notes'),
  sourceUrl:      text('source_url'),
  createdAt:      timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ── Investors ──────────────────────────────────────────────
export const investors = pgTable('investors', {
  id:        uuid('id').primaryKey().defaultRandom(),
  name:      text('name').unique().notNull(),
  slug:      text('slug').unique().notNull(),
  type:      text('type'),
  website:   text('website'),
  logoUrl:   text('logo_url'),
  tier:      smallint('tier').default(2),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const companyInvestors = pgTable('company_investors', {
  companyId:  uuid('company_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  investorId: uuid('investor_id').notNull().references(() => investors.id, { onDelete: 'cascade' }),
  roundId:    uuid('round_id').references(() => fundingRounds.id),
  isLead:     boolean('is_lead').default(false),
})

// ── Watchlist ──────────────────────────────────────────────
export const watchlist = pgTable('watchlist', {
  userId:    uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  companyId: uuid('company_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  note:      text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ── Relations ──────────────────────────────────────────────
export const companiesRelations = relations(companies, ({ one, many }) => ({
  sector:    one(sectors, { fields: [companies.sectorId], references: [sectors.id] }),
  rounds:    many(fundingRounds),
  investors: many(companyInvestors),
  watchlist: many(watchlist),
}))

export const sectorsRelations = relations(sectors, ({ many }) => ({
  companies: many(companies),
}))

export const fundingRoundsRelations = relations(fundingRounds, ({ one }) => ({
  company: one(companies, { fields: [fundingRounds.companyId], references: [companies.id] }),
}))

// ── Types ──────────────────────────────────────────────────
export type Company   = typeof companies.$inferSelect
export type NewCompany = typeof companies.$inferInsert
export type Sector    = typeof sectors.$inferSelect
export type FundingRound = typeof fundingRounds.$inferSelect
export type Investor  = typeof investors.$inferSelect
export type User      = typeof users.$inferSelect
