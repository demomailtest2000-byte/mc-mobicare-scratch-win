'use client';
import { useState } from 'react';
import { BRANDS, RANGES } from '@/lib/prizes';
import { ScratchCard } from '@/components/ScratchCard';

export function Experience({ settings }: { settings: Record<string, string> }) {
  const [step, setStep] = useState(0); const [error, setError] = useState(''); const [result, setResult] = useState<any>();
  async function submit(form: FormData) {
    setError('');
    const response = await fetch('/api/participation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), phone: form.get('phone'), invoiceNumber: form.get('invoiceNumber'), brand: form.get('brand'), priceRange: form.get('range') }) });
    const data = await response.json(); if (!response.ok) return setError(data.error); setResult(data); setStep(1);
  }
  return <main><img className="logo" src="/brand-logo.png" alt="MC Mobicare Mobiles & Electronics"/>
    {step === 0 && <section className="card"><p className="eyebrow">SHOP & GET A SURPRISE GIFT</p><h1>SCRATCH & WIN</h1><p className="sub">{settings.campaignSubtitle || 'Congratulations! You may have a special gift waiting for you.'}</p><div className="trust"><div><b>1 Invoice = 1 Chance</b><br/>Each bill can participate once.</div><div><b>Scratch once</b><br/>Reveal your gift.</div></div><form action={submit}><label className="field">FULL NAME<input name="name" required minLength={2}/></label><label className="field">CONTACT NUMBER<input name="phone" required inputMode="numeric"/></label><label className="field">INVOICE NUMBER<input name="invoiceNumber" required maxLength={64} placeholder="Enter your bill / invoice number" autoCapitalize="characters"/></label><label className="field">BRAND<select name="brand" required defaultValue=""><option value="" disabled>Select brand</option>{BRANDS.map(x => <option key={x}>{x}</option>)}</select></label><label className="field">PRICE RANGE<select name="range" required defaultValue=""><option value="" disabled>Select range</option>{RANGES.map(x => <option key={x}>{x}</option>)}</select></label>{error && <p className="error">{error}</p>}<button className="button">CONTINUE TO SCRATCH</button><p className="notice">Your details are collected for Scratch & Win participation and campaign records.</p></form></section>}
    {step === 1 && <section className="card"><p className="eyebrow">STEP 2 — SCRATCH TO REVEAL</p><p className="sub">Scratch with your finger to reveal your gift.</p><div className="scratch"><p>🎁 YOUR GIFT<br/>{result.prize}</p><ScratchCard onRevealed={() => setStep(2)}/></div></section>}
    {step === 2 && <section className="card"><p className="eyebrow">🎉 CONGRATULATIONS!</p><h1>Your gift</h1><div className="scratch"><p>{result.prize}</p></div><p className="sub">Please show this screen to our store staff to collect your gift.</p><div className="claim">{result.claimId}</div><p className="notice">Save this Claim ID for reference.</p><div className="social"><a href={settings.instagramUrl || '#'} target="_blank" rel="noreferrer">📸 FOLLOW US ON INSTAGRAM</a><a href={settings.googleReviewUrl || '#'} target="_blank" rel="noreferrer">⭐ GIVE US A GOOGLE REVIEW</a><a href={settings.whatsappUrl || '#'} target="_blank" rel="noreferrer">💬 CHAT ON WHATSAPP</a><a href={settings.youtubeUrl || '#'} target="_blank" rel="noreferrer">▶️ WATCH US ON YOUTUBE</a><a href={settings.facebookUrl || '#'} target="_blank" rel="noreferrer">📘 FOLLOW US ON FACEBOOK</a></div></section>}
  </main>;
}
