const slider = () => {
  const slider = new Swiper('.swiper', {
    effect: "fade",
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.hero__slider-arrow.arrow__next',
      prevEl: '.hero__slider-arrow.arrow__prev',
    },
  });
  // <div class="hero__slider-pagination swiper-pagination"></div>
  // <div class="hero__slider-arrow arrow__next swiper-button-next">
  //   <span class="arrow_carrot-left"></span>
  // </div>
  // <div class="hero__slider-arrow arrow__prev swiper-button-prev">
  //   <span class="arrow_carrot-left"></span>
  // </div>
};

slider();