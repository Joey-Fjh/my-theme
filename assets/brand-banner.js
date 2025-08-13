(function(){
    const container = $('#brandBanner');

    const track = container.find("#bannerTrack");
    const wrapper = container.find(".image-wrapper:not(.image-slide)");

    // 滚动参数
    let scrollInterval;
    let srcollDirection = container.data("scrollDirection") == 'left' ? -1 : 1; // -1 向左，1向右
    let position = 0;
    const scrollStep = 1;

    // 检查横幅是否可见
    function isBannerVisible(){
        if(!container) return false;

        const style = window.getComputedStyle(container[0]);
        
        return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            container.offsetParent !== null // 文档是否在文档流中
        );
    }

    // 计算滚动容器宽度
    function getWrapperWidth(){
        return wrapper.length ? wrapper[0].offsetWidth : 0;
    }

    // 开始滚动（仅当可见时）
    function startScrolling(){
        if(scrollInterval) clearInterval(scrollInterval);

        if(isBannerVisible()){
            scrollInterval = setInterval(()=>{
                // 再次检查可见性（防止中途被隐藏）
                if(!isBannerVisible()){
                    pauseScrolling();
                    return;
                }

                const wrapperWidth = getWrapperWidth();
                if(wrapperWidth === 0 ) return; 

                position += scrollStep * srcollDirection;

                // 滚动重置
                if(srcollDirection === -1){
                    if(position <= -wrapperWidth){
                        position = 0;
                    }
                }else {
                    if(position >= wrapperWidth){
                        position = 0;
                    }
                }
                
                track.css("transform",`translateX(${position}px)`);
            },10)
        }
    }    

    function pauseScrolling(){
        if(scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    // 处理窗口大小变化（仅当可见时执行）
    function handleResize(){
        if(!isBannerVisible()) return;

        const wrapperWidth = getWrapperWidth();
        
        if(position < -wrapperWidth){
            position = 0;
        }else if(position > 0){
            position = -wrapperWidth;
        }

        track.css("transform",`translateX(${position}px)`);
        startScrolling(); 
    }

    // window.addEventListener('resize',handleResize);

    // 移除事件
    // if(container){
    //     const observer = new MutationObserver((mutations)=>{
    //         mutations.forEach((mutation)=>{
    //             if(!document.contains(container)){
    //                 pauseScrolling();
    //                 window.removeEventListener('resize',handleResize);
    //                 observer.disconnect();
    //             }
    //         });
    //     });
    // }

    // observer.observer(document.body,{
    //     childList:true,
    //     subtree:true
    // });

    container.on('mouseenter',pauseScrolling);
    container.on('mouseleave',startScrolling);

    startScrolling();
})()