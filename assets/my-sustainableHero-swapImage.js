var r=Object.defineProperty;var n=(i,s,t)=>s in i?r(i,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[s]=t;var e=(i,s,t)=>n(i,typeof s!="symbol"?s+"":s,t);import{g as o}from"./index.js";import{i as h,a as p,x as c}from"./lit-element.js";class a extends h{constructor(){super(),this.isAnimating=!1,this.swapped=!1,this.primary=this.querySelector(".image-primary"),this.secondary=this.querySelector(".image-secondary")}connectedCallback(){super.connectedCallback(),this.primary.addEventListener("click",this.swapImages.bind(this)),this.secondary.addEventListener("click",this.swapImages.bind(this))}swapImages(){!this.primary||!this.secondary||this.isAnimating||(this.isAnimating=!0,this.swapped=!this.swapped,this.classList.toggle("swapped",this.swapped),o.fromTo([this.primary,this.secondary],{scale:.96,opacity:.85},{duration:.6,scale:1,opacity:1,clearProps:"transform",ease:"power2.inOut",onComplete:()=>{this.isAnimating=!1}}))}render(){return c`<slot></slot>`}}e(a,"styles",[p`
			:host {
				width: 100%;
				height: 100%;
			}
		`]);customElements.define("my-sustainable-hero-swapimage",a);
