import { NextRequest, NextResponse } from "next/server";
import type { Message } from "@/types";
import { buildSystemPrompt } from "@/lib/context";

export async function POST(req: NextRequest) {
  const { messages }: { messages: Message[] } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      provider: { order: ["cerebras"] },
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Upstream LLM request failed" }, { status: 502 });
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content ?? "Sorry, I could not generate a response.";
  return NextResponse.json({ content });
}
