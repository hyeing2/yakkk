/**
 * KV 디저트 슬라이더
 * - 1초마다 동시에 전환
 * - 왼쪽/오른쪽은 항상 다른 이미지 (인덱스를 절반씩 엇갈리게 유지)
 *
 * 이미지 순서 (총 5개):
 * 0: top-scone
 * 1: top-bcc
 * 2: top-sand
 * 3: top-k-donut
 * 4: top-financier
 *
 * 왼쪽:  0 → 1 → 2 → 3 → 4 → 0 ...
 * 오른쪽: 2 → 3 → 4 → 0 → 1 → 2 ... (2칸 뒤에서 시작)
 */
(function () {
    const sliders = document.querySelectorAll('.dessert-slider');
    if (sliders.length < 2) return;

    const leftImgs  = Array.from(sliders[0].querySelectorAll('.dessert-img'));
    const rightImgs = Array.from(sliders[1].querySelectorAll('.dessert-img'));
    const total = leftImgs.length; // 6

    const OFFSET = 2;

    let idx = 0;
    let rotation = 0; // m-dish 누적 회전각

    const mDish = document.querySelector('.m-dish');

    // 초기 active 설정
    [...leftImgs, ...rightImgs].forEach(img => img.classList.remove('active'));
    leftImgs[idx].classList.add('active');
    rightImgs[(idx + OFFSET) % total].classList.add('active');

    setInterval(() => {
        // 디저트 전환
        leftImgs[idx].classList.remove('active');
        rightImgs[(idx + OFFSET) % total].classList.remove('active');

        idx = (idx + 1) % total;

        leftImgs[idx].classList.add('active');
        rightImgs[(idx + OFFSET) % total].classList.add('active');

        // m-dish 90도씩 오른쪽 회전
        rotation += 90;
        if (mDish) mDish.style.transform = `rotate(${rotation}deg)`;
    }, 2000);
})();
