/* @refresh reload */
import { render } from "solid-js/web";

import "./kuba-text-field/kuba-textfield";
import "./kuba-text-field/kuba-textfield-working";

import App from "./App";

const root = document.getElementById("root");

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "kuba-textfield": unknown;
      "kuba-textfield-working": unknown;
    }
  }
}

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => <App />, root!);
