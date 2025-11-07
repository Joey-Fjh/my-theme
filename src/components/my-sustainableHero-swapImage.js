import gsap from "gsap";
import { html,LitElement,css } from "lit";

export class MySustainableHeroSwapImage extends LitElement{
    static styles = 
	[
		css`
			:host {
				width: 100%;
				height: 100%;
				position: absolute;
			}
		`
	];
    constructor(){
        super();

        this.primary = this.querySelector(".image-primary");
        this.secondary = this.querySelector(".image-secondary");
    }

    connectedCallback(){
        super.connectedCallback();

        this.primary.addEventListener("click", swapImages);
        this.secondary.addEventListener("click", swapImages);
    }

    swapImages(){
        if (!this.primary || !this.secondary) return;

        let swapped = false; 

        const primaryPos = this.primary.getBoundingClientRect();
        const secondaryPos = this.secondary.getBoundingClientRect();

        const dx = secondaryPos.left - primaryPos.left;
        const dy = secondaryPos.top - primaryPos.top;

        const dx2 = primaryPos.left - secondaryPos.left;
        const dy2 = primaryPos.top - secondaryPos.top;

        gsap.to(this.primary, {
            duration: 0.6,
            x: swapped ? 0 : dx,
            y: swapped ? 0 : dy,
            zIndex: swapped ? 3 : 2,
            ease: "power2.inOut"
        });

        gsap.to(this.secondary, {
            duration: 0.6,
            x: swapped ? 0 : dx2,
            y: swapped ? 0 : dy2,
            zIndex: swapped ? 2 : 3,
            ease: "power2.inOut"
        });

        swapped = !swapped;
    }

    render()
    {
        return html`<slot></slot>`;
    }
}

customElements.define('my-sustainable-hero-swapimage',MySustainableHeroSwapImage);