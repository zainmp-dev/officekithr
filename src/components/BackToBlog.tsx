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
        "inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2",
        "rounded-lg border border-primary/25 bg-primary/5 px-3 py-2",
        "text-sm font-semibold text-primary",
        "transition-colors hover:bg-primary/10 hover:border-primary/40",
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
