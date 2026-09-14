export default function Footer() {
  return (
    <footer className="border-t-[6px] border-black bg-accent mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 flex flex-col items-center justify-center text-center">
        <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-tight text-black">
          Don&apos;t waste time <br /> building a <br /> lengthy portfolio.
        </h2>
        <div className="mt-6 md:mt-8">
          <span className="font-mono text-sm font-bold px-6 py-3 border-3 border-black bg-white shadow-[4px_4px_0_#000]">
            made by Hritik
          </span>
        </div>
      </div>
    </footer>
  );
}
