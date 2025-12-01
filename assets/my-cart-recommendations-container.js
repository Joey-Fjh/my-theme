var l=Object.defineProperty;var o=(s,e,i)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[e]=i;var r=(s,e,i)=>o(s,typeof e!="symbol"?e+"":e,i);import{i as c,a as d,x as n}from"./lit-element.js";import{S as a}from"./swiper.js";class t extends c{connectedCallback(){super.connectedCallback(),new a(".swiper",{slidesPerView:this.slidesMobileView,spaceBetween:20,freeMode:!0,breakpoints:{768:{slidesPerView:this.slidesView}}})}render(){return n`
            <slot></slot>
        `}}r(t,"properties",{slidesView:{type:Number,converter:e=>Number(e)},slidesMobileView:{type:Number,converter:e=>Number(e)}}),r(t,"styles",[d`
            :host{
                display: block;
                width: 100%;
                flex:1;
            }
        `]);customElements.define("my-cart-recommendations-container",t);
