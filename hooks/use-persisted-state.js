import { useState } from "../assets/js/preact-hooks.module.js";

export function usePersistedState(key, initial) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }

    const initialValue = typeof initial === "function" ? initial() : initial;

    saveValue(initialValue);
    return initialValue;
  });

  function saveValue(newValue) {
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  function setter(value) {
    saveValue(value);
    setValue(value);
  }

  return [value, setter];
}
