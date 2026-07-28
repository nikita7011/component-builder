// import AppLayoutClient from "./layout-client"

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AppLayoutClient>
//       {children}
//     </AppLayoutClient>
//   )
// }
"use client"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { SidebarContextProvider } from "@/components/context/sidebar-context"

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SidebarContextProvider>
      {/* <SidebarProvider> */}
        {/* <AppSidebar /> */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      {/* </SidebarProvider> */}
    </SidebarContextProvider>
  )
}