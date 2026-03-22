import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "configs");
const OUT_DIR = path.join(process.cwd(), "public", "og");

const FRAMEWORK_COLORS = {
  "claude-code": "#6366f1",
  cursor: "#22c55e",
  openclaw: "#f59e0b",
  windsurf: "#3b82f6",
  generic: "#8b5cf6",
};

function generateOgSvg(title, description, framework, tags) {
  const color = FRAMEWORK_COLORS[framework] || "#6366f1";
  const truncTitle = title.length > 40 ? title.slice(0, 37) + "..." : title;
  const truncDesc =
    description.length > 80 ? description.slice(0, 77) + "..." : description;
  const tagStr = tags.slice(0, 4).join("  ·  ");

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0d11"/>
  <rect x="0" y="0" width="1200" height="6" fill="${color}"/>
  <text x="80" y="120" font-family="system-ui, sans-serif" font-size="24" fill="#9ca3af">uumax · AI Agent Config Marketplace</text>
  <text x="80" y="260" font-family="system-ui, sans-serif" font-size="56" font-weight="bold" fill="#f3f4f6">${escapeXml(truncTitle)}</text>
  <text x="80" y="340" font-family="system-ui, sans-serif" font-size="28" fill="#9ca3af">${escapeXml(truncDesc)}</text>
  <rect x="80" y="400" width="140" height="40" rx="8" fill="${color}" opacity="0.2"/>
  <text x="150" y="427" font-family="system-ui, sans-serif" font-size="20" fill="${color}" text-anchor="middle">${escapeXml(framework)}</text>
  <text x="80" y="520" font-family="system-ui, monospace" font-size="20" fill="#6b7280">${escapeXml(tagStr)}</text>
  <text x="1120" y="580" font-family="system-ui, sans-serif" font-size="20" fill="#4b5563" text-anchor="end">uumax.pages.dev</text>
</svg>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getConfigs() {
  const configs = [];
  for (const sub of fs.readdirSync(CONTENT_DIR)) {
    const subDir = path.join(CONTENT_DIR, sub);
    if (!fs.statSync(subDir).isDirectory()) continue;
    for (const file of fs.readdirSync(subDir)) {
      if (!file.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(subDir, file), "utf-8");
      const { data } = matter(raw);
      configs.push({ slug: file.replace(".md", ""), ...data });
    }
  }
  return configs;
}

// Generate
fs.mkdirSync(OUT_DIR, { recursive: true });

const configs = getConfigs();
for (const c of configs) {
  const svg = generateOgSvg(
    c.title || c.slug,
    c.description || "",
    c.framework || "generic",
    c.tags || []
  );
  fs.writeFileSync(path.join(OUT_DIR, `${c.slug}.svg`), svg);
}

// Default OG image
const defaultSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0d11"/>
  <rect x="0" y="0" width="1200" height="6" fill="#6366f1"/>
  <text x="600" y="260" font-family="system-ui, sans-serif" font-size="72" font-weight="bold" fill="#f3f4f6" text-anchor="middle">uumax</text>
  <text x="600" y="340" font-family="system-ui, sans-serif" font-size="32" fill="#9ca3af" text-anchor="middle">AI Agent Config Marketplace</text>
  <text x="600" y="420" font-family="system-ui, sans-serif" font-size="24" fill="#6b7280" text-anchor="middle">Discover · Share · Sell production-ready AI configs</text>
</svg>`;
fs.writeFileSync(path.join(OUT_DIR, "default.svg"), defaultSvg);

console.log(`Generated ${configs.length + 1} OG images`);
