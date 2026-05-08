import { useState, useEffect, useRef } from "react";
import data from "../../data/index.json";
import { useLang } from "../../LangContext";

function PortfolioModal({ item, onClose }) {
  const { t } = useLang();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="portfolio-modal__overlay" onClick={onClose}>
      <article
        className="portfolio-modal__card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="portfolio-modal__close" onClick={onClose} aria-label="Tutup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className="portfolio-modal__img">
          <img src={item.src} alt={item.title} />
        </div>
        <div className="portfolio-modal__body">
          <p className="sub--title portfolio-modal__label">{t.portfolio.project}</p>
          <h2 className="portfolio-modal__title">{item.title}</h2>
          {item.role && (
            <span className="portfolio-modal__role">{item.role}</span>
          )}
          <div className="portfolio-modal__article">
            {item.article?.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {item.tech?.length > 0 && (
            <div className="portfolio-modal__tech">
              {item.tech.map((techItem) => (
                <span key={techItem} className="portfolio-modal__tag">{techItem}</span>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default function MyPortfolio() {
  const [selected, setSelected] = useState(null);
  const [activeRole, setActiveRole] = useState("all");
  const [activeTech, setActiveTech] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterPanelRef = useRef(null);
  const { t } = useLang();
  const portfolioItems = data?.portfolio ?? [];

  const roleOptions = [
    "all",
    ...new Set(portfolioItems.map((item) => item.role).filter(Boolean)),
  ];

  const techOptions = [
    "all",
    ...new Set(portfolioItems.flatMap((item) => item.tech ?? [])),
  ];

  const filteredItems = portfolioItems.filter((item) => {
    const roleMatch = activeRole === "all" || item.role === activeRole;
    const techMatch = activeTech === "all" || (item.tech ?? []).includes(activeTech);
    return roleMatch && techMatch;
  });

  const activeFilterCount = Number(activeRole !== "all") + Number(activeTech !== "all");

  const toggleRole = (role) => {
    if (role === "all") {
      setActiveRole("all");
      return;
    }
    setActiveRole((current) => (current === role ? "all" : role));
  };

  const toggleTech = (tech) => {
    if (tech === "all") {
      setActiveTech("all");
      return;
    }
    setActiveTech((current) => (current === tech ? "all" : tech));
  };

  useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFilterOpen]);

  return (
    <section className="portfolio--section" id="MyPortfolio">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="sub--title">{t.portfolio.label}</p>
          <h2 className="section--heading">{t.portfolio.heading}</h2>
        </div>
        <div className="portfolio--filter-wrap" ref={filterPanelRef}>
          <button
            type="button"
            className="portfolio--filter-button"
            onClick={() => setIsFilterOpen((open) => !open)}
          >
            <svg className="portfolio--filter-button-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4" />
            </svg>
            <span className="portfolio--filter-button-text">{t.portfolio.filterButton || "Filter"}</span>
            {activeFilterCount > 0 && (
              <span className="portfolio--filter-button-count">{activeFilterCount}</span>
            )}
          </button>

          {isFilterOpen && (
            <div className="portfolio--filter-panel" aria-label="Portfolio filters">
              <div className="portfolio--filter-panel-head">
                <p className="portfolio--filter-panel-title">{t.portfolio.filterButton || "Filter"}</p>
                <button
                  type="button"
                  className="portfolio--filter-reset"
                  onClick={() => {
                    setActiveRole("all");
                    setActiveTech("all");
                  }}
                >
                  {t.portfolio.clearFilter || "Reset"}
                </button>
              </div>

              <div className="portfolio--filter-field">
                <span className="portfolio--filter-title">{t.portfolio.positionFilter || "Posisi"}</span>
                <div className="portfolio--filter-chips">
                  {roleOptions.map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`portfolio--filter-chip ${activeRole === role ? "is-active" : ""}`}
                      onClick={() => toggleRole(role)}
                    >
                      {role === "all" ? (t.portfolio.allFilter || "Semua") : role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="portfolio--filter-field">
                <span className="portfolio--filter-title">{t.portfolio.techFilter || "Teknologi"}</span>
                <div className="portfolio--filter-chips">
                  {techOptions.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`portfolio--filter-chip ${activeTech === tech ? "is-active" : ""}`}
                      onClick={() => toggleTech(tech)}
                    >
                      {tech === "all" ? (t.portfolio.allFilter || "Semua") : tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <p className="portfolio--filter-summary">
          {(t.portfolio.filterSummary || "Aktif:")}
          {activeRole !== "all" ? ` ${activeRole}` : ""}
          {activeRole !== "all" && activeTech !== "all" ? " |" : ""}
          {activeTech !== "all" ? ` ${activeTech}` : ""}
        </p>
      )}

      <div className="portfolio--section--container">
        {filteredItems.map((item, index) => (
          <div key={index} className="portfolio--section--card">
            <div className="portfolio--section--img">
              <img src={item.src} alt="Placeholder" />
              <div className="portfolio--section--img--overlay">
                {item.github && (
                  <a href={item.github} target="_blank" rel="noopener noreferrer" className="portfolio--overlay--btn" aria-label="GitHub">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.397 7.86 10.918.575.106.785-.25.785-.555 0-.274-.01-1-.015-1.962-3.197.695-3.873-1.54-3.873-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.043-.713.08-.699.08-.699 1.153.08 1.76 1.185 1.76 1.185 1.024 1.755 2.686 1.249 3.34.955.104-.742.401-1.249.729-1.536-2.553-.29-5.238-1.277-5.238-5.685 0-1.256.45-2.283 1.185-3.088-.118-.29-.514-1.458.112-3.04 0 0 .967-.31 3.17 1.18a11.03 11.03 0 0 1 2.885-.388c.98.005 1.967.133 2.886.388 2.2-1.49 3.165-1.18 3.165-1.18.628 1.582.232 2.75.114 3.04.738.805 1.183 1.832 1.183 3.088 0 4.418-2.689 5.392-5.25 5.676.412.354.78 1.05.78 2.116 0 1.527-.014 2.758-.014 3.133 0 .308.207.667.79.554C20.214 21.392 23.5 17.082 23.5 12 23.5 5.648 18.352.5 12 .5Z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {item.website && (
                  <a href={item.website} target="_blank" rel="noopener noreferrer" className="portfolio--overlay--btn" aria-label="Website">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
            <div className="portfolio--section--card--content">
              <div>
                {item.role && (
                  <button
                    type="button"
                    className={`portfolio--section--role ${activeRole === item.role ? "is-active" : ""}`}
                    onClick={() => {
                      toggleRole(item.role);
                      setIsFilterOpen(true);
                    }}
                  >
                    {item.role}
                  </button>
                )}
                <h3
                  className="portfolio--section--title portfolio--section--title--clickable"
                  onClick={() => setSelected(item)}
                >
                  {item.title}
                </h3>
                <p className="text-md">{item.description}</p>
                {item.tech?.length > 0 && (
                  <div className="portfolio--section--tech">
                    {item.tech.slice(0, 4).map((tech) => (
                      <button
                        key={`${item.id}-${tech}`}
                        type="button"
                        className={`portfolio--section--tech-tag ${activeTech === tech ? "is-active" : ""}`}
                        onClick={() => {
                          toggleTech(tech);
                          setIsFilterOpen(true);
                        }}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="portfolio--empty">{t.portfolio.emptyFilter || "Tidak ada project yang cocok dengan filter."}</p>
      )}

      {selected && (
        <PortfolioModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
