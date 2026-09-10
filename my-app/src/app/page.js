import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SelectedWork />
      <Services />
      <Skills />
      <Experience />
      <CTAFooter />
    </main>
  );
}
