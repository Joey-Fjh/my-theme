var p=Object.defineProperty;var h=(t,e,o)=>e in t?p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var n=(t,e,o)=>h(t,typeof e!="symbol"?e+"":e,o);import{i as r,a as c,x as l}from"./lit-element.js";class i extends r{constructor(){super(),this.title="",this.open=!1}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("accordion-toggle",{detail:{open:this.open},bubbles:!0}))}render(){return l`
      <button 
        class="accordion-header"
        @click="${this.toggle}"
        aria-expanded="${this.open}"
      >
        <h3 class="accordion-title">${this.title}</h3>
        <span class="accordion-icon">
          ${this.open?"−":"+"}
        </span>
      </button>
      <div class="accordion-content">
        <div class="accordion-text">
          <slot></slot>
        </div>
      </div>
    `}}n(i,"properties",{title:{type:String},open:{type:Boolean,reflect:!0}}),n(i,"styles",c`
    :host {
      display: block;
      border-bottom: 1px solid #e5e5e5;
    }

    :host(:last-child) {
      border-bottom: none;
    }

    button{
        background-color: var(--my-accordion-background-color, #f5f5f5);
    }

    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      cursor: pointer;
      transition: background-color 0.1s ease;
      border: none;
      width: 100%;
      text-align: left;
    }

    .accordion-header:hover {
      background: #fff;
    }

    .accordion-title {
      font-size: 16px;
      font-weight: 500;
      color: var(--my-accordion-foreground-color, #333333);
      margin: 0;
    }

    .accordion-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 300;
      color: var(--my-accordion-text-color, #666);
      transition: transform 0.3s ease;
    }

    .accordion-content {
      max-height: 0;
      overflow-x: hidden;                    
      overflow-y: var(--my-accordion-overflow-y, hidden);
      transition: max-height 0.3s ease, padding 0.3s ease;
    }

    :host([open]) .accordion-content {
      max-height: 500px;
      padding: 0 24px 20px 24px;
    }

    :host([open]) .accordion-icon {
      transform: rotate(180deg);
    }

    .accordion-text {
      color: var(--my-accordion-text-color, #666);
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
    }
  `);class s extends r{constructor(){super(),this.allowMultiple=!0,this.defaultOpen=0}connectedCallback(){super.connectedCallback(),this.addEventListener("accordion-toggle",this.handleToggle.bind(this)),this.setDefaultOpen()}setDefaultOpen(){const e=this.querySelectorAll("my-accordion-item");this.defaultOpen>=0&&this.defaultOpen<e.length&&(e[this.defaultOpen].open=!0)}handleToggle(e){if(!this.allowMultiple){const o=this.querySelectorAll("my-accordion-item"),d=e.target;o.forEach(a=>{a!==d&&(a.open=!1)})}}render(){return l`<slot></slot>`}}n(s,"properties",{allowMultiple:{type:Boolean,attribute:"allow-multiple"},defaultOpen:{type:Number,attribute:"default-open"}}),n(s,"styles",c`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
  `);customElements.define("my-accordion-item",i);customElements.define("my-accordion-container",s);
