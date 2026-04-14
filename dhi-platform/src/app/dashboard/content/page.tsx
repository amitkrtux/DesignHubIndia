"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Rss,
  Link2,
  Calendar,
  FileText,
  Copy,
  Check,
  RefreshCw,
  Wand2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input, Textarea, Select } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

const contentTypes = [
  {
    id: "newsletter",
    label: "Monthly Newsletter",
    icon: <Rss size={18} />,
    description: "Full newsletter draft",
    color: "from-orange-400 to-rose-500",
    bg: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: "linkedin",
    label: "LinkedIn Post",
    icon: <Link2 size={18} />,
    description: "Engaging post",
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-500",
  },
  {
    id: "event_announcement",
    label: "Event Announcement",
    icon: <Calendar size={18} />,
    description: "Event promotion",
    color: "from-violet-400 to-violet-600",
    bg: "bg-violet-50 border-violet-100",
    iconColor: "text-violet-500",
  },
  {
    id: "article",
    label: "Article / Blog",
    icon: <FileText size={18} />,
    description: "Thought leadership",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-500",
  },
]

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "exciting", label: "Exciting & Energetic" },
  { value: "storytelling", label: "Storytelling" },
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual & Friendly" },
]

const exampleTopics: Record<string, string[]> = {
  newsletter: [
    "March 2025 community highlights and events recap",
    "Q1 2025 design community update",
  ],
  linkedin: [
    "Our Design Sprint event changed how we think about collaboration",
    "500 designers, one community, endless possibilities",
  ],
  event_announcement: [
    "Annual Design Showcase 2025 - May 20th, SAP Labs Hyderabad",
    "AI + Design Workshop - April 25th, Online",
  ],
  article: [
    "How design systems are reshaping enterprise UX at SAP",
    "The future of AI-assisted design in enterprise products",
  ],
}

function MarkdownRenderer({ content }: { content: string }) {
  // Simple markdown rendering
  const lines = content.split("\n")
  return (
    <div className="prose-dhi text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={i} className="text-xl font-bold text-neutral-900 mb-3 mt-4 first:mt-0">
              {line.slice(2)}
            </h1>
          )
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="text-base font-bold text-neutral-800 mb-2 mt-4">
              {line.slice(3)}
            </h2>
          )
        }
        if (line.startsWith("### ")) {
          return (
            <h3 key={i} className="text-sm font-bold text-neutral-800 mb-1.5 mt-3">
              {line.slice(4)}
            </h3>
          )
        }
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={i} className="ml-4 text-neutral-700 mb-1 list-disc">
              {line.slice(2)}
            </li>
          )
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-bold text-neutral-800 mb-1">
              {line.slice(2, -2)}
            </p>
          )
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />
        }
        return (
          <p key={i} className="text-neutral-700 mb-1.5">
            {line.replace(/\*\*(.*?)\*\*/g, (_, m) => m).replace(/\*(.*?)\*/g, (_, m) => m)}
          </p>
        )
      })}
    </div>
  )
}

export default function ContentStudioPage() {
  const [selectedType, setSelectedType] = useState("newsletter")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("professional")
  const [additionalContext, setAdditionalContext] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const abortRef = useRef<AbortController | null>(null)

  const selectedTypeInfo = contentTypes.find((t) => t.id === selectedType)!

  async function generateContent() {
    if (!topic.trim()) {
      setError("Please enter a topic or description")
      return
    }
    setError("")
    setGeneratedContent("")
    setIsGenerating(true)

    abortRef.current = new AbortController()

    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: selectedType,
          topic: topic.trim(),
          tone,
          additionalContext: additionalContext.trim(),
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Generation failed")
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No response stream")

      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setGeneratedContent(accumulated)
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "Something went wrong. Please try again.")
      }
    } finally {
      setIsGenerating(false)
    }
  }

  function stopGeneration() {
    abortRef.current?.abort()
    setIsGenerating(false)
  }

  async function copyContent() {
    await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center shadow-sm">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900">AI Content Studio</h1>
            <p className="text-sm text-neutral-500">Powered by Claude</p>
          </div>
          <Badge variant="accent" size="sm">Beta</Badge>
        </div>
        <p className="text-sm text-neutral-500 max-w-xl">
          Generate high-quality, community-specific content for Design Hub India.
          Choose a content type, provide context, and let Claude craft the perfect piece.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-white rounded-3xl border border-black/6 p-6 h-full">
            <h2 className="text-sm font-semibold text-neutral-700 mb-5">Content Settings</h2>

            {/* Content type selector */}
            <div className="mb-5">
              <label className="text-sm font-medium text-neutral-700 block mb-2.5">
                Content Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all duration-150",
                      selectedType === type.id
                        ? `border-transparent bg-gradient-to-br ${type.color} text-white shadow-sm`
                        : "border-neutral-150 hover:border-neutral-200 hover:bg-neutral-50"
                    )}
                  >
                    <span className={cn(selectedType === type.id ? "text-white" : type.iconColor)}>
                      {type.icon}
                    </span>
                    <div>
                      <p className={cn("text-xs font-semibold", selectedType === type.id ? "text-white" : "text-neutral-800")}>
                        {type.label}
                      </p>
                      <p className={cn("text-[10px]", selectedType === type.id ? "text-white/75" : "text-neutral-400")}>
                        {type.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="mb-4">
              <Textarea
                label="Topic / Context"
                placeholder={`e.g., ${exampleTopics[selectedType]?.[0] || "describe what you want to write about"}`}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                error={error}
                rows={3}
              />
              {/* Quick fills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {exampleTopics[selectedType]?.map((example) => (
                  <button
                    key={example}
                    onClick={() => setTopic(example)}
                    className="text-[10px] px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-500 rounded-lg transition-colors truncate max-w-[180px]"
                    title={example}
                  >
                    {example.slice(0, 35)}…
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="mb-4">
              <Select
                label="Tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                options={toneOptions}
              />
            </div>

            {/* Additional context */}
            <div className="mb-6">
              <Input
                label="Additional Context (optional)"
                placeholder="Speaker names, event dates, key highlights..."
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
              />
            </div>

            {/* Generate button */}
            {isGenerating ? (
              <Button
                variant="danger"
                size="lg"
                className="w-full"
                onClick={stopGeneration}
                icon={<RefreshCw size={16} className="animate-spin" />}
              >
                Stop Generating
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={generateContent}
                loading={isGenerating}
                icon={<Wand2 size={16} />}
              >
                Generate Content
              </Button>
            )}

            <p className="text-xs text-neutral-400 text-center mt-3 flex items-center justify-center gap-1">
              <Clock size={10} /> Generating takes 10–20 seconds
            </p>
          </div>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="bg-white rounded-3xl border border-black/6 h-full flex flex-col overflow-hidden">
            {/* Output header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/6">
              <div className="flex items-center gap-2">
                <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br", selectedTypeInfo.color)}>
                  <span className="text-white text-xs">{selectedTypeInfo.icon}</span>
                </div>
                <span className="text-sm font-semibold text-neutral-700">
                  {selectedTypeInfo.label}
                </span>
                {isGenerating && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-violet-500 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-violet-500">Writing…</span>
                  </div>
                )}
              </div>
              {generatedContent && (
                <button
                  onClick={copyContent}
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-neutral-50"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {!generatedContent && !isGenerating ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 flex items-center justify-center mb-4">
                      <Sparkles size={24} className="text-violet-400" />
                    </div>
                    <p className="text-sm font-medium text-neutral-600 mb-1.5">
                      Your content will appear here
                    </p>
                    <p className="text-xs text-neutral-400 max-w-xs">
                      Fill in the details on the left and click "Generate Content" to create
                      AI-powered content for your community.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <MarkdownRenderer content={generatedContent} />
                    {isGenerating && (
                      <span className="inline-block w-0.5 h-4 bg-violet-500 animate-pulse ml-0.5" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Regenerate footer */}
            {generatedContent && !isGenerating && (
              <div className="px-6 py-4 border-t border-black/6 flex items-center justify-between">
                <p className="text-xs text-neutral-400">
                  Content generated with Claude
                </p>
                <button
                  onClick={generateContent}
                  className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700 font-medium"
                >
                  <RefreshCw size={12} /> Regenerate
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100 p-5"
      >
        <div className="flex items-start gap-3">
          <Sparkles size={16} className="text-violet-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-violet-900 mb-1.5">Tips for better content</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                "Include specific event names, dates, and speaker names",
                "Mention the target audience (SAP designers, all employees, etc.)",
                "Add key themes or highlights you want emphasized",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-1.5 text-xs text-violet-700">
                  <span className="text-violet-400 mt-0.5">•</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
