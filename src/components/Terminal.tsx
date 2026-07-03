import { useState, type ReactNode } from 'react';

interface TerminalProps {
  /** Shown in the title bar, e.g. the source filename. */
  filename: string;
  /** Raw text used for the copy-to-clipboard action. */
  copyText?: string;
  children: ReactNode;
}

/**
 * A terminal / editor chrome around the code preview: traffic-light dots, a
 * filename tab and a copy button.
 */
export function Terminal({ filename, copyText, children }: TerminalProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-800 bg-ink-900/80 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-ink-800 bg-ink-950/60 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-1 truncate font-mono text-xs text-ink-400">
          {filename}
        </span>
        {copyText && (
          <button
            onClick={copy}
            className="ml-auto rounded-md border border-ink-700 px-2 py-0.5 font-mono text-[11px] text-ink-400 transition hover:border-ink-500 hover:text-ink-50"
          >
            {copied ? 'copied ✓' : 'copy'}
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
}
