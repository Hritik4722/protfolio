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
    <section id="projects" className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-6 md:mb-10">
        {"//"} projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <div
            key={project.name}
            className="border-2 md:border-3 border-black bg-white p-4 md:p-6 shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000] flex flex-col"
          >
            <h3 className="font-mono text-lg md:text-xl font-bold mb-2 md:mb-3">
              {project.name}
            </h3>
            <p className="font-sans text-sm md:text-base text-gray-700 mb-4 md:mb-6 flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 md:mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] md:text-xs font-bold px-2 py-1 bg-gray-100 border border-black"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2 md:gap-4 mt-auto">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 bg-white text-black border-2 border-black shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all duration-150 text-center flex-1"
                >
                  GitHub
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 bg-accent text-black border-2 border-black shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] transition-all duration-150 text-center flex-1"
                >
                  Visit
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
