import "@material/web/textfield/outlined-text-field";
import cssText from "./kuba-textfield.css?raw";

const createStyleSheet = (cssText) => {
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(cssText);
  return styleSheet;
};

const styleSheets = createStyleSheet(cssText);

const template = document.createElement("template");
template.innerHTML = `<md-outlined-text-field class="tp-text-field"></md-outlined-text-field>`;

class KubaTextField extends HTMLElement {
  static get observedAttributes() {
    return ["value", "disabled", "readonly", "required", "error", "error-text"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open", delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [styleSheets];

    // Bind event handler
    this._handleInput = this._handleInput.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  connectedCallback() {
    this.$element = this.shadowRoot.querySelector("md-outlined-text-field");

    // Übertrage initial alle Attribute vom Host an das innere Element
    for (const attribute of this.attributes) {
      this.$element.setAttribute(attribute.name, attribute.value);
    }

    // Event-Listener hinzufügen
    if (this.$element) {
      this.$element.addEventListener("input", this._handleInput);
      this.$element.addEventListener("change", this._handleChange);
    }
  }

  disconnectedCallback() {
    if (this.$element) {
      this.$element.removeEventListener("input", this._handleInput);
      this.$element.removeEventListener("change", this._handleChange);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.$element || oldValue === newValue) return;
    if (newValue === null) {
      this.$element.removeAttribute(name);
    } else {
      this.$element.setAttribute(name, newValue);
      if (name === "value") {
        this.$element.value = newValue;
      }
    }
  }

  // Getter für value: Er liefert den internen Wert vom md-outlined-text-field
  get value() {
    return this.$element ? this.$element.value : "";
  }

  // Setter für value: Aktualisiert sowohl den internen Wert als auch das Attribut
  set value(val) {
    if (this.$element) {
      this.$element.value = val;
    }
    this.setAttribute("value", val);
  }

  // Input-Event abfangen, Wert aktualisieren und neues Event dispatchen
  _handleInput(event) {
    this.value = event.target.value;
    const newEvent = new Event("input", { bubbles: true, composed: true });
    this.dispatchEvent(newEvent);
  }

  // Change-Event abfangen, Wert aktualisieren und neues Event dispatchen
  _handleChange(event) {
    this.value = event.target.value;
    const newEvent = new Event("change", { bubbles: true, composed: true });
    this.dispatchEvent(newEvent);
  }
}

customElements.define("kuba-textfield-working", KubaTextField);
export default KubaTextField;
