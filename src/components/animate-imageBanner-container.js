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

        AnimateUtilities.register(this.sectionId, this.name, (targets)=>{
            const els = targets.map(t => this.querySelector(t));
            const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

            gsap.set(els, { y: 40, opacity: 0 });
            tl.to(targets, {
                y: 0,
                opacity: 1,
                stagger: 0.3
            });

            return tl;
        });
    }

    firstUpdated() { 
        super.animate();
    }
}

customElements.define('animate-image-banner-container', AnimateImageBannerContainer);