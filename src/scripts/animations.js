import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Lenis smooth scroll ──────────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ─── Text splitting utils ─────────────────────────────────────────────────────
function splitIntoChars(el) {
  const text = el.textContent || '';
  el.setAttribute('aria-label', text);
  el.innerHTML = '';
  const spans = [...text].map((ch) => {
    const s = document.createElement('span');
    s.className = 'split-char';
    s.style.display = 'inline-block';
    s.innerHTML = ch === ' ' ? '&nbsp;' : ch;
    return s;
  });
  spans.forEach((s) => el.appendChild(s));
  return spans;
}

function splitIntoWords(el) {
  const text = (el.textContent || '').trim();
  el.setAttribute('aria-label', text);
  el.innerHTML = text
    .split(/\s+/)
    .map(
      (w) =>
        `<span class="split-word-wrap"><span class="split-word">${w}</span></span>`
    )
    .join(' ');
  return [...el.querySelectorAll('.split-word')];
}

// ─── Hero entrance ────────────────────────────────────────────────────────────
function initHero() {
  const badge    = document.querySelector('[data-hero-badge]');
  const lines    = [...document.querySelectorAll('[data-hero-line]')];
  const sub      = document.querySelector('[data-hero-sub]');
  const actions  = document.querySelector('[data-hero-actions]');
  const scrollEl = document.querySelector('[data-hero-scroll]');
  const stats    = [...document.querySelectorAll('[data-hero-stat]')];

  if (!lines.length) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });

  if (badge) {
    tl.from(badge, { y: 16, opacity: 0, duration: 0.6 });
  }

  lines.forEach((line, i) => {
    const chars = splitIntoChars(line);
    tl.from(
      chars,
      { y: 90, opacity: 0, duration: 1.0, stagger: 0.016 },
      i === 0 ? (badge ? '-=0.3' : 0) : '-=0.65'
    );
  });

  if (sub) {
    tl.from(sub, { y: 24, opacity: 0, duration: 0.8 }, '-=0.5');
  }
  if (actions) {
    tl.from([...actions.children], { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5');
  }
  if (scrollEl) {
    tl.from(scrollEl, { opacity: 0, duration: 0.5 }, '-=0.3');
  }
  if (stats.length) {
    tl.from(stats, { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4');
  }
}

// ─── Word reveals on scroll ───────────────────────────────────────────────────
function initWordReveals() {
  document.querySelectorAll('[data-split-words]').forEach((el) => {
    const words = splitIntoWords(el);
    gsap.from(words, {
      y: '105%',
      opacity: 0,
      duration: 0.9,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ─── Generic fade-up reveals ──────────────────────────────────────────────────
function initReveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || '0');
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Stagger children
  gsap.utils.toArray('[data-stagger-group]').forEach((group) => {
    const items = [...group.querySelectorAll('[data-stagger-item]')];
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ─── Navbar scroll state ──────────────────────────────────────────────────────
function initNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  ScrollTrigger.create({
    start: 60,
    onEnter: () => header.classList.add('scrolled'),
    onLeaveBack: () => header.classList.remove('scrolled'),
  });
}

// ─── Portfolio hover parallax ─────────────────────────────────────────────────
function initPortfolioHover() {
  document.querySelectorAll('.portfolio-item').forEach((item) => {
    const inner = item.querySelector('.portfolio-item__bg');
    if (!inner) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
      gsap.to(inner, { x, y, duration: 0.5, ease: 'power2.out' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
    });
  });
}

// ─── Animated number counters ─────────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
  });
}

// ─── Horizontal line reveals ──────────────────────────────────────────────────
function initLineReveals() {
  document.querySelectorAll('[data-line-reveal]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ─── Init ──────────────────────────────────────────────────────────────────────
function init() {
  initHero();
  initWordReveals();
  initReveals();
  initNavbar();
  initPortfolioHover();
  initCounters();
  initLineReveals();
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

export { lenis };
