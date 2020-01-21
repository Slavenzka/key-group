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

      collapseTrigger.addEventListener('click', function() {
        if (expanded) {
          menuContainer.style.height = 0;
          expanded = false;
        } else {
          menuContainer.style.height = height+ 'px';
          expanded = true;
        }
      });
    }
    // creation of event listeners for submenu toggle
    submenuTriggers.forEach(function (trigger, index) {
      toggleMenuCollapse(submenuContainers[index], trigger);
    });

    // creation of event listeners for menu toggle
    navTrigger.addEventListener('click', function () {
      navContainer.classList.toggle('nav--opened');
    });
  }
}
