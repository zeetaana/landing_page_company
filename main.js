/* main-responsive.js – Enhanced mobile menu + interactions */

(function(){
  'use strict';
  
  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#primary-menu');
  const body = document.body;
  let isMenuOpen = false;

  function openMenu(){
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.position = 'fixed';
    menu.style.top = '60px';
    menu.style.left = '0';
    menu.style.right = '0';
    menu.style.background = 'white';
    menu.style.padding = '20px';
    menu.style.boxShadow = '0 10px 40px rgba(12,18,60,0.15)';
    menu.style.zIndex = '9998';
    menu.style.maxHeight = 'calc(100vh - 60px)';
    menu.style.overflowY = 'auto';
    
    menuToggle.setAttribute('aria-expanded','true');
    body.style.overflow = 'hidden'; // Prevent body scroll when menu open
    isMenuOpen = true;
    
    // Animate menu items
    const menuItems = menu.querySelectorAll('li');
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  function closeMenu(){
    menu.style.display = '';
    menu.style.flexDirection = '';
    menu.style.position = '';
    menu.style.top = '';
    menu.style.left = '';
    menu.style.right = '';
    menu.style.background = '';
    menu.style.padding = '';
    menu.style.boxShadow = '';
    menu.style.zIndex = '';
    menu.style.maxHeight = '';
    menu.style.overflowY = '';
    
    menuToggle.setAttribute('aria-expanded','false');
    body.style.overflow = '';
    isMenuOpen = false;
  }

  if(menuToggle && menu){
    menuToggle.addEventListener('click', function(e){
      e.stopPropagation();
      if(isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e){
      if(isMenuOpen && !menu.contains(e.target) && !menuToggle.contains(e.target)){
        closeMenu();
      }
    });

    // Close mobile menu on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if(window.innerWidth <= 980 && isMenuOpen) {
          closeMenu();
        }
      });
    });
  }

  // ========================================
  // CLOSE MENU ON RESIZE TO DESKTOP
  // ========================================
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if(window.innerWidth > 980 && isMenuOpen){
        closeMenu();
      }
    }, 250);
  });

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      
      // Skip empty or just "#" hrefs
      if(!href || href === '#') return;
      
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 60;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.replaceState(null, '', href);
      }
    });
  });

  // ========================================
  // PAGE LOAD ANIMATION
  // ========================================
  document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
      ".hero-left, .hero-right, .section, .class-card, .tutor-card, .testi-card, .contact-card"
    );

    // Set initial state
    animatedElements.forEach((el) => {
      el.setAttribute("data-animate", "");
    });

    // Trigger animations with stagger
    setTimeout(() => {
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("show");
        }, index * 80);
      });
    }, 100);
  });

  // ========================================
  // SCROLL REVEAL ANIMATION
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('[data-animate]');
    scrollElements.forEach(el => observer.observe(el));
  });

  // ========================================
  // AUTOMATIC IMAGE SLIDER (Why Section)
  // ========================================
  (function(){
    const images = document.querySelectorAll(".why-media .big-photo img");

    if(images.length < 2) return;

    let currentIndex = 0;

    // Set initial styles
    images.forEach((img, i) => {
      img.style.transition = "opacity 0.8s ease-in-out";
      img.style.opacity = i === 0 ? "1" : "0";
      img.style.position = i === 0 ? "relative" : "absolute";
      img.style.top = "0";
      img.style.left = "0";
      img.style.width = "100%";
      img.style.height = "100%";
    });

    const wrapper = images[0].parentElement;
    wrapper.style.position = "relative";
    wrapper.style.overflow = "hidden";

    // Auto slide every 4 seconds
    setInterval(() => {
      images[currentIndex].style.opacity = "0";
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.opacity = "1";
    }, 4000);
  })();

  // ========================================
  // NAVBAR SHADOW ON SCROLL
  // ========================================
  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if(currentScroll > 50){
      header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================
  if('IntersectionObserver' in window){
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          if(img.dataset.src){
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // TOUCH SUPPORT FOR HOVER EFFECTS
  // ========================================
  if('ontouchstart' in window){
    document.querySelectorAll('.class-card, .tutor-card, .testi-card, .contact-card').forEach(card => {
      card.addEventListener('touchstart', function(){
        this.style.transform = this.dataset.hoverTransform || 'scale(1.02)';
      });
      
      card.addEventListener('touchend', function(){
        setTimeout(() => {
          this.style.transform = '';
        }, 300);
      });
    });
  }

  // ========================================
  // PREVENT LAYOUT SHIFT
  // ========================================
  window.addEventListener('load', () => {
    // Set explicit heights for images to prevent layout shift
    document.querySelectorAll('img').forEach(img => {
      if(!img.style.height && img.naturalHeight){
        img.style.height = 'auto';
      }
    });
  });

  // ========================================
  // ACCESSIBILITY: ESC KEY TO CLOSE MENU
  // ========================================
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && isMenuOpen){
      closeMenu();
      menuToggle.focus();
    }
  });

  // ========================================
  // FOCUS TRAP IN MOBILE MENU
  // ========================================
  const focusableElements = 'a[href], button:not([disabled]), input:not([disabled])';
  
  function trapFocus(element){
    const focusables = element.querySelectorAll(focusableElements);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    element.addEventListener('keydown', function(e){
      if(e.key !== 'Tab') return;

      if(e.shiftKey){
        if(document.activeElement === firstFocusable){
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if(document.activeElement === lastFocusable){
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    });
  }

  if(menu){
    trapFocus(menu);
  }

  // ========================================
  // CONSOLE LOG FOR DEBUGGING
  // ========================================
  console.log('✅ NihongoPro - Responsive scripts loaded successfully');

})();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target); // animasi sekali saja
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll("[data-animate]").forEach(el => {
  observer.observe(el);
});