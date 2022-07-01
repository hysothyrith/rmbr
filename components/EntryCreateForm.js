import { html } from "../assets/js/html.js";
import { useRef, useState } from "../assets/js/preact-hooks.module.js";
import { useSubmitOnEnter } from "../hooks/use-submit-on-enter.js";
import { fitHeight } from "../utils/textarea.js";

export function EntryCreateForm(props) {
  const [value, setValue] = useState("");
  const formRef = useRef(null);
  const textareaRef = useSubmitOnEnter(formRef);

  function handleInput(e) {
    setValue(e.currentTarget.value);
    fitHeight(textareaRef.current);
  }

  return html`
    <form
      ref=${formRef}
      class="new-entry-form"
      onSubmit=${(e) => {
        e.preventDefault();
        if (!value) return;

        props.onSubmit(value);
        setValue("");
        setTimeout(() => fitHeight(textareaRef.current), 0);
      }}
    >
      <textarea
        ref=${textareaRef}
        rows="1"
        type="text"
        placeholder="Enter what you’d like to remember…"
        name="entry"
        value=${value}
        onInput=${handleInput}
      />
    </form>
  `;
}
