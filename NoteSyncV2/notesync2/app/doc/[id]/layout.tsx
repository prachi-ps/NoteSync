/*
import { auth } from '@clerk/nextjs/server'
import React from 'react'

function DocLayout({children}: {children: React.ReactNode}) {
    auth().protect();
  return <div>{children}</div>;
}

export default DocLayout
*/


/*
export default function DocLayout({ 
    children,
    params: {id},
    }: {
        children: React.ReactNode;
        params: {id: string};
    }) {
  return (
    <>
      <SignedIn>
        <div>{children}</div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn /> 
      </SignedOut>
    </>
  );
}
*/


import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import RoomProvider from "@/components/RoomProvider";

export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise <{ id: string }>;
}) {

  const { id } = await params;

  return (
    <>
      <SignedIn>
        <RoomProvider roomId={id}>{children}</RoomProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn /> 
      </SignedOut>
    </>
  );
}

