import { getAllConfigs } from "@/lib/configs";
import { ConfigsClient } from "./ConfigsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Configs",
  description:
    "Browse production-ready AI agent configurations for Claude Code, Cursor, OpenClaw, and Windsurf.",
};

export default function ConfigsPage() {
  const configs = getAllConfigs();

  return <ConfigsClient configs={configs} />;
}
