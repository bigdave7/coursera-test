let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    document.getElementById('header-nav').classList.add('navbar-hidden');
  } else {
    document.getElementById('header-nav').classList.remove('navbar-hidden');
  }
  lastScrollTop = currentScroll;
});
