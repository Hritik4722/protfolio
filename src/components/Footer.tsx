export default function Footer() {
  return (
    <footer className="border-t-4 md:border-t-[6px] border-black bg-accent mt-8 md:mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 flex flex-col items-center justify-center text-center">
        <h2 className="font-mono text-xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight text-black">
          Don&apos;t waste time <br className="hidden md:block" /> building a <br className="hidden md:block" /> fancy portfolio.
        </h2>
        <div className="mt-4 md:mt-8">
          <span className="font-mono text-xs md:text-sm font-bold px-4 py-2 md:px-6 md:py-3 border-2 md:border-3 border-black bg-white shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000]">
            made by Hritik
          </span>
        </div>
      </div>
    </footer>
  );
}
