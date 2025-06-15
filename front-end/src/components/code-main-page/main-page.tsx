import Editor from "../editor/editor";

export default function CodeMainPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 ml-16 overflow-x-hidden">
        <Editor />
      <div className="flex gap-4 w-full h-1/3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center w-2/3">
          <p className="text-muted-foreground">Treminal</p>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center w-1/3">
          <p className="text-muted-foreground">Preview</p>
        </div>
      </div>
    </div>
  );
}
