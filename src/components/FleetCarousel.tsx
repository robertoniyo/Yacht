import Image from 'next/image'

const cards = [
  {
    title: 'M/Y Horizon',
    img: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'S/Y Aurora',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'M/Y Celeste',
    img: 'https://images.unsplash.com/photo-1493552152660-f915ab47ae9d?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function FleetCarousel() {
  return (
    <section id="fleet" className="bg-surface-elevated py-16 md:py-24">
      <div className="container mx-auto container-px">
        <div className="flex items-end justify-between gap-6">
          <h2>Our fleet</h2>
          <div className="hidden gap-3 md:flex">
            <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Prev</button>
            <button className="rounded-md border border-slate-300 px-3 py-2 text-sm">Next</button>
          </div>
        </div>
        <div className="mt-8 grid grid-flow-col auto-cols-[85%] gap-6 overflow-x-auto md:auto-cols-[33%]">
          {cards.map((c) => (
            <article key={c.title} className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <Image src={c.img} alt={c.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-text-muted">Sleeps 8 • 4 cabins • Crew of 4</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium">From $8,500/day</span>
                  <a href="#book" className="text-brand-primary hover:underline">Details</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


