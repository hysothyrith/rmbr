import { html } from "./assets/js/html.js";
import { useEffect, useState } from "./assets/js/preact-hooks.module.js";
import { EntryCreateForm } from "./components/EntryCreateForm.js";
import { EntryItem } from "./components/EntryItem.js";
import { EntryList } from "./components/EntryList.js";
import { Main } from "./components/Main.js";
import { Menu } from "./components/Menu.js";
import { MenuToggle } from "./components/MenuToggle.js";
import { usePersistedState } from "./hooks/use-persisted-state.js";
import { hasDayChanged } from "./utils/date.js";
import { uuid } from "./utils/uuid.js";

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entries, setEntries] = usePersistedState("entries", []);
  const [entryIndex, setEntryIndex] = usePersistedState("entryIndex", {
    value: 0,
    timestamp: Date.now(),
  });

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!entries.length) return;

    if (
      hasDayChanged(new Date(entryIndex.timestamp), new Date()) ||
      entryIndex.value >= entries.length
    ) {
      setEntryIndex({
        value: entries.length ? (entryIndex.value + 1) % entries.length : 0,
        timestamp: Date.now(),
      });
    }
  }, [entries, entryIndex]);

  function handleSubmit(text) {
    setEntries([...entries, { id: uuid(), text }]);
  }

  function handleDelete(entry) {
    setEntries(entries.filter((e) => e.id !== entry.id));
  }

  function handleUpdate(entry, newValue) {
    setEntries(
      entries.map((e) => (e.id === entry.id ? { ...e, text: newValue } : e))
    );
  }

  function handleMenuToggle() {
    setIsMenuOpen((o) => !o);
  }

  return html`
    <div class="container">
      <div
        class="main-container 
        ${!isReady && "is-hidden"} ${isMenuOpen && "is-blurred"}"
      >
        <${Main}>
          ${entries.length ? entries[entryIndex.value]?.text : "rmbr"}
        <//>
      </div>
      <${Menu}
        isOpen=${isMenuOpen}
        onBackdropClick=${() => setIsMenuOpen(false)}
      >
        <div>
          <${EntryCreateForm} onSubmit=${handleSubmit} />
        </div>
        <${EntryList}>
          ${entries.map(
            (entry) =>
              html`<${EntryItem}
                key=${entry.id}
                entry=${entry}
                onDelete=${handleDelete}
                onUpdate=${handleUpdate}
              />`
          )}
        <//>
      <//>
      <${MenuToggle} onClick=${handleMenuToggle} />
    </div>
  `;
}
