/**
 * Build-time SEO assets: sitemap, robots, blog manifest, prerender route list.
 * Run: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { fetchAllPublishedBlogs } from "./lib/flowpilot-blog-api.mjs";
import { loadViteEnv } from "./load-env.mjs";
import { EXTRA_SEO_PATHS } from "./seo-extra-paths.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const SCRIPTS = join(ROOT, "scripts");
const SITE = loadViteEnv(ROOT, "VITE_SITE_URL", "https://www.officekithr.com").replace(
  /\/$/,
  ""
);
const today = new Date().toISOString().split("T")[0];

const STATIC_PATHS = [
  "/",
  "/about-us",
  "/pricing",
  "/contact",
  "/faq",
  "/features/recruitment-management",
  "/features/attendance-and-leave",
  "/features/payroll-and-compliance",
  "/features/performance-appraisal",
  "/features/self-service-portal",
  "/features/exit-management",
  "/features/mobile-app",
  "/features/employee-management",
  "/features/task-and-timesheet",
  "/features/claim-and-reimbursement",
  "/features/loans-and-advance",
  "/features/document-management",
  "/features/leave-management",
  "/features/face-kit",
  "/features/ai-pilot",
  "/resources/blogs",
  "/resources/use-cases",
  "/resources/community",
  "/resources/guides",
  "/privacy-policy",
  "/terms-and-condition",
  "/cookie-policy",
  "/ae",
  "/solutions",
  "/solutions/ai-hr-software-gcc",
  "/solutions/payroll-software-ksa",
  "/solutions/hrms-software-kuwait",
  "/solutions/payroll-software-qatar",
  "/solutions/hrms-software-oman",
  "/solutions/hrms-software-bahrain",
  "/solutions/payroll-software-kerala",
  "/compare",
  "/compare/factohr-alternative",
  "/compare/officenet-alternative",
  "/compare/pockethrms-alternative",
  "/compliance",
  "/gcc-compliance",
  "/compliance/india-payroll-compliance",
  "/compliance/uae-payroll-compliance",
  "/compliance/ksa-payroll-compliance",
  "/compliance/kuwait-payroll-compliance",
  "/compliance/qatar-payroll-compliance",
  "/compliance/oman-payroll-compliance",
  "/compliance/bahrain-payroll-compliance",
  "/hr-software-uae",
  "/payroll-software-uae",
  "/hrms-software-india",
  "/wps-compliance-software",
  "/best-payroll-software-india",
  "/best-hrms-for-construction",
  "/officekit-vs-keka",
  "/officekit-vs-greythr",
  "/officekit-vs-zoho-people",
  "/officekit-vs-darwinbox",
  "/hr-software-dubai",
  "/hr-software-riyadh",
  "/hr-software-kochi",
  "/hr-software-healthcare",
  "/payroll-software-india",
  "/attendance-software-uae",
  "/resources/blogs/hrblogs",
  "/resources/blogs/performance-management-tools",
  "/resources/blogs/streamliningpayroll",
  "/resources/blogs/mobileappupdates",
  "/resources/blogs/navigatehybrid",
  "/resources/blogs/quality-vs-quantity-hiring",
  "/resources/blogs/whyhrms",
  "/resources/blogs/aipowered",
  "/resources/blogs/hrmssystem",
  "/resources/blogs/realworld-dei",
  "/longtail/cloud-hrms-small-business-india",
  "/longtail/best-payroll-software-uae-dubai",
  "/longtail/hr-automation-ai-tools-gcc",
  "/longtail/employee-self-service-portal-india",
  "/longtail/wps-payroll-software-dubai",
  "/longtail/hrms-for-startups-india",
  "/longtail/biometric-attendance-system-uae",
  "/longtail/payroll-outsourcing-vs-software-india",
  "/longtail/gratuity-calculation-software-uae",
  "/longtail/multi-country-payroll-gcc",
  "/longtail/top-hrms-in-india",
  "/longtail/hrms-uae",
  "/longtail/best-hr-software-in-dubai",
  "/longtail/top-hrms-in-gcc",
  "/longtail/best-hrms-in-middle-east",
  "/longtail/hrms-saudi-arabia",
  "/longtail/attendance-software-india",
  "/longtail/best-hrms-for-startups-india",
  "/longtail/employee-management-software-india",
  "/longtail/payroll-software-gcc",
  "/solutions/hrms-software-bangalore",
  "/solutions/hrms-software-chennai",
  "/solutions/hrms-software-hyderabad",
  "/solutions/payroll-software-mumbai",
  "/solutions/hrms-software-delhi-ncr",
  "/compare/bamboohr-alternative",
  "/compare/bayzat-alternative",
  "/compare/zenhr-alternative",
  "/compare/gulfhr-alternative",
  "/industries",
  "/industries/hrms-for-fintech",
  "/industries/hrms-for-retail",
  "/industries/hrms-for-hospitality",
  "/industries/hrms-for-education",
  "/industries/hrms-for-logistics",
  "/industries/hrms-for-bfsi",
  "/customers",
  "/reviews",
  "/tools",
  "/tools/pf-esi-calculator",
  "/tools/gratuity-calculator-uae",
  "/tools/hrms-roi-calculator",
  "/tools/wps-file-checker",
  "/knowledge",
  "/knowledge/officekit-hr",
  "/knowledge/india-gcc-payroll",
  "/knowledge/wps-compliance",
  "/solutions/hrms-software-pune",
  "/solutions/hrms-software-ahmedabad",
  "/solutions/payroll-software-abu-dhabi",
  "/solutions/payroll-software-jeddah",
  "/compare/hrone-alternative",
  "/compare/razorpayx-payroll-alternative",
  "/compare/horilla-alternative",
  "/compare/sumhr-alternative",
  "/industries/hrms-for-manufacturing",
  "/industries/hrms-for-it-services",
  "/industries/hrms-for-healthcare",
  "/industries/hrms-for-real-estate",
];

const PRIORITY = {
  "/": "1.0",
  "/pricing": "0.9",
  "/faq": "0.8",
  "/ae": "0.85",
  "/hrms-software-india": "0.88",
  "/payroll-software-uae": "0.88",
  "/wps-compliance-software": "0.87",
  "/solutions/ai-hr-software-gcc": "0.87",
  "/solutions/payroll-software-ksa": "0.86",
  "/solutions/hrms-software-kuwait": "0.86",
  "/solutions/payroll-software-qatar": "0.86",
  "/solutions/hrms-software-oman": "0.85",
  "/solutions/hrms-software-bahrain": "0.85",
  "/solutions/payroll-software-kerala": "0.86",
  "/compliance": "0.82",
  "/compliance/india-payroll-compliance": "0.85",
  "/compliance/uae-payroll-compliance": "0.85",
  "/compliance/ksa-payroll-compliance": "0.84",
  "/compliance/kuwait-payroll-compliance": "0.84",
  "/compliance/qatar-payroll-compliance": "0.84",
  "/compliance/oman-payroll-compliance": "0.83",
  "/compliance/bahrain-payroll-compliance": "0.83",
  "/gcc-compliance": "0.88",
  "/compare/factohr-alternative": "0.82",
  "/compare/officenet-alternative": "0.80",
  "/compare/pockethrms-alternative": "0.80",
  "/officekit-vs-greythr": "0.86",
  "/officekit-vs-keka": "0.86",
  "/officekit-vs-zoho-people": "0.84",
  "/officekit-vs-darwinbox": "0.82",
  "/hr-software-uae": "0.88",
  "/resources/blogs": "0.8",
  "/solutions/hrms-software-bangalore": "0.84",
  "/solutions/hrms-software-chennai": "0.84",
  "/solutions/hrms-software-hyderabad": "0.84",
  "/solutions/payroll-software-mumbai": "0.84",
  "/solutions/hrms-software-delhi-ncr": "0.84",
  "/compare/bamboohr-alternative": "0.80",
  "/compare/bayzat-alternative": "0.80",
  "/compare/zenhr-alternative": "0.78",
  "/compare/gulfhr-alternative": "0.78",
  "/longtail/top-hrms-in-india": "0.82",
  "/longtail/hrms-uae": "0.82",
  "/longtail/best-hr-software-in-dubai": "0.82",
  "/longtail/top-hrms-in-gcc": "0.82",
  "/longtail/best-hrms-in-middle-east": "0.82",
  "/longtail/hrms-saudi-arabia": "0.82",
  "/longtail/attendance-software-india": "0.82",
  "/longtail/best-hrms-for-startups-india": "0.82",
  "/longtail/employee-management-software-india": "0.82",
  "/longtail/payroll-software-gcc": "0.82",
  "/industries": "0.85",
  "/industries/hrms-for-fintech": "0.83",
  "/industries/hrms-for-retail": "0.82",
  "/industries/hrms-for-hospitality": "0.82",
  "/industries/hrms-for-education": "0.82",
  "/industries/hrms-for-logistics": "0.82",
  "/industries/hrms-for-bfsi": "0.82",
  "/customers": "0.85",
  "/tools": "0.84",
  "/tools/pf-esi-calculator": "0.83",
  "/tools/gratuity-calculator-uae": "0.83",
  "/tools/hrms-roi-calculator": "0.84",
  "/tools/wps-file-checker": "0.83",
  "/knowledge": "0.82",
  "/knowledge/officekit-hr": "0.88",
  "/knowledge/india-gcc-payroll": "0.86",
  "/knowledge/wps-compliance": "0.86",
  "/solutions/hrms-software-pune": "0.84",
  "/solutions/hrms-software-ahmedabad": "0.84",
  "/solutions/payroll-software-abu-dhabi": "0.85",
  "/solutions/payroll-software-jeddah": "0.85",
  "/compare/hrone-alternative": "0.80",
  "/compare/razorpayx-payroll-alternative": "0.80",
  "/compare/horilla-alternative": "0.78",
  "/compare/sumhr-alternative": "0.78",
  "/industries/hrms-for-manufacturing": "0.82",
  "/industries/hrms-for-it-services": "0.82",
  "/industries/hrms-for-healthcare": "0.82",
  "/industries/hrms-for-real-estate": "0.80",
};

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function excerptFrom(html, max = 160) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").trim().slice(0, max);
}

async function fetchDynamicBlogs() {
  try {
    const posts = await fetchAllPublishedBlogs();
    if (!Array.isArray(posts) || posts.length === 0) {
      return { paths: [], manifest: {} };
    }

    const manifest = {};
    const paths = [];

    for (const p of posts) {
      const slug =
        p.slug || (p.title ? slugify(p.title) : null);
      if (!slug) continue;
      const path = `/blog/${slug}`;
      paths.push(path);
      const description =
        p.metaDescription ||
        p.description ||
        p.excerpt ||
        excerptFrom(p.content) ||
        "Expert HR insights from OfficeKit HR.";
      manifest[slug] = {
        slug,
        path,
        title: `${p.title} | OfficeKit HR Blog`,
        headline: p.title,
        description,
        image: p.image || `${SITE}/ImageThumbnail2.png`,
        datePublished:
          p.publishedAt?.split("T")[0] ||
          p.createdAt?.split("T")[0] ||
          p.date,
        author: p.author || "OfficeKit HR Team",
      };
    }

    return { paths, manifest };
  } catch {
    console.warn("[sitemap] Could not fetch dynamic blogs — static URLs only.");
    return { paths: [], manifest: {} };
  }
}

function urlEntry(path, priority = "0.7", changefreq = "monthly") {
  const loc = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const { paths: dynamicPaths, manifest } = await fetchDynamicBlogs();
const allPaths = [...new Set([...STATIC_PATHS, ...EXTRA_SEO_PATHS, ...dynamicPaths])];

/**
 * Prerender route list (separate from sitemap URL count).
 * - PRERENDER_BLOGS=0 → static pages only (~52 routes, ~2 min)
 * - On CI (Cloudflare/GitHub), blogs are skipped unless PRERENDER_BLOGS=1
 */
const onCi = Boolean(process.env.CI || process.env.CF_PAGES);
const prerenderBlogs =
  process.env.PRERENDER_BLOGS === "1" ||
  (process.env.PRERENDER_BLOGS !== "0" && !onCi);
const prerenderPaths = prerenderBlogs ? allPaths : [...STATIC_PATHS];

const urls = allPaths
  .map((path) => {
    const p =
      PRIORITY[path] ??
      (path.startsWith("/blog") || path.includes("/blogs/") ? "0.65" : "0.75");
    const freq = path === "/" || path === "/resources/blogs" ? "weekly" : "monthly";
    return urlEntry(path, p, freq);
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `# IMPORTANT: In Cloudflare Dashboard → Scrape Shield → disable "Managed robots.txt"
# (Managed rules prepend Disallow for GPTBot/ClaudeBot and block AI indexing.)
# Robots.txt — generated ${today}
# IMPORTANT: Disable Cloudflare "Managed robots.txt" in dashboard — it blocks AI crawlers.
# https://www.officekithr.com/llms.txt — LLM-readable site summary
# https://www.officekithr.com/ai-index.txt — AI citation priority URLs

# AI crawlers — explicit allow (must appear before any Disallow for same agent)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: ${SITE}/sitemap.xml
`;

const aiIndex = `# OfficeKit HR — AI Index
# Priority URLs for AI search citation and retrieval
# Last updated: ${today}
# Full summary: ${SITE}/llms.txt
# Full content: ${SITE}/llms-full.txt

## Entity
${SITE}/knowledge/officekit-hr

## Solutions
${SITE}/hrms-software-india
${SITE}/payroll-software-uae
${SITE}/wps-compliance-software
${SITE}/solutions/ai-hr-software-gcc
${SITE}/knowledge/india-gcc-payroll
${SITE}/knowledge/wps-compliance

## Comparisons
${SITE}/officekit-vs-keka
${SITE}/officekit-vs-zoho-people
${SITE}/officekit-vs-greythr
${SITE}/officekit-vs-darwinbox
${SITE}/compare/bayzat-alternative

## Tools
${SITE}/tools/pf-esi-calculator
${SITE}/tools/gratuity-calculator-uae
${SITE}/tools/hrms-roi-calculator
${SITE}/tools/wps-file-checker

## Compliance
${SITE}/gcc-compliance
${SITE}/compliance/india-payroll-compliance
${SITE}/compliance/uae-payroll-compliance
${SITE}/compliance/ksa-payroll-compliance

## Guides
${SITE}/guides
${SITE}/guides/hrms-buyer-guide-india-2026
${SITE}/guides/migrate-from-greythr
${SITE}/guides/wps-compliance-checklist-uae

## Blog (SEO articles)
${SITE}/resources/blogs/wps-compliance-guide-2026
${SITE}/resources/blogs/choose-hrms-india-gcc
${SITE}/resources/blogs/pf-esi-guide-indian-employers

## Conversion
${SITE}/pricing
${SITE}/faq
${SITE}/customers
${SITE}/reviews
${SITE}/contact
`;

writeFileSync(join(PUBLIC, "sitemap.xml"), sitemap, "utf8");
writeFileSync(join(PUBLIC, "robots.txt"), robots, "utf8");
writeFileSync(join(PUBLIC, "ai-index.txt"), aiIndex, "utf8");
writeFileSync(
  join(PUBLIC, "blog-seo-manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf8"
);
writeFileSync(
  join(SCRIPTS, "prerender-routes.json"),
  JSON.stringify(prerenderPaths, null, 2),
  "utf8"
);

console.log(
  `[seo] sitemap: ${allPaths.length} URLs | prerender: ${prerenderPaths.length} routes | blog manifest: ${Object.keys(manifest).length} posts`
);
