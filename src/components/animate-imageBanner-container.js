import { AnimateContainer,AnimateUtilities } from "./animate-container";
import gsap from "gsap";

export class AnimateImageBannerContainer extends AnimateContainer { 
    static get properties() {
        return {
            ...super.properties
        };
    }

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        console.log(this.sectionId,'--',this.name,'---',this.targets);
        AnimateUtilities.register(this.sectionId, this.name, (targets)=>{
            console.log(targets);
        });
    }
}

customElements.define('animate-image-banner-container', AnimateImageBannerContainer);