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
        this.expiredTimeStamp = 0;
        
        this.open = false;
        this.timeId = null;
        this.storageKey = 'newsletter-popup-expired';
    }

    connectedCallback() {
        super.connectedCallback();

        this.overlayDom = this.querySelector(".overlay");
        this.closeBtnDom = this.querySelector(".newsletter-close"); 

        this.init();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        clearTimeout(this.timeId);
        [this.overlayDom, this.closeBtnDom].forEach(el => {
            if (el) el.removeEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(){
        this.hide();
    }

    init(){
        if(this.isExpired()){
            this.expiredTimeStamp = Date.now() + this.expired * 24 * 60 * 60 * 1000;
            localStorage.setItem(this.storageKey, this.expiredTimeStamp);
        }

        if(!this.judgeShow()) return;


        [this.overlayDom, this.closeBtnDom].forEach(el => {
            if (el) el.addEventListener('click', this.handleClick.bind(this));
        });

        this.timeId = setTimeout(() => {
            this.show();
        }, this.delay * 1000);
    }

    isExpired(){
        const saved = Number(localStorage.getItem(this.storageKey));
        const now = Date.now();

        if (!saved || now > saved){
            return true;
        } 

        return false;
    }

    judgeShow(){
        if(this.displayMode == 'enable'){
            if(!this.showInHome || !this.showForVisitor || !this.isExpired()){
                return false;
            }
        }        

        return true;
    }

    show(){
        this.open = true;

        this.setAttribute('open','true');
    }

    hide(){
        this.open = false;

        this.removeAttribute('open');
    }

    render() { 
        return html`<slot></slot>`;
    }
}

customElements.define('newsletter-popup', MyNewSletterPopup);