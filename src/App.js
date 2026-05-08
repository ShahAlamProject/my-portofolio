import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Homescreen";
import WelcomeScreen from "./Pages/Home/WelcomeScreen";
import { useTheme } from "./useTheme";
import { LangProvider } from "./LangContext";

function App() {
  const [welcomed, setWelcomed] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <LangProvider>
      <div className="App">
        {!welcomed && <WelcomeScreen onDone={() => setWelcomed(true)} />}
        <Router>
          <div>
            <Navbar isDark={isDark} toggleTheme={toggle} />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="*" element={<div>404 Not Found</div>}></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </LangProvider>
  );
}

export default App;
