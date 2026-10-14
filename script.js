(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false');
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();

  // Small native entrance fallback ensures the page is alive even if GSAP's CDN is unavailable.
  const revealTargets = document.querySelectorAll('.intro-grid,.platform-heading,.feature,.manifesto-content,.closing h2');
  if (!('IntersectionObserver' in window) || reduced) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    revealTargets.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealTargets.forEach(el => observer.observe(el));
  }

  const story = document.querySelector('.story-wrap');
  const title = document.querySelector('.story-title');
  const desc = document.querySelector('.story-description');
  const kickerNumber = document.querySelector('.chapter-number');
  const kickerLabel = document.querySelector('.chapter-label');
  const progress = document.querySelector('.story-progress i');
  const chapterCount = document.querySelector('.chapter-count b');
  const chapterLinks = [...document.querySelectorAll('.story-chapters span')];
  const copy = [
    { title: 'Every moving part.<br><em>One clear picture.</em>', desc: 'Bookings arrive. Guests have questions. Teams have tasks. Delvane connects the dots, without adding another layer of work.', label: 'EVERYTHING IN SYNC' },
    { title: 'Less time chasing.<br><em>More time hosting.</em>', desc: 'Guest conversations, arrivals and daily tasks stay connected. Your team knows what needs attention—and what can wait.', label: 'LESS ADMIN' },
    { title: 'The details handled.<br><em>The welcome is yours.</em>', desc: 'A calmer back office gives you more room for thoughtful, personal hospitality. That is what all this is for.', label: 'MORE HOSPITALITY' }
  ];
  let activeChapter = -1;
  function setChapter(index) {
    index = Math.max(0, Math.min(2, index));
    if (index === activeChapter) return;
    activeChapter = index;
    const data = copy[index];
    title.innerHTML = data.title; desc.textContent = data.desc;
    kickerNumber.textContent = `0${index + 1}`; kickerLabel.textContent = data.label;
    chapterCount.textContent = `0${index + 1}`;
    progress.style.width = `${(index + 1) / 3 * 100}%`;
    chapterLinks.forEach((el, i) => el.classList.toggle('active', i === index));
  }
  function nativeStoryUpdate() {
    if (!story) return;
    const rect = story.getBoundingClientRect();
    const total = Math.max(1, story.offsetHeight - window.innerHeight);
    const p = Math.max(0, Math.min(1, -rect.top / total));
    setChapter(Math.min(2, Math.floor(p * 3.001)));
    const ui = document.querySelector('.story-ui');
    if (ui && !reduced) {
      ui.style.transform = `translate3d(${(p - .5) * -24}px, ${(p - .5) * 16}px, 0)`;
      ui.style.setProperty('--story-rotate', `${(p - .5) * 1.5}deg`);
    }
    document.querySelector('.ui-bookings')?.style.setProperty('transform', `translate3d(${(p - .5) * 30}px, ${(p - .5) * -20}px, 0) rotateY(-8deg)`);
    document.querySelector('.ui-inbox')?.style.setProperty('transform', `translate3d(${(p - .5) * -44}px, ${(p - .5) * 12}px, 0)`);
    document.querySelector('.ui-ops')?.style.setProperty('transform', `translate3d(${(p - .5) * 38}px, ${(p - .5) * -12}px, 0)`);
  }
  if (!reduced && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: story, start: 'top top', end: 'bottom bottom', scrub: 0.65,
        onUpdate: self => setChapter(Math.min(2, Math.floor(self.progress * 3.001)))
      }
    });
    tl.fromTo('.ui-bookings', { x: 100, y: 50, rotateY: -18, opacity: 0.35 }, { x: 0, y: 0, rotateY: -8, opacity: 1, duration: 0.7, ease: 'none' }, 0)
      .fromTo('.ui-inbox', { x: -80, y: 45, opacity: 0.3 }, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: 'none' }, 0.08)
      .fromTo('.ui-ops', { x: 100, y: -30, opacity: 0.25 }, { x: 0, y: 0, opacity: 1, duration: 0.7, ease: 'none' }, 0.12)
      .to('.story-orbit.orbit-one', { rotation: 28, scale: 1.12, duration: 1, ease: 'none' }, 0)
      .to('.story-orbit.orbit-two', { rotation: -20, scale: 0.92, duration: 1, ease: 'none' }, 0)
      .to('.sync-line', { rotation: 16, x: 80, opacity: 0.9, duration: 1, ease: 'none' }, 0)
      .to('.ui-bookings', { x: -25, y: -15, duration: 0.3, ease: 'none' }, 0.7)
      .to('.ui-inbox', { x: 25, y: -25, duration: 0.3, ease: 'none' }, 0.7)
      .to('.ui-ops', { x: -20, y: 18, duration: 0.3, ease: 'none' }, 0.7);
    ScrollTrigger.refresh();
  } else {
    window.addEventListener('scroll', nativeStoryUpdate, { passive: true });
    window.addEventListener('resize', nativeStoryUpdate);
    nativeStoryUpdate();
  }

  // Pointer-reactive highlight is intentionally subtle and disabled on touch/reduced-motion devices.
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.hero,.manifesto').forEach(section => section.addEventListener('pointermove', event => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      section.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    }, { passive: true }));
  }
})();
