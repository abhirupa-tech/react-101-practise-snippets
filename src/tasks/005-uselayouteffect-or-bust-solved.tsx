import { useLayoutEffect, useRef, useState } from 'react';

export default function TheStaleClosureTrap() {
 const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if(showTooltip && buttonRef.current) {
      const buttonDimen = buttonRef.current.getBoundingClientRect();
      setCoords({ x: buttonDimen.left, y: buttonDimen.top - 60 });
    }
  },[showTooltip]);

  return (
    <div className="flex flex-col gap-4">
      <div className="font-mono text-xl py-4 px-4 rounded-lg border-2 border-amber-800 tabular-nums text-gray-400" ref={buttonRef} onMouseEnter={()=>setShowTooltip(true)}onMouseLeave={() => setShowTooltip(false)}>
        Hover to see tooltip
      </div>
      {showTooltip && (
        <div
          ref={tooltipRef}
          className='bg-cyan-950 text-lg border-2 border-gray-500 rounded-lg p-2 text-gray-400'
          style={{
            position: 'absolute',
            top: coords.y,
            left: coords.x,
          }}
        >
          You are hovering over the button!
        </div>
      )}
      </div>
  )
}
