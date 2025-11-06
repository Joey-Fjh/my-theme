import {html, css, LitElement} from 'lit';

export class ResponsiveContainer extends LitElement {
  static styles = css`
      :host {
        --my-direction: row;
        display: flex;
        flex-direction: var(--my-direction);
        position: relative;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        min-height: 0;
        max-width: 100%;
        height: 100%;
        width: 100%;
      }
      
      ::slotted(img) {
        width:100%;
        height:100%;
        object-fit: cover;
        will-change: transform;
      }
  `;

  static properties = {
    direction: { type: String },
  };

  constructor() {
    super();
    this.direction = 'row';
  }

  render() {
    this.style.setProperty('--my-direction', this.direction);
    return html`
        <slot></slot>
      `;
  }
}

customElements.define('responsive-container', ResponsiveContainer);
