'use client';

import { useEffect } from 'react';

export default function ScratchError({ reset }: { error: Error; reset: () => void }) {
  useEffect(() => { /* Intentionally do not expose infrastructure errors to customers. */ }, []);
  return <main><img className="logo" src="/brand-logo.png" alt="MC Mobicare Mobiles & Electronics"/><section className="card"><p className="eyebrow">MC MOBICARE</p><h1>Campaign unavailable</h1><p className="sub">Scratch &amp; Win is temporarily unavailable. Please ask a store team member for assistance or try again shortly.</p><button className="button" onClick={reset}>TRY AGAIN</button></section></main>;
}
