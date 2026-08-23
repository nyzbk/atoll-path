import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function A4Editor({
  html,
  onChange,
  fileId,
  className,
}: {
  html: string;
  onChange: (html: string) => void;
  fileId: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML !== html) el.innerHTML = html;
  }, [fileId, html]);

  return (
    <div className={cn("a4-stage", className)}>
      <div
        ref={ref}
        className="a4-page"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Document"
        spellCheck
        onInput={() => {
          const el = ref.current;
          if (el) onChange(el.innerHTML);
        }}
        onPaste={(e) => {
          e.preventDefault();
          const text = e.clipboardData.getData("text/plain");
          document.execCommand("insertText", false, text);
        }}
      />
    </div>
  );
}

export function Toolbar({ onCmd }: { onCmd: (cmd: string) => void }) {
  const btn = (cmd: string, label: string) => (
    <button
      type="button"
      className="docs-tool"
      onMouseDown={(e) => {
        e.preventDefault();
        onCmd(cmd);
      }}
    >
      {label}
    </button>
  );
  return (
    <div className="docs-toolbar">
      {btn("bold", "B")}
      {btn("italic", "I")}
      {btn("underline", "U")}
      <span className="docs-tool-sep" />
      {btn("insertUnorderedList", "List")}
      {btn("formatBlock:h2", "H2")}
      {btn("formatBlock:p", "P")}
    </div>
  );
}

export function runCmd(cmd: string) {
  if (cmd.startsWith("formatBlock:")) {
    document.execCommand("formatBlock", false, cmd.split(":")[1]);
    return;
  }
  document.execCommand(cmd, false);
}
