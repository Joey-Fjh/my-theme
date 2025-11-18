import { LitElement,html,css } from "lit";

export class AnimateUtilities {
    // { sectionId: { name:fn } } 
    static registry = {

    };

    static register(sectionId,name,fn){
        if(!this.registry[sectionId]){
            this.registry[sectionId] = {};
        }

        this.registry[sectionId][name] = fn;
    }

    static animate(sectionId,name,targets){
        const section = this.registry[sectionId]; 
        
        if(!section) return null;

        const fn = section[name];

        if(!fn) return null;

        return fn(targets);
    }
}

export class AnimateContainer extends LitElement { 
    static styles = css`
            :host {
                width: 100%;
                height: 100%;
            }
        `

    static get properties() {
        return {
            name: { type: String },
            targets : { 
                type: Array,
                converter:{
                    fromAttribute(value) {
                        return value.split(",").map(item => item.trim());
                    }
                } 
            },
        };
    }

    constructor() {
        super();

        this.name = '';
        this.targets = [];
        this.timeline = null;
        this.onAnimateEvent = this.onAnimateEvent.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();

        this.sectionId = this.dataset.sectionId;
        this.addEventListener("play-animation", this.onAnimateEvent);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.timeline?.kill();
        this.timeline = null;
        this.removeEventListener("play-animation", this.onAnimateEvent);
    }

    onAnimateEvent() {
        this.animate();
    }

    animate(){
        if(!this.targets.length) return;

        this.timeline?.kill();
        this.timeline = AnimateUtilities.animate(this.sectionId,this.name,this.targets);
    }

    render() {
        return html`<slot></slot>`;
    }
}

if (!customElements.get("animate-container")) {
    customElements.define("animate-container", AnimateContainer);
}
