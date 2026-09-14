interface Project {
  name: string;
  description: string;
  stack: string[];
  repo?: string;
  link?: string;
}

const projects: Project[] = [
  {
    name: "AutoBrand AI",
    description:
      "6-agent pipeline generating diversified social posts from a 110K+ Reddit corpus across 25+ subreddits.",
    stack: ["FastAPI", "React", "PostgreSQL", "Gemini AI", "Docker"],
    repo: "https://github.com/Hritik4722/autobrand",
  },
  {
    name: "Document Digitization V2",
    description:
      "Async document processing backend with parallel PDF pipeline — Celery chord/chain splitting 50-page PDFs into concurrent chunks.",
    stack: ["FastAPI", "Celery", "Redis", "Cloudflare R2", "Sarvam AI", "Docker"],
    repo: "https://github.com/Hritik4722/document_digitization_v2",
  },
  {
    name: "Hinglish Subtitle Generator",
    description:
      "End-to-end subtitle API with a 6-stage pipeline — 93% faster than manual creation.",
    stack: ["FastAPI", "Whisper", "Gemini AI", "FFmpeg"],
    repo: "https://github.com/Hritik4722/hinglish_subtitle_generator",
  },
  {
    name: "SqlBanana",
    description:
      "Practice SQL on real databases with community-curated problem sheets and instant feedback.",
    stack: ["Web App"],
    link: "https://sqlbanana.dev",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-10">{"//"} featured projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="border-3 border-black bg-white p-6 shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150 flex flex-col"
          >
            <h3 className="font-mono text-lg font-bold mb-2">{project.name}</h3>
            <p className="font-sans text-gray-700 text-sm mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-1 bg-gray-100 border border-black/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-bold hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub →
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-bold hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Visit →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
