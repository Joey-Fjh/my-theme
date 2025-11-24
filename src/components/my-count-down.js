import { LitElement, html, css ,adoptStyles } from "lit"


const baseCss = css`
  :host {
    width: 100%;
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
`;
const normalCss = css`
  .countdown-container {
    width: 100%;
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
`;
const otherCss = css`
  .countdown-container {
    width: 100%;
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
`;


export class CountdownComponent extends LitElement {
  static properties = {
    type: { type: String ,attribute:"count-down-type"},
    targetDate: { type: String, attribute: "target-date" },
    days: { type: Number, state: true },
    hours: { type: Number, state: true },
    minutes: { type: Number, state: true },
    seconds: { type: Number, state: true },
    isExpired: { type: Boolean, state: true },
  }

  get segmentPatterns(){
    return {
      0: [1, 1, 1, 0, 1, 1, 1], // top, top-left, top-right, middle, bottom-left, bottom-right, bottom
      1: [0, 0, 1, 0, 0, 1, 0],
      2: [1, 0, 1, 1, 1, 0, 1],
      3: [1, 0, 1, 1, 0, 1, 1],
      4: [0, 1, 1, 1, 0, 1, 0],
      5: [1, 1, 0, 1, 0, 1, 1],
      6: [1, 1, 0, 1, 1, 1, 1],
      7: [1, 0, 1, 0, 0, 1, 0],
      8: [1, 1, 1, 1, 1, 1, 1],
      9: [1, 1, 1, 1, 0, 1, 1]
    }
  }

  constructor() {
    super()

    this.type = 'normal'
    this.targetDate = ""
    this.days = 0
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
    this.isExpired = false
    this.intervalId = null
  }

  connectedCallback() {
    super.connectedCallback()
    this.startCountdown()
  }

  firstUpdated() {
    super.firstUpdated()
    
    adoptStyles(this.shadowRoot, [
      baseCss,
      this.type === 'normal' ? normalCss : otherCss
    ])
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  updated(changedProperties) {
    if (changedProperties.has("targetDate")) {
      this.startCountdown()
    }else if(changedProperties.has("isExpired")){
      this.dispatchEvent(new CustomEvent('expired-change', {
        detail: { value: this.isExpired },
        bubbles: true,      
        composed: true
      }));
    }
  }

  startCountdown() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    if (!this.targetDate) {
      console.warn("CountdownComponent: target-date attribute is required")
      return
    }

    const updateCountdown = () => {
      const now = new Date().getTime()
      const target = new Date(this.targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        this.days = Math.floor(difference / (1000 * 60 * 60 * 24))
        this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        this.seconds = Math.floor((difference % (1000 * 60)) / 1000)
        this.isExpired = false
      } else {
        this.days = 0
        this.hours = 0
        this.minutes = 0
        this.seconds = 0
        this.isExpired = true

        // Dispatch custom event when countdown expires
        this.dispatchEvent(
          new CustomEvent("countdown-expired", {
            bubbles: true,
            composed: true,
          }),
        )

        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
      }

      if(this.type !== 'normal'){
        this.initOther()
      }
    }

    updateCountdown()

    this.intervalId = setInterval(updateCountdown, 1000)
  }

  updateDigit(digitElment,val){
    const segments = digitElment.querySelectorAll(".segment")
    const pattern = this.segmentPatterns[val]

    segments.forEach((segment, index) => {
      if(pattern[index]){
        segment.classList.add('active')
      }else{
        segment.classList.remove('active')
      }
    })
  }

  initOther(){
    const digits = this.renderRoot.querySelectorAll(".digit")

    const values = [
      Math.floor(this.days / 10), this.days%10,
      Math.floor(this.hours / 10), this.hours%10,
      Math.floor(this.minutes / 10), this.minutes%10,
      Math.floor(this.seconds / 10), this.seconds%10,
    ]

    values.forEach((val,index)=>{
      if(digits[index]){
        this.updateDigit(digits[index],val)
      }
    })
  }

  formatNumber(num) {
    return num.toString().padStart(2, "0")
  }

  countDownTemplate(number){
    const normal = html`
      ${this.formatNumber(number)}
    `;

    const other = html`
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
    `

    return this.type === 'normal' ? normal : other;
  }

  render() {
    return html`
      <div class="countdown-container ${this.isExpired ? "expired" : ""}" part="container">
        <div class="countdown-item" part="item">
          <div class="countdown-number" part="number">${this.countDownTemplate(this.days)}</div>
          <div class="countdown-label" part="label">DAYS</div>
        </div>
        <div class="countdown-item" part="item">
          <div class="countdown-number" part="number">${this.countDownTemplate(this.hours)}</div>
          <div class="countdown-label" part="label">HOURS</div>
        </div>
        <div class="countdown-item" part="item">
          <div class="countdown-number" part="number">${this.countDownTemplate(this.minutes)}</div>
          <div class="countdown-label" part="label">MINUTES</div>
        </div>
        <div class="countdown-item" part="item">
          <div class="countdown-number" part="number">${this.countDownTemplate(this.seconds)}</div>
          <div class="countdown-label" part="label">SECONDS</div>
        </div>
      </div>
    `
  }
}

customElements.define("my-count-down", CountdownComponent)
