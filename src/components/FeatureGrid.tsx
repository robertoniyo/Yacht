export default function FeatureGrid() {
  const features = [
    {
      title: 'Modern Fleet',
      desc: 'A meticulously maintained collection of motor and sailing yachts.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary"><path d="M3 21h18"/><path d="M5 17l7-12 7 12"/><path d="M8 17h8"/></svg>
      ),
    },
    {
      title: 'Bespoke Itineraries',
      desc: 'Tailored routes to hidden coves, iconic ports, and pristine waters.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary"><path d="M21 10c0 8-9 12-9 12s-9-4-9-12a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      ),
    },
    {
      title: 'Exceptional Crew',
      desc: 'Experienced captains, chefs, and hosts with impeccable service.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-primary"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></svg>
      ),
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto container-px">
        <h2 className="text-center">Where luxury meets the open sea</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-primary/10">
                {f.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


