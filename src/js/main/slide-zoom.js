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

    galleryItems.forEach(function (item) {
      const image = item.querySelector('[data-product-image]');

      image.addEventListener('mouseenter', function (evt) {
        image.style.transform = 'Scale(1.2)';
        image.style.transitionDuration = '0.5s';
        image.style.transitionProperty = 'transform';
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

        image.addEventListener('mouseleave', function () {
          image.style.transform = 'Scale(1)';
          image.style.top = '0';
          image.style.left = '0';
          image.style.transitionProperty = 'transform, left, top';

          image.removeEventListener('mousemove', handleMove);
        });
      });
    });
  }
}
