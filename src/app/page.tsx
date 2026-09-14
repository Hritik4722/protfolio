import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import GitHubStats from "@/components/GitHubStats";
import Projects from "@/components/Projects";
import LaunchedProducts from "@/components/LaunchedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <GitHubStats />
        <Projects />
        <LaunchedProducts />
      </main>
      <Footer />
    </>
  );
}
