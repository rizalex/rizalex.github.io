---
name: Password Generator
tools: [Password, Tool, Generator]
image: https://images.unsplash.com/photo-1652508682936-f76c04760e5d?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
description: Generate strong, copy‑ready passwords various presets in-browser.
---

<div class="container py-4">
  <div class="row justify-content-center">
    <div class="col-lg-8">

      <!-- Header -->
      <div class="text-center mb-4">
        <h1 class="mb-2">Password Generator</h1>
        <p class="text-muted mb-0">Create strong, unique passwords entirely in your browser. Nothing is stored or transmitted.</p>
      </div>

      <!-- Output Card -->
      <div class="card shadow-sm mb-4">
        <div class="card-body p-4">
          <div class="input-group input-group-lg mb-3">
            <input id="pwd" type="password" class="form-control text-monospace font-weight-bold" readonly aria-label="Generated password" placeholder="Click Generate to create a password">
            <div class="input-group-append">
              <button id="btnToggle" class="btn btn-outline-secondary" type="button" title="Show/Hide password">
                <i class="fas fa-eye"></i>
              </button>
              <button id="btnCopy" class="btn btn-outline-secondary" type="button" title="Copy to clipboard">
                <i class="fas fa-copy"></i> Copy
              </button>
            </div>
          </div>

          <!-- Strength Meter -->
          <div class="d-flex align-items-center mb-3">
            <span class="badge badge-pill mr-2" id="strengthText" style="min-width: 60px;">—</span>
            <div class="flex-grow-1">
              <div class="progress" style="height: 8px;">
                <div id="strengthBar" class="progress-bar transition" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <small class="text-muted ml-2"><span id="entropyBits">0</span> bits</small>
          </div>

          <!-- Generate Button -->
          <button id="btnGenerate" class="btn btn-primary btn-block btn-lg" type="button">
            <i class="fas fa-sync-alt mr-2"></i>Generate Password
          </button>

          <p class="small text-muted text-center mt-2 mb-0">
            Press <kbd>Enter</kbd> to regenerate &middot; <kbd>Ctrl</kbd>/<kbd>&#8984;</kbd>+<kbd>C</kbd> to copy
          </p>
        </div>
      </div>

      <!-- Error Box -->
      <div id="errorBox" class="alert alert-danger d-none" role="alert"></div>

      <!-- Settings Cards -->
      <div class="row">
        <!-- Presets -->
        <div class="col-md-6 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h6 class="card-title text-uppercase text-muted small mb-3">
                <i class="fas fa-magic mr-1"></i> Quick Presets
              </h6>
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary text-left preset-btn" data-preset="easy" type="button">
                  <strong>Easy to Read</strong>
                  <small class="d-block text-muted">12 chars &middot; letters &amp; digits only</small>
                </button>
                <button class="btn btn-outline-primary text-left preset-btn active" data-preset="balanced" type="button">
                  <strong>Balanced</strong>
                  <small class="d-block text-muted">16 chars &middot; includes safe symbols</small>
                </button>
                <button class="btn btn-outline-primary text-left preset-btn" data-preset="strong" type="button">
                  <strong>Strong</strong>
                  <small class="d-block text-muted">20 chars &middot; all symbol sets</small>
                </button>
                <button class="btn btn-outline-primary text-left preset-btn" data-preset="paranoid" type="button">
                  <strong>Paranoid</strong>
                  <small class="d-block text-muted">32 chars &middot; maximum entropy</small>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Length & Characters -->
        <div class="col-md-6 mb-3">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <!-- Length -->
              <h6 class="card-title text-uppercase text-muted small mb-2">
                <i class="fas fa-ruler-horizontal mr-1"></i> Length: <strong id="lengthDisplay">16</strong>
              </h6>
              <div class="input-group mb-3">
                <input id="lenRange" type="range" class="custom-range" min="8" max="64" value="16">
                <div class="input-group-append" style="width: 70px;">
                  <input id="lenInput" type="number" class="form-control form-control-sm text-center" min="8" max="64" value="16" aria-label="Password length">
                </div>
              </div>
              <div class="d-flex flex-wrap mb-3">
                <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" data-len="12">12</button>
                <button class="btn btn-sm btn-outline-secondary mr-1 mb-1 active" data-len="16">16</button>
                <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" data-len="20">20</button>
                <button class="btn btn-sm btn-outline-secondary mr-1 mb-1" data-len="24">24</button>
                <button class="btn btn-sm btn-outline-secondary mb-1" data-len="32">32</button>
              </div>

              <hr class="my-3">

              <!-- Character Sets -->
              <h6 class="card-title text-uppercase text-muted small mb-2">
                <i class="fas fa-font mr-1"></i> Character Sets
              </h6>
              <div class="form-row">
                <div class="col-6">
                  <div class="custom-control custom-checkbox mb-2">
                    <input class="custom-control-input" type="checkbox" id="chkLower" checked>
                    <label class="custom-control-label" for="chkLower">a–z <small class="text-muted">lower</small></label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="custom-control custom-checkbox mb-2">
                    <input class="custom-control-input" type="checkbox" id="chkUpper" checked>
                    <label class="custom-control-label" for="chkUpper">A–Z <small class="text-muted">upper</small></label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="custom-control custom-checkbox mb-2">
                    <input class="custom-control-input" type="checkbox" id="chkDigits" checked>
                    <label class="custom-control-label" for="chkDigits">0–9 <small class="text-muted">digits</small></label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="custom-control custom-checkbox mb-2">
                    <input class="custom-control-input" type="checkbox" id="chkSymbols" checked>
                    <label class="custom-control-label" for="chkSymbols">!@# <small class="text-muted">symbols</small></label>
                  </div>
                </div>
              </div>
              <select id="selSymbols" class="custom-select custom-select-sm mb-2" aria-label="Symbol set">
                <option value="safe" selected>Safe symbols: ! @ # $ % ^ &amp; * _ - + = ?</option>
                <option value="all">All symbols (includes brackets, quotes, etc.)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Options -->
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h6 class="card-title text-uppercase text-muted small mb-3">
            <i class="fas fa-sliders-h mr-1"></i> Advanced Options
          </h6>
          <div class="form-row">
            <div class="col-md-4 mb-2">
              <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" id="chkAmbig" checked>
                <label class="custom-control-label" for="chkAmbig">Exclude look‑alikes</label>
              </div>
              <small class="text-muted d-block ml-4">Removes O/0, l/1, S/5, B/8</small>
            </div>
            <div class="col-md-4 mb-2">
              <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" id="chkEnsure" checked>
                <label class="custom-control-label" for="chkEnsure">Guarantee each type</label>
              </div>
              <small class="text-muted d-block ml-4">At least one from every set</small>
            </div>
            <div class="col-md-4 mb-2">
              <div class="custom-control custom-checkbox">
                <input class="custom-control-input" type="checkbox" id="chkNoRepeat">
                <label class="custom-control-label" for="chkNoRepeat">No repeats</label>
              </div>
              <small class="text-muted d-block ml-4">Prevents "aa", "$$" etc.</small>
            </div>
          </div>
          <div class="mt-2 pt-2 border-top">
            <small class="text-muted">
              <i class="fas fa-info-circle mr-1"></i>
              Character pool: <strong id="poolCount">0</strong> unique characters
            </small>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- Toast Notification -->
<div class="position-fixed" style="top: 1rem; right: 1rem; z-index: 1080;">
  <div id="copyToast" class="toast" role="status" data-delay="1600" aria-live="polite" aria-atomic="true">
    <div class="toast-body bg-success text-white font-weight-bold rounded">
      <i class="fas fa-check-circle mr-1"></i> Copied to clipboard!
    </div>
  </div>
</div>

{% raw %}
<script>
  // --- Character sets ---
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const DIGITS = '0123456789';
  const SYMBOLS_SAFE = '!@#$%^&*_-+=?';
  const SYMBOLS_ALL = "!@#$%^&*()_+-={}[]:\\\":;'<>?,./\\\\|~`";
  const AMBIGUOUS = new Set(Array.from('O0oIl1S5B8G6Z2'));

  // DOM
  const $ = (sel) => document.querySelector(sel);
  const pwd = $('#pwd');
  const btnToggle = $('#btnToggle');
  const btnCopy = $('#btnCopy');
  const btnGen = $('#btnGenerate');
  const lenRange = $('#lenRange');
  const lenInput = $('#lenInput');
  const lengthDisplay = $('#lengthDisplay');
  const chkLower = $('#chkLower');
  const chkUpper = $('#chkUpper');
  const chkDigits = $('#chkDigits');
  const chkSymbols = $('#chkSymbols');
  const selSymbols = $('#selSymbols');
  const chkAmbig = $('#chkAmbig');
  const chkEnsure = $('#chkEnsure');
  const chkNoRepeat = $('#chkNoRepeat');
  const poolCount = $('#poolCount');
  const entropyBits = $('#entropyBits');
  const bar = $('#strengthBar');
  const label = $('#strengthText');
  const errorBox = $('#errorBox');

  // Utilities
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const removeAmbiguous = (s) => [...s].filter(ch => !AMBIGUOUS.has(ch)).join('');

  function randIndex(max) {
    if (max <= 1) return 0;
    const arr = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max - 1;
    let r;
    do { crypto.getRandomValues(arr); r = arr[0]; } while (r > limit);
    return r % max;
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = randIndex(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getSettings() {
    if (document.activeElement !== lenInput) lenInput.value = lenRange.value;
    if (document.activeElement !== lenRange) lenRange.value = clamp(lenInput.value, 8, 64);
    const len = clamp(parseInt(lenRange.value, 10) || 16, 8, 64);

    let sets = [];
    if (chkLower.checked)  sets.push(LOWER);
    if (chkUpper.checked)  sets.push(UPPER);
    if (chkDigits.checked) sets.push(DIGITS);
    if (chkSymbols.checked) {
      sets.push(selSymbols.value === 'all' ? SYMBOLS_ALL : SYMBOLS_SAFE);
    }

    if (chkAmbig.checked) sets = sets.map(removeAmbiguous);
    sets = sets.filter(s => s.length > 0);

    const pool = Array.from(new Set(sets.join('').split(''))).join('');
    return { len, sets, pool, ensure: chkEnsure.checked, noRepeat: chkNoRepeat.checked };
  }

  function updateMeter(s) {
    const poolSize = Math.max(1, s.pool.length);
    const bits = Math.round(s.len * Math.log2(poolSize));
    entropyBits.textContent = String(bits);

    let width = 0, cls = 'bg-secondary', text = '—';
    if (bits < 40)      { width = 20; cls = 'bg-danger';  text = 'Weak'; }
    else if (bits < 60) { width = 45; cls = 'bg-warning'; text = 'OK'; }
    else if (bits < 80) { width = 70; cls = 'bg-success'; text = 'Good'; }
    else                { width = 95; cls = 'bg-info';    text = 'Great'; }

    bar.style.width = width + '%';
    bar.setAttribute('aria-valuenow', width);
    bar.className = 'progress-bar transition ' + cls;

    const badgeMap = { 'bg-danger': 'badge-danger', 'bg-warning': 'badge-warning', 'bg-success': 'badge-success', 'bg-info': 'badge-info' };
    label.className = 'badge badge-pill ' + (badgeMap[cls] || 'badge-secondary');
    label.textContent = text;

    poolCount.textContent = s.pool.length;
  }

  function showError(msg) {
    errorBox.textContent = msg || '';
    errorBox.classList.toggle('d-none', !msg);
  }

  function generate() {
    const s = getSettings();
    updateMeter(s);

    if (!s.pool.length) { showError('Select at least one character group.'); return ''; }
    if (s.ensure && s.len < s.sets.length) {
      showError('Length must be \u2265 ' + s.sets.length + ' to include each selected group.');
      return '';
    }
    showError('');

    const chars = [];
    if (s.ensure) {
      for (const set of s.sets) chars.push(set[randIndex(set.length)]);
    }
    while (chars.length < s.len) {
      const ch = s.pool[randIndex(s.pool.length)];
      if (s.noRepeat && chars.length && ch === chars[chars.length - 1]) continue;
      chars.push(ch);
    }

    shuffle(chars);
    const out = chars.join('');
    pwd.value = out;
    pwd.type = 'text';
    btnToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    return out;
  }

  function setLen(n) {
    lenRange.value = String(n);
    lenInput.value = String(n);
    lengthDisplay.textContent = n;
    document.querySelectorAll('[data-len]').forEach(b => b.classList.toggle('active', b.getAttribute('data-len') === String(n)));
  }

  // Presets
  const presets = {
    easy() {
      setLen(12);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = false; selSymbols.value = 'safe';
      chkAmbig.checked = chkEnsure.checked = true; chkNoRepeat.checked = false;
    },
    balanced() {
      setLen(16);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = true; selSymbols.value = 'safe';
      chkAmbig.checked = chkEnsure.checked = true; chkNoRepeat.checked = false;
    },
    strong() {
      setLen(20);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = true; selSymbols.value = 'all';
      chkAmbig.checked = chkEnsure.checked = chkNoRepeat.checked = true;
    },
    paranoid() {
      setLen(32);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = true; selSymbols.value = 'all';
      chkAmbig.checked = false; chkEnsure.checked = chkNoRepeat.checked = true;
    }
  };

  // Events
  btnGen.addEventListener('click', () => { generate(); });

  btnCopy.addEventListener('click', async () => {
    if (!pwd.value) return;
    try {
      await navigator.clipboard.writeText(pwd.value);
      showToast();
    } catch (e) {
      pwd.removeAttribute('readonly');
      pwd.select();
      const ok = document.execCommand('copy');
      pwd.setAttribute('readonly', '');
      if (ok) showToast();
    }
  });

  btnToggle.addEventListener('click', () => {
    const isHidden = pwd.type === 'password';
    pwd.type = isHidden ? 'text' : 'password';
    btnToggle.innerHTML = isHidden ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
  });

  lenRange.addEventListener('input', () => {
    lenInput.value = lenRange.value;
    lengthDisplay.textContent = lenRange.value;
    generate();
  });

  lenInput.addEventListener('input', () => {
    lenInput.value = clamp(parseInt(lenInput.value || '0', 10), 8, 64);
    lenRange.value = lenInput.value;
    lengthDisplay.textContent = lenInput.value;
    generate();
  });

  [chkLower, chkUpper, chkDigits, chkSymbols, selSymbols, chkAmbig, chkEnsure, chkNoRepeat]
    .forEach(el => el.addEventListener('change', generate));

  document.querySelectorAll('[data-len]').forEach(btn => {
    btn.addEventListener('click', () => {
      setLen(btn.getAttribute('data-len'));
      generate();
    });
  });

  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.getAttribute('data-preset');
      if (presets[p]) {
        presets[p]();
        document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        generate();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); generate(); }
  });

  function showToast() {
    const t = document.getElementById('copyToast');
    if (window.jQuery && typeof jQuery(t).toast === 'function') {
      jQuery(t).toast('show');
    } else {
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 1600);
    }
  }

  // Init
  (function init() {
    setLen(16);
    document.querySelector('[data-preset="balanced"]').classList.add('active');
    generate();
  })();
</script>
{% endraw %}

<style>
  .transition { transition: width 0.3s ease, background-color 0.3s ease; }
  .preset-btn { text-align: left !important; padding: 0.6rem 0.8rem; }
  .preset-btn strong { display: block; margin-bottom: 2px; }
  .preset-btn small { font-size: 0.75rem; }
  .preset-btn.active { border-color: #007bff; background-color: rgba(0,123,255,0.05); }
  #lenRange { cursor: pointer; }
  .input-group-lg .form-control { font-size: 1.1rem; }
  .d-grid { display: grid; }
  .gap-2 { gap: 0.5rem; }
</style>
