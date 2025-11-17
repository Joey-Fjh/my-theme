import { AnimateContainer,AnimateUtilities } from "./animate-container";

export class AnimateImageBannerContainer extends AnimateContainer { 
    constructor() {
        super();

        AnimateUtilities.register(this.sectionId, this.name, (targets)=>{
            console.log(targets);
        });
    }

    render(){
        return html`<slot></slot>`;
    }
}

customElements.define('animate-image-banner-container', AnimateImageBannerContainer);