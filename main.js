/* main.js — mobile menu + smooth scroll */
(function(){
  // menu toggle
  const btn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#primary-menu');
  let open = false;

  function openMenu(){
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.position = 'fixed';
    menu.style.top = '72px';
    menu.style.right = '18px';
    menu.style.background = 'white';
    menu.style.padding = '16px';
    menu.style.borderRadius = '12px';
    menu.style.boxShadow = '0 14px 40px rgba(12,18,60,0.12)';
    menu.style.zIndex = '70';
    btn.setAttribute('aria-expanded','true');
    open = true;
  }
  function closeMenu(){
    menu.style.display = '';
    menu.style.position = '';
    menu.style.top = '';
    menu.style.right = '';
    menu.style.background = '';
    menu.style.padding = '';
    menu.style.borderRadius = '';
    menu.style.boxShadow = '';
    menu.style.zIndex = '';
    btn.setAttribute('aria-expanded','false');
    open = false;
  }

  if(btn){
    btn.addEventListener('click', function(){
      if(open) closeMenu(); else openMenu();
    });
  }

  // close mobile menu on link click
  document.querySelectorAll('#primary-menu a').forEach(a=>{
    a.addEventListener('click', ()=> {
      if(window.innerWidth <= 980 && open) closeMenu();
    });
  });

  // smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // update url hash without jumping
          history.replaceState(null,'',href);
        }
      }
    });
  });

  // ensure nav visibility on load (sticky)
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 980 && open){
      closeMenu();
    }
  });
})();


/* =========================
   PAGE LOAD ANIMATION
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const animatedEls = document.querySelectorAll(
    ".hero-left, .hero-right, .section, .class-card, .tutor-card, .testi-card"
  );

  animatedEls.forEach((el, i) => {
    el.setAttribute("data-animate", "");
    setTimeout(() => {
      el.classList.add("show");
    }, i * 120);
  });
});



/* =========================
   SIMPLE AUTO IMAGE SLIDER
========================= */
(function () {
  const images = document.querySelectorAll(
    ".why-media img"
  );

  if (images.length < 2) return;

  let current = 0;

  images.forEach((img, i) => {
    img.style.transition = "opacity 0.6s ease";
    img.style.opacity = i === 0 ? "1" : "0";
    img.style.position = "absolute";
  });

  const wrapper = images[0].parentElement;
  wrapper.style.position = "relative";

  setInterval(() => {
    images[current].style.opacity = "0";
    current = (current + 1) % images.length;
    images[current].style.opacity = "1";
  }, 3000);
})();
