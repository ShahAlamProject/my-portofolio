import { useLang } from "../../LangContext";

export default function AboutMe() {
  const { t } = useLang();
  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        <img src="./img/about-me.png" alt="About Me" />
      </div>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <p className="section--title">{t.about.label}</p>
          <h1 className="skills-section--heading">{t.about.heading}</h1>
          <p className="hero--section-description">{t.about.p1}</p>
          <p className="hero--section-description">{t.about.p2}</p>
        </div>
      </div>
    </section>
  );
}
