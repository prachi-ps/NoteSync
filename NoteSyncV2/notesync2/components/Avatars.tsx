'use client';

import { useOthers, useSelf } from '@liveblocks/react/suspense';
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function Avatars() {
    const others = useOthers();
    const self = useSelf();
    const all = [self, ...others];  //show out profile then stack others in front of it
  return (
    <div className='flex gap-2 items-center'>
        <p className='font-light text-sm'>
            Users currently editing this page
        </p>
        <div className='flex -space-x-5 mr-30'> {/* -space-x-5 for stacking up */}
            {all.map((other, i)=>(
                <TooltipProvider key={other?.id + i}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar className='border-2 hover:z-50'>
                                <AvatarImage src={other?.info.avatar} />
                                <AvatarFallback>{other?.info.name}</AvatarFallback>
                           </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p>{self?.id == other?.id ? "You" : other?.info.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    </div>
  )
}

export default Avatars;