import { useEffect } from "react";
import * as monaco from "monaco-editor";

export default function useMonacoLanguages() {
  useEffect(() => {
    // --- C++ ---
    monaco.languages.register({ id: "cpp" });
    monaco.languages.setMonarchTokensProvider("cpp", {
      tokenizer: {
        root: [
          [/#include/, "keyword"],
          [/\b(int|float|char|void|return|if|else|while|for)\b/, "keyword"],
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

    // --- Python ---
    monaco.languages.register({ id: "python" });
    monaco.languages.setMonarchTokensProvider("python", {
      tokenizer: {
        root: [
          [/\b(def|class|if|elif|else|try|except|for|while|import|from|return|print|in|not|and|or)\b/, "keyword"],
          [/[a-zA-Z_]\w*/, "identifier"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
          [/'[^']*'/, "string"],
          [/#.*/, "comment"],
          [/[{}()[\]]/, "@brackets"],
        ],
      },
    });

  }, []);
}
