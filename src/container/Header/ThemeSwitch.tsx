import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { NavItems } from "../../constants/utils";
import { NavType, IconType } from "../../constants/types";
import useLocalStorage from "./useLocalStorage";

interface ThemeSwitchProps extends Omit<NavType, "toggle" | "setToggle"> {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  sections: IconType[];
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="theme-toggle" onClick={handleThemeChange}>
      {darkMode ? <FaSun /> : <FaMoon />}
    </div>
  );
};

export default ThemeSwitch;
