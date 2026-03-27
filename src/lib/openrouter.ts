export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ModelOption {
  id: string;
  name: string;
}

// Verified working free endpoints on OpenRouter (as of 2026-03)
// deepseek-chat-v3-0324:free was removed — that snapshot has no free endpoint.
// Use deepseek/deepseek-r1:free or other confirmed free models instead.
export const FREE_MODELS: ModelOption[] = [
  { id: "deepseek/deepseek-r1:free", name: "DeepSeek R1" },
  { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B" },
  { id: "meta-llama/llama-3.3-70b-instruct:free", name: "Llama 3.3 70B" },
  { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B" },
  { id: "microsoft/phi-3-mini-128k-instruct:free", name: "Phi-3 Mini" },
];

// Public free tier: limited daily uses with a shared key
const PUBLIC_KEY = process.env.NEXT_PUBLIC_OPENROUTER_FREE_KEY || "";
const DAILY_LIMIT = 5;
const USAGE_KEY = "uumax-free-usage";

interface UsageRecord {
  date: string;
  count: number;
}

function getUsageToday(): UsageRecord {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (raw) {
      const record: UsageRecord = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (record.date === today) return record;
    }
  } catch {}
  return { date: new Date().toISOString().slice(0, 10), count: 0 };
}

function incrementUsage(): void {
  const record = getUsageToday();
  record.count++;
  localStorage.setItem(USAGE_KEY, JSON.stringify(record));
}

export function getFreeTierRemaining(): number {
  const record = getUsageToday();
  return Math.max(0, DAILY_LIMIT - record.count);
}

/**
 * Get the best available API key.
 * Priority: user's own key > public free tier (with daily limit)
 * Returns { key, isFreeTier } or null if no key available.
 */
export function getApiKey(): { key: string; isFreeTier: boolean } | null {
  const userKey = localStorage.getItem("openrouter-api-key");
  if (userKey) return { key: userKey, isFreeTier: false };

  if (!PUBLIC_KEY) return null;

  const remaining = getFreeTierRemaining();
  if (remaining > 0) return { key: PUBLIC_KEY, isFreeTier: true };

  return null;
}

/**
 * Call after a successful free-tier request to decrement remaining uses.
 */
export function consumeFreeTier(): void {
  incrementUsage();
}

export async function* streamChat(
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: ChatMessage[],
  signal?: AbortSignal
): AsyncGenerator<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://uumax.pages.dev",
      "X-Title": "uumax",
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
    signal,
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "Unknown error");
    if (res.status === 401) throw new Error("INVALID_KEY");
    throw new Error(`OpenRouter API error ${res.status}: ${err}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith("data: ")) continue;
      const data = trimmed.slice(6);
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // skip malformed chunks
      }
    }
  }
}
