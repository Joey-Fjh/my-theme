var o=Object.defineProperty;var a=(t,e,s)=>e in t?o(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var i=(t,e,s)=>a(t,typeof e!="symbol"?e+"":e,s);import{i as n,a as l,x as d}from"./lit-element.js";import{S as m}from"./swiper.js";class r extends n{firstUpdated(){new m(this.querySelector(".swiper"),{slidesPerView:"auto",spaceBetween:30,freeMode:!0})}render(){return d`<slot></slot>`}}i(r,"styles",[l`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `]);customElements.define("my-user-comment-container",r);
