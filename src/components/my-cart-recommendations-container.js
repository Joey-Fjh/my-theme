import { LitElement,html,css } from "lit";
import Swiper from "swiper";

export class MyCartRecommendationsContainer extends LitElement{

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
            slidesPerView: '4',
            spaceBetween: 18,
            freeMode: true
        });
    }

    render(){
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('my-cart-recommendations-container',MyCartRecommendationsContainer);