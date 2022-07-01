import { html } from "../assets/js/html.js";

export function Menu({ isOpen, children, onBackdropClick }) {
  function handleBackdropClick() {
    onBackdropClick?.();
  }

  return html`
    <div
      class="menu__backdrop ${isOpen && "menu__backdrop--clickable"}"
      onClick=${handleBackdropClick}
    />
    <div class="menu ${isOpen && "menu--open"}">
      <h2 class="brand">rmbr</h2>
      ${children}
    </div>
  `;
}
