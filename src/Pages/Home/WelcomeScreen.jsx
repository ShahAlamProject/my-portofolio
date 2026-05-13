


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

const DISPLAY_MS = 600;
const TRANSITION_MS = 160;

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
  // Fallback: jika tidak ada greeting sama sekali, pakai default
  const fallbackGreeting = { text: "Welcome", lang: "en" };
  const greeting = (orderedGreetings[index] || orderedGreetings[0]) || fallbackGreeting;
  const isRtl = greeting && greeting.lang === "ar";

  useEffect(() => {
    // Trigger animasi masuk pertama kali
    setEntered(true);
    setVisible(true);
  }, []);


  useEffect(() => {
    if (index >= orderedGreetings.length) {
      setLeaving(true);
      return;
    }
    let fadeOut;
    const showTimer = setTimeout(() => {
      setVisible(false);
      fadeOut = setTimeout(() => {
        setIndex(i => i + 1);
        setVisible(true);
      }, TRANSITION_MS);
    }, DISPLAY_MS);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeOut);
    };
  }, [index, orderedGreetings.length]);

  // Panggil onDone hanya saat leaving berubah true
  useEffect(() => {
    if (leaving && typeof onDone === 'function') {
      const timeout = setTimeout(onDone, 150);
      return () => clearTimeout(timeout);
    }
  }, [leaving, onDone]);

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
          fontSize: 'min(8vw, 3rem)',
          fontWeight: 700,
          minWidth: 120,
          maxWidth: '90vw',
          textAlign: 'center',
          display: 'inline-block',
          wordBreak: 'break-word',
          whiteSpace: 'pre-line',
          opacity: visible ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {greeting.text}
      </span>
    </div>
  );
}

//
