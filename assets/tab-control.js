import{i as t,x as s}from"./lit-element.js";class o extends t{constructor(){super()}render(){return s`
            <div class="tab-control">
                <div class="tab-titles">
                    <slot name="title"></slot>
                </div>
                <div class="tab-contents">
                    <slot name="content"></slot>
                </div>
            </div>
        `}}customElements.define("tab-control",o);
