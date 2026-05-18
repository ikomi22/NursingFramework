# NursingFramework — Project Overview & Recommendations

## What This Project Is

An NHS Nursing Competency Framework web app built with **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**. It helps track staff compliance against 40 nursing competencies, supports role-based learning pathways, and includes an AI-powered compliance chat assistant.

## Current Architecture

| Layer | What exists |
|---|---|
| **UI** | Next.js App Router with 6 pages: Chat, Competencies, Categories, Staff Matrix, Pathways, Reports |
| **Data** | Static TypeScript files: `competencies.ts` (40 entries), `staff.ts` (6 staff), `pathways.ts` (3 pathways), `roles.ts` (6 roles) |
| **AI Chat** | `/api/chat` route + `context.ts` builds a system prompt injecting all data — feeds a Claude-compatible LLM |
| **Components** | `Header`, `StatCard`, `StatusBadge`, `MandatoryBadge` |
| **Types** | Fully typed: `Competency`, `StaffRecord`, `LearningPathway`, `RoleMapping`, `Message` |

---

## What to Do Next (Priority Order)

### 1. Connect a Real Database
Right now all data lives in static `.ts` files. This is fine for a prototype but won't scale.

- Move to **PostgreSQL** (e.g. Supabase or Neon — both have free tiers and work well with Vercel)
- Use **Prisma ORM** — it maps directly to your existing TypeScript types
- Tables needed: `competencies`, `staff`, `staff_competency_records`, `learning_pathways`, `roles`
- This unlocks real CRUD: adding staff, recording completions, tracking expiry dates dynamically

### 2. Add Authentication
There is currently no login. Any NHS deployment needs access control.

- Use **NextAuth.js** (now Auth.js) — supports NHS email/SSO via OAuth providers
- At minimum: protect all routes behind a session, add role-based access (ward manager vs. nurse vs. admin)

### 3. Wire Up the Chat API Key
`/api/chat/route.ts` calls an LLM but the API key setup isn't visible in the codebase. Make sure:
- `ANTHROPIC_API_KEY` (or whichever provider) is set in `.env.local` for dev and in your hosting platform's env vars for production
- The `buildSystemPrompt()` function in `src/lib/context.ts` is already well-designed — keep it, just point it at live DB data instead of static arrays once you add a database

### 4. Add Expiry Alerting
The data model already has `expiryDate` on every `StaffRecord`. Build on this:
- A scheduled job (cron) that flags records expiring within 30/60/90 days
- Email notifications to staff and ward managers (use **Resend** or **Nodemailer**)
- A dashboard banner showing "X competencies expiring this month"

### 5. Expand the Staff Matrix
Currently only 6 staff members are in the dataset. The staff page (`/staff`) and reports page (`/reports`) will be far more useful once real data is loaded. Add:
- Bulk CSV import for onboarding existing staff records
- Filters by ward, role, band, and compliance status
- Export to PDF/Excel for governance reporting

### 6. Build Out the Reports Page
`/reports` exists as a route but its current state is unknown from the codebase. Reports are critical for NHS governance — prioritise:
- Trust-wide compliance % by category
- Overdue mandatory competencies by ward
- Staff with expired records
- Upcoming renewals calendar view

### 7. Deploy
The stack is Vercel-ready:
```
npm run build   # verify it builds cleanly first
vercel deploy   # or connect GitHub repo to Vercel for auto-deploys
```
Set your env vars (`DATABASE_URL`, `ANTHROPIC_API_KEY`, `NEXTAUTH_SECRET`) in the Vercel dashboard.

---

## Quick Wins You Can Do Today

- **Add more staff records** to `src/data/staff.ts` to make the matrix meaningful
- **Add more learning pathways** to `src/data/pathways.ts` — Community Nurse and Senior Nurse pathways are missing
- **Test the chat** — run `npm run dev`, open `localhost:3000`, and verify the AI correctly answers questions about specific staff compliance
- **Check the API route** at `src/app/api/chat/route.ts` — confirm your API key env var is named correctly

---

## Tech Stack Summary

```
Next.js 16 (App Router)
React 19
TypeScript 5
Tailwind CSS 4
ESLint 9
```

No testing framework is configured yet — consider adding **Vitest** for unit tests on the data utility functions and **Playwright** for end-to-end UI tests before going to production.
