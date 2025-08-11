export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="container mx-auto container-px flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <div className="font-display text-lg font-semibold text-brand-primary">Yacht</div>
          <p className="mt-1 text-sm text-text-muted">Luxury yacht charters worldwide.</p>
        </div>
        <nav className="flex gap-6 text-sm text-slate-600">
          <a href="#" className="hover:text-brand-primary">Privacy</a>
          <a href="#" className="hover:text-brand-primary">Terms</a>
          <a href="#" className="hover:text-brand-primary">Contact</a>
        </nav>
      </div>
    </footer>
  )
}


