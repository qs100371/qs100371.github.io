document.addEventListener('DOMContentLoaded', function() {
    const floatingWindow = document.getElementById('floating-window');
    const floatingHeader = document.getElementById('floating-header');
    const closeBtn = document.getElementById('close-btn');
    const iframe = document.getElementById('floating-iframe');
    
    // 关闭按钮功能
    closeBtn.addEventListener('click', function() {
        floatingWindow.style.display = 'none';
    });
    
    // 拖动功能
    let isDragging = false;
    let offsetX, offsetY;
    
    floatingHeader.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
        offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
        floatingWindow.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        floatingWindow.style.left = (e.clientX - offsetX) + 'px';
        floatingWindow.style.top = (e.clientY - offsetY) + 'px';
        floatingWindow.style.bottom = 'auto'; // 取消底部定位
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        floatingWindow.style.cursor = 'grab';
        
        // 如果窗口靠近底部，自动吸附到底部
        const windowHeight = window.innerHeight;
        const windowBottom = floatingWindow.getBoundingClientRect().bottom;
        
        if (windowHeight - windowBottom < 50) {
            floatingWindow.style.top = 'auto';
            floatingWindow.style.bottom = '20px';
        }
    });
    
    // 改变iframe的URL（如果需要从外部控制）
    function changeIframeUrl(url) {
        iframe.src = url;
    }
    
    // 示例：5秒后更改iframe内容（可选）
    // setTimeout(() => changeIframeUrl('https://another-website.com'), 5000);
});