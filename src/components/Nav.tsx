export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-3 border-black">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-xl font-bold tracking-tight">
          hritik.online
        </a>
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="mailto:yadavhritik158@gmail.com"
            className="font-mono text-sm font-bold px-4 py-2 bg-white text-black border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
          >
            Email
          </a>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-bold px-4 py-2 bg-accent text-black border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
