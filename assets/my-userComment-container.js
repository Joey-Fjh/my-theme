var o=Object.defineProperty;var w=(t,e,s)=>e in t?o(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var i=(t,e,s)=>w(t,typeof e!="symbol"?e+"":e,s);import{i as a,a as d,x as c}from"./lit-element.js";import{S as l}from"./swiper.js";class r extends a{constructor(){super(...arguments);i(this,"swiperInstance",null)}firstUpdated(){const s=()=>{const n=this.querySelector(".swiper");window.innerWidth>=995&&n&&!this.swiperInstance?this.swiperInstance=new l(n,{slidesPerView:"auto",spaceBetween:30,freeMode:!0}):window.innerWidth<995&&this.swiperInstance&&(this.swiperInstance.destroy(!0,!0),this.swiperInstance=null)};s(),window.addEventListener("resize",s)}render(){return c`<slot></slot>`}}i(r,"styles",[d`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
        `]);customElements.define("my-user-comment-container",r);
