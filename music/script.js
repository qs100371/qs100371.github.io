document.addEventListener('DOMContentLoaded', function() {
    const floatingWindow = document.getElementById('floating-window');
    const floatingHeader = document.getElementById('floating-header');
    const closeBtn = document.getElementById('close-btn');
    const iframe = document.getElementById('floating-iframe');
    
    // 关闭按钮功能 - 同时支持点击和触摸
    closeBtn.addEventListener('click', closeWindow);
    closeBtn.addEventListener('touchend', closeWindow);
    
    function closeWindow(e) {
        e.preventDefault(); // 防止触摸事件触发其他行为
        floatingWindow.style.display = 'none';
    }
    
    // 拖动功能 - 同时支持鼠标和触摸
    let isDragging = false;
    let offsetX, offsetY;
    
    // 开始拖动
    floatingHeader.addEventListener('mousedown', startDrag);
    floatingHeader.addEventListener('touchstart', startDrag, {passive: false});
    
    function startDrag(e) {
        isDragging = true;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        const rect = floatingWindow.getBoundingClientRect();
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
        
        floatingWindow.style.cursor = 'grabbing';
        e.preventDefault(); // 防止触摸滚动
    }
    
    // 拖动中
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, {passive: false});
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        
        floatingWindow.style.left = (clientX - offsetX) + 'px';
        floatingWindow.style.top = (clientY - offsetY) + 'px';
        floatingWindow.style.bottom = 'auto';
        
        e.preventDefault(); // 防止触摸滚动
    }
    
    // 结束拖动
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function endDrag() {
        isDragging = false;
        floatingWindow.style.cursor = 'grab';
        
        // 如果窗口靠近底部，自动吸附到底部
        const windowHeight = window.innerHeight;
        const windowBottom = floatingWindow.getBoundingClientRect().bottom;
        
        if (windowHeight - windowBottom < 50) {
            floatingWindow.style.top = 'auto';
            floatingWindow.style.bottom = '20px';
        }
    }
    
    // 防止触摸时触发iframe内容
    floatingHeader.addEventListener('touchend', function(e) {
        if (!isDragging) {
            e.preventDefault();
        }
    }, {passive: false});
});