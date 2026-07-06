// Shared film-grain texture: an SVG feTurbulence noise tile encoded as a data URI.
// One constant reused by every environment — zero per-project cost, SSR-safe.
const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)" opacity="0.9"/></svg>`;

export const GRAIN_DATA_URI = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;
