import { html,LitElement,css } from 'lit';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export class MyBlogCarouselContainer extends LitElement {
    static properties = {
        columns: { type: Number },
    };

    static styles = [
        css`
        `
    ];

    get pagination(){
        return this.querySelector('.swiper-pagination');
    }

    get slides () {
        return this.querySelectorAll('.swiper-slide');
    }

    connectedCallback(){
        new Swiper(this.querySelector(".swiper"),{
            modules: [Pagination],              
            slidesPerView: 1,     
            spaceBetween: 10,
            slidesOffsetBefore: 10,
            slidesOffsetAfter: 10,
            breakpoints: {
                750: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesOffsetBefore: 20,
                    slidesOffsetAfter: 20,  
                },
                1024: {
                    slidesPerView: this.columns ?? 3,
                    spaceBetween: 30,
                    slidesOffsetBefore: 30,
                    slidesOffsetAfter: 30,
                },
            },
            loop:this.slides.length > 4,
            pagination: {
                el: this.pagination,
                clickable: true,
            },
        });
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('my-blog-carousel-container', MyBlogCarouselContainer);