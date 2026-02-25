// source/js/announcement-fix.js
(function() {
    // 加载在线字体
    function loadFont() {
        if (!document.getElementById('google-font-kai')) {
            const link = document.createElement('link');
            link.id = 'google-font-kai';
            link.href = 'https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }
    loadFont();
    
    let lastContent = '';
    
    function setAnnouncement() {
        const announEl = document.querySelector(
            '.card-announcement .content, ' +
            '.announcement-content, ' +
            '.aside-content .card-announcement div:not(.item-headline)'
        );
        
        if (!announEl) {
            setTimeout(setAnnouncement, 1000);
            return;
        }
        
        fetch("https://api.qs100371.top/songci.php")
            .then(r => r.text())
            .then(data => {
                const lines = data.split('\n').filter(line => line.trim() !== '');
                
                if (lines.length >= 2) {
                    const poemLines = lines.slice(0, -1);
                    const poem = poemLines.join('<br>');
                    
                    const authorLine = lines[lines.length - 1];
                    const authorMatch = authorLine.match(/<宋>(.*?)•(.*)/);
                    
                    let authorHtml = '';
                    if (authorMatch) {
                        authorHtml = `
                            <span style="font-family: 'ZCOOL KuaiLe', 'KaiTi', cursive; font-weight: 400;">${authorMatch[1]}</span>
                            <span style="margin: 0 4px;">·</span>
                            <span style="font-family: 'ZCOOL KuaiLe', 'KaiTi', cursive; font-style: italic;">${authorMatch[2]}</span>
                        `;
                    } else {
                        authorHtml = authorLine;
                    }
                    
                    formattedHtml = `
                        <div style="
                            font-family: 'ZCOOL KuaiLe', 'KaiTi', '楷体', 'STKaiti', cursive;
                            line-height: 1.8;
                            text-align: center;
                            padding: 8px 0;
                            font-weight: 400;
                        ">
                            ${poem}
                        </div>
                        <div style="
                            font-size: 0.9em;
                            color: #8b4513;
                            text-align: right;
                            margin-top: 8px;
                            padding-top: 6px;
                            border-top: 1px dotted #d2b48c;
                        ">
                            ${authorHtml}
                        </div>
                    `;
                } else {
                    formattedHtml = data.replace(/\n/g, '<br>');
                }
                
                if (formattedHtml !== lastContent) {
                    announEl.innerHTML = formattedHtml;
                    lastContent = formattedHtml;
                }
            })
            .catch(() => {});
    }

    setTimeout(setAnnouncement, 500);
})();