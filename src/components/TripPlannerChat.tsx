"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import CardList from "@/components/cards/CardList";
import ErrorBubbleContent from "@/components/ErrorBubbleContent";
import ThinkingDots from "@/components/ThinkingDots";
import { getMockReply } from "@/lib/mockReply";
import { parseReply } from "@/lib/parseReply";
import type { ChatMessage } from "@/lib/types";

/** The dots stay up at least this long so they never just flicker. */
const MIN_THINKING_MS = 600;

const GREETING: ChatMessage = {
  id: "greeting",
  role: "assistant",
  status: "done",
  text: "Hi! Tell me about your trip and I'll put together a stay, an experience and a place to eat. Try “Plan a weekend in Kyoto for two”.",
};

let nextId = 0;
const newId = () => `m${++nextId}`;

export default function TripPlannerChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const threadEndRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Give focus back to the box once it unlocks.
  useEffect(() => {
    if (!isThinking) inputRef.current?.focus();
  }, [isThinking]);

  /** Shows thinking dots in reply `replyId`, then swaps them for the cards or the friendly bubble. */
  async function fetchReply(request: string, replyId: string) {
    setIsThinking(true); // locks the box, Send and Try again
    try {
      const [body] = await Promise.all([
        getMockReply(request),
        new Promise((r) => setTimeout(r, MIN_THINKING_MS)),
      ]);
      const cards = parseReply(body);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === replyId
            ? { id: replyId, role: "assistant", status: "done", text: "Here's your Kyoto weekend for two, Fri 11 – Sun 13 Apr:", cards }
            : msg,
        ),
      );
    } catch {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === replyId ? { id: replyId, role: "assistant", status: "error", request, retried: false } : msg,
        ),
      );
    } finally {
      setIsThinking(false);
    }
  }

  function send(text: string) {
    const request = text.trim();
    if (!request || isThinking) return;

    const replyId = newId();
    setDraft("");
    setMessages((m) => [
      ...m,
      { id: newId(), role: "user", text: request },
      { id: replyId, role: "assistant", status: "thinking" },
    ]);
    fetchReply(request, replyId);
  }

  /** Try again: the friendly bubble stays in the thread, and a new reply with dots appears under it. */
  function retry(errorId: string, request: string) {
    if (isThinking) return;
    const replyId = newId();
    setMessages((m) => [
      ...m.map((msg) => (msg.id === errorId && msg.role === "assistant" && msg.status === "error" ? { ...msg, retried: true } : msg)),
      { id: replyId, role: "assistant", status: "thinking" },
    ]);
    fetchReply(request, replyId);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(draft);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(draft);
    }
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <header className="shrink-0 border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rausch text-lg font-bold text-white" aria-hidden>
            ✈
          </div>
          <div>
            <h1 className="text-base font-bold text-hof">Trip planner</h1>
            <p className="text-xs text-foggy">Kyoto weekend · prototype with sample data</p>
          </div>
        </div>
      </header>

      {/* Scrolling thread */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <ol className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-6">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <li key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-hof px-4 py-2.5 text-sm text-white">
                  {msg.text}
                </div>
              </li>
            ) : (
              <li key={msg.id} className="flex flex-col items-start gap-1">
                <span className="pl-1 text-xs font-semibold text-foggy">Assistant</span>
                <div
                  data-bubble={msg.status}
                  className={`rounded-2xl rounded-bl-md px-4 py-3 text-sm ${
                    msg.status === "error"
                      ? "border border-gray-200 bg-white text-gray-800"
                      : "bg-bubble text-hof"
                  } ${msg.status === "done" && msg.cards ? "w-full" : "max-w-[80%]"}`}
                >
                  {msg.status === "thinking" && <ThinkingDots />}
                  {/* Polite live region, on the page from the moment the reply starts,
                      so the friendly message is read out when it appears. */}
                  <div aria-live="polite">
                    {msg.status === "error" && (
                      <ErrorBubbleContent
                        onRetry={() => retry(msg.id, msg.request)}
                        disabled={msg.retried || isThinking}
                      />
                    )}
                  </div>
                  {msg.status === "done" && (
                    <>
                      <p>{msg.text}</p>
                      {msg.cards && (
                        <div className="mt-3">
                          <CardList cards={msg.cards} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </li>
            ),
          )}
          <li ref={threadEndRef} aria-hidden className="h-0" />
        </ol>
      </main>

      {/* Message box + send button */}
      <footer className="shrink-0 border-t border-black/10 bg-white">
        <form onSubmit={onSubmit} className="mx-auto flex max-w-2xl items-end gap-2 px-4 py-3">
          <label htmlFor="trip-request" className="sr-only">
            Trip request
          </label>
          <textarea
            id="trip-request"
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isThinking}
            placeholder={isThinking ? "Planning your trip…" : "Plan a weekend in Kyoto for two"}
            className="max-h-32 min-h-11 flex-1 resize-none rounded-full border border-black/20 px-4 py-2.5 text-sm text-hof outline-none placeholder:text-foggy focus:border-hof disabled:cursor-not-allowed disabled:bg-bubble"
          />
          <button
            type="submit"
            disabled={isThinking || draft.trim() === ""}
            className="h-11 shrink-0 rounded-full bg-rausch px-5 text-sm font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
