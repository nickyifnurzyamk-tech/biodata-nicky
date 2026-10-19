// ===== PRELOADER =====
let progress = 0;
const loadBar = document.getElementById('loadBar');
const fakeLoad = setInterval(() => {
  progress += Math.random() * 22;
  if (progress >= 100) {
    progress = 100;
    clearInterval(fakeLoad);
    setTimeout(() => document.getElementById('preloader').classList.add('hide'), 400);
  }
  if (loadBar) loadBar.style.width = progress + '%';
}, 220);
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hide'), 1200);
});

// ===== NAVBAR mobile =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l =>
  l.addEventListener('click', () => navLinks.classList.remove('open'))
);

// active nav on scroll
const sections = document.querySelectorAll('header, section[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  let current = 'home';
  sections.forEach(s => { if (y >= s.offsetTop) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  // progress bar
  const h = document.documentElement.scrollHeight - innerHeight;
  document.getElementById('scrollProgressBar').style.width = (scrollY / h * 100) + '%';
  // to top visibility handled by CSS always visible
});

// ===== TYPING EFFECT =====
const words = ['IT Support 💻', 'Mikrotik Specialist 📡', 'Network Troubleshooter ⚡', 'Siap Kerja Lapangan 🚀'];
let wi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing');
function typeLoop() {
  const word = words[wi];
  typingEl.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(typeLoop, 70); }
  else if (!deleting && ci === word.length) { deleting = true; setTimeout(typeLoop, 1400); }
  else if (deleting && ci > 0) { ci--; setTimeout(typeLoop, 38); }
  else { deleting = false; wi = (wi + 1) % words.length; setTimeout(typeLoop, 300); }
}
typeLoop();

// ===== REVEAL ON SCROLL =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // animate skill bars inside
      e.target.querySelectorAll?.('.fill').forEach(f => f.style.width = f.dataset.width);
      if (e.target.classList.contains('fill')) e.target.style.width = e.target.dataset.width;
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .fill').forEach(el => io.observe(el));

// ===== COUNTER =====
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = cur;
    }, 30);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.counter').forEach(el => counterIO.observe(el));

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
resize(); addEventListener('resize', resize);
for (let i = 0; i < 90; i++) pts.push({
  x: Math.random() * innerWidth, y: Math.random() * innerHeight,
  vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
  r: Math.random() * 2.2 + .6
});
let mouse = { x: -999, y: -999 };
addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
(function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const d = Math.hypot(dx, dy);
    if (d < 130) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 7);
    ctx.fillStyle = 'rgba(0,200,255,.7)';
    ctx.fill();
  });
  // lines
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const a = pts[i], b = pts[j];
    const d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d < 120) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(60,150,255,${(1 - d / 120) * .25})`;
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
})();

// ===== TILT 3D =====
document.querySelectorAll('.tilt, .tilt-sm').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width/2)*.18}px, ${(e.clientY - r.top - r.height/2)*.18}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// ===== CUSTOM CURSOR =====
const dot = document.getElementById('cursorDot'), ring = document.getElementById('cursorRing');
addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
  ring.animate({ left: e.clientX + 'px', top: e.clientY + 'px' }, { duration: 300, fill: 'forwards' });
});

// ===== COPY BUTTONS =====
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
document.querySelectorAll('.copy').forEach(b =>
  b.addEventListener('click', () => {
    navigator.clipboard.writeText(b.dataset.copy).then(() => toast('Disalin: ' + b.dataset.copy));
  }));
document.getElementById('copyWA')?.addEventListener('click', () => {
  navigator.clipboard.writeText('085723700804').then(() => toast('Nomor WA disalin!'));
});

// ===== WA FORM -> redirect to wa.me =====
document.getElementById('waForm').addEventListener('submit', e => {
  e.preventDefault();
  const nama = document.getElementById('fNama').value.trim();
  const perlu = document.getElementById('fPerlu').value;
  const pesan = document.getElementById('fPesan').value.trim();
  const text = `Halo Nicky! Saya ${nama}. Keperluan: ${perlu}. Pesan: ${pesan}`;
  window.open('https://wa.me/6285723700804?text=' + encodeURIComponent(text), '_blank');
  toast('Membuka WhatsApp...');
});

// ===== CLOCK =====
setInterval(() => {
  document.getElementById('clock').textContent =
    new Date().toLocaleTimeString('id-ID', { hour12: false });
}, 1000);

// ===== TO TOP =====
document.getElementById('toTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== THEME TOGGLE (intensitas glow) =====
let glow = false;
document.getElementById('themeToggle').addEventListener('click', () => {
  glow = !glow;
  document.querySelectorAll('.blob').forEach(b => b.style.opacity = glow ? '.85' : '.55');
  toast(glow ? 'Mode Glow Maksimal ✨' : 'Mode Glow Normal');
});
