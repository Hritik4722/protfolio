import ThemePicker from '@/components/ThemePicker';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b-3 border-border-brutal">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-lg sm:text-xl font-bold tracking-tight">
          hritik.online
        </a>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <ThemePicker />
          <a
            href="mailto:yadavhritik158@gmail.com"
            className="font-mono text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2 bg-surface text-foreground border-2 border-border-brutal shadow-[4px_4px_0_var(--shadow-color)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
          >
            Email
          </a>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2 bg-accent text-black border-2 border-border-brutal shadow-[4px_4px_0_var(--shadow-color)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
