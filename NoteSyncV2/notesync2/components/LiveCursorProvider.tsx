"use client";

import { useMyPresence, useOthers } from '@liveblocks/react/suspense';
import { PointerEvent } from 'react';
import React from 'react'
import FollowPointer from './FollowPointer';

function LiveCursorProvider({children}: {children: React.ReactNode}) {
    const [myPresence, updateMyPresence] = useMyPresence();     //my presence
    const others = useOthers();                                 //others presence

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
      const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
      updateMyPresence({ cursor });
    }

    function handlePointerLeave() {
      updateMyPresence({ cursor: null });
    }

  return <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
    {/* Render cursors */}
    {others
    .filter((other) => other.presence.cursor !== null)
    .map(({ connectionId, presence, info }) =>(
      <FollowPointer 
      key={connectionId}
      info={info}
      x={presence.cursor!.x}
      y={presence.cursor!.y}
      />
    ))}

    {children}
  </div>;
}

export default LiveCursorProvider