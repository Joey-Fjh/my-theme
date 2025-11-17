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
            const tl = gsap.timeline();

            tl.fromTo(targets[0],
                {
                    y: 40,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }
            );

            tl.fromTo(targets[1],
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.4"
            );

            tl.fromTo(targets[2],
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.3"
            );
        });
    }
}

customElements.define('animate-image-banner-container', AnimateImageBannerContainer);