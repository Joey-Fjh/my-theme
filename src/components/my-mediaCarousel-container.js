import {html, LitElement,css} from 'lit';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

class MyMediaCarouselContainer extends LitElement {
    static properties = {
        initIndex: {type: Number,state:true} 
    }

    static styles = [
        css`
            :host {
				display: block;
				width: 100%;
				height: 100%;
				position: relative;
			}
        `
    ]

    constructor() {
        super();
        this.initIndex = 0;
    }

    get _container() {
        return this.querySelector('.carousel-container');
    }

    get _wrapper(){
        return this.querySelector('.carousel-wrapper');
    }

    get _slides() {
        return this.querySelectorAll('.carousel-slide');
    }

    get _prev() {
        return this.querySelector('.prev-btn');
    }

    get _next(){
        return this.querySelector('.next-btn');
    }

    get _dots(){
        return this.querySelector('.carousel-dots');
    }

    get _playBtns(){
        return this.querySelectorAll('.play-button');
    }

    initStatus(){
        this._slides[this.initIndex].classList.add('center');
        this._dots.children[this.initIndex].classList.add('active');
    }

    initVideoPlayer(){
        const posters = this.querySelectorAll('[id^="Deferred-Poster-"]');
        
        if(!posters.length) return;
        
        posters.forEach(poster => { 
            poster.addEventListener('click',(event) => {
                this.loadContent(event.currentTarget.parentElement);
            });
        });
    }

    loadContent(dom,focus = true){
        window.pauseAllMedia();

        if (!dom.getAttribute('loaded')) {
            const content = document.createElement('div');
            content.appendChild(dom.querySelector('template').content.firstElementChild.cloneNode(true));

            dom.setAttribute('loaded', true);

            const deferredElement = dom.appendChild(content.querySelector('video, model-viewer, iframe'));
            
            if (focus) deferredElement.focus();
            
            if (deferredElement.nodeName == 'VIDEO' && deferredElement.getAttribute('autoplay')) {
                // force autoplay for safari
                deferredElement.play();
            }

            // Workaround for safari iframe bug
            const formerStyle = deferredElement.getAttribute('style');
            
            deferredElement.setAttribute('style', 'display: block;');
            
            window.setTimeout(() => {
                deferredElement.setAttribute('style', formerStyle);
            }, 0);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        
        if(this._slides.length == 0){
            return;
        }

        this.initIndex = Math.floor(this._slides.length / 2);
        this.initStatus();
        this.initVideoPlayer();

        let swiper = new Swiper(this._container, {
            modules: [Navigation],
            slidesPerView: 3,
            loop: true,
            centeredSlides: true,
            slideToClickedSlide: true,
            initialSlide: this.initIndex,
            navigation: {
                nextEl: this._next,
                prevEl: this._prev,
            }
        });

        let prevIndex = swiper.activeIndex;

        swiper.on('slideChangeTransitionEnd', () => {
            swiper.slides[prevIndex].classList.remove("center");
            this._dots.children[prevIndex].classList.remove("active");

            swiper.slides[swiper.activeIndex].classList.add("center");
            this._dots.children[swiper.activeIndex].classList.add("active");

            prevIndex = swiper.activeIndex;
        });

        this._dots.addEventListener('click', (e) => {
            let toIndex = parseInt(e.target.dataset['dotIndex'] ?? 0);
            swiper.slideToLoop(toIndex);
        });
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('my-media-carousel-container', MyMediaCarouselContainer);