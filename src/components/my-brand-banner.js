import {html, LitElement} from 'lit';

export class MyBrandBanner extends LitElement {
    static get observedAttributes() {
        return ['data-scroll-direction','data-is-scroll'];
    }

    get container() {
        return this; // 外层容器就是组件本身
    }

    get track() {
        return this.querySelector('#bannerTrack');
    }

    get wrapper() {
        return this.querySelector('.image-wrapper:not(.image-slide)');
    }

    constructor() {
        super();
        this.scrollInterval = null;
        this.scrollDirection = 1; // 1 = right, -1 = left
        this.position = 0;
        this.scrollStep = 1;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'data-scroll-direction' && oldVal !== newVal) {
            this.scrollDirection = newVal === 'left' ? -1 : 1;
        }
        if (name === 'data-is-scroll' && oldVal !== newVal) {
            this.isScroll = newVal !== 'false';
            this.isScroll ? this.startScrolling() : this.pauseScrolling();
        }
    }

    connectedCallback() {
        super.connectedCallback();

        this.scrollDirection = this.getAttribute('data-scroll-direction') === 'left' ? -1 : 1;
        this.isScroll = this.getAttribute('data-is-scroll') !== 'false';

        if (this.isScroll) {
            this.startScrolling();
            this.addEventListener('mouseenter', this.pauseScrolling.bind(this));
            this.addEventListener('mouseleave', this.startScrolling.bind(this));
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.pauseScrolling();
    }

    isBannerVisible() {
        const style = window.getComputedStyle(this);
        return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            this.offsetParent !== null
        );
    }

    getWrapperWidth() {
        return this.wrapper ? this.wrapper.offsetWidth : 0;
    }
    
    startScrolling() {
        this.pauseScrolling();

        if (!this.isScroll) return;
        if (!this.isBannerVisible()) return;

        this.scrollInterval = setInterval(() => {
        if (!this.isBannerVisible()) {
            this.pauseScrolling();
            return;
        }

        const wrapperWidth = this.getWrapperWidth();
        if (wrapperWidth === 0) return;

        this.position += this.scrollStep * this.scrollDirection;

        // 滚动重置
        if (this.scrollDirection === -1) {
            if (this.position <= -wrapperWidth) {
            this.position = 0;
            }
        } else {
            if (this.position >= wrapperWidth) {
            this.position = 0;
            }
        }

        if (this.track) {
            this.track.style.transform = `translateX(${this.position}px)`;
        }
        }, 10);
    }

    pauseScrolling() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
    }

    render() {
        return html`<slot></slot>`;   
    }
}

customElements.define('my-brand-banner', MyBrandBanner);