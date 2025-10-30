var o=Object.defineProperty;var a=(s,e,t)=>e in s?o(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>a(s,typeof e!="symbol"?e+"":e,t);import{i as p,a as l,x as w}from"./lit-element.js";import{S as c}from"./swiper.js";class r extends p{constructor(){super(...arguments);i(this,"swiperInstance",null)}firstUpdated(){(()=>{const n=this.querySelector(".swiper");this.swiperInstance=new c(n,{slidesPerView:"auto",spaceBetween:30,freeMode:!0,breakpoints:{0:{slidesPerView:1,spaceBetween:20},995:{slidesPerView:"auto",spaceBetween:30}}})})()}render(){return w`<slot></slot>`}}i(r,"styles",[l`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `]);customElements.define("my-user-comment-container",r);
