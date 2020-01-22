{
  const triggers = document.querySelectorAll('[data-phone-trigger]');

  triggers.forEach(function (triggerItem) {
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
  });
}
