# VPS edge incident runbook

Use this runbook when several unrelated public sites return Traefik `404 page not found`, TLS errors, or timeouts at the same time.

## First Rule

Do not restart, upgrade, downgrade, prune, or edit production services until read-only checks identify the failing layer.

## Triage

1. Check whether the failure is correlated across unrelated domains.

```bash
node scripts/check-edge-canaries.mjs
```

2. Check public and direct-origin responses for the affected host.

```bash
curl -k -I https://leonardosa.pro/
curl -k -I --resolve leonardosa.pro:443:82.29.62.176 https://leonardosa.pro/
curl -k -I https://relatorio.revisamaster.com/
curl -k -I --resolve relatorio.revisamaster.com:443:2.25.142.214 https://relatorio.revisamaster.com/
```

3. Inspect Docker and Traefik without changing anything.

```bash
docker version
cat /etc/docker/daemon.json 2>/dev/null || true
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Networks}}'
docker inspect traefik --format 'image={{.Config.Image}} args={{json .Args}} networks={{json .NetworkSettings.Networks}}'
docker logs --since 2h traefik 2>&1 | grep -Ei 'client version|minimum supported API|provider error|docker.Provider|Failed to retrieve' || true
```

## Docker API / Traefik Provider Failure

Expected symptom:

```text
Error response from daemon: client version 1.24 is too old. Minimum supported API version is 1.44
```

Meaning:

- Traefik is running.
- App containers may still be running.
- Traefik cannot read Docker labels through the Docker provider.
- Runtime routers are missing, so Traefik returns default 404s.

Known mitigation used on KVM1:

```json
{
  "min-api-version": "1.24"
}
```

Any mitigation that edits Docker daemon config or restarts Docker/Traefik requires explicit approval and a maintenance window unless the outage is already active and user approval is given.

## Recovery Validation

After an approved fix:

```bash
docker version
docker logs --since 10m traefik 2>&1 | grep -Ei 'client version|minimum supported API|provider error|Failed to retrieve' || true
node scripts/check-edge-canaries.mjs
```

Required external checks:

- `https://leonardosa.pro/` returns `200`
- `https://www.leonardosa.pro/` redirects to `https://leonardosa.pro/`
- `https://express.revisamaster.com/api/health` returns `200`
- `https://relatorio.revisamaster.com/` returns `200`
- At least one non-Leonardo/Revisa host on the same edge returns healthy status when applicable

## Change Freeze Rules

- KVM1 currently has Docker-related package holds. Do not remove them without approval.
- KVM2 is documentation-only for now. Do not change Docker, containerd, Docker Compose, Traefik, apt holds, or daemon config on KVM2 without explicit approval.
- Any edge update must have a rollback path and direct-origin validation.
