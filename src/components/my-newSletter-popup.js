import {html, LitElement} from 'lit';

class MyNewSletterPopup extends LitElement { 
    static properties = {
        displayMode: {type: String},
        showInHome: { type: Boolean },
        showForVisitor: { type: Boolean },
        delay: { type: Number },
        expired: { 
            type: Number,
            converter:{
                fromAttribute(val){
                    // converter html attribute to js property (timestap)
                    const day = Number(val);
                    if(isNaN(day)) return 0;

                    return Date.now() + day * 24 * 60 * 60 * 1000;
                }
            }

        },
    }

    constructor() {
        super();

        // init dom element
        this.open = false;
        console.log(this.expired,'---',this.delay);
    }

    connectedCallback() {
        super.connectedCallback();

        console.log(this.expired,'--1231231-',this.delay);
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