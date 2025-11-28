import {html, LitElement} from 'lit';

export class MyBrandBanner extends LitElement {
    constructor() {
        super();

        this.content = null;
        this.contentWidth = 0;
        this._resizeHandler = null;
    }

    connectedCallback() {
        super.connectedCallback();

        // slot content finish then calc
        this.updateComplete.then(()=>{
            this.content = this.querySelector("[data-brand-banner-element='content']");
            this.measureAndSetup();

            this._resizeHandler = () => {
                this.measureAndSetup();
            }
            window.addEventListener("resize", this._resizeHandler);
        })
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if(this._resizeHandler) window.removeEventListener("resize", this._resizeHandler);
    }

    measureAndSetup() {
        if(!this.content) return;

        this.contentWidth = this.content.offsetWidth;

        if(!this.contentWidth) return;
        
        const count = this.duplicates;
        const clones = [];

        for(let i=0;i<count;i++){
            clones.push(this.content.cloneNode(true));
        }

        this.replaceChildren(...clones);
    }

    get duplicates(){
        return Math.ceil(window.innerWidth / this.contentWidth) + 2;
    }

    render() {
        return html`<slot></slot>`;   
    }
}

customElements.define('my-brand-banner', MyBrandBanner);