"use client"
import { Eye, Maximize2, Minimize2 } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"
import { useState, useRef, useEffect } from "react"

const preview = ({ code }: { code: string }) => {
    const componentName = code.match(/export\s+default\s+(?:function\s+)?([A-Z][a-zA-Z0-9]*)/)?.[1] || "App"
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [iframeHeight, setIframeHeight] = useState("800px")

    const handleLoad = () => {
        if (iframeRef.current && iframeRef.current.contentDocument) {
            const height = iframeRef.current.contentDocument.documentElement.scrollHeight
            setIframeHeight(`${Math.max(height, 800)}px`)
        }
    }

    useEffect(() => {
        // Reset height when code changes
        setIframeHeight("800px")
    }, [code])
    
    const processCode = (c: string) => c
        .replace(/^import\s+.*$/gm, "")
        .replace(/export\s+default\s+function\s+/g, "function ")
        .replace(/export\s+default\s+/g, "// ")
        .replace(/export\s+/g, "")

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { margin: 0; background: transparent; overflow: hidden; }
          #root { min-height: 100vh; background: #050505; }
        </style>
        <script>
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Babel transformer')) return;
    originalWarn(...args);
  };
</script>
    </head>
    <body>
        <div id="root"></div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/babel">
           const { useState, useEffect, useCallback, useMemo, useRef } = React;
           try {
             ${processCode(code)}
             const App = typeof ${componentName} !== 'undefined' ? ${componentName} : () => <div>Component materializing...</div>;
             ReactDOM.createRoot(document.getElementById('root')).render(<App />);
           } catch (e) {
             document.getElementById('root').innerHTML = '<div style="color:red;padding:20px;font-family:monospace;">' + e.message + '</div>';
           }
        </script>
    </body>
    </html>
    `
    return(
        <div className="w-full flex flex-col bg-black/20 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">View_Port</span>
              </div>
            </div>
            {code && (
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-mono text-emerald-500/60 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                  {componentName}.tsx
                </div>
              </div>
            )}
          </div>

          <div className="w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]">
            {code ? (
              <div className="w-full">
                <iframe
                  ref={iframeRef}
                  key={code}
                  srcDoc={html}
                  onLoad={handleLoad}
                  className="w-full border-none transition-all duration-300"
                  style={{ height: iframeHeight }}
                  sandbox="allow-scripts allow-same-origin"
                  title="Component Preview"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] gap-6 opacity-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-30" />
                  <Eye className="w-20 h-20 text-emerald-400 relative z-10" />
                </div>
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-400">Ready for Synthesis</p>
              </div>
            )}
          </div>
        </div>
    )
}
export default preview