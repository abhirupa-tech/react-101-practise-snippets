# React Practice Drills

100 small React exercises, built to keep fundamentals sharp in a world where everything is AI-assisted and vibe-coded.

The rules are simple: no AI autocomplete, no Copilot, time-boxed sessions. Just you and the problem. Each drill has a starter template (broken or empty) and a solution you can reveal once you've had a go.

**Feel free to fork this and make it your own.** Swap out my drills for whatever gaps you want to close.

---

## What's in here

10 sections, 10 drills each, ramping from React basics up to agent UI infrastructure:

| Section | Topic |
|---|---|
| 1 | React Core Mechanics — batching, keys, closures, portals |
| 2 | Hooks From Scratch — build useDebounce, useFetch, useUndo, etc. |
| 3 | State, Re-renders & Memoization — memo, useMemo, useCallback, context |
| 4 | Forms, Events & Real-World Inputs |
| 5 | Component Design Patterns — compound components, HOCs, headless |
| 6 | Performance & Rendering Internals — virtualization, Suspense, transitions |
| 7 | Async, Data Fetching & Race Conditions |
| 8 | Streaming & Agent UI Fundamentals — typewriter, SSE, cancelable streams |
| 9 | Protocol-Level Agent Infra — AG-UI, tool calls, state machines |
| 10 | Mini Systems — build useState, a router, a pub-sub store from scratch |

Difficulty: 🟢 warm-up · 🟡 real rust-check · 🔴 senior-bar

---

## Running it locally

```bash
git clone https://github.com/your-username/react-101-practise-snippets
cd react-101-practise-snippets
npm install
npm run dev        # http://localhost:5173
```

---

## How the app works

**Home page** — a searchable, filterable grid of all 100 drills.

**Drill page** — click any card to open a drill. You get:
- A live preview pane on the left showing the running component
- The source code on the right
- An **Exercise / Solution toggle** in the header

The toggle switches between the starter file (`001-slug-default.tsx`) and the solution file (`001-slug-solved.tsx`). By default the solution file is identical to the starter — that's intentional. You solve it yourself first, then overwrite the solved file with your answer.

**Adding your own solutions:** navigate to `src/tasks/`, find the `NNN-slug-solved.tsx` file for the drill you just built, and replace its contents with your implementation. It will hot-reload instantly in the preview pane.

---

## Stack

Vite · React 19 · TypeScript · Tailwind v4 · React Router v7 · `@tanstack/react-virtual` · Shiki

---

## How to use this

**Suggested pace:**
- Weeks 1–2: Sections 1–3 (core mechanics, hooks, re-renders) — diagnostic and de-rust
- Weeks 2–3: Sections 4–6 (forms, patterns, performance) — fill in gaps from the diagnostic
- Week 3: Section 7 (async / race conditions) — comes up constantly in senior interviews
- Week 3–4: Sections 8–9 (streaming + agent UI) — research and portfolio work in parallel
- Any time you want a deep-dive day: Section 10 — highest signal, most fun once you're warmed up

**One rule that helps:** after each drill, explain what you built out loud in under 90 seconds, like a panel just asked "walk me through this." It surfaces the gaps that working code hides.

---

## The 100 drills

### Section 1 — React Core Mechanics

1. 🟢 **The Liar's Counter** — Build a counter where clicking +1 three times fast only increments once. Explain why batching does this.
2. 🟢 **Key Crime Scene** — Render a list keyed by index, reorder it, watch state scramble. Fix it. One sentence on the reconciliation bug.
3. 🟡 **The Stale Closure Trap** — `setInterval` counter freezes at 1. Fix it two ways: functional update and ref.
4. 🟡 **Strict Mode Double-Fire** — `useEffect` logs twice in dev. Explain why, add cleanup so the double-fire is harmless.
5. 🟡 **useLayoutEffect or Bust** — Tooltip flickers with `useEffect`. Switch to `useLayoutEffect`. Explain the timing difference.
6. 🔴 **Controlled Chaos** — Build controlled and uncontrolled inputs side by side. Break the controlled one deliberately. Narrate the React warning.
7. 🟢 **Fragment Detective** — Render siblings without a wrapper `div`. Explain when you need `React.Fragment` with a `key`.
8. 🟡 **Portal to the Underworld** — Modal using `createPortal` that escapes `overflow: hidden`. Explain why nesting can't solve it.
9. 🟡 **Event Pooling Ghost Story** — Log a synthetic event asynchronously. Explain what you see (React 17+ vs older).
10. 🔴 **Render Count Detective** — Reason out which of 3 nested components re-renders when a grandparent's unrelated state changes. Verify with `useRef` counters.

### Section 2 — Hooks From Scratch

11. 🟡 **`useDebounce`** — No lodash. Use it on a search input.
12. 🟡 **`useThrottle`** — No lodash. Use it on a scroll handler.
13. 🟡 **`usePrevious`** — Track and display the previous value of a piece of state.
14. 🟡 **`useToggle`** — Tiny, but articulate why you'd extract it.
15. 🔴 **`useFetch` with Abort** — loading / error / data states + `AbortController` cleanup on unmount.
16. 🔴 **`useLocalStorage` Sync Hook** — Persist state to localStorage, sync across multiple components on the same key.
17. 🟡 **`useOnClickOutside`** — Classic dropdown-closer. Refs + event listeners, clean up properly.
18. 🔴 **`useInterval` the Dan Abramov Way** — The ref-based pattern that solves the stale closure problem generically.
19. 🟡 **`useMediaQuery`** — Responsive hook reacting to resize, no library.
20. 🔴 **`useUndo`** — `state, setState, undo, redo` with a history stack. (It's secretly a reducer pattern.)

### Section 3 — State, Re-renders & Memoization

21. 🟢 **Memo Myth-Buster** — `React.memo` still re-renders because you pass an inline arrow. Fix with `useCallback`.
22. 🟡 **The Expensive Calculation** — Deliberately slow function, with and without `useMemo`. Visible lag difference.
23. 🟡 **Object Identity Trap** — `{ a: 1 }` inline as a prop breaks memoization. Prove it, fix it.
24. 🔴 **Context Re-render Bomb** — One context update re-renders all 5 consumers. Split context to fix it.
25. 🟡 **Lifting State Properly** — Two siblings duplicating state. Lift to the right ancestor, no Context.
26. 🔴 **Derived State Anti-Pattern** — `useState(prop)` breaks on prop change. Derive instead of store.
27. 🟡 **Reducer Refactor** — 5 `useState` calls that always update together → one `useReducer`.
28. 🔴 **The `key` Reset Trick** — Use a changing `key` to intentionally force-remount and reset state.
29. 🟡 **Batched vs Unbatched** — State updates inside a native DOM listener are not batched. Explain `flushSync`.
30. 🔴 **Diffing Two Lists** — Write the pseudocode for how React's reconciler handles old/new arrays + keys.

### Section 4 — Forms, Events & Real-World Inputs

31. 🟢 **Controlled Form Survival Kit** — Text, checkbox, select, radio — all controlled, single `handleChange`.
32. 🟡 **Debounced Live Validation** — Email field validates 400ms after typing stops.
33. 🟡 **File Upload Preview** — Image preview before upload using `FileReader` or object URLs.
34. 🟡 **Multi-Step Wizard** — 3-step form, state preserved across steps, progress indicator.
35. 🔴 **Optimistic Form Submit** — Show success immediately, roll back if the fake API fails.
36. 🟢 **Keyboard Navigable List** — Arrow-key up/down, Enter to select. No mouse required.
37. 🟡 **Drag to Reorder** — Native HTML5 drag events, no library.
38. 🟡 **Custom Checkbox Group with "Select All"** — Includes the indeterminate state.
39. 🔴 **Debounced Autosave** — Textarea saves 1s after typing stops. Shows Saving… / Saved. Cancels correctly.
40. 🟡 **Accessible Modal Focus Trap** — Tab stays inside the modal. Focus returns to trigger on close.

### Section 5 — Component Design Patterns

41. 🟡 **Compound Components** — `<Tabs><Tab/><Tab/></Tabs>` with Context internally, no prop drilling.
42. 🔴 **Render Props Pattern** — `<MouseTracker render={(pos) => ...} />` then explain why hooks replaced it.
43. 🟡 **Higher-Order Component** — `withLoading(Component)` HOC, then the same as a hook.
44. 🟡 **Polymorphic Component (`as` prop)** — `<Button as="a">` with correct TypeScript typing.
45. 🔴 **Slot Pattern** — `<Card>` with named `header`, `footer`, `children` slots.
46. 🟡 **Controlled/Uncontrolled Hybrid** — One component that works both ways depending on what props are passed.
47. 🟢 **Skeleton Loader Component** — Generic `<Skeleton width height />` across different shapes.
48. 🔴 **Error Boundary From Scratch** — Class component `componentDidCatch`, deliberate throw, fallback UI.
49. 🟡 **Provider Pattern for Theming** — Light/dark via Context + `useTheme()`, no external lib.
50. 🔴 **Headless Component** — `useAccordion()` returns state + handlers with zero markup. Two different-looking UIs from the same hook.

### Section 6 — Performance & Rendering Internals

51. 🟡 **Virtualized List, By Hand** — Only render visible rows of a 10,000-item list. No `react-window`.
52. 🔴 **Code-Splitting with Suspense** — `React.lazy()` + `<Suspense fallback>` for a route.
53. 🟡 **Image Lazy Load with IntersectionObserver** — No library, native observer.
54. 🔴 **Concurrent Rendering Demo** — `useTransition` keeps a search input responsive during a slow filter.
55. 🟡 **Avoiding Prop Drilling Without Context** — Component composition fixes a 4-level prop chain before you reach for Context.
56. 🔴 **`useDeferredValue` Race** — Stale results persist briefly during fast typing, intentionally.
57. 🟡 **Bundle Diet** — Replace a whole-library import with a native equivalent.
58. 🟡 **Memoized Selector Pattern** — Reselect-style derived state with `useMemo`.
59. 🔴 **Profiler API Hunt** — `<Profiler>` to measure and log render durations.
60. 🟡 **Animation Without Re-render** — Animate via ref + direct DOM, not state.

### Section 7 — Async, Data Fetching & Race Conditions

61. 🟡 **The Classic Race Condition** — Slow fetch overwrites fast fetch result. Fix it.
62. 🔴 **Cancel-on-Unmount** — `setState` after unmount warning. Fix with `AbortController`.
63. 🟡 **Retry with Backoff** — Fetch wrapper, 3 retries, increasing delay.
64. 🟡 **Polling Hook** — `usePolling(fn, interval)` that stops cleanly on unmount.
65. 🔴 **Cache-Then-Network** — Show cached data immediately, silently refetch, update on diff.
66. 🟡 **Parallel vs Sequential Fetches** — `Promise.all` vs sequential `await`, timing logs.
67. 🔴 **Dependent Fetch Chain** — Fetch user → fetch their posts. Model each loading state.
68. 🟡 **Optimistic List Add/Remove** — Add immediately, roll back on failure.
69. 🔴 **Deduping In-Flight Requests** — Two components requesting the same resource → one network call.
70. 🟡 **Error Boundary + Async Errors** — Why Error Boundaries don't catch async errors, and how to handle them.

### Section 8 — Streaming & Agent UI Fundamentals

71. 🟢 **Typewriter From a String** — Reveal a string one character at a time with `setInterval`. The hello world of agent UIs.
72. 🟡 **Real SSE Consumer** — Connect to a Server-Sent Events endpoint, render chunks live.
73. 🟡 **Cancelable Stream** — "Stop generating" button that actually aborts via `AbortController`.
74. 🔴 **Concurrent Message Streams** — Two streams arriving interleaved. Chunks never bleed between messages.
75. 🟡 **Batched Token Renderer** — 50ms batching window instead of per-token `setState`. Measure re-render count.
76. 🔴 **Restart Mid-Stream** — New message while previous stream is running. Old stream discarded cleanly.
77. 🟡 **Streaming Markdown Renderer** — Live markdown that updates without the block flickering.
78. 🔴 **Tool Call Visualizer** — `tool_call_start` → streamed args → `tool_call_result` events render a live card.
79. 🟡 **Loading State Machine** — `idle → thinking → streaming → tool_call → done/error` with `useReducer`.
80. 🔴 **Mock AG-UI Event Bus** — Typed event emitter simulating AG-UI events on a timer. Component subscribes and renders.

### Section 9 — Protocol-Level Agent Infra

81. 🔴 **Hand-Rolled AG-UI Client** — Parse a stream of typed JSON events into rendered UI, no library.
82. 🔴 **State Snapshot vs Delta** — `STATE_SNAPSHOT` replace vs `STATE_DELTA` patch-merge. Why deltas win at scale.
83. 🔴 **Custom Tool Renderer Registry** — `registerToolRenderer('search_flights', Component)` so different tools get different UI.
84. 🔴 **Trusted Proxy Pattern (BFF)** — Why your React app shouldn't call the agent runtime directly. Build the thin Node proxy.
85. 🔴 **Token Cost Meter** — Live "$ spent so far" counter from a stream of tokens + a cost constant.
86. 🔴 **Speculative UI / Pre-fill from Streamed Args** — Tool call arguments stream in before the call finishes. Pre-fill the UI progressively.
87. 🟡 **Reconnect on Drop** — Simulate a dropped SSE connection. Reconnect and resume gracefully.
88. 🔴 **Guardrail UI Pattern** — Tool call requires confirmation before executing. Human-in-the-loop, rendered.
89. 🟡 **Multi-Agent Tabbed View** — Two agents streaming simultaneously into separate panels without state bleeding.
90. 🔴 **Execution Trace Exporter** — Capture every event the mock agent emits, export as JSON.

### Section 10 — Mini Systems

91. 🔴 **Build Your Own `useState`** — Module-level array + index pointer. Mind-bending, very high signal.
92. 🔴 **Build Your Own `useReducer`** — Same exercise, layered on top of #91.
93. 🔴 **Mini Pub-Sub Store (Zustand-lite)** — `createStore` returning `getState, setState, subscribe` + a `useStore` hook.
94. 🔴 **Mini Redux** — Reducer + dispatch + Context + a `connect`-style HOC. Feel why Redux exists.
95. 🟡 **Mini React Query** — `useQuery(key, fetchFn)` with in-memory cache and `staleTime`.
96. 🔴 **Mini Router** — `useState` + `history.pushState`, 3 routes, no library.
97. 🟡 **Event Emitter From Scratch** — `on, off, emit`. Realise this is the backbone of the AG-UI bus in #80.
98. 🔴 **Mini Signals (Fine-Grained Reactivity)** — `createSignal, createEffect` outside React. Relate to Fiber internals.
99. 🔴 **Dependency Graph Resolver** — Topological sort for `{id, dependsOn[]}` tasks. Directly reusable for DAG/orchestration work.
100. 🔴🌱 **Hanachi's First Breath** — Combine #79 (state machine) + #90 (trace exporter) + #43 (HOC/hook) into the MVP of Hanachi: a component that reacts to a mock agent's live event stream. This is where the drills become a portfolio.
