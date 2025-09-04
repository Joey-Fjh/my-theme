var l=Object.defineProperty;var n=(r,e,t)=>e in r?l(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var s=(r,e,t)=>n(r,typeof e!="symbol"?e+"":e,t);import{i as a,a as o,x as c}from"./lit-element.js";import{S as d}from"./swiper.js";import{N as u}from"./navigation.js";class i extends a{get _container(){return this.querySelector(".deals-carousel-right")}get _wrapper(){return this.querySelector(".carousel-wrapper")}get _slides(){return this.querySelectorAll(".carousel-slide")}get _prev(){return this.querySelector(".carousel-prev")}get _next(){return this.querySelector(".carousel-next")}connectedCallback(){if(super.connectedCallback(),this._slides.length==0)return;let e=new d(this._container,{modules:[u],slidesPerView:"1.5",spaceBetween:30,navigation:{nextEl:this._next,prevEl:this._prev}}),t=e.activeIndex;e.on("slideChangeTransitionEnd",()=>{e.slides[t].classList.remove("active"),e.slides[e.activeIndex].classList.add("active"),t=e.activeIndex})}render(){return c`<slot></slot>`}}s(i,"styles",[o`
            :host{
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
            }
        `]);customElements.define("my-deals-carousel-container",i);
