'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from 'react'
import { Zap } from "lucide-react"

interface SpiralDemoProps {
  onEnter: () => void;
}

const SpiralDemo = ({ onEnter }: SpiralDemoProps) => {
  const [mounted, setMounted] = useState(false);
  const [startVisible, setStartVisible] = useState(false)
  
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setStartVisible(true)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-[100]">
      {/* Spiral Animation */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>
      
      {/* Simple Elegant Text Button with Pulsing Effect */}
      <div 
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ease-out ${startVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <button 
          onClick={onEnter}
          className="group flex flex-col items-center gap-4 text-white hover:text-cyan-400 transition-all duration-700"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl group-hover:bg-cyan-500/40 transition-all rounded-full" />
            <Zap className="w-12 h-12 relative z-10 animate-pulse" />
          </div>
          <span className="text-2xl tracking-[0.4em] uppercase font-light group-hover:tracking-[0.6em] transition-all">
            Enter Workspace
          </span>
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.5em] uppercase font-bold">
        Initializing Creative Core
      </div>
    </div>
  )
}

export { SpiralDemo }
