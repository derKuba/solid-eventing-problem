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
  }

  connectedCallback() {
    this.$element = this.shadowRoot.querySelector("md-outlined-text-field");
    for (const attribute of this.attributes) {
      this.$element.setAttribute(attribute.name, attribute.value);
    }
  }

  handleProperty(propertyType) {
    const property = this.getAttribute(propertyType);
    if (property !== null && property !== undefined) {
      this.$element?.setAttribute(propertyType, property);
      if (this.$element && propertyType === "value") {
        this.$element.value = property;
      }
    }
  }

  handlePropertyWithoutValue(propertyName) {
    const propertyWithoutValue = this.getAttribute(propertyName);
    if (propertyWithoutValue !== null && propertyWithoutValue !== undefined) {
      this.$element?.setAttribute(propertyName, "");
    } else {
      this.$element?.removeAttribute(propertyName);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this.handleProperty("value");
        break;

      case "error-text":
        this.handleProperty("error-text");
        break;

      case "error":
        this.handlePropertyWithoutValue("error");
        break;

      case "disabled":
        this.handlePropertyWithoutValue("disabled");
        break;

      case "readonly":
        this.handlePropertyWithoutValue("readonly");
        break;

      case "required":
        this.handlePropertyWithoutValue("required");
        break;

      default:
        break;
    }
  }
}

export default KubaTextField;

customElements.define("kuba-textfield", KubaTextField);
