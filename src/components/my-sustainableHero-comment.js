import { html,LitElement,css } from "lit";
import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

export class MySustainableHeroComment extends LitElement{
    firstUpdated(){
        new Swiper(this.querySelector('.swiper'),{
            modules:[Navigation],
            slidesPerView:"1",
            navigation:{
                prevEl:this.querySelector('.prev'),
                nextEl:this.querySelector('.next')
            }
        });
    }

    render()
    {
        return html`<slot></slot>`;
    }
}

customElements.define('my-sustainable-hero-comment',MySustainableHeroComment);