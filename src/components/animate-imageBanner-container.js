import { AnimateContainer,AnimateUtilities } from "./animate-container";

export class AnimateImageBannerContainer extends AnimateContainer { 
    constructor() {
        super();

        console.log(this.sectionId,'--',this.name,'---',this.targets);
        AnimateUtilities.register(this.sectionId, this.name, (targets)=>{
            console.log(targets);
        });
    }
}

customElements.define('animate-image-banner-container', AnimateImageBannerContainer);