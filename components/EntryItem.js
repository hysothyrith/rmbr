import { html } from "../assets/js/html.js";
import {
  useEffect,
  useRef,
  useState,
} from "../assets/js/preact-hooks.module.js";
import { useSubmitOnEnter } from "../hooks/use-submit-on-enter.js";
import { fitHeight } from "../utils/textarea.js";

export function EntryItem({ entry, onDelete, onUpdate }) {
  const [isActive, setIsActive] = useState(false);
  const [newValue, setNewValue] = useState(entry.text);
  const formRef = useRef(null);
  const textareaRef = useSubmitOnEnter(formRef);
  const deleteButtonRef = useRef(null);

  useEffect(() => {
    fitTextarea();
  }, []);

  function emitUpdate() {
    if (!newValue) {
      onDelete?.(entry);
      return;
    }

    if (newValue !== entry.text) {
      onUpdate?.(entry, newValue);
    }
  }

  function handleFocus() {
    setIsActive(true);
  }

  function handleBlur() {
    setIsActive(false);
    emitUpdate();
  }

  function handleInput(e) {
    setNewValue(e.currentTarget.value);
    fitTextarea();
  }

  function fitTextarea() {
    fitHeight(textareaRef.current);
  }

  return html`
    <li class="entry-item">
      <form
        ref=${formRef}
        onSubmit=${(e) => {
          e.preventDefault();
          textareaRef.current.blur();
          emitUpdate();
        }}
      >
        <textarea
          ref=${textareaRef}
          type="text"
          class="entry-item-textarea"
          value=${newValue}
          onInput=${handleInput}
          onFocus=${handleFocus}
          onBlur=${handleBlur}
        />
      </form>
      <button
        ref=${deleteButtonRef}
        class="icon-button entry-item-delete-button ${!isActive && "is-hidden"}"
        title="Delete this memo"
        onFocus=${() => setIsActive(true)}
        onBlur=${() => setIsActive(false)}
        onClick=${() => onDelete?.(entry)}
        tabindex="${isActive ? 0 : -1}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-trash"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
        </svg>
        <span class="visually-hidden">Delete</span>
      </button>
    </li>
  `;
}
