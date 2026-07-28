"use client"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { ArrowRight, Wand2, Sparkles, Zap, RotateCcw } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils";
import PromptTemplates from "./ui/prompt-templates"
import FrameworkSelector from "./ui/framework-selector"
import { motion } from "framer-motion"

interface GeneratorPanelProps {
  className?: string;
  onGenerate?: (code: string) => void;
  onGenerating?: () => void;
}

const GeneratorPanel = ({ className, onGenerate, onGenerating }: GeneratorPanelProps) => {
  const [api, setApi] = useState("")
  const [desc, setDesc] = useState("")
  const [framework, setFramework] = useState("React")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!desc.trim() && !api.trim()) return
    setLoading(true)
    onGenerating?.()

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiUrl: api, description: desc, framework })
      })

      const contentType = response.headers.get("Content-Type") || ""
      if (contentType.includes("text/event-stream") || (response.body && !contentType.includes("application/json"))) {
        const reader = response.body?.getReader()
        if (!reader) {
          const data = await response.json()
          if (data.error) { onGenerate?.(`// Error: ${data.error}`); return }
          onGenerate?.(data.code || "// No code generated.")
          return
        }
        const cleanStreamCode = (c: string) => c.replace(/```(?:tsx|jsx|typescript|javascript)?\n?/g, "").replace(/```/g, "").trim()
        const decoder = new TextDecoder()
        let accumulated = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk
          onGenerate?.(cleanStreamCode(accumulated))
        }
      } else {
        const data = await response.json()
        if (data.error) { onGenerate?.(`// Error: ${data.error}`); return }
        onGenerate?.(data.code || "// No code generated.")
      }
    } catch (error) {
      console.error(error)
      onGenerate?.("// Synthesis failed. Please check your network or API key.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-6">
        <div className="group/field relative">
          <label className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-2 block px-1">Enter the API</label>
          <Input 
            placeholder="https://uour_api_url/v1/data" 
            value={api} 
            onChange={(e) => setApi(e.target.value)}
            className="bg-white/[0.03] border-white/5 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-gray-200 h-12 rounded-2xl transition-all font-mono text-xs"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block px-1">Templates</label>
          <PromptTemplates onSelect={setDesc} />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] block px-1">Frameworks</label>
          <FrameworkSelector value={framework} onChange={setFramework} />
        </div>

        <div className="group/field relative">
          <div className="flex items-center justify-between mb-2 px-1">
            <label className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Description</label>
            <span className="text-[10px] font-mono text-gray-600">{desc.length}</span>
          </div>
          <Textarea 
            placeholder="Define the interface geometry and behavioral logic..." 
            className="min-h-[140px] bg-white/[0.03] border-white/5 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-gray-200 rounded-[2rem] p-6 text-sm resize-none leading-relaxed transition-all"
            value={desc} 
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerate}
        disabled={loading || !desc.trim()}
        className="w-full h-16 rounded-[2rem] bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-[0.3em] text-xs transition-all disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
        {loading ? (
          <div className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </div>
        ) : (
          <>
            <Zap className="w-4 h-4 fill-current" />
            <span>Generate</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </motion.button>
    </div>
  )
}

export default GeneratorPanel