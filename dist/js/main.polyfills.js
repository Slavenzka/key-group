/*! key-group-trial v0.0.1 | (c) 2020 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
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
  galleryTop.on('slideChange', (function () {
    activeImgSrc = images[galleryTop.activeIndex].src;
  }));

  // Init lightbox
  let lightbox = new Lightbox();
  lightbox.load();

  // Open lightbox on btn click with previously saved active image src
  document.querySelector('[data-lightbox-trigger]').addEventListener('click', (function () {
    lightbox.open(activeImgSrc);
  }));

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



/**
 * debounce
 * @param {integer} milliseconds This param indicates the number of milliseconds
 *     to wait after the last call before calling the original function.
 * @param {object} What "this" refers to in the returned function.
 * @return {function} This returns a function that when called will wait the
 *     indicated number of milliseconds after the last call before
 *     calling the original function.
 */
Function.prototype.debounce = function (milliseconds, context) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = context || this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

/**
* throttle
* @param {integer} milliseconds This param indicates the number of milliseconds
*     to wait between calls before calling the original function.
* @param {object} What "this" refers to in the returned function.
* @return {function} This returns a function that when called will wait the
*     indicated number of milliseconds between calls before
*     calling the original function.
*/
Function.prototype.throttle = function (milliseconds, context) {
    var baseFunction = this,
        lastEventTimestamp = null,
        limit = milliseconds;

    return function () {
        var self = context || this,
            args = arguments,
            now = Date.now();

        if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
            lastEventTimestamp = now;
            baseFunction.apply(self, args);
        }
    };
};
{
  if (window.matchMedia('(max-width: 991px)').matches) {
    const header = document.querySelector('[data-header]');
    const navTrigger = header.querySelector('[data-menu-trigger]');
    const navContainer = header.querySelector('[data-menu-container]');
    const submenuTriggers = header.querySelectorAll('[data-submenu-trigger]');
    const submenuContainers = header.querySelectorAll('[data-submenu-trigger] + [data-submenu-container]');

    // JS operation on menuContainer height to make it available for transition-duration css prop
    function toggleMenuCollapse (menuContainer, collapseTrigger) {
      let expanded = true;
      let height = menuContainer.offsetHeight;
      menuContainer.style.height = 0 + 'px';

      collapseTrigger.addEventListener('click', (function() {
        if (expanded) {
          menuContainer.style.height = 0;
          expanded = false;
        } else {
          menuContainer.style.height = height+ 'px';
          expanded = true;
        }
      }));
    }
    // creation of event listeners for submenu toggle
    submenuTriggers.forEach((function (trigger, index) {
      toggleMenuCollapse(submenuContainers[index], trigger);
    }));

    // creation of event listeners for menu toggle
    navTrigger.addEventListener('click', (function () {
      navContainer.classList.toggle('nav--opened');
    }));
  }
}

{
  const triggers = document.querySelectorAll('[data-phone-trigger]');

  triggers.forEach((function (triggerItem) {
    const phone = triggerItem.querySelector('[data-phone-number]');
    const label = triggerItem.querySelector('[data-phone-label]');
    const originalPhone = phone.textContent;

    function showPhone () {
      phone.textContent = originalPhone;
      label.style = 'display: none';
      triggerItem.removeEventListener('click', showPhone);
    }

    phone.textContent = phone.textContent.slice(0, phone.textContent.length - 3) + 'XXX'

    triggerItem.addEventListener('click', showPhone);
  }));
}

{
  if (window.matchMedia('(min-width: 1200px)').matches) {
    const galleryItems = document.querySelectorAll('.gallery__item');

    function move (evt, start) {
      const shift = {
        x: (start.x - evt.clientX) / 25,
        y: (start.y - evt.clientY) / 25
      }

      start = {
        x: evt.clientX,
        y: evt.clientY
      }

      evt.target.style.left = shift.x + "px";
      evt.target.style.top = shift.y + "px";
    }

    galleryItems.forEach((function (item) {
      const image = item.querySelector('[data-product-image]');

      image.addEventListener('mouseenter', (function (evt) {
        image.style.top = '0';
        image.style.left = '0';

        const startCoords = {
          x: evt.clientX,
          y: evt.clientY
        }

        const handleMove = function (evt) {
          move(evt, startCoords);
        }

        image.addEventListener('mousemove', handleMove);

        image.addEventListener('mouseleave', (function () {
          image.style.top = '0';
          image.style.left = '0';

          image.removeEventListener('mousemove', handleMove);
        }));
      }));
    }));
  }
}

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}