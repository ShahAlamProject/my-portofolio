import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useLang } from "../../LangContext";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const FlagImage = ({ src, label }) =>
  src ? <img className="lang-switcher__flag" src={src} alt={`${label} flag`} loading="lazy" /> : null;

function Navbar({ isDark, toggleTheme }) {
  const [navActive, setNavActive] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const langRef = useRef(null);
  const navListRef = useRef(null);
  const navItemRefs = useRef([]);
  const { lang, setLang, t, translations } = useLang();

  const navItems = [
    { to: "heroSection", label: t.nav.home },
    { to: "mySkills", label: t.skills.label },
    { to: "AboutMe", label: t.nav.about },
    { to: "Experience", label: t.experience.label },
    { to: "MyPortfolio", label: t.nav.portfolio },
  ];

  const toggleNav = () => {
    setNavActive((prevNavActive) => !prevNavActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply RTL direction based on language
  useEffect(() => {
    const dir = translations[lang]?.dir || "ltr";
    document.documentElement.setAttribute("dir", dir);
  }, [lang, translations]);

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      <div className="navbar__shimmer" aria-hidden="true" />
      <div className="navbar__brand">
        <div className="navbar__logo-shell">
          <img src="./img/logo.svg" alt="Logoipsum" />
        </div>
        <div className="navbar__brand-copy">
          <span className="navbar__eyebrow">Creative Developer</span>
          <span className="navbar__title">Portfolio</span>
        </div>
      </div>
      <div className={`navbar--items ${navActive ? "active" : ""}`}>
        <ul ref={navListRef}>
          {navItems.map((item, index) => (
            <li
              key={item.to}
              ref={(el) => {
                navItemRefs.current[index] = el;
              }}
            >
              <Link
                onClick={closeMenu}
                onSetActive={setActiveSection}
                activeClass="navbar--active-content"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to={item.to}
                className="navbar--content"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar__right">
        <div className="navbar--controls">
          <div className="lang-switcher" ref={langRef}>
            <button
              type="button"
              className="lang-switcher__btn"
              onClick={() => setLangOpen((prev) => !prev)}
              aria-label="Switch language"
            >
              <FlagImage src={t.flag} label={t.label} />
              <span className="lang-switcher__label">{t.label}</span>
              <svg className={`lang-switcher__arrow ${langOpen ? "open" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {langOpen && (
              <ul className="lang-switcher__dropdown">
                {Object.values(translations).map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      className={`lang-switcher__option ${lang === item.code ? "active" : ""}`}
                      onClick={() => { setLang(item.code); setLangOpen(false); }}
                    >
                      <FlagImage src={item.flag} label={item.label} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <button
          type="button"
          className={`nav__hamburger ${navActive ? "active" : ""}`}
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <span className="nav__hamburger__line"></span>
          <span className="nav__hamburger__line"></span>
          <span className="nav__hamburger__line"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
