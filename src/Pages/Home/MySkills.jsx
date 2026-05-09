import { useEffect, useMemo, useRef, useState } from "react";
import data from "../../data/index.json";
import { useLang } from "../../LangContext";

const ALL_CATEGORY = "__all__";

function resolveLocalizedText(value, lang) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  const normalizedLang = (lang || "").toLowerCase();
  const shortLang = normalizedLang.split("-")[0];

  return value[normalizedLang]
    || value[shortLang]
    || value.id
    || value.en
    || Object.values(value)[0]
    || "";
}

export default function MySkills() {
  const { t, lang } = useLang();
  const allLabel = t?.portfolio?.allFilter || "All";
  const skills = data?.skills || [];
  const categoryOptions = t?.skills?.categoryOptions || {};
  const categoryTitle = t?.skills?.categoryFilter || "Category";
  const categories = useMemo(() => {
    const unique = Array.from(new Set(skills.map((item) => item.category).filter(Boolean)));
    return unique;
  }, [skills]);
  const filterPanelRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeFilterCount = Number(selectedCategory !== ALL_CATEGORY);

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

  const filteredSkills = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) return skills;
    return skills.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, skills]);

  const getCategoryLabel = (category) => categoryOptions?.[category] || category;

  return (
    <section className="skills--section" id="mySkills">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="section--title">{t.skills.label}</p>
          <h2 className="skills--section--heading">{t.skills.heading}</h2>
        </div>

        <div className="portfolio--filter-wrap" ref={filterPanelRef}>
          <button
            type="button"
            className="portfolio--filter-button skills--filter-liquid"
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
            <div className="portfolio--filter-panel" aria-label="Skills filters">
              <div className="portfolio--filter-panel-head">
                <p className="portfolio--filter-panel-title">{t.portfolio.filterButton || "Filter"}</p>
                <button
                  type="button"
                  className="portfolio--filter-reset"
                  onClick={() => setSelectedCategory(ALL_CATEGORY)}
                >
                  {t.portfolio.clearFilter || "Reset"}
                </button>
              </div>

              <div className="portfolio--filter-field">
                <span className="portfolio--filter-title">{categoryTitle}</span>
                <div className="portfolio--filter-chips">
                  <button
                    type="button"
                    className={`portfolio--filter-chip ${selectedCategory === ALL_CATEGORY ? "is-active" : ""}`}
                    onClick={() => setSelectedCategory(ALL_CATEGORY)}
                  >
                    {allLabel}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`portfolio--filter-chip ${selectedCategory === category ? "is-active" : ""}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {getCategoryLabel(category)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="skills--section--container">
        {filteredSkills.map((item, index) => (
          <div key={index} className="skills--section--card">
            <div className="skills--section--img">
              <img src={item.src} alt={resolveLocalizedText(item.title, lang) || "Skill"} />
            </div>
            <div className="skills--section--card--content">
              <h3 className="skills--section--title">{resolveLocalizedText(item.title, lang)}</h3>
              {typeof item.level === "number" ? (
                <div className="skills--section--level" aria-label={`Skill level ${item.level} percent`}>
                  <div className="skills--section--level--meta">
                    <span>Level</span>
                    <span>{item.level}%</span>
                  </div>
                  <div className="skills--section--level--track">
                    <span
                      className="skills--section--level--fill"
                      style={{ width: `${Math.max(0, Math.min(100, item.level))}%` }}
                    />
                  </div>
                </div>
              ) : null}
              <p className="skills--section--description">{resolveLocalizedText(item.description, lang)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
