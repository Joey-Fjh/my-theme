import { LitElement,html,css } from "lit";
import Swiper from "swiper";

export class MyCartRecommendationsContainer extends LitElement{
    static properties = {
        slidesView: {
            type: Number,
            converter: (value) => Number(value)  
        },
        slidesMobileView: {
            type: Number,
            converter: (value) => Number(value)
        }
    }

    static styles = [
        css`
            :host{
                display: block;
                width: 100%;
                flex:1;
            }
        `
    ]

    connectedCallback(){
        super.connectedCallback();

        new Swiper(".swiper",{
            slidesPerView: this.slidesMobileView,
            spaceBetween: 20,
            freeMode: true,
            breakpoints: {
                768: {
                    slidesPerView: this.slidesView
                }
            }
        });
    }

    render(){
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('my-cart-recommendations-container',MyCartRecommendationsContainer);