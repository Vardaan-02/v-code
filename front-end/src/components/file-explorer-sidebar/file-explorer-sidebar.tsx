"use client";

import { RefreshCw, Plus, FolderPlus, FilePlus } from "lucide-react";
import { useFileTree } from "@/contexts/file-tree-context";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRefreshFolderStructure } from "@/hooks/useRefreshFolderStructure";
import { useAddS3Object } from "@/hooks/useAddS3Object";
import { FileTreeNode } from "./file-node-tree";

export function FileExplorerSidebar() {
  const { tree } = useFileTree();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createType, setCreateType] = useState<"file" | "folder">("file");
  const [createName, setCreateName] = useState("");

  const { mutate: refreshFolders, isPending: refetchingFolderStructure } =
    useRefreshFolderStructure();
  const { mutate: addS3Object, isPending: addingS3Object } = useAddS3Object();

  const handleCreate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    if (createName.trim()) {
      if (createType === "folder") {
        addS3Object({ path: "", type: "folder" });
      } else {
        addS3Object({ path: "", type: "file" });
      }
    }
    setShowCreateDialog(false);
    setCreateName("");
  };

  return (
    <>
      <Sidebar className="w-80">
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold">File Explorer</h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refreshFolders()}
                disabled={refetchingFolderStructure}
                className="h-8 w-8 p-0"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    refetchingFolderStructure ? "animate-spin" : ""
                  }`}
                />
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
                      setCreateType("folder");
                      setShowCreateDialog(true);
                    }}
                  >
                    <FolderPlus className="h-4 w-4 mr-2" />
                    New Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setCreateType("file");
                      setShowCreateDialog(true);
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
              {refetchingFolderStructure ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : tree.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No files found</p>
                  <p className="text-xs mt-1">
                    Create your first file or folder
                  </p>
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
            <DialogTitle>
              Create New {createType === "folder" ? "Folder" : "File"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={`Enter ${createType} name`}
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreate(e);
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleCreate} disabled={addingS3Object}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
