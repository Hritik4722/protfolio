import { FaJava, FaPython, FaDatabase, FaRobot, FaHtml5, FaCss3Alt, FaReact, FaGithub, FaDocker, FaLinux, FaRoute } from 'react-icons/fa';
import { SiFastapi, SiJavascript, SiPostgresql, SiMongodb, SiRedis, SiCloudflare, SiGooglegemini, SiTailwindcss } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';

const skillCategories = [
  {
    category: "Programming & Frameworks",
    skills: [
      { name: "Java", icon: <FaJava /> },
      { name: "Python", icon: <FaPython /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "JavaScript", icon: <SiJavascript /> },
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "SQL", icon: <FaDatabase /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "Cloudflare R2", icon: <SiCloudflare /> },
    ],
  },
  {
    category: "AI / LLM Integrations",
    skills: [
      { name: "AI Agent Development", icon: <FaRobot /> },
      { name: "LLM APIs", icon: <TbApi /> },
      { name: "Gemini", icon: <SiGooglegemini /> },
      { name: "OpenRouter", icon: <FaRoute /> },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "ReactJs", icon: <FaReact /> },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", icon: <FaGithub /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Linux", icon: <FaLinux /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-10 md:py-16">
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-10">
        {"//"} skills
      </h2>
      <div className="border-3 border-black bg-white p-6 md:p-8 shadow-[4px_4px_0_#000]">
        <div className="flex flex-col gap-5 md:gap-6">
          {skillCategories.map((group) => (
            <div
              key={group.category}
              className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6 border-l-[6px] border-black pl-4 md:pl-5"
            >
              <h3 className="font-mono font-bold text-sm w-48 shrink-0 pt-2 leading-snug">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 border-3 border-black bg-white font-mono text-sm font-bold shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-accent transition-all cursor-default"
                  >
                    <span className="text-base md:text-lg">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
