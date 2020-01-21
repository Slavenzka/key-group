{
  if (window.matchMedia('(min-width: 1200px)').matches) {
    const galleryItems = [...document.querySelectorAll('.gallery__item')];

    function move (evt, start) {
      const shift = {
        x: (start.x - evt.clientX) / 15,
        y: (start.y - evt.clientY) / 15
      }

      start = {
        x: evt.clientX,
        y: evt.clientY
      }

      evt.target.style.left = shift.x + "px";
      evt.target.style.top = shift.y + "px";
    }

    galleryItems.forEach(item => {
      const image = item.querySelector('[data-product-image]');

      image.addEventListener('mouseenter', evt => {
        image.style.transform = 'Scale(1.25)';
        image.style.transitionDuration = '0.5s';
        image.style.transitionProperty = 'transform';
        image.style.top = '0';
        image.style.left = '0';

        const startCoords = {
          x: evt.clientX,
          y: evt.clientY
        }

        image.addEventListener('mousemove', evt => move(evt, startCoords));
      });

      image.addEventListener('mouseleave', () => {
        image.style.transform = 'Scale(1)';
        image.style.top = '0';
        image.style.left = '0';
        image.style.transitionProperty = 'transform, left, top';

        image.removeEventListener('mousemove', evt => move(evt, startCoords));
      });
    });
  }
}
