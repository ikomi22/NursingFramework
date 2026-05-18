"use client";

import { useState, useRef, useEffect } from "react";
import type { Message } from "@/types";
import { sendChatMessage } from "@/lib/api";

const GREETING = "Hello! I'm your NHS Compliance Assistant. What competency or compliance topic would you like to explore today?";

const SUGGESTIONS = [
  "What are mandatory annual competencies?",
  "Explain the NEWS2 escalation process",
  "What is ANTT and when is it required?",
  "How often must BLS be renewed?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    const next: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const content = await sendChatMessage(next);
      setMessages([...next, { role: "assistant", content }]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const isFirstMessage = messages.length === 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", maxHeight: 800 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212b32", margin: 0 }}>Compliance Assistant</h1>
        <p style={{ fontSize: 13, color: "#768692", marginTop: 4 }}>
          Ask about NHS nursing competencies, compliance requirements, or training obligations.
        </p>
      </div>

      <div
        className="card"
        style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className="animate-fade-in"
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            {msg.role === "assistant" && (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#005eb8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                AI
              </div>
            )}
            <div
              style={{
                maxWidth: "72%",
                padding: "12px 16px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                fontSize: 14,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                background: msg.role === "user" ? "#005eb8" : "#f4f6f9",
                color: msg.role === "user" ? "white" : "#212b32",
                border: msg.role === "assistant" ? "1px solid #eaecef" : "none",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#005eb8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 12,
                fontWeight: 700,
                color: "white",
              }}
            >
              AI
            </div>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "18px 18px 18px 4px",
                background: "#f4f6f9",
                border: "1px solid #eaecef",
                display: "flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              background: "#fde8e6",
              color: "#c0241a",
              fontSize: 13,
              border: "1px solid #f5c6c2",
            }}
          >
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {isFirstMessage && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              style={{
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 20,
                border: "1px solid #c9d6e3",
                background: "white",
                color: "#005eb8",
                cursor: "pointer",
                fontWeight: 500,
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#eef4fb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "white";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          background: "white",
          border: "1px solid #eaecef",
          borderRadius: 12,
          padding: "8px 8px 8px 16px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        <textarea
          ref={textareaRef}
          rows={2}
          placeholder="Ask about a compliance topic… (Enter to send, Shift+Enter for new line)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: 14,
            color: "#212b32",
            resize: "none",
            background: "transparent",
            lineHeight: 1.5,
          }}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "#e0e7ef" : "#005eb8",
            color: loading || !input.trim() ? "#768692" : "white",
            border: "none",
            borderRadius: 8,
            padding: "0 18px",
            height: 40,
            fontWeight: 600,
            fontSize: 13,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            transition: "background 0.15s",
            flexShrink: 0,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
