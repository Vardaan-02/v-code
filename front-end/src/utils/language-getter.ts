export const extensionToLanguageId: Record<string, string> = {
  // C++
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  h: "cpp",
  hpp: "cpp",

  // Python
  py: "python",

  // JavaScript
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",

  // TypeScript
  ts: "typescript",
  tsx: "typescript",

  // HTML
  html: "html",
  htm: "html",

  // CSS
  css: "css",
  scss: "css",
  sass: "css",

  // JSON
  json: "json",
  jsonc: "json",

  // Markdown
  md: "markdown",
  markdown: "markdown",

  // Shell
  sh: "shell",
  bash: "shell",

  // YAML
  yaml: "yaml",
  yml: "yaml",
};

export function getLanguageFromPath(filePath: string): string {
  const ext = filePath.split(".").pop()?.toLowerCase() || "";
  return extensionToLanguageId[ext] || "plaintext";
}
