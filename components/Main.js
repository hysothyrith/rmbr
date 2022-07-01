import { html } from "../assets/js/html.js";

export function Main(props) {
  return html`<main class="main">${props.children}</main>`;
}
