import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import { NavType, IconType } from "../../constants/types";
import useLocalStorage from "./useLocalStorage";

interface ThemeSwitchProps extends Omit<NavType, "toggle" | "setToggle"> {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  sections: IconType[];
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
  const [lightMode, setLightMode] = useLocalStorage("lightMode", false);

  useEffect(() => {
    localStorage.setItem("lightMode", JSON.stringify(lightMode));
    if (lightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [lightMode]);

  const handleThemeChange = () => {
    setLightMode(!lightMode);
  };

  return (
    <div className="theme-toggle" onClick={handleThemeChange}>
      {lightMode ? <FaMoon /> : <FaSun />}
    </div>
  );
};

export default ThemeSwitch;
