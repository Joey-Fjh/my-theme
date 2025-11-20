import { html , LitElement } from "lit";

class TabControl extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <div class="tab-control">
                <slot name="tab">
                    <div class="tab-titles">
                        <slot name="title"></slot>
                    </div>
                    <div class="tab-contents">
                        <slot name="content"></slot>
                    </div>
                </slot>
            </div>
        `;
    }
}

customElements.define("tab-control", TabControl);