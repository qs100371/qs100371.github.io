document.addEventListener('DOMContentLoaded', function() {
            const floatingWindow = document.getElementById('floating-window');
            const floatingHeader = document.getElementById('floating-header');
            const closeBtn = document.getElementById('close-btn');
            
            // 关闭功能
            function handleClose(e) {
                e.preventDefault();
                floatingWindow.style.display = 'none';
            }
            
            closeBtn.addEventListener('click', handleClose);
            closeBtn.addEventListener('touchend', handleClose);
            
            // 拖动功能
            let isDragging = false;
            let offsetX, offsetY;
function startDrag(e) {
                isDragging = true;
                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;
                
                const rect = floatingWindow.getBoundingClientRect();
                offsetX = clientX - rect.left;
                offsetY = clientY - rect.top;
                
                floatingWindow.style.cursor = 'grabbing';
                e.preventDefault();
            }
            
            function drag(e) {
                if (!isDragging) return;
                
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);
                
                if (clientX === undefined || clientY === undefined) return;
                
                floatingWindow.style.left = (clientX - offsetX) + 'px';
                floatingWindow.style.top = (clientY - offsetY) + 'px';
floatingWindow.style.bottom = 'auto';
                
                e.preventDefault();
            }
            
            function endDrag() {
                isDragging = false;
                floatingWindow.style.cursor = 'grab';
                
                // 底部吸附
                const windowHeight = window.innerHeight;
                const windowBottom = floatingWindow.getBoundingClientRect().bottom;
                
                if (windowHeight - windowBottom < 50) {
                    floatingWindow.style.top = 'auto';
                    floatingWindow.style.bottom = '20px';
                }
            }
// 桌面端事件
            floatingHeader.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', endDrag);
            
            // 移动端事件
            floatingHeader.addEventListener('touchstart', startDrag, {passive: false});
            document.addEventListener('touchmove', drag, {passive: false});
            document.addEventListener('touchend', endDrag);
            
            // 防止拖动时触发其他元素
            floatingHeader.addEventListener('touchend', function(e) {
                if (isDragging) {
                    e.preventDefault();
                }
            }, {passive: false});
        });