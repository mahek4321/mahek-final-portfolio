/* ============================================
   PRELOADER
============================================ */
const steps = [
  "Initializing Developer Profile...",
  "Loading Skills...",
  "Loading Projects...",
  "Loading Achievements...",
  "Launching Portfolio..."
];
let preStep = 0;
const preText = document.getElementById('preText');
const preBar = document.getElementById('preBar');
const prePercent = document.getElementById('prePercent');
const preloader = document.getElementById('preloader');

function runPreloader() {
  const targets = [20, 40, 60, 80, 100];
  let current = 0;
  function tick() {
    if (current >= targets.length) return;
    const target = targets[current];
    preText.textContent = steps[current];
    let val = parseInt(preBar.style.width) || 0;
    const step = () => {
      val = Math.min(val + 2, target);
      preBar.style.width = val + '%';
      prePercent.textContent = val + '%';
      if (val < target) requestAnimationFrame(step);
      else {
        current++;
        if (current < targets.length) setTimeout(tick, 300);
        else setTimeout(launchSite, 400);
      }
    };
    requestAnimationFrame(step);
  }
  setTimeout(tick, 600);
}

function launchSite() {
  gsap.to('#preloader', {
    opacity: 0, duration: 0.8, ease: 'power2.inOut',
    onComplete: () => {
      preloader.style.display = 'none';
      document.body.classList.remove('loading');
      initHeroAnim();
    }
  });
}

runPreloader();

/* ============================================
   CURSOR
============================================ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
const spotlight = document.getElementById('spotlight');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  spotlight.style.background = `radial-gradient(circle 400px at ${mx}px ${my}px, rgba(100,255,218,0.05) 0%, transparent 70%)`;
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .project-item, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    ring.style.borderColor = 'rgba(100,255,218,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.borderColor = 'rgba(100,255,218,0.5)';
  });
});

/* ============================================
   NAVBAR
============================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // Active nav
  const sections = ['hero','about','skills','projects','achievements','journey','contact'];
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 150) current = id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ============================================
   HERO ANIMATIONS
============================================ */
function initHeroAnim() {
  gsap.to('#heroLeft', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
  gsap.to('#heroRight', { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3 });
  startTyping();
  initScrollReveal();
}

/* ============================================
   TYPING EFFECT
============================================ */
const phrases = ['CSE Student', 'Web Developer', 'Data Science Enthusiast', 'Problem Solver', 'Future Software Engineer'];
let pIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function startTyping() {
  function type() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      typedEl.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(type, 400); return; }
    }
    setTimeout(type, deleting ? 60 : 90);
  }
  setTimeout(type, 600);
}

/* ============================================
   SCROLL REVEAL
============================================ */
function initScrollReveal() {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    );
  });
  // Timeline items
  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      delay: i * 0.1
    });
  });
  // Journey nodes
  document.querySelectorAll('.journey-node').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      delay: i * 0.12
    });
  });
  // Stat counters
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let current = 0;
        const step = () => {
          current = Math.min(current + 1, target);
          el.textContent = current + (target >= 10 ? '+' : '');
          if (current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  });
}

/* ============================================
   PROJECTS ACCORDION
============================================ */
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.project-item').forEach(p => {
      p.classList.remove('open');
      p.querySelector('.project-body').style.maxHeight = '0';
    });
    if (!isOpen) {
      item.classList.add('open');
      const body = item.querySelector('.project-body');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});

/* ============================================
   SKILLS CANVAS
============================================ */
(function initSkillsCanvas() {
  const canvas = document.getElementById('skillsCanvas');
  if (!canvas) return;
  const wrap = canvas.parentElement;
  const tooltip = document.getElementById('skillTooltip');
  let W, H, nodes, dpr;
  const COLORS = {
    prog: '#64FFDA',
    web: '#FF9F68',
    data: '#B8A1FF',
    design: '#67E8F9',
    soft: '#F472B6',
    center: '#F8FAFC'
  };
  const skillData = [
    { label: 'Mahek', cat: 'center', x: 0.5, y: 0.5, r: 36, fixed: true },
    // Programming
    { label: 'Python', cat: 'prog', emoji: '🐍' },
    { label: 'C', cat: 'prog', emoji: '⚙️' },
    { label: 'Java', cat: 'prog', emoji: '☕' },
    // Web
    { label: 'HTML', cat: 'web', emoji: '📄' },
    { label: 'CSS', cat: 'web', emoji: '🎨' },
    { label: 'JavaScript', cat: 'web', emoji: '⚡' },
    // Data/DB
    { label: 'MySQL', cat: 'data', emoji: '🗃️' },
    { label: 'Firebase', cat: 'data', emoji: '🔥' },
    { label: 'Power BI', cat: 'data', emoji: '📊' },
    { label: 'Data Science', cat: 'data', emoji: '🧪' },
    // Design
    { label: 'Figma', cat: 'design', emoji: '✏️' },
    { label: 'Canva', cat: 'design', emoji: '🖼️' },
    { label: 'UI/UX', cat: 'design', emoji: '🎭' },
    // Soft
    { label: 'Teamwork', cat: 'soft', emoji: '🤝' },
    { label: 'Communication', cat: 'soft', emoji: '💬' },
    { label: 'Problem Solving', cat: 'soft', emoji: '🧩' }
  ];

  const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],
    [1,2],[2,3],[4,5],[5,6],[7,8],[9,10],[11,12],[12,13],[14,15],[15,16],[1,4],[3,6],[7,9],[8,10],[11,14]
  ];

  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = wrap.clientWidth; H = wrap.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    initNodes();
  }

  function initNodes() {
    nodes = skillData.map((d, i) => {
      let x, y;
      if (d.fixed) { x = W * d.x; y = H * d.y; }
      else {
        const angle = (i / (skillData.length - 1)) * Math.PI * 2;
        const radius = Math.min(W, H) * 0.32 + (Math.random() - 0.5) * 60;
        x = W/2 + Math.cos(angle) * radius;
        y = H/2 + Math.sin(angle) * radius;
      }
      return { ...d, x, y, vx: 0, vy: 0, r: d.r || 28, hover: false, pulsePhase: Math.random() * Math.PI * 2 };
    });
  }

  let mouse = { x: -9999, y: -9999 };
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left);
    mouse.y = (e.clientY - rect.top);
    let hovAny = false;
    nodes.forEach(n => {
      const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
      n.hover = d < n.r + 10;
      if (n.hover) hovAny = true;
    });
    const hovNode = nodes.find(n => n.hover);
    if (hovNode) {
      tooltip.textContent = (hovNode.emoji || '') + ' ' + hovNode.label;
      tooltip.style.left = (hovNode.x + 40) + 'px';
      tooltip.style.top = (hovNode.y - 20) + 'px';
      tooltip.style.color = COLORS[hovNode.cat];
      tooltip.style.borderColor = COLORS[hovNode.cat] + '33';
      tooltip.classList.add('show');
    } else {
      tooltip.classList.remove('show');
    }
  });
  canvas.addEventListener('mouseleave', () => { nodes.forEach(n => n.hover = false); tooltip.classList.remove('show'); });

  let t = 0;
  function draw() {
    t += 0.012;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // Physics: slight repulsion between nodes
    for (let i = 1; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1;
        const minDist = 80;
        if (dist < minDist) {
          const force = (minDist - dist) / minDist * 0.3;
          a.vx -= dx/dist * force; a.vy -= dy/dist * force;
          b.vx += dx/dist * force; b.vy += dy/dist * force;
        }
      }
      // Center attraction
      const n = nodes[i];
      const cx = W/2, cy = H/2;
      n.vx += (cx - n.x) * 0.001;
      n.vy += (cy - n.y) * 0.001;
      // Boundary
      if (n.x < n.r + 20) n.vx += 0.5;
      if (n.x > W - n.r - 20) n.vx -= 0.5;
      if (n.y < n.r + 20) n.vy += 0.5;
      if (n.y > H - n.r - 20) n.vy -= 0.5;
      n.vx *= 0.92; n.vy *= 0.92;
      n.x += n.vx; n.y += n.vy;
    }
    // Slight mouse interaction
    nodes.forEach((n, i) => {
      if (i === 0) return;
      const dx = n.x - mouse.x, dy = n.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100) {
        n.vx += dx/dist * 0.8;
        n.vy += dy/dist * 0.8;
      }
    });

    // Draw edges
    edges.forEach(([a,b]) => {
      const na = nodes[a], nb = nodes[b];
      const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
      grad.addColorStop(0, COLORS[na.cat] + '40');
      grad.addColorStop(1, COLORS[nb.cat] + '40');
      ctx.beginPath();
      ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = na.hover || nb.hover ? 1.5 : 0.8;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(n => {
      const pulse = Math.sin(t * 2 + n.pulsePhase) * 4;
      const r = n.hover ? n.r + 6 : n.r + pulse * 0.3;
      // Glow
      if (n.hover || n.cat === 'center') {
        ctx.save();
        ctx.shadowBlur = 24;
        ctx.shadowColor = COLORS[n.cat];
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI*2);
        ctx.fillStyle = COLORS[n.cat] + '18';
        ctx.fill();
        ctx.restore();
      }
      // Circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI*2);
      ctx.fillStyle = n.cat === 'center' ? 'rgba(248,250,252,0.1)' : COLORS[n.cat] + '14';
      ctx.fill();
      ctx.strokeStyle = n.hover ? COLORS[n.cat] : COLORS[n.cat] + '80';
      ctx.lineWidth = n.hover ? 2 : 1.2;
      ctx.stroke();
      // Label
      ctx.fillStyle = n.cat === 'center' ? '#F8FAFC' : COLORS[n.cat];
      ctx.font = `${n.cat === 'center' ? 700 : 600} ${n.cat === 'center' ? 14 : 11}px 'Outfit', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label.length > 10 ? n.label.slice(0,9)+'…' : n.label, n.x, n.y);
    });

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();

/* ============================================
   FORM SUBMIT
============================================ */
function handleSubmit(btn) {
  btn.innerHTML = '<span>Message Sent!</span><span>✓</span>';
  btn.style.background = 'rgba(100,255,218,0.2)';
  btn.style.color = 'var(--accent)';
  btn.style.border = '1px solid var(--accent)';
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><span>→</span>';
    btn.style = '';
  }, 3000);
}

/* ============================================
   SMOOTH SCROLL
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
