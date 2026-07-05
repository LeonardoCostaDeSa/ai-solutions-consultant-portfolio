# Umami — self-hosted analytics (analytics.leonardosa.pro)

Cookieless analytics, so **no consent banner is required** (GDPR/ePrivacy/LGPD).

## One-time setup

1. **DNS**: add an `A` record `analytics.leonardosa.pro` → VPS IP (same IP as `leonardosa.pro`).
2. **VPS**: copy this directory's `docker-compose.yml` to `~/umami/docker-compose.yml` on the VPS.
   Replace `CHANGE_ME_DB_PASSWORD` (both places) and `CHANGE_ME_RANDOM_STRING`
   (`openssl rand -hex 32`).
3. `cd ~/umami && docker compose up -d` — Traefik picks up the labels and issues the
   Let's Encrypt certificate automatically.
4. Open `https://analytics.leonardosa.pro`, log in with `admin` / `umami`,
   **change the password immediately**.
5. Add website: name `leonardosa.pro`, domain `leonardosa.pro`. Copy the **Website ID**.
6. GitHub repo → Settings → Secrets and variables → Actions → **Variables** →
   new variable `UMAMI_WEBSITE_ID` = the ID.
7. Re-run the deploy workflow (or push). The tracking script is injected at build time
   only when the ID is present.

## What gets tracked

- **Pageviews** — automatic, including SPA route changes (Umami patches `pushState`).
- **Custom events** (via `data-umami-event` attributes and `lib/analytics.ts`):

| Event | Property | Where |
|---|---|---|
| `contact-click` | `location`: navbar / hero / home-metrics / about-cta | all "Let's talk" CTAs |
| `email-click` | — | footer email |
| `outbound-linkedin` | `location` | footer, about CTA |
| `outbound-github` | — | footer |
| `paper-click` | `location`: about / resume | paper DOI links |
| `project-open` | `project`: case id | solutions cards |
| `case-filter` | `filter`: all / engineering / AI Adoption | solutions filter |
| `portal-open` | `portal`: projects / resume | home portal cards |

## UTM discipline (feeds the weekly panel)

Point every external profile at the site **with a source tag**, e.g.:

- Upwork bio → `https://leonardosa.pro/?utm_source=upwork`
- Malt → `?utm_source=malt`
- LinkedIn → `?utm_source=linkedin`
- One-pager PDF → `?utm_source=onepager`
- Outbound e-mails → `?utm_source=outbound`

Umami shows these under **UTM** — that's the "which channel generates visits/actions"
column of the weekly metrics panel.
