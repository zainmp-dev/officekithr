function parseBlogDate(isoDate: string): Date | null {
  const [year, month, day] = isoDate.split("T")[0].split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

/** Format YYYY-MM-DD without timezone shift (avoids off-by-one day bugs). */
export function formatBlogDate(isoDate: string): string {
  const date = parseBlogDate(isoDate);
  if (!date) return isoDate;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Long-form date for article headers (e.g. "July 1, 2026"). */
export function formatBlogDateLong(isoDate: string): string {
  const date = parseBlogDate(isoDate);
  if (!date) return isoDate;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
