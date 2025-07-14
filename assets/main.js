// Custom JS extracted from all HTML files

document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTS ---
    const body = document.body;
    const html = document.documentElement;
    const header = document.getElementById('main-header');
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIcon = document.getElementById('theme-icon');
    const langSwitcher = document.getElementById('lang-switcher');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const langElements = document.querySelectorAll('[data-lang-fa]');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBars = document.querySelectorAll('.progress-bar > div');

    // --- THEMES ---
    const themes = ['theme-dark', 'theme-light', 'theme-code'];
    const themeIcons = {
        'theme-dark': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`,
        'theme-light': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>`,
        'theme-code': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>`
    };
    let currentThemeIndex = 0;

    const applyTheme = (themeName) => {
        body.className = 'bg-primary text-primary';
        body.classList.add(themeName);
        if(themeIcon) themeIcon.innerHTML = themeIcons[themeName];
        localStorage.setItem('theme', themeName);
        currentThemeIndex = themes.indexOf(themeName);
    };

    const savedTheme = localStorage.getItem('theme') || 'theme-dark';
    applyTheme(savedTheme);

    if(themeSwitcher) themeSwitcher.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(themes[currentThemeIndex]);
    });

    // --- LANGUAGE ---
    const updateLanguage = (lang) => {
        html.lang = lang;
        html.dir = lang === 'fa' ? 'rtl' : 'ltr';
        if(langSwitcher) langSwitcher.textContent = lang === 'fa' ? 'EN' : 'FA';
        langElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) el.innerHTML = text;
        });
        localStorage.setItem('language', lang);
    };

    const savedLang = localStorage.getItem('language') || 'fa';
    updateLanguage(savedLang);

    if(langSwitcher) langSwitcher.addEventListener('click', () => {
        const newLang = html.lang === 'fa' ? 'en' : 'fa';
        updateLanguage(newLang);
    });
    
    // --- SMART HEADER ---
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            if(header) header.style.top = `-${header.offsetHeight}px`;
        } else {
            if(header) header.style.top = '0';
        }
        lastScrollY = window.scrollY;
    });

    // --- MOBILE MENU ---
    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') mobileMenu.classList.add('hidden');
        });
    }

    // --- FADE-IN ON SCROLL ---
    const faders = document.querySelectorAll('.fade-in-section');
    if ("IntersectionObserver" in window) {
        const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    } else {
        // Fallback for older browsers
        faders.forEach(fader => fader.classList.add('is-visible'));
    }

    // --- INTERSECTION OBSERVER FOR ANIMATIONS (about.html) ---
    if(progressBars && progressBars.length) {
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Animate progress bars
                    if (entry.target.matches('.progress-bar > div')) {
                        const width = entry.target.getAttribute('data-width');
                        entry.target.style.width = width;
                    }
                    observer.unobserve(entry.target);
                }
            });
        };
        if ("IntersectionObserver" in window) {
            const options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
            const observer = new IntersectionObserver(observerCallback, options);
            progressBars.forEach(bar => observer.observe(bar));
        } else {
            progressBars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));
        }
    }

    // --- ACTIVE NAV LINK ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Animate progress bars on page load
    document.querySelectorAll('.progress-bar > div').forEach(function (bar) {
        var width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(function () {
                bar.style.width = width;
            }, 300);
        }
    });
}); 

// Fade-in animation for timeline and sections
function handleFadeInSections() {
  var fadeEls = document.querySelectorAll('.fade-in-section');
  fadeEls.forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('is-visible');
    }
  });
}
window.addEventListener('scroll', handleFadeInSections);
document.addEventListener('DOMContentLoaded', handleFadeInSections); 