import {html, LitElement} from 'lit';

export class MyBrandBanner extends LitElement {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<slot></slot>`;   
    }
}

customElements.define('my-brand-banner', MyBrandBanner);