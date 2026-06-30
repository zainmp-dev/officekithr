/** FlowPilot published blogs API — Node/build script mirror of src/lib/flowpilot-blog-api.ts */

export const FLOWPILOT_BLOG_API_URL =
  "https://flowpilot.officekithr.net/api/api/blogs";

export const DEPRECATED_BLOG_API_HOST = "api.officekithr.com";

export const FLOWPILOT_BLOG_PAGE_SIZE = 20;

export const FLOWPILOT_BLOG_STATUS = "published";

export function resolveFlowpilotBlogBaseUrl(configured) {
  const value = configured?.trim();

  if (
    value &&
    !value.includes(DEPRECATED_BLOG_API_HOST) &&
    value.includes("flowpilot.officekithr.net")
  ) {
    return value;
  }

  return FLOWPILOT_BLOG_API_URL;
}

export function flowpilotBlogHeaders(apiKey = "") {
  const headers = { "Content-Type": "application/json" };
  const token = apiKey.trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function flowpilotBlogUrl(baseUrl, { page = 1, limit = FLOWPILOT_BLOG_PAGE_SIZE, status = FLOWPILOT_BLOG_STATUS } = {}) {
  const url = new URL(baseUrl);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("status", status);
  return url.toString();
}

/** Single blog — list endpoint omits `content`; detail returns full HTML body. */
export function flowpilotBlogDetailUrl(baseUrl, blogId) {
  const root = baseUrl.split("?")[0].replace(/\/$/, "");
  return `${root}/${encodeURIComponent(blogId)}`;
}

/** Fetch all published blog pages from FlowPilot. */
export async function fetchAllPublishedBlogs({ apiUrl, apiKey } = {}) {
  const base = resolveFlowpilotBlogBaseUrl(
    apiUrl?.trim() || process.env.VITE_BLOG_API_URL,
  );
  const token = apiKey?.trim() ?? process.env.VITE_BLOG_API_KEY?.trim() ?? "";

  const posts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(flowpilotBlogUrl(base, { page, limit: FLOWPILOT_BLOG_PAGE_SIZE }), {
      headers: flowpilotBlogHeaders(token),
    });
    if (!res.ok) break;

    const body = await res.json();
    const batch = body?.data?.blogs;
    if (!body?.success || !Array.isArray(batch)) break;

    posts.push(...batch);
    totalPages = Number(body.data?.totalPages) || 1;
    page += 1;
  }

  return posts;
}
