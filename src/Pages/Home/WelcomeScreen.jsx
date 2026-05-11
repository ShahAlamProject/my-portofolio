


import { useEffect, useState } from "react";
import { useLang } from "../../LangContext";
import translations from "../../translations";

const greetings = [
  { text: "Welcome", lang: "en" },
  { text: "Selamat Datang", lang: "id" },
  { text: "Bienvenue", lang: "fr" },
  { text: "Bienvenido", lang: "es" },
  { text: "أهلاً وسهلاً", lang: "ar" },
  { text: "ようこそ", lang: "ja" },
  { text: "欢迎", lang: "zh" },
  { text: "환영합니다", lang: "ko" },
  { text: "Добро пожаловать", lang: "ru" },
];

const DISPLAY_MS = 700;
const TRANSITION_MS = 200;

export default function WelcomeScreen({ onDone }) {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Urutkan: bahasa aktif dulu, lalu bahasa lain
  const orderedGreetings = [
    ...greetings.filter(g => g.lang === lang),
    ...greetings.filter(g => g.lang !== lang)
  ];
  const greeting = orderedGreetings[index] || orderedGreetings[orderedGreetings.length - 1];
  const isRtl = greeting.lang === "ar";

  useEffect(() => {
    // Trigger animasi masuk pertama kali
    setEntered(true);
  }, []);

  useEffect(() => {
    if (index >= orderedGreetings.length) {
      setLeaving(true);
      setTimeout(onDone, 350);
      return;
    }
    let fadeOut;
    const showTimer = setTimeout(() => {
      setVisible(false);
      fadeOut = setTimeout(() => {
        setIndex(i => i + 1);
        setVisible(true);
      }, 350);
    }, DISPLAY_MS);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeOut);
    };
  }, [index, orderedGreetings.length, onDone]);

  if (leaving) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0a",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: leaving ? "none" : "auto"
      }}
    >
      <span
        style={{
          fontSize: "4rem",
          fontWeight: 700,
          minWidth: 220,
          textAlign: "center",
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: entered && visible ? "scale(1)" : "scale(0.7)",
          transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)"
        }}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {greeting.text}
      </span>
    </div>
  );
}

//
