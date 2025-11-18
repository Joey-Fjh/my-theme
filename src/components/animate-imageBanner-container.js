import { AnimateContainer,AnimateUtilities } from "./animate-container";
import gsap from "gsap";

export class AnimateImageBannerContainer extends AnimateContainer { 
    static styles = [
        ...AnimateContainer.styles
    ]; 

    static get properties() {
        return {
            ...AnimateContainer.properties
        };
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        AnimateUtilities.register(this.sectionId, this.name, (targets)=>{
            const els = targets.map(t => this.querySelector(t));
            const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

            tl.fromTo(els[2], {
                y: 30,
                opacity: 0  
            },{
                y: 0,
                opacity: 1
            });

            return tl;
        });
    }
}

if (!customElements.get("animate-image-banner-container")) {
    customElements.define('animate-image-banner-container', AnimateImageBannerContainer);
}