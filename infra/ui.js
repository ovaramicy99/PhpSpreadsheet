/**
 * ui.js - Local replacement for NXT named-panel ui.js
 * Dollar4D Template
 *
 * Fungsi yang di-handle:
 * 1. Sidebar toggle (open/close) dengan animasi slide
 * 2. Overlay backdrop
 * 3. Owl Carousel untuk category navbar & togel
 * 4. Active menu highlight berdasarkan URL
 * 5. Sticky navbar scroll behavior
 * 6. Togel countdown timer
 * 7. Password visibility toggle
 * 8. Icon replacement (alt-based)
 * 9. Auto-invert footer logo
 * 10. Hamburger SVG icon
 *
 * TIDAK melakukan: margin-left push pada #content
 */

(function($) {
  'use strict';

  // ============================================================
  // 1. SIDEBAR TOGGLE
  // ============================================================
  function openSidebar() {
    $('#sidebar').addClass('active');
    $('#sidebar-overlay').addClass('active');
    $('body').addClass('sidebar-open');
  }

  function closeSidebar() {
    $('#sidebar').removeClass('active');
    $('#sidebar-overlay').removeClass('active');
    $('body').removeClass('sidebar-open');
  }

  // ============================================================
  // 2. NAVBAR ACTIVE STATE
  // ============================================================
  function setActiveNavItem() {
    var currentPath = window.location.pathname;
    $('a.text-decoration-none').each(function() {
      var href = $(this).attr('href');
      if (!href) return;
      var linkPath = href.replace(/^https?:\/\/[^\/]+/, '');
      if (linkPath && currentPath === linkPath) {
        $(this).addClass('active-nav');
      }
    });
  }

  // ============================================================
  // 3. STICKY TOP NAVBAR SHADOW ON SCROLL
  // ============================================================
  function handleScroll() {
    if ($(window).scrollTop() > 10) {
      $('#navbar-top').addClass('scrolled');
    } else {
      $('#navbar-top').removeClass('scrolled');
    }
  }

  // ============================================================
  // 4. CATEGORY NAVBAR OWL CAROUSEL (mobile)
  // ============================================================
  function initCategoryCarousel() {
    if ($('#category-navbar').length && typeof $.fn.owlCarousel !== 'undefined') {
      $('#category-navbar').owlCarousel({
        loop: false,
        margin: 5,
        nav: false,
        dots: false,
        autoWidth: true,
        autoplay: false,
        responsive: {
          0:   { items: 4 },
          480: { items: 6 },
          768: { items: 8 },
        }
      });
    }
  }

  // ============================================================
  // 5. TOGEL COUNTDOWN TIMER
  // ============================================================
  function updateTogelCountdown() {
    $('.togel-countdown-timer').each(function() {
      var time   = parseInt($(this).data('time'));
      var status = parseInt($(this).data('status'));

      if (status === 0) { $(this).text('TUTUP'); return; }
      if (status === 2) { $(this).text('Masih Buka'); return; }

      if (status === 1) {
        var delta = time - Date.now();
        if (delta < 0) { $(this).text('TUTUP'); return; }

        var h = Math.floor(delta / 3600000);
        delta -= h * 3600000;
        var m = Math.floor(delta / 60000);
        delta -= m * 60000;
        var s = Math.floor(delta / 1000);

        $(this).text(
          ('0' + h).slice(-2) + ' : ' +
          ('0' + m).slice(-2) + ' : ' +
          ('0' + s).slice(-2)
        );
      }
    });
  }

  // ============================================================
  // 6. TOGEL CAROUSEL
  // ============================================================
  function initTogelCarousel() {
    if ($('#carousel-togel').length && typeof $.fn.owlCarousel !== 'undefined') {
      $('#carousel-togel').owlCarousel({
        margin: 10,
        autoWidth: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        loop: true,
      });
    }
  }

  // ============================================================
  // 7. PASSWORD TOGGLE VISIBILITY
  // ============================================================
  function initPasswordToggle() {
    $('#togglePass').on('click', function() {
      var pass = $('#pass');
      var icon = $(this).find('i');
      if (pass.attr('type') === 'password') {
        pass.attr('type', 'text');
        icon.removeClass('fa-eye').addClass('fa-eye-slash');
      } else {
        pass.attr('type', 'password');
        icon.removeClass('fa-eye-slash').addClass('fa-eye');
      }
    });
  }

  // ============================================================
  // 8. AUTO-HIDE EMAIL FIELD ON REGISTER
  // ============================================================
  function hideEmailField() {
    var emailField = document.querySelector('.form-group.mb-3.email');
    if (emailField) emailField.style.display = 'none';
  }

  // ============================================================
  // 9. ICON REPLACEMENT (alt-based)
  // Edit iconMap di sini untuk ganti URL icon
  // ============================================================
  // var iconMap = {
  //   'Togel Icon':    'http://rajaberas88.host/dollar4dimg/togel.png',
  //   'Sport Icon':    'http://rajaberas88.host/dollar4dimg/sport.png',
  //   'Casino Icon':   'http://rajaberas88.host/dollar4dimg/casino.png',
  //   'Slot Icon':     'http://rajaberas88.host/dollar4dimg/slot.png',
  //   'Fishing Icon':  'http://rajaberas88.host/dollar4dimg/ikan.png',
  //   'Table Icon':    'http://rajaberas88.host/dollar4dimg/table.png',
  //   'COCK F. Icon':  'http://rajaberas88.host/dollar4dimg/sabung.png',
  //   'Arcade Icon':   'http://rajaberas88.host/dollar4dimg/arcade.png',
  //   'Promo Icon':    'http://rajaberas88.host/dollar4dimg/promo.png',
  //   'Home Icon':     'http://rajaberas88.host/dollar4dimg/home.png',
  //   'Chat Icon':     'http://rajaberas88.host/dollar4dimg/chat.png',
  //   'Login Icon':    'http://rajaberas88.host/dollar4dimg/login.png',
  //   'Register Icon': 'http://rajaberas88.host/dollar4dimg/daftar.png',
  //   'Deposit Icon':  'http://rajaberas88.host/dollar4dimg/depo.png',
  //   'Withdraw Icon': 'http://rajaberas88.host/dollar4dimg/wede.png',
  //   'NXT':           'https://dash.takenupload.org/69db52925e22b',
  // };

  // function replaceIcons() {
  //   $('img').each(function() {
  //     var alt = $(this).attr('alt');
  //     if (alt && iconMap[alt] && $(this).attr('src') !== iconMap[alt]) {
  //       $(this).attr('src', iconMap[alt]);
  //     }
  //   });
  // }

  // ============================================================
  // 10. HAMBURGER ICON SVG
  // ============================================================
  function initHamburgerIcon() {
    var btn = document.getElementById('sidebarCollapse');
    if (btn) {
      btn.innerHTML =
        '<svg viewBox="0 0 100 80" width="30" height="30">' +
          '<rect width="100" height="15" rx="8" fill="white"></rect>' +
          '<rect y="30" width="100" height="15" rx="8" fill="white"></rect>' +
          '<rect y="60" width="100" height="15" rx="8" fill="white"></rect>' +
        '</svg>';
    }
  }

  // ============================================================
  // 11. FOOTER LOGO AUTO INVERT
  // ============================================================
  function autoInvertLogo() {
    var element = document.querySelector('.footer-logo');
    if (!element) return;
    var bgColor = null, parent = element.parentElement;
    while (parent && (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent')) {
      bgColor = window.getComputedStyle(parent).backgroundColor;
      parent = parent.parentElement;
    }
    if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') bgColor = 'rgb(255,255,255)';
    var match = bgColor.match(/\d+/g);
    if (!match) return;
    var r = +match[0], g = +match[1], b = +match[2];
    element.style.filter = ((r * 299 + g * 587 + b * 114) / 1000) < 200
      ? 'brightness(0) invert(1)'
      : 'brightness(0) invert(0)';
  }

  // ============================================================
  // INIT - Run on DOM Ready
  // ============================================================
  $(document).ready(function() {

    // --- Sidebar events ---
    $('#sidebarCollapse').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openSidebar();
    });

    $('#dismiss').on('click', function(e) {
      e.preventDefault();
      closeSidebar();
    });

    $('#sidebar-overlay').on('click', function() {
      closeSidebar();
    });

    $(document).on('keydown', function(e) {
      if (e.key === 'Escape') closeSidebar();
    });

    // Tutup sidebar saat klik link di dalamnya (mobile UX)
    $('#sidebar a').on('click', function() {
      if ($(window).width() < 1200) {
        closeSidebar();
      }
    });

    // --- Init semua fitur ---
    initHamburgerIcon();
    initCategoryCarousel();
    initTogelCarousel();
    initPasswordToggle();
    setActiveNavItem();
    hideEmailField();
    replaceIcons();
    autoInvertLogo();

    // Scroll handler
    $(window).on('scroll', handleScroll);
    handleScroll();

    // Countdown timer
    setInterval(updateTogelCountdown, 500);

    // Watch DOM untuk icon replacement pada elemen dinamis
    if (window.MutationObserver) {
      var iconObserver = new MutationObserver(function(mutations) {
        var needReplace = false;
        mutations.forEach(function(m) {
          if (m.addedNodes.length) needReplace = true;
        });
        if (needReplace) replaceIcons();
      });
      iconObserver.observe(document.body, { childList: true, subtree: true });
    }

  });

})(jQuery);
