"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react"
import type { FileNode } from "@/types/file-structure"
import { useFileTree } from "@/contexts/file-tree-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface FileTreeNodeProps {
  node: FileNode
  level: number
}

export function FileTreeNode({ node, level }: FileTreeNodeProps) {
  const {
    selectedNode,
    setSelectedNode,
    expandedNodes,
    toggleExpanded,
    createFolder,
    createFile,
    renameNode,
    deleteNode,
  } = useFileTree()

  const [isRenaming, setIsRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState(node.name)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createType, setCreateType] = useState<"file" | "folder">("file")
  const [createName, setCreateName] = useState("")

  const isExpanded = expandedNodes.has(node.id)
  const isSelected = selectedNode?.id === node.id
  const hasChildren = node.children && node.children.length > 0

  const handleToggleExpand = () => {
    if (node.type === "folder") {
      toggleExpanded(node.id)
    }
  }

  const handleSelect = () => {
    setSelectedNode(node)
  }

  const handleRename = async () => {
    if (renameValue.trim() && renameValue !== node.name) {
      await renameNode(node, renameValue.trim())
    }
    setIsRenaming(false)
    setRenameValue(node.name)
  }

  const handleDelete = async () => {
    await deleteNode(node)
    setShowDeleteDialog(false)
  }

  const handleCreate = async () => {
    if (createName.trim()) {
      if (createType === "folder") {
        await createFolder(node.path, createName.trim())
      } else {
        await createFile(node.path, createName.trim())
      }
    }
    setShowCreateDialog(false)
    setCreateName("")
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-1 py-1 px-2 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer group",
          isSelected && "bg-accent text-accent-foreground",
          "transition-colors duration-150",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleSelect}
      >
        {/* Expand/Collapse Button */}
        {node.type === "folder" && (
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation()
              handleToggleExpand()
            }}
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}

        {/* Icon */}
        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {node.type === "folder" ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-blue-500" />
            )
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          {isRenaming ? (
            <Input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename()
                } else if (e.key === "Escape") {
                  setIsRenaming(false)
                  setRenameValue(node.name)
                }
              }}
              className="h-6 text-sm"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-sm truncate block">{node.name}</span>
          )}
        </div>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {node.type === "folder" && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    setCreateType("folder")
                    setShowCreateDialog(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCreateType("file")
                    setShowCreateDialog(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New File
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={() => setIsRenaming(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Children */}
      {node.type === "folder" && isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <FileTreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {node.type}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{node.name}"?
              {node.type === "folder" && " This will delete all contents of the folder."}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
    </div>
  )
}
