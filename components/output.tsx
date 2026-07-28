"use client"
import { useState } from "react"
import { Check, Copy, Code2 } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

const Output = ({code} : {code:string})=>{
    const [copied, setCopied] = useState(false);
    const handleCopy = ()=>{
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(()=> setCopied(false), 2000)
    }
    return(
        <div className="w-full h-full flex flex-col bg-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">Logic_Stream</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="px-6 py-2 rounded-full border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all flex items-center gap-2 group"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Captured
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  Extract Logic
                </>
              )}
            </button>
          </div>

          <ScrollArea className="flex-1 w-full bg-[#020202]">
            {code ? (
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: "transparent",
                  fontSize: "0.8rem",
                  lineHeight: "1.7",
                  padding: "2.5rem",
                  fontFamily: '"JetBrains Mono", monospace'
                }}
              >
                {code}
              </SyntaxHighlighter>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-6 opacity-20 py-40">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-30" />
                  <Code2 className="w-20 h-20 text-emerald-400 relative z-10" />
                </div>
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">Memory Cluster Empty</p>
              </div>
            )}
          </ScrollArea>
        </div>
    )
}
export default Output