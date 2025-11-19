import {html,LitElement} from 'lit';

class TabControl extends LitElement{
    constructor(){
        super();


    }

    connectedCallback(){
        super.connectedCallback();
    }

    disconnectedCallback(){
        super.disconnectedCallback();
    }

    render(){
        return html`
            <slot></slot>
        `;
    }
}

customElements.define('tab-control', TabControl);    
