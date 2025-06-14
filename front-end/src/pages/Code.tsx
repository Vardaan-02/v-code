"use client"

import { FileExplorerSidebar } from "@/components/code-area/file-explorer-sidebar"
import { FileTreeProvider } from "@/contexts/file-tree-context"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Toaster } from "@/components/ui/sonner"
import { useFolderStructure } from "@/hooks/useFolderStructure"

export default function CodeArea() {

  const { data: folderStructure, isLoading:gettingFolderStructure } = useFolderStructure();

  if(gettingFolderStructure) return <div>Loading...</div>
  if(!folderStructure) return <div>No Data Found</div>

  return (
    <FileTreeProvider initialPaths={folderStructure}>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <FileExplorerSidebar/>
          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">S3 Bucket</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>dummy-test</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">File Preview Area</p>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">File Properties</p>
                </div>
                <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                  <p className="text-muted-foreground">Actions Panel</p>
                </div>
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">S3 File Explorer</h2>
                  <p className="text-muted-foreground mb-4">
                    Select a file or folder from the sidebar to view details and perform actions.
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Create new files and folders</p>
                    <p>• Rename existing items</p>
                    <p>• Delete files and folders</p>
                    <p>• Navigate through your S3 bucket structure</p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
        <Toaster />
      </SidebarProvider>
    </FileTreeProvider>
  )
}
