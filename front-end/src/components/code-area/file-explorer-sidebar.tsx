"use client"

import { useEffect } from "react"
import { RefreshCw, Plus, FolderPlus, FilePlus } from "lucide-react"
import { useFileTree } from "@/contexts/file-tree-context"
import { FileTreeNode } from "@/components/code-area/file-node-tree"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function FileExplorerSidebar() {

  const { tree, refreshTree, createFolder, createFile } = useFileTree()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createType, setCreateType] = useState<"file" | "folder">("file")
  const [createName, setCreateName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      await refreshTree()
      setIsLoading(false)
    }
    loadInitialData()
  }, [refreshTree])

  const handleRefresh = async () => {
    setIsLoading(true)
    await refreshTree()
    setIsLoading(false)
  }

  const handleCreate = async () => {
    if (createName.trim()) {
      const rootPath = "dummy-test"
      if (createType === "folder") {
        await createFolder(rootPath, createName.trim())
      } else {
        await createFile(rootPath, createName.trim())
      }
    }
    setShowCreateDialog(false)
    setCreateName("")
  }

  return (
    <>
      <Sidebar className="w-80">
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold">File Explorer</h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading} className="h-8 w-8 p-0">
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setCreateType("folder")
                      setShowCreateDialog(true)
                    }}
                  >
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setCreateType("file")
                      setShowCreateDialog(true)
                    }}
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    New File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>S3 Bucket Contents</SidebarGroupLabel>
            <SidebarGroupContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : tree.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No files found</p>
                  <p className="text-xs mt-1">Create your first file or folder</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {tree.map((node) => (
                    <FileTreeNode key={node.id} node={node} level={0} />
                  ))}
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New {createType === "folder" ? "Folder" : "File"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={`Enter ${createType} name`}
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreate()
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!createName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
