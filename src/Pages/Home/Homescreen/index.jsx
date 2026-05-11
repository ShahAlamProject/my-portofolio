import AboutMe from "../AboutMe";
import Experience from "../Experience";
import Footer from "../Footer";
import HeroSection from "../HeroSection";
import MyPortfolio from "../MyPortfolio";
import MySkills from "../MySkills";

export default function Home({ isDark }) {
  return (
    <>
      <HeroSection />
      <MySkills />
      <AboutMe />
      <Experience />
      <MyPortfolio />
      <Footer isDark={isDark} />
    </>
  );
}
