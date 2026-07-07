# 2026-07-07 VPS Traefik global 404

## Impact

All public sites behind the VPS Traefik edge returned the Traefik default `404 page not found` response. The application containers were still running, but Traefik had no Docker routers loaded.

## Root Cause

Docker Engine on the VPS was running with API version `1.52` and minimum supported API version `1.44`. Traefik `v3.2` attempted to use Docker API client version `1.24` for the Docker provider.

That mismatch caused repeated Traefik provider errors:

```text
Error response from daemon: client version 1.24 is too old. Minimum supported API version is 1.44
```

With the Docker provider unavailable, Traefik could not read container labels, so none of the host routers existed at runtime.

## Fix Applied

The VPS Docker daemon config was patched to allow the older API version:

```json
{
  "min-api-version": "1.24"
}
```

Then Docker and Traefik were restarted. Public canaries returned healthy status after the restart.

## Permanent Guardrails

- Portfolio deploy now adds `traefik.docker.network=traefik-public`.
- Portfolio deploy fails if local Traefik smoke tests do not pass.
- Public edge canaries run on a schedule through GitHub Actions.
- The canaries check multiple independent domains so a Traefik/router failure shows up as a correlated edge failure, not as an app-only issue.

## Follow-Up

- Add any newly deployed VPS domains to `scripts/check-edge-canaries.mjs`.
- Treat simultaneous canary failures across unrelated domains as an edge incident first.
- Review Docker and Traefik release notes before unattended Docker major upgrades on the VPS.
