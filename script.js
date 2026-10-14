(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  $('#year').textContent = new Date().getFullYear();

  // A lightweight shader-like atmosphere: layered, drifting light fields on canvas.
  function atmosphere(canvas, mode = 'hero') {
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let w = 0, h = 0, dpr = 1, raf = 0, pointerX = .68, pointerY = .45, targetX = .68, targetY = .45, last = 0;
    const resize = () => { dpr = Math.min(window.devicePixelRatio || 1, 1.7); w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); };
    const move = e => { const r = canvas.getBoundingClientRect(); targetX = (e.clientX-r.left)/r.width; targetY = (e.clientY-r.top)/r.height; };
    resize(); window.addEventListener('resize', resize, { passive:true }); window.addEventListener('pointermove', move, { passive:true });
    const draw = t => {
      if (document.hidden) { raf = requestAnimationFrame(draw); return; }
      if (t-last < 25) { raf = requestAnimationFrame(draw); return; } last = t;
      pointerX += (targetX-pointerX)*.025; pointerY += (targetY-pointerY)*.025;
      ctx.clearRect(0,0,w,h);
      const time = t*.00012;
      const blobs = mode === 'hero' ? [
        {x:.77+Math.sin(time*1.1)*.035,y:.43+Math.cos(time*.8)*.055,r:.53,c:[207,171,47],a:.17},
        {x:.68+Math.cos(time*.7)*.05,y:.64+Math.sin(time)*.04,r:.34,c:[244,212,71],a:.12},
        {x:.96+Math.sin(time*.6)*.03,y:.13+Math.cos(time*.9)*.03,r:.34,c:[95,81,28],a:.2},
        {x:pointerX,y:pointerY,r:.18,c:[244,212,71],a:.06}
      ] : [
        {x:.5+Math.sin(time)*.1,y:.48+Math.cos(time*.7)*.08,r:.65,c:[207,171,47],a:.2},
        {x:.72+Math.cos(time*.8)*.06,y:.3+Math.sin(time)*.07,r:.4,c:[244,212,71],a:.11}
      ];
      blobs.forEach(b=>{ const radius=Math.max(w,h)*b.r; const g=ctx.createRadialGradient(w*b.x,h*b.y,0,w*b.x,h*b.y,radius); g.addColorStop(0,`rgba(${b.c.join(',')},${b.a})`);g.addColorStop(.42,`rgba(${b.c.join(',')},${b.a*.35})`);g.addColorStop(1,`rgba(${b.c.join(',')},0)`);ctx.fillStyle=g;ctx.fillRect(0,0,w,h); });
      // Slow luminous filament arcs add depth without a heavy WebGL dependency.
      if (mode === 'hero') { ctx.save(); ctx.translate(w*.79,h*.42); ctx.rotate(Math.sin(time)*.05); for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(0,0,w*(.22+i*.06),h*(.16+i*.05),time*.2+i*.45,-.4,Math.PI*1.35);ctx.strokeStyle=`rgba(244,212,71,${.06-i*.012})`;ctx.lineWidth=1;ctx.stroke();}ctx.restore(); }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
  }
  atmosphere($('#atmosphere'), 'hero'); atmosphere($('#closing-atmosphere'), 'closing');

  // Entrance choreography: CSS fallback remains fully usable if GSAP is unavailable.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroLines = $$('.headline-line > span');
  if (!reduce && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(heroLines, { y:'0%', opacity:1, duration:1.15, stagger:.13, ease:'power4.out', delay:.18 });
    gsap.from('.hero-copy .reveal', { y:20, opacity:0, duration:.8, stagger:.1, ease:'power3.out', delay:.55 });
    gsap.from('.hero-stage', { y:38, opacity:0, duration:1.25, ease:'power3.out', delay:.28 });
    gsap.from('.dashboard-shell', { rotateY:-18, rotateX:8, rotateZ:-3, scale:.94, duration:1.5, ease:'power3.out', delay:.3 });
    gsap.from('.metric-track i', { scaleX:0, duration:1, stagger:.12, delay:1, ease:'power3.out', transformOrigin:'left' });
    gsap.to('.dashboard-shell', { y:-22, rotateZ:-.4, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1.2 } });
    gsap.to('.hero-grid', { yPercent:14, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1 } });
    gsap.to('.hero-orbit', { rotate:10, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:1.5 } });
    gsap.to('.scroll-progress span', { scaleX:1, ease:'none', scrollTrigger:{ start:0, end:'max', scrub:.2 } });
    $$('.manifesto h2 span').forEach((el,i)=>gsap.from(el,{ y:70, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el,start:'top 85%'} , delay:i*.08}));
    gsap.from('.manifesto-aside', { y:35, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:'.manifesto-aside',start:'top 88%'} });
    gsap.from('.platform-intro h2', { y:55, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:'.platform-intro',start:'top 82%'} });
    gsap.from('.platform-intro>p', { y:24, opacity:0, duration:.8, ease:'power3.out', scrollTrigger:{trigger:'.platform-intro>p',start:'top 88%'} });
    gsap.from('.closing-content>*', { y:34, opacity:0, duration:.9, stagger:.1, ease:'power3.out', scrollTrigger:{trigger:'.closing-content',start:'top 80%'} });
    gsap.to('.closing-star', { rotate:180, ease:'none', scrollTrigger:{trigger:'.closing',start:'top bottom',end:'bottom top',scrub:2} });
  } else {
    heroLines.forEach(el=>{el.style.transform='none';el.style.opacity='1'});
    $$('.reveal').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }

  // Reveal any small elements without a GSAP dependency.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }}),{threshold:.12});
    $$('.reveal').forEach(el=>{ if(!window.gsap || reduce) observer.observe(el); });
  } else $$('.reveal').forEach(el=>el.classList.add('is-visible'));

  // Lenis stays optional and respects reduced-motion settings.
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration:1.05, smoothWheel:true, wheelMultiplier:.9, touchMultiplier:1.05 });
    if (window.gsap && window.ScrollTrigger) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
    else { const tick=t=>{lenis.raf(t); requestAnimationFrame(tick)}; requestAnimationFrame(tick); }
    $$('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{const target=$(link.getAttribute('href'));if(target){e.preventDefault();lenis.scrollTo(target,{offset:-20});}}));
  }

  // Scroll-controlled product story. CSS sticky holds the viewport on the scene;
  // the scroll distance through the tall track becomes a continuous 0..1 timeline.
  // This deliberately does not depend on GSAP/ScrollTrigger loading successfully.
  const chapters = $$('.story-chapter');
  const windows = $$('.product-window');
  const current = $('.story-current');
  const caption = $('#visual-caption-text');
  const track = $('#story-scroll-track');
  const scene = $('#story-scene');
  const labels = ['STAYS / 001', 'CONVERSATIONS / 002', 'OPERATIONS / 003'];
  const desktopStory = window.matchMedia('(min-width: 761px)');
  let storyFrame = 0;
  let storyProgress = -1;

  const clamp01 = n => Math.max(0, Math.min(1, n));
  const smoothstep = n => n * n * (3 - 2 * n);

  function renderStory(progress) {
    progress = clamp01(progress);
    if (Math.abs(progress - storyProgress) < .0002) return;
    storyProgress = progress;
    const position = progress * (chapters.length - 1);
    let nearest = 0;

    chapters.forEach((el, i) => {
      const distance = Math.abs(position - i);
      const weight = smoothstep(clamp01(1 - distance));
      const y = (i - position) * 36;
      el.style.opacity = String(weight);
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.filter = `blur(${(1 - weight) * 7}px)`;
      el.style.pointerEvents = weight > .55 ? 'auto' : 'none';
      el.setAttribute('aria-hidden', weight < .05 ? 'true' : 'false');
      if (distance < Math.abs(position - nearest)) nearest = i;
    });

    windows.forEach((el, i) => {
      const distance = Math.abs(position - i);
      const weight = smoothstep(clamp01(1 - distance));
      const y = (i - position) * 30;
      const scale = .955 + .045 * weight;
      const rotate = -9 + 5 * weight + (i - position) * 1.4;
      el.style.opacity = String(weight);
      el.style.filter = `blur(${(1 - weight) * 8}px)`;
      el.style.transform = `translate3d(-50%, calc(-50% + ${y}px), 0) scale(${scale}) rotateY(${rotate}deg)`;
      el.style.pointerEvents = weight > .55 ? 'auto' : 'none';
      el.setAttribute('aria-hidden', weight < .05 ? 'true' : 'false');
    });

    // During the crossfade, keep the index tied to the nearest chapter.
    nearest = Math.max(0, Math.min(chapters.length - 1, Math.round(position)));
    if (current) current.textContent = String(nearest + 1).padStart(2, '0');
    if (caption) caption.textContent = labels[nearest];
    if (scene) scene.style.setProperty('--story-progress', progress.toFixed(4));
  }

  function measureStory() {
    if (!track || !scene || !chapters.length || !windows.length) return;
    if (!desktopStory.matches || reduce) {
      // Natural-flow fallback on mobile and for reduced-motion users.
      track.style.height = 'auto';
      scene.style.position = 'relative';
      scene.style.top = 'auto';
      chapters.forEach((el, i) => {
        const active = i === 0;
        el.style.opacity = active ? '1' : '0';
        el.style.transform = active ? 'none' : 'translate3d(0, 18px, 0)';
        el.style.filter = 'none';
        el.style.pointerEvents = active ? 'auto' : 'none';
      });
      windows.forEach((el, i) => {
        const active = i === 0;
        el.style.opacity = active ? '1' : '0';
        el.style.filter = 'none';
        el.style.transform = `translate3d(-50%, -50%, 0) scale(${active ? 1 : .96})`;
      });
      return;
    }
    track.style.height = '340svh';
    scene.style.position = 'sticky';
    scene.style.top = '0';
    updateStoryFromScroll();
  }

  function updateStoryFromScroll() {
    storyFrame = 0;
    if (!track || !desktopStory.matches || reduce) return;
    const rect = track.getBoundingClientRect();
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    renderStory(-rect.top / travel);
  }

  function queueStoryUpdate() {
    if (!storyFrame) storyFrame = requestAnimationFrame(updateStoryFromScroll);
  }

  if (track && chapters.length === 3 && windows.length === 3) {
    // The chapters remain readable if JavaScript animation support is unavailable.
    chapters.forEach((chapter, i) => {
      chapter.addEventListener('click', () => {
        if (desktopStory.matches && !reduce) return;
        chapters.forEach((el, j) => {
          el.style.opacity = j === i ? '1' : '0';
          el.style.transform = j === i ? 'none' : 'translate3d(0,18px,0)';
          el.style.pointerEvents = j === i ? 'auto' : 'none';
        });
        windows.forEach((el, j) => {
          el.style.opacity = j === i ? '1' : '0';
          el.style.transform = `translate3d(-50%, -50%, 0) scale(${j === i ? 1 : .96})`;
        });
        if (current) current.textContent = String(i + 1).padStart(2, '0');
        if (caption) caption.textContent = labels[i];
      });
    });
    window.addEventListener('scroll', queueStoryUpdate, { passive: true });
    window.addEventListener('resize', () => { storyProgress = -1; measureStory(); queueStoryUpdate(); }, { passive: true });
    measureStory();
    // Re-measure after web fonts and layout have settled.
    window.addEventListener('load', () => { storyProgress = -1; measureStory(); }, { once: true });
  }

  // Gentle pointer parallax, only for fine pointers. Avoid layout properties and keep motion interruptible.
  if (!reduce && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const stage=$('.hero-stage'), dashboard=$('.dashboard-shell'); let frame=0, px=0,py=0,tx=0,ty=0;
    stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*4;ty=((e.clientY-r.top)/r.height-.5)*-3;if(!frame) frame=requestAnimationFrame(function update(){px+=(tx-px)*.08;py+=(ty-py)*.08;dashboard.style.transform=`rotateY(${-10+px}deg) rotateX(${3+py}deg) rotateZ(-.8deg)`;if(Math.abs(tx-px)>.02||Math.abs(ty-py)>.02)frame=requestAnimationFrame(update);else frame=0;});});
    stage.addEventListener('pointerleave',()=>{tx=0;ty=0;});
    $$('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.07}px,${(e.clientY-r.top-r.height/2)*.1}px)`});el.addEventListener('pointerleave',()=>{el.style.transform='translate(0,0)'})});
  }

  const menu=$('.mobile-menu'), nav=$('.main-nav');
  if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)});$$('a',nav).forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open')}));}
})();
