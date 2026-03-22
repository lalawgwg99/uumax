"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface GiscusProps {
  slug: string;
}

export function Giscus({ slug }: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    // Clean up previous instance
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "lalawgwg99/uumax");
    script.setAttribute("data-repo-id", "R_kgDORtjQEg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDORtjQEs4C5BKD");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);
  }, [slug, resolvedTheme]);

  return <div ref={ref} className="mt-8" />;
}
