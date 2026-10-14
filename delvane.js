(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-motion');
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


  // Consistent, staggered reveal motion across all four pages.
  const motionTargets = document.querySelectorAll(
    '.subpage-content h2,.subpage-content>p,.subpage-card,.platform-heading,.rhythm-heading,.rhythm-steps article,.interlude-top,.interlude-bottom,.manifesto-content,.closing-kicker,.closing-copy,.closing-invitation,.feature'
  );
  motionTargets.forEach((el, i) => {
    el.classList.add('motion-reveal');
    el.dataset.delay = String(i % 4);
  });
  if (reduced || !('IntersectionObserver' in window)) {
    motionTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    const motionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          motionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -5% 0px' });
    motionTargets.forEach(el => motionObserver.observe(el));
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
    title.style.opacity = '0.35'; title.style.transform = 'translateY(5px)';
    title.innerHTML = data.title; desc.textContent = data.desc;
    requestAnimationFrame(() => { title.style.opacity = '1'; title.style.transform = 'translateY(0)'; desc.style.opacity = '1'; });
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
  // One scroll-linked controller owns the scene transforms. No competing GSAP/native writes.
  if (story) {
    let storyFrame = 0;
    const updateStory = () => {
      storyFrame = 0;
      nativeStoryUpdate();
    };
    const queueStoryUpdate = () => {
      if (!storyFrame) storyFrame = requestAnimationFrame(updateStory);
    };
    window.addEventListener('scroll', queueStoryUpdate, { passive: true });
    window.addEventListener('resize', queueStoryUpdate, { passive: true });
    nativeStoryUpdate();
  }

  // Pointer parallax: move the entire product constellation as one coherent layer.
  // Using the parent transform avoids overwriting each card's own float/tilt animation.
  const hero = document.querySelector('.hero');
  const product = document.querySelector('.hero-product');
  if (!reduced && hero && product && matchMedia('(pointer:fine)').matches) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      hero.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        product.style.transform = `translate3d(${(-nx * 13).toFixed(2)}px, ${(-ny * 10).toFixed(2)}px, 0)`;
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      product.style.transform = 'translate3d(0,0,0)';
    }, { passive: true });
  }


  // Real-time WebGL shader gradient: subtle, warm, and intentionally atmospheric.
  // If WebGL is unavailable, the CSS radial-gradient fallback remains visible.
  document.querySelectorAll('canvas[data-shader]').forEach(canvas => {
    if (reduced) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vertex = `attribute vec2 p; void main(){ gl_Position=vec4(p,0.0,1.0); }`;
    const fragment = `precision mediump float; uniform vec2 r; uniform float t; uniform vec2 m;\n`+
      `float blob(vec2 uv, vec2 c, float s){ return exp(-dot((uv-c)*vec2(1.0,1.25),(uv-c)*vec2(1.0,1.25))/s); }\n`+
      `void main(){ vec2 uv=gl_FragCoord.xy/r; uv.y=1.0-uv.y; vec2 drift=vec2(sin(t*.16)*.09,cos(t*.13)*.06);\n`+
      `float a=blob(uv,vec2(.72,.48)+drift,.11); float b=blob(uv,vec2(.9,.2)-drift,.07); float c=blob(uv,m,.035);\n`+
      `vec3 gold=vec3(0.94,.62,.12); vec3 amber=vec3(.45,.23,.035); float v=clamp(a*.42+b*.22+c*.18,0.0,.65);\n`+
      `gl_FragColor=vec4(mix(amber,gold,clamp(a+b,0.0,1.0))*v,v*.62); }`;
    function shader(type, source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;}
    const vs=shader(gl.VERTEX_SHADER,vertex), fs=shader(gl.FRAGMENT_SHADER,fragment);
    if(!vs||!fs)return;
    const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    gl.useProgram(program);const loc=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const resolution=gl.getUniformLocation(program,'r'), time=gl.getUniformLocation(program,'t'), mouse=gl.getUniformLocation(program,'m');let mx=.72,my=.48,visible=true;
    const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,1.5);canvas.width=Math.max(1,Math.floor(canvas.clientWidth*dpr));canvas.height=Math.max(1,Math.floor(canvas.clientHeight*dpr));gl.viewport(0,0,canvas.width,canvas.height);};
    resize();window.addEventListener('resize',resize,{passive:true});
    const parent=canvas.parentElement;parent?.addEventListener('pointermove',e=>{const b=canvas.getBoundingClientRect();mx=(e.clientX-b.left)/Math.max(1,b.width);my=1-(e.clientY-b.top)/Math.max(1,b.height);},{passive:true});
    if('IntersectionObserver'in window){new IntersectionObserver(es=>{visible=es[0].isIntersecting;}).observe(canvas);}
    const start=performance.now();function draw(now){if(!canvas.isConnected)return;if(visible){gl.useProgram(program);gl.uniform2f(resolution,canvas.width,canvas.height);gl.uniform1f(time,(now-start)/1000);gl.uniform2f(mouse,mx,my);gl.drawArrays(gl.TRIANGLES,0,6);}requestAnimationFrame(draw);}requestAnimationFrame(draw);
  });

  // Kinetic oversized typography responds continuously to scroll progress.
  const kineticLines=[...document.querySelectorAll('[data-marquee]')];
  if(kineticLines.length && !reduced){
    let raf=0;const updateKinetic=()=>{raf=0;for(const line of kineticLines){const rect=line.parentElement.getBoundingClientRect();const progress=(window.innerHeight-rect.top)/(window.innerHeight+rect.height);const dir=line.classList.contains('type-line-two')?1:-1;const base=line.classList.contains('type-line-two')?-18:-8;line.style.transform=`translate3d(${base+dir*progress*22}%,0,0)`;}};
    const requestUpdate=()=>{if(!raf)raf=requestAnimationFrame(updateKinetic);};window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate,{passive:true});updateKinetic();
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
