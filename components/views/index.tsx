"use client"
import { ViewType } from "../context/sidebar-context"
import { FolderOpen, Globe, Code2, Settings, Plus, Trash2, Check, Copy, ExternalLink, Key, Sparkles, Layers, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { clearHistory } from "@/lib/history"

// ==================== Collections View ====================
function CollectionsView() {
  const [collections, setCollections] = useState([
    { id: "1", name: "Dashboard UI Components", count: 12, description: "Admin charts, stats tables, and sidebar menus" },
    { id: "2", name: "Authentication Pages", count: 5, description: "Modern sign-in, sign-up, and OTP verification modals" },
    { id: "3", name: "Landing Page Heroes", count: 8, description: "Animated 3D heroes, glowing backgrounds, and CTA sections" },
    { id: "4", name: "E-Commerce Widgets", count: 6, description: "Product cards, shopping cart drawers, and checkout steps" },
  ])
  const [newColName, setNewColName] = useState("")
  const [newColDesc, setNewColDesc] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newColName.trim()) return
    setCollections([{
      id: crypto.randomUUID(),
      name: newColName,
      count: 0,
      description: newColDesc || "Custom component collection"
    }, ...collections])
    setNewColName("")
    setNewColDesc("")
    setShowAddModal(false)
  }

  const handleDelete = (id: string) => {
    setCollections(collections.filter(c => c.id !== id))
  }

  const filtered = collections.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0d0d14] p-8 text-white relative">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400">
                <FolderOpen className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold">Component Collections</h1>
            </div>
            <p className="text-sm text-gray-400 mt-1">Organize your AI-synthesized components into reusable design systems.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-violet-500/50 w-56 transition-all"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-violet-600/20"
            >
              <Plus className="w-4 h-4" /> New Collection
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {col.count} items
                  </span>
                  <button
                    onClick={() => handleDelete(col.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Delete collection"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors">{col.name}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{col.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>Updated recently</span>
                <span className="text-violet-400 hover:underline cursor-pointer">Open Library →</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleCreate}
                className="bg-[#141824] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl"
              >
                <h3 className="text-lg font-bold">Create Component Collection</h3>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Collection Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SaaS Analytics Components"
                    value={newColName}
                    onChange={e => setNewColName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Description</label>
                  <textarea
                    placeholder="Brief description of what components belong here..."
                    value={newColDesc}
                    onChange={e => setNewColDesc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-violet-500 h-20 resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs text-gray-400 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    Create Collection
                  </button>
                </div>
              </motion.form>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ==================== Environments View ====================
function EnvironmentsView() {
  const [envs, setEnvs] = useState([
    { id: "prod", name: "Production", baseUrl: "https://api.componentbuilder.dev/v1", apiKey: "••••••••••••••••cb_991a" },
    { id: "staging", name: "Staging / QA", baseUrl: "https://staging.componentbuilder.dev/v1", apiKey: "••••••••••••••••st_442b" },
    { id: "local", name: "Local Development", baseUrl: "http://localhost:3000/api", apiKey: "dev_secret_token_123" },
  ])
  const [activeEnv, setActiveEnv] = useState("prod")

  return (
    <div className="min-h-screen bg-[#0d0d14] p-8 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">API Environments</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">Configure base URLs, headers, and environment variables for seamless API synthesis.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 px-1">Environments</h3>
            {envs.map(env => (
              <div
                key={env.id}
                onClick={() => setActiveEnv(env.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeEnv === env.id
                    ? "bg-cyan-500/10 border-cyan-500/40 text-white"
                    : "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5"
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{env.name}</h4>
                  <p className="text-xs font-mono text-gray-500 mt-1 truncate max-w-[180px]">{env.baseUrl}</p>
                </div>
                {activeEnv === env.id && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-6">
            {envs.filter(e => e.id === activeEnv).map(env => (
              <div key={env.id} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-bold">{env.name} Configuration</h3>
                    <p className="text-xs text-gray-400">Variables active in this profile</p>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                    Active Profile
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Base API Endpoint</label>
                    <input
                      type="text"
                      defaultValue={env.baseUrl}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">Authorization Token / Key</label>
                    <div className="relative">
                      <input
                        type="password"
                        defaultValue={env.apiKey}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-xl transition-colors">
                      Reset Defaults
                    </button>
                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-cyan-600/20">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== APIs Library View ====================
function ApisView() {
  const apis = [
    { method: "GET", path: "/v1/users/profile", desc: "Fetches user profile, avatar, and active role badges" },
    { method: "POST", path: "/v1/auth/session", desc: "Initiates secure OAuth2/JWT session exchange" },
    { method: "GET", path: "/v1/analytics/realtime", desc: "Streams live website traffic metrics and conversion events" },
    { method: "PUT", path: "/v1/settings/theme", desc: "Updates workspace theme tokens and user layout preferences" },
  ]

  const methodColor: Record<string, string> = {
    GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] p-8 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold">Saved API Endpoints</h1>
            </div>
            <p className="text-sm text-gray-400 mt-1">Pre-tested API definitions ready for rapid AI UI component generation.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-violet-600/20">
            <Plus className="w-4 h-4" /> Add API Endpoint
          </button>
        </div>

        <div className="space-y-4">
          {apis.map((api, i) => (
            <motion.div
              key={api.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${methodColor[api.method]}`}>
                  {api.method}
                </span>
                <div className="min-w-0">
                  <h4 className="font-mono text-sm font-bold text-white truncate">{api.path}</h4>
                  <p className="text-xs text-gray-400 mt-1">{api.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-gray-300 rounded-lg transition-colors font-medium">
                  Test Endpoint
                </button>
                <button className="px-3 py-1.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Synthesize UI
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== Settings View ====================
function SettingsView() {
  const [defaultFramework, setDefaultFramework] = useState("React")
  const [historyCleared, setHistoryCleared] = useState(false)

  const handleClearHistory = () => {
    clearHistory()
    setHistoryCleared(true)
    setTimeout(() => setHistoryCleared(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] p-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/20 border border-pink-500/30 text-pink-400">
              <Settings className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold">Workspace Settings</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">Configure your synthesis preferences, AI parameters, and storage.</p>
        </div>

        <div className="space-y-6">
          {/* AI Configuration */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" /> AI Synthesis Engine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Default UI Framework</label>
                <select
                  value={defaultFramework}
                  onChange={e => setDefaultFramework(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-violet-500"
                >
                  <option value="React" className="bg-[#141824]">React 19 (Tailwind CSS)</option>
                  <option value="Next.js" className="bg-[#141824]">Next.js App Router (TypeScript)</option>
                  <option value="Vue" className="bg-[#141824]">Vue 3 (Composition API)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Groq LLM Model</label>
                <input
                  type="text"
                  disabled
                  value="llama-3.3-70b-versatile (Active)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-emerald-400 opacity-80 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Storage & Data */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Storage & History Management
            </h3>
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <h4 className="text-sm font-bold text-gray-200">Local Generation Cache</h4>
                <p className="text-xs text-gray-400 mt-0.5">Clear locally stored generation history and preview snapshots</p>
              </div>
              <button
                onClick={handleClearHistory}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  historyCleared
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                }`}
              >
                {historyCleared ? <Check className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                {historyCleared ? "History Cleared!" : "Clear Cache & History"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== Active View Router ====================
export function ActiveView({ view }: { view: ViewType }) {
  switch (view) {
    case "collections":
      return <CollectionsView />
    case "environments":
      return <EnvironmentsView />
    case "apis":
      return <ApisView />
    case "settings":
      return <SettingsView />
    default:
      return null
  }
}
