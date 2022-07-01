import { useRef, useEffect } from "../assets/js/preact-hooks.module.js";

export function useSubmitOnEnter(formRef) {
  const targetRef = useRef(null);

  function handler(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current.requestSubmit();
    }
  }

  useEffect(() => {
    targetRef.current.addEventListener("keydown", handler);
    return () => targetRef.current.removeEventListener("keydown", handler);
  }, []);

  return targetRef;
}
