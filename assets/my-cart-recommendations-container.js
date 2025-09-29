var a=Object.defineProperty;var n=(t,e,s)=>e in t?a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>n(t,typeof e!="symbol"?e+"":e,s);import{i as c,a as i,x as l}from"./lit-element.js";import{S as d}from"./swiper.js";class o extends c{connectedCallback(){super.connectedCallback(),new d(".swiper",{slidesPerView:"auto",spaceBetween:18,freeMode:!0})}render(){return l`
            <slot></slot>
        `}}r(o,"styles",[i`
            :host{
                display: block;
                width: 100%;
                flex:1;
            }
        `]);customElements.define("my-cart-recommendations-container",o);
