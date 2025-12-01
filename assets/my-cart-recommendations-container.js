var o=Object.defineProperty;var a=(s,e,t)=>e in s?o(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>a(s,typeof e!="symbol"?e+"":e,t);import{i as c,a as i,x as l}from"./lit-element.js";import{S as d}from"./swiper.js";class n extends c{connectedCallback(){super.connectedCallback(),new d(".swiper",{slidesPerView:4,spaceBetween:20,freeMode:!0})}render(){return l`
            <slot></slot>
        `}}r(n,"styles",[i`
            :host{
                display: block;
                width: 100%;
                flex:1;
            }
        `]);customElements.define("my-cart-recommendations-container",n);
