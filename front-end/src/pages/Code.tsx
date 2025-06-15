"use client"

import { FileTreeProvider } from "@/contexts/file-tree-context"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { useFolderStructure } from "@/hooks/useFolderStructure"
import { FileExplorerSidebar } from "@/components/file-explorer-sidebar/file-explorer-sidebar"
import CodeAreaMainPage from "@/components/code-main-page/main-page"
import FileHeader from "@/components/code-main-page/header"

export default function Code() {

  const { data: folderStructure, isLoading:gettingFolderStructure } = useFolderStructure();

  if(gettingFolderStructure) return <div>Loading...</div>
  if(!folderStructure) return <div>No Data Found</div>

  return (
    <FileTreeProvider initialPaths={folderStructure}>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <FileExplorerSidebar/>
          <SidebarInset className="flex-1">
            <FileHeader />
            <CodeAreaMainPage />
          </SidebarInset>
        </div>
        <Toaster />
      </SidebarProvider>
    </FileTreeProvider>
  )
}
