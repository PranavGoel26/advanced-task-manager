import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // ensure body has the theme class (recommended)
  useEffect(() => {
    const prev = document.body.classList.contains("theme-dark") ? "theme-dark"
               : document.body.classList.contains("theme-light") ? "theme-light"
               : null;

    if (prev) document.body.classList.remove(prev);
    document.body.classList.add(`theme-${theme}`);

    // cleanup on unmount (optional)
    return () => {
      document.body.classList.remove(`theme-${theme}`);
    };
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
