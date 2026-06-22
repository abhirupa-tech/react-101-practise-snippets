# 100 Unassisted Coding Drills: React Fundamentals → Agent UI Infra

**Rules of engagement:**
- No AI autocomplete, no Copilot, no asking Claude for the answer.
- Time-box each one (15–45 min depending on weight). If you blow the box, stop, note the gap, move on.
- Say it out loud when done: explain what you built in under 90 seconds like a panel just asked.
- Difficulty: 🟢 warm-up · 🟡 real rust-check · 🔴 senior-bar / staff-signal

---

## Section 1 — React Core Mechanics (the "do you actually know why" set)

1. 🟢 **The Liar's Counter** — Build a counter where clicking +1 three times fast only increments once visually until a re-render forces it. Explain *why* batching does this.
2. 🟢 **Key Crime Scene** — Render a list using array index as `key`, then reorder/filter it and watch state attached to list items scramble. Fix it. Explain the reconciliation bug in one sentence.
3. 🟡 **The Stale Closure Trap** — Write a `setInterval`-based counter inside `useEffect` that "freezes" at 1 due to a stale closure. Then fix it two different ways (functional update vs. ref).
4. 🟡 **Strict Mode Double-Fire** — Build a component that calls an API in `useEffect` and visibly logs the double-invoke in dev Strict Mode. Explain why it's safe in prod.
5. 🟡 **useLayoutEffect or Bust** — Build a tooltip that flickers/jumps with `useEffect` measuring DOM position, then fix the flicker by switching to `useLayoutEffect`.
6. 🔴 **Controlled Chaos** — Build the same text input as both controlled and uncontrolled, then deliberately break the controlled one by forgetting `onChange`. Narrate the React warning from memory.
7. 🟢 **Fragment Detective** — Render a list of siblings without a wrapper `div` using `<>...</>`, then explain when you'd be forced to use `React.Fragment` with a `key` instead.
8. 🟡 **Portal to the Underworld** — Build a modal using `createPortal` that escapes a `overflow: hidden` parent. Explain why a regular nested div couldn't.
9. 🟡 **Event Pooling Ghost Story** — Log a synthetic event object asynchronously (after a `setTimeout`) and explain what you see and why (React 17+ vs older behavior).
10. 🔴 **Render Count Detective** — Add a render counter (via `useRef`) to 3 nested components and figure out, by reasoning alone before testing, which ones re-render when a grandparent's unrelated state changes.

---

## Section 2 — Hooks From Scratch (build the thing the library hides from you)

11. 🟡 **`useDebounce`** — From scratch, no lodash. Use it on a search input that hits a fake API.
12. 🟡 **`useThrottle`** — From scratch. Use it on a scroll handler.
13. 🟡 **`usePrevious`** — Track and display the previous value of a piece of state.
14. 🟡 **`useToggle`** — Tiny, but explain why you'd extract this instead of inlining `!state`.
15. 🔴 **`useFetch` with Abort** — Custom data-fetching hook with loading/error/data states AND `AbortController` cleanup on unmount.
16. 🔴 **`useLocalStorage` Sync Hook** — Persist state to localStorage, sync across multiple components reading the same key.
17. 🟡 **`useOnClickOutside`** — Classic dropdown-closer. Build it with refs + event listeners, clean up properly.
18. 🔴 **`useInterval` the Dan Abramov Way** — Implement the ref-based pattern that solves the stale closure problem from Drill #3, generically.
19. 🟡 **`useMediaQuery`** — Responsive hook reacting to window resize, no library.
20. 🔴 **`useUndo`** — A hook that gives you `state, setState, undo, redo` with a history stack. (This is secretly a mini reducer pattern — notice that.)

---

## Section 3 — State, Re-renders & Memoization (the interview-killer topics)

21. 🟢 **Memo Myth-Buster** — Build a component wrapped in `React.memo` that *still* re-renders every time because you pass an inline arrow function as a prop. Fix it with `useCallback`.
22. 🟡 **The Expensive Calculation** — Build a component with a deliberately slow function (nested loop), wire it with and without `useMemo`, and visibly show the lag difference.
23. 🟡 **Object Identity Trap** — Pass `{ a: 1 }` inline as a prop every render, prove via console logs that it breaks memoization, fix with `useMemo`.
24. 🔴 **Context Re-render Bomb** — Build a Context Provider wrapping 5 consumers; change one piece of context state and prove ALL consumers re-render. Then split context to fix it.
25. 🟡 **Lifting State Properly** — Take two sibling components silently duplicating the same state and lift it to the right common ancestor — no Context, no library.
26. 🔴 **Derived State Anti-Pattern** — Build a component that wrongly copies a prop into state via `useState(prop)`, show the bug when prop changes, then fix it by deriving instead of storing.
27. 🟡 **Reducer Refactor** — Take a component with 5 separate `useState` calls that always update together, refactor into one `useReducer`.
28. 🔴 **The `key` Reset Trick** — Use a changing `key` prop to intentionally force-remount a component and reset all its internal state, on purpose, as a pattern (not a bug this time).
29. 🟡 **Batched vs Unbatched** — Trigger 2 state updates inside a native DOM event listener (not a React handler) and observe they're NOT batched pre-React 18. Explain `flushSync`.
30. 🔴 **Diffing Two Lists** — Without React, by hand, write the pseudocode/logic for how React's reconciler decides whether to update vs. replace a list item given old/new arrays + keys.

---

## Section 4 — Forms, Events & Real-World Inputs

31. 🟢 **Controlled Form Survival Kit** — Multi-field form (text, checkbox, select, radio) all controlled, single `handleChange` using `name` attribute.
32. 🟡 **Debounced Live Validation** — Email field that validates 400ms after the user stops typing, shows inline error.
33. 🟡 **File Upload Preview** — Controlled file input showing an image preview before upload, using `FileReader` or object URLs.
34. 🟡 **Multi-Step Wizard** — 3-step form with state preserved across steps and a progress indicator, no router.
35. 🔴 **Optimistic Form Submit** — Submit a form, immediately show success UI, then roll back gracefully if the (fake, delayed) API call fails.
36. 🟢 **Keyboard Navigable List** — Arrow-key up/down navigation through a list of items, Enter to "select."
37. 🟡 **Drag to Reorder** — Basic drag-and-drop reordering of a list using native HTML5 drag events (no library).
38. 🟡 **Custom Checkbox Group with "Select All"** — Indeterminate checkbox state included.
39. 🔴 **Debounced Autosave** — A textarea that "saves" to a fake backend 1s after typing stops, shows a "Saving… / Saved" status, cancels in-flight saves correctly.
40. 🟡 **Accessible Modal Focus Trap** — Modal that traps Tab focus inside it and returns focus to the trigger button on close.

---

## Section 5 — Component Design Patterns

41. 🟡 **Compound Components** — Build `<Tabs><Tab/><Tab/></Tabs>` using Context internally, no prop drilling.
42. 🔴 **Render Props Pattern** — Build a `<MouseTracker render={(pos) => ...} />` component, then explain why hooks mostly replaced this pattern.
43. 🟡 **Higher-Order Component** — Write a `withLoading(Component)` HOC, then rewrite the same logic as a hook and compare.
44. 🟡 **Polymorphic Component (`as` prop)** — A `<Button as="a">` that renders different elements based on a prop, with correct TypeScript typing.
45. 🔴 **Slot Pattern** — Build a `<Card>` component accepting `header`, `footer`, and `children` as distinct named slots.
46. 🟡 **Controlled/Uncontrolled Hybrid** — Build one component that works BOTH controlled (`value`+`onChange` passed) and uncontrolled (internal state) depending on what's passed in.
47. 🟢 **Skeleton Loader Component** — Generic `<Skeleton width height />` reusable across different shapes.
48. 🔴 **Error Boundary From Scratch** — Class component implementing `componentDidCatch`, wrapping a component that deliberately throws, with a fallback UI.
49. 🟡 **Provider Pattern for Theming** — Light/dark theme via Context + a `useTheme()` hook, no external lib.
50. 🔴 **Headless Component** — Build a `useAccordion()` hook that returns state + handlers only, with ZERO markup, then render two completely different-looking accordions using it.

---

## Section 6 — Performance & Rendering Internals

51. 🟡 **Virtualized List, By Hand** — Render only the visible rows of a 10,000-item list based on scroll position (the windowing math, no `react-window`).
52. 🔴 **Code-Splitting with Suspense** — `React.lazy()` + `<Suspense fallback>` for a route, visibly show the loading boundary.
53. 🟡 **Image Lazy Load with IntersectionObserver** — No library, native observer.
54. 🔴 **Concurrent Rendering Demo** — Use `useTransition` to keep a search input responsive while filtering a huge list, show the difference with/without it.
55. 🟡 **Avoiding Prop Drilling Without Context** — Refactor a 4-level-deep prop chain using component composition instead of Context (the "right" first fix before reaching for Context).
56. 🔴 **`useDeferredValue` Race** — Build a UI where stale results visibly persist briefly during fast typing, intentionally, to understand the trade-off.
57. 🟡 **Bundle Diet** — Take a component importing a whole library for one function, replace with a native equivalent, and explain bundle size impact.
58. 🟡 **Memoized Selector Pattern** — Mimic Redux/Reselect-style derived-state memoization manually with `useMemo`.
59. 🔴 **Profiler API Hunt** — Use React's `<Profiler>` component to actually measure and log render durations of a suspect component.
60. 🟡 **Animation Without Re-render** — Animate something (e.g. a progress bar) using refs + direct DOM manipulation instead of state, and explain why that avoids re-renders.

---

## Section 7 — Async, Data Fetching & Race Conditions

61. 🟡 **The Classic Race Condition** — Fire two fetches for different search terms in quick succession, show the slow one overwriting the fast one's correct result, then fix it.
62. 🔴 **Cancel-on-Unmount** — A fetch inside `useEffect` that updates state after the component has already unmounted — show the warning, then fix with cleanup/AbortController.
63. 🟡 **Retry with Backoff** — A fetch wrapper that retries a failing fake endpoint 3 times with increasing delay.
64. 🟡 **Polling Hook** — `usePolling(fn, interval)` that stops cleanly on unmount or on a `stop()` call.
65. 🔴 **Cache-Then-Network** — Show cached data immediately, then silently refetch and update if new data differs (basic SWR-style behavior, hand-rolled).
66. 🟡 **Parallel vs Sequential Fetches** — Fetch 3 independent resources in parallel with `Promise.all`, then show why sequential `await` would be slower, with timing logs.
67. 🔴 **Dependent Fetch Chain** — Fetch a user, then use their ID to fetch their posts — model the loading states correctly for each stage.
68. 🟡 **Optimistic List Add/Remove** — Add an item to a list immediately, roll back if the fake API call fails.
69. 🔴 **Deduping In-Flight Requests** — Two components both request the same resource simultaneously; ensure only ONE network call fires (hand-rolled, no React Query).
70. 🟡 **Error Boundary + Async Errors** — Show why Error Boundaries do NOT catch errors inside event handlers or async callbacks, and demonstrate the correct way to handle those.

---

## Section 8 — Streaming & Agent UI Fundamentals (your specialization, warm-up tier)

71. 🟢 **Typewriter From a String** — Fake "streaming" by revealing a hardcoded string one character at a time with `setInterval`. The "hello world" of agent UIs.
72. 🟡 **Real SSE Consumer** — Connect to a real Server-Sent Events endpoint (or a tiny Express server you spin up) and render incoming chunks live.
73. 🟡 **Cancelable Stream** — Add a "Stop generating" button that actually aborts an in-progress fetch stream (`AbortController` + `ReadableStream`).
74. 🔴 **Concurrent Message Streams** — Two streaming "agent messages" arriving interleaved; make sure chunks never merge into the wrong message bubble.
75. 🟡 **Batched Token Renderer** — Render incoming stream tokens with a 50ms batching window instead of per-token `setState`, and measure re-render count before/after.
76. 🔴 **Restart Mid-Stream** — User sends a new message while a previous stream is still running — old stream must be discarded/ignored cleanly, not race into the new message.
77. 🟡 **Streaming Markdown Renderer** — Render streamed text as Markdown that updates live without the whole block flickering/remounting each chunk.
78. 🔴 **Tool Call Visualizer** — Mock an agent response containing `tool_call_start` → `tool_call_args` (streamed in pieces) → `tool_call_result` events; render a live-updating "card" for the tool call.
79. 🟡 **Loading State Machine** — Model an agent's lifecycle (`idle → thinking → streaming → tool_call → done/error`) with `useReducer`, not a pile of booleans.
80. 🔴 **Mock AG-UI Event Bus** — Build a tiny typed event emitter that simulates AG-UI's `TEXT_MESSAGE_START/CONTENT/END` and `TOOL_CALL_*` events on a timer, and a component that subscribes and renders accordingly.

---

## Section 9 — Protocol-Level Agent Infra (the differentiator tier)

81. 🔴 **Hand-Rolled AG-UI Client** — Implement a minimal client that parses a stream of typed JSON events (`text_message_content`, `tool_call_start`, etc.) into rendered UI, no library.
82. 🔴 **State Snapshot vs Delta** — Implement both a full `STATE_SNAPSHOT` replace and a `STATE_DELTA` patch-merge for agent state, and show why deltas are more efficient at scale.
83. 🔴 **Custom Tool Renderer Registry** — Build a `registerToolRenderer('search_flights', Component)` system so different tool calls render different custom UI — the "Custom Tool Renderers" post, made real.
84. 🔴 **Trusted Proxy Pattern (BFF)** — Stub out (architecturally, even just in comments/structure) why your React app should never call the agent runtime directly, and build the thin Node proxy layer that should sit between them.
85. 🔴 **Token Cost Meter** — Given a stream of tokens with a per-token cost constant, build a live-updating "$ spent so far" counter — the seed of your "Cost-Aware Frontend Architecture" post.
86. 🔴 **Speculative UI / Pre-fill from Streamed Args** — As tool call *arguments* stream in (before the call completes), progressively pre-fill a form/UI with partial data.
87. 🟡 **Reconnect on Drop** — Simulate a dropped SSE/WebSocket connection mid-stream and implement reconnect-and-resume logic (even if "resume" just means restart gracefully with a clear UI state).
88. 🔴 **Guardrail UI Pattern** — Build a UI affordance that intercepts a tool call requiring "confirmation" (e.g. `delete_record`) and blocks execution until the user approves — human-in-the-loop, rendered.
89. 🟡 **Multi-Agent Tabbed View** — Render two independent simulated agents streaming simultaneously into separate panels without their state bleeding into each other.
90. 🔴 **Execution Trace Exporter** — Capture every event your mock agent emits into an array, then export it as JSON — this IS your "Agent State Inspector" portfolio project's core engine.

---

## Section 10 — Mini Systems (build the library to understand the library)

91. 🔴 **Build Your Own `useState`** — Implement a fake `useState` using a module-level array + index pointer (the classic "build your own React hooks" exercise). Mind-bending, very high signal.
92. 🔴 **Build Your Own `useReducer`** — Same exercise, layered on top of #91.
93. 🔴 **Mini Pub-Sub Store (Zustand-lite)** — `createStore(initialState)` returning `getState`, `setState`, `subscribe` — then a `useStore` hook wrapping it.
94. 🔴 **Mini Redux (Reducer + Dispatch + Context)** — Combine reducer + Context + a `connect`-style HOC, by hand, to actually feel why Redux exists.
95. 🟡 **Mini React Query (Cache + Stale Time)** — A `useQuery(key, fetchFn)` hook with in-memory cache and a `staleTime` before refetching.
96. 🔴 **Mini Router** — `useState` + `window.history.pushState` based router supporting 3 routes, no library.
97. 🟡 **Event Emitter From Scratch** — `on`, `off`, `emit` — then realize this is the backbone of drill #80's mock AG-UI bus.
98. 🔴 **Mini Signals (Fine-Grained Reactivity)** — Implement a tiny signal/effect system (`createSignal`, `createEffect`) outside React, then explain how this relates to React Fiber's internals and libraries like `bippy`.
99. 🔴 **Dependency Graph Resolver** — Given a list of `{id, dependsOn: []}` tasks, write a topological sort to determine valid execution order — directly reusable for any future DAG/orchestration work.
100. 🔴🌱 **Hanachi's First Breath** — Combine drills #79 (state machine), #90 (trace exporter), and #43 (HOC/hook pattern) into the actual MVP of Hanachi: a component that visibly reacts (idle/thinking/streaming/error) to a mock agent's live event stream. This is where every drill above stops being an exercise and becomes your portfolio.

---

## How to Use This

- **Weeks 1–2:** Sections 1–3 (core mechanics, hooks, re-renders). This is your diagnostic-driven de-rust zone.
- **Weeks 2–3:** Sections 4–6 (forms, patterns, performance). Pick based on what you fumbled in the diagnostic.
- **Week 3:** Section 7 (async/race conditions) — these come up constantly in senior interviews.
- **Week 3–4:** Sections 8–9 (streaming + protocol-level) — this is also your research + portfolio build, not separate work.
- **Anytime you want a "build the library" deep-dive day:** Section 10. These are the highest staff-level signal but also the most fun once you're warmed up — #91/#92 in particular will make you feel like you finally understand React, not just use it.

Don't do these in a vacuum — narrate each one out loud after building it, like a panel just asked "walk me through this."
