import { html , LitElement } from "lit";

class TabControl extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="tab-control">
                <div class="tab-titles">
                    <slot name="title"></slot>
                </div>
                <div class="tab-contents">
                    <slot name="content"></slot>
                </div>
            </div>
        `;
    }
}

customElements.define("tab-control", TabControl);