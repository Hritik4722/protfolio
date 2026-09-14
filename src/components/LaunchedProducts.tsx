interface Product {
  name: string;
  description: string;
  platform: string;
  link: string;
}

const products: Product[] = [
  {
    name: "SqlBanana",
    description:
      "Practice SQL online with real datasets, community sheets & instant feedback.",
    platform: "WEB",
    link: "https://sqlbanana.dev",
  },
  {
    name: "tinyMinds",
    description:
      "Chat-style digital memory — save notes, links, images with tags & reminders.",
    platform: "PLAY STORE",
    link: "https://play.google.com/store/apps/details?id=com.yashind.memory",
  },
  {
    name: "Comeback Planner",
    description:
      "Year-long goal tracker with daily logging, streaks & momentum metrics.",
    platform: "PLAY STORE",
    link: "https://play.google.com/store/apps/details?id=app.vercel.comeback_goal_planner.twa",
  },
];

export default function LaunchedProducts() {
  return (
    <section id="launched" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-10">
        {"//"} launched
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <a
            key={product.name}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border-3 border-black bg-white p-6 shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-150 flex flex-col border-l-[6px] border-l-accent"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-lg font-bold">{product.name}</h3>
              <span className="font-mono text-xs font-bold px-2 py-1 bg-accent border border-black">
                {product.platform}
              </span>
            </div>
            <p className="font-sans text-gray-700 text-sm mb-4 flex-1">
              {product.description}
            </p>
            <span className="font-mono text-sm font-bold inline-flex items-center gap-1">
              Visit →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
