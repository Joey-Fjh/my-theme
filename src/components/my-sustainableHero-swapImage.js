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

        this.primary.addEventListener("click", this.swapImages.bind(this));
        this.secondary.addEventListener("click", this.swapImages.bind(this));
    }

    swapImages(){
        if (!this.primary || !this.secondary) return;

        let swapped = false; 

        gsap.to(this.primary, {
            duration: 0.6,
            top: swapped ? "50%" : "0%",
            left: swapped ? "50%" : "0%",
            xPercent: swapped ? -25 : 0,
            yPercent: swapped ? -25 : 0,
            zIndex: swapped ? 2 : 3,
            ease: "power2.inOut"
        });

        gsap.to(this.secondary, {
            duration: 0.6,
            top: swapped ? "0%" : "50%",
            left: swapped ? "0%" : "50%",
            xPercent: swapped ? 0 : -25,
            yPercent: swapped ? 0 : -25,
            zIndex: swapped ? 3 : 2,
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