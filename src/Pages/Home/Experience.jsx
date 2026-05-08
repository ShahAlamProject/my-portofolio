import { useEffect, useRef, useState } from "react";
import { useLang } from "../../LangContext";

export default function Experience() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const items = t.experience.items || [];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) {
      return undefined;
    }

    const itemElements = Array.from(
      sectionEl.querySelectorAll(".experience--timeline--item")
    );

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.22 }
    );

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.24,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    sectionObserver.observe(sectionEl);
    itemElements.forEach((itemEl) => itemObserver.observe(itemEl));

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, [items]);

  return (
    <section
      id="Experience"
      className={`experience--section ${isInView ? "is-inview" : ""}`}
      ref={sectionRef}
    >
      <div className="experience--section--header">
        <p className="section--title">{t.experience.label}</p>
        <h1 className="skills-section--heading">{t.experience.heading}</h1>
        <div className="experience--badges">
          <span className="experience--badge">{items.length} {t.experience.label}</span>
          {items[0] ? <span className="experience--badge experience--badge-muted">{items[0].year}</span> : null}
        </div>
      </div>
      <div className="experience--timeline">
        {items.map((item, idx) => (
          <article
            key={idx}
            className="experience--timeline--item"
            style={{ "--experience-delay": `${idx * 120}ms` }}
          >
            <div className="experience--timeline--left">
              <span className="experience--timeline--year">{item.year}</span>
            </div>
            <div className="experience--timeline--content">
              <div className="experience--timeline--top">
                <span className="experience--timeline--tag">{item.tag}</span>
                <span className="experience--timeline--index">{String(idx + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="experience--timeline--title">{item.title}</h3>
              <p className="experience--timeline--place">{item.place}</p>
              <p className="experience--timeline--desc">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
