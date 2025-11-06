import {html, LitElement} from 'lit';

export class MobileMenu extends LitElement {
    get mobileMenuButton(){
        return this.querySelector(".mobile-menu-button");
    }

    get mobileMenu(){
        return this.querySelector("#mobile-menu");
    }

    get mobileMenuToggle(){
        return this.querySelectorAll(".mobile-menu-toggle");
    }

    get mobileSubMenuToggle(){
        return this.querySelectorAll(".mobile-submenu-toggle");
    }

    updateMenuHeight(){
        const headerEle = document.querySelector(".section-header").getBoundingClientRect();
        const height = headerEle.y + headerEle.height;
        this.mobileMenu.style.height = `calc(100vh - ${height}px)`;
    }

    mobileMenuButtonClick()
    {
        // sticky header
        this.header = this.header || document.querySelector('.section-header');

        if(document.body.classList.contains("overflow-hidden-tablet") ){
            document.body.classList.remove("overflow-hidden-tablet");
            this.header.classList.remove('menu-open');
        }else{
            document.body.classList.add("overflow-hidden-tablet");
            this.header.classList.add('menu-open');
        }

        this.updateMenuHeight();
        this.mobileMenu.classList.toggle("show");
    }

    init(){
        this.mobileMenuButton.addEventListener("click", this.mobileMenuButtonClick.bind(this));
        window.addEventListener('resize', this.updateMenuHeight.bind(this));
    }

    initMenuToggle(){
        this.mobileMenuToggle.forEach(element => {
            element.addEventListener("click", function(){
                const submenu = this.nextElementSibling;
                const icon = this.querySelector("svg");

                submenu.classList.toggle("show");

                if(submenu.classList.contains("show")){
                    icon.style.transform = "rotate(180deg)";
                }else{
                    icon.style.transform = "rotate(0deg)";
                }
            });
        });
    }

    initSubMenuToggle(){
        this.mobileSubMenuToggle.forEach(element => {
            element.addEventListener("click", function(){
                const thirdMenu = this.nextElementSibling;
                const icon = this.querySelector("svg");

                thirdMenu.classList.toggle("show");

                if(thirdMenu.classList.contains("show")){
                    icon.style.transform = "rotate(180deg)";
                }else{
                    icon.style.transform = "rotate(0deg)";
                }
            })
        })
    }

    connectedCallback() {
        super.firstUpdated();

        this.init();
        this.initMenuToggle();
        this.initSubMenuToggle();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        window.removeEventListener('resize', updateMenuHeight);
    }
    
    render() {
        return html`
            <slot></slot>
        `;
    }
}


customElements.define('my-mobile-menu', MobileMenu);