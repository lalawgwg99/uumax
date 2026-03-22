import { codeToHtml } from "shiki";

interface ConfigContentProps {
  content: string;
}

export async function ConfigContent({ content }: ConfigContentProps) {
  const html = await markdownToHtml(content);
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

async function markdownToHtml(md: string): Promise<string> {
  let html = md;

  // Highlight code blocks with shiki
  const codeBlocks: { placeholder: string; html: string }[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  let index = 0;

  while ((match = codeBlockRegex.exec(md)) !== null) {
    const lang = match[1] || "text";
    const code = match[2].trimEnd();
    const placeholder = `__CODE_BLOCK_${index}__`;

    let highlighted: string;
    try {
      highlighted = await codeToHtml(code, {
        lang,
        themes: { light: "github-light", dark: "github-dark" },
      });
    } catch {
      // Fallback for unsupported languages
      highlighted = `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
    }

    codeBlocks.push({ placeholder, html: highlighted });
    html = html.replace(match[0], placeholder);
    index++;
  }

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Paragraphs
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<li") ||
        trimmed.startsWith("__CODE_BLOCK_")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  // Restore code blocks
  for (const block of codeBlocks) {
    html = html.replace(block.placeholder, block.html);
  }

  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
