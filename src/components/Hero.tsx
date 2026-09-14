export default function Hero() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/Hritik4722",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/hritik-aiml/",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "X",
      url: "https://x.com/Hritik_Yadav_1",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Peerlist",
      url: "https://peerlist.io/hritik1",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.75 3h7.875C17.362 3 19.5 5.138 19.5 7.875c0 2.737-2.138 4.875-4.875 4.875H10.5v5.25A3 3 0 0 1 7.5 21h-.75a0 0 0 0 1 0 0V3zm3.75 6.75h4.125a2.625 2.625 0 0 0 0-5.25H10.5v5.25z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <h1 className="font-mono text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
        Hritik Yadav
      </h1>
      <p className="font-sans text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mb-6 sm:mb-8 leading-relaxed">
        Python backend + AI/LLM engineer - FastAPI, Celery, and multi-agent
        pipelines that actually run in production.
      </p>

      {/* Live Status Indicator */}
      <div className="inline-flex items-start sm:items-center gap-3 px-3 sm:px-4 py-2 border-3 border-black bg-white font-mono text-xs md:text-sm font-bold shadow-[4px_4px_0_#000] mb-8 sm:mb-10">
        <span className="relative flex h-3 w-3 shrink-0 mt-0.5 sm:mt-0">
          <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 bg-green-500 border-2 border-black"></span>
        </span>
        <span className="uppercase tracking-tight">
          Currently building: LLM Gateway from scratch (no litellm)
        </span>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold px-3 py-2 sm:px-4 sm:py-2.5 bg-accent text-black border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150"
          >
            {social.icon}
            {social.name}
          </a>
        ))}
      </div>
    </section>
  );
}
