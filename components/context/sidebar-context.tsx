"use client"
import {createContext, useContext, useState } from "react"
export type ViewType = "builder" | "collections" | "history" | "environments" | "apis" | "settings"

export interface HistoryItem {
  id: string
  apiEndpoint: string
  description: string
  framework: string
  code: string
  timestamp: number

}

interface SidebarContextType {
    activeView: ViewType
    setActiveView: (view: ViewType) => void

}

const SidebarContext = createContext<SidebarContextType>({
    activeView: "builder",
    setActiveView: ()=>{}
})

export const SidebarContextProvider = ({children} : {children: React.ReactNode}) => {
    const [activeView, setActiveView] = useState<ViewType>("builder")
    return (
        <SidebarContext.Provider value={{activeView, setActiveView}}>
            {children}
        </SidebarContext.Provider>
    )
}
export const useSidebar = () => useContext(SidebarContext)