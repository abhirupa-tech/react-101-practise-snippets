/**
 * Per-drill educational context shown in the EducationCard on each task page.
 * Keys match the task slug from tasks.json.
 */
export interface Concept {
  /** 1–2 sentence core idea behind the drill. */
  summary: string;
  /** 2–3 bullet points expanding on the concept. */
  keyPoints: string[];
  /** The single most common mistake developers make here. */
  watchFor?: string;
}

export const concepts: Record<string, Concept> = {

  // ── Section 1: React Core Mechanics ────────────────────────────────────────

  'the-liars-counter': {
    summary: 'React batches multiple setState calls in the same event handler into one re-render. Reading `count` then calling `setCount(count + 1)` three times all read the same stale snapshot — the functional updater `c => c + 1` chains off the latest queued value instead.',
    keyPoints: [
      'setState enqueues an update — the actual re-render happens later',
      'The functional form reads from the update queue, not the render snapshot',
      'React 18 batches everywhere: event handlers, setTimeout, promises, native events',
    ],
    watchFor: 'Reading state immediately after setState still gives the old value — you\'re reading the snapshot from this render, not the next one.',
  },

  'key-crime-scene': {
    summary: 'React uses the `key` prop to match old elements to new ones between renders. Array-index keys tie identity to position — remove item 0 and every item shifts key, so React reuses the wrong DOM node and local state follows the slot, not the data.',
    keyPoints: [
      'key is React\'s identity hint, not a position hint',
      'Local state (checkboxes, focus, scroll) lives with the key, not the data item',
      'Use stable IDs as keys; index is only safe for static, never-reordered lists',
    ],
    watchFor: 'The bug is invisible in the DOM — you have to inspect local state (checked boxes, input values) to see it.',
  },

  'the-stale-closure-trap': {
    summary: '`useEffect` callbacks close over variables at the time they\'re created. A `setInterval` created on mount captures `count = 0` forever, so `count + 1` always computes `1`. The fix: use a functional updater that doesn\'t need to read `count`, or mirror the value in a ref.',
    keyPoints: [
      'Every render creates a new closure — the interval only sees the one it was born in',
      'Functional updater `c => c + 1` operates on the latest queued value without closing over state',
      'A ref (`countRef.current = count`) always holds the latest value and doesn\'t need to be in the dep array',
    ],
    watchFor: 'Adding `count` to the dep array "fixes" the stale closure but creates a new interval every render — that\'s not the right fix.',
  },

  'strict-mode-double-fire': {
    summary: 'React 18 Strict Mode intentionally mounts, unmounts, then remounts every component in development to surface bugs caused by effects that aren\'t properly cleaned up. In production, each component mounts exactly once.',
    keyPoints: [
      'The double-mount is dev-only — production never sees it',
      'It exists to force you to write correct cleanup so remounting is safe',
      'AbortController or an `ignored` flag in cleanup makes the second call a no-op',
    ],
    watchFor: 'If your code breaks on double-mount, the bug already existed — Strict Mode just made it visible.',
  },

  'uselayouteffect-or-bust': {
    summary: '`useEffect` runs after the browser has painted, so positioning based on DOM measurements causes a visible flicker. `useLayoutEffect` runs synchronously after DOM mutations but before paint, eliminating the flash.',
    keyPoints: [
      'Paint order: render → DOM mutation → useLayoutEffect → browser paint → useEffect',
      'useLayoutEffect blocks paint — use it only for DOM reads/writes that must happen before the user sees anything',
      'useLayoutEffect doesn\'t run on the server; prefer useEffect for SSR-compatible code',
    ],
    watchFor: 'Don\'t reach for useLayoutEffect by default — it can hurt performance. Only use it when you actually need to prevent a visible flicker.',
  },

  'controlled-chaos': {
    summary: 'A controlled input delegates value ownership to React state. Passing `value` without `onChange` makes React own the value but you can\'t change it — the input is read-only, not uncontrolled. Uncontrolled inputs use a ref, not state.',
    keyPoints: [
      'Controlled: value is in state, onChange keeps state in sync with user input',
      'Uncontrolled: value lives in the DOM, accessed via ref when needed',
      'Mixing them (e.g., switching value from undefined to a string) causes a React warning',
    ],
    watchFor: 'Forgetting onChange on a controlled input doesn\'t make it uncontrolled — it makes it silently broken.',
  },

  'fragment-detective': {
    summary: 'Fragments let you return multiple elements without adding an extra DOM node. The `<></>` shorthand is fine everywhere except when you need a `key` prop — for that you must use the explicit `<React.Fragment key={...}>` form.',
    keyPoints: [
      '<></> is syntactic sugar for <React.Fragment> with no props',
      'key is the only prop Fragment accepts, and it requires the long form',
      'Fragments are useful inside tables, flex containers, and anywhere an extra div would break layout',
    ],
  },

  'portal-to-the-underworld': {
    summary: '`createPortal(children, domNode)` renders children into a different part of the DOM while keeping them inside the React tree. Events bubble through the React tree (not the DOM tree), and Context still works across the portal.',
    keyPoints: [
      'The portal\'s DOM parent is the target node, but its React parent is where it was rendered',
      'overflow:hidden on an ancestor only clips DOM descendants — the portal escapes because it\'s rendered elsewhere in the DOM',
      'Focus management, event bubbling, and context all follow the React tree, not the DOM tree',
    ],
    watchFor: 'Forgetting to manage focus when opening a portal-based modal is a common accessibility bug.',
  },

  'event-pooling-ghost-story': {
    summary: 'React used to "pool" synthetic events — reusing the same object across handlers and nullifying its properties after the handler returned. React 17 dropped pooling, so accessing event properties asynchronously now works fine.',
    keyPoints: [
      'In React ≤16, event.target became null after the handler — you had to call e.persist() to keep it',
      'React 17+ native events are wrapped once and not recycled',
      'You may still see old blog posts advising e.persist() — it\'s a no-op in modern React',
    ],
    watchFor: 'Code written for React 16 that calls e.persist() still works but does nothing — don\'t copy that pattern into new code.',
  },

  'render-count-detective': {
    summary: 'A component re-renders when its own state changes OR when its parent re-renders (unless wrapped in React.memo). Re-renders cascade down the tree by default — props don\'t have to change.',
    keyPoints: [
      'Re-render ≠ DOM update — React re-renders to diff; the DOM only changes if the output differs',
      'React.memo wraps a component so it skips re-render if props are shallowly equal',
      'Context consumers re-render when the context value changes, regardless of memo',
    ],
    watchFor: 'Unnecessary re-renders rarely cause visible bugs — profile before optimizing.',
  },

  // ── Section 2: Hooks From Scratch ──────────────────────────────────────────

  'usedebounce': {
    summary: 'Debouncing delays a value update until a pause in input. The hook sets a timeout on every value change and clears the previous one — only the last value after a quiet period makes it through.',
    keyPoints: [
      'The cleanup function in useEffect cancels the pending timeout on every new value',
      'The debounced value lags behind the live value by the delay duration',
      'Debounce is for "wait until they stop" — throttle is for "fire at most once per interval"',
    ],
    watchFor: 'Not clearing the timeout in cleanup leaks timers on every keystroke — especially bad in strict mode.',
  },

  'usethrottle': {
    summary: 'Throttling limits how often a value can change — at most once per interval, no matter how frequently the source fires. Useful for scroll and resize handlers that would otherwise flood the event queue.',
    keyPoints: [
      'A ref tracks whether the throttle window is active to avoid stale closure issues',
      'Unlike debounce, throttle fires immediately and then blocks further updates during the window',
      'Use useCallback or a ref for the callback to avoid re-creating the throttle on every render',
    ],
  },

  'useprevious': {
    summary: 'A ref captures a value without triggering re-renders. By updating the ref in a useEffect (which runs after render), it always holds the value from the previous render.',
    keyPoints: [
      'useRef changes don\'t cause re-renders — that\'s the key property exploited here',
      'The update runs after render, so during the render the ref still holds the previous value',
      'Useful for animating between old and new values, or detecting direction of change',
    ],
  },

  'usetoggle': {
    summary: 'A hook that encapsulates a boolean with a stable toggle function. Extracting it avoids the `!state` inline everywhere and ensures the functional updater form is always used.',
    keyPoints: [
      'The toggle function uses `prev => !prev` so it\'s always correct even in batched updates',
      'The returned toggle is stable across renders if created with useCallback',
      'Small hooks compose well — useToggle is often the foundation of useModal, useAccordion, etc.',
    ],
  },

  'usefetch-with-abort': {
    summary: '`AbortController` lets you cancel an in-flight fetch. The controller\'s signal is passed to fetch, and the cleanup function calls `abort()` — so navigating away or unmounting cancels the request automatically.',
    keyPoints: [
      'Each effect run should create a fresh AbortController — don\'t reuse across renders',
      'After abort, the fetch rejects with an AbortError — check for it before setting error state',
      'Without abort, a slow request can still setState on an unmounted component',
    ],
    watchFor: 'Not differentiating AbortError from real errors — show an error message only for real failures.',
  },

  'uselocalstorage-sync-hook': {
    summary: 'Syncing multiple components to the same localStorage key requires listening for the `storage` window event (fires when other tabs or components write) and parsing JSON safely on every read.',
    keyPoints: [
      'The storage event only fires in other tabs by default — to sync within the same tab you may need a custom event or a shared store',
      'Always wrap JSON.parse in try/catch — a corrupt value would break every subscriber',
      'Initialize from localStorage once, then keep state in sync via useEffect',
    ],
    watchFor: 'SSR: localStorage doesn\'t exist on the server — guard with typeof window !== "undefined".',
  },

  'useonclickoutside': {
    summary: 'Attaching a mousedown listener to the document and checking whether the click target is outside a ref\'d element is the canonical "click outside to close" pattern. The listener must be removed in cleanup.',
    keyPoints: [
      'Use mousedown instead of click to fire before the element\'s own click handler',
      'node.contains(event.target) handles clicking on children of the ref\'d element',
      'The callback passed in must be stable (wrapped in useCallback) or the effect re-attaches every render',
    ],
  },

  'useinterval-the-dan-abramov-way': {
    summary: 'Store the callback in a ref and update it on every render. The interval reads from the ref rather than closing over the callback — so it always calls the latest version without needing to restart.',
    keyPoints: [
      'The interval is created once (dep array is just [delay])',
      'callbackRef.current is updated on every render via a separate effect',
      'This pattern generalises the fix from Drill #3 to any repeating side effect with a changing callback',
    ],
  },

  'usemediaquery': {
    summary: '`window.matchMedia` returns a MediaQueryList you can subscribe to. The hook reads the initial match, then listens for changes and updates state — and cleans up the listener on unmount.',
    keyPoints: [
      'matchMedia.matches gives the current state; the change event fires when it flips',
      'SSR: matchMedia doesn\'t exist on the server — default to a safe value (usually false)',
      'Prefer this over a resize listener — it fires exactly when the breakpoint crosses, not on every pixel',
    ],
  },

  'useundo': {
    summary: 'An undo/redo history is naturally modelled as a stack of past states plus a pointer to the present. useReducer is a cleaner fit than multiple useState calls because every action is a pure transformation of the history object.',
    keyPoints: [
      'State shape: { past: T[], present: T, future: T[] }',
      'Undo: pop from past, push current onto future, set present to popped value',
      'Redo: pop from future, push current onto past, set present to popped value',
    ],
    watchFor: 'Calling setState replaces the present and clears the future — that\'s correct undo semantics.',
  },

  // ── Section 3: State, Re-renders & Memoization ─────────────────────────────

  'memo-myth-buster': {
    summary: '`React.memo` bails out of re-renders when props are shallowly equal. A new inline arrow function is a new object reference on every render, so the memo check always fails. `useCallback` returns a stable reference across renders.',
    keyPoints: [
      'Shallow equality: primitives are compared by value, objects/functions by reference',
      'useCallback(fn, deps) returns the same function reference until deps change',
      'memo only helps when the parent re-renders for unrelated reasons — if the parent\'s relevant state changed, the child probably should re-render too',
    ],
    watchFor: 'memo + useCallback adds complexity. Profile first — unnecessary re-renders are rarely the bottleneck.',
  },

  'the-expensive-calculation': {
    summary: '`useMemo` memoizes the result of an expensive function, recomputing only when its dependencies change. Without it, the function runs on every render — even when its inputs haven\'t changed.',
    keyPoints: [
      'useMemo(fn, deps) — fn runs on mount and whenever deps change',
      'The dependency array must include every variable the function reads',
      '"Expensive" means measurably slow — a nested loop over thousands of items, not a simple filter',
    ],
    watchFor: 'useMemo itself has overhead. For fast computations, the memoization cost may exceed the calculation cost.',
  },

  'object-identity-trap': {
    summary: 'Every render creates a new `{}` literal — even with identical contents. Referential equality (`===`) fails for objects and arrays, so inline object props break memo and useCallback dependencies every render.',
    keyPoints: [
      '`{ a: 1 } === { a: 1 }` is false — different objects in memory',
      'useMemo stabilizes an object reference: `useMemo(() => ({ a: 1 }), [])`',
      'The same trap applies to arrays passed as props: `[]` creates a new array on every render',
    ],
  },

  'context-re-render-bomb': {
    summary: 'Every consumer of a Context re-renders when the context value changes — even if the specific piece it reads didn\'t change. Splitting one large context into multiple focused contexts limits the blast radius.',
    keyPoints: [
      'Context change triggers every consumer, regardless of which part of the value they use',
      'Split context by update frequency: frequent state in one context, stable config in another',
      'Alternatively, memoize the value with useMemo to avoid new object references on every render',
    ],
    watchFor: 'Don\'t split context prematurely — measure first. Too many providers add cognitive overhead.',
  },

  'lifting-state-properly': {
    summary: 'When two siblings need to share state, lift it to their lowest common ancestor. The parent owns the state, passes it down as props, and passes a setter so children can update it.',
    keyPoints: [
      'The closest common ancestor is the right place — don\'t lift higher than needed',
      'Lifting avoids syncing two separate states that must always agree',
      'If lifting requires passing through many layers, that\'s a signal to consider Context — but try composition first',
    ],
  },

  'derived-state-anti-pattern': {
    summary: 'Copying a prop into state with `useState(prop)` only uses the prop as the initial value — subsequent prop changes are ignored. Derive the value during render instead of storing it.',
    keyPoints: [
      'useState initializer runs once on mount — prop changes after that don\'t update the state',
      'If a value can be computed from props/state, compute it during render — no state needed',
      'If you genuinely need to reset on prop change, use a key or useEffect (with care)',
    ],
    watchFor: 'Using useEffect to sync derived state is a code smell — it causes a double render and is rarely the right fix.',
  },

  'reducer-refactor': {
    summary: '`useReducer` is better than multiple `useState` calls when several pieces of state always change together. A reducer centralizes the update logic and makes every valid transition explicit.',
    keyPoints: [
      'useReducer(reducer, initialState) returns [state, dispatch]',
      'Dispatch an action object; the reducer returns the next state',
      'Reducers are pure — no side effects, no async — they just compute the next state',
    ],
    watchFor: 'Don\'t reach for useReducer for simple independent values — it\'s overhead for one boolean.',
  },

  'the-key-reset-trick': {
    summary: 'Changing the `key` prop of a component causes React to unmount the old instance and mount a fresh one — resetting all internal state. This is the cleanest way to reset a complex component without threading a reset callback through it.',
    keyPoints: [
      'key change = unmount old component + mount new one (full lifecycle reset)',
      'Useful for form resets, animation replays, and editor instances',
      'The parent controls the key — the child doesn\'t need to know it\'s being reset',
    ],
    watchFor: 'Unstable keys (like Math.random()) cause components to remount on every render — always use stable values.',
  },

  'batched-vs-unbatched': {
    summary: 'Before React 18, state updates inside native event listeners, setTimeout, or promises were NOT batched — each triggered a separate re-render. React 18 batches everything by default. `flushSync` lets you opt out when you need synchronous DOM updates.',
    keyPoints: [
      'React 18: all setState calls batch by default, everywhere',
      'flushSync(() => setState(...)) forces a synchronous re-render immediately',
      'flushSync is rare — usually needed when reading a DOM measurement right after a state update',
    ],
  },

  'diffing-two-lists': {
    summary: 'React\'s reconciler compares old and new element lists by key. Matching keys → update in place. New key → mount. Missing key → unmount. Without keys, React falls back to index-based matching which causes the bugs in Drill #2.',
    keyPoints: [
      'With keys: O(n) diff — React builds maps and looks up by key',
      'Without keys: index-by-index comparison — moves look like delete + insert',
      'This is why key must be stable and unique within the list',
    ],
  },

  // ── Section 4: Forms, Events & Real-World Inputs ───────────────────────────

  'controlled-form-survival-kit': {
    summary: 'A single `handleChange` using `e.target.name` and `e.target.value` (or `checked` for checkboxes) can manage all form fields via computed property names: `setState(prev => ({ ...prev, [name]: value }))`.',
    keyPoints: [
      'Name the inputs with the `name` attribute matching the state key',
      'Checkboxes use e.target.checked, not e.target.value',
      'Controlled inputs give you validation, formatting, and conditional UI for free',
    ],
  },

  'debounced-live-validation': {
    summary: 'Validate on a delay after the user stops typing to avoid showing errors mid-word. The validation runs only when the debounced value settles — not on every keystroke.',
    keyPoints: [
      'Separate the live input value (shown immediately) from the debounced value (validated)',
      'Clear the error when the field is empty or while the user is still typing',
      'Mark the field as "touched" on blur to avoid showing errors on fresh fields',
    ],
    watchFor: 'Validating in the onChange handler directly triggers on every keystroke — debounce first.',
  },

  'file-upload-preview': {
    summary: '`URL.createObjectURL(file)` creates a temporary blob URL for immediate preview without uploading. Alternatively, `FileReader.readAsDataURL` converts to a base64 data URL. Both need cleanup to avoid memory leaks.',
    keyPoints: [
      'URL.createObjectURL is synchronous and fast; FileReader is async',
      'Revoke object URLs with URL.revokeObjectURL() in a cleanup effect',
      'The file input value can\'t be controlled in React — use a ref to clear it',
    ],
  },

  'multi-step-wizard': {
    summary: 'A wizard is just state: a `step` number plus an accumulated data object. Each step reads from and writes to the shared state, and the current step determines what renders.',
    keyPoints: [
      'Keep all wizard data in a single state object at the top level',
      'Validate each step before advancing — don\'t let users skip required fields',
      'A progress indicator can be a simple computed percentage: (step / totalSteps) * 100',
    ],
  },

  'optimistic-form-submit': {
    summary: 'Optimistic UI applies the change immediately, then reconciles with the server response. On failure, roll back to the previous state and show an error. The user experiences zero latency for the happy path.',
    keyPoints: [
      'Save the previous state before applying the optimistic update',
      'Always handle both success and failure — don\'t assume the happy path',
      'Show pending/loading state on the submit button to prevent double-submits',
    ],
    watchFor: 'Rolling back needs to restore the exact previous state — make sure you capture it before the update.',
  },

  'keyboard-navigable-list': {
    summary: 'Arrow key navigation requires tracking an active index in state, updating it on keydown, and scrolling the active item into view. The Enter key confirms the selection.',
    keyPoints: [
      'Clamp the index to 0 and items.length - 1 to avoid out-of-bounds',
      'Use element.scrollIntoView({ block: "nearest" }) to keep the active item visible',
      'Set tabIndex={0} on the list container so it can receive keyboard focus',
    ],
  },

  'drag-to-reorder': {
    summary: 'HTML5 drag events: `dragstart` captures the dragged item\'s index, `dragover` prevents the default (which disallows drops), and `drop` rearranges the array.',
    keyPoints: [
      'dragover must call e.preventDefault() or the drop event won\'t fire',
      'Use dataTransfer.setData / getData to pass the dragged item\'s identity',
      'Visual feedback: set opacity on the dragging element, highlight the drop target',
    ],
    watchFor: 'Native HTML5 drag-and-drop is not touch-friendly — mobile needs a different approach.',
  },

  'custom-checkbox-group-with-select-all': {
    summary: 'The indeterminate state on a checkbox (some but not all children checked) can only be set via the DOM property `element.indeterminate` — not through any HTML attribute or React prop. Use a ref.',
    keyPoints: [
      'checkboxRef.current.indeterminate = someChecked && !allChecked',
      'Set it in a useLayoutEffect so it\'s applied before paint',
      'The indeterminate state is purely visual — the value is still true or false',
    ],
  },

  'debounced-autosave': {
    summary: 'Autosave debounces the save call, shows a "Saving…" indicator during the delay and request, and shows "Saved" on success. Cancelling an in-flight save when new content arrives prevents stale saves.',
    keyPoints: [
      'The debounce timeout and the in-flight fetch both need cleanup on new input',
      'Use an AbortController to cancel the fetch when a new save is triggered',
      'Status state machine: idle → saving → saved → error',
    ],
  },

  'accessible-modal-focus-trap': {
    summary: 'An accessible modal must trap focus inside itself (Tab and Shift+Tab stay within), return focus to the trigger when closed, and be closeable via Escape. These are ARIA dialog requirements.',
    keyPoints: [
      'Query all focusable elements inside the modal, cycle Tab between first and last',
      'Save document.activeElement before opening; restore it on close',
      'Set aria-modal="true" and role="dialog" for screen readers',
    ],
    watchFor: 'Forgetting focus management means keyboard users get stranded behind the modal overlay.',
  },

  // ── Section 5: Component Design Patterns ───────────────────────────────────

  'compound-components': {
    summary: 'Compound components share implicit state via Context. `<Tabs>` owns the active tab state, and each `<Tab>` and `<TabPanel>` reads from the same context — no prop drilling required.',
    keyPoints: [
      'Create a context inside the parent component, not globally',
      'Each child component calls useContext and gets the shared state',
      'The parent can validate that children are the expected types via React.Children',
    ],
  },

  'render-props-pattern': {
    summary: 'Render props share stateful logic by passing a render function as a prop. The component calls it with the shared state — the caller controls the markup. Hooks mostly replaced this but you\'ll see it in older codebases.',
    keyPoints: [
      'Any prop that is a function returning JSX is a render prop (not just one named "render")',
      'Hooks achieve the same reuse with less nesting and no "wrapper hell"',
      'Children-as-function is the same pattern: <MouseTracker>{pos => ...}</MouseTracker>',
    ],
  },

  'higher-order-component': {
    summary: 'An HOC is a function that takes a component and returns a new component with enhanced behavior. The same logic written as a hook is usually simpler, more composable, and easier to type.',
    keyPoints: [
      'HOC naming convention: withLoading, withAuth, withTheme',
      'Always forward refs and pass through all props to the wrapped component',
      'TypeScript HOCs require careful generic typing — hooks avoid this complexity',
    ],
    watchFor: 'Stacking multiple HOCs creates wrapper hell that\'s hard to debug in DevTools.',
  },

  'polymorphic-component-as-prop': {
    summary: 'The `as` prop lets a component render as a different HTML element or React component while keeping its own logic. The TypeScript challenge is making the props of the `as` element available on the component.',
    keyPoints: [
      'Use a generic: `function Button<T extends ElementType>({ as, ...props }: ButtonProps<T>)`',
      'The ref must also be polymorphic if you forward it',
      'Radix UI and Headless UI use this pattern extensively',
    ],
  },

  'slot-pattern': {
    summary: 'Named slots are just props that accept ReactNode — they\'re the JSX equivalent of Web Components\' `<slot>` element. A `<Card header={<h2>...</h2>} footer={...}>` API keeps markup at the call site.',
    keyPoints: [
      'ReactNode props are the simplest slot pattern — no context needed',
      'Render props slots add power when the slot needs access to component state',
      'This pattern avoids over-configuring a component with too many string/boolean props',
    ],
  },

  'controlled-uncontrolled-hybrid': {
    summary: 'A hybrid component checks whether the `value` prop is provided to decide which mode it\'s in. If controlled, it uses the prop; if uncontrolled, it uses internal state. This is how native inputs and most UI libraries work.',
    keyPoints: [
      'Check `value !== undefined` (not !value) to determine controlled mode',
      'Don\'t switch between modes after mount — that causes a React warning',
      'Export both the value and a defaultValue prop for the uncontrolled initial value',
    ],
    watchFor: 'Switching between controlled and uncontrolled at runtime (value going from undefined to a value) triggers a React error.',
  },

  'skeleton-loader-component': {
    summary: 'Skeleton screens show the shape of content before data loads, reducing perceived wait time. A simple skeleton takes width, height, and optionally a border-radius, and animates with a shimmer effect.',
    keyPoints: [
      'Use currentColor or CSS custom properties so skeletons adapt to dark/light mode',
      'The shimmer animation is a gradient moving across the element',
      'Match the skeleton\'s dimensions to the actual content to avoid layout shift on load',
    ],
  },

  'error-boundary-from-scratch': {
    summary: 'Error Boundaries are class components that implement `componentDidCatch` and/or `getDerivedStateFromError`. They catch render errors in their subtree and display a fallback — they cannot catch errors in event handlers or async code.',
    keyPoints: [
      'getDerivedStateFromError: update state to show fallback UI',
      'componentDidCatch: log the error (side effects allowed here)',
      'Error Boundaries must be class components — there is no hook equivalent yet',
    ],
    watchFor: 'Error Boundaries do NOT catch: event handlers, async callbacks, server-side rendering, or errors in the boundary itself.',
  },

  'provider-pattern-for-theming': {
    summary: 'A theme provider wraps the app, puts theme tokens into context, and exposes a `useTheme()` hook. Components read from the hook instead of accepting a theme prop — the theme propagates automatically.',
    keyPoints: [
      'Store the current theme name (\'light\' | \'dark\') in state, derive CSS variables or class names from it',
      'Persist the preference in localStorage and read it for the initial state',
      'Apply the theme class to document.documentElement so CSS variables cascade globally',
    ],
  },

  'headless-component': {
    summary: 'A headless component provides behavior (state + handlers) with zero markup, letting the caller own the UI completely. This is the highest form of reuse — the same accordion logic can power a sidebar nav, a FAQ, and an inline expander.',
    keyPoints: [
      'The hook returns everything the UI needs: isOpen, toggle, getButtonProps, getPanelProps',
      'Prop getters (getButtonProps) compose aria attributes, event handlers, and refs in one call',
      'Radix UI, Headless UI, and React Aria are all built on this pattern',
    ],
  },

  // ── Section 6: Performance & Rendering Internals ───────────────────────────

  'virtualized-list-by-hand': {
    summary: 'Virtualization renders only the items currently visible in the scroll window. You compute which rows are in view from scrollTop, containerHeight, and itemHeight, then absolutely position only those rows.',
    keyPoints: [
      'Total container height = itemHeight × totalItems (keeps scrollbar accurate)',
      'First visible index = Math.floor(scrollTop / itemHeight)',
      'Last visible index = Math.ceil((scrollTop + containerHeight) / itemHeight)',
    ],
    watchFor: 'Variable-height items are much harder — you need to measure each row and cache heights.',
  },

  'code-splitting-with-suspense': {
    summary: '`React.lazy(() => import(...))` defers loading a component\'s code until it\'s first rendered. `<Suspense>` catches the lazy component\'s loading promise and shows a fallback until the chunk arrives.',
    keyPoints: [
      'The import() call is a dynamic import — Vite/webpack splits it into a separate chunk',
      'Suspense boundaries can be nested — inner boundaries catch before outer ones',
      'Pre-load critical routes on hover to reduce perceived latency',
    ],
    watchFor: 'Lazy components must have a Suspense ancestor — rendering one without Suspense throws.',
  },

  'image-lazy-load-with-intersectionobserver': {
    summary: '`IntersectionObserver` fires a callback when an element enters or exits the viewport. Setting the `src` only when the image intersects avoids loading off-screen images on initial render.',
    keyPoints: [
      'Observe the image placeholder ref; disconnect on unmount',
      'The threshold option controls how much of the element must be visible to trigger',
      'The native `loading="lazy"` attribute now does this for free in modern browsers',
    ],
  },

  'concurrent-rendering-demo': {
    summary: '`useTransition` marks a state update as non-urgent, letting React interrupt and prioritize urgent updates (like typing) over slow ones (like filtering a large list). The UI stays responsive during heavy renders.',
    keyPoints: [
      'startTransition wraps the slow update; the urgent update (input value) stays outside',
      'isPending is true while the transition is in progress — use it to show a loading indicator',
      'React may abandon and restart transitions — the reducer/state must handle partial work safely',
    ],
  },

  'avoiding-prop-drilling-without-context': {
    summary: 'Component composition — passing JSX as props or children — can eliminate prop drilling without Context. Instead of threading a prop through 4 layers, compose the bottom component at the top and pass it down as a chunk of JSX.',
    keyPoints: [
      'Children-as-prop: `<Layout sidebar={<UserInfo />}>` — UserInfo is composed at the root, not drilled',
      'Composition is simpler than Context for one-off data — reserve Context for cross-cutting concerns',
      '"Slots" (named JSX props) give you explicit, discoverable composition points',
    ],
  },

  'usedeferredvalue-race': {
    summary: '`useDeferredValue` gives you a "stale" copy of a value that updates at lower priority. The UI renders immediately with the stale value, then re-renders with the fresh value when React has spare capacity.',
    keyPoints: [
      'The deferred value lags behind the live value during fast input',
      'Unlike useTransition, the caller doesn\'t control when the update happens',
      'Use CSS to visually dim stale content: `opacity: isPending ? 0.5 : 1`',
    ],
    watchFor: 'useDeferredValue doesn\'t prevent the work — it just defers when it\'s committed to screen.',
  },

  'bundle-diet': {
    summary: 'Importing an entire library for one function ships all its unused code to the user. Replace with a native browser API or a focused utility to shrink the bundle and improve load time.',
    keyPoints: [
      'Check bundle size with Vite\'s rollup-plugin-visualizer or bundlephobia.com',
      'Many lodash functions have direct native equivalents in modern JS',
      'Tree-shaking only helps if the library supports ESM — CommonJS libraries are imported whole',
    ],
  },

  'memoized-selector-pattern': {
    summary: 'A selector is a pure function that derives data from state. Memoizing it with useMemo means the derived value is recomputed only when its inputs change — not on every render.',
    keyPoints: [
      'If the selector is a pure function of props/state, it belongs in the render, wrapped in useMemo',
      'Reselect\'s createSelector composes multiple selectors and memoizes the result',
      'The real value is skipping expensive computations, not just skipping re-renders',
    ],
  },

  'profiler-api-hunt': {
    summary: '`<Profiler id="..." onRender={callback}>` captures render timing for its subtree. The callback receives phase (mount/update), actual duration, and base duration — real numbers, not guesses.',
    keyPoints: [
      'Profiler is disabled in production builds for performance',
      'actualDuration: time spent rendering this update. baseDuration: estimated time without memoization',
      'Use it to confirm that a memoization actually helped before shipping it',
    ],
  },

  'animation-without-re-render': {
    summary: 'Animating via a ref and direct DOM style mutation avoids triggering React\'s reconciler entirely. Useful for high-frequency animations (60fps progress bars, counters) where re-rendering on every frame is too expensive.',
    keyPoints: [
      'ref.current.style.width = `${progress}%` updates the DOM without a re-render',
      'requestAnimationFrame ensures the update runs at display refresh rate',
      'GSAP and Framer Motion use this approach internally for performance',
    ],
    watchFor: 'If the animated value needs to drive other React state (e.g., show a "Done" button at 100%), you\'ll need to re-enter React at that point.',
  },

  // ── Section 7: Async, Data Fetching & Race Conditions ──────────────────────

  'the-classic-race-condition': {
    summary: 'Two fetches in flight simultaneously can resolve in any order. If the second request resolves before the first, the first\'s result overwrites the correct one. Fix: ignore responses from superseded requests.',
    keyPoints: [
      'Pattern 1: AbortController — cancel the previous request before starting a new one',
      'Pattern 2: ignore flag — set `let ignore = false` in the effect, set it `true` in cleanup',
      'This is why React Query and SWR exist — they handle this automatically',
    ],
    watchFor: 'The bug is intermittent and depends on network timing — it\'s easy to miss in development.',
  },

  'cancel-on-unmount': {
    summary: 'Calling setState on an unmounted component no longer throws in React 18 (it was a no-op warning in React 17). But it\'s still a logic bug — the response was for a component that\'s gone. AbortController cancels the fetch on cleanup.',
    keyPoints: [
      'React 18 silently ignores setState on unmounted components, but the fetch still runs',
      'Cancel in the effect cleanup: `return () => controller.abort()`',
      'The same pattern prevents the race condition from Drill #61',
    ],
  },

  'retry-with-backoff': {
    summary: 'Exponential backoff retries a failed request after increasing delays (1s, 2s, 4s…) to avoid hammering a struggling server. A max retry count prevents infinite loops.',
    keyPoints: [
      'delay = baseDelay * 2^attempt, optionally with jitter to spread load',
      'Only retry on transient errors (network failure, 429, 503) — not on 400/401/404',
      'Abort the retry sequence if the component unmounts mid-backoff',
    ],
  },

  'polling-hook': {
    summary: 'A polling hook repeatedly calls a function at a fixed interval. It uses the `useInterval` pattern (ref-based callback) so the callback is always fresh, and cleanup stops the interval on unmount.',
    keyPoints: [
      'Store the callback in a ref to avoid stale closures without restarting the interval',
      'Expose a `stop()` function by setting a ref flag or by using AbortController',
      'Add a visibility check (document.hidden) to pause polling when the tab is backgrounded',
    ],
  },

  'cache-then-network': {
    summary: 'Show cached data immediately for a fast initial render, then fetch in the background and replace if the data changed. This is the SWR (stale-while-revalidate) strategy.',
    keyPoints: [
      'On mount: set state from cache, then fire the fetch',
      'On fetch complete: compare with cached value; only update state (and cache) if different',
      'The cache key is typically the URL or a serialized args string',
    ],
  },

  'parallel-vs-sequential-fetches': {
    summary: '`Promise.all([fetchA(), fetchB(), fetchC()])` fires all requests simultaneously and waits for all to resolve — total time is the slowest single request. Sequential `await` chains the full latency of each.',
    keyPoints: [
      'Sequential await: total time = sum of all request times',
      'Promise.all: total time ≈ slowest request',
      'If request B depends on A\'s result, they must be sequential — but B and C can be parallel',
    ],
    watchFor: 'Promise.all rejects immediately if any request fails — use Promise.allSettled if you want partial results.',
  },

  'dependent-fetch-chain': {
    summary: 'When B depends on A\'s result, the fetches must be sequential. The UI needs to model two loading states: one while A is in flight, one while B is in flight after A resolves.',
    keyPoints: [
      'Model with derived state: if !user → loading user. if user && !posts → loading posts',
      'Or use a state machine: idle → loadingUser → loadingPosts → done',
      'AbortController cleanup must handle both requests',
    ],
  },

  'optimistic-list-add-remove': {
    summary: 'Add the item to the local list immediately with a temporary ID, fire the real API call, then replace the temp ID with the server-assigned one on success (or remove the item on failure).',
    keyPoints: [
      'Generate a temp client-side ID (e.g., `Date.now()` or `crypto.randomUUID()`) for the optimistic item',
      'Track optimistic items separately so you can distinguish them from confirmed items',
      'On failure, remove the temp item and show an error — don\'t leave ghost items in the list',
    ],
  },

  'deduping-in-flight-requests': {
    summary: 'A shared in-flight request map (slug → Promise) ensures that if two components request the same resource simultaneously, only one network call fires. Both get the same Promise and resolve together.',
    keyPoints: [
      'Store pending Promises in a module-level Map keyed by request identity',
      'On completion, remove the key from the map so future requests fetch fresh data',
      'This is the core of React Query\'s deduplication — one request per query key',
    ],
  },

  'error-boundary-async-errors': {
    summary: 'Error Boundaries only catch errors thrown during rendering, not in event handlers or async code. For event handlers, use try/catch and error state. For async, you can re-throw into a state update to surface it to a boundary.',
    keyPoints: [
      'onClick errors: wrap in try/catch, call setError(e)',
      'Async errors: catch and re-throw via `setError(() => { throw e })` to surface to an Error Boundary',
      'This is why libraries like React Query handle their own async errors separately from render errors',
    ],
  },

  // ── Section 8: Streaming & Agent UI Fundamentals ───────────────────────────

  'typewriter-from-a-string': {
    summary: 'Reveal a string one character at a time using `setInterval` advancing an index into the string. Cleanup clears the interval — essential when the component unmounts mid-animation or React Strict Mode remounts it.',
    keyPoints: [
      'State is a character count, not the accumulated string — derive the substring with slice',
      'Stop the interval when count reaches the string length to avoid unnecessary ticks',
      'The functional updater `n => n + 1` avoids stale closure issues inside the interval',
    ],
    watchFor: 'Not returning the cleanup function leaks the interval on unmount — in Strict Mode you\'ll see the animation skip ahead.',
  },

  'real-sse-consumer': {
    summary: 'Server-Sent Events are a one-way HTTP stream from server to client. `EventSource` handles reconnection automatically. Each message fires an event with a `data` field.',
    keyPoints: [
      'new EventSource(url) opens the connection; .onmessage handles incoming events',
      'Close with eventSource.close() in the useEffect cleanup',
      'SSE is text-only (newline-delimited) — parse JSON manually in the message handler',
    ],
    watchFor: 'EventSource reconnects automatically on connection drop — you may receive duplicate events. Track message IDs to deduplicate.',
  },

  'cancelable-stream': {
    summary: 'Fetch streams can be cancelled by aborting the controller tied to the request. The `ReadableStream` reader\'s `cancel()` method also signals the server to stop sending.',
    keyPoints: [
      'Pass AbortController.signal to fetch; call abort() when the user clicks Stop',
      'The reader is from response.body.getReader() — loop with reader.read() until done',
      'Abort throws an AbortError — catch it separately from real network errors',
    ],
  },

  'concurrent-message-streams': {
    summary: 'Each agent message needs its own identity and its own accumulated buffer. Chunks arriving interleaved must be routed by message ID — not blindly appended to a shared string.',
    keyPoints: [
      'State is a Map<messageId, string> — each chunk looks up and appends to the right buffer',
      'Key each message bubble by ID so React doesn\'t scramble them',
      'Order of insertion matters for display — a separate array of IDs preserves order',
    ],
  },

  'batched-token-renderer': {
    summary: 'Calling setState on every incoming token (potentially 30/s) triggers too many re-renders. Accumulate tokens in a ref and flush to state on a timer — one re-render per batch instead of one per token.',
    keyPoints: [
      'The accumulator is a ref (no re-render on write); the flushed value is state (triggers re-render)',
      '50ms batching = max 20 re-renders/second, matching display refresh rate',
      'Flush immediately on stream end to avoid leaving the last tokens stuck in the buffer',
    ],
  },

  'restart-mid-stream': {
    summary: 'When a new message is sent while a stream is active, the old stream must be discarded. Abort the old request, clear the current message, and start fresh. Without this, chunks from the old stream bleed into the new message.',
    keyPoints: [
      'Each generation gets a fresh AbortController — abort it when a new message arrives',
      'A generationId ref lets you ignore chunks from superseded requests even if abort was slow',
      'Reset the display state (clear the partial message) before starting the new stream',
    ],
  },

  'streaming-markdown-renderer': {
    summary: 'Parsing partial Markdown on every chunk causes flicker as incomplete tokens (like `**bold` without closing `**`) are misinterpreted. Buffer until a safe boundary (newline, completed inline) before rendering.',
    keyPoints: [
      'Libraries like marked and remark parse full Markdown — they can handle partial input',
      'Highlight code blocks separately, after they\'re complete, to avoid syntax-highlighting half a block',
      'The cursor (blinking caret) must be appended after the rendered content, not inside it',
    ],
  },

  'tool-call-visualizer': {
    summary: 'Tool calls arrive in stages: a start event, streaming argument chunks, then a result event. The UI needs to handle all three states — showing a skeleton while args stream, then the result when complete.',
    keyPoints: [
      'State machine: pending → streaming_args → complete | error',
      'Args chunks are partial JSON — accumulate them, only parse when the tool_call_end event arrives',
      'Each tool call needs a stable ID to correlate start, chunks, and result events',
    ],
  },

  'loading-state-machine': {
    summary: 'Agent lifecycle is a sequence of known states with defined transitions. A `useReducer` models it clearly: each action is a named transition, and invalid transitions are simply not handled.',
    keyPoints: [
      'States: idle → thinking → streaming → tool_call → done / error',
      'Using booleans (isLoading, isStreaming, isError) creates impossible combinations — a state machine can\'t be in two states at once',
      'The current state drives all conditional rendering — no nested ternaries needed',
    ],
    watchFor: 'Don\'t put side effects inside the reducer — dispatch an action to trigger them, then handle them in useEffect.',
  },

  'mock-ag-ui-event-bus': {
    summary: 'An event emitter decouples producers from consumers. AG-UI uses typed events (TEXT_MESSAGE_START, TOOL_CALL_START, etc.) that flow from the agent runtime to the UI. A mock emitter on a timer lets you build and test the UI before connecting a real backend.',
    keyPoints: [
      'The emitter is a Map of event name to Set of listeners',
      'Typed events (discriminated union on type field) make exhaustive handling possible',
      'Subscribe in useEffect, unsubscribe in cleanup — the same listener pattern as DOM events',
    ],
  },

  // ── Section 9: Protocol-Level Agent Infra ──────────────────────────────────

  'hand-rolled-ag-ui-client': {
    summary: 'AG-UI is a stream of newline-delimited JSON events. A minimal client reads the stream, parses each line as JSON, discriminates on the event type, and routes to the appropriate state update.',
    keyPoints: [
      'Use TextDecoderStream + ReadableStream to process the byte stream as text',
      'Split on \'\\n\', filter empty lines, JSON.parse each line',
      'Unrecognised event types should be ignored, not thrown — the protocol is extensible',
    ],
  },

  'state-snapshot-vs-delta': {
    summary: 'A snapshot replaces the entire state object — simple but expensive for large objects. A delta (JSON Patch or similar) describes only what changed — cheaper to transmit, more complex to apply.',
    keyPoints: [
      'JSON Patch (RFC 6902): operations like add, remove, replace with a path',
      'Deltas are more efficient but require a library or hand-rolled merge logic',
      'Snapshots are simpler to reason about — use them unless state size becomes a problem',
    ],
  },

  'custom-tool-renderer-registry': {
    summary: 'A renderer registry maps tool names to components. When a tool call arrives, look up the component, fall back to a generic card if none is registered. This lets teams add custom UI for their tools without touching core agent code.',
    keyPoints: [
      'The registry is a Map<toolName, ComponentType<ToolCallProps>>',
      'Register renderers at app startup, not inside components',
      'The fallback generic renderer shows the tool name and raw JSON args',
    ],
  },

  'trusted-proxy-pattern-bff': {
    summary: 'The frontend should never hold API keys or call agent runtimes directly. A Backend For Frontend (BFF) sits between them: it holds credentials, validates requests, and proxies the stream. This is also where auth, rate limiting, and cost tracking live.',
    keyPoints: [
      'The BFF is a thin Node server (Express/Hono/Next.js API route)',
      'It authenticates the user, appends the API key, then pipes the stream back',
      'CORS is handled at the BFF, not the agent runtime',
    ],
    watchFor: 'Never expose your LLM API key in frontend code — it will be extracted from the bundle.',
  },

  'token-cost-meter': {
    summary: 'Count tokens from the stream, multiply by a per-token cost constant, and display a running total. Model this as accumulated state updated on every chunk — the same pattern as the typewriter counter but tracking spend instead of characters.',
    keyPoints: [
      'Token counts come from usage events in the stream (not from counting the text yourself)',
      'Separate input and output token costs — they have different per-token prices',
      'Display in a fixed format ($0.0042) to avoid layout shift as digits accumulate',
    ],
  },

  'speculative-ui-pre-fill-from-streamed-args': {
    summary: 'Tool call arguments arrive as partial JSON before the call is confirmed. By attempting to parse the partial JSON at each chunk (ignoring parse errors), you can progressively pre-fill a UI with whatever fields have arrived so far.',
    keyPoints: [
      'Wrap JSON.parse in try/catch — partial JSON throws, complete JSON succeeds',
      'Only render fields that are present and fully formed — don\'t show undefined',
      'Mark pre-filled values as "speculative" visually until the tool_call_end event',
    ],
  },

  'reconnect-on-drop': {
    summary: 'SSE reconnects automatically via EventSource, but a fetch stream does not. For fetch-based streams, catch network errors and restart the stream with a backoff delay, optionally passing a `Last-Event-ID` to resume from where you left off.',
    keyPoints: [
      'Exponential backoff prevents hammering a recovering server',
      'Track the last event ID so the server can replay missed events',
      'Show a "Reconnecting…" indicator during the backoff so users aren\'t confused',
    ],
  },

  'guardrail-ui-pattern': {
    summary: 'Human-in-the-loop tool calls pause execution and surface a confirmation dialog. The agent\'s next step is blocked until the user approves or rejects. This requires the backend to await a response from the frontend before continuing.',
    keyPoints: [
      'The UI shows tool name, args, and risk level — enough context to make an informed decision',
      'On approve: send a resume event to the agent. On reject: send a cancel event',
      'The dialog must be modal and keyboard-accessible — the user must explicitly act',
    ],
    watchFor: 'Never auto-approve after a timeout — guardrails are only useful if humans actually approve them.',
  },

  'multi-agent-tabbed-view': {
    summary: 'Multiple agents streaming simultaneously need isolated state. Each agent gets its own state slice keyed by agent ID — chunks from agent A never touch agent B\'s buffer.',
    keyPoints: [
      'State is a Map<agentId, AgentState> — route each event by its agent ID',
      'Each tab is a pure display of one agent\'s state slice — no cross-contamination',
      'A global "stop all" button aborts all in-flight streams at once',
    ],
  },

  'execution-trace-exporter': {
    summary: 'Capturing every agent event into an append-only array gives you a complete replay of the session. Exporting as JSON lets you share bug reports, replay sessions in tests, and build the foundation of an observability tool.',
    keyPoints: [
      'Timestamp each event at capture time: `{ ...event, capturedAt: Date.now() }`',
      'The trace array is separate from display state — don\'t derive display state from it at render time',
      'Export via `URL.createObjectURL(new Blob([JSON.stringify(trace)], { type: \'application/json\' }))`',
    ],
  },

  // ── Section 10: Mini Systems ────────────────────────────────────────────────

  'build-your-own-usestate': {
    summary: 'React hooks use a module-level array and a cursor to track state across calls. Each `useState` call claims the next slot. This is why hooks must be called in the same order every render — the slot index is their only identity.',
    keyPoints: [
      'state = [] at module level; cursor resets to 0 at the start of each render',
      'useState(init): if slot is empty, initialize it; return [slot, setter]',
      'The setter triggers a re-render (call render() again), advancing the cursor fresh',
    ],
    watchFor: 'Conditionally calling hooks breaks the cursor alignment — slots from subsequent hooks shift, reading wrong state.',
  },

  'build-your-own-usereducer': {
    summary: '`useReducer` is `useState` with the update logic extracted into a pure function. The implementation layers directly on top of the fake useState: the setter calls `reducer(currentState, action)` and stores the result.',
    keyPoints: [
      'useReducer(reducer, init) = useState(init) where setState becomes dispatch(action) => setState(reducer(state, action))',
      'Reducers must be pure — same inputs, same output, no side effects',
      'This is exactly how React implements useReducer internally',
    ],
  },

  'mini-pub-sub-store-zustand-lite': {
    summary: 'A minimal store holds state and a set of listener functions. `getState` reads current state. `setState` updates it and notifies all listeners. `subscribe` registers a listener and returns an unsubscribe function.',
    keyPoints: [
      'Listeners are called synchronously after setState — no batching in the basic version',
      'The useStore hook subscribes on mount, calls forceUpdate on change, unsubscribes on unmount',
      'This is 90% of Zustand\'s core — the real library adds middleware, devtools, and immer',
    ],
  },

  'mini-redux-reducer-dispatch-context': {
    summary: 'Redux is a pub-sub store with a reducer. Putting dispatch in Context gives any component access to trigger updates without prop drilling. `connect` is an HOC that subscribes a component to the store and maps state to props.',
    keyPoints: [
      'Two Contexts: one for state (read), one for dispatch (write) — split so dispatch consumers don\'t re-render on state changes',
      'The reducer is the single source of truth for how state can change',
      'This explains why Redux Toolkit exists — the boilerplate here is real',
    ],
  },

  'mini-react-query-cache-stale-time': {
    summary: 'A query cache maps query keys to { data, fetchedAt, promise }. On mount, check if cached data is still fresh (within staleTime). If stale or missing, fetch and cache. Multiple mounts with the same key share one request.',
    keyPoints: [
      'Cache key: JSON.stringify(key) — serialize arrays/objects to a stable string',
      'staleTime: if Date.now() - fetchedAt < staleTime, use cache without refetching',
      'Deduplication: if a fetch is in flight, return the existing Promise instead of starting a new one',
    ],
  },

  'mini-router': {
    summary: 'A minimal router listens to `popstate` events (browser back/forward) and renders different components based on `window.location.pathname`. `navigate()` calls `history.pushState` and updates the current path in state.',
    keyPoints: [
      'popstate fires on back/forward — listen in useEffect, clean up on unmount',
      'pushState changes the URL without reloading the page',
      'Route matching: exact string match for simplicity, regex for params',
    ],
    watchFor: 'pushState doesn\'t fire popstate — you need to manually call your route-change handler after pushing.',
  },

  'event-emitter-from-scratch': {
    summary: 'An event emitter maps event names to sets of listener functions. `on` registers a listener, `off` removes it, `emit` calls all listeners for an event with the provided arguments.',
    keyPoints: [
      'Use a Map<string, Set<Function>> for O(1) lookup and automatic deduplication',
      'Return an unsubscribe function from `on` for convenient cleanup',
      'This is the same interface as Node.js EventEmitter and the browser\'s EventTarget',
    ],
  },

  'mini-signals-fine-grained-reactivity': {
    summary: 'Signals are reactive values: reading a signal inside an effect automatically subscribes the effect to future changes. When a signal is written, only the effects that read it re-run — no virtual DOM diffing needed.',
    keyPoints: [
      'A global "current effect" ref tracks which effect is running when a signal is read',
      'Signal.get() adds the current effect to its subscriber set',
      'Signal.set() iterates subscribers and re-runs each effect',
    ],
    watchFor: 'Infinite loops: if an effect writes the signal it reads, it re-triggers itself. Guard with equality checks.',
  },

  'dependency-graph-resolver': {
    summary: 'Topological sort orders nodes so every dependency comes before the nodes that depend on it. It\'s the algorithm behind package installers, build systems, and any DAG where order matters.',
    keyPoints: [
      'Algorithm: DFS — visit each node, recurse its dependencies, then add to the result list',
      'Cycle detection: track "visiting" nodes — if you encounter one already visiting, you have a cycle',
      'Kahn\'s algorithm (BFS via in-degree counting) is an alternative that naturally detects cycles',
    ],
    watchFor: 'A graph with a cycle has no valid topological order — always handle this case.',
  },

  'hanachis-first-breath': {
    summary: 'This drill combines the state machine (#79), the trace exporter (#90), and the HOC/hook pattern (#43) into a working agent UI shell. It\'s the point where every individual drill becomes a coherent system.',
    keyPoints: [
      'The state machine drives all conditional rendering — idle, thinking, streaming, tool_call, error',
      'The trace exporter records every event for replay and debugging',
      'The HOC/hook pattern makes the agent logic reusable across different UI layouts',
    ],
  },
};
