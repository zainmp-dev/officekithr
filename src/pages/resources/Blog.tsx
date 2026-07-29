import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, User, ArrowRight, Tag, Search, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES, BLOG_LISTING_POSTS } from "@/data/blog-listing";
import { BLOG_CARD_IMAGE_FALLBACK } from "@/data/blog-images";
import { formatBlogDate } from "@/utils/formatBlogDate";
import {
  BLOG_LISTING_PAGE_SIZE,
  getCachedPosts,
  getCachedPostsPage,
  getPostsPage,
  prefetchAllPosts,
  prefetchPostBySlug,
  prefetchPostsPage,
} from "@/services/blogService";
import { BlogPost } from "@/types";

const PAGE_SIZE = BLOG_LISTING_PAGE_SIZE;

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function mergePosts(apiPosts: BlogPost[], staticPosts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const merged: BlogPost[] = [];

  for (const post of [...sortByDateDesc(apiPosts), ...sortByDateDesc(staticPosts)]) {
    const key = post.slug || post.link;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(post);
  }

  return merged;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

function filterPosts(
  posts: BlogPost[],
  activeCategory: string,
  query: string,
): BlogPost[] {
  const needle = query.toLowerCase();

  return posts.filter((post) => {
    if (activeCategory !== "All Posts" && post.updates !== activeCategory) {
      return false;
    }
    if (!needle) return true;

    const haystack = [post.title, post.excerpt, post.author, post.updates]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchDraft, setSearchDraft] = useState(() => searchParams.get("q") || "");

  const categoryParam = searchParams.get("category") || "";
  const queryParam = (searchParams.get("q") || "").trim();
  const pageParam = Math.max(1, Number(searchParams.get("page") || "1") || 1);

  const activeCategory =
    BLOG_CATEGORIES.find((c) => c.param === categoryParam)?.label ?? "All Posts";
  const useClientFilter = Boolean(queryParam) || activeCategory !== "All Posts";

  const cachedPage = getCachedPostsPage(pageParam, PAGE_SIZE);
  const [pagePosts, setPagePosts] = useState<BlogPost[]>(
    () => cachedPage?.posts ?? [],
  );
  const [apiTotalPages, setApiTotalPages] = useState(
    () => cachedPage?.totalPages || 1,
  );
  const [apiTotalBlogs, setApiTotalBlogs] = useState(
    () => cachedPage?.totalBlogs || 0,
  );
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() =>
    mergePosts(getCachedPosts(), BLOG_LISTING_POSTS),
  );
  const [loading, setLoading] = useState(() => !cachedPage && !useClientFilter);
  const [syncingFilters, setSyncingFilters] = useState(false);

  useEffect(() => {
    setSearchDraft(queryParam);
  }, [queryParam]);

  // Fast path: one API page at a time (limit 10) — no deferred delay, no full crawl.
  useEffect(() => {
    if (useClientFilter) return;

    let cancelled = false;
    const cached = getCachedPostsPage(pageParam, PAGE_SIZE);
    if (cached) {
      setPagePosts(cached.posts);
      setApiTotalPages(cached.totalPages || 1);
      setApiTotalBlogs(cached.totalBlogs || cached.posts.length);
      setLoading(false);
    } else {
      setLoading(true);
    }

    getPostsPage(pageParam, PAGE_SIZE)
      .then((result) => {
        if (cancelled) return;
        setPagePosts(result.posts);
        setApiTotalPages(Math.max(1, result.totalPages || 1));
        setApiTotalBlogs(result.totalBlogs || result.posts.length);
        setAllPosts(mergePosts(getCachedPosts(), BLOG_LISTING_POSTS));
        if (result.currentPage < (result.totalPages || 1)) {
          prefetchPostsPage(result.currentPage + 1, PAGE_SIZE);
        }
        if (result.currentPage > 1) {
          prefetchPostsPage(result.currentPage - 1, PAGE_SIZE);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pageParam, useClientFilter]);

  // Search / category: warm full list in background only when needed.
  useEffect(() => {
    if (!useClientFilter) return;

    let cancelled = false;
    setSyncingFilters(true);

    prefetchAllPosts()
      .then((posts) => {
        if (cancelled) return;
        setAllPosts(mergePosts(posts, BLOG_LISTING_POSTS));
      })
      .finally(() => {
        if (!cancelled) setSyncingFilters(false);
      });

    return () => {
      cancelled = true;
    };
  }, [useClientFilter]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const next = searchDraft.trim();
      if (next === queryParam) return;

      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next) params.set("q", next);
          else params.delete("q");
          params.delete("page");
          return params;
        },
        { replace: true },
      );
    }, 300);

    return () => window.clearTimeout(handle);
  }, [searchDraft, queryParam, setSearchParams]);

  const handlePostHover = (post: BlogPost) => {
    const slug = post.slug || post.link.replace(/^\/blog\//, "");
    if (slug) prefetchPostBySlug(slug);
  };

  const filteredPosts = useMemo(
    () => filterPosts(allPosts, activeCategory, queryParam),
    [activeCategory, allPosts, queryParam],
  );

  const clientTotalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const totalPages = useClientFilter ? clientTotalPages : Math.max(1, apiTotalPages);
  const currentPage = Math.min(pageParam, totalPages);
  const totalCount = useClientFilter ? filteredPosts.length : apiTotalBlogs;

  useEffect(() => {
    if (pageParam === currentPage) return;

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (currentPage <= 1) params.delete("page");
        else params.set("page", String(currentPage));
        return params;
      },
      { replace: true },
    );
  }, [pageParam, currentPage, setSearchParams]);

  const visiblePosts = useMemo(() => {
    if (!useClientFilter) return pagePosts;
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [useClientFilter, pagePosts, filteredPosts, currentPage]);

  const showFeatured =
    currentPage === 1 && !queryParam && activeCategory === "All Posts" && visiblePosts.length > 0;
  const featuredPost = showFeatured ? visiblePosts[0] : undefined;
  const gridPosts = showFeatured ? visiblePosts.slice(1) : visiblePosts;

  const updateParams = (mutate: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    mutate(params);
    setSearchParams(params);
  };

  const setCategory = (param: string) => {
    updateParams((params) => {
      if (param) params.set("category", param);
      else params.delete("category");
      params.delete("page");
    });
  };

  const setPage = (page: number) => {
    updateParams((params) => {
      if (page <= 1) params.delete("page");
      else params.set("page", String(page));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchDraft("");
    updateParams((params) => {
      params.delete("q");
      params.delete("page");
    });
  };

  const isBusy = loading || syncingFilters;
  const hasResults = gridPosts.length > 0 || Boolean(featuredPost);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section
        className="relative pt-40 sm:pt-44 md:pt-48 pb-8 sm:pb-10 overflow-hidden"
        aria-labelledby="blog-hero-heading"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 sm:scale-100"
          style={{ backgroundImage: "url('/RecruitmentManagement2.jpg')" }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/97 via-background/92 to-background/88"
          aria-hidden
        />

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              id="blog-hero-heading"
              className="text-[1.65rem] leading-tight min-[375px]:text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-5 px-1"
            >
              Insights & Updates from the{" "}
              <span className="gradient-text">HR World</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-5 sm:mb-8 max-w-2xl mx-auto px-1 leading-relaxed">
              Stay ahead with the latest trends, tips, and strategies for HR professionals.
            </p>

            <div className="relative max-w-xl mx-auto mb-5 sm:mb-7">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="search"
                value={searchDraft}
                onChange={(e) => setSearchDraft(e.target.value)}
                placeholder="Search articles by title, topic, or author…"
                className="h-11 sm:h-12 rounded-full border-border/80 bg-background/90 pl-10 pr-10 shadow-sm backdrop-blur-sm"
                aria-label="Search blog articles"
              />
              {searchDraft ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="relative -mx-4 sm:mx-0">
              <div className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto pl-5 pr-4 sm:px-0 pb-2 sm:pb-0 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {BLOG_CATEGORIES.map((cat) => (
                  <Button
                    key={cat.label}
                    variant={activeCategory === cat.label ? "default" : "outline"}
                    className="rounded-full text-xs sm:text-sm shrink-0 snap-start whitespace-nowrap h-9 px-3.5 sm:px-4"
                    onClick={() => setCategory(cat.param)}
                  >
                    <span className="sm:hidden">{cat.shortLabel}</span>
                    <span className="hidden sm:inline">{cat.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section className="pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-10">
                <Badge className="bg-white font-normal py-2 text-[#3f5ffc] mb-3 sm:mb-4 border border-[#ededed]">
                  Blogs
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  Featured Article
                </h2>
              </div>

              <Link
                to={featuredPost.link}
                className="block group"
                onMouseEnter={() => handlePostHover(featuredPost)}
                onFocus={() => handlePostHover(featuredPost)}
              >
                <Card className="overflow-hidden border-border shadow-strong transition-shadow group-hover:shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative flex items-center justify-center overflow-hidden bg-muted/40 lg:min-h-[280px]">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="block h-auto w-full object-contain"
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = BLOG_CARD_IMAGE_FALLBACK;
                        }}
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Tag className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate max-w-[10rem] sm:max-w-none">
                            {featuredPost.updates}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          {formatBlogDate(featuredPost.createdAt)}
                        </span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 sm:mb-4 leading-snug">
                        {featuredPost.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <User className="h-3.5 w-3.5 shrink-0" />
                          {featuredPost.author}
                        </div>
                        <Button className="btn-cta w-full sm:w-auto">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                {queryParam ? "Search Results" : "Latest Articles"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {loading && !hasResults
                  ? "Loading articles…"
                  : `${totalCount || visiblePosts.length} article${
                      (totalCount || visiblePosts.length) !== 1 ? "s" : ""
                    }`}
                {!loading || hasResults ? (
                  <>
                    {queryParam ? ` for “${queryParam}”` : ""}
                    {activeCategory !== "All Posts" ? ` in ${activeCategory}` : ""}
                    {totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
                    {isBusy ? " · refreshing…" : ""}
                  </>
                ) : null}
              </p>
            </div>

            {loading && !hasResults ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="aspect-[16/9] animate-pulse bg-muted" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                      <div className="h-5 w-full animate-pulse rounded bg-muted" />
                      <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : hasResults ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {gridPosts.map((post) => (
                    <Link
                      key={post._id}
                      to={post.link}
                      className="block group h-full"
                      onMouseEnter={() => handlePostHover(post)}
                      onFocus={() => handlePostHover(post)}
                    >
                      <Card className="overflow-hidden border-border shadow-medium h-full flex flex-col transition-shadow group-hover:shadow-lg">
                        <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-muted/40">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="block h-auto w-full object-contain"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = BLOG_CARD_IMAGE_FALLBACK;
                            }}
                          />
                        </div>
                        <CardContent className="p-4 sm:p-5 flex flex-col flex-grow min-h-[11.5rem]">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                              <Tag className="h-3 w-3" />
                              {post.updates}
                            </span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2 min-h-[3.25rem] group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60 mt-auto">
                            <span className="truncate">{post.author}</span>
                            <span className="shrink-0 ml-2">
                              {formatBlogDate(post.createdAt)}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination className="mt-10 sm:mt-12">
                    <PaginationContent className="flex-wrap justify-center gap-1">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          aria-disabled={currentPage <= 1}
                          className={
                            currentPage <= 1
                              ? "pointer-events-none opacity-40"
                              : "cursor-pointer"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setPage(currentPage - 1);
                          }}
                        />
                      </PaginationItem>

                      {getPageNumbers(currentPage, totalPages).map((item, index) =>
                        item === "ellipsis" ? (
                          <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={item}>
                            <PaginationLink
                              href="#"
                              isActive={item === currentPage}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(item);
                              }}
                            >
                              {item}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          aria-disabled={currentPage >= totalPages}
                          className={
                            currentPage >= totalPages
                              ? "pointer-events-none opacity-40"
                              : "cursor-pointer"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setPage(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {queryParam
                  ? `No articles found for “${queryParam}”.`
                  : "No articles in this category yet."}
                {queryParam || activeCategory !== "All Posts" ? (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => {
                        setSearchDraft("");
                        setSearchParams({});
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
