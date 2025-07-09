import { useEffect, useState } from "react";
import darkModeBtn from "../../assets/website/dark-mode-button.png";
import lightModeBtn from "../../assets/website/light-mode-button.png";
import type { Theme } from "../../types/navbar";

function DarkMode() {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };
  return (
    <button className="relative w-12 h-12">
      <img
        src={lightModeBtn}
        alt="light mode icon"
        className={`w-full absolute drop-shadow-sm duration-300 ${
          theme === "light" ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleTheme}
      />
      <img
        src={darkModeBtn}
        alt="dark mode icon"
        className={`w-full drop-shadow-sm duration-300 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
        onClick={toggleTheme}
      />
    </button>
  );
}

export default DarkMode;
