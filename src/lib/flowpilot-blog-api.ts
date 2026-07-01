/** FlowPilot published blogs API — shared request shape for app + build scripts. */

export const FLOWPILOT_BLOG_API_URL =
  "https://flowpilot.officekithr.net/api/api/blogs";

export const FLOWPILOT_BLOG_DEV_PROXY = "/api/flowpilot-blogs";

/** Legacy host — blog traffic must not use this endpoint. */
export const DEPRECATED_BLOG_API_HOST = "api.officekithr.com";

export const FLOWPILOT_BLOG_PAGE_SIZE = 20;

export const FLOWPILOT_BLOG_STATUS = "published" as const;

export type FlowPilotBlogQuery = {
  page?: number;
  limit?: number;
  status?: typeof FLOWPILOT_BLOG_STATUS;
};

/** Always resolve to FlowPilot (or the dev proxy). Ignores api.officekithr.com overrides. */
export function resolveFlowpilotBlogBaseUrl(
  configured: string | undefined,
  isDev = false,
): string {
  const value = configured?.trim();

  if (
    value &&
    !value.includes(DEPRECATED_BLOG_API_HOST) &&
    (value === FLOWPILOT_BLOG_DEV_PROXY || value.includes("flowpilot.officekithr.net"))
  ) {
    return value;
  }

  return isDev ? FLOWPILOT_BLOG_DEV_PROXY : FLOWPILOT_BLOG_API_URL;
}

export function flowpilotBlogHeaders(apiKey: string): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = apiKey.trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function flowpilotBlogUrl(
  baseUrl: string,
  { page = 1, limit = FLOWPILOT_BLOG_PAGE_SIZE, status = FLOWPILOT_BLOG_STATUS }: FlowPilotBlogQuery = {},
): string {
  const url = new URL(baseUrl, typeof window !== "undefined" ? window.location.origin : "https://www.officekithr.com");
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("status", status);
  return url.toString();
}

/** Single blog — list endpoint omits `content`; detail returns full HTML body. */
export function flowpilotBlogDetailUrl(
  baseUrl: string,
  blogIdOrSlug: string,
): string {
  const root = baseUrl.split("?")[0].replace(/\/$/, "");
  return `${root}/${encodeURIComponent(blogIdOrSlug)}`;
}
