import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type BlogActionsProps = {
  title?: string;
  url?: string;
  className?: string;
  contactHref?: string;
  variant?: "default" | "subtle";
};

import { safeLocalGet, safeLocalSet } from "@/lib/safe-storage";

const BOOKMARKS_KEY = "ok_blog_bookmarks";

const readBookmarks = () => {
  try {
    const stored = safeLocalGet(BOOKMARKS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeBookmarks = (items: unknown[]) => {
  safeLocalSet(BOOKMARKS_KEY, JSON.stringify(items));
};

const BlogActions = ({
  title,
  url,
  className = "",
  contactHref = "/contact",
  variant = "default",
}: BlogActionsProps) => {
  const isSubtle = variant === "subtle";
  const buttonVariant = isSubtle ? "ghost" : "outline";
  const buttonClass = isSubtle
    ? "h-8 px-2.5 text-muted-foreground hover:text-foreground"
    : undefined;
  const currentUrl = useMemo(() => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  }, [url]);

  const shareTitle =
    title || (typeof document !== "undefined" ? document.title : "Blog");

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const items = readBookmarks();
    setIsSaved(items.some((item: Record<string, unknown>) => item?.url === currentUrl));
  }, [currentUrl]);

  const handleShare = async () => {
    if (!currentUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url: currentUrl });
        toast({ title: "Shared successfully" });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        toast({ title: "Link copied to clipboard" });
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.value = currentUrl;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast({ title: "Link copied to clipboard" });
    } catch {
      toast({ title: "Share failed", variant: "destructive" });
    }
  };

  const handleSave = () => {
    if (!currentUrl) return;
    const items = readBookmarks();
    const existing = items.some((item: Record<string, unknown>) => item?.url === currentUrl);

    if (existing) {
      const updated = items.filter((item: Record<string, unknown>) => item?.url !== currentUrl);
      writeBookmarks(updated);
      setIsSaved(false);
      toast({ title: "Removed from bookmarks" });
      return;
    }

    const updated = [
      ...items,
      {
        title: shareTitle,
        url: currentUrl,
        savedAt: new Date().toISOString(),
      },
    ];
    writeBookmarks(updated);
    setIsSaved(true);
    toast({ title: "Saved to bookmarks" });
  };

  return (
    <div
      className={[
        "flex flex-wrap items-center gap-1",
        isSubtle ? "border-y border-border/50 py-2" : "gap-2",
        className,
      ].join(" ")}
    >
      <Button
        variant={buttonVariant}
        size="sm"
        className={buttonClass}
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4 mr-1.5" />
        Share
      </Button>
      <Button
        variant={buttonVariant}
        size="sm"
        className={buttonClass}
        onClick={handleSave}
      >
        <BookmarkPlus className="h-4 w-4 mr-1.5" />
        {isSaved ? "Saved" : "Save"}
      </Button>
      <Link to={contactHref} className={isSubtle ? "ml-auto" : undefined}>
        <Button variant={buttonVariant} size="sm" className={buttonClass}>
          Contact Us
        </Button>
      </Link>
    </div>
  );
};

export default BlogActions;
