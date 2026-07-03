// Regenerates src/data/tasks.json from the drill list in README.md.
// Usage: npm run gen:tasks
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const md = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const lines = md.split(/\r?\n/);

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const difficultyOf = (emojis) =>
  emojis.includes('🔴') ? 3 : emojis.includes('🟡') ? 2 : emojis.includes('🟢') ? 1 : 2;

// A handful of representative "company asked" tags; extend freely.
const companies = {
  1: 'Meta', 3: 'Stripe', 10: 'Google', 15: 'Vercel', 24: 'Meta',
  30: 'Amazon', 48: 'Netflix', 54: 'Figma', 61: 'Stripe', 74: 'OpenAI',
  81: 'Anthropic', 91: 'Google', 100: 'Anthropic',
};

const itemRe = /^(\d+)\.\s+(.+?)\*\*(.+?)\*\*\s+—\s+(.+)$/;
const sectionRe = /^##\s+Section\s+\d+\s+—\s+(.+)$/;

let section = '';
const tasks = [];

for (const line of lines) {
  const sm = line.match(sectionRe);
  if (sm) {
    section = sm[1].replace(/\s*\(.*\)\s*$/, '').trim();
    continue;
  }
  const m = line.match(itemRe);
  if (!m) continue;
  const id = Number.parseInt(m[1], 10);
  tasks.push({
    id,
    slug: slugify(m[3].trim()),
    title: m[3].trim(),
    description: m[4].trim(),
    difficulty: difficultyOf(m[2]),
    category: section,
    seed: m[2].includes('🌱'),
    dateAdded: '2026-06-22',
    company: companies[id] ?? null,
  });
}

const out = path.join(root, 'src', 'data', 'tasks.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(tasks, null, 2) + '\n');
console.log(`Wrote ${tasks.length} tasks → ${path.relative(root, out)}`);
