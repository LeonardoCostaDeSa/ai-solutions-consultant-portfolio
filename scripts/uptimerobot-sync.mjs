#!/usr/bin/env node

const API_V2_BASE = "https://api.uptimerobot.com/v2";
const API_V3_BASE = "https://api.uptimerobot.com/v3";
const DEFAULT_INTERVAL_SECONDS = 300;
const DEFAULT_TIMEOUT_SECONDS = 30;

const desiredMonitors = [
  {
    friendlyName: "KVM1 - Portfolio",
    url: "https://leonardosa.pro/",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
  {
    friendlyName: "KVM1 - Express LP health",
    url: "https://express.revisamaster.com/api/health",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
  {
    friendlyName: "KVM1 - RevisaMaster",
    url: "https://revisamaster.com/",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
  {
    friendlyName: "KVM1 - Garden",
    url: "https://garden.leonardosa.pro/",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
  {
    friendlyName: "KVM1 - R2D",
    url: "https://formacaodelideranca.leonardosa.pro/",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
  {
    friendlyName: "KVM1 - N8N",
    url: "https://n8n.leonardosa.pro/",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
  {
    friendlyName: "KVM2 - RM Express",
    url: "https://relatorio.revisamaster.com/",
    type: "HTTP",
    interval: DEFAULT_INTERVAL_SECONDS,
    timeout: DEFAULT_TIMEOUT_SECONDS,
  },
];

const args = new Set(process.argv.slice(2));
const shouldApply = args.has("--apply");
const shouldListOnly = args.has("--list");
const shouldPlanOnly = args.has("--plan") || (!shouldApply && !shouldListOnly);

function usage() {
  console.log(`Usage:
  node scripts/uptimerobot-sync.mjs --plan
  node scripts/uptimerobot-sync.mjs --list
  node scripts/uptimerobot-sync.mjs --apply

Environment:
  UPTIMEROBOT_API_KEY  Main API key for --apply; read-only key is enough for --list.

Notes:
  --apply creates missing HTTP monitors through UptimeRobot API v3.
  Desired monitors use a 300s interval and 30s timeout, which match the free plan.
`);
}

if (args.has("--help") || args.has("-h")) {
  usage();
  process.exit(0);
}

function getApiKey() {
  const apiKey = process.env.UPTIMEROBOT_API_KEY;
  if (!apiKey) {
    throw new Error("UPTIMEROBOT_API_KEY is not set in this shell.");
  }
  return apiKey;
}

async function postForm(endpoint, fields) {
  const body = new URLSearchParams({
    format: "json",
    ...fields,
  });

  const response = await fetch(`${API_V2_BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`UptimeRobot ${endpoint} returned non-JSON response: ${text.slice(0, 300)}`);
  }

  if (!response.ok || payload.stat !== "ok") {
    const message = payload.error?.message || payload.error?.type || text;
    throw new Error(`UptimeRobot ${endpoint} failed: ${message}`);
  }

  return payload;
}

async function postJsonV3(endpoint, apiKey, fields) {
  const response = await fetch(`${API_V3_BASE}/${endpoint}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`UptimeRobot v3 ${endpoint} returned non-JSON response: ${text.slice(0, 300)}`);
  }

  if (!response.ok) {
    const message = Array.isArray(payload.message)
      ? payload.message.join("; ")
      : payload.message || payload.error || text;
    throw new Error(`UptimeRobot v3 ${endpoint} failed: ${message}`);
  }

  return payload;
}

async function getAllMonitors(apiKey) {
  const monitors = [];
  let offset = 0;
  const limit = 50;

  while (true) {
    const payload = await postForm("getMonitors", {
      api_key: apiKey,
      limit: String(limit),
      offset: String(offset),
    });

    monitors.push(...(payload.monitors || []));

    const pagination = payload.pagination || {};
    const total = Number(pagination.total ?? monitors.length);
    if (monitors.length >= total || (payload.monitors || []).length === 0) {
      break;
    }

    offset += limit;
  }

  return monitors;
}

function normalizeUrl(url) {
  return url.replace(/\/+$/, "");
}

function findExistingMonitor(existingMonitors, desired) {
  const desiredUrl = normalizeUrl(desired.url);
  return existingMonitors.find((monitor) => {
    const monitorUrl = normalizeUrl(String(monitor.url || ""));
    return monitorUrl === desiredUrl || monitor.friendly_name === desired.friendlyName;
  });
}

async function createMonitor(apiKey, desired) {
  const fields = {
    friendlyName: desired.friendlyName,
    url: desired.url,
    type: desired.type,
    interval: desired.interval,
    timeout: desired.timeout,
    keywordType: null,
    authType: "NONE",
    httpMethodType: "HEAD",
  };

  return postJsonV3("monitors", apiKey, fields);
}

function printPlan() {
  console.log("Desired UptimeRobot monitors:");
  for (const monitor of desiredMonitors) {
    console.log(`- ${monitor.friendlyName}: ${monitor.url} every ${monitor.interval}s, timeout ${monitor.timeout}s`);
  }
  console.log("\nThis was a plan-only run. Use --list to compare with UptimeRobot or --apply to create missing monitors.");
  console.log("--apply creates missing monitors through UptimeRobot API v3.");
}

if (shouldPlanOnly) {
  printPlan();
  process.exit(0);
}

const apiKey = getApiKey();
const existingMonitors = await getAllMonitors(apiKey);

console.log(`Found ${existingMonitors.length} existing UptimeRobot monitor(s).`);

let created = 0;
let present = 0;

for (const desired of desiredMonitors) {
  const existing = findExistingMonitor(existingMonitors, desired);

  if (existing) {
    present += 1;
    console.log(`PRESENT ${desired.friendlyName}: id=${existing.id} status=${existing.status} url=${existing.url}`);
    continue;
  }

  if (!shouldApply) {
    console.log(`MISSING ${desired.friendlyName}: ${desired.url}`);
    continue;
  }

  const payload = await createMonitor(apiKey, desired);
  const monitorId = payload.monitor?.id || payload.id || "unknown";
  created += 1;
  console.log(`CREATED ${desired.friendlyName}: id=${monitorId} url=${desired.url}`);
}

console.log(`\nSummary: present=${present}, created=${created}, desired=${desiredMonitors.length}`);

if (!shouldApply && desiredMonitors.length !== present) {
  console.log("Run with --apply to create missing monitors.");
}
