import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL

export const db = databaseUrl
  ? drizzle(neon(databaseUrl), { schema })
  : null as any

export type DB = typeof db
