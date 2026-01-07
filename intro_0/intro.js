document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const slideCount = slides.length;
    
    // 複製第一張放到最後，達成無縫銜接
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    let currentIndex = 0;

    function moveCarousel() {
        currentIndex++;
        
        // 正常移動
        track.style.transition = "transform 0.8s ease-in-out";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 當移動到複製品 (1) 時
        if (currentIndex === slideCount) {
            setTimeout(() => {
                // 瞬間取消動畫並跳回真正的第一張
                track.style.transition = "none";
                currentIndex = 0;
                track.style.transform = `translateX(0)`;
            }, 800); // 需配合 CSS 的 transition 時間
        }
    }

    // 每 3 秒執行一次 (1->2->3->4->1)
    setInterval(moveCarousel, 3000);
});