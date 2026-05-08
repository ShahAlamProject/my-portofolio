import { useState, useEffect } from "react";
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
          <div className="portfolio-modal__article">
            {item.article?.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {item.tech && (
            <div className="portfolio-modal__tech">
              {item.tech.map((t) => (
                <span key={t} className="portfolio-modal__tag">{t}</span>
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
  const { t } = useLang();

  return (
    <section className="portfolio--section" id="MyPortfolio">
      <div className="portfolio--container-box">
        <div className="portfolio--container">
          <p className="sub--title">{t.portfolio.label}</p>
          <h2 className="section--heading">{t.portfolio.heading}</h2>
        </div>
      </div>
      <div className="portfolio--section--container">
        {data?.portfolio?.map((item, index) => (
          <div key={index} className="portfolio--section--card">
            <div className="portfolio--section--img">
              <img src={item.src} alt="Placeholder" />
              <div className="portfolio--section--img--overlay">
                {item.github && (
                  <a href={item.github} target="_blank" rel="noopener noreferrer" className="portfolio--overlay--btn" aria-label="GitHub">
                    <svg width="22" height="22" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M16.3333 0.166748C7.50028 0.166748 0.333252 7.33378 0.333252 16.1667C0.333252 24.9997 7.50028 32.1667 16.3333 32.1667C25.1489 32.1667 32.3333 24.9997 32.3333 16.1667C32.3333 7.33378 25.1489 0.166748 16.3333 0.166748ZM26.9016 7.54202C28.8105 9.8674 29.9559 12.8348 29.9906 16.0452C29.5394 15.9585 25.0274 15.0387 20.4808 15.6114C20.3767 15.3858 20.2899 15.1428 20.1858 14.8999C19.9081 14.2405 19.5958 13.5637 19.2834 12.9216C24.3159 10.8739 26.6066 7.9238 26.9016 7.54202ZM16.3333 2.52684C19.804 2.52684 22.9797 3.82836 25.3919 5.96285C25.1489 6.30992 23.0838 9.06914 18.2248 10.8912C15.9862 6.77846 13.5047 3.41187 13.1229 2.89126C14.1467 2.64831 15.2227 2.52684 16.3333 2.52684ZM10.5199 3.811C10.8843 4.2969 13.3138 7.68085 15.5871 11.7068C9.20093 13.4075 3.56102 13.3728 2.95364 13.3728C3.83867 9.13855 6.70201 5.61577 10.5199 3.811ZM2.65863 16.1841C2.65863 16.0452 2.65863 15.9064 2.65863 15.7676C3.24865 15.7849 9.87772 15.8717 16.6977 13.824C17.0969 14.5875 17.4613 15.3684 17.8084 16.1493C17.6348 16.2014 17.4439 16.2535 17.2704 16.3055C10.2248 18.5788 6.47642 24.7914 6.16405 25.312C3.99485 22.8999 2.65863 19.6895 2.65863 16.1841ZM16.3333 29.8413C13.1749 29.8413 10.2595 28.7654 7.95147 26.9606C8.19442 26.4574 10.971 21.1125 18.676 18.4227C18.7107 18.4053 18.7281 18.4053 18.7628 18.388C20.689 23.3684 21.47 27.5506 21.6782 28.748C20.0296 29.4595 18.2248 29.8413 16.3333 29.8413ZM23.9515 27.4986C23.8127 26.6656 23.0838 22.6743 21.2964 17.7632C25.5828 17.0864 29.3311 18.1971 29.7997 18.3533C29.2097 22.1537 27.0231 25.4335 23.9515 27.4986Z" fill="currentColor"/>
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
                      <span key={`${item.id}-${tech}`} className="portfolio--section--tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <PortfolioModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
