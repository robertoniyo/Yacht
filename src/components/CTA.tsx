export default function CTA() {
  return (
    <section id="book" className="relative py-16 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(16,44,87,0.08),transparent_70%)]" />
      <div className="container mx-auto container-px">
        <div className="grid grid-cols-1 items-center gap-10 rounded-2xl bg-brand-primary p-8 text-text-on-brand md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-text-on-brand">Ready to set sail?</h2>
            <p className="mt-2 text-brand-muted/90">
              Share your dates and destination; our concierge will tailor the perfect itinerary.
            </p>
          </div>
          <form className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input className="rounded-md border border-white/20 bg-white/10 px-3 py-2 placeholder:text-white/70 focus:border-white/40 focus:outline-none" placeholder="Name" />
            <input type="email" className="rounded-md border border-white/20 bg-white/10 px-3 py-2 placeholder:text-white/70 focus:border-white/40 focus:outline-none" placeholder="Email" />
            <input type="date" className="rounded-md border border-white/20 bg-white/10 px-3 py-2 placeholder:text-white/70 focus:border-white/40 focus:outline-none" />
            <input className="rounded-md border border-white/20 bg-white/10 px-3 py-2 placeholder:text-white/70 focus:outline-none" placeholder="Destination" />
            <div className="md:col-span-2">
              <button type="submit" className="mt-2 w-full rounded-md bg-white px-4 py-2 font-medium text-brand-primary hover:opacity-90">Request itinerary</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}


