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

        this.swapped = false;
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

        gsap.to(this.primary, {
            duration: 0.6,
            top: this.swapped ? "50%" : "0%",
            left: this.swapped ? "50%" : "0%",
            xPercent: this.swapped ? -25 : 0,
            yPercent: this.swapped ? -25 : 0,
            zIndex: this.swapped ? 2 : 3,
            ease: "power2.inOut"
        });

        gsap.to(this.secondary, {
            duration: 0.6,
            top: this.swapped ? "0%" : "50%",
            left: this.swapped ? "0%" : "50%",
            xPercent: this.swapped ? 0 : -25,
            yPercent: this.swapped ? 0 : -25,
            zIndex: this.swapped ? 3 : 2,
            ease: "power2.inOut"
        });

        this.swapped = !this.swapped;
    }

    render()
    {
        return html`<slot></slot>`;
    }
}

customElements.define('my-sustainable-hero-swapimage',MySustainableHeroSwapImage);