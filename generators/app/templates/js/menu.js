var last_known_scroll_position = 0;
var ticking = false;

var siteNavbar = document.querySelector('.navbar');

//navbar-fixed-top
function doSomething(scroll_pos) {
  if (window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname === '/project-name/index.html' || window.location.pathname === '/project-name/') {
    if (scroll_pos > 30) {
      siteNavbar.classList.add('navbar-scroll');

    } else {
      siteNavbar.classList.remove('navbar-scroll');
    }
  }
}

doSomething();

window.addEventListener('scroll', function(e) {
  if (e.view) {
    last_known_scroll_position = e.view.pageYOffset;
  }
  else {
    last_known_scroll_position = window.scrollY;
  }
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false
    });
  }
  ticking = true;
});

function showMenu() {
  document.querySelector('#menuContainer').style.width = '85%';
  document.querySelector('#hamburgerMenu').style.display = 'none';
}

function hideMenu() {
  document.querySelector('#menuContainer').style.width = '0%';
  document.querySelector('#hamburgerMenu').style.display = 'inline';
}

window.addEventListener('click', function(e) {
  if (!e.target.dataset.hasOwnProperty('attribute')) {
    hideMenu();
  }
});

/*Events of touchstart to mobile version*/

var showHamburger = document.querySelector('#hamburgerMenu');

showHamburger.addEventListener('touchstart', function(e) {
  e.preventDefault();
  showMenu();
});

var hideHamburger = document.querySelector('#hideHamburger');

hideHamburger.addEventListener('touchstart', function(e) {
  e.preventDefault();
  hideMenu();
});

/* Events of click to desktop version*/

showHamburger.addEventListener('click', function(e) {
  e.preventDefault();
  showMenu();
});

hideHamburger.addEventListener('click', function(e) {
  e.preventDefault();
  hideMenu();
});
