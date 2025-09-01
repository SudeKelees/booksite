// script.js - dinamik, güvenli kaydırma
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const list = movieLists[i];
  if (!list) return;
  const items = list.querySelectorAll(".movie-item");
  if (items.length === 0) return;
  const wrapper = list.closest(".movie-list-wrapper") || list.parentElement;

  let currentShift = 0; // negatif veya 0 olacak (translateX negatif ile sağa kaydırma)

  function computeMetrics() {
    // Öğe aralığını (width + gap) güvenli şekilde hesapla
    const rect1 = items[0].getBoundingClientRect();
    let delta = rect1.width; // fallback
    if (items.length > 1) {
      const rect2 = items[1].getBoundingClientRect();
      delta = Math.round(rect2.left - rect1.left); // includes gap
    }

    const wrapperWidth = wrapper.clientWidth || wrapper.getBoundingClientRect().width;
    const visibleCount = Math.max(1, Math.floor(wrapperWidth / delta));
    const maxShift = Math.max(0, (items.length - visibleCount) * delta);

    return { delta, visibleCount, maxShift };
  }

  function onArrowClick() {
    const { delta, maxShift } = computeMetrics();

    if (maxShift === 0) {
      // kaydırılacak öğe yok
      currentShift = 0;
      list.style.transform = `translateX(${currentShift}px)`;
      return;
    }

    // sağa kaydır (negatif X)
    if (Math.abs(currentShift) < maxShift) {
      currentShift -= delta;
      if (Math.abs(currentShift) > maxShift) currentShift = -maxShift;
    } else {
      // sona geldiyse başa dön
      currentShift = 0;
    }

    list.style.transform = `translateX(${currentShift}px)`;
    // İstersen debug için şu satırı aç:
    // console.log('delta', delta, 'maxShift', maxShift, 'currentShift', currentShift);
  }

  arrow.addEventListener("click", onArrowClick);

  // resize olursa limitleri yeniden uygula (mevcut shift sınırın üstündeyse clamp et)
  window.addEventListener("resize", () => {
    const { maxShift } = computeMetrics();
    if (Math.abs(currentShift) > maxShift) {
      currentShift = -maxShift;
      list.style.transform = `translateX(${currentShift}px)`;
    }
  });
});




const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".container,.navbar,.sidebar,.sidebar i,.toggle,.toggle-ball,.movie-list-filter select,.movie-list-title")

ball.addEventListener("click", function() {
    items.forEach((item) => item.classList.toggle("active"));
});
