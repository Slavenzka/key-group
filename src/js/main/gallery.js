if ( !isIE ) {
  // Swiper config for thumbs gallery
  let galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 5,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        slidesPerView: 5
      }
    },
    allowTouchMove: false,
    navigation: {
      nextEl: '.gallery__btn--next',
      prevEl: '.gallery__btn--prev',
    }
  });
  // Swiper config for full image gallery
  let galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });

  // Get images array and save first image src
  const images = document.querySelectorAll('[data-product-image]');
  let activeImgSrc = images[0].src;

  // Switch saved src to use in lightbox js trigger on button click
  galleryTop.on('slideChange', function () {
    activeImgSrc = images[galleryTop.activeIndex].src;
  });

  // Init lightbox
  let lightbox = new Lightbox();
  lightbox.load();

  // Open lightbox on btn click with previously saved active image src
  document.querySelector('[data-lightbox-trigger]').addEventListener('click', function () {
    lightbox.open(activeImgSrc);
  });

  let adsGallery = new Swiper('.related__container', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.related__btn--next',
      prevEl: '.related__btn--prev',
    },
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      495: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
}


