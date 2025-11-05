var p=Object.defineProperty;var h=(s,t,e)=>t in s?p(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var d=(s,t,e)=>h(s,typeof t!="symbol"?t+"":t,e);import{a,i as m,S as u,x as o}from"./lit-element.js";const g=a`
  :host {
    width: 100%;
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
`,v=a`
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
      font-size: 1.2rem;
    }
  }
`,f=a`
  .countdown-container {
    display: flex;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;
  }

  .countdown-container.expired {
    opacity: 0.6;
  }

  .countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
  }

  /* Replaced digital font with seven-segment display structure */
  .countdown-number {
    display: flex;
    padding: 20px 4px;
    border-radius: 16px;
    box-shadow: 0 0px 20px rgba(0, 0, 0, 0.12)
  }

  /* Seven-segment display digit container */
  .digit {
    position: relative;
    width: 40px;
    height: 60px;
    margin: 0 4px;
  }

  /* Individual segments of the seven-segment display */
  .segment {
    position: absolute;
    background-color: #fff;
    transition: background-color 0.3s ease;
  }

  .segment.active {
    background-color: #000;
  }

  /* Horizontal segments */
  .segment.horizontal {
    width: 30px;
    height: 4px;
    left: 5px;
    clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  }

  /* Vertical segments */
  .segment.vertical {
    width: 4px;
    height: 25px;
    clip-path: polygon(0% 10%, 50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%);
  }

  /* Segment positions */
  .segment.top { top: 0; }
  .segment.middle { top: 28px; }
  .segment.bottom { top: 56px; }
  .segment.top-left { top: 2px; left: 0; }
  .segment.top-right { top: 2px; right: 0; }
  .segment.bottom-left { top: 33px; left: 0; }
  .segment.bottom-right { top: 33px; right: 0; }

  .countdown-label {
    font-size: 13px;
    font-weight: 700;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;class l extends m{get segmentPatterns(){return{0:[1,1,1,0,1,1,1],1:[0,0,1,0,0,1,0],2:[1,0,1,1,1,0,1],3:[1,0,1,1,0,1,1],4:[0,1,1,1,0,1,0],5:[1,1,0,1,0,1,1],6:[1,1,0,1,1,1,1],7:[1,0,1,0,0,1,0],8:[1,1,1,1,1,1,1],9:[1,1,1,1,0,1,1]}}constructor(){super(),this.type="normal",this.targetDate="",this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.isExpired=!1,this.intervalId=null}connectedCallback(){super.connectedCallback(),this.startCountdown()}firstUpdated(){super.firstUpdated(),u(this.shadowRoot,[g,this.type==="normal"?v:f])}disconnectedCallback(){super.disconnectedCallback(),this.intervalId&&clearInterval(this.intervalId)}updated(t){t.has("targetDate")?this.startCountdown():t.has("isExpired")&&this.dispatchEvent(new CustomEvent("expired-change",{detail:{value:this.isExpired},bubbles:!0,composed:!0}))}startCountdown(){if(this.intervalId&&clearInterval(this.intervalId),!this.targetDate){console.warn("CountdownComponent: target-date attribute is required");return}const t=()=>{const e=new Date().getTime(),i=new Date(this.targetDate).getTime()-e;i>0?(this.days=Math.floor(i/(1e3*60*60*24)),this.hours=Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),this.minutes=Math.floor(i%(1e3*60*60)/(1e3*60)),this.seconds=Math.floor(i%(1e3*60)/1e3),this.isExpired=!1):(this.days=0,this.hours=0,this.minutes=0,this.seconds=0,this.isExpired=!0,this.dispatchEvent(new CustomEvent("countdown-expired",{bubbles:!0,composed:!0})),this.intervalId&&clearInterval(this.intervalId)),this.type!=="normal"&&this.initOther()};t(),this.intervalId=setInterval(t,1e3)}updateDigit(t,e){const n=t.querySelectorAll(".segment"),i=this.segmentPatterns[e];n.forEach((r,c)=>{i[c]?r.classList.add("active"):r.classList.remove("active")})}initOther(){const t=this.renderRoot.querySelectorAll(".digit");[Math.floor(this.days/10),this.days%10,Math.floor(this.hours/10),this.hours%10,Math.floor(this.minutes/10),this.minutes%10,Math.floor(this.seconds/10),this.seconds%10].forEach((n,i)=>{t[i]&&this.updateDigit(t[i],n)})}formatNumber(t){return t.toString().padStart(2,"0")}countDownTemplate(t){const e=o`
      ${this.formatNumber(t)}
    `,n=o`
      <div class="digit">
          <div class="segment horizontal top"></div>
          <div class="segment vertical top-left"></div>
          <div class="segment vertical top-right"></div>
          <div class="segment horizontal middle"></div>
          <div class="segment vertical bottom-left"></div>
          <div class="segment vertical bottom-right"></div>
          <div class="segment horizontal bottom"></div>
      </div>
      <div class="digit">
          <div class="segment horizontal top"></div>
          <div class="segment vertical top-left"></div>
          <div class="segment vertical top-right"></div>
          <div class="segment horizontal middle"></div>
          <div class="segment vertical bottom-left"></div>
          <div class="segment vertical bottom-right"></div>
          <div class="segment horizontal bottom"></div>
      </div>
    `;return this.type==="normal"?e:n}render(){return o`
      <div class="countdown-container ${this.isExpired?"expired":""}">
        <div class="countdown-item">
          <div class="countdown-number">${this.countDownTemplate(this.days)}</div>
          <div class="countdown-label">DAYS</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-number">${this.countDownTemplate(this.hours)}</div>
          <div class="countdown-label">HOURS</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-number">${this.countDownTemplate(this.minutes)}</div>
          <div class="countdown-label">MINUTES</div>
        </div>
        <div class="countdown-item">
          <div class="countdown-number">${this.countDownTemplate(this.seconds)}</div>
          <div class="countdown-label">SECONDS</div>
        </div>
      </div>
    `}}d(l,"properties",{type:{type:String,attribute:"count-down-type"},targetDate:{type:String,attribute:"target-date"},days:{type:Number,state:!0},hours:{type:Number,state:!0},minutes:{type:Number,state:!0},seconds:{type:Number,state:!0},isExpired:{type:Boolean,state:!0}});customElements.define("my-count-down",l);
