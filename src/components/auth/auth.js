// ---------- Toasts (replaces alert()) ----------
function ensureToastHost() {
  let host = document.getElementById('toastHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toastHost';
    document.body.appendChild(host);
  }
  return host;
}

function toast(message, type = 'success') {
  const host = ensureToastHost();
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="dot"></span><span>${message}</span>`;
  host.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

// ---------- Button ripple ----------
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button.submit, button.submit-secondary');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 550);
});

// ---------- Typewriter effect for the brand headline ----------
function typewrite(elId, text, speed = 28) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.innerHTML = '&nbsp;';
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      el.appendChild(cursor);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
}

// ---------- Animated stat counters ----------
function animateCounters() {
  document.querySelectorAll('.auth-stat .num').forEach((el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    let current = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current.toLocaleString();
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
}

// ---------- Scatter drifting crates at random positions ----------
function scatterCrates(containerId, count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const crate = document.createElement('div');
    crate.className = 'auth-crate';
    crate.style.left = `${10 + Math.random() * 80}%`;
    crate.style.top = `${10 + Math.random() * 75}%`;
    crate.style.animationDelay = `${Math.random() * 6}s`;
    crate.style.animationDuration = `${10 + Math.random() * 8}s`;
    container.appendChild(crate);
  }
}

// ---------- Shake helper (re-triggers CSS animation) ----------
function shakeField(input) {
  input.classList.remove('invalid');
  void input.offsetWidth; // force reflow to restart animation
  input.classList.add('invalid');
}

// ---------- Simple password strength check (used on signup) ----------
function passwordStrength(value) {
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return Math.min(score, 3); // 0-3
}

document.addEventListener('DOMContentLoaded', () => {
  scatterCrates('crateField', 6);
  animateCounters();
});