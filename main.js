import { render } from "./assets/js/preact.module.js";
import { App } from "./App.js";
import { html } from "./assets/js/html.js";

render(html`<${App} />`, document.body);
