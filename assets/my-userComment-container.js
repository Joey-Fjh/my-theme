var o=Object.defineProperty;var a=(i,e,t)=>e in i?o(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var s=(i,e,t)=>a(i,typeof e!="symbol"?e+"":e,t);import{i as w,a as d,x as c}from"./lit-element.js";import{S as l}from"./swiper.js";class r extends w{constructor(){super(...arguments);s(this,"swiperInstance",null)}firstUpdated(){const t=()=>{const n=this.querySelector(".swiper");window.innerWidth>=995&&n&&!this.swiperInstance&&(this.swiperInstance=new l(n,{slidesPerView:"auto",spaceBetween:30,freeMode:!0}))};t(),window.addEventListener("resize",t)}render(){return c`<slot></slot>`}}s(r,"styles",[d`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `]);customElements.define("my-user-comment-container",r);
