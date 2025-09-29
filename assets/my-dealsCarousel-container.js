var a=Object.defineProperty;var l=(r,e,t)=>e in r?a(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var s=(r,e,t)=>l(r,typeof e!="symbol"?e+"":e,t);import{i as n,a as o,x as c}from"./lit-element.js";import{S as u}from"./swiper.js";import{N as d}from"./navigation.js";import"./create-element-if-not-defined.js";class i extends n{get _container(){return this.querySelector(".deals-carousel-right")}get _wrapper(){return this.querySelector(".carousel-wrapper")}get _slides(){return this.querySelectorAll(".carousel-slide")}get _prev(){return this.querySelector(".carousel-prev")}get _next(){return this.querySelector(".carousel-next")}connectedCallback(){if(super.connectedCallback(),this._slides.length==0)return;let e=new u(this._container,{modules:[d],slidesPerView:"1.5",loop:!0,spaceBetween:30,navigation:{nextEl:this._next,prevEl:this._prev}});e.on("slideChangeTransitionEnd",()=>{this._slides.forEach(t=>{t.classList.remove("active"),t.dataset.swiperSlideIndex==e.realIndex&&t.classList.add("active")})})}render(){return c`<slot></slot>`}}s(i,"styles",[o`
            :host{
                width: 100%;
                height: 100%;
                display: block;
                position: relative;
            }
        `]);customElements.define("my-deals-carousel-container",i);
