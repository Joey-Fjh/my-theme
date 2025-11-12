import {html, LitElement} from 'lit';

class MyNewSletterPopup extends LitElement { 
    static properties = {
        displayMode: {type: String},
        showInHome: { type: Boolean },
        showForVisitor: { type: Boolean },
    }

    constructor() {
        super();

        this.open = false;

        this.displayMode = null;
        this.showInHome = true;
        this.showForVisitor = true;
    }

    connectedCallback() {
        super.connectedCallback();

        this.show();
    }

    show(){
        console.log(this.displayMode,'---',this.showInHome,'---',this.showForVisitor);
    }

    render() { 
        return html`<slot></slot>`;
    }
}

customElements.define('newsletter-popup', MyNewSletterPopup);