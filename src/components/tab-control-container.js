import { html , LitElement, css} from "lit";

class TabControl extends LitElement {
    static styles = [
        css`
            :host{
                display: flex;
                flex-direction: column;
            };
        `
    ];

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        this.navContainer = this.querySelector('[data-tab-nav]');
        this.panels = this.querySelectorAll('.tab-panel');

        this.buildTabs();

        this._handleClick = this.handleClick.bind(this);
        this._handleSlotChange = this.handleSlotChange.bind(this);

        this.navContainer.addEventListener('click',this._handleClick);
        this.shadowRoot?.querySelector("slot")?.addEventListener("slotchange", this._handleSlotChange);

        // init active tab
        if (this.panels.length > 0) {
            this.activeTab(0);
        }
    }

    buildTabs(){
        this.navContainer.innerHTML = ''; // clear old tab titles

        this.panels.forEach((panel, index) => { 
            const title = panel.getAttribute('data-title');

            const div = document.createElement('div');
            
            div.className = 'tab-title';
            div.innerText = title;
            div.setAttribute('data-tab-index', index);
            
            panel.setAttribute('data-tab-index', index);

            this.navContainer.appendChild(div);
        });
    }

    activeTab(index){
        this.panels.forEach(panel => {
            if(!panel.classList.contains("hidden")) panel.classList.add("hidden");
            panel.classList.remove("active");
        });

        for(const title of this.navContainer.children){
            title.classList.remove("active");
        }

        const title = this.navContainer.children[index];
        const panel = this.panels[index];

        if(title && panel){
            title.classList.add("active");
            panel.classList.remove("hidden");
            panel.classList.add("active");
        } 
    }

    handleClick(e) {
        const target = e.target.closest('[data-tab-index]');
        if(!target) return;

        const index = Number(target.getAttribute('data-tab-index'));
        this.activeTab(index);
    }

    handleSlotChange(){
        const oldActiveIndex = [...this.panels].findIndex(panel => panel.classList.contains('active'));
        
        this.buildTabs();
        
        if(!this.panels[oldActiveIndex]){
            const newIndex = Math.max(0,oldActiveIndex-1);
            this.activeTab(newIndex);
        }else{
            this.activeTab(oldActiveIndex);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.navContainer.removeEventListener('click',this._handleClick);
        this.shadowRoot?.querySelector("slot")?.removeEventListener("slotchange", this._handleSlotChange);
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define("tab-control", TabControl);