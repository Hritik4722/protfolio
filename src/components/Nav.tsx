export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-3 border-black">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-xl font-bold tracking-tight">
          hritik.online
        </a>
        <a
          href="#"
          className="font-mono text-sm font-bold px-5 py-2.5 bg-accent text-black border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
