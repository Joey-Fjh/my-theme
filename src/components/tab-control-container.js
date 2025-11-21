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

        this.navContainer.addEventListener('click', (e) => { 
            const target = e.target.closest('.tab-title');
            if (!target) return;

            const index = target.getAttribute('data-tab-index');
            this.panels.forEach((panel, i) => {
                if (i === index) {
                    panel.classList.add('active');
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define("tab-control", TabControl);