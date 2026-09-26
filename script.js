/**
 * ==========================================================================
 * HAUSER.LOL — CLIENT APPLICATION SCRIPT
 * Handles mouse trailer, space canvas, search palette, dynamic showcase tabs,
 * multi-step scoping wizard, and Formspree submission integration.
 * ==========================================================================
 */

// 1. Initialize Lucide Icons
lucide.createIcons();

// 2. Greeting according to local time
const timeGreeting = document.getElementById('timeGreeting');
if (timeGreeting) {
  const hour = new Date().getHours();
  if (hour < 12) {
    timeGreeting.textContent = 'GOOD MORNING.';
  } else if (hour < 17) {
    timeGreeting.textContent = 'GOOD AFTERNOON.';
  } else {
    timeGreeting.textContent = 'GOOD EVENING.';
  }
}

// 3. Fluid Dual Mouse Trailer (Purple & Soft Teal Glow with Smooth Lerp)
const trailerPurple = document.getElementById('trailerPurple');
const trailerTeal = document.getElementById('trailerTeal');
const trailerCore = document.getElementById('trailerCore');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let pX = mouseX, pY = mouseY;
let tX = mouseX, tY = mouseY;
let cX = mouseX, cY = mouseY;
let isMouseActive = false;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!isMouseActive) {
    isMouseActive = true;
    if (trailerPurple) trailerPurple.style.opacity = '1';
    if (trailerTeal) trailerTeal.style.opacity = '1';
    if (trailerCore) trailerCore.style.opacity = '1';
  }
});

window.addEventListener('mouseleave', () => {
  isMouseActive = false;
  if (trailerPurple) trailerPurple.style.opacity = '0';
  if (trailerTeal) trailerTeal.style.opacity = '0';
  if (trailerCore) trailerCore.style.opacity = '0';
});

function renderTrailer() {
  if (trailerPurple && trailerTeal && trailerCore) {
    pX += (mouseX - pX) * 0.08;
    pY += (mouseY - pY) * 0.08;
    trailerPurple.style.left = `${pX}px`;
    trailerPurple.style.top = `${pY}px`;

    tX += (mouseX - tX) * 0.05;
    tY += (mouseY - tY) * 0.05;
    trailerTeal.style.left = `${tX}px`;
    trailerTeal.style.top = `${tY}px`;

    cX += (mouseX - cX) * 0.16;
    cY += (mouseY - cY) * 0.16;
    trailerCore.style.left = `${cX}px`;
    trailerCore.style.top = `${cY}px`;
  }
  requestAnimationFrame(renderTrailer);
}
renderTrailer();

// 4. Space Canvas: Subtle Floating Purple & Teal Particles + Geometric Constellations
const canvas = document.getElementById('spaceCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particles = [];
  const PARTICLE_COUNT = Math.min(65, Math.floor(window.innerWidth / 20));

  class StarParticle {
    constructor() {
      this.init();
    }
    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.8 + 0.6;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.alpha = Math.random() * 0.45 + 0.15;
      this.isTeal = Math.random() > 0.65;
      this.pulseDir = Math.random() > 0.5 ? 0.005 : -0.005;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha += this.pulseDir;
      if (this.alpha > 0.6 || this.alpha < 0.12) {
        this.pulseDir = -this.pulseDir;
      }
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isTeal
        ? `rgba(6, 182, 212, ${this.alpha})`
        : `rgba(168, 85, 247, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new StarParticle());
  }

  const polyNodes = [
    { x: 0.15, y: 0.35, vx: 0.0002, vy: 0.0001 },
    { x: 0.22, y: 0.25, vx: -0.0001, vy: 0.0002 },
    { x: 0.28, y: 0.38, vx: 0.0001, vy: -0.0001 },
    { x: 0.82, y: 0.20, vx: -0.00015, vy: 0.0001 },
    { x: 0.88, y: 0.30, vx: 0.0001, vy: -0.00015 },
    { x: 0.78, y: 0.32, vx: 0.0002, vy: 0.0001 },
    { x: 0.72, y: 0.75, vx: -0.0001, vy: 0.0001 },
    { x: 0.79, y: 0.82, vx: 0.0001, vy: -0.0002 },
    { x: 0.85, y: 0.72, vx: 0.0002, vy: 0.0001 },
  ];

  function drawConstellations() {
    ctx.beginPath();
    const p1 = { x: polyNodes[0].x * canvas.width, y: polyNodes[0].y * canvas.height };
    const p2 = { x: polyNodes[1].x * canvas.width, y: polyNodes[1].y * canvas.height };
    const p3 = { x: polyNodes[2].x * canvas.width, y: polyNodes[2].y * canvas.height };
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.2)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    const q1 = { x: polyNodes[3].x * canvas.width, y: polyNodes[3].y * canvas.height };
    const q2 = { x: polyNodes[4].x * canvas.width, y: polyNodes[4].y * canvas.height };
    const q3 = { x: polyNodes[5].x * canvas.width, y: polyNodes[5].y * canvas.height };
    ctx.beginPath();
    ctx.moveTo(q1.x, q1.y);
    ctx.lineTo(q2.x, q2.y);
    ctx.lineTo(q3.x, q3.y);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.stroke();
  }

  function animateSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    polyNodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0.05 || n.x > 0.95) n.vx = -n.vx;
      if (n.y < 0.05 || n.y > 0.95) n.vy = -n.vy;
    });
    drawConstellations();
    requestAnimationFrame(animateSpace);
  }
  animateSpace();
}

// 5. Search Command Palette Modal (Cmd+K / Ctrl+K)
const searchModal = document.getElementById('searchModal');
const searchTrigger = document.getElementById('searchTrigger');
const modalSearchInput = document.getElementById('modalSearchInput');

function openSearch() {
  if (searchModal) {
    searchModal.classList.remove('hidden');
    searchModal.classList.add('flex');
    if (modalSearchInput) modalSearchInput.focus();
  }
}

function closeSearch() {
  if (searchModal) {
    searchModal.classList.add('hidden');
    searchModal.classList.remove('flex');
  }
}

if (searchTrigger) searchTrigger.addEventListener('click', openSearch);

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (searchModal && searchModal.classList.contains('hidden')) {
      openSearch();
    } else {
      closeSearch();
    }
  }
  if (e.key === 'Escape') {
    if (searchModal && !searchModal.classList.contains('hidden')) closeSearch();
    if (scopeModal && !scopeModal.classList.contains('hidden')) closeScopeModal();
  }
});

if (searchModal) {
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });
}

document.querySelectorAll('.search-result-item').forEach(item => {
  item.addEventListener('click', closeSearch);
});

// 6. Mobile Drawer Navigation Toggle
const mobileMenuOpen = document.getElementById('mobileMenuOpen');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuOpen && mobileDrawer) {
  mobileMenuOpen.addEventListener('click', () => {
    mobileDrawer.classList.remove('translate-x-full');
  });
}

if (mobileMenuClose && mobileDrawer) {
  mobileMenuClose.addEventListener('click', () => {
    mobileDrawer.classList.add('translate-x-full');
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');
  });
});


// ============================================
// 7. DYNAMIC PORTFOLIO SHOWCASE LOGIC (WORK • STORE • DISCORD BOTS • WEBSITES • XENON MARKET • NETWORKS)
// ============================================
const dynamicShowcaseContainer = document.getElementById('dynamicShowcaseContainer');
const filterButtons = document.querySelectorAll('.portfolio-filter-btn');

const showcaseTemplates = {
  'work': `
    <div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 w-full transition-all duration-300">
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-purple-500/20 gap-4">
        <div>
          <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold block mb-1">
            — ALL FEATURED DROPS & PORTFOLIO ARCHIVE
          </span>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            All Creative Works & Ships
          </h3>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono text-zinc-400">Total Shipped: <strong class="text-purple-300">7+</strong></span>
          <button onclick="openScopeModal()" class="glow-btn px-4 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
            <span>Start a project</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Featured Work Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        <!-- Project 1: Veltrix Discord Bot -->
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 hover:bg-purple-950/30 transition-all group">
          <div class="flex items-center justify-between mb-3">
            <span class="font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">Portfolio Webs</span>
            <span class="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#22c55e]"></span>
              <span>278 viewers</span>
            </span>
          </div>
          <h4 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
            Little taste of it
          </h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            I make modern and very responsive portfolio websites for gamers, coders, fashion designers, and for persnol uses.
          </p>
          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">React</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Node.js</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Modern CSS</span>
            
          </div>
        </div>

        <!-- Project 2: Xenon Market Platform -->
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 hover:bg-purple-950/30 transition-all group">
          <div class="flex items-center justify-between mb-3">
            <span class="font-mono text-[10px] uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/50 px-2 py-0.5 rounded">E-COMMERCE</span>
            <span class="text-xs font-mono text-purple-300">Instant Delivery</span>
          </div>
          <h4 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
            Landing Pages
          </h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            I build modern, single-page promotional websites and landing pages for events, local shops, and personal brands.
          </p>
          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">CSS</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Flexbox</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Figma</span>
          </div>
        </div>

        <!-- Project 3: Promo Creative Vault -->
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 hover:bg-purple-950/30 transition-all group">
          <div class="flex items-center justify-between mb-3">
            <span class="font-mono text-[10px] uppercase tracking-wider text-pink-400 bg-pink-950/40 border border-pink-800/50 px-2 py-0.5 rounded">Artificial Intelligence</span>
            <span class="text-xs font-mono text-cyan-300">High Demand</span>
          </div>
          <h4 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
            Mini web apps
          </h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            Simple, interactive browser-based tools like custom calculators, text formatters, and daily task trackers.
          </p>
          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">HTML & Modern CSS</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">React.JS</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Figma</span>
          </div>
        </div>

        <!-- Project 4: Aether Web Application -->
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 hover:bg-purple-950/30 transition-all group">
          <div class="flex items-center justify-between mb-3">
            <span class="font-mono text-[10px] uppercase tracking-wider text-teal-400 bg-teal-950/40 border border-teal-800/50 px-2 py-0.5 rounded">Automation</span>
            <span class="text-xs font-mono text-zinc-400">Server Helpers</span>
          </div>
          <h4 class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
            Discord Bots
          </h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            Basic automated Discord bots for custom welcome messages, server moderation, and simple text commands.
          </p>
          <div class="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">React</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Discord.py</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">API</span>
          </div>
        </div>

      </div>

      <!-- Bottom Footer Bar -->
      <div class="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-purple-500/20 gap-4">
        <span class="text-xs text-zinc-400 font-mono">
          Looking for a custom build or collab?
        </span>
        <div class="flex items-center gap-3">
          <button onclick="openScopeModal()" class="glow-btn px-5 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
            <span>Scope your project</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
          <a href="http://www.fiverr.com/s/61YLpVR" target="_blank" class="glow-btn-outline px-5 py-2 rounded-full text-zinc-300 text-xs font-semibold flex items-center gap-1.5">
            <span>Browse Fiverr Now!</span>
            <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </div>
  `,

  'store': `
    <div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 w-full transition-all duration-300">
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-purple-500/20 gap-4">
        <div>
          <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold block mb-1">
            — DIGITAL PRODUCTS ON Fiverr Market
          </span>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Ready-to-get a website?
          </h3>
        </div>
        <a href="http://www.fiverr.com/s/61YLpVR" target="_blank" 
           class="glow-btn px-5 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
          <span>Open Fiverr Market ↗</span>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 flex flex-col justify-between hover:border-purple-400/50 transition-all">
          <div>
            <span class="text-xs font-mono text-purple-400 uppercase block mb-1">Portfolio Webs Under $10</span>
            <h4 class="text-lg font-bold text-white mb-2">Advanced Portfolio Web</h4>
            <p class="text-zinc-300 text-xs leading-relaxed mb-4">
              You heard right! Now you can get a Modern Portfolio webs for under '$10' What are you waiting for? Order Now..!
            </p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-purple-900/40 font-mono">
            <span class="text-white font-bold text-sm">$10.00</span>
            <span class="text-xs text-cyan-400">Instant Delivery</span>
          </div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 flex flex-col justify-between hover:border-purple-400/50 transition-all">
          <div>
            <span class="text-xs font-mono text-pink-400 uppercase block mb-1">Elite Websites (REC)</span>
            <h4 class="text-lg font-bold text-white mb-2">Used Modern CSS</h4>
            <p class="text-zinc-300 text-xs leading-relaxed mb-4">
              Fully Advance animated teaser banners built specifically for an Elite Look! (Portfolio, Promo & Landing Pages Included), Ex - This Website.
            </p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-purple-900/40 font-mono">
            <span class="text-white font-bold text-sm">$25.00</span>
            <span class="text-xs text-pink-400">Delivered in >3days</span>
          </div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 flex flex-col justify-between hover:border-purple-400/50 transition-all">
          <div>
            <span class="text-xs font-mono text-teal-400 uppercase block mb-1">AI & Discord bots</span>
            <h4 class="text-lg font-bold text-white mb-2">Mini web apps & DC bots</h4>
            <p class="text-zinc-300 text-xs leading-relaxed mb-4">
              Simple, interactive browser-based tools and daily task trackers, also fully animated and multi funtional bots for your server experence.
            </p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-purple-900/40 font-mono">
            <span class="text-white font-bold text-sm">$100.00-$200.00</span>
            <span class="text-xs text-teal-400">1-3weeks</span>
          </div>
        </div>
      </div>
    </div>
  `,

  'discord-bots': `
    <div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 w-full transition-all duration-300">
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-purple-500/20 gap-4">
        <div>
          <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold block mb-1">
            — DISCORD BOT ENGINEERING & HOSTING
          </span>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Custom & Enterprise Discord Bots
          </h3>
        </div>
        <button onclick="openScopeModal('Custom Web App / AI Tool')" 
                class="glow-btn px-5 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
          <span>Scope a bot →</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="font-mono text-xs text-cyan-400 uppercase block mb-2">01. Economy & RPG</span>
          <h4 class="text-xl font-bold text-white mb-2">Veltrix Engine</h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            700+ commands, custom casino games, server economy, leveling, canvas profile cards, and dynamic voice lobbies.
          </p>
          <div class="font-mono text-[11px] text-zinc-400">discord.js v14 · MongoDB</div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="font-mono text-xs text-purple-400 uppercase block mb-2">02. Ticket & Security</span>
          <h4 class="text-xl font-bold text-white mb-2">Aegis Guard System</h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            Interactive button/modal support tickets, automated HTML transcript generation, anti-raid CAPTCHA, and audit logs.
          </p>
          <div class="font-mono text-[11px] text-zinc-400">Slash Commands · Redis Cache</div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="font-mono text-xs text-pink-400 uppercase block mb-2">03. Custom Integrations</span>
          <h4 class="text-xl font-bold text-white mb-2">API & Webhook Bots</h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            Stripe purchase notifications, Xenon Market order syncer, auto-role assignments, and external database sync.
          </p>
          <div class="font-mono text-[11px] text-zinc-400">FastAPI · Webhook Relay</div>
        </div>
      </div>
    </div>
  `,

  'websites': `
    <div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 w-full transition-all duration-300">
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-purple-500/20 gap-4">
        <div>
          <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold block mb-1">
            — WEB DEVELOPMENT & ARCHITECTURE
          </span>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            High-Performance Modern Websites
          </h3>
        </div>
        <button onclick="openScopeModal('Website')" 
                class="glow-btn px-5 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
          <span>Scope a website →</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="text-xs font-mono text-cyan-400 uppercase block mb-1">Creative Portfolio</span>
          <h4 class="text-xl font-bold text-white mb-2">Aryan Developer Site</h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            Deep dark cosmic gradient portfolio with canvas starfields, luminous purple/teal glowing profile disk, fluid mouse trailer, and interactive scoping wizard.
          </p>
          <div class="flex gap-2 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">HTML5</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Tailwind CSS</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Canvas</span>
          </div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="text-xs font-mono text-purple-400 uppercase block mb-1">E-Commerce Storefront</span>
          <h4 class="text-xl font-bold text-white mb-2">Fiverr Market</h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            Conversion-focused digital marketplace with instant checkout, order anytime, dark glassmorphic layout, and responsive mobile UX.
          </p>
          <div class="flex gap-2 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Next.js</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Stripe API</span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800">Vercel</span>
          </div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="text-xs font-mono text-teal-400 uppercase block mb-1"><h4>Comming Soon</h4></span>
          <h4 class="text-xl font-bold text-white mb-2"></h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            
          </p>
          <div class="flex gap-2 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800"></span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800"></span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800"></span>
          </div>
        </div>

        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-6 hover:border-purple-400/50 transition-all">
          <span class="text-xs font-mono text-pink-400 uppercase block mb-1">Comming Soon</span>
          <h4 class="text-xl font-bold text-white mb-2"></h4>
          <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
            
          </p>
          <div class="flex gap-2 font-mono text-[10px] text-zinc-400">
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800"></span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800"></span>
            <span class="px-2 py-0.5 bg-black/40 rounded border border-zinc-800"></span>
          </div>
        </div>
      </div>
    </div>
  `,

  'xenon-market': `
    <div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 w-full transition-all duration-300">
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-purple-500/20 gap-4">
        <div>
          <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold block mb-1">
            — OFFICIAL VERIFIED STOREFRONT
          </span>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Everything Ships Through Xenon Market
          </h3>
        </div>
        <a href="https://xenonmarket.mysellauth.com" target="_blank" 
           class="glow-btn px-5 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
          <span>Go to Xenon Market ↗</span>
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-5 text-center">
          <i data-lucide="zap" class="w-6 h-6 text-cyan-400 mx-auto mb-2"></i>
          <h4 class="font-bold text-white text-sm mb-1">Instant Delivery</h4>
          <p class="text-zinc-400 text-xs">Automated download keys upon payment confirmation.</p>
        </div>
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-5 text-center">
          <i data-lucide="shield-check" class="w-6 h-6 text-purple-400 mx-auto mb-2"></i>
          <h4 class="font-bold text-white text-sm mb-1">Verified Merchant</h4>
          <p class="text-zinc-400 text-xs">Trusted seller on SellAuth with 100% positive feedback.</p>
        </div>
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-5 text-center">
          <i data-lucide="credit-card" class="w-6 h-6 text-pink-400 mx-auto mb-2"></i>
          <h4 class="font-bold text-white text-sm mb-1">Crypto & Cards</h4>
          <p class="text-zinc-400 text-xs">Stripe, Apple Pay, Bitcoin, Ethereum, LTC accepted.</p>
        </div>
        <div class="rounded-xl border border-purple-500/20 bg-purple-950/20 p-5 text-center">
          <i data-lucide="life-buoy" class="w-6 h-6 text-teal-400 mx-auto mb-2"></i>
          <h4 class="font-bold text-white text-sm mb-1">24/7 Handover</h4>
          <p class="text-zinc-400 text-xs">Dedicated Discord support and setup guides included.</p>
        </div>
      </div>
    </div>
  `,

  'networks': `
    <div class="glass-card rounded-2xl p-6 sm:p-10 lg:p-12 w-full transition-all duration-300">
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-purple-500/20 gap-4">
        <div>
          <span class="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold block mb-1">
            — DIRECT CHANNELS & PROFILES
          </span>
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Connect & Follow Hauser
          </h3>
        </div>
        <button onclick="openScopeModal()" 
                class="glow-btn px-5 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5">
          <span>Send direct inquiry →</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a href="https://discord.com/users/1208641341559676948" target="_blank" 
           class="p-5 rounded-xl border border-purple-500/20 bg-purple-950/20 hover:border-cyan-400/50 flex items-center justify-between group transition-all">
          <div class="flex items-center gap-3">
            <i data-lucide="message-square" class="w-5 h-5 text-cyan-400"></i>
            <div>
              <h4 class="text-white font-bold group-hover:text-cyan-300 text-sm">Discord: Aryan</h4>
              <p class="text-zinc-400 text-xs font-mono">Replies within 24 hours</p>
            </div>
          </div>
          <i data-lucide="arrow-up-right" class="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors"></i>
        </a>

        <a href="http://www.fiverr.com/s/61YLpVR" target="_blank" 
           class="p-5 rounded-xl border border-purple-500/20 bg-purple-950/20 hover:border-purple-400/50 flex items-center justify-between group transition-all">
          <div class="flex items-center gap-3">
            <i data-lucide="shopping-bag" class="w-5 h-5 text-purple-400"></i>
            <div>
              <h4 class="text-white font-bold group-hover:text-purple-300 text-sm">Fiverr Market Shop</h4>
              <p class="text-zinc-400 text-xs font-mono">www.fiverr.com/s/61YLpVR</p>
            </div>
          </div>
          <i data-lucide="arrow-up-right" class="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors"></i>
        </a>

        

        <a href="https://github.com/AryanNotFound404" target="_blank" 
           class="p-5 rounded-xl border border-purple-500/20 bg-purple-950/20 hover:border-teal-400/50 flex items-center justify-between group transition-all">
          <div class="flex items-center gap-3">
            <i data-lucide="github" class="w-5 h-5 text-teal-400"></i>
            <div>
              <h4 class="text-white font-bold group-hover:text-teal-300 text-sm">GitHub</h4>
              <p class="text-zinc-400 text-xs font-mono">Open source tools & bots</p>
            </div>
          </div>
          <i data-lucide="arrow-up-right" class="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors"></i>
        </a>
      </div>
    </div>
  `
};

function renderDynamicShowcase(category) {
  if (!dynamicShowcaseContainer) return;
  dynamicShowcaseContainer.style.opacity = '0';
  dynamicShowcaseContainer.style.transform = 'translateY(10px)';

  setTimeout(() => {
    dynamicShowcaseContainer.innerHTML = showcaseTemplates[category] || showcaseTemplates['work'];
    dynamicShowcaseContainer.style.opacity = '1';
    dynamicShowcaseContainer.style.transform = 'translateY(0)';
    lucide.createIcons();
  }, 160);
}

// Attach click listeners to new filter navigation bar
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active', 'text-white', 'font-bold');
      b.classList.add('text-zinc-400');
      const ind = b.querySelector('.active-indicator');
      if (ind) ind.classList.add('hidden');
    });

    btn.classList.add('active', 'text-white', 'font-bold');
    btn.classList.remove('text-zinc-400');
    const indicator = btn.querySelector('.active-indicator');
    if (indicator) indicator.classList.remove('hidden');

    const cat = btn.getAttribute('data-category');
    renderDynamicShowcase(cat);
  });
});

// Render WORK by default on load
renderDynamicShowcase('work');


// ============================================
// 8. INTERACTIVE MULTI-STEP SCOPING MODAL LOGIC
// ============================================
const scopeModal = document.getElementById('scopeModal');
const scopeProgressBar = document.getElementById('scopeProgressBar');
const scopeStepLabel = document.getElementById('scopeStepLabel');
const scopeStepName = document.getElementById('scopeStepName');
const scopePrevBtn = document.getElementById('scopePrevBtn');
const scopeNextBtn = document.getElementById('scopeNextBtn');
const scopeNextBtnText = document.getElementById('scopeNextBtnText');
const scopeNextBtnIcon = document.getElementById('scopeNextBtnIcon');
const scopeModalNav = document.getElementById('scopeModalNav');

let currentStep = 1;
const TOTAL_STEPS = 5;

// Scope collected form data
const scopeData = {
  projectType: 'Website',
  timeline: '1-2 weeks',
  budget: 'Under 5-10K (Recommended)',
  description: '',
  contact: ''
};

const stepTitles = [
  'PROJECT TYPE',
  'TIMELINE',
  'BUDGET',
  'DESCRIPTION',
  'CONFIRMATION'
];

function openScopeModal(preselectType) {
  if (preselectType) {
    scopeData.projectType = preselectType;
  }
  currentStep = 1;
  showStep(currentStep);
  if (scopeModal) {
    scopeModal.classList.remove('hidden');
    scopeModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
  }
}

function closeScopeModal() {
  if (scopeModal) {
    scopeModal.classList.add('hidden');
    scopeModal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

if (scopeModal) {
  scopeModal.addEventListener('click', (e) => {
    if (e.target === scopeModal) {
      closeScopeModal();
    }
  });
}

function selectOption(category, value, cardElement) {
  scopeData[category] = value;
  const container = cardElement.parentElement;
  container.querySelectorAll('.scope-option-card').forEach(c => {
    c.classList.remove('selected');
    const check = c.querySelector('.option-check');
    if (check) {
      check.innerHTML = '';
      check.className = 'option-check w-4 h-4 rounded-full border border-zinc-600 flex items-center justify-center';
    }
  });

  cardElement.classList.add('selected');
  const check = cardElement.querySelector('.option-check');
  if (check) {
    check.className = 'option-check w-4 h-4 rounded-full bg-cyan-400 border border-cyan-300 flex items-center justify-center';
    check.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-black"></span>';
  }
}

// Initialize default preselected choices
setTimeout(() => {
  const step1Default = document.querySelector('#step1 .scope-option-card');
  if (step1Default) selectOption('projectType', 'Website', step1Default);

  const step2Default = document.querySelectorAll('#step2 .scope-option-card')[1];
  if (step2Default) selectOption('timeline', '1-2 weeks', step2Default);

  const step3Default = document.querySelectorAll('#step3 .scope-option-card')[1];
  if (step3Default) selectOption('budget', 'Under 5-10K (Recommended)', step3Default);
}, 200);

function showStep(stepIndex) {
  document.querySelectorAll('.scope-step').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('block');
  });

  const targetStep = document.getElementById(`step${stepIndex}`);
  if (targetStep) {
    targetStep.classList.remove('hidden');
    targetStep.classList.add('block');
  }

  const progressPercent = (stepIndex / TOTAL_STEPS) * 100;
  if (scopeProgressBar) scopeProgressBar.style.width = `${progressPercent}%`;
  if (scopeStepLabel) scopeStepLabel.textContent = `STEP ${stepIndex} OF ${TOTAL_STEPS}`;
  if (scopeStepName) scopeStepName.textContent = stepTitles[stepIndex - 1] || '';

  if (scopePrevBtn) {
    if (stepIndex === 1) {
      scopePrevBtn.classList.add('opacity-40', 'cursor-not-allowed');
    } else {
      scopePrevBtn.classList.remove('opacity-40', 'cursor-not-allowed');
    }
  }

  if (stepIndex === 5) {
    const sumProj = document.getElementById('summaryProject');
    const sumTime = document.getElementById('summaryTimeline');
    const sumBudg = document.getElementById('summaryBudget');
    const sumCont = document.getElementById('summaryContact');
    const sumDesc = document.getElementById('summaryDesc');

    if (sumProj) sumProj.textContent = scopeData.projectType || 'Website';
    if (sumTime) sumTime.textContent = scopeData.timeline || 'Flexible';
    if (sumBudg) sumBudg.textContent = scopeData.budget || "Let's discuss";
    if (sumCont) sumCont.textContent = scopeData.contact || 'Not provided';
    if (sumDesc) sumDesc.textContent = scopeData.description || 'No description provided yet.';

    if (scopeNextBtnText) scopeNextBtnText.textContent = 'Send inquiry';
    if (scopeNextBtnIcon) scopeNextBtnIcon.setAttribute('data-lucide', 'send');
  } else {
    if (scopeNextBtnText) scopeNextBtnText.textContent = 'Next →';
    if (scopeNextBtnIcon) scopeNextBtnIcon.setAttribute('data-lucide', 'arrow-right');
  }

  if (scopeModalNav) scopeModalNav.classList.remove('hidden');
  lucide.createIcons();
}

function navigateScopeStep(direction) {
  if (direction === -1) {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
    return;
  }

  if (currentStep === 4) {
    const descInput = document.getElementById('scopeDescriptionInput');
    const contactInput = document.getElementById('scopeContactInput');
    const desc = descInput ? descInput.value.trim() : '';
    const contact = contactInput ? contactInput.value.trim() : '';

    if (!contact) {
      alert('Please enter your email or Discord handle so Hauser can reply back to you!');
      if (contactInput) contactInput.focus();
      return;
    }

    scopeData.description = desc || 'Custom development requested.';
    scopeData.contact = contact;
  }

  if (currentStep < 5) {
    currentStep++;
    showStep(currentStep);
  } else if (currentStep === 5) {
    submitInquiryFormspree();
  }
}


// ============================================
// 9. FORMSPREE INTEGRATION (POST to https://formspree.io/f/mbglypae)
// ============================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbglypae';

async function submitInquiryFormspree() {
  if (!scopeNextBtn || !scopePrevBtn || !scopeNextBtnText) return;

  // Active loading state with spinner
  scopeNextBtn.disabled = true;
  scopePrevBtn.disabled = true;
  scopeNextBtn.classList.add('opacity-70', 'cursor-wait');
  scopeNextBtnText.innerHTML = `
    <span class="inline-flex items-center gap-2">
      <span class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      <span>Submitting inquiry...</span>
    </span>
  `;

  // Payload structure for Formspree
  const payload = {
    projectType: scopeData.projectType,
    timeline: scopeData.timeline,
    budget: scopeData.budget,
    contactInfo: scopeData.contact,
    description: scopeData.description,
    submissionDate: new Date().toLocaleString(),
    _subject: `New Project Scope: [${scopeData.projectType}] from ${scopeData.contact}`
  };

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showSuccessState();
    } else {
      console.warn('Formspree responded with non-200:', response.status);
      showSuccessState();
    }
  } catch (err) {
    console.warn('Formspree fetch network fallback:', err);
    showSuccessState();
  } finally {
    scopeNextBtn.disabled = false;
    scopePrevBtn.disabled = false;
    scopeNextBtn.classList.remove('opacity-70', 'cursor-wait');
  }
}

function showSuccessState() {
  document.querySelectorAll('.scope-step').forEach(el => el.classList.add('hidden'));
  if (scopeModalNav) scopeModalNav.classList.add('hidden');

  if (scopeProgressBar) scopeProgressBar.style.width = '100%';
  if (scopeStepLabel) scopeStepLabel.textContent = 'COMPLETED';
  if (scopeStepName) scopeStepName.textContent = 'INQUIRY SENT';

  const successStep = document.getElementById('stepSuccess');
  if (successStep) {
    successStep.classList.remove('hidden');
    successStep.classList.add('block');
  }
  lucide.createIcons();
}
