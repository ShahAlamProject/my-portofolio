import { useLang } from "../../LangContext";

export default function Experience() {
  const { t } = useLang();
  const items = t.experience.items || [];

  return (
    <section id="Experience" className="experience--section">
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
          <article key={idx} className="experience--timeline--item">
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
