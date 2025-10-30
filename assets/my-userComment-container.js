var n=Object.defineProperty;var o=(s,e,t)=>e in s?n(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>o(s,typeof e!="symbol"?e+"":e,t);import{i as a,a as p,x as l}from"./lit-element.js";import{S as w}from"./swiper.js";class r extends a{constructor(){super(...arguments);i(this,"swiperInstance",null)}firstUpdated(){(()=>{this.swiperInstance=new w(swiperEl,{slidesPerView:"auto",spaceBetween:30,freeMode:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},995:{slidesPerView:"auto",spaceBetween:30}}})})()}render(){return l`<slot></slot>`}}i(r,"styles",[p`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `]);customElements.define("my-user-comment-container",r);
