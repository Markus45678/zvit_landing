import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { pageEndpoint } from './endpoints/pageEndpoint'
import { commonEndpoint } from './endpoints/commonEndpoint'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const migrationConnectionString =
  process.env.PAYLOAD_MIGRATING === 'true'
    ? process.env.DIRECT_DATABASE_URL ||
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.DATABASE_URL
    : process.env.DATABASE_URL


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // ─── Колекції ─────────────────────────────────────────────────────────────
  collections: [Users, Media, Pages],

  // ─── Globals ──────────────────────────────────────────────────────────────
  globals: [Header, Footer],

  // ─── Кастомні REST ендпоінти ───────────────────────────────────────────────
  endpoints: [pageEndpoint, commonEndpoint],

  // ─── Редактор тексту ──────────────────────────────────────────────────────
  editor: lexicalEditor(),

  // Required by Payload for auth token signing and encryption.
  secret: process.env.PAYLOAD_SECRET || '',

  // ─── База даних: PostgreSQL (Neon) ─────────────────────────────────────────
  db: postgresAdapter({
    pool: {
      connectionString: migrationConnectionString,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  // ─── Обробка зображень ────────────────────────────────────────────────────
  sharp,

  // ─── TypeScript auto-gen ──────────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ─── CORS ─────────────────────────────────────────────────────────────────
  cors: (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  csrf: (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
})
