// source/js/announcement-fix.js
(function() {
    
    // 加载自定义字体
    // https://cdn.jsdelivr.net/gh/qs100371/fonts/kaiti.woff2
    // /fonts/maozedong.woff2   hanyixingkaijian.woff2   simkai.woff2  kaiti.woff2
function loadCustomFont() {
    if (!document.getElementById('custom-kaiti-font')) {
        const style = document.createElement('style');
        style.id = 'custom-kaiti-font';
        style.textContent = `
            @font-face {
                font-family: 'CustomKaiti';
                src: url('/fonts/simkai.woff2') format('woff2');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
            }
            
            }
        `;
        document.head.appendChild(style);
    }
}
loadCustomFont();

    let lastContent = '';
    
    function setAnnouncement() {
        const announEl = document.getElementById("site-info");
        
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
                            <span style="font-family: 'CustomKaiti','KaiTi', cursive; background: linear-gradient(45deg, #ff3b6f, #ff8e53); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${authorMatch[1]}</span>
                            <span style="margin: 0 4px; background: linear-gradient(45deg, #ff3b6f, #ff8e53); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">·</span>
                            <span style="font-family: 'CustomKaiti','KaiTi', cursive; font-style: italic; background: linear-gradient(45deg, #ff3b6f, #ff8e53); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${authorMatch[2]}</span>
                        `;
                    } else {
                        authorHtml = `<span style="background: linear-gradient(45deg, #ff3b6f, #ff8e53); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${authorLine}</span>`;
                    }
                    
                    formattedHtml = `
                        <div style="
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            height: 80vh;
                            text-align: center;
                        ">
                            <div style="
                                display: inline-block;
                                background-color: rgba(0, 0, 0, 0.35);
                                border-radius: 8px;
                                padding: 10px 16px;
                                backdrop-filter: blur(2px);
                                -webkit-backdrop-filter: blur(2px);
                                border: 1px solid rgba(255, 255, 255, 0.15);
                                margin-top: -60vh;       
                            ">
                                <div style="
                                    font-family: 'CustomKaiti','KaiTi', '楷体',cursive;
                                    line-height: 2;
                                    text-align: center;
                                    background: linear-gradient(45deg, #ff3b6f, #ff8e53, #ffd700);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                                    font-size: 1.3em;
                                    letter-spacing: 1px;
                                    word-break: break-word;
                                    font-weight: bold;
                                ">
                                    ${poem}
                                </div>
                                <div style="
                                    font-size: 1.1em;
                                    text-align: center;
                                    margin-top: 8px;
                                    padding-top: 6px;
                                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                                    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
                                    letter-spacing: 0.5px;
                                    font-weight: 500;
                                ">
                                    ${authorHtml}
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    formattedHtml = `
                        <div style="
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            height: 80vh;
                            text-align: center;
                        ">
                            <div style="
                                display: inline-block;
                                background-color: rgba(0, 0, 0, 0.35);
                                border-radius: 8px;
                                padding: 10px 16px;
                                background: linear-gradient(45deg, #ff6b6b, #feca57);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                                backdrop-filter: blur(2px);
                                -webkit-backdrop-filter: blur(2px);
                                border: 1px solid rgba(255, 255, 255, 0.15);
                                line-height: 2;
                                font-family: 'CustomKaiti','KaiTi', '楷体', cursive;
                                font-size: 1.3em;
                                margin-top: -10vh;
                                font-weight: bold;
                            ">${data.replace(/\n/g, '<br>')}</div>
                        </div>
                    `;
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