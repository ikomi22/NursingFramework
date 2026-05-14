"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "What compliance topic would you like to know about today?";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });
    const { content } = await res.json();

    setMessages([...next, { role: "assistant", content }]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 160px)" }}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#212b32]">Compliance Assistant</h1>
        <p className="text-sm text-[#425563] mt-1">
          Ask about NHS nursing competencies, compliance requirements, or training obligations.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded shadow-sm p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#005eb8] text-white"
                  : "bg-[#f0f4f5] text-[#212b32]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#f0f4f5] text-[#768692] rounded px-4 py-3 text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <textarea
          className="flex-1 border border-[#aeb7bd] rounded px-3 py-2 text-sm text-[#212b32] resize-none focus:outline-none focus:border-[#005eb8]"
          rows={2}
          placeholder="Ask about a compliance topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="bg-[#005eb8] text-white font-semibold text-sm px-5 rounded hover:bg-[#003087] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
