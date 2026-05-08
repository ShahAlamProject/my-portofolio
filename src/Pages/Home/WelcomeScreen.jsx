import { useState, useEffect } from "react";

const greetings = [
  { text: "Welcome",             lang: "English" },
  { text: "Selamat Datang",      lang: "Indonesia" },
  { text: "Bienvenue",           lang: "Francais" },
  { text: "Bienvenido",          lang: "Espanol" },
  { text: "أهلاً وسهلاً",         lang: "العربية" },
  { text: "ようこそ",              lang: "日本語" },
  { text: "欢迎",                  lang: "中文" },
  { text: "환영합니다",            lang: "한국어" },
  { text: "Добро пожаловать",    lang: "Русский" },
];

const DISPLAY_MS = 420;     // faster per greeting
const TRANSITION_MS = 200;  // quicker fade transition

export default function WelcomeScreen({ onDone }) {
  const [index, setIndex]     = useState(0);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (index >= greetings.length) {
      // all greetings shown — start exit animation
      setLeaving(true);
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }

    // show current greeting then fade out before next
    const showTimer = setTimeout(() => {
      setVisible(false);
      const nextTimer = setTimeout(() => {
        setIndex((i) => i + 1);
        setVisible(true);
      }, TRANSITION_MS);
      return () => clearTimeout(nextTimer);
    }, DISPLAY_MS);

    return () => clearTimeout(showTimer);
  }, [index, onDone]);

  const greeting = greetings[index] ?? greetings[greetings.length - 1];
  const rtl = greeting.lang === "العربية";

  return (
    <div className={`welcome-screen${leaving ? " welcome-screen--leave" : ""}`}>
      <div className="welcome-screen__noise" aria-hidden="true" />
      <div
        className={`welcome-screen__word${visible ? " welcome-screen__word--in" : " welcome-screen__word--out"}`}
        dir={rtl ? "rtl" : "ltr"}
      >
        <span className="welcome-screen__text">{greeting.text}</span>
      </div>
      <div className="welcome-screen__progress">
        <div
          className="welcome-screen__bar"
          style={{ width: `${((index) / greetings.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
