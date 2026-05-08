import { useEffect, useState } from "react";
import { useLang } from "../../LangContext";

export default function HeroSection() {
  const { t } = useLang();
  const roles = t.hero.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset typing when language changes
  useEffect(() => {
    setRoleIndex(0);
    setDisplayText(roles[0]);
    setIsDeleting(false);
  }, [t]); // eslint-disable-line

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const isRoleComplete = displayText === currentRole;
    const isRoleCleared = displayText === "";

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !isRoleComplete) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
          return;
        }

        if (!isDeleting && isRoleComplete) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !isRoleCleared) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
          return;
        }

        setIsDeleting(false);
        setRoleIndex((previousIndex) => (previousIndex + 1) % roles.length);
      },
      isDeleting ? 70 : isRoleComplete ? 1400 : 110
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">{t.hero.greeting}</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--lead">{t.hero.buildAs}</span>
            <br />
            <span className="hero--section-title--color hero--section-title--typed" aria-live="polite">
              {displayText}
            </span>
          </h1>
          <p className="hero--section-description">
            {t.hero.description}
          </p>
        </div>
        <button className="btn btn-primary">{t.hero.cta}</button>
      </div>
      <div className="hero--section--img">
        <img src="./img/hero_img.png" alt="Hero Section" />
      </div>
    </section>
  );
}
