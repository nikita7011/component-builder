"use client"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion"
import { Plus, LayoutDashboard, FolderOpen, History, Globe, Code2, Settings, LogOut, User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar, ViewType } from "./context/sidebar-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function AppSidebar() {
  const {activeView, setActiveView} = useSidebar()
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cb_auth_user")
      if (saved) {
        try { setUser(JSON.parse(saved)) } catch {}
      } else {
        setUser({ name: "Alex Rivera", email: "alex.r@componentbuilder.dev", avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=developer" })
      }
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cb_auth_user")
    }
    router.push("/login")
  }

  const navItem = (view: ViewType, label: string, icon: React.ReactNode) => (
    <SidebarMenuItem>
      <SidebarMenuButton 
      onClick={()=> setActiveView(view)}
      className={cn("text-sm w-full flex items-center gap-2 rounded-lg transition-all",
        activeView === view ? "bg-violet-100 text-violet-700 font-medium"
        : "text-gray-600 hover:bg-gray-100"
      )}>
        {icon}
        {label}

      </SidebarMenuButton>
    </SidebarMenuItem>
  )
  const subItem = (view:ViewType, label:string, icon?:React.ReactNode)=>(
    <SidebarMenuButton 
    onClick={()=> setActiveView(view)}
    className={cn(
      "text-sm w-full flex items-center gap-2 rounded-lg transition-all",
      activeView === view ? "bg-violet-100 text-violet-700 font-medium"
      : "text-gray-500 hover:bg-gray-100"
    )}>
      {icon}
      {label}

    </SidebarMenuButton>
  )
  return (

  
       <Sidebar className="bg-white border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-violet-600 text-white font-bold text-sm">
            CB
          </div>
          <span className="font-semibold text-sm tracking-wide text-gray-800">Component Builder</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs tracking-wide uppercase text-gray-400 mb-1">Workspace

          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={cn("text-sm w-full items-center gap-2 rounded-lg transition-all",
                activeView === "builder" ? "bg-pink-200 text-violet-500 font-medium"
                : "text-gray-600 hover:bg-gray-100"
                )}>
                  <Link href="/app">
                  <LayoutDashboard className="w-4 h-4" />
                  Component Builder
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                       
                
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="collections" className="border-none">
                        <AccordionTrigger
                         className={cn("rounded-md px-2 py-2 text-sm hover:bg-gray-200 hover:no-underline",
                          activeView === "collections" ? "text-violet-500" : "text-gray-600")}>
                            <span className="flex items-center gap-2">
                              <FolderOpen className="w-4 h-4"/> Collections
                            </span>
                          </AccordionTrigger>
                        <AccordionContent className="pl-5">
                            <div className="flex flex-col gap-1">
                              {subItem("collections", "My APIs", <Code2 className="w-3 h-3"/>)}
                                <SidebarMenuButton className="text-sm text-gray-400 hover:bg-gray-100 flex items-center gap-2 rounded-lg">
                                  <Plus className="w-3 h-3"/>
                                  New Collection</SidebarMenuButton>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* history */}

                    <AccordionItem value="history" className="border-none">
                        <AccordionTrigger className={cn("rounded-lg px-2 py-2 text-sm hover:bg-gray-200 hover:no-underline",
                        activeView === "history" ? "text-blue-500" : "text-gray-600")}>
                                 <span className="flex items-center gap-2">
                      <History className="w-4 h-4" /> History
                    </span>
                          </AccordionTrigger>
                        <AccordionContent className="pl-4 pb-1">
                            <div className="flex flex-col gap-0.5">
                              {subItem("history", "Today")}
                                 <SidebarMenuButton className="text-sm text-gray-400 hover:bg-gray-100 rounded-lg">
                        Yesterday
                      </SidebarMenuButton>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* envi */}
                    <AccordionItem value="env" className="border-none">
                        <AccordionTrigger className={cn(
                      "rounded-lg px-2 py-2 text-sm hover:bg-gray-100 hover:no-underline",
                      activeView === "environments" ? "text-violet-700" : "text-gray-600"
                    )}>
                          <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Environments
                    </span>
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 pb-1">
                            <div className="flex flex-col gap-0.5">
                              {subItem("environments", "No Environment")}
                                 <SidebarMenuButton className="text-sm text-gray-400 hover:bg-gray-100 flex items-center gap-2 rounded-lg">
                                  <Plus className="w-3.5 h-3.5" /> Add Environment
                                 </SidebarMenuButton>
                                  <SidebarMenuButton className="text-sm hover:bg-gray-200 dark:hover:bg-neutral-800">+ Add Environment</SidebarMenuButton>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* api */}
                      <AccordionItem value="apis"  className="border-none">
                        <AccordionTrigger className={cn(
                      "rounded-lg px-2 py-2 text-sm hover:bg-gray-100 hover:no-underline",
                      activeView === "apis" ? "text-violet-700" : "text-gray-600"
                    )}>
                              <span className="flex items-center gap-2">
                      <Code2 className="w-4 h-4" /> APIs
                    </span> 
                        </AccordionTrigger>
                        <AccordionContent className="pl-4 pb-1">
                            <div className="flex flex-col gap-0.5">
                              {subItem("apis", "My APIs")}
                                 <SidebarMenuButton className="text-sm text-gray-400 hover:bg-gray-100 flex items-center gap-2 rounded-lg">
                                  <Plus className="w-3.5 h-3.5" /> Create API
                                 </SidebarMenuButton>
                                  <SidebarMenuButton className="text-sm hover:bg-gray-200 dark:hover:bg-neutral-800">+ Create APIs</SidebarMenuButton>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              
            
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>


      <SidebarFooter className="border-t border-gray-200 p-3 space-y-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
            onClick={()=>setActiveView("settings")}
            className={cn("w-full flex items-center gap-2 text-sm rounded-lg transition-all",
              activeView === "settings" ? "bg-pink-200 text-pink-700 font-medium"
              : "text-gray-600 hover:bg-gray-100"
             )}>
              <Settings className="w-4 h-4" />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {user && (
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-violet-100 border border-violet-200 flex-shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-800 truncate leading-tight">{user.name}</p>
                <p className="text-[10px] text-gray-400 truncate leading-tight">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
    // </div>
  )
}
