import { env } from "@/lib/env";
import {
  FLOWPILOT_BLOG_PAGE_SIZE,
  flowpilotBlogHeaders,
  flowpilotBlogUrl,
} from "@/lib/flowpilot-blog-api";
import { BlogPost } from "../types";

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

let postsCache: BlogPost[] | null = null;
let cacheTime = 0;
let inflightFetch: Promise<BlogPost[]> | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

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

async function fetchPublishedBlogsPage(page: number): Promise<FlowPilotBlogsResponse | null> {
  const url = flowpilotBlogUrl(env.blogApiUrl, {
    page,
    limit: FLOWPILOT_BLOG_PAGE_SIZE,
  });

  const res = await fetch(url, {
    method: "GET",
    headers: flowpilotBlogHeaders(env.blogApiKey),
  });

  if (!res.ok) return null;
  return res.json() as Promise<FlowPilotBlogsResponse>;
}

async function fetchFlowPilotBlogs(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const body = await fetchPublishedBlogsPage(page);
    if (!body?.success || !body.data?.blogs) break;

    posts.push(...body.data.blogs.map(mapFlowPilotBlog));
    totalPages = body.data.totalPages || 1;
    page += 1;
  }

  return posts;
}

/** Synchronous read of the in-memory API cache (empty until first fetch completes). */
export function getCachedPosts(): BlogPost[] {
  return postsCache ?? [];
}

/** Find a post in cache without triggering a network request. */
export function getCachedPostBySlug(slug: string): BlogPost | null {
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

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const cached = getCachedPostBySlug(slug);
  if (cached?.content) return cached;

  const posts = await getAllPosts();
  return posts.find((p) => slugForPost(p) === slug) ?? null;
};
