function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function imagePath(url: string): string {
  try {
    return new URL(url).pathname.toLowerCase();
  } catch {
    return url.split("?")[0].toLowerCase();
  }
}

function imagesMatch(a: string, b: string): boolean {
  const pathA = imagePath(a);
  const pathB = imagePath(b);
  return pathA === pathB || pathA.endsWith(pathB) || pathB.endsWith(pathA);
}

/** Drop hero duplicates already shown in the blog card (title + banner image). */
export function prepareBlogContentHtml(
  html: string,
  opts: { title?: string; featuredImage?: string },
): string {
  let out = html.trim();

  if (opts.title) {
    const titlePattern = new RegExp(
      `^\\s*<h1[^>]*>\\s*${escapeRegExp(opts.title)}\\s*</h1>`,
      "i",
    );
    out = out.replace(titlePattern, "").trim();
  }

  if (opts.featuredImage) {
    const wrappedImg =
      /^(\s*<p>\s*<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/p>)/i;
    const wrapped = out.match(wrappedImg);
    if (wrapped && imagesMatch(wrapped[2], opts.featuredImage)) {
      out = out.slice(wrapped[0].length).trim();
    } else {
      const bareImg = /^(\s*<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>)/i;
      const bare = out.match(bareImg);
      if (bare && imagesMatch(bare[2], opts.featuredImage)) {
        out = out.slice(bare[0].length).trim();
      }
    }
  }

  return out
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/(?:<br\s*\/?>\s*){3,}/gi, "<br /><br />")
    .trim();
}
