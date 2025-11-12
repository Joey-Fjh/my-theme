import {html, LitElement} from 'lit';

class MyNewSletterPopup extends LitElement { 
    static properties = {
        displayMode: {type: String},
        showInHome: { type: Boolean },
        showForVisitor: { type: Boolean },
        delay: { type: Number },
        expired: { type: Number },
    }

    constructor() {
        super();

        this.displayMode = 'enable';
        this.showInHome = true;
        this.showForVisitor = true;
        this.delay = 3;
        this.expired = 7;
        
        // init dom element
        this.open = false;
    }

    connectedCallback() {
        super.connectedCallback();

        console.log(this.delay,'----',this.expired);
        // addEventListener
        this.show();
    }

    judgeShow(){

    }

    show(){
        
    }

    hide(){

    }

    isExpired(){

    }

    render() { 
        return html`<slot></slot>`;
    }
}

customElements.define('newsletter-popup', MyNewSletterPopup);