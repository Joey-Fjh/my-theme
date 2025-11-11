import {html, LitElement} from 'lit';

class MyNewSletterPopup extends LitElement { 
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() { 
        return html`<slot></slot>`;
    }
}

customElements.define('newsletter-popup', MyNewSletterPopup);