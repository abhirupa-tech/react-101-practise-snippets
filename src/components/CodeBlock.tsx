import { useEffect, useState } from 'react';
import { highlight } from '../lib/highlighter';

interface CodeBlockProps {
  code: string;
}

/**
 * Renders color-coded TypeScript via Shiki. While the highlighter (and its
 * WASM engine) load, we show the plain source so there's never a blank flash.
 */
export function CodeBlock({ code }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    highlight(code)
      .then((out) => {
        if (alive) setHtml(out);
      })
      .catch(() => {
        if (alive) setHtml(null);
      });
    return () => {
      alive = false;
    };
  }, [code]);

  if (html) {
    return (
      <div
        className="text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:m-0 [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <pre className="m-0 font-mono text-[13px] leading-relaxed text-ink-400">
      <code>{code}</code>
    </pre>
  );
}
