"use client"
import Link from 'next/link'
import { useState } from 'react'
import { clsx } from 'clsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-surface/80 backdrop-blur">
      <div className="container mx-auto container-px flex h-16 items-center justify-between">
        <Link href="#" className="font-display text-xl font-semibold text-brand-primary">
          Yacht
        </Link>
        <nav>
          <button
            className="md:hidden rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <ul className={clsx('absolute left-0 right-0 top-16 mx-4 hidden gap-8 rounded-lg border border-slate-200 bg-white p-4 shadow-md md:static md:mx-0 md:flex md:border-0 md:bg-transparent md:p-0 md:shadow-none', open && 'block')}
          >
            <li><Link className="block rounded px-3 py-2 text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-brand-primary" href="#fleet">Fleet</Link></li>
            <li><Link className="block rounded px-3 py-2 text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-brand-primary" href="#destinations">Destinations</Link></li>
            <li><Link className="block rounded px-3 py-2 text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-brand-primary" href="#about">About</Link></li>
            <li><Link className="block rounded bg-brand-primary px-4 py-2 font-medium text-text-on-brand hover:opacity-90 md:ml-4" href="#book">Book Now</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


