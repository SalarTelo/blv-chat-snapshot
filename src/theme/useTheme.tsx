import { useEffect, useState } from "react";
import _ from "lodash";
import { setToLS, getFromLS } from "../utils/storage";

export default function useTheme() {
  const themes = getFromLS("all-themes");
  const [theme, setTheme] = useState(themes.data.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  function setMode(mode: any) {
    setToLS("theme", mode);
    setTheme(mode);
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(themes.data, "font"));
    return allFonts;
  };

  useEffect(() => {
    const localTheme = getFromLS("theme");

    localTheme !== null ? setTheme(localTheme) : setTheme(themes.data.light);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode, getFonts };
}
