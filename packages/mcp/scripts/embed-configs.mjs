import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "..", "..", "content", "configs");
const OUT_FILE = path.join(process.cwd(), "src", "data", "configs.json");

function getFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getFilesRecursive(full));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

const files = getFilesRecursive(CONTENT_DIR);
const configs = files.map((filePath) => {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".md");
  return { slug, ...data, content };
});

const output = {
  configs,
  generatedAt: new Date().toISOString(),
  count: configs.length,
};

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2));
console.log(`Embedded ${configs.length} configs into configs.json`);
