import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Calendar, User, Clock } from "lucide-react";
import DOMPurify from "dompurify";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCachedPostBySlug, getPostBySlug } from "@/services/blogService";
import { PageJsonLd } from "@/components/PageJsonLd";
import { usePageSeo, useSeoContext, type BlogSeoEntry } from "@/seo/SeoContext";
import { articleSchema, breadcrumbSchema } from "@/seo/schema";
import { absoluteUrl, SITE } from "@/seo/site-config";
import BlogActions from "@/components/BlogActions";
import BackToBlog from "@/components/BackToBlog";
import { formatBlogDateLong } from "@/utils/formatBlogDate";
import { prepareBlogContentHtml } from "@/utils/prepareBlogContent";
import { BLOG_CARD_IMAGE_FALLBACK } from "@/data/blog-images";
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
    <div className="space-y-4 py-1" aria-hidden>
      <div className="h-4 bg-muted/80 rounded-md w-full animate-pulse" />
      <div className="h-4 bg-muted/80 rounded-md w-[96%] animate-pulse [animation-delay:75ms]" />
      <div className="h-4 bg-muted/80 rounded-md w-full animate-pulse [animation-delay:150ms]" />
      <div className="h-4 bg-muted/80 rounded-md w-[92%] animate-pulse [animation-delay:225ms]" />
      <div className="h-4 bg-muted/60 rounded-md w-[78%] animate-pulse [animation-delay:300ms]" />
      <div className="h-24 bg-muted/50 rounded-lg w-full mt-6 animate-pulse [animation-delay:375ms]" />
      <div className="h-4 bg-muted/80 rounded-md w-full animate-pulse [animation-delay:450ms]" />
      <div className="h-4 bg-muted/80 rounded-md w-[88%] animate-pulse [animation-delay:525ms]" />
    </div>
  );
}

function BlogArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <article className={`${BLOG_ARTICLE_TOP} pb-16 sm:pb-24`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">{children}</div>
      </article>
      <Footer />
    </div>
  );
}

function BlogMetaItem({
  icon: Icon,
  children,
}: {
  icon: typeof User;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
      {children}
    </span>
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

  const cleanedContent = useMemo(() => {
    if (!post?.content?.trim()) return "";
    const sanitized = DOMPurify.sanitize(post.content);
    return prepareBlogContentHtml(sanitized, {
      title: post.title,
      featuredImage: post.image || SITE.ogImage,
    });
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
  const heroImage = post?.image || SITE.ogImage;

  if (notFound && !post) {
    return (
      <BlogArticleLayout>
        <div className="py-16 text-center">
          <p className="text-xl font-semibold text-foreground mb-2">Article not found</p>
          <p className="text-muted-foreground mb-8 text-sm max-w-md mx-auto">
            This post may have been moved or removed.
          </p>
          <Link to="/resources/blogs">
            <Button variant="outline">Browse all blogs</Button>
          </Link>
        </div>
      </BlogArticleLayout>
    );
  }

  if (!post) {
    return (
      <BlogArticleLayout>
        <BackToBlog className="mb-8" />
        <div className="space-y-6 animate-pulse">
          <div className="h-7 w-28 bg-muted rounded-full" />
          <div className="h-10 sm:h-12 w-full max-w-2xl bg-muted rounded-lg" />
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="aspect-[16/9] bg-muted rounded-2xl" />
          <BlogContentSkeleton />
        </div>
      </BlogArticleLayout>
    );
  }

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
            image: heroImage,
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

      <BackToBlog className="mb-8" />

      <header className="mb-8 sm:mb-10">
        <Badge variant="secondary" className="mb-4 font-medium">
          {post.updates || "Blogs"}
        </Badge>

        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-5 leading-[1.15] tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <BlogMetaItem icon={User}>
            <span className="font-medium text-foreground/90">{post.author}</span>
          </BlogMetaItem>
          <BlogMetaItem icon={Calendar}>
            <time dateTime={post.createdAt}>{formatBlogDateLong(post.createdAt)}</time>
          </BlogMetaItem>
          <BlogMetaItem icon={Clock}>{post.readTime || "5 min read"}</BlogMetaItem>
        </div>
      </header>

      <div className="aspect-[16/9] rounded-2xl mb-8 sm:mb-10 overflow-hidden bg-muted shadow-sm">
        <img
          src={heroImage}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1200}
          height={675}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = BLOG_CARD_IMAGE_FALLBACK;
          }}
        />
      </div>

      <BlogActions title={post.title} variant="subtle" className="mb-8" />

      {contentLoading ? (
        <div role="status" aria-live="polite" aria-label="Loading article content">
          <BlogContentSkeleton />
        </div>
      ) : hasHtmlContent ? (
        <div
          className="blog-content mb-10 sm:mb-12 animate-in fade-in-0 duration-300"
          dangerouslySetInnerHTML={{ __html: cleanedContent }}
        />
      ) : fallbackText ? (
        <div className="blog-content mb-10 sm:mb-12 text-muted-foreground leading-relaxed animate-in fade-in-0 duration-300">
          <p className="text-lg">{fallbackText}</p>
        </div>
      ) : (
        <p className="mb-10 text-sm text-muted-foreground">
          Article summary is not available right now. Please check back soon.
        </p>
      )}

      <aside className="bg-gradient-subtle rounded-2xl p-6 sm:p-10 text-center border border-border/50">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">
          Transform Your HR with OfficeKit
        </h2>
        <p className="text-muted-foreground mb-5 sm:mb-6 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Discover how our AI-powered HRMS helps businesses simplify HR, engage employees,
          and drive growth.
        </p>
        <Link to="/contact">
          <Button size="lg" className="w-full sm:w-auto">
            Get in touch
          </Button>
        </Link>
      </aside>
    </BlogArticleLayout>
  );
}
