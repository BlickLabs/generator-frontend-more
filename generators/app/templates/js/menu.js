(function () {
  var mobile = window.matchMedia('(max-width: 876px)'); // Change

  function detectTouch(e) {
    if (!$(e.target).is('nav .menu-trigger') && !$(e.target).is('nav .menu-container') && !$(e.target).closest('nav .menu-container').length && $('nav .menu-container').hasClass('show-menu')) {
      e.preventDefault();
      $('nav .menu-container').removeClass('show-menu');
      $('body').removeClass('noscroll');
    }
  }

  function detectClick() {
    if ($('nav .menu-container').hasClass('show-menu')) {
      $('nav .menu-container').removeClass('show-menu');
      $('body').removeClass('noscroll');
    } else {
      $('nav .menu-container').addClass('show-menu');
      $('body').addClass('noscroll');
    }
  }

  if (mobile.matches) {
    $('body')[0].addEventListener('touchstart', detectTouch, {passive: false});
    $('nav .menu-trigger').click(detectClick);
  } else {
    $('body')[0].removeEventListener('touchstart', detectTouch, {passive: false});
    $('nav .menu-trigger').off('click');
    $('body').removeClass('noscroll');
  }

  $(window).resize(function () {
    $('body')[0].removeEventListener('touchmove', detectTouch, {passive: false});
    $('nav .menu-trigger').off('click');
    $('body').removeClass('noscroll');
    $('nav .menu-container').removeClass('show-menu');

    if (mobile.matches) {
      $('body')[0].addEventListener('touchmove', detectTouch, {passive: false});
      $('nav .menu-trigger').click(detectClick);
    }
  });
})();