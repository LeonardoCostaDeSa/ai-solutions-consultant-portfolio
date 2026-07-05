# leonardosa.pro

Personal portfolio of **Leonardo Costa de Sá** — AI Engineer building production GenAI systems for regulated and document-heavy environments.

**Live site:** [leonardosa.pro](https://leonardosa.pro)

## Stack

- **Frontend:** React 19 + TypeScript, Vite, Tailwind CSS, Framer Motion
- **Routing:** React Router v7
- **Infrastructure:** Docker (multi-stage build → Nginx), deployed to a VPS behind Traefik with Let's Encrypt TLS
- **CI/CD:** GitHub Actions — builds the image, pushes to GHCR, and deploys over SSH on every push to `main`

## Local development

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`:

1. Docker image is built (Node builder stage → Nginx Alpine runtime) and pushed to GitHub Container Registry.
2. The VPS pulls the new image and restarts the container via `docker-compose`, with Traefik handling TLS and the `www` → apex redirect.

## Project structure

```
components/   Reusable UI (navbar, hero, footer, animations)
pages/        Route-level pages (Home, About, Solutions, Resume)
data/         Case-study and process content
public/       Static assets (images, favicon)
```
