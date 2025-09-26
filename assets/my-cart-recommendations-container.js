var r=Object.defineProperty;var a=(t,e,s)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var o=(t,e,s)=>a(t,typeof e!="symbol"?e+"":e,s);import{i as c,a as i,x as l}from"./lit-element.js";import{S as d}from"./swiper.js";class n extends c{loadContent(){}connectedCallback(){super.connectedCallback(),new d(".swiper",{slidesPerView:"auto",spaceBetween:18,freeMode:!0})}render(){return l`
            <slot></slot>
        `}}o(n,"styles",[i`
            :host{
                display: block;
                width: 100%;
                flex:1;
            }
        `]);customElements.define("my-cart-recommendations-container",n);
