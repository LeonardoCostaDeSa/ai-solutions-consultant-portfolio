import { useEffect, useState } from 'react';

/**
 * False during SSG render and the first client render, true after mount.
 * Used to gate scroll-driven MotionStyles: attaching them on the server would
 * serialize their initial values (often opacity 0 / offset transforms) into
 * the static HTML, hiding content from no-JS readers and crawlers.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
