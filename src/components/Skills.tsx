const skillCategories = [
  {
    category: "Programming & Frameworks",
    skills: ["Java", "Python", "FastAPI", "JavaScript"],
  },
  {
    category: "Databases & Storage",
    skills: ["PostgreSQL", "SQL", "MongoDB", "Redis", "Cloudflare R2"],
  },
  {
    category: "AI / LLM Integrations",
    skills: ["AI Agent Development", "LLM APIs", "Gemini", "OpenRouter"],
  },
  {
    category: "Web Technologies",
    skills: ["HTML", "CSS", "Tailwind", "ReactJs"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git & GitHub", "Docker", "VS Code", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-10 md:py-16">
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-10">
        {"//"} skills
      </h2>
      <div className="flex flex-col gap-10">
        {skillCategories.map((group) => (
          <div
            key={group.category}
            className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 border-l-[6px] border-black pl-4 md:pl-6"
          >
            <h3 className="font-mono font-bold text-lg w-56 shrink-0 pt-1">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-4 py-2 border-3 border-black bg-white font-mono text-sm font-bold shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-accent transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
