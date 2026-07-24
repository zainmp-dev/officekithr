import { env } from "@/lib/env";
import {
  FLOWPILOT_BLOG_PAGE_SIZE,
  flowpilotBlogDetailUrl,
  flowpilotBlogHeaders,
  flowpilotBlogUrl,
} from "@/lib/flowpilot-blog-api";
import { BlogPost } from "../types";

/** Listing page size — keep first paint to one API request. */
export const BLOG_LISTING_PAGE_SIZE = 10;

interface FlowPilotBlog {
  id: string;
  title: string;
  slug: string;
  author: string;
  content?: string;
  description?: string;
  metaDescription?: string;
  image?: string;
  categoryName?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

interface FlowPilotBlogsResponse {
  success: boolean;
  data: {
    blogs: FlowPilotBlog[];
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
  };
}

interface FlowPilotBlogDetailResponse {
  success: boolean;
  data: FlowPilotBlog;
}

let postsCache: BlogPost[] | null = null;
let cacheTime = 0;
let inflightFetch: Promise<BlogPost[]> | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

const detailCache = new Map<string, BlogPost>();
const inflightDetail = new Map<string, Promise<BlogPost | null>>();

const pageCache = new Map<string, BlogPostsPage>();
const pageCacheTime = new Map<string, number>();
const pageInflight = new Map<string, Promise<BlogPostsPage>>();

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function estimateReadTime(content?: string): string {
  if (!content) return "5 min read";
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function mapFlowPilotBlog(blog: FlowPilotBlog): BlogPost {
  const excerpt =
    blog.metaDescription ||
    blog.description ||
    stripHtml(blog.content || "").slice(0, 160);

  return {
    _id: blog.id,
    title: blog.title,
    excerpt,
    content: blog.content,
    author: blog.author,
    createdAt: blog.publishedAt || blog.createdAt,
    updatedAt: blog.updatedAt,
    updates: blog.categoryName || "HR Trends",
    readTime: estimateReadTime(blog.content),
    image: blog.image || "",
    link: `/blog/${blog.slug}`,
    slug: blog.slug,
  };
}

function slugForPost(post: BlogPost): string {
  return (
    post.slug ||
    (post.title
      ? post.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
      : "")
  );
}

function cacheDetailPost(post: BlogPost): void {
  const slug = slugForPost(post);
  if (slug) detailCache.set(slug, post);
  patchCachedPost(post);
}

function patchCachedPost(updated: BlogPost): void {
  if (!postsCache) return;
  postsCache = postsCache.map((p) => (p._id === updated._id ? updated : p));
}

function pageCacheKey(page: number, limit: number): string {
  return `${page}:${limit}`;
}

/** Merge a page of posts into the full-list cache without waiting for every page. */
function mergeIntoPostsCache(posts: BlogPost[]): void {
  if (!posts.length) return;
  if (!postsCache) {
    postsCache = posts;
    cacheTime = Date.now();
    return;
  }

  const byId = new Map(postsCache.map((p) => [p._id, p]));
  for (const post of posts) byId.set(post._id, post);
  postsCache = Array.from(byId.values());
  cacheTime = Date.now();
}

export type BlogPostsPage = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
};

async function fetchPublishedBlogsPage(
  page: number,
  limit = FLOWPILOT_BLOG_PAGE_SIZE,
): Promise<FlowPilotBlogsResponse | null> {
  const url = flowpilotBlogUrl(env.blogApiUrl, {
    page,
    limit,
  });

  const res = await fetch(url, {
    method: "GET",
    headers: flowpilotBlogHeaders(env.blogApiKey),
  });

  if (!res.ok) return null;
  return res.json() as Promise<FlowPilotBlogsResponse>;
}

export function getCachedPostsPage(
  page = 1,
  limit = BLOG_LISTING_PAGE_SIZE,
): BlogPostsPage | null {
  return pageCache.get(pageCacheKey(page, limit)) ?? null;
}

/** Fetch a single page of published blogs from the FlowPilot API (cached + deduped). */
export async function getPostsPage(
  page = 1,
  limit = BLOG_LISTING_PAGE_SIZE,
): Promise<BlogPostsPage> {
  const key = pageCacheKey(page, limit);
  const cached = pageCache.get(key);
  const cachedAt = pageCacheTime.get(key) ?? 0;
  if (cached && Date.now() - cachedAt < CACHE_TTL_MS) {
    return cached;
  }

  const existing = pageInflight.get(key);
  if (existing) return existing;

  const promise = (async (): Promise<BlogPostsPage> => {
    try {
      const body = await fetchPublishedBlogsPage(page, limit);
      if (!body?.success || !body.data?.blogs) {
        return (
          cached ?? { posts: [], currentPage: page, totalPages: 0, totalBlogs: 0 }
        );
      }

      const result: BlogPostsPage = {
        posts: body.data.blogs.map(mapFlowPilotBlog),
        currentPage: body.data.currentPage || page,
        totalPages: body.data.totalPages || 1,
        totalBlogs: body.data.totalBlogs || body.data.blogs.length,
      };

      pageCache.set(key, result);
      pageCacheTime.set(key, Date.now());
      mergeIntoPostsCache(result.posts);
      return result;
    } catch {
      return (
        cached ?? { posts: [], currentPage: page, totalPages: 0, totalBlogs: 0 }
      );
    } finally {
      pageInflight.delete(key);
    }
  })();

  pageInflight.set(key, promise);
  return promise;
}

/** Prefetch a page without blocking the caller. */
export function prefetchPostsPage(
  page = 1,
  limit = BLOG_LISTING_PAGE_SIZE,
): void {
  void getPostsPage(page, limit);
}

async function fetchFlowPilotBlogs(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const body = await fetchPublishedBlogsPage(page, FLOWPILOT_BLOG_PAGE_SIZE);
    if (!body?.success || !body.data?.blogs) break;

    const mapped = body.data.blogs.map(mapFlowPilotBlog);
    posts.push(...mapped);
    pageCache.set(pageCacheKey(page, FLOWPILOT_BLOG_PAGE_SIZE), {
      posts: mapped,
      currentPage: body.data.currentPage || page,
      totalPages: body.data.totalPages || 1,
      totalBlogs: body.data.totalBlogs || mapped.length,
    });
    totalPages = body.data.totalPages || 1;
    page += 1;
  }

  return posts;
}

/** Fetch one blog with full HTML body (list API returns empty content). */
async function fetchBlogDetail(identifier: string): Promise<BlogPost | null> {
  const existing = inflightDetail.get(identifier);
  if (existing) return existing;

  const promise = (async () => {
    const url = flowpilotBlogDetailUrl(env.blogApiUrl, identifier);

    const res = await fetch(url, {
      method: "GET",
      headers: flowpilotBlogHeaders(env.blogApiKey),
    });

    if (!res.ok) return null;

    const body = (await res.json()) as FlowPilotBlogDetailResponse;
    if (!body?.success || !body.data) return null;

    const post = mapFlowPilotBlog(body.data);
    cacheDetailPost(post);
    return post;
  })();

  inflightDetail.set(identifier, promise);
  try {
    return await promise;
  } finally {
    inflightDetail.delete(identifier);
  }
}

/** Synchronous read of the in-memory API cache (empty until first fetch completes). */
export function getCachedPosts(): BlogPost[] {
  return postsCache ?? [];
}

/** Find a post in cache without triggering a network request. */
export function getCachedPostBySlug(slug: string): BlogPost | null {
  const fromDetail = detailCache.get(slug);
  if (fromDetail) return fromDetail;
  return getCachedPosts().find((p) => slugForPost(p) === slug) ?? null;
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const now = Date.now();
  if (postsCache && now - cacheTime < CACHE_TTL_MS) {
    return postsCache;
  }

  if (inflightFetch) {
    return inflightFetch;
  }

  inflightFetch = (async () => {
    try {
      postsCache = await fetchFlowPilotBlogs();
      cacheTime = Date.now();
      return postsCache;
    } catch {
      return postsCache ?? [];
    } finally {
      inflightFetch = null;
    }
  })();

  return inflightFetch;
};

/** Warm the cache in the background; safe to call multiple times. */
export function prefetchAllPosts(): Promise<BlogPost[]> {
  return getAllPosts();
}

/** Warm a single article (detail API) — use on card hover for faster opens. */
export function prefetchPostBySlug(slug: string): void {
  const cached = getCachedPostBySlug(slug);
  if (cached?.content?.trim()) return;

  if (cached?._id && !cached._id.startsWith("manifest-")) {
    void fetchBlogDetail(cached._id);
    return;
  }

  void fetchBlogDetail(slug);
}

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const cachedDetail = detailCache.get(slug);
  if (cachedDetail?.content?.trim()) return cachedDetail;

  const cached = getCachedPostBySlug(slug);
  if (cached?.content?.trim()) return cached;

  // Fast path: one detail request (slug or id) — no full list scan.
  const bySlug = await fetchBlogDetail(slug);
  if (bySlug) return bySlug;

  if (cached?._id && !cached._id.startsWith("manifest-")) {
    const byId = await fetchBlogDetail(cached._id);
    if (byId) return byId;
    return cached;
  }

  // Fallback: resolve id from list cache when detail-by-slug is unavailable.
  const posts = await getAllPosts();
  const stub = posts.find((p) => slugForPost(p) === slug) ?? null;
  if (!stub) return null;
  if (stub.content?.trim()) return stub;

  const fullPost = await fetchBlogDetail(stub._id);
  return fullPost ?? stub;
};
