var s=Object.defineProperty;var n=(i,t,e)=>t in i?s(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var r=(i,t,e)=>n(i,typeof t!="symbol"?t+"":t,e);import{i as d,a as c,x as h}from"./lit-element.js";class o extends d{constructor(){super(),this.direction="row"}render(){return this.style.setProperty("--my-direction",this.direction),h`
        <slot></slot>
      `}}r(o,"styles",c`
      :host {
        --my-direction: row;
        display: flex;
        flex-direction: var(--my-direction);
        position: relative;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        min-height: 0;
        max-width: 100%;
        height: 100%;
        width: 100%;
      }
      
      ::slotted(img) {
        width:100%;
        height:100%;
        object-fit: cover;
        will-change: transform;
      }
  `),r(o,"properties",{direction:{type:String}});customElements.define("responsive-container",o);
