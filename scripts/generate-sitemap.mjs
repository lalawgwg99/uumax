import fs from "fs";
import path from "path";

const SITE_URL = "https://uumax.pages.dev";
const OUT_DIR = path.join(process.cwd(), "out");
const LOCALES = ["en", "zh-TW"];

function getConfigSlugs() {
  const dir = path.join(process.cwd(), "content", "configs");
  const slugs = [];
  for (const sub of fs.readdirSync(dir)) {
    const subDir = path.join(dir, sub);
    if (!fs.statSync(subDir).isDirectory()) continue;
    for (const file of fs.readdirSync(subDir)) {
      if (file.endsWith(".md")) slugs.push(file.replace(".md", ""));
    }
  }
  return slugs;
}

function generateSitemap() {
  const slugs = getConfigSlugs();
  const today = new Date().toISOString().split("T")[0];

  const pages = [];

  for (const locale of LOCALES) {
    pages.push({ url: `/${locale}`, priority: "1.0", changefreq: "weekly" });
    pages.push({ url: `/${locale}/configs`, priority: "0.9", changefreq: "daily" });
    pages.push({ url: `/${locale}/submit`, priority: "0.5", changefreq: "monthly" });
    for (const slug of slugs) {
      pages.push({ url: `/${locale}/configs/${slug}`, priority: "0.8", changefreq: "weekly" });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), xml);

  // Also generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robots);

  console.log(`Generated sitemap.xml (${pages.length} URLs) and robots.txt`);
}

generateSitemap();
