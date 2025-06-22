"use client";
import { useRef, useState } from "react";

export default function Preview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [url, setUrl] = useState("13.126.181.1");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Optional: add https:// if not present
      let finalUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        finalUrl = `http://${url}`;
        setUrl(finalUrl);
      }
      if (iframeRef.current) {
        iframeRef.current.src = finalUrl;
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-900 rounded-2xl shadow-lg">
      {/* Mock Browser Bar */}
      <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-t-2xl">
        {/* Traffic Lights */}
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-zinc-700 text-sm text-white rounded px-3 py-1 border border-zinc-600 outline-none"
            placeholder="Enter URL and press Enter"
          />
        </div>
      </div>

      {/* Iframe Body */}
      <div className="flex-1 overflow-hidden rounded-b-2xl">
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
