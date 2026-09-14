export default function Footer() {
  return (
    <footer className="border-t-[6px] border-black bg-accent mt-10">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black">
          Don&apos;t waste time <br /> building a <br /> fancy portfolio.
        </h2>
        <div className="mt-16">
          <span className="font-mono text-sm font-bold px-6 py-3 border-3 border-black bg-white shadow-[4px_4px_0_#000]">
            made by Hritik
          </span>
        </div>
      </div>
    </footer>
  );
}
