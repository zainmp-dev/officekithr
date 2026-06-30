import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Calendar, User, Clock } from "lucide-react";
import DOMPurify from "dompurify";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  getCachedPostBySlug,
  getPostBySlug,
  prefetchAllPosts,
} from "@/services/blogService";
import { PageJsonLd } from "@/components/PageJsonLd";
import { usePageSeo, useSeoContext, type BlogSeoEntry } from "@/seo/SeoContext";
import { articleSchema, breadcrumbSchema } from "@/seo/schema";
import { absoluteUrl, SITE } from "@/seo/site-config";
import BlogActions from "@/components/BlogActions";
import BackToBlog from "@/components/BackToBlog";
import { formatBlogDate } from "@/utils/formatBlogDate";
import { prepareBlogContentHtml } from "@/utils/prepareBlogContent";
import { BlogPost } from "@/types";

/** Clears fixed announcement bar + floating nav (see Navigation.tsx). */
const BLOG_ARTICLE_TOP = "pt-36 sm:pt-40 md:pt-44";

function manifestToPost(entry: BlogSeoEntry, slug: string): BlogPost {
  return {
    _id: `manifest-${slug}`,
    title: entry.headline || entry.title,
    excerpt: entry.description,
    author: entry.author || "OfficeKit HR",
    createdAt: entry.datePublished || new Date().toISOString().slice(0, 10),
    updates: "Blogs",
    readTime: "5 min read",
    image: entry.image || "",
    link: entry.path || `/blog/${slug}`,
    slug,
  };
}

function resolveInitialPost(slug: string, manifestEntry?: BlogSeoEntry): BlogPost | null {
  const cached = getCachedPostBySlug(slug);
  if (cached) return cached;
  if (manifestEntry) return manifestToPost(manifestEntry, slug);
  return null;
}

function BlogContentSkeleton() {
  return (
    <div className="space-y-3 animate-pulse py-2" aria-hidden>
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-[94%]" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-[88%]" />
    </div>
  );
}

function BlogArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      <article className={`${BLOG_ARTICLE_TOP} pb-14 sm:pb-20`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">{children}</div>
      </article>
      <Footer />
    </div>
  );
}

function BlogPostCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background shadow-sm overflow-hidden">
      <div className="border-b border-border/50 bg-muted/20 px-4 py-3 sm:px-6">
        <BackToBlog />
      </div>
      <div className="px-4 py-6 sm:px-7 sm:py-8">{children}</div>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { blogManifest } = useSeoContext();
  const manifestEntry = slug ? blogManifest[slug] : undefined;
  const [post, setPost] = useState<BlogPost | null>(() =>
    slug ? resolveInitialPost(slug, manifestEntry) : null,
  );
  const [contentLoading, setContentLoading] = useState(() => {
    if (!slug) return false;
    const cached = getCachedPostBySlug(slug);
    return !cached?.content?.trim();
  });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setNotFound(false);

    const cached = getCachedPostBySlug(slug);
    if (cached?.content?.trim()) {
      setPost(cached);
      setContentLoading(false);
      return;
    }

    if (cached) setPost(cached);
    else if (manifestEntry) setPost(manifestToPost(manifestEntry, slug));

    setContentLoading(true);

    const loadPost = async () => {
      try {
        const foundPost = await getPostBySlug(slug);
        if (cancelled) return;

        if (foundPost) {
          setPost(foundPost);
          setNotFound(false);
        } else if (!cached && !manifestEntry) {
          setNotFound(true);
        }
      } catch {
        if (!cancelled && !cached && !manifestEntry) setNotFound(true);
      } finally {
        if (!cancelled) setContentLoading(false);
      }
    };

    prefetchAllPosts().catch(() => {});
    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug, manifestEntry]);

  const excerpt = useMemo(() => {
    if (!post) return "";
    return (
      post.excerpt?.trim() ||
      (post.content ? post.content.replace(/<[^>]+>/g, "").trim().slice(0, 160) : "")
    );
  }, [post]);

  const seoConfig = useMemo(() => {
    const path = slug ? `/blog/${slug}` : "/resources/blogs";
    if (notFound) {
      return {
        path,
        title: "Blog Not Found | OfficeKit HR",
        description: "The article you requested could not be found.",
        noindex: true,
      };
    }
    if (!post) {
      if (manifestEntry) return null;
      return {
        path,
        title: "Loading… | OfficeKit HR Blog",
        noindex: true,
      };
    }
    return {
      path,
      title: `${post.title} | OfficeKit HR Blog`,
      description: excerpt,
      type: "article" as const,
      ogImage: post.image,
    };
  }, [slug, post, excerpt, manifestEntry, notFound]);

  usePageSeo(seoConfig);

  const postUrl = slug ? absoluteUrl(`/blog/${slug}`) : SITE.url;

  if (notFound && !post) {
    return (
      <BlogArticleLayout>
        <BlogPostCard>
          <div className="py-8 text-center">
            <p className="text-lg font-medium text-foreground mb-3">Article not found</p>
            <p className="text-muted-foreground mb-6 text-sm">
              This post may have been moved or removed.
            </p>
            <Link to="/resources/blogs">
              <Button variant="outline">Browse all blogs</Button>
            </Link>
          </div>
        </BlogPostCard>
      </BlogArticleLayout>
    );
  }

  if (!post) {
    return (
      <BlogArticleLayout>
        <BlogPostCard>
          <div className="space-y-5 animate-pulse">
            <div className="h-6 w-24 bg-muted rounded-full" />
            <div className="h-9 w-full max-w-lg bg-muted rounded" />
            <div className="h-4 w-2/3 max-w-xs bg-muted rounded" />
            <div className="aspect-[16/9] bg-muted rounded-xl" />
            <BlogContentSkeleton />
          </div>
        </BlogPostCard>
      </BlogArticleLayout>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.content || "");
  const cleanedContent = prepareBlogContentHtml(sanitizedContent, {
    title: post.title,
    featuredImage: post.image || SITE.ogImage,
  });

  const hasHtmlContent = cleanedContent.length > 0;
  const fallbackText = excerpt;

  return (
    <BlogArticleLayout>
      <PageJsonLd
        nodes={[
          articleSchema({
            title: post.title,
            description: excerpt,
            url: postUrl,
            image: post.image || SITE.ogImage,
            datePublished: post.createdAt,
            dateModified: post.updatedAt,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/resources/blogs" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <BlogPostCard>
        <header className="mb-6 sm:mb-7">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide text-primary bg-primary/10 rounded-full mb-3 sm:mb-4">
            {post.updates || "Blogs"}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 leading-snug tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="font-medium text-foreground/80">{post.author}</span>
            </span>
            <span className="text-border" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <time dateTime={post.createdAt}>{formatBlogDate(post.createdAt)}</time>
            </span>
            <span className="text-border" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {post.readTime || "5 min read"}
            </span>
          </div>
        </header>

        <div className="aspect-[16/9] rounded-xl mb-5 sm:mb-6 overflow-hidden ring-1 ring-border/50">
          <img
            src={post.image || SITE.ogImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1200}
            height={675}
          />
        </div>

        <BlogActions title={post.title} variant="subtle" className="mb-6 sm:mb-8" />

        {contentLoading ? (
          <BlogContentSkeleton />
        ) : hasHtmlContent ? (
          <div
            className="blog-content mb-8 sm:mb-10"
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />
        ) : fallbackText ? (
          <div className="blog-content mb-8 sm:mb-10 text-muted-foreground leading-relaxed">
            <p>{fallbackText}</p>
          </div>
        ) : (
          <p className="mb-8 text-sm text-muted-foreground">
            Article summary is not available right now. Please check back soon.
          </p>
        )}

        <div className="bg-gradient-subtle rounded-xl p-5 sm:p-8 text-center border border-border/40">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
            Transform Your HR with OfficeKit
          </h2>
          <p className="text-muted-foreground mb-4 sm:mb-5 text-sm sm:text-base">
            Discover how our AI-powered HRMS helps businesses simplify HR, engage employees,
            and drive growth.
          </p>
          <Link to="/contact">
            <Button size="lg" className="w-full sm:w-auto">
              Get in touch
            </Button>
          </Link>
        </div>
      </BlogPostCard>
    </BlogArticleLayout>
  );
}
