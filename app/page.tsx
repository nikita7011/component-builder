"use client"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Boxes } from "@/components/ui/background-boxes"
import { useRouter } from "next/navigation"
import { ContainerScroll } from "@/components/ui/scroll-animation"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Zap, Sparkles } from "lucide-react"
import { DotGlobeHero } from "@/components/ui/globe"

import { InfiniteSlider } from "@/components/ui/infinite"

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("cb_auth_user"))
    }
  }, [])

  const sampleCode = `function UserCard({ data }) {
  return (
    <div className="rounded-2xl border 
      border-gray-100 bg-white p-6 
      flex items-center gap-4">
      <img src={data.avatar} 
        className="w-12 h-12 rounded-full" />
      <div>
        <h3 className="font-semibold">
          {data.name}
        </h3>
        <p className="text-sm text-gray-400">
          {data.email}
        </p>
      </div>
    </div>
  )
}`

  return (
    <main className="min-h-screen relative overflow-hidden bg-black">
      <Boxes />

      
      <motion.nav
        className="relative z-20 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Component Builder
        </div>
        <div className="flex gap-8 items-center">
          <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="/examples" className="text-gray-400 hover:text-white transition-colors">Examples</a>
          <button
            onClick={() => router.push(isLoggedIn ? "/app" : "/register")}
            className="px-6 py-2 bg-gradient-to-r from-pink-200 to-pink-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-violet-500/50 transition-all"
          >
            {isLoggedIn ? "Launch App →" : "Get Started"}
          </button>
        </div>
      </motion.nav>

      
      <DotGlobeHero
        rotationSpeed={0.004}
        globeRadius={1.4}
        className="h-screen -mt-20"
      >
        <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping" />
            <span className="text-sm font-medium text-pink-100 tracking-wider uppercase">AI-Powered UI Generation</span>
          </motion.div>

          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            <span className="block text-white/70 font-light text-4xl md:text-5xl mb-3">
              Build UI with
            </span>
            <span className="block bg-gradient-to-br from-pink-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Natural Language
            </span>
          </motion.h1>

          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Describe your component, paste your API - watch AI generate{" "}
            <span className="text-white font-medium">production-ready React code</span>{" "}
            in seconds.
          </motion.p>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button
              onClick={() => router.push(isLoggedIn ? "/app" : "/login")}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-violet-500/30 transition-all duration-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <Sparkles className="relative z-10 w-5 h-5" />
              <span className="relative z-10">{isLoggedIn ? "Open Workbench" : "Start Building"}</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
             
              onClick={() => router.push("/examples")}
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/10 rounded-xl font-semibold text-lg text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 group-hover:text-yellow-400 transition-colors duration-300" />
              View Examples
            </button>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center justify-center gap-8 pt-4"
          >
            {[
              { label: "Components Generated", value: "10K+" },
              { label: "Frameworks Supported", value: "3" },
              { label: "Lines Saved", value: "∞" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </DotGlobeHero>

      
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-4">
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">See it in action</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Your API becomes a <br />
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                  beautiful UI
                </span>
              </h2>
            </div>
          }
        >
          <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden flex">
            <div className="w-48 bg-white border-r border-gray-100 p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-violet-600" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
              {["Component Builder", "Collections", "History", "APIs", "Settings"].map((item) => (
                <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${item === "Component Builder" ? "bg-violet-100" : ""}`}>
                  <div className="w-3 h-3 rounded bg-gray-200" />
                  <div className="text-xs text-gray-500">{item}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 p-6 flex gap-4">
              <div className="w-64 bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-8 w-full bg-gray-100 rounded-lg border border-gray-200" />
                <div className="flex gap-2 flex-wrap">
                  {["Dashboard", "Login", "Blog"].map(t => (
                    <div key={t} className="text-xs px-2 py-1 border border-gray-200 rounded-lg text-gray-400">{t}</div>
                  ))}
                </div>
                <div className="h-20 w-full bg-gray-100 rounded-lg border border-gray-200" />
                <div className="h-8 w-full bg-violet-600 rounded-xl" />
              </div>
              <div className="flex-1 bg-gray-950 rounded-xl overflow-hidden">
                <div className="flex gap-1.5 p-3 border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  {["import React from 'react'", "const UserCard = ({ data }) => {", "  return (", "    <div className='card'>", "      <h3>{data.name}</h3>", "    </div>", "  )", "}"].map((line, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-gray-600 text-xs w-4">{i + 1}</span>
                      <span className="text-xs font-mono" style={{ color: i === 0 ? '#569cd6' : i === 1 ? '#dcdcaa' : '#9cdcfe' }}>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      
      <section id="features" className="relative z-10 px-6 py-5 max-w-7xl mx-auto">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-blue-800/10 to-pink-800/10 backdrop-blur-sm border border-white/10 p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Generate with
                <span className="bg-gradient-to-r from-pink-200 to-pink-600 bg-clip-text text-transparent">
                  {" "}Natural Language
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Describe your vision and watch AI transform your words into production ready components without any design skills required.
              </p>
              <ul className="space-y-4">
                {["Instant component generation", "Responsive", "Customizable"].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <TiltCard>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 to-pink-800/30 rounded-2xl blur-xl" />
                <div className="relative bg-gray-950 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs text-gray-500 font-mono">UserCard.tsx</span>
                  </div>
                  <pre className="p-5 text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto">
                    <code>{sampleCode}</code>
                  </pre>
                </div>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </section>

<section className="relative z-10 py-16 max-w-7xl mx-auto px-6">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-center mb-10"
  >
    <p className="text-xs text-gray-600 uppercase tracking-widest font-medium">
      Trusted by teams at
    </p>
  </motion.div>

  <InfiniteSlider gap={48} duration={30} durationOnHover={60}>
    {[
      { name: "Anthropic"},
      { name: "Vercel" },
      { name: "OpenAI" },
      { name: "Acme Corp" },
      { name: "DevStudio"},
      { name: "BuildCo" },
      { name: "LaunchPad"},
      { name: "StackHQ" },
    ].map((company) => (
      <div
        key={company.name}
        className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/5 bg-white/3 backdrop-blur-sm hover:border-white/10 hover:bg-white/5 transition-all duration-300 select-none"
      >
      
        <span className="text-sm font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap">
          {company.name}
        </span>
      </div>
    ))}
  </InfiniteSlider>

 
  <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
  <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />
</section>

      <footer className="relative z-10 px-6 py-12 mt-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500">Frontend Generator</div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig)
  const scale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => scale.set(1.02)}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
          scale.set(1)
        }}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  )
}