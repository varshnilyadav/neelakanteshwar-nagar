/* ============================================================
   NEELAKANTESHWAR NAGAR — Script
   Scroll animations, sticky header, mobile nav, form handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Header ----
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to Top visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Back to Top ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Mobile Navigation ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMobileNav() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    mobileOverlay.classList.toggle('show');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on link click
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to observe anymore
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ---- Count-Up Animation for Highlight Numbers ----
  const countElements = document.querySelectorAll('.highlights__item-time .number[data-count]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        if (isNaN(target) || target === 0) return;

        let current = 0;
        const increment = target / 30;
        const duration = 1200;
        const stepTime = duration / 30;

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(counter);
          } else {
            el.textContent = Math.ceil(current);
          }
        }, stepTime);

        countObserver.unobserve(el);
      }
    });
  }, {
    threshold: 0.5
  });

  countElements.forEach(el => {
    countObserver.observe(el);
  });

  // ---- Parallax Effect for Hero Background ----
  const heroBg = document.querySelector('.hero__bg');

  if (heroBg) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- Enquiry Form Handling ----
  const enquiryForm = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const formData = new FormData(enquiryForm);
      const data = Object.fromEntries(formData.entries());

      // Validate required fields
      if (!data.name || !data.phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      // Validate phone number (basic)
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return;
      }

      // Simulate form submission
      const submitBtn = enquiryForm.querySelector('.form-submit');
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        enquiryForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Log to console (for development)
        console.log('Enquiry submitted:', data);

        // Reset after 5 seconds
        setTimeout(() => {
          enquiryForm.style.display = 'block';
          formSuccess.classList.remove('show');
          enquiryForm.reset();
          submitBtn.textContent = 'Submit Enquiry';
          submitBtn.disabled = false;
        }, 5000);
      }, 1500);
    });
  }

  // ---- Active Nav Link Highlight on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a:not(.navbar__cta)');

  function highlightNav() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#c9a84c';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Subtle Entrance Animation for Hero Content ----
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';

    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';

      // Trigger child reveal animations after hero enters
      setTimeout(() => {
        const heroReveals = heroContent.querySelectorAll('.reveal');
        heroReveals.forEach(el => el.classList.add('active'));
      }, 400);
    }, 300);
  }

  // ---- Image Lazy Load Enhancement ----
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.decoding = 'async';
    });
  }

  // ---- Interactive 2D Floor Plan Tooltip & Highlighting ----
  const roomRects = document.querySelectorAll('.room-rect');
  const floorTooltip = document.getElementById('floorTooltip');
  const tooltipName = document.getElementById('tooltipName');
  const tooltipDim = document.getElementById('tooltipDim');

  const roomDetails = {
    parking: { name: 'Parking Area', dim: "10' × 15'" },
    kitchen: { name: 'Kitchen Room', dim: "15' × 15'" },
    stairs: { name: 'Stairs Area', dim: "5.5' × 10.5'" },
    puja: { name: 'Puja Room', dim: "4' × 5'" },
    living: { name: 'Living / Dining Hall', dim: "17' × 15'" },
    cwc: { name: 'Common Washroom', dim: "5.5' × 8.5'" },
    child: { name: "Children Bedroom", dim: "12' × 12'" },
    wcdress: { name: 'WC / Dress Room', dim: "8' × 6'" },
    master: { name: 'Master Bedroom', dim: "14' × 14'" }
  };

  if (roomRects.length && floorTooltip) {
    roomRects.forEach(rect => {
      const roomKey = rect.getAttribute('data-room');
      const detail = roomDetails[roomKey];

      if (!detail) return;

      const updateTooltip = () => {
        tooltipName.textContent = detail.name;
        tooltipDim.textContent = detail.dim;
        floorTooltip.setAttribute('visibility', 'visible');

        const x = parseFloat(rect.getAttribute('x'));
        const y = parseFloat(rect.getAttribute('y'));
        const w = parseFloat(rect.getAttribute('width'));
        const h = parseFloat(rect.getAttribute('height'));

        // Center tooltip over room rect (tooltip width is 130, height is 44)
        const tx = (x + w / 2) - 65;
        const ty = (y + h / 2) - 22;

        floorTooltip.setAttribute('transform', `translate(${tx}, ${ty})`);
      };

      // Mouse events for desktop
      rect.addEventListener('mouseenter', updateTooltip);
      rect.addEventListener('mouseleave', () => {
        if (!rect.classList.contains('active-room')) {
          floorTooltip.setAttribute('visibility', 'hidden');
        }
      });

      // Click / Touch events for mobile
      rect.addEventListener('click', (e) => {
        e.stopPropagation();
        roomRects.forEach(r => r.classList.remove('active-room'));
        rect.classList.add('active-room');
        updateTooltip();
      });
    });

    // Hide tooltip when clicking elsewhere
    document.addEventListener('click', () => {
      roomRects.forEach(r => r.classList.remove('active-room'));
      floorTooltip.setAttribute('visibility', 'hidden');
    });
  }

  // ---- Login Gate Security ----
  const loginGate = document.getElementById('loginGate');
  const loginForm = document.getElementById('loginForm');
  const gateUid = document.getElementById('gateUid');
  const gatePwd = document.getElementById('gatePwd');
  const gateError = document.getElementById('gateError');

  // Check existing session auth
  if (sessionStorage.getItem('neelakanteshwar_authorized') === 'true') {
    if (loginGate) {
      loginGate.classList.add('authorized');
      document.body.classList.remove('gate-active');
    }
  } else {
    document.body.classList.add('gate-active');
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const uid = gateUid.value.trim();
      const pwd = gatePwd.value;

      if (uid === 'varshnil' && pwd === 'munna') {
        // Successful login
        sessionStorage.setItem('neelakanteshwar_authorized', 'true');
        gateError.classList.remove('show');
        if (loginGate) {
          loginGate.classList.add('authorized');
        }
        document.body.classList.remove('gate-active');
      } else {
        // Failed login
        gateError.classList.add('show');
        gatePwd.value = '';
        gatePwd.focus();
      }
    });
  }

});


