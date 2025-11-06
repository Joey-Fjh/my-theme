import { LitElement, html, css } from "lit"

class AccordionItem extends LitElement {
  static properties = {
    title: { type: String },
    open: { type: Boolean, reflect: true },
  }

  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid #e5e5e5;
    }

    :host(:last-child) {
      border-bottom: none;
    }

    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      cursor: pointer;
      transition: background-color 0.1s ease;
      border: none;
      width: 100%;
      text-align: left;
    }

    .accordion-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--my-accordion-foreground-color, #333333);
      margin: 0;
    }

    .accordion-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 300;
      color: var(--my-accordion-text-color, #666);
      transition: transform 0.3s ease;
    }

    .accordion-content {
      max-height: 0;
      overflow-x: hidden;                    
      overflow-y: var(--my-accordion-overflow-y, hidden);
      transition: max-height 0.3s ease, padding 0.3s ease;
    }

    :host([open]) .accordion-content {
      max-height: 500px;
      padding: 0 24px 20px 24px;
    }

    :host([open]) .accordion-icon {
      transform: rotate(180deg);
    }

    .accordion-text {
      color: var(--my-accordion-text-color, #666);
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
    }
  `

  constructor() {
    super()
    this.title = ""
    this.open = false
  }

  toggle() {
    this.open = !this.open
    this.dispatchEvent(
      new CustomEvent("accordion-toggle", {
        detail: { open: this.open },
        bubbles: true,
      }),
    )
  }

  render() {
    return html`
      <button 
        class="accordion-header"
        @click="${this.toggle}"
        aria-expanded="${this.open}"
      >
        <h3 class="accordion-title">${this.title}</h3>
        <span class="accordion-icon">
          ${this.open ? "−" : "+"}
        </span>
      </button>
      <div class="accordion-content">
        <div class="accordion-text">
          <slot></slot>
        </div>
      </div>
    `
  }
}

class AccordionComponent extends LitElement {
  static properties = {
    allowMultiple: { type: Boolean, attribute: "allow-multiple" },
    defaultOpen: { type: Number, attribute: "default-open" },
  }

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
  `

  constructor() {
    super()
    this.allowMultiple = true
    this.defaultOpen = 0
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener("accordion-toggle", this.handleToggle.bind(this))
    this.setDefaultOpen()
  }

  setDefaultOpen() {
    const items = this.querySelectorAll("my-accordion-item")

    if (this.defaultOpen >= 0 && this.defaultOpen < items.length) {
      items[this.defaultOpen].open = true
    }
  }

  handleToggle(event) {
    if (!this.allowMultiple) {
      const items = this.querySelectorAll("my-accordion-item")
      const currentItem = event.target

      items.forEach((item) => {
        if (item !== currentItem) {
          item.open = false
        }
      })
    }
  }

  render() {
    return html`<slot></slot>`
  }
}

customElements.define("my-accordion-item", AccordionItem)
customElements.define("my-accordion-container", AccordionComponent)
