import React, { useState } from 'react';

/**
 * Drill #7 — Fragment Detective
 *
 * Render a dynamic list of fruits without a wrapper div using <>...</>, then explain when you'd be forced to use React.Fragment with a key instead.
 *
 * TODO: Implement this drill.
 * Difficulty: ★☆☆ · React Core Mechanics
 */


export default function FragmentDetective() {
  const [, rerender] = useState(0);
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  
  const CustomList = () => {
    return (
      <>
      
      {fruits.map(fruit => (
        <React.Fragment key={fruit}>
          <li>{fruit}</li>
        </React.Fragment>
      ))}
      </>)
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-400">
        <CustomList />
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
