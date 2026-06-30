/** Run a task after first paint — idle callback when available, short timeout fallback. */
export function scheduleDeferred(
  task: () => void,
  options?: { timeout?: number; delay?: number },
): () => void {
  const timeout = options?.timeout ?? 2000;
  const delay = options?.delay ?? 50;
  let cancelled = false;

  const run = () => {
    if (!cancelled) task();
  };

  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    const id = window.requestIdleCallback(run, { timeout });
    return () => {
      cancelled = true;
      window.cancelIdleCallback(id);
    };
  }

  const id = window.setTimeout(run, delay);
  return () => {
    cancelled = true;
    clearTimeout(id);
  };
}
