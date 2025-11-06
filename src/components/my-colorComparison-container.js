import { html, LitElement } from "lit";

class MyColorComparisonContainer extends LitElement {
    static properties = {
        isDragging: { type: Boolean ,state:true},
        startX: { type: Number ,state:true},
        currentPosition: { type: Number ,state:true}
    }

    get _container() {
        return this.querySelector('.comparison-container');
    }

    get _handle(){
        return this._container.querySelector('[data-handle]');
    }

    get _leftImg(){
        return this._container.querySelector('.left-image');
    }

    get _rightImg(){
        return this._container.querySelector('.right-image');
    }

    get _sliderLine(){
        return this._container.querySelector('[data-slider-line]');
    }
    
    constructor() {
        super();

        this.isDragging = false;
        this.startX = 0;
        this.currentPosition = 50; // Start at 50% (middle)
    }

    connectedCallback() {
        super.connectedCallback();

        this.initPCEvents();
        this.initMobileEvents();
    }

    firstUpdated() { 
        this.updateClipPath(this.currentPosition);
        this.updateHandlePosition(this.currentPosition);
    }

    initPCEvents() { 
        this._container.addEventListener('mousedown',(e)=>{
            this.isDragging = true;
            this.startX = e.clientX;

            this._container.classList.add('dragging');
            e.preventDefault();
        });

        this._container.addEventListener('mousemove',(e)=>{ 
            if(!this.isDragging) return;

            const rect = this._container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0,Math.min(100,(x/rect.width)*100));

            this.updateClipPath(percentage);
            this.updateHandlePosition(percentage);

            this.currentPosition = percentage;
        });

        this._container.addEventListener("mouseup", () => { 
            if(this.isDragging){
                this.isDragging = false;
                this._container.classList.remove("dragging");
            }
        });
    }

    initMobileEvents() { 
        this._container.addEventListener("touchStart", (e) => { 
            this.isDragging = true;
            this.startX = e.touches[0].clientX;

            this._container.classList.add("dragging");
            e.preventDefault();
        });

        this._container.addEventListener("touchMove", (e) => { 
            if(!this.isDragging) return;

            const rect = this._container.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const percentage = Math.max(0,Math.min(100,(x/rect.width)*100));

            this.updateClipPath(percentage);
            this.updateHandlePosition(percentage);

            this.currentPosition = percentage;
            e.preventDefault();
        });

        this._container.addEventListener('touchend', () => { 
            if(this.isDragging){
                this.isDragging = false;

                this._container.classList.remove('dragging');
            }
        });
    }

    updateClipPath(percentage){
        this._rightImg.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
    }

    updateHandlePosition(percentage) { 
        this._handle.style.left = `${percentage}%`;
        this._sliderLine.style.left = `${percentage}%`;
    }

    render() {
        return html`<slot></slot>`
    }
}

customElements.define('my-color-comparison-container', MyColorComparisonContainer);
