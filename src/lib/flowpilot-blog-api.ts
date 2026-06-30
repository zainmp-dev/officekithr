/** FlowPilot published blogs API — shared request shape for app + build scripts. */

export const FLOWPILOT_BLOG_API_URL =
  "https://flowpilot.officekithr.net/api/api/blogs";

export const FLOWPILOT_BLOG_DEV_PROXY = "/api/flowpilot-blogs";

export const FLOWPILOT_BLOG_PAGE_SIZE = 20;

export const FLOWPILOT_BLOG_STATUS = "published" as const;

export type FlowPilotBlogQuery = {
  page?: number;
  limit?: number;
  status?: typeof FLOWPILOT_BLOG_STATUS;
};

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
