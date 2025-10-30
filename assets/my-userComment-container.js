var n=Object.defineProperty;var o=(s,e,t)=>e in s?n(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>o(s,typeof e!="symbol"?e+"":e,t);import{i as a,a as l,x as p}from"./lit-element.js";import{S as c}from"./swiper.js";class i extends a{constructor(){super(...arguments);r(this,"swiperInstance",null)}firstUpdated(){this.swiperInstance=new c(this.querySelector(".swiper"),{slidesPerView:"auto",spaceBetween:30,freeMode:!0,observer:!0,observeParents:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},995:{slidesPerView:"auto",spaceBetween:30}}})}render(){return p`<slot></slot>`}}r(i,"styles",[l`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `]);customElements.define("my-user-comment-container",i);
