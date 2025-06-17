import { useEffect } from "react";
import * as monaco from "monaco-editor";

export default function useMonacoLanguages() {
  useEffect(() => {
    // ------------------ C++ ------------------
    monaco.languages.register({ id: "cpp" });
    monaco.languages.setMonarchTokensProvider("cpp", {
      tokenizer: {
        root: [
          [/#include/, "keyword"],
          [/\b(int|float|double|char|void|return|if|else|while|for|struct|class|public|private|protected|virtual|const|static)\b/, "keyword"],
          [/[a-zA-Z_]\w*/, "identifier"],
          [/\d+/, "number"],
          [/\/\/.*/, "comment"],
          [/\/\*/, "comment", "@comment"],
          [/".*?"/, "string"],
          [/[{}()[\]]/, "@brackets"],
        ],
        comment: [[/\*\//, "comment", "@pop"], [/./, "comment"]],
      },
    });

    // ------------------ Python ------------------
    monaco.languages.register({ id: "python" });
    monaco.languages.setMonarchTokensProvider("python", {
      tokenizer: {
        root: [
          [/\b(def|class|if|elif|else|try|except|finally|for|while|import|from|return|print|in|not|and|or|with|as|pass|break|continue|lambda|yield|assert)\b/, "keyword"],
          [/[a-zA-Z_]\w*/, "identifier"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
          [/'[^']*'/, "string"],
          [/#.*/, "comment"],
          [/[{}()[\]]/, "@brackets"],
        ],
      },
    });

    // ------------------ JavaScript / TypeScript ------------------
    monaco.languages.register({ id: "javascript" });
    monaco.languages.register({ id: "typescript" });

    // These are already built-in in monaco, just registering in case.
    // You can add custom token providers here if needed later.

    // ------------------ HTML ------------------
    monaco.languages.register({ id: "html" });

    // ------------------ CSS ------------------
    monaco.languages.register({ id: "css" });

    // ------------------ JSON ------------------
    monaco.languages.register({ id: "json" });

    // ------------------ Markdown ------------------
    monaco.languages.register({ id: "markdown" });

    // ------------------ Shell Script (bash) ------------------
    monaco.languages.register({ id: "shell" });
    monaco.languages.setMonarchTokensProvider("shell", {
      tokenizer: {
        root: [
          [/#[^\n]*/, "comment"],
          [/\b(if|then|else|fi|for|in|do|done|while|case|esac|function|echo|exit)\b/, "keyword"],
          [/[$][\w]+/, "variable"],
          [/[a-zA-Z_]\w*/, "identifier"],
          [/"[^"]*"/, "string"],
          [/'[^']*'/, "string"],
        ],
      },
    });

    // ------------------ YAML ------------------
    monaco.languages.register({ id: "yaml" });
    monaco.languages.setMonarchTokensProvider("yaml", {
      tokenizer: {
        root: [
          [/^\s*#.*/, "comment"],
          [/\b(true|false|null)\b/, "keyword"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
          [/'[^']*'/, "string"],
          [/:\s/, "delimiter"],
          [/\s*-\s/, "delimiter"],
        ],
      },
    });

  }, []);
}
