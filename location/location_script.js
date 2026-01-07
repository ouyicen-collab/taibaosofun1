window.onload = function() {
    realign();
    const pendingMessage = localStorage.getItem('pendingToast');
    if (pendingMessage) {
        showLocationToast(pendingMessage);
        localStorage.removeItem('pendingToast');
    }
};

function realign() {
    if (typeof imageMapResize === 'function') {
        imageMapResize();
    }
}

/**
 * 解決飛到右邊：使用 pageX/Y 絕對定位
 */
function showTooltip(e, text) {
    const tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = text;
    tooltip.style.display = 'block';

    // 絕對座標追蹤，不論地圖怎麼偏移，文字框都在滑鼠下游標
    tooltip.style.left = (e.pageX + 15) + 'px';
    tooltip.style.top = (e.pageY + 15) + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

/**
 * 徹底解決「不對」問題：換圖後連續刷新校正
 */
function switchToTaibao() {
    const mapImg = document.getElementById('main-map');
    if (!mapImg) return;

    mapImg.style.opacity = '0';
    mapImg.src = '太保行政圖.png'; 
    mapImg.setAttribute('usemap', '#taibao-detail-map');

    mapImg.onload = function() {
        mapImg.style.opacity = '1';
        // 圖片載入後延遲刷新，確保寬度穩定
        realign();
        setTimeout(realign, 150);
        setTimeout(realign, 500);
    };
}

function goToAttraction(name, url) {
    localStorage.setItem('pendingToast', `${name}<br>跳轉成功`);
    window.location.href = url;
}

function showLocationToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerHTML = message;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }
}