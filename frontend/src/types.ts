/**
 * types.ts — Централізовані TypeScript-типи для даних з Payload CMS API.
 */

// ─── Загальні типи ─────────────────────────────────────────────────────────

export interface MediaItem {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

export interface NavLink {
  label: string
  url: string
}

// ─── Globals ───────────────────────────────────────────────────────────────

export interface HeaderData {
  logo: {
    text: string
    image?: MediaItem | null
  }
  navLinks: NavLink[]
  ctaLabel: string
  ctaUrl: string
}

export interface FooterData {
  copyright: string
  footerLinks: NavLink[]
  socialLinks: Array<{
    platform: 'facebook' | 'instagram' | 'linkedin' | 'telegram' | 'youtube'
    url: string
  }>
}

export interface CommonData {
  header: HeaderData
  footer: FooterData
}

// ─── Блоки ─────────────────────────────────────────────────────────────────

export interface HeroBlockData {
  blockType: 'hero'
  type: 'hero'
  headline: string
  subheadline?: string
  ctaLabel?: string
  ctaUrl?: string
  backgroundImage?: MediaItem | null
  badge?: string
}

export interface FeatureItem {
  icon?: string
  title: string
  description: string
}

export interface FeaturesBlockData {
  blockType: 'features'
  type: 'features'
  sectionTitle?: string
  sectionSubtitle?: string
  items: FeatureItem[]
}

export interface AboutBlockData {
  blockType: 'about'
  type: 'about'
  sectionTitle?: string
  content?: unknown // Lexical rich text
  image?: MediaItem | null
  imagePosition?: 'left' | 'right'
  stats?: Array<{ value: string; label: string }>
}

export interface PricingPlan {
  name: string
  price: string
  description?: string
  features: Array<{ feature: string }>
  ctaLabel?: string
  ctaUrl?: string
  isHighlighted?: boolean
}

export interface PricingBlockData {
  blockType: 'pricing'
  type: 'pricing'
  sectionTitle?: string
  sectionSubtitle?: string
  plans: PricingPlan[]
}

export interface TeamMember {
  name: string
  position: string
  bio?: string
  photo?: MediaItem | null
  linkedinUrl?: string
}

export interface TeamBlockData {
  blockType: 'team'
  type: 'team'
  sectionTitle?: string
  sectionSubtitle?: string
  members: TeamMember[]
}

export interface TestimonialItem {
  quote: string
  authorName: string
  authorPosition?: string
  authorPhoto?: MediaItem | null
  rating?: number
}

export interface TestimonialsBlockData {
  blockType: 'testimonials'
  type: 'testimonials'
  sectionTitle?: string
  items: TestimonialItem[]
}

export interface FaqItem {
  question: string
  answer: unknown // Lexical rich text
}

export interface FaqBlockData {
  blockType: 'faq'
  type: 'faq'
  sectionTitle?: string
  items: FaqItem[]
}

export interface ContactBlockData {
  blockType: 'contact'
  type: 'contact'
  sectionTitle?: string
  sectionSubtitle?: string
  email?: string
  phone?: string
  address?: string
  formTitle?: string
  submitLabel?: string
}

// ─── Union type для всіх блоків ────────────────────────────────────────────

export type AnyBlock =
  | HeroBlockData
  | FeaturesBlockData
  | AboutBlockData
  | PricingBlockData
  | TeamBlockData
  | TestimonialsBlockData
  | FaqBlockData
  | ContactBlockData

// ─── Відповідь API ─────────────────────────────────────────────────────────

export interface PageApiResponse {
  title: string
  path: string
  seo: {
    metaTitle?: string
    metaDescription?: string
  }
  blocks: AnyBlock[]
}
