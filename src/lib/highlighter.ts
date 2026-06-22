import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';

/**
 * A single shared, lazily-created Shiki highlighter. We only load the grammars
 * and theme we actually use (tsx + a dark theme) to keep the bundle lean.
 */
let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import('shiki/themes/vesper.mjs')],
      langs: [import('shiki/langs/tsx.mjs')],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang: 'tsx',
    theme: 'vesper',
  });
}
