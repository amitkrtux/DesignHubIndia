import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const PROMPT_TEMPLATES = {
  newsletter: `You are a content writer for Design Hub India, a design community for SAP employees.
Write a professional yet engaging monthly newsletter in markdown format.
The newsletter should:
- Open with an engaging headline and brief intro
- Cover community highlights and upcoming events
- Include a "Featured Work" section
- Add a "Learning Corner" with design tips
- Close with a motivating call to action
- Be warm, professional, and community-focused
Keep it to ~500 words.`,

  linkedin: `You are a content writer for Design Hub India (SAP's design community).
Write an engaging LinkedIn post that:
- Starts with a hook (question or bold statement)
- Shares genuine community insight or achievement
- Uses a storytelling format
- Includes 3-5 relevant hashtags (#DesignThinking #SAP #UXDesign #DesignCommunity)
- Ends with a clear CTA
- Is 150-250 words max
Keep the tone professional but human and inspiring.`,

  event_announcement: `You are a content writer for Design Hub India.
Write a compelling event announcement that:
- Has an attention-grabbing headline
- Clearly states what, when, where, and why
- Highlights key speakers or topics
- Creates excitement and urgency
- Includes clear registration CTA
- Is suitable for both email and social media (150-200 words)`,

  article: `You are a content writer and design thought leader at Design Hub India.
Write a thoughtful, well-structured article that:
- Has a clear thesis and narrative arc
- Mixes practical insights with strategic thinking
- Uses real examples and actionable takeaways
- Speaks to SAP designers but accessible to all
- Follows a clear structure: intro → body (3 sections) → conclusion
Target length: 600-800 words. Use markdown formatting.`,
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { contentType, topic, tone, additionalContext } = body

    if (!contentType || !topic) {
      return NextResponse.json(
        { error: "contentType and topic are required" },
        { status: 400 }
      )
    }

    const systemPrompt =
      PROMPT_TEMPLATES[contentType as keyof typeof PROMPT_TEMPLATES] ||
      PROMPT_TEMPLATES.article

    const userPrompt = `Topic: ${topic}
Tone: ${tone || "professional and engaging"}
${additionalContext ? `Additional context: ${additionalContext}` : ""}

Please generate the content now.`

    const stream = client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      thinking: { type: "adaptive" },
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    })

    // Return as a streaming response
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                new TextEncoder().encode(event.delta.text)
              )
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Content generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    )
  }
}
