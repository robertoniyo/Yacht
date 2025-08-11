import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-primary/20 via-transparent to-transparent" />
      <div className="container mx-auto container-px grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl md:text-6xl">
            Sail into extraordinary
          </h1>
          <p className="mt-4 max-w-xl">
            Curated yacht experiences with bespoke service, world-class crews, and handpicked destinations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#book" className="rounded-lg bg-brand-primary px-6 py-3 font-medium text-text-on-brand shadow-sm hover:opacity-90">Book your charter</a>
            <a href="#fleet" className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50">Explore fleet</a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-text-muted">
            <span>5.0 customer rating</span>
            <span>•</span>
            <span>Trusted by 500+ guests</span>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <Image
              src="https://images.unsplash.com/photo-1506808547685-e2ba962dedf6?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury yacht at sea"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}


