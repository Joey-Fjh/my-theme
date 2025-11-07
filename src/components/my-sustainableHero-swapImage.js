import gsap from "gsap";
import { html,LitElement,css } from "lit";

export class MySustainableHeroSwapImage extends LitElement{
    static styles = 
	[
		css`
			:host {
				width: 100%;
				height: 100%;
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

        this.swapped = !this.swapped;
        this.classList.toggle('swapped', this.swapped);

        gsap.fromTo(
            [this.primary, this.secondary],
            { scale: 0.96, opacity: 0.85 },
            {
                duration: 0.6,
                scale: 1,
                opacity: 1,
                clearProps: "transform",
                ease: "power2.inOut"
            }
        );
    }

    render()
    {
        return html`<slot></slot>`;
    }
}

customElements.define('my-sustainable-hero-swapimage',MySustainableHeroSwapImage);