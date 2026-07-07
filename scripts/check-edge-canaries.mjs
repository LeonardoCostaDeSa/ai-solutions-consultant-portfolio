#!/usr/bin/env node

const DEFAULT_TIMEOUT_MS = 15_000;

const canaries = [
  {
    name: "portfolio home",
    url: "https://leonardosa.pro/",
    statuses: [200],
    bodyIncludes: "<!doctype html",
  },
  {
    name: "portfolio solutions",
    url: "https://leonardosa.pro/solutions",
    statuses: [200],
    bodyIncludes: "<!doctype html",
  },
  {
    name: "portfolio www redirect",
    url: "https://www.leonardosa.pro/",
    statuses: [301, 308],
    locationIncludes: "https://leonardosa.pro/",
  },
  {
    name: "RM Express LP health",
    url: "https://express.revisamaster.com/api/health",
    statuses: [200],
  },
  {
    name: "RM Express landing",
    url: "https://relatorio.revisamaster.com/",
    statuses: [200],
  },
  {
    name: "RevisaMaster main",
    url: "https://revisamaster.com/",
    statuses: [200],
  },
  {
    name: "RevisaMaster BR redirect",
    url: "https://revisamaster.com.br/",
    statuses: [301, 308],
    locationIncludes: "https://revisamaster.com/",
  },
  {
    name: "Garden SP",
    url: "https://garden.leonardosa.pro/",
    statuses: [200],
  },
  {
    name: "R2D leadership",
    url: "https://formacaodelideranca.leonardosa.pro/",
    statuses: [200],
  },
];

async function checkCanary(canary) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), canary.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const started = Date.now();

  try {
    const response = await fetch(canary.url, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "user-agent": "portfolio-edge-canary/1.0",
      },
    });
    const elapsedMs = Date.now() - started;
    const body = await response.text();
    const location = response.headers.get("location") ?? "";
    const expectedStatus = canary.statuses.includes(response.status);
    const expectedBody = !canary.bodyIncludes || body.toLowerCase().includes(canary.bodyIncludes.toLowerCase());
    const expectedLocation = !canary.locationIncludes || location.includes(canary.locationIncludes);

    return {
      ...canary,
      ok: expectedStatus && expectedBody && expectedLocation,
      status: response.status,
      elapsedMs,
      location,
      error: null,
      details: {
        expectedStatus,
        expectedBody,
        expectedLocation,
      },
    };
  } catch (error) {
    return {
      ...canary,
      ok: false,
      status: null,
      elapsedMs: Date.now() - started,
      location: "",
      error: error instanceof Error ? error.message : String(error),
      details: {
        expectedStatus: false,
        expectedBody: false,
        expectedLocation: false,
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.all(canaries.map(checkCanary));
const failures = results.filter((result) => !result.ok);

for (const result of results) {
  const status = result.status ?? "ERR";
  const outcome = result.ok ? "PASS" : "FAIL";
  const location = result.location ? ` location=${result.location}` : "";
  const error = result.error ? ` error=${result.error}` : "";
  console.log(`${outcome} ${result.name}: status=${status} elapsed=${result.elapsedMs}ms${location}${error}`);

  if (!result.ok) {
    console.log(`  expected statuses: ${result.statuses.join(", ")}`);
    console.log(`  checks: ${JSON.stringify(result.details)}`);
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.length} edge canary check(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${results.length} edge canary checks passed.`);
