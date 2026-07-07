# VPS edge inventory

Last verified: 2026-07-07.

This file tracks the public edge state for the VPS hosts that run Traefik-backed Docker services.

## KVM1

- Hostname: `srv723328`
- IP: `82.29.62.176`
- SSH: port `2200`, user `root`
- Docker package source: Ubuntu `docker.io`
- Docker version: `29.1.3-0ubuntu3~24.04.2`
- Docker API: server `1.52`, minimum `1.24`
- Traefik image: `traefik:v3.2`
- Traefik version observed: `3.2.5`
- Docker daemon config: `/etc/docker/daemon.json` includes `"min-api-version": "1.24"`
- Package holds applied on 2026-07-07:
  - `docker.io`
  - `containerd`
  - `docker-compose-v2`

Primary routed hosts observed:

- `leonardosa.pro`
- `www.leonardosa.pro`
- `express.revisamaster.com`
- `revisamaster.com`
- `www.revisamaster.com`
- `revisamaster.com.br`
- `www.revisamaster.com.br`
- `garden.leonardosa.pro`
- `escritaacademicacomia.revisamaster.com`
- `mentoria.revisamaster.com`
- `master.revisamaster.com`
- `curso.revisamaster.com`
- `formacaodelideranca.leonardosa.pro`
- `evolutionadm.revisamaster.com`
- `evolution.revisamaster.com`
- `n8n.leonardosa.pro`

Notes:

- Some KVM1 routers do not currently resolve in public DNS but do respond when resolved directly to `82.29.62.176`.
- Do not upgrade Docker, containerd, Docker Compose, or Traefik on this host without a maintenance window and rollback plan.

## KVM2

- Hostname: `srv1711602`
- IP: `2.25.142.214`
- SSH: port `2200`, user `root`
- Docker package source: Docker CE apt repository
- Docker version: `29.5.2`
- Docker API: server `1.54`, minimum `1.40`
- Traefik image/version: `traefik:v3.6.17`
- Docker daemon config: no explicit `min-api-version` observed
- Package holds: none observed

Primary routed hosts observed:

- `relatorio.revisamaster.com`

Assessment:

- KVM2 is not currently affected by the Docker API / Traefik provider failure.
- Traefik logs showed no Docker provider API-version errors during the read-only audit.
- KVM2 is still a latent-risk host because unattended upgrades are enabled and a newer Docker CE candidate exists.
- Per operating decision on 2026-07-07, do not change package versions or holds on KVM2 without explicit approval. KVM2 is documented only for now.

## Change Policy

For both hosts:

- Treat Docker, containerd, Docker Compose, and Traefik updates as edge-risk changes.
- Do not perform unattended major upgrades of these components.
- Before any approved edge update, capture:
  - `docker version`
  - `/etc/docker/daemon.json`
  - `docker ps`
  - `docker inspect traefik`
  - recent Traefik Docker provider logs
  - public and direct-origin smoke tests
- After any approved edge update, verify public canaries and direct-origin smokes before leaving the maintenance window.

## UptimeRobot Sync

The desired UptimeRobot monitor list is maintained in `scripts/uptimerobot-sync.mjs`.

Use a local environment variable. Never commit API keys.

```powershell
$env:UPTIMEROBOT_API_KEY = "..."
node scripts/uptimerobot-sync.mjs --plan
node scripts/uptimerobot-sync.mjs --list
node scripts/uptimerobot-sync.mjs --apply
```

Modes:

- `--plan`: print desired monitors only; no API call.
- `--list`: compare desired monitors with existing UptimeRobot monitors.
- `--apply`: create missing monitors. Existing monitors are not deleted.

The initial desired monitor set covers:

- KVM1: Portfolio, Express LP health, RevisaMaster, Garden, R2D, N8N
- KVM2: RM Express landing page
