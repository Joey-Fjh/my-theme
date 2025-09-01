var a=Object.defineProperty;var r=(e,t,i)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var n=(e,t,i)=>r(e,typeof t!="symbol"?t+"":t,i);import{i as d,a as c,x as l}from"./lit-element.js";class o extends d{constructor(){super(),this.targetDate="",this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.isExpired=!1,this.intervalId=null}connectedCallback(){super.connectedCallback(),this.startCountdown()}disconnectedCallback(){super.disconnectedCallback(),this.intervalId&&clearInterval(this.intervalId)}updated(t){t.has("targetDate")&&this.startCountdown()}startCountdown(){if(this.intervalId&&clearInterval(this.intervalId),!this.targetDate){console.warn("CountdownComponent: target-date attribute is required");return}const t=()=>{const i=new Date().getTime(),s=new Date(this.targetDate).getTime()-i;s>0?(this.days=Math.floor(s/(1e3*60*60*24)),this.hours=Math.floor(s%(1e3*60*60*24)/(1e3*60*60)),this.minutes=Math.floor(s%(1e3*60*60)/(1e3*60)),this.seconds=Math.floor(s%(1e3*60)/1e3),this.isExpired=!1):(this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.isExpired=!0,this.dispatchEvent(new CustomEvent("countdown-expired",{bubbles:!0,composed:!0})),this.intervalId&&clearInterval(this.intervalId))};t(),this.intervalId=setInterval(t,1e3)}formatNumber(t){return t.toString().padStart(2,"0")}render(){return l`
      <div class="countdown-container ${this.isExpired?"expired":""}">
        <div class="countdown-item">
          <div class="countdown-number">${this.formatNumber(this.days)}</div>
          <div class="countdown-label">DAYS</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-number">${this.formatNumber(this.hours)}</div>
          <div class="countdown-label">HOURS</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-number">${this.formatNumber(this.minutes)}</div>
          <div class="countdown-label">MINUTES</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-number">${this.formatNumber(this.seconds)}</div>
          <div class="countdown-label">SECONDS</div>
        </div>
      </div>
    `}}n(o,"properties",{targetDate:{type:String,attribute:"target-date"},days:{type:Number,state:!0},hours:{type:Number,state:!0},minutes:{type:Number,state:!0},seconds:{type:Number,state:!0},isExpired:{type:Boolean,state:!0}}),n(o,"styles",c`
    :host {
      width: 100%;
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .countdown-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;
    }

    .countdown-number {
      font-size: 4rem;
      font-weight: 500;
      color: #000;
      line-height: 1;
      margin-bottom: 8px;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .countdown-label {
      font-size: 1.5rem;
      font-weight: 500;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .expired {
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .countdown-container {
        gap: 15px;
        padding: 15px;
      }

      .countdown-number {
        font-size: 3rem;
      }

      .countdown-label {
        font-size: 2rem;
      }
    }
  `);customElements.define("my-count-down",o);
