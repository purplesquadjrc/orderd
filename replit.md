# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Saree Draping Service — `artifacts/saree-draping`
- **Type**: react-vite (frontend + API server)
- **Preview path**: `/`
- **Brand**: Drape & Grace
- **Pages**: Single-page landing site with 9 sections
  - Sticky navbar, Hero, Services, How It Works, Pricing, Gallery, Testimonials, Booking Form, Contact, Footer
- **Stack**: React + Tailwind CSS + Framer Motion + @workspace/api-client-react
- **Colors**: Peach, gold, cream, pastel pink (Playfair Display font)
- **Components**: `src/components/` — navbar, hero, services, how-it-works, pricing, gallery, testimonials, booking-form, contact, footer
- **Home page**: `src/pages/home.tsx`

### API Server — `artifacts/api-server`
- **Routes**: `src/routes/gallery.ts` — GET /gallery, POST /gallery, DELETE /gallery/:id
- **DB table**: `gallery_images` (id, image_url, title, description, created_at, updated_at)
- **Schema**: `lib/db/src/schema/gallery-images.ts`
- **OpenAPI spec**: `lib/api-spec/openapi.yaml` — includes GalleryImage, CreateGalleryImageRequest schemas
- **Seeded**: 6 initial gallery images (Nivi, Bengali, Gujarati, Lehenga, Party, Pre-Pleated styles)
