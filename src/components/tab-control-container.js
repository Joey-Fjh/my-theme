import { html , LitElement } from "lit";

class TabControl extends LitElement {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        this.navContainer = this.querySelector('[data-tab-nav]');
        this.panels = this.querySelectorAll('.tab-panel');

        this.panels.forEach((panel, index) => { 
            const title = panel.getAttribute('data-title');

            const div = document.createElement('div');
            div.className = 'tab-title';
            div.innerText = title;
            this.navContainer.appendChild(div);
            
            div.setAttribute('data-tab-index', index);
            panel.setAttribute('data-tab-index', index);
        });

        this._handleClick = this.handleClick.bind(this);
        this.navContainer.addEventListener('click',this._handleClick);
    }

    handleClick(e) {
        const target = e.target.closest('[data-tab-index]');
        if(!target) return;

        this.panels.forEach(panel => {
            panel.classList.remove("active");
        });

        this.navContainer.children.forEach(title => {
            title.classList.remove("active");
        });

        target.classList.add("active");
        this.panels[target.getAttribute("data-tab-index")].classList.add("active");
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.navContainer.removeEventListener('click',this._handleClick);
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define("tab-control", TabControl);