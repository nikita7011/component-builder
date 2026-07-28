"use client"
import { cn } from "@/lib/utils"
const frameworks = [
    "HTML",
    "React",
    "Next.js",
    
]
interface Frame{
    value:string;
    onChange:(value:string)=>void
}
const FrameworkSelector = ({value, onChange}: Frame)=>{
    return(
        <div className="flex flex-wrap gap-2">
{frameworks.map((fw)=>(
    <button
    key={fw}
    onClick={()=>onChange(fw)}
    className={cn(
        "px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all",
         value===fw ? "bg-white/10 text-white border-white/20 shadow-lg scale-105" : "bg-white/5 text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-300"
    )}
    > {fw}</button>
))}
        </div>
    )
}
export default FrameworkSelector