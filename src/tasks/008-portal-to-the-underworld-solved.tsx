import { useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Drill #8 — Portal to the Underworld
 *
 * Build a modal using createPortal that escapes a overflow: hidden parent. Explain why a regular nested div couldn't.
 *
 * TODO: Implement this drill.
 * Difficulty: ★★☆ · React Core Mechanics
 */
const ExampleModal = ({ setShowModal }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg border border-zinc-700 bg-zinc-950 p-6 text-sm text-zinc-300">
        <p>I'm a modal!</p>
        <button className="mt-4 rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500" onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );
}
export default function PortalToTheUnderworld() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 border border-zinc-700 p-6 text-sm text-zinc-300">
      <button
        onClick={() => setShowModal(true)}
        className="self-start rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-zinc-500"
      >
        Click to Show Modal
      </button>
      {showModal && createPortal(
        <ExampleModal setShowModal={setShowModal}/>
      , document.body
      )}
    </div>
  );
}
