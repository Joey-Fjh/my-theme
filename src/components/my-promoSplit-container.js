import { html, LitElement } from "lit";

export class MyPromoSplitContainer extends LitElement {
    _mySwiper = null;
    _mq = null;
    _productIndex = 1;

    get overlay_texts(){
        return this.querySelectorAll('.overlay-text');
    }
    
    get products(){
        return this.querySelectorAll('.product-selected');
    }
    
    get addToCartBtn(){
        return this.querySelector('.add-to-cart-btn');
    }

    constructor() {
        super();

        this.overlay_texts.forEach(el=>{
            el.addEventListener('click',()=>{
                this._productIndex = Number(el.dataset.index);
                
                this.products.forEach(productEl=>{
                    productEl.style.display = Number(productEl.dataset.index) == this._productIndex 
                    ? 'block' : 'none';
                }); 
            });
        });

        this.addToCartBtn.addEventListener('click',()=>{
            this.handleAddToBtnClick();
        });
    }

    firstUpdated(){
        this._mq = window.matchMedia('(max-width: 768px)');
        this.handleMediaChange(this._mq);
        this._mq.addEventListener('change',(e)=>this.handleMediaChange(e));
    }

    handleAddToBtnClick(){
        const selectedProduct = Array.from(this.products).find(
            el => Number(el.dataset.index ?? 0) == this._productIndex 
        );

        const productIds = Array.from(selectedProduct.querySelectorAll(".product-item")).map(
            product => Number(product.dataset.productId)
        );
        
        fetch(routes.cart_add_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: productIds.map(id => ({ id:Number(id), quantity: 1 }))
            })
        })
        .then(res => {
            window.location.href = '/cart';
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleMediaChange(e){
        if (e.matches) {
            if (!this._mySwiper) {
                import('swiper').then(({ Swiper }) => {
                    this._mySwiper = new Swiper(this.querySelector('.swiper'), {
                        slidesPerView: 'auto',
                        centeredSlides: true,
                        freeMode: true
                    });
                });
            }
        } 
        else {
            if (this._mySwiper) {
                this._mySwiper.destroy(true, true);
                this._mySwiper = null;
            }
        }
    }
    
    render() {
        return html`<slot></slot>`
    }
}

customElements.define("my-promo-split-container", MyPromoSplitContainer);
