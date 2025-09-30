---
name: Password Generator
tools: [Password, Tool, Generator]
image: https://images.unsplash.com/photo-1652508682936-f76c04760e5d?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
description: Generate strong, copy‑ready passwords various presets in-browser.
---

<div class="container py-4">
  <div class="row">
    <div class="col-lg-7 mb-4">
      <h1 class="mb-2">Password Generator</h1>
      <p class="text-muted">
        Generate strong, copy‑ready passwords with quick presets and an <strong>easy‑to‑read</strong> option
        (removes look‑alike characters). Runs entirely in browser.
      </p>

      <!-- Output -->
      <div class="card mb-3">
        <div class="card-body">
          <label for="pwd" class="font-weight-bold mb-1">Result Password</label>
          <div class="input-group mb-2" aria-live="polite" aria-atomic="true">
            <input id="pwd" type="password" class="form-control text-monospace" readonly aria-label="Generated password">
            <div class="input-group-append">
              <button id="btnToggle" class="btn btn-outline-secondary" type="button" title="Show/Hide">👁</button>
              <button id="btnCopy" class="btn btn-outline-secondary" type="button" title="Copy">📋 Copy</button>
              <button id="btnGenerate" class="btn btn-primary" type="button" title="Generate">⚡ Generate</button>
            </div>
          </div>

          <!-- Strength/Entropy -->
          <div class="d-flex align-items-center mb-1">
            <div class="mr-2 small text-uppercase text-muted">Strength</div>
            <span id="strengthText" class="badge badge-secondary">—</span>
            <div class="flex-grow-1 mx-2">
              <div class="progress" style="height: 10px;">
                <div id="strengthBar" class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
            <div class="small text-muted">
              <span class="text-uppercase">Entropy</span>:
              <span id="entropyBits">0</span> bits
            </div>
          </div>

          <p class="small text-muted mb-0">
            Tip: press <kbd>Enter</kbd> to regenerate. Use <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>C</kbd> to copy.
          </p>
        </div>
      </div>

      <!-- Errors -->
      <div id="errorBox" class="alert alert-danger d-none" role="alert"></div>

      <!-- Toast (Bootstrap) -->
      <div class="position-fixed" style="top: 1rem; right: 1rem; z-index: 1080;">
        <div id="copyToast" class="toast" role="status" data-delay="1600" aria-live="polite" aria-atomic="true">
          <div class="toast-body font-weight-bold">Copied!</div>
        </div>
      </div>
    </div>

    <div class="col-lg-5">
      <!-- Presets -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="small text-uppercase text-muted mb-2">Presets</div>
          <div class="btn-group btn-group-sm flex-wrap" role="group" data-toggle="buttons">
            <button class="btn btn-outline-secondary" data-preset="easy" autocomplete="off">Easy to Read</button>
            <button class="btn btn-outline-secondary" data-preset="balanced" autocomplete="off">Balanced</button>
            <button class="btn btn-outline-secondary" data-preset="strong" autocomplete="off">Strong</button>
            <button class="btn btn-outline-secondary" data-preset="paranoid" autocomplete="off">Paranoid</button>
          </div>
        </div>
      </div>

      <!-- Length -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="small text-uppercase text-muted mb-2">Length</div>
          <div class="form-row align-items-center">
            <div class="col-8">
              <input id="lenRange" type="range" class="custom-range" min="8" max="64" value="16">
            </div>
            <div class="col-4">
              <input id="lenInput" type="number" class="form-control" min="8" max="64" value="16" aria-label="Password length">
            </div>
          </div>
          <div class="mt-2">
            <div class="btn-group btn-group-sm" role="group">
              <button class="btn btn-outline-secondary" data-len="12">12</button>
              <button class="btn btn-outline-secondary" data-len="16">16</button>
              <button class="btn btn-outline-secondary" data-len="20">20</button>
              <button class="btn btn-outline-secondary" data-len="24">24</button>
            </div>
          </div>
          <p class="small text-muted mb-0">Most people are well‑served by 16–24 characters.</p>
        </div>
      </div>

      <!-- Characters -->
      <div class="card mb-3">
        <div class="card-body">
          <div class="small text-uppercase text-muted mb-2">Characters</div>

          <div class="form-row">
            <div class="col-6">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkLower" checked>
                <label class="form-check-label" for="chkLower">a–z <span class="text-muted">(lowercase)</span></label>
              </div>
            </div>
            <div class="col-6">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkUpper" checked>
                <label class="form-check-label" for="chkUpper">A–Z <span class="text-muted">(uppercase)</span></label>
              </div>
            </div>
            <div class="col-6 mt-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkDigits" checked>
                <label class="form-check-label" for="chkDigits">0–9 <span class="text-muted">(digits)</span></label>
              </div>
            </div>
            <div class="col-6 mt-2">
              <div class="form-group mb-0">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="chkSymbols" checked>
                  <label class="form-check-label" for="chkSymbols">Symbols</label>
                </div>
                <select id="selSymbols" class="custom-select custom-select-sm mt-1" aria-label="Symbol set">
                  <option value="safe" selected>Safe</option>
                  <option value="all">All</option>
                </select>
                <small class="form-text text-muted">“Safe” uses: ! @ # $ % ^ &amp; * _ - + = ?</small>
              </div>
            </div>
          </div>

          <div class="small text-uppercase text-muted mt-3 mb-2">Readability &amp; Rules</div>
          <div class="form-row">
            <div class="col-12 col-md-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkAmbig" checked>
                <label class="form-check-label" for="chkAmbig">Exclude look‑alikes</label>
              </div>
              <small class="text-muted d-block">Removes O/0, l/1, S/5, B/8, G/6, Z/2</small>
            </div>
            <div class="col-12 col-md-4 mt-2 mt-md-0">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkEnsure" checked>
                <label class="form-check-label" for="chkEnsure">Ensure each selected type</label>
              </div>
              <small class="text-muted d-block">At least one from every checked group</small>
            </div>
            <div class="col-12 col-md-4 mt-2 mt-md-0">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="chkNoRepeat">
                <label class="form-check-label" for="chkNoRepeat">Avoid immediate repeats</label>
              </div>
              <small class="text-muted d-block">Prevents “aa”, “$$”, etc.</small>
            </div>
          </div>

          <p class="small text-muted mb-0">
            <strong>Character pool:</strong> <span id="poolCount">0</span> unique characters.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

{% raw %}
<script>
  // --- Character sets (no external CSS; uses Bootstrap components) ---
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const DIGITS = '0123456789';
  const SYMBOLS_SAFE = '!@#$%^&*_-+=?';
  const SYMBOLS_ALL = "!@#$%^&*()_+-={}[]:\\\":;'<>?,./\\\\|~`"; // note escaped \ and "

  // Confusable characters to exclude when "easy to read" is on
  const AMBIGUOUS = new Set(Array.from('O0oIl1S5B8G6Z2'));

  // DOM
  const $ = (sel) => document.querySelector(sel);
  const pwd = $('#pwd');
  const btnToggle = $('#btnToggle');
  const btnCopy = $('#btnCopy');
  const btnGen = $('#btnGenerate');

  const lenRange = $('#lenRange');
  const lenInput = $('#lenInput');

  const chkLower   = $('#chkLower');
  const chkUpper   = $('#chkUpper');
  const chkDigits  = $('#chkDigits');
  const chkSymbols = $('#chkSymbols');
  const selSymbols = $('#selSymbols');
  const chkAmbig   = $('#chkAmbig');
  const chkEnsure  = $('#chkEnsure');
  const chkNoRepeat= $('#chkNoRepeat');

  const poolCount  = $('#poolCount');
  const entropyBits= $('#entropyBits');
  const bar        = $('#strengthBar');
  const label      = $('#strengthText');
  const errorBox   = $('#errorBox');

  // Utilities
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const removeAmbiguous = (s) => [...s].filter(ch => !AMBIGUOUS.has(ch)).join('');

  // secure random index in [0, max)
  function randIndex(max){
    if (max <= 1) return 0;
    const arr = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max - 1; // avoid modulo bias
    let r;
    do {
      crypto.getRandomValues(arr);
      r = arr[0];
    } while (r > limit);
    return r % max;
  }

  function shuffle(a){
    for (let i = a.length - 1; i > 0; i--){
      const j = randIndex(i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function getSettings(){
    // keep slider & number in sync
    if (document.activeElement !== lenInput) lenInput.value = lenRange.value;
    if (document.activeElement !== lenRange) lenRange.value = clamp(lenInput.value, 8, 64);

    const len = clamp(parseInt(lenRange.value, 10) || 16, 8, 64);

    let sets = [];
    if (chkLower.checked)  sets.push(LOWER);
    if (chkUpper.checked)  sets.push(UPPER);
    if (chkDigits.checked) sets.push(DIGITS);
    if (chkSymbols.checked) {
      const base = selSymbols.value === 'all' ? SYMBOLS_ALL : SYMBOLS_SAFE;
      sets.push(base);
    }

    if (chkAmbig.checked) sets = sets.map(removeAmbiguous);
    sets = sets.filter(s => s.length > 0);

    const pool = Array.from(new Set(sets.join('').split(''))).join('');
    return { len, sets, pool,
             ensure: chkEnsure.checked,
             noRepeat: chkNoRepeat.checked };
  }

  function updateMeter(s){
    const poolSize = Math.max(1, s.pool.length);
    const bits = Math.round(s.len * Math.log2(poolSize));
    entropyBits.textContent = String(bits);

    // Map bits to qualitative class
    let width = 0, cls = 'bg-secondary', text = '—';
    if (bits < 40) { width = 20; cls = 'bg-danger';  text = 'Weak'; }
    else if (bits < 60) { width = 45; cls = 'bg-warning'; text = 'OK'; }
    else if (bits < 80) { width = 70; cls = 'bg-success'; text = 'Good'; }
    else { width = 95; cls = 'bg-info'; text = 'Great'; }

    bar.style.width = width + '%';
    bar.setAttribute('aria-valuenow', width);
    bar.className = 'progress-bar ' + cls;

    label.className = 'badge ' + (cls === 'bg-danger' ? 'badge-danger'
                      : cls === 'bg-warning' ? 'badge-warning'
                      : cls === 'bg-success' ? 'badge-success'
                      : cls === 'bg-info' ? 'badge-info'
                      : 'badge-secondary');
    label.textContent = text;

    poolCount.textContent = s.pool.length;
  }

  function showError(msg){
    errorBox.textContent = msg || '';
    errorBox.classList.toggle('d-none', !msg);
  }

  function generate(){
    const s = getSettings();
    updateMeter(s);

    if (!s.pool.length) { showError('Select at least one character group.'); return ''; }
    if (s.ensure && s.len < s.sets.length) {
      showError(`Length must be ≥ ${s.sets.length} to include each selected group.`);
      return '';
    }
    showError('');

    const chars = [];

    if (s.ensure){
      for (const set of s.sets){
        chars.push(set[randIndex(set.length)]);
      }
    }

    while (chars.length < s.len){
      const ch = s.pool[randIndex(s.pool.length)];
      if (s.noRepeat && chars.length && ch === chars[chars.length - 1]) continue;
      chars.push(ch);
    }

    shuffle(chars);
    const out = chars.join('');
    pwd.value = out;
    return out;
  }

  // Presets
  const presets = {
    easy(){ setLen(12);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = false; selSymbols.value = 'safe';
      chkAmbig.checked = chkEnsure.checked = true; chkNoRepeat.checked = false;
    },
    balanced(){ setLen(16);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = true; selSymbols.value = 'safe';
      chkAmbig.checked = chkEnsure.checked = true; chkNoRepeat.checked = false;
    },
    strong(){ setLen(20);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = true; selSymbols.value = 'all';
      chkAmbig.checked = chkEnsure.checked = chkNoRepeat.checked = true;
    },
    paranoid(){ setLen(32);
      chkLower.checked = chkUpper.checked = chkDigits.checked = true;
      chkSymbols.checked = true; selSymbols.value = 'all';
      chkAmbig.checked = false; chkEnsure.checked = chkNoRepeat.checked = true;
    }
  };
  function setLen(n){
    lenRange.value = String(n);
    lenInput.value = String(n);
  }

  // Events
  btnGen.addEventListener('click', () => { generate(); pwd.focus(); });
  btnCopy.addEventListener('click', async () => {
    if (!pwd.value) return;
    try {
      await navigator.clipboard.writeText(pwd.value);
      showToast();
    } catch (e) {
      pwd.removeAttribute('readonly'); pwd.select();
      const ok = document.execCommand('copy');
      pwd.setAttribute('readonly', '');
      if (ok) showToast();
    }
  });
  btnToggle.addEventListener('click', () => {
    if (pwd.type === 'password') { pwd.type = 'text'; btnToggle.textContent = '🙈'; }
    else { pwd.type = 'password'; btnToggle.textContent = '👁'; }
    pwd.focus();
  });

  // Input sync
  lenRange.addEventListener('input', () => { lenInput.value = lenRange.value; generate(); });
  lenInput.addEventListener('input', () => {
    lenInput.value = clamp(parseInt(lenInput.value || '0', 10), 8, 64);
    lenRange.value = lenInput.value; generate();
  });

  // Options trigger regeneration
  [chkLower, chkUpper, chkDigits, chkSymbols, selSymbols, chkAmbig, chkEnsure, chkNoRepeat]
    .forEach(el => el.addEventListener('change', generate));

  // Length chips
  document.querySelectorAll('[data-len]').forEach(btn => {
    btn.addEventListener('click', () => { setLen(btn.getAttribute('data-len')); generate(); });
  });

  // Preset buttons
  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => { const p = btn.getAttribute('data-preset'); if (presets[p]) { presets[p](); generate(); }});
  });

  // Keyboard: Enter -> regenerate
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); generate(); }
  });

  // Bootstrap/jQuery toast if present; graceful fallback otherwise
  function showToast(){
    const t = document.getElementById('copyToast');
    if (window.jQuery && typeof jQuery(t).toast === 'function'){
      jQuery(t).toast('show');
    } else {
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 1600);
    }
  }

  // Init
  (function init(){
    generate();
  })();
</script>
{% endraw %}

