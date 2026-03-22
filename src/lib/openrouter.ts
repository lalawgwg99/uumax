export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ModelOption {
  id: string;
  name: string;
}

export const FREE_MODELS: ModelOption[] = [
  { id: "deepseek/deepseek-chat-v3-0324:free", name: "DeepSeek V3" },
  { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B" },
  { id: "meta-llama/llama-4-maverick:free", name: "Llama 4 Maverick" },
  { id: "qwen/qwen3-235b-a22b:free", name: "Qwen3 235B" },
  { id: "mistralai/mistral-small-3.2-24b-instruct:free", name: "Mistral Small 3.2" },
];

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
