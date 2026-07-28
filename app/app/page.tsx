"use client"
import { useState, useEffect } from "react";
import Output from "@/components/output";
import PreviewPanel from "@/components/preview";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Code2, Eye, Sparkles, Zap, Clock, Trash2, History,
  RotateCcw, Download, Plus, X, ChevronDown, Globe,
  FileJson, AlignLeft, Play, ArrowLeft, Send, Layers, Check, Box, Maximize2, Minimize2
} from "lucide-react";
import { SpiralIntro } from "@/components/ui/spiral-intro";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { SplineSceneBasic } from "@/components/ui/spline-demo";
import { useSidebar } from "@/components/context/sidebar-context";
import { getHistory, deleteHistoryItem, clearHistory, groupHistoryByDate, formatTime, saveToHistory } from "@/lib/history";
import type { HistoryItem } from "@/components/context/sidebar-context";
import { ActiveView } from "@/components/views";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"]
const METHOD_COLORS: Record<string, string> = {
  GET: "text-gray-400", POST: "text-gray-400",
  PUT: "text-gray-400", PATCH: "text-gray-400", DELETE: "text-gray-400",
}
const METHOD_BG: Record<string, string> = {
  GET: "bg-gray-500/10 border-gray-500/20",
  POST: "bg-gray-500/10 border-gray-500/20",
  PUT: "bg-gray-500/10 border-gray-500/20",
  PATCH: "bg-gray-500/10 border-gray-500/20",
  DELETE: "bg-gray-500/10 border-gray-500/20",
}

function BackgroundGlow({ visible }: { visible: boolean }) {
  const mouseX = useMotionValue(-500)
  const mouseY = useMotionValue(-500)

  useEffect(() => {
    if (!visible) return
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250)
      mouseY.set(e.clientY - 250)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [visible, mouseX, mouseY])

  if (!visible) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#0d0d14]" />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[150px] transition-opacity duration-700"
        style={{ background: "radial-gradient(circle, #7c86e1, #2563eb)", left: mouseX, top: mouseY }}
      />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px]" />
    </div>
  )
}

type AppPage = "workbench" | "create-component" | "component-result"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
 const { activeView, setActiveView } = useSidebar()
  const [currentPage, setCurrentPage] = useState<AppPage>("workbench")


  const [method, setMethod] = useState("GET")
  const [apiUrl, setApiUrl] = useState("")
  const [activeConfigTab, setActiveConfigTab] = useState<"params" | "headers" | "body" | "auth">("params")
  const [showMethodDropdown, setShowMethodDropdown] = useState(false)
  const [headers, setHeaders] = useState([{ key: "", value: "", enabled: true }])
  const [params, setParams] = useState([{ key: "", value: "", enabled: true }])
  const [bodyType, setBodyType] = useState<"none" | "form-data" | "raw">("none")
  const [bodyContent, setBodyContent] = useState("")
  const [authType, setAuthType] = useState<"none" | "bearer" | "basic">("none")
  const [authToken, setAuthToken] = useState("")

  const [apiResponse, setApiResponse] = useState("")
  const [apiResponseStatus, setApiResponseStatus] = useState<number | null>(null)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [apiResponseTime, setApiResponseTime] = useState<number | null>(null)
  const [apiResponseSize, setApiResponseSize] = useState<number | null>(null)
  const [activeResponseTab, setActiveResponseTab] = useState<"pretty" | "raw" | "preview">("pretty")
  const [hasResponse, setHasResponse] = useState(false)


  const [description, setDescription] = useState("")
  const [framework, setFramework] = useState("React")
  const [generateCode, setGenerateCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [genCount, setGenCount] = useState(0)
  const [activeOutputTab, setActiveOutputTab] = useState<"preview" | "code">("preview")
  const [refineInput, setRefineInput] = useState("")
  const [isRefining, setIsRefining] = useState(false)
  const [refineError, setRefineError] = useState("")
  const [generateError, setGenerateError] = useState("")
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)

  if (activeView === "history") {
    return (
      <HistoryView
        onLoad={(code) => {
          setGenerateCode(code)
          setActiveView("builder")
          setCurrentPage("component-result")
        }}
      />
    )
  }

  if (activeView !== "builder") {
    return <ActiveView view={activeView} />
  }


  useEffect(() => { setGenCount(getHistory().length) }, [])

  const buildUrl = () => {
    const activeParams = params.filter(p => p.enabled && p.key)
    if (!activeParams.length) return apiUrl
    try {
      const url = new URL(apiUrl)
      activeParams.forEach(p => url.searchParams.set(p.key, p.value))
      return url.toString()
    } catch { return apiUrl }
  }

  const handleTestApi = async () => {
    if (!apiUrl.trim()) return
    setIsApiLoading(true)
    setApiResponse("")
    setApiResponseStatus(null)
    setHasResponse(false)
    const start = Date.now()
    try {
      const activeHeaders = headers.filter(h => h.enabled && h.key)
      const headersObj: Record<string, string> = Object.fromEntries(activeHeaders.map(h => [h.key, h.value]))
      if (authType === "bearer" && authToken) headersObj["Authorization"] = `Bearer ${authToken}`
      if (authType === "basic" && authToken) headersObj["Authorization"] = `Basic ${btoa(authToken)}`
      const options: RequestInit = { method, headers: headersObj }
      if (!["GET", "DELETE"].includes(method) && bodyType === "raw" && bodyContent) {
        options.body = bodyContent
        headersObj["Content-Type"] = "application/json"
      }
      const res = await fetch(buildUrl(), options)
      setApiResponseStatus(res.status)
      setApiResponseTime(Date.now() - start)
      const text = await res.text()
      setApiResponseSize(new Blob([text]).size)
      try {
        const json = JSON.parse(text)
        setApiResponse(JSON.stringify(json, null, 2))
      } catch { setApiResponse(text) }
      setHasResponse(true)
    } catch (err) {
      setApiResponse(err instanceof Error ? err.message : "Request failed")
      setApiResponseStatus(0)
      setApiResponseTime(Date.now() - start)
      setHasResponse(true)
    } finally { setIsApiLoading(false) }
  }

  const cleanStreamCode = (c: string) => c.replace(/```(?:tsx|jsx|typescript|javascript)?\n?/g, "").replace(/```/g, "").trim()

  const handleGenerate = async () => {
    if (!description.trim() && !apiUrl.trim()) return
    setIsGenerating(true)
    setGenerateError("")
    setCurrentPage("component-result")
    setGenerateCode("")
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiUrl: buildUrl(), description, framework }),
      })
      const contentType = res.headers.get("Content-Type") || ""
      if (contentType.includes("text/event-stream") || (res.body && !contentType.includes("application/json"))) {
        const reader = res.body?.getReader()
        if (!reader) {
          const data = await res.json()
          if (data.error) { setGenerateError(data.error); return }
          setGenerateCode(data.code)
          saveToHistory({ code: data.code, description: description || apiUrl, framework, apiEndpoint: apiUrl })
          setGenCount(c => c + 1)
          return
        }
        const decoder = new TextDecoder()
        let accumulated = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk
          setGenerateCode(cleanStreamCode(accumulated))
        }
        const finalCode = cleanStreamCode(accumulated)
        saveToHistory({ code: finalCode, description: description || apiUrl, framework, apiEndpoint: apiUrl })
        setGenCount(c => c + 1)
      } else {
        const data = await res.json()
        if (data.error) { setGenerateError(data.error); return }
        setGenerateCode(data.code)
        setGenCount(c => c + 1)
        saveToHistory({ code: data.code, description: description || apiUrl, framework, apiEndpoint: apiUrl })
      }
    } catch { setGenerateError("Something went wrong.") }
    finally { setIsGenerating(false) }
  }

  const handleRefine = async () => {
    if (!refineInput.trim() || !generateCode) return
    setIsRefining(true)
    setRefineError("")
    const prevCode = generateCode
    setGenerateCode("")
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ existingCode: prevCode, refinement: refineInput }),
      })
      const contentType = res.headers.get("Content-Type") || ""
      if (contentType.includes("text/event-stream") || (res.body && !contentType.includes("application/json"))) {
        const reader = res.body?.getReader()
        if (!reader) {
          const data = await res.json()
          if (data.error) { setRefineError(data.error); setGenerateCode(prevCode); return }
          setGenerateCode(data.code)
          setRefineInput("")
          saveToHistory({ code: data.code, description: `Refined: ${refineInput}`, framework, apiEndpoint: apiUrl })
          setGenCount(c => c + 1)
          return
        }
        const decoder = new TextDecoder()
        let accumulated = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk
          setGenerateCode(cleanStreamCode(accumulated))
        }
        const finalCode = cleanStreamCode(accumulated)
        setRefineInput("")
        saveToHistory({ code: finalCode, description: `Refined: ${refineInput}`, framework, apiEndpoint: apiUrl })
        setGenCount(c => c + 1)
      } else {
        const data = await res.json()
        if (data.error) { setRefineError(data.error); setGenerateCode(prevCode); return }
        setGenerateCode(data.code)
        setRefineInput("")
        saveToHistory({ code: data.code, description: `Refined: ${refineInput}`, framework, apiEndpoint: apiUrl })
        setGenCount(c => c + 1)
      }
    } catch { setRefineError("Something went wrong."); setGenerateCode(prevCode) }
    finally { setIsRefining(false) }
  }

  const addRow = (setter: React.Dispatch<React.SetStateAction<{ key: string; value: string; enabled: boolean }[]>>) =>
    setter(prev => [...prev, { key: "", value: "", enabled: true }])

  const updateRow = (
    setter: React.Dispatch<React.SetStateAction<{ key: string; value: string; enabled: boolean }[]>>,
    index: number, field: "key" | "value" | "enabled", value: string | boolean
  ) => setter(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row))

  const removeRow = (
    setter: React.Dispatch<React.SetStateAction<{ key: string; value: string; enabled: boolean }[]>>,
    index: number
  ) => setter(prev => prev.filter((_, i) => i !== index))


  return (
    <>
      {!introComplete && <SpiralIntro onComplete={() => setIntroComplete(true)} />}
      <div className="min-h-screen bg-[#0d0d14] relative scroll-smooth">
        
        {/* Main Background Glow - Isolated from main component re-renders */}
        <BackgroundGlow visible={currentPage !== "create-component"} />

      
        <div className="relative z-20 border-b border-white/[0.06] bg-[#0d0d14]/80 backdrop-blur-xl sticky top-0">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500 blur-md opacity-40 rounded-lg" />
                  <div className="relative w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-white">Component Builder</span>
              </div>

              <div className="flex items-center gap-1 ml-4">
                <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-lg p-1">
                  <button
                    onClick={() => setCurrentPage("workbench")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      currentPage === "workbench" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    <Globe className="w-3 h-3" /> WORKBENCH
                  </button>
                  {currentPage === "component-result" && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-pink-500/20 text-pink-300 border border-pink-500/30 cursor-pointer"
                       onClick={() => setCurrentPage("component-result")}
      >
         <Layers className="w-3 h-3" />
        <span>Component</span>
                  
                     <button
          onClick={(e) => {
            e.stopPropagation()
            setCurrentPage("workbench")
            setGenerateCode("")
          }}
          className="ml-1 hover:text-red-400 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    )}
                  
                  <button onClick={() => setCurrentPage("create-component")}
                    className="p-1.5 rounded-md text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-all">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                <Zap className="w-3 h-3 text-violet-400" />
                <span className="text-xs text-gray-500">{genCount} generated</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs text-gray-500">{isGenerating ? "Generating..." : "Ready"}</span>
              </div>
            </div>
          </div>
        </div>

     
        {currentPage === "workbench" && (
          <div className="relative z-10 flex h-[calc(100vh-57px)]">

           
            <div className="w-64 flex-shrink-0 border-r border-white/[0.06] bg-[#0a0a10]/50 flex flex-col">
              <div className="p-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Collections</span>
                  <button className="ml-auto p-1 rounded hover:bg-white/5 text-gray-600 hover:text-gray-300 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input placeholder="Search..."
                  className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-1.5 text-xs text-gray-400 placeholder:text-gray-700 focus:outline-none focus:border-white/15 transition-all" />
              </div>
              <div className="flex-1 overflow-y-auto p-2">
               
                <div className="mb-2">
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-xs text-gray-400 transition-all">
                    <ChevronDown className="w-3 h-3" />
                    <span className="font-medium text-gray-300">My APIs</span>
                  </button>
                  <div className="ml-4 space-y-0.5">
                    {[
                      { m: "GET", label: "Dog Gallery" },
                      { m: "GET", label: "User List" },
                      { m: "POST", label: "Create Post" },
                    ].map((item, i) => (
                      <button key={i}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 text-xs transition-all group">
                        <span className={`text-xs font-bold w-10 text-left ${METHOD_COLORS[item.m]}`}>{item.m}</span>
                        <span className="text-gray-500 group-hover:text-gray-300 truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">

             
              <div className="px-5 py-4 border-b border-white/[0.06] bg-[#0d0d14]/40">
                <div className="flex items-center gap-3">
                 
                  <div className="relative">
                    <button onClick={() => setShowMethodDropdown(v => !v)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-bold transition-all hover:opacity-90 ${METHOD_BG[method]} ${METHOD_COLORS[method]}`}>
                      {method} <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>
                    <AnimatePresence>
                      {showMethodDropdown && (
                        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                          className="absolute top-full left-0 mt-1 bg-[#13131f] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[120px]">
                          {HTTP_METHODS.map(m => (
                            <button key={m} onClick={() => { setMethod(m); setShowMethodDropdown(false) }}
                              className={`w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-white/5 transition-all ${METHOD_COLORS[m]}`}>
                              {m}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                 
                  <div className="flex-1 flex items-center gap-2 bg-[#13131f] border border-white/10 rounded-lg px-4 py-2.5 focus-within:border-white/20 transition-all">
                    <input type="text" value={apiUrl} onChange={e => setApiUrl(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleTestApi()}
                      placeholder="Enter API URL or paste text"
                      className="flex-1 bg-transparent text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none font-mono" />
                  </div>

                
                  <button onClick={handleTestApi} disabled={!apiUrl.trim() || isApiLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pink-400 hover:bg-pink-300 text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20">
                    {isApiLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    ) : <Play className="w-4 h-4" />}
                    Get API Preview
                  </button>

              
                  <button onClick={() => setCurrentPage("create-component")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pink-400 hover:bg-pink-300 text-white text-sm font-semibold transition-all shadow-lg shadow-pink-500/20">
                    <span className="relative z-10">Create Component</span>
                  </button>
                </div>
              </div>


              <div className="border-b border-white/[0.06] bg-[#0d0d14]/20">
                <div className="flex items-center px-5">
                  {(["params", "auth", "headers", "body"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveConfigTab(tab)}
                      className={`px-4 py-3 text-xs font-medium capitalize transition-all border-b-2 -mb-px ${
                        activeConfigTab === tab ? "border-slate-400 text-slate-200" : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}>
                      {tab}
                      {tab === "params" && params.filter(p => p.enabled && p.key).length > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-slate-500/20 text-slate-400 text-xs">
                          {params.filter(p => p.enabled && p.key).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">

                <div className="border-b border-white/[0.06] bg-[#0a0a10]/30">
              
                  {activeConfigTab === "params" && (
                    <div className="p-4">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-gray-600 border-b border-white/5">
                            <th className="w-8 pb-2 text-left" />
                            <th className="text-left pb-2 font-medium">Key</th>
                            <th className="text-left pb-2 font-medium px-4">Value</th>
                            <th className="text-left pb-2 font-medium">Description</th>
                            <th className="w-8 pb-2" />
                          </tr>
                        </thead>
                        <tbody>
                          {params.map((row, i) => (
                            <tr key={i} className="group border-b border-white/[0.03]">
                              <td className="py-2 pr-2">
                                <input type="checkbox" checked={row.enabled}
                                  onChange={e => updateRow(setParams, i, "enabled", e.target.checked)}
                                  className="w-3 h-3 accent-slate-500" />
                              </td>
                              <td className="py-2">
                                <input value={row.key} onChange={e => updateRow(setParams, i, "key", e.target.value)}
                                  placeholder="Key"
                                  className="w-full bg-transparent text-gray-300 placeholder:text-gray-700 focus:outline-none font-mono text-xs" />
                              </td>
                              <td className="py-2 px-4">
                                <input value={row.value} onChange={e => updateRow(setParams, i, "value", e.target.value)}
                                  placeholder="Value"
                                  className="w-full bg-transparent text-gray-300 placeholder:text-gray-700 focus:outline-none font-mono text-xs" />
                              </td>
                              <td className="py-2">
                                <input placeholder="Description"
                                  className="w-full bg-transparent text-gray-600 placeholder:text-gray-700 focus:outline-none text-xs" />
                              </td>
                              <td className="py-2">
                                <button onClick={() => removeRow(setParams, i)}
                                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 text-gray-600 transition-all">
                                  <X className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button onClick={() => addRow(setParams)}
                        className="mt-2 flex items-center gap-1.5 text-xs text-gray-600 hover:text-slate-400 transition-colors">
                        <Plus className="w-3 h-3" /> Add Parameter
                      </button>
                    </div>
                  )}

                  
                  {activeConfigTab === "auth" && (
                    <div className="p-4 flex items-start gap-6">
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">Auth Type</p>
                        {(["none", "bearer", "basic"] as const).map(type => (
                          <label key={type} className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                            <input type="radio" name="authType" checked={authType === type}
                              onChange={() => setAuthType(type)} className="w-3 h-3 accent-slate-500" />
                            <span className={authType === type ? "text-slate-300" : ""}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                          </label>
                        ))}
                      </div>
                      {authType !== "none" && (
                        <div className="flex-1">
                          <label className="text-xs text-gray-600 block mb-1.5">
                            {authType === "bearer" ? "Token" : "Credentials (user:pass)"}
                          </label>
                          <input value={authToken} onChange={e => setAuthToken(e.target.value)}
                            placeholder={authType === "bearer" ? "Bearer token..." : "username:password"}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 font-mono focus:outline-none focus:border-slate-500/40 transition-all" />
                        </div>
                      )}
                    </div>
                  )}

                  
                  {activeConfigTab === "headers" && (
                    <div className="p-4">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-gray-600 border-b border-white/5">
                            <th className="w-8 pb-2" /><th className="text-left pb-2 font-medium">Key</th>
                            <th className="text-left pb-2 font-medium px-4">Value</th><th className="w-8 pb-2" />
                          </tr>
                        </thead>
                        <tbody>
                          {headers.map((row, i) => (
                            <tr key={i} className="group border-b border-white/[0.03]">
                              <td className="py-2 pr-2">
                                <input type="checkbox" checked={row.enabled}
                                  onChange={e => updateRow(setHeaders, i, "enabled", e.target.checked)}
                                  className="w-3 h-3 accent-slate-500" />
                              </td>
                              <td className="py-2">
                                <input value={row.key} onChange={e => updateRow(setHeaders, i, "key", e.target.value)}
                                  placeholder="Content-Type"
                                  className="w-full bg-transparent text-gray-300 placeholder:text-gray-700 focus:outline-none font-mono text-xs" />
                              </td>
                              <td className="py-2 px-4">
                                <input value={row.value} onChange={e => updateRow(setHeaders, i, "value", e.target.value)}
                                  placeholder="application/json"
                                  className="w-full bg-transparent text-gray-300 placeholder:text-gray-700 focus:outline-none font-mono text-xs" />
                              </td>
                              <td className="py-2">
                                <button onClick={() => removeRow(setHeaders, i)}
                                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 text-gray-600 transition-all">
                                  <X className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button onClick={() => addRow(setHeaders)}
                        className="mt-2 flex items-center gap-1.5 text-xs text-gray-600 hover:text-slate-400 transition-colors">
                        <Plus className="w-3 h-3" /> Add Header
                      </button>
                    </div>
                  )}


                  {activeConfigTab === "body" && (
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-4">
                        {(["none", "form-data", "raw"] as const).map(type => (
                          <label key={type} className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
                            <input type="radio" name="bodyType" checked={bodyType === type}
                              onChange={() => setBodyType(type)} className="w-3 h-3 accent-slate-500" />
                            <span className={bodyType === type ? "text-slate-300" : ""}>{type}</span>
                          </label>
                        ))}
                      </div>
                      {bodyType === "raw" && (
                        <textarea value={bodyContent} onChange={e => setBodyContent(e.target.value)}
                          placeholder={'{\n  "key": "value"\n}'}
                          className="w-full bg-[#0a0a10] border border-white/8 rounded-lg p-3 text-xs text-gray-300 font-mono focus:outline-none focus:border-slate-500/30 min-h-[100px] resize-none" />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                  {hasResponse ? (
                    <>
                      <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06] bg-[#0a0a10]/50">
                        <div className="flex items-center gap-2">
                          {(["pretty", "raw", "preview"] as const).map(tab => (
                            <button key={tab} onClick={() => setActiveResponseTab(tab)}
                              className={`px-3 py-1.5 text-xs font-medium capitalize rounded-lg transition-all ${
                                activeResponseTab === tab ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                              }`}>
                              {tab}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          {apiResponseStatus !== null && (
                            <span className={`font-mono font-bold px-2 py-1 rounded ${
                              apiResponseStatus >= 200 && apiResponseStatus < 300
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-red-500/15 text-red-400"
                            }`}>
                              {apiResponseStatus >= 200 && apiResponseStatus < 300 ? "✓ " : "✗ "}
                              {apiResponseStatus} {apiResponseStatus === 200 ? "OK" : apiResponseStatus === 201 ? "CREATED" : "ERROR"}
                            </span>
                          )}
                          {apiResponseTime && <span className="text-gray-600">{apiResponseTime}ms</span>}
                          {apiResponseSize !== null && <span className="text-gray-600">{(apiResponseSize / 1024).toFixed(1)} KB</span>}
                        </div>
                      </div>
                      <div className="flex-1 overflow-auto bg-[#080810]">
                        <pre className="p-5 text-xs font-mono leading-relaxed">
                          <code className="text-gray-300">{apiResponse}</code>
                        </pre>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-700">
                      {isApiLoading ? (
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className="w-8 h-8 border-2 border-slate-500/30 border-t-slate-400 rounded-full" />
                          <p className="text-xs text-gray-600">Sending request...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 rounded-2xl bg-white/3 border border-white/8">
                            <Send className="w-8 h-8 text-gray-700" />
                          </div>
                          <p className="text-sm text-gray-600">Click "Get API Preview" to send a request</p>
                          <p className="text-xs text-gray-700">The response will appear here</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === "create-component" && (
          <div className="relative z-10 flex flex-col h-[calc(100vh-57px)] overflow-hidden">
            <div className="flex-1 flex flex-col lg:flex-row divide-x divide-white/[0.06] overflow-hidden">
              {/* LEFT SIDE: CREATION FORM */}
              <div className="flex-1 overflow-y-auto p-12 bg-[#0d0d14]/40 custom-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                  <header className="mb-8">
                    <button onClick={() => setCurrentPage("workbench")}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors mb-6">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Workbench
                    </button>
                    <h2 className="text-3xl font-black text-white tracking-tighter">New Component</h2>
                    <p className="text-sm text-slate-500 mt-2 font-medium">Define your component's vision and target framework.</p>
                  </header>

                  <div className="grid gap-6">
                    {/* Description Card */}
                    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-slate-500/10 border border-slate-500/20 flex items-center justify-center">
                          <AlignLeft className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500">Component Specification</span>
                      </div>
                      <textarea 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        placeholder="e.g., A futuristic login card with glassmorphism and animated borders..."
                        className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-4 text-sm text-gray-200 placeholder:text-slate-700 focus:outline-none focus:border-white/20 transition-all min-h-[180px] resize-none"
                      />
                    </div>

                    {/* Framework Card */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-500/10 border border-slate-500/20 flex items-center justify-center">
                            <Box className="w-4 h-4 text-slate-400" />
                          </div>
                          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500">Target Framework</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {["React", "Next.js", "Vue"].map(f => (
                          <button key={f} onClick={() => setFramework(f)}
                            className={`py-3 rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center gap-2 border ${
                              framework === f
                                ? "bg-white/10 text-white border-white/20 shadow-lg"
                                : "text-slate-600 border-white/5 hover:border-white/10"
                            }`}>
                            <span>{f}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerate}
                      disabled={(!description.trim() && !apiUrl.trim()) || isGenerating}
                      className="w-full py-4 bg-white/10 hover:bg-white/15 disabled:opacity-30 text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl transition-all border border-white/10 shadow-xl group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-400/0 via-white/5 to-slate-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <span className="relative flex items-center justify-center gap-3">
                        {isGenerating ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                        ) : <Sparkles className="w-4 h-4" />}
                        {isGenerating ? "Synthesizing..." : "Start Generation"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: 3D ROBOT ONLY */}
              <div className="flex-1 h-full bg-[#050508] relative overflow-hidden flex flex-col items-center justify-center">
                <SplineSceneBasic />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {currentPage === "component-result" && (
          <div className="relative z-10 flex flex-col h-[calc(100vh-57px)]">

            {/* Result header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-[#0a0a10]/50">
              <div className="flex items-center gap-3">
                <button onClick={() => setCurrentPage("create-component")}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-300 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2">
                  {(["preview", "code"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveOutputTab(tab)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeOutputTab === tab ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"
                      }`}>
                      {tab === "preview" ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isPreviewFullscreen ? "text-emerald-400 bg-emerald-500/10" : "text-gray-600 hover:text-gray-300 hover:bg-white/5"
                  }`}
                  title={isPreviewFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
                >
                  {isPreviewFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <div className="w-px h-4 bg-white/10" />
               
                  {isGenerating && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                      <div
                        className="w-3 h-3 border border-violet-400/30 border-t-violet-400 rounded-full" />
                      {isRefining ? "Refining..." : "Generating..."}
                    </motion.div>
                  )}
                
                {generateCode && !isGenerating && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Generated
                  </div>
                )}
                <button onClick={() => { setGenerateCode(""); setCurrentPage("create-component") }}
                  className="p-1.5 rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-all" title="Clear">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => {
                  const blob = new Blob([generateCode], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url; a.download = "component.tsx"; a.click()
                }} className="p-1.5 rounded-lg text-gray-600 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all" title="Download">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Result content */}
            <div className="flex-1 overflow-hidden relative">
              {activeOutputTab === "preview" && (
                <ScrollArea className="h-full">
                  <div className={`flex flex-col min-h-full ${isPreviewFullscreen ? 'fixed inset-0 z-50 bg-[#0d0d14] overflow-auto' : 'p-4 gap-6'}`}>
                    {isGenerating ? (
                      <div className="w-full">
                        <GeneratingSkeleton />
                      </div>
                    ) : generateCode ? (
                      <div className="w-full">
                        <PreviewPanel code={generateCode} />
                      </div>
                    ) : (
                      <div className="w-full">
                        <EmptyState icon={<Eye className="w-8 h-8" />} message="No component yet" hint="Go back and generate one" />
                      </div>
                    )}

                    {/* Refine panel - appearing after preview */}
                    {generateCode && !isGenerating && !isPreviewFullscreen && (
                      <div className="w-full border-t border-white/5 pt-6">
                        <div className="max-w-4xl mx-auto w-full rounded-2xl border border-white/10 bg-white/3 p-4 flex flex-col gap-3 shadow-2xl">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-violet-500/20 border border-violet-500/30">
                              <Sparkles className="w-3 h-3 text-violet-400" />
                            </div>
                            <span className="text-xs font-medium text-gray-400">Refine with AI</span>
                            <span className="text-xs text-gray-700 ml-auto">⌘+Enter</span>
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={refineInput} 
                              onChange={e => setRefineInput(e.target.value)}
                              onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleRefine() }}
                              placeholder='"make it dark" or "add search bar" or "add animations"'
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-all" 
                            />
                            <button 
                              onClick={handleRefine} 
                              disabled={!refineInput.trim() || isRefining}
                              className="relative px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40 overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600" />
                              <span className="relative flex items-center gap-2">
                                {isRefining ? (
                                  <motion.div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full" />
                                ) : (
                                  <Sparkles className="w-3.5 h-3.5" />
                                )}
                                {isRefining ? "Refining..." : "Refine"}
                              </span>
                            </button>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {["Make it dark", "Add loading state", "Add search bar", "Make it responsive", "Add animations"].map(s => (
                              <button 
                                key={s} 
                                onClick={() => setRefineInput(s)}
                                className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20 hover:bg-white/5 transition-all"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          <AnimatePresence>
                            {refineError && (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                              >
                                {refineError}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}

              {activeOutputTab === "code" && (
                <div className="flex-1 p-4 overflow-auto">
                  {generateCode
                    ? <Output code={generateCode} />
                    : <EmptyState icon={<Code2 className="w-8 h-8" />} message="No code yet" hint="Generate a component first" />
                  }
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  )
}

function GeneratingSkeleton() {
  return (
    <div className="h-full min-h-[460px] p-2 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        {[0,1,2].map(i => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/5" />
        ))}
        <div className="h-2 w-48 rounded bg-white/5 ml-2" />
      </div>
      {[100, 80, 90, 60, 75, 85, 50, 70].map((w, i) => (
        <div
          key={i}
          className="h-3 rounded-full bg-white/10 animate-pulse"
          style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
        />
      ))}
      <div className="mt-6 space-y-2">
        {[60, 90, 70].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-xl bg-white/10 animate-pulse"
            style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 pt-8 text-gray-600 animate-pulse">
        <Sparkles className="w-4 h-4 text-violet-500" />
        <span className="text-sm">AI is generating your component...</span>
      </div>
    </div>
  )
}

function HistoryView({ onLoad }: { onLoad: (code: string) => void }) {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [selected, setSelected] = useState<HistoryItem | null>(null)
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

  useEffect(() => { setItems(getHistory()) }, [])
  const { today, yesterday, older } = groupHistoryByDate(items)

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); deleteHistoryItem(id); setItems(getHistory())
    if (selected?.id === id) setSelected(null)
  }
  const handleClearAll = () => { clearHistory(); setItems([]); setSelected(null) }

  const processCode = (code: string) => code
    .replace(/^import\s+.*$/gm, "").replace(/export\s+default\s+function\s+/g, "function ")
    .replace(/export\s+default\s+/g, "// ").replace(/export\s+/g, "")

  const detectComponentName = (code: string) => {
    const m = code.match(/export\s+default\s+(?:function\s+)?([A-Z][a-zA-Z0-9]*)/)
      || code.match(/(?:const|function)\s+([A-Z][a-zA-Z0-9]*)\s*[=(]/)
    return m?.[1] || "App"
  }

  const getHtml = (code: string) => `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body{margin:0;font-family:sans-serif;}*{box-sizing:border-box;}</style>
</head><body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    var useState=React.useState,useEffect=React.useEffect,useCallback=React.useCallback,useMemo=React.useMemo,useRef=React.useRef;
    try{
      ${processCode(code)}
      const C=typeof ${detectComponentName(code)}!=='undefined'?${detectComponentName(code)}:()=><div>Component loaded</div>;
      ReactDOM.createRoot(document.getElementById('root')).render(<C/>);
    }catch(e){document.getElementById('root').innerHTML='<div style="color:#ef4444;padding:16px;font-size:12px;">'+e.message+'</div>';}
  </script>
</body></html>`

  const HistoryGroup = ({ title, groupItems }: { title: string; groupItems: HistoryItem[] }) => {
    if (!groupItems.length) return null
    return (
      <div className="mb-4">
        <p className="text-xs text-gray-600 uppercase tracking-wider font-medium mb-2 px-1">{title}</p>
        <div className="space-y-1.5">
          {groupItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }} onClick={() => { setSelected(item); setActiveTab("preview") }}
              className={`p-3 rounded-xl border transition-all group cursor-pointer ${
                selected?.id === item.id ? "bg-cyan-500/10 border-cyan-500/30" : "border-white/5 hover:bg-white/5 hover:border-white/10"
              }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-gray-300">{item.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-600">{item.framework}</span>
                    <span className="text-xs text-gray-700">·</span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />{formatTime(item.timestamp)}
                    </span>
                  </div>
                </div>
                <button onClick={e => handleDelete(item.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 hover:text-red-400 transition-all text-gray-600">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <History className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-sm font-medium text-white">Generation History</span>
          {items.length > 0 && (
            <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{items.length} items</span>
          )}
        </div>
        {items.length > 0 && (
          <button onClick={handleClearAll} className="text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>
      <div className="relative z-10 flex flex-1 overflow-hidden px-6 py-6 gap-6">
        <div className="w-72 flex-shrink-0 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-700"><History className="w-8 h-8" /></div>
              <p className="text-sm text-gray-600 text-center">No history yet.</p>
            </div>
          ) : (
            <><HistoryGroup title="Today" groupItems={today} /><HistoryGroup title="Yesterday" groupItems={yesterday} /><HistoryGroup title="Older" groupItems={older} /></>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col rounded-2xl border border-white/10 overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          {selected ? (
            <>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/20">
                {(["preview", "code"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${activeTab === tab ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}>
                    {tab === "preview" ? <Eye className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
                <button onClick={() => onLoad(selected.code)}
                  className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30 transition-all">
                  <Zap className="w-3 h-3" /> Load in Builder
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={selected.id + activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 overflow-hidden">
                  {activeTab === "preview"
                    ? <iframe key={selected.id} srcDoc={getHtml(selected.code)} className="w-full h-full border-none min-h-[500px]" sandbox="allow-scripts allow-same-origin" />
                    : <pre className="h-full overflow-auto p-5 text-xs text-gray-300 font-mono leading-relaxed bg-black/30 min-h-[500px]"><code>{selected.code}</code></pre>
                  }
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[500px]">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-700"><Eye className="w-8 h-8" /></div>
              <p className="text-sm text-gray-600">Select a history item to preview it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
function EmptyState({ icon, message, hint }: { icon: React.ReactNode; message: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[460px] gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
        <div className="relative p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-600">{icon}</div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-400">{message}</p>
        {hint && <p className="text-xs text-gray-600 mt-1">{hint}</p>}
      </div>
    </div>
  )
}

