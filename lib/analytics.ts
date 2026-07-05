// Thin wrapper around the Umami tracker. Safe when the script is absent
// (no website ID configured) or blocked by the visitor.
export const track = (event: string, data?: Record<string, unknown>) => {
  (window as any).umami?.track(event, data);
};
