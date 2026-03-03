# Atlas — Neurocodex

> The central brain of the project. Goals, open decisions, and the master plan.

## Central Goal

Build the greatest history platform ever made — an open-source, community-driven place where anyone can explore, contribute to, and discover the history of everything. Wikipedia meets Audubon Explorer meets GitHub, but for all of human history.

People hundreds of years from now should be able to visit Atlas and understand what was created, when, and by whom.

## Current State (v1 Complete)

The v1 mock-data prototype is fully built. All design and UX work is implemented:

| Feature | Status | Notes |
|---------|--------|-------|
| Design system (tokens, fonts, themes) | Done | Light + dark mode, Audubon-inspired palette |
| TopBar + navigation | Done | Atlas, Chronicles, Echoes, Discover |
| Atlas landing page | Done | Welcome hero, map background, lenses, controls |
| Mapbox integration | Done | MapView, pins, interaction hooks |
| Time Scrubber | Done | Era segments, year navigation, play/pause |
| Event Detail Cards | Done | Slide-up card on pin click |
| Chronicles (list + reader) | Done | Cards, stars, cinematic reader |
| Echoes (gallery + chat) | Done | Figure cards, mock dialogue |
| Discover page | Done | Trending, This Day, Collections, Community |
| Vault archive | Done | Calendar + list views |
| Profile + Community | Done | Stats, badges, contribution grid, leaderboard |
| Onboarding | Done | Welcome scene, interest picker, section intros |
| Search (The Oracle) | Done | CMD+K modal, fuzzy search across mock data |

**Tech stack:** Next.js 15, React 19, shadcn/ui, Tailwind v4, Mapbox GL JS, TypeScript

**All data is mocked.** No backend, no database, no real AI. The prototype validates the concept and demonstrates the vision.

## Major Problem / Decision Areas

These are the critical open questions standing between prototype and real product.

### 1. Data Layer
- Where does real historical data come from? Wikidata? DBpedia? Custom curation? Community submissions?
- Schema design for a real database — what fields matter beyond the mock types?
- Ingestion pipeline: how to seed with initial data at scale
- Data quality & moderation: how to fact-check contributions at scale
- Temporal data is hard — fuzzy dates, disputed dates, ranges ("circa 300 BC")

### 2. AI Strategy (Echoes)
- Which LLM powers conversations with historical figures?
- Guardrails to keep figures historically accurate and not hallucinate
- How to scope knowledge per figure (they shouldn't know about events after their death)
- Content safety — sensitive historical topics, controversial figures
- Cost management — conversations can get expensive at scale

### 3. Map Infrastructure
- Mapbox free tier limits (50k loads/month) — what happens at scale?
- Custom map styles per era (ancient world looks different from modern)
- Performance with thousands of pins — clustering, progressive loading
- Offline/fallback when Mapbox is unavailable
- Time Machine feature: rendering the world map at different points in history

### 4. Community & Authentication
- Auth provider: GitHub OAuth? Google? Email/password? All of the above?
- Contribution workflow: propose → review → publish? Or wiki-style open editing?
- Reputation system: how are contributions scored? Who becomes a trusted editor?
- Moderation tooling: flagging, dispute resolution, content removal
- Privacy: what user data do we store and expose?

### 5. Content Pipeline (Chronicles)
- Markdown editor with preview — build or adopt (e.g. Milkdown, TipTap)?
- Version history for Chronicles (git-style diffs?)
- Media attachments: images, maps, embedded timelines
- Peer review process before publishing
- Licensing: what license do contributions fall under?

### 6. Search & Discovery
- Real search engine: Algolia, Meilisearch, Typesense, or vector search?
- Natural language queries ("What happened in Egypt around 1300 BC?")
- Cross-entity search (events, figures, chronicles, users in one query)
- Recommendations engine: "You explored the Renaissance, you might like..."

### 7. Sustainability & Deployment
- Hosting: Vercel? Self-hosted? Cloudflare?
- Database: PostgreSQL + Prisma? Supabase? PlanetScale?
- Cost at scale: map tiles, LLM calls, search, storage, bandwidth
- Open-source model: how to fund ongoing development
- Licensing: MIT? AGPL? Creative Commons for content?

### 8. Mobile & Accessibility
- PWA vs native app?
- Touch-optimized map interactions
- Offline reading for Chronicles
- Screen reader support beyond basic ARIA
- Internationalization (i18n) for a global audience

## Action Plan

### Phase A: Foundation (Backend + Auth)
1. Set up database (PostgreSQL + Prisma or Supabase)
2. Migrate mock data types to real schema with migrations
3. Add authentication (NextAuth.js or Clerk)
4. Build API routes for CRUD on events, chronicles, figures
5. Seed database with initial historical data (Wikidata import or curated set)

### Phase B: Real Content
6. Replace all mock data imports with API calls / server components
7. Build Chronicle editor (markdown with preview)
8. Add contribution workflow (draft → submit → review → publish)
9. Implement star/bookmark system with real persistence
10. Add user profiles backed by real data

### Phase C: AI Integration
11. Integrate LLM for Echoes conversations (Claude API or similar)
12. Build per-figure system prompts with knowledge boundaries
13. Add content safety filters
14. Implement conversation history / persistence

### Phase D: Scale & Polish
15. Upgrade search to real search engine
16. Add clustering and progressive loading for map pins
17. Performance optimization (ISR, caching, image optimization)
18. Mobile responsive polish pass
19. Accessibility audit and fixes

### Phase E: Community Launch
20. Contributor onboarding flow
21. Moderation dashboard
22. Public beta launch
23. Feedback collection and iteration

## Design Principles (Unchanging)

These survive every version:

1. **The map never leaves.** It's the canvas; everything floats over it.
2. **Spacious, not cramped.** Generous whitespace. This is not a dense web app.
3. **History is the star.** UI serves the content, never competes with it.
4. **Open by default.** Open source, open data, open contribution.
5. **AI augments, not replaces.** AI fact-checks and enriches; humans curate and create.
