import { useEffect, useState } from "react";
import _ from "lodash";
import { setToLocalStorage, getFromLocalStorage } from "../utils/storage";

export default function useTheme() {
  const themes = getFromLocalStorage("all-themes");
  const [theme, setTheme] = useState(themes.data.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  function setMode(mode: any) {
    setToLocalStorage("theme", mode);
    setTheme(mode);
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, "font"));
    return allFonts;
  };

  useEffect(() => {
    const localTheme = getFromLocalStorage("theme");

    localTheme !== null ? setTheme(localTheme) : setTheme(themes.data.light);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode, getFonts };
}
