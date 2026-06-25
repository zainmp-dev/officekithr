import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES, BLOG_LISTING_POSTS } from "@/data/blog-listing";
import { BLOG_CARD_IMAGE_FALLBACK } from "@/data/blog-images";
import { formatBlogDate } from "@/utils/formatBlogDate";
import { getAllPosts } from "@/services/blogService";
import { BlogPost } from "@/types";

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function mergePosts(apiPosts: BlogPost[], staticPosts: BlogPost[]): BlogPost[] {
  const seen = new Set<string>();
  const merged: BlogPost[] = [];

  // API blogs first (newest within each group), then static/legacy posts
  for (const post of [...sortByDateDesc(apiPosts), ...sortByDateDesc(staticPosts)]) {
    const key = post.slug || post.link;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(post);
  }

  return merged;
}

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apiPosts, setApiPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllPosts()
      .then((posts) => {
        if (!cancelled) setApiPosts(posts);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allPosts = useMemo(
    () => mergePosts(apiPosts, BLOG_LISTING_POSTS),
    [apiPosts],
  );

  const categoryParam = searchParams.get("category") || "";
  const activeCategory =
    BLOG_CATEGORIES.find((c) => c.param === categoryParam)?.label ?? "All Posts";

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All Posts") return allPosts;
    return allPosts.filter((post) => post.updates === activeCategory);
  }, [activeCategory, allPosts]);

  const featuredPost = filteredPosts[0];
  const latestPosts = filteredPosts.slice(1);

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

            <div className="relative -mx-4 sm:mx-0">
              <div className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto pl-5 pr-4 sm:px-0 pb-2 sm:pb-0 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {BLOG_CATEGORIES.map((cat) => (
                  <Button
                    key={cat.label}
                    variant={activeCategory === cat.label ? "default" : "outline"}
                    className="rounded-full text-xs sm:text-sm shrink-0 snap-start whitespace-nowrap h-9 px-3.5 sm:px-4"
                    onClick={() => {
                      if (cat.param) {
                        setSearchParams({ category: cat.param });
                      } else {
                        setSearchParams({});
                      }
                    }}
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
        <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <Badge className="bg-white font-normal py-2 text-[#3f5ffc] mb-3 sm:mb-4 border border-[#ededed]">
                  Blogs
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  Featured Article
                </h2>
              </div>

              <Link to={featuredPost.link} className="block group">
                <Card className="overflow-hidden border-border shadow-strong transition-shadow group-hover:shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
                          <span className="truncate max-w-[10rem] sm:max-w-none">{featuredPost.updates}</span>
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
                Latest Articles
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {loading ? "Loading articles…" : (
                  <>
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                    {activeCategory !== "All Posts" ? ` in ${activeCategory}` : ""}
                  </>
                )}
              </p>
            </div>

            {loading && filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading articles…
              </div>
            ) : latestPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {latestPosts.map((post) => (
                  <Link key={post._id} to={post.link} className="block group h-full">
                    <Card className="overflow-hidden border-border shadow-medium h-full flex flex-col transition-shadow group-hover:shadow-lg">
                      <div className="relative overflow-hidden aspect-[16/10]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = BLOG_CARD_IMAGE_FALLBACK;
                          }}
                        />
                      </div>
                      <CardContent className="p-4 sm:p-5 flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
                            <Tag className="h-3 w-3" />
                            {post.updates}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60">
                          <span className="truncate">{post.author}</span>
                          <span className="shrink-0 ml-2">{formatBlogDate(post.createdAt)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No articles in this category yet.
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
