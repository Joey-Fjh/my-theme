(function(){
    const container = $('.my-image-banner__container');
    
    const carousel = container.find('.image-wrapper');
    const slides = container.find('.image-slide');
    const prevBtn = container.find('.left');
    const nextBtn = container.find('.right');
    const autoplaySpeed = carousel.data("autoplaySpeed") || 10000;

    let currentIndex = 0;
    let autoplayTimer;

    const prevSlide = ()=>{
        currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        updateSlide();
    }

    const nextSlide = ()=>{
        currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        updateSlide();
    }

    const updateSlide = ()=>{
        slides.toArray().forEach((slide,index) => {
        slide.classList.toggle('active',index === currentIndex);
        });
    }

    if(prevBtn) prevBtn.on('click',prevSlide);
    if(nextBtn) nextBtn.on('click',nextSlide);

    const startAutoPlay = ()=>{
        if(autoplayTimer) clearInterval(autoplayTimer);

        autoplayTimer = setInterval(nextSlide, autoplaySpeed);
    }

    const stopAutoPlay = ()=>{
        clearInterval(autoplayTimer);
    }

    carousel.on('mouseenter', stopAutoPlay);
    carousel.on('mouseleave', startAutoPlay);

    startAutoPlay();
})()
