import { LitElement, html, css } from 'lit';
import Swiper from 'swiper';
import { Navigation,Autoplay,Pagination } from 'swiper/modules';

export class SwiperContainer extends LitElement {
	static styles = 
	[
		css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
				position: relative;
			}
		`
	];

	static properties = {
		speed: { type: Number },
		autoplay: { type: Boolean },
		progressBar:{type:Boolean},
		slidesPerView:{ 
			converter: {
				fromAttribute(value) {
					if (value === 'auto') return 'auto';
					
					const num = Number(value);
					return isNaN(num) ? value : num;
				}
			}
		},
		slidesPerViewMobile:{
			converter: {
				fromAttribute(value) {
					if (value === 'auto') return 'auto';
					
					const num = Number(value);
					return isNaN(num) ? value : num;
				}
			}
		},
		slidesSpaceBetween: { type: Number }
	};

	constructor() {
		super();

		this.speed = 5;
		this.autoplay = false;
		this.progressBar = false;
		
		// Default Banner depends on the value of Slides Per View 
		this.slidesPerView = 1;
		this.slidesPerViewMobile = 1;
		this.slidesSpaceBetween = 0;
	}

	connectedCallback() {
		super.connectedCallback();
		
		let progressbarDom = null;
		if(this.progressBar){
			progressbarDom = this.querySelector('.swiper-pagination');
		}

		const swiper = new Swiper(this.querySelector('.swiper'), {
			slidesPerView: this.slidesPerViewMobile,
			modules: [Navigation,Autoplay,Pagination],
			spaceBetween: this.slidesSpaceBetween,
			autoplay: this.autoplay && {
				delay: this.speed * 1000,
				disableOnInteraction: false,
			},
			loop: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			...(this.progressBar
			? {
				pagination: {
					el: progressbarDom,
					type: "progressbar",
				}
			}
			: {}),
			on: {
				init() {
					if(!progressbarDom) return;

					progressbarDom.addEventListener('click', (e) => {
						if(swiper.params.slidesPerView == 'auto') return;

						const {left , width} = progressbarDom.getBoundingClientRect();
						const ratio = (e.clientX - left) / width;

						const totalSegments = swiper.slides.length - swiper.params.slidesPerView + 1;
						const targetIndex = Math.floor(ratio * totalSegments);

						swiper.slideTo(targetIndex);
					});
				}
			},
			breakpoints: {
				750: {
					slidesPerView: this.slidesPerView,
				},
			}
		});
	}
	
	render() {
		return html`
			<slot></slot>
		`;
	}
}

customElements.define('my-swiper-container', SwiperContainer);
