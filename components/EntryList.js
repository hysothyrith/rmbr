import { html } from "../assets/js/html.js";

export function EntryList({ children }) {
  return html`
    <ul class="entry-list">
      ${children}
    </ul>
  `;
}
