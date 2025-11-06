import { html,LitElement,css } from "lit";
import Swiper from "swiper";

class MyUserCommentContainer extends LitElement{
    static styles = 
    [
        css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `
    ];

    swiperInstance = null;

    firstUpdated() {
        this.swiperInstance = new Swiper(this.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 30,
            freeMode: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                995: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
            },
        });
	}

    render(){
        return html`<slot></slot>`;
    }

}

customElements.define('my-user-comment-container',MyUserCommentContainer);