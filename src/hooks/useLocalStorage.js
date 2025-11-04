import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (!saved) return initialValue;

    try {
      return JSON.parse(saved);
    } catch {
      // If it's not JSON (like a plain string), just return it directly
      return saved;
    }
  });

  useEffect(() => {
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }, [key, value]);

  return [value, setValue];
}
