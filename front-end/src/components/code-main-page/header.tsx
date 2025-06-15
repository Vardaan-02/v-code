import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useFileTree } from "@/contexts/file-tree-context";

export default function FileHeader() {
  const { selectedNode } = useFileTree();

  const pathParts = selectedNode?.path?.split("/") || [];

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 ml-16">
      <Breadcrumb>
        <BreadcrumbList>
          {pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;

            return (
              <div key={index} className="flex items-center gap-1">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{part}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink>{part}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
