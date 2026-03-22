"use client";

import { useState, useCallback } from "react";
import {
  FREE_MODELS,
  streamChat,
  getApiKey,
  consumeFreeTier,
  getFreeTierRemaining,
} from "./openrouter";
import type { ChatMessage } from "./openrouter";

interface UseAIOptions {
  systemPrompt: string;
  onNeedApiKey?: () => void;
}

export function useAI({ systemPrompt, onNeedApiKey }: UseAIOptions) {
  const [result, setResult] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (messages: ChatMessage[]) => {
      const auth = getApiKey();
      if (!auth) {
        if (onNeedApiKey) onNeedApiKey();
        else setError("NO_KEY");
        return null;
      }

      setIsStreaming(true);
      setError(null);
      setResult("");

      try {
        const model =
          localStorage.getItem("openrouter-model") || FREE_MODELS[0].id;
        const stream = streamChat(
          auth.key,
          model,
          systemPrompt,
          messages
        );
        let full = "";
        for await (const chunk of stream) {
          full += chunk;
          setResult(full);
        }

        if (auth.isFreeTier) consumeFreeTier();
        return full;
      } catch (e: unknown) {
        if (e instanceof Error && e.message === "INVALID_KEY") {
          localStorage.removeItem("openrouter-api-key");
          setError("INVALID_KEY");
        } else {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
        return null;
      } finally {
        setIsStreaming(false);
      }
    },
    [systemPrompt, onNeedApiKey]
  );

  return { result, setResult, isStreaming, error, setError, run, getFreeTierRemaining };
}
