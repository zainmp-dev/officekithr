import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BACK_TO_BLOG_PATH = "/resources/blogs";

type BackToBlogProps = {
  className?: string;
};

const BackToBlog = ({ className = "" }: BackToBlogProps) => {
  return (
    <Link
      to={BACK_TO_BLOG_PATH}
      className={[
        "inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3 py-2",
        "text-sm font-medium text-foreground shadow-sm",
        "transition-colors hover:bg-muted/60 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      ].join(" ")}
      aria-label="Back to blog list"
    >
      <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
      Back to Blog
    </Link>
  );
};

export default BackToBlog;
