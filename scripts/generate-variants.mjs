/**
 * Generates 001-slug-default.tsx + 001-slug-solved.tsx for every task in
 * tasks.json, preserving content from any existing implementation files.
 *
 * Mapping priority for -default:
 *   1. Existing slug-default.tsx  (already scaffolded)
 *   2. Existing slug.tsx          (base implementation)
 *   3. Generated stub             (no implementation yet)
 *
 * Mapping priority for -solved:
 *   1. Existing slug-solved.tsx   (user has written a solution)
 *   2. Same as -default           (unsolved — copy the scaffold)
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tasksDir   = join(__dirname, '../src/tasks');
const tasksJson  = JSON.parse(
  readFileSync(join(__dirname, '../src/data/tasks.json'), 'utf-8')
);

// ── Read all existing task files ──────────────────────────────────────────────
const existing = {};
for (const file of readdirSync(tasksDir)) {
  if (file.endsWith('.tsx')) {
    existing[file] = readFileSync(join(tasksDir, file), 'utf-8');
  }
}

// ── Stub generator ────────────────────────────────────────────────────────────
function toComponentName(slug) {
  return slug
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function stars(n)  { return '★'.repeat(n) + '☆'.repeat(3 - n); }

function generateStub(task) {
  const comp = toComponentName(task.slug);
  const desc = task.description.replace(/[*`]/g, '');
  return `import { useState } from 'react';

/**
 * Drill #${task.id} — ${task.title}
 *
 * ${desc}
 *
 * TODO: Implement this drill.
 * Difficulty: ${stars(task.difficulty)} · ${task.category}
 */
export default function ${comp}() {
  const [, rerender] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-400">
        TODO — build your solution here.
      </p>
      <button
        onClick={() => rerender((n) => n + 1)}
        className="self-start rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500"
      >
        re-render
      </button>
    </div>
  );
}
`;
}

// ── Generate files ────────────────────────────────────────────────────────────
let created = 0;

for (const task of tasksJson) {
  const id      = String(task.id).padStart(3, '0');
  const outDef  = `${id}-${task.slug}-default.tsx`;
  const outSolv = `${id}-${task.slug}-solved.tsx`;

  // -default content
  let defContent =
    existing[`${task.slug}-default.tsx`]   ??
    existing[`${task.slug}.tsx`]            ??
    generateStub(task);

  // -solved content
  let solvContent =
    existing[`${task.slug}-solved.tsx`] ??
    defContent;                           // unsolved → copy default

  writeFileSync(join(tasksDir, outDef),  defContent,  'utf-8');
  writeFileSync(join(tasksDir, outSolv), solvContent, 'utf-8');
  created += 2;
  console.log(`  ${outDef}`);
  console.log(`  ${outSolv}`);
}

console.log(`\n✓ Created ${created} files.`);
