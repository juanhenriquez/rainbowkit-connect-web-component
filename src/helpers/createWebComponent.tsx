import { createRoot, Root } from "react-dom/client";

import { EventProvider } from "./../context/EventContext";

interface CreateWebComponentOptions {
  tagName: string;
}

export function createWebComponent(
  Component: any,
  { tagName }: CreateWebComponentOptions
) {
  class ReactWebComponent extends HTMLElement {
    root: Root;
    observer: MutationObserver;

    constructor() {
      super();
      const elementRoot = this.attachShadow({ mode: "open" });
      this.root = createRoot(elementRoot);
      this.observer = new MutationObserver(() => this.update());
      this.observer.observe(this, { attributes: true });

      this.eventDispatcher = this.eventDispatcher.bind(this);
    }

    connectedCallback() {
      this.mount();
    }

    disconnectedCallback() {
      this.unmount();
      this.observer.disconnect();
    }

    update() {
      this.mount();
    }

    mount() {
      const propTypes = Component.propTypes ? Component.propTypes : {};
      const props = {
        ...this.getProps(this.attributes, propTypes),
      };

      this.root.render(
        <EventProvider value={this.eventDispatcher}>
          <Component {...props} />
        </EventProvider>
      );
    }

    unmount() {
      this.root.unmount();
    }

    getProps(attributes: any, propTypes: any) {
      propTypes = propTypes || {};
      return [...attributes]
        .filter((attr) => attr.name !== "style")
        .map((attr) => this.convert(propTypes, attr.name, attr.value))
        .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
    }

    eventDispatcher(event: Event) {
      this.dispatchEvent(event);
    }

    convert(propTypes: any, attrName: string, attrValue: any) {
      const propName = Object.keys(propTypes).find(
        (key) => key.toLowerCase() === attrName
      );
      let value = attrValue;
      if (attrValue === "true" || attrValue === "false")
        value = attrValue === "true";
      else if (!isNaN(attrValue) && attrValue !== "") value = +attrValue;
      else if (/^{.*}/.exec(attrValue)) value = JSON.parse(attrValue);
      return {
        name: propName ? propName : attrName,
        value: value,
      };
    }
  }

  customElements.define(tagName, ReactWebComponent);
  return new ReactWebComponent();
}
