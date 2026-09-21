/* Stammbaum Fanderl — Vanilla JS, localStorage */

const STORE_KEY = 'stammbaum-fanderl-v1';

const NODE_W = 150, NODE_H = 150, H_GAP = 26, V_GAP = 72, SPOUSE_GAP = 16;
const NN_W = 112, NN_H = 96;

let state = load();
let editingPersonId = null;
let editingEventId = null;
let pendingPhoto = null;   // null = unverändert, '' = entfernt, string = neues Foto

/* ===================== Daten ===================== */

function load() {
  let data = null;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.persons)) data = parsed;
    }
  } catch (e) { console.warn('localStorage nicht lesbar', e); }
  return normalize(data || clone(INITIAL_DATA));
}

/* Geschlecht und Netzwerk-Gruppe ergänzen, falls nicht gesetzt */
function normalize(data) {
  data.events = data.events || [];
  data.songs = data.songs || [];
  data.persons.forEach(p => {
    if (!p.sex) p.sex = FEMALE_IDS.includes(p.id) ? 'w' : 'm';
    if (p.kind === 'companion' && !p.group) {
      const g = GROUPS.find(gr => gr.ids.includes(p.id));
      p.group = g ? g.id : GROUPS[GROUPS.length - 1].id;
    }
  });
  return data;
}

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch (e) {
    toast('Speicher voll. Bitte eine Sicherung herunterladen.');
    console.warn(e);
  }
}

function clone(o) { return JSON.parse(JSON.stringify(o)); }
function byId(id) { return state.persons.find(p => p.id === id); }
function family() { return state.persons.filter(p => p.kind === 'family'); }
function companions() { return state.persons.filter(p => p.kind === 'companion'); }

function newId(name) {
  const base = (name || 'person').toLowerCase()
    .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'person';
  let id = base, i = 2;
  while (byId(id)) id = base + '-' + (i++);
  return id;
}

function initials(name) {
  return (name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

function lifespan(p) {
  if (p.born && p.died) return p.born + ' – ' + p.died;
  if (p.born) return '* ' + p.born;
  if (p.died) return '† ' + p.died;
  return '';
}

function sexClass(p) { return p.sex === 'w' ? 's-w' : 's-m'; }

function avatarHTML(p, cls) {
  const inner = p.photo ? '<img src="' + p.photo + '" alt="">' : esc(initials(p.name));
  return '<div class="' + (cls || 'avatar') + '">' + inner + '</div>';
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cut(s, n) { return s.length > n ? s.slice(0, n - 1).trim() + '…' : s; }

/* ===================== Viewport (Pan & Zoom) ===================== */

function makeViewport(stage, canvas) {
  const v = { x: 0, y: 0, k: 1 };
  let layout = { width: 1, height: 1 };

  function apply() {
    canvas.style.transform = 'translate(' + v.x + 'px,' + v.y + 'px) scale(' + v.k + ')';
  }

  function setLayout(l) { layout = l; }

  function fit() {
    const r = stage.getBoundingClientRect();
    if (!r.width) return;
    const k = Math.min((r.width - 20) / layout.width, (r.height - 20) / layout.height, 1.4);
    v.k = Math.max(0.12, Math.min(k, 1.4));
    v.x = (r.width - layout.width * v.k) / 2;
    v.y = Math.max(10, (r.height - layout.height * v.k) / 2);
    apply();
  }

  function focusEl(el, k) {
    const r = stage.getBoundingClientRect();
    if (!el || !r.width) return fit();
    v.k = k || Math.max(0.5, Math.min(1, (r.width - 24) / (NODE_W * 2.3)));
    v.x = r.width / 2 - (el.offsetLeft + el.offsetWidth / 2) * v.k;
    v.y = r.height / 2 - (el.offsetTop + el.offsetHeight / 2) * v.k;
    apply();
  }

  function zoomAt(factor, cx, cy) {
    const r = stage.getBoundingClientRect();
    const px = (cx - r.left - v.x) / v.k;
    const py = (cy - r.top - v.y) / v.k;
    const k = Math.max(0.1, Math.min(3, v.k * factor));
    v.x -= (k - v.k) * px;
    v.y -= (k - v.k) * py;
    v.k = k;
    apply();
  }

  function zoomCenter(factor) {
    const r = stage.getBoundingClientRect();
    zoomAt(factor, r.left + r.width / 2, r.top + r.height / 2);
  }

  /* Gesten */
  let dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0, pinch = null;
  const dist = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  const mid = (a, b) => ({ x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 });

  stage.addEventListener('touchstart', e => {
    hideHints();
    if (e.touches.length === 2) {
      pinch = { d: dist(e.touches[0], e.touches[1]) };
      dragging = false;
    } else if (e.touches.length === 1) {
      dragging = true; moved = false;
      sx = e.touches[0].clientX; sy = e.touches[0].clientY;
      ox = v.x; oy = v.y;
    }
  }, { passive: true });

  stage.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && pinch) {
      e.preventDefault();
      const d = dist(e.touches[0], e.touches[1]);
      const m = mid(e.touches[0], e.touches[1]);
      zoomAt(d / pinch.d, m.x, m.y);
      pinch = { d };
    } else if (dragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
      v.x = ox + dx; v.y = oy + dy;
      apply();
    }
  }, { passive: false });

  stage.addEventListener('touchend', e => {
    if (e.touches.length === 0) { dragging = false; pinch = null; }
  });

  stage.addEventListener('mousedown', e => {
    dragging = true; moved = false;
    sx = e.clientX; sy = e.clientY; ox = v.x; oy = v.y;
    hideHints();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
    v.x = ox + dx; v.y = oy + dy;
    apply();
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  stage.addEventListener('click', e => {
    if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
  }, true);

  stage.addEventListener('wheel', e => {
    e.preventDefault();
    hideHints();
    zoomAt(e.deltaY < 0 ? 1.12 : 0.89, e.clientX, e.clientY);
  }, { passive: false });

  return { v, apply, fit, focusEl, zoomCenter, setLayout };
}

function hideHints() {
  document.querySelectorAll('.hint').forEach(h => h.classList.add('is-hidden'));
}

const treeStage = document.getElementById('stage');
const treeVP = makeViewport(treeStage, document.getElementById('canvas'));
const netStage = document.getElementById('netStage');
const netVP = makeViewport(netStage, document.getElementById('netCanvas'));

/* ===================== Stammbaum-Layout ===================== */

function computeLayout() {
  const people = family();
  const inFam = id => people.some(p => p.id === id);
  const unitOf = {};
  const units = [];

  people.forEach(p => {
    if (unitOf[p.id]) return;
    const members = [p];
    (p.partners || []).forEach(pid => {
      const partner = byId(pid);
      if (partner && partner.kind === 'family' && !unitOf[pid] && !members.includes(partner)) {
        members.push(partner);
      }
    });
    const u = { members, kids: [] };
    members.forEach(m => { unitOf[m.id] = u; });
    units.push(u);
  });

  units.forEach(u => {
    people.forEach(child => {
      const par = (child.parents || []).filter(inFam);
      if (!par.length) return;
      if (par.some(pid => u.members.some(m => m.id === pid))) {
        const cu = unitOf[child.id];
        if (cu && cu !== u && !u.kids.includes(cu)) {
          cu.anchorId = child.id;
          u.kids.push(cu);
        }
      }
    });
  });

  const unitW = u => u.members.length * NODE_W + (u.members.length - 1) * SPOUSE_GAP;
  const claimed = new Set();
  let cursor = 0;

  function shift(u, dx) {
    u.x += dx;
    u.kids.forEach(k => { if (k.placed) shift(k, dx); });
  }

  function place(u, depth) {
    u.depth = depth;
    u.placed = true;
    const kids = u.kids.filter(k => !claimed.has(k));
    kids.forEach(k => claimed.add(k));

    const w = unitW(u);
    if (!kids.length) {
      u.x = cursor;
      cursor += w + H_GAP;
      return;
    }
    const start = cursor;
    kids.forEach(k => place(k, depth + 1));
    const first = kids[0], last = kids[kids.length - 1];
    const center = (first.x + last.x + unitW(last)) / 2;
    u.x = center - w / 2;
    if (u.x < start) {
      const dx = start - u.x;
      kids.forEach(k => shift(k, dx));
      u.x = start;
    }
    cursor = Math.max(cursor, u.x + w + H_GAP);
  }

  units.forEach(u => {
    const hasParentsInTree = u.members.some(m => (m.parents || []).some(inFam));
    if (!hasParentsInTree && !claimed.has(u)) { claimed.add(u); place(u, 0); }
  });
  units.forEach(u => { if (!u.placed) { claimed.add(u); place(u, 0); } });

  const minX = Math.min(...units.map(u => u.x), 0);
  units.forEach(u => {
    u.x -= minX;
    u.y = u.depth * (NODE_H + V_GAP);
  });

  const width = Math.max(...units.map(u => u.x + unitW(u)), NODE_W) + 60;
  const height = Math.max(...units.map(u => u.y + NODE_H), NODE_H) + 60;
  return { units, unitW, width, height };
}

function memberX(u, i) { return u.x + 20 + i * (NODE_W + SPOUSE_GAP); }

function renderTree() {
  const nodes = document.getElementById('nodes');
  const svg = document.getElementById('lines');
  const layout = computeLayout();
  const { units, unitW } = layout;

  nodes.innerHTML = '';
  let paths = '';

  units.forEach(u => {
    const y = u.y + 20;

    if (u.members.length > 1) {
      const x1 = memberX(u, 0) + NODE_W;
      const x2 = memberX(u, 1);
      const cy = y + NODE_H / 2;
      paths += '<path d="M' + x1 + ' ' + cy + ' H' + x2 + '"/>';
    }

    const kids = u.kids.filter(k => k.placed && k.depth === u.depth + 1);
    if (kids.length) {
      const pcx = u.x + 20 + unitW(u) / 2;
      const pby = y + NODE_H;
      const busY = pby + V_GAP / 2;
      paths += '<path d="M' + pcx + ' ' + pby + ' V' + busY + '"/>';
      const xs = kids.map(k => {
        const idx = Math.max(0, k.members.findIndex(m => m.id === k.anchorId));
        return memberX(k, idx) + NODE_W / 2;
      });
      const minX = Math.min(...xs, pcx), maxX = Math.max(...xs, pcx);
      paths += '<path d="M' + minX + ' ' + busY + ' H' + maxX + '"/>';
      kids.forEach((k, i) => {
        paths += '<path d="M' + xs[i] + ' ' + busY + ' V' + (k.y + 20) + '"/>';
      });
    }

    u.members.forEach((p, i) => {
      const el = document.createElement('button');
      el.className = 'node ' + sexClass(p) + (p.star ? ' is-star' : '');
      el.style.left = memberX(u, i) + 'px';
      el.style.top = y + 'px';
      el.dataset.id = p.id;
      el.innerHTML =
        avatarHTML(p) +
        '<span class="nm">' + esc(p.name) + '</span>' +
        (lifespan(p) ? '<span class="dt">' + esc(lifespan(p)) + '</span>' : '') +
        (p.role ? '<span class="rl">' + esc(cut(p.role, 34)) + '</span>' : '');
      el.addEventListener('click', () => openPerson(p.id));
      nodes.appendChild(el);
    });
  });

  svg.setAttribute('width', layout.width);
  svg.setAttribute('height', layout.height);
  svg.innerHTML = '<g fill="none" stroke="#c8b99f" stroke-width="1.6" stroke-linecap="round">' + paths + '</g>';
  nodes.style.width = layout.width + 'px';
  nodes.style.height = layout.height + 'px';

  treeVP.setLayout(layout);
  return layout;
}

/* ===================== Netzwerk der Weggefährten ===================== */

function renderNetwork() {
  const nodes = document.getElementById('netNodes');
  const svg = document.getElementById('netLines');
  const star = state.persons.find(p => p.star) || family()[0];
  nodes.innerHTML = '';

  const placed = [];        // {p, x, y, w, h}
  const hubs = [];          // {label, x, y}
  let paths = '';

  const groups = GROUPS.map(g => ({
    id: g.id,
    label: g.label,
    members: companions().filter(p => p.group === g.id)
  })).filter(g => g.members.length);

  const extra = companions().filter(p => !groups.some(g => g.members.includes(p)));
  if (extra.length) groups.push({ id: 'weitere', label: 'Weitere', members: extra });

  const R_HUB = 330;
  const R1 = 560, R2 = 790;
  const step = (Math.PI * 2) / groups.length;
  const start = -Math.PI / 2;

  groups.forEach((g, gi) => {
    const a = start + gi * step;
    const hx = Math.cos(a) * R_HUB, hy = Math.sin(a) * R_HUB;
    hubs.push({ label: g.label + ' · ' + g.members.length, x: hx, y: hy });
    paths += '<path class="thin" d="M0 0 L' + hx.toFixed(1) + ' ' + hy.toFixed(1) + '"/>';

    const n = g.members.length;
    const rows = n > 4 ? [g.members.slice(0, Math.ceil(n / 2)), g.members.slice(Math.ceil(n / 2))] : [g.members];

    rows.forEach((row, ri) => {
      /* Winkel je Knoten im Sektor, Radius so weit außen, dass 130px Abstand bleiben */
      const sector = step * 0.82;
      const spread = Math.min(0.34, sector / Math.max(row.length, 1));
      const need = 130 / (2 * Math.sin(Math.max(spread, 0.02) / 2));
      const R = Math.max(ri === 0 ? R1 : R2, need + (ri === 0 ? 0 : 200));
      row.forEach((p, i) => {
        const ang = a + (i - (row.length - 1) / 2) * spread;
        const x = Math.cos(ang) * R, y = Math.sin(ang) * R;
        placed.push({ p, x, y });
        paths += '<path class="thin" d="M' + hx.toFixed(1) + ' ' + hy.toFixed(1) +
          ' L' + x.toFixed(1) + ' ' + y.toFixed(1) + '"/>';
      });
    });
  });

  /* Bounding box */
  const pad = 70;
  const xs = placed.map(o => o.x), ys = placed.map(o => o.y);
  const minX = Math.min(...xs, -NODE_W / 2) - NN_W / 2 - pad;
  const maxX = Math.max(...xs, NODE_W / 2) + NN_W / 2 + pad;
  const minY = Math.min(...ys, -NODE_H / 2) - NN_H / 2 - pad;
  const maxY = Math.max(...ys, NODE_H / 2) + NN_H / 2 + pad;
  const ox = -minX, oy = -minY;
  const width = maxX - minX, height = maxY - minY;

  /* Mittelpunkt: Wastl */
  if (star) {
    const el = document.createElement('button');
    el.className = 'node ' + sexClass(star) + ' is-star';
    el.style.left = (ox - NODE_W / 2) + 'px';
    el.style.top = (oy - NODE_H / 2) + 'px';
    el.dataset.id = star.id;
    el.innerHTML = avatarHTML(star) +
      '<span class="nm">' + esc(star.name) + '</span>' +
      '<span class="dt">' + esc(lifespan(star)) + '</span>' +
      '<span class="rl">' + esc(cut(star.role || '', 34)) + '</span>';
    el.onclick = () => openPerson(star.id);
    nodes.appendChild(el);
  }

  hubs.forEach(h => {
    const el = document.createElement('div');
    el.className = 'hub';
    el.textContent = h.label;
    el.style.left = (ox + h.x) + 'px';
    el.style.top = (oy + h.y) + 'px';
    nodes.appendChild(el);
    el.style.left = (ox + h.x - el.offsetWidth / 2) + 'px';
    el.style.top = (oy + h.y - el.offsetHeight / 2) + 'px';
  });

  placed.forEach(o => {
    const el = document.createElement('button');
    el.className = 'nnode ' + sexClass(o.p);
    el.style.left = (ox + o.x - NN_W / 2) + 'px';
    el.style.top = (oy + o.y - NN_H / 2) + 'px';
    el.dataset.id = o.p.id;
    el.dataset.search = (o.p.name + ' ' + (o.p.role || '') + ' ' + (o.p.place || '')).toLowerCase();
    el.innerHTML = avatarHTML(o.p, 'av') +
      '<span class="nn">' + esc(o.p.name) + '</span>' +
      (o.p.role ? '<span class="nr">' + esc(cut(o.p.role, 30)) + '</span>' : '');
    el.onclick = () => openPerson(o.p.id);
    nodes.appendChild(el);
  });

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.innerHTML = '<g transform="translate(' + ox + ',' + oy + ')" fill="none" ' +
    'stroke="#c8b99f" stroke-width="1.4" stroke-linecap="round" opacity=".85">' + paths + '</g>';
  nodes.style.width = width + 'px';
  nodes.style.height = height + 'px';

  const layout = { width, height };
  netVP.setLayout(layout);
  return layout;
}

function filterNetwork(q) {
  const term = (q || '').trim().toLowerCase();
  document.querySelectorAll('.nnode').forEach(el => {
    const hit = !term || el.dataset.search.includes(term);
    el.classList.toggle('dim', !hit);
    el.classList.toggle('hit', !!term && hit);
  });
  if (term) {
    const first = document.querySelector('.nnode.hit');
    if (first) netVP.focusEl(first, Math.max(netVP.v.k, 0.8));
  }
}

/* ===================== Zeitstrahl ===================== */

function renderTimeline() {
  const wrap = document.getElementById('timeline');
  wrap.innerHTML = '';
  state.events.forEach(ev => {
    const d = document.createElement('div');
    d.className = 'tl-item' + (ev.flag ? ' is-flag' : '');
    d.innerHTML =
      '<div class="d">' + esc(ev.date) + '</div>' +
      '<h3>' + esc(ev.title) + '</h3>' +
      '<p>' + esc(ev.text) + '</p>';
    d.onclick = () => openEventForm(ev.id);
    wrap.appendChild(d);
  });

  const songs = document.getElementById('songList');
  songs.innerHTML = '';
  (state.songs || []).forEach(s => {
    const d = document.createElement('div');
    d.className = 'song';
    d.innerHTML = '<b>' + esc(s.title) + '</b><p>' + esc(s.note) + '</p>';
    songs.appendChild(d);
  });
}

/* ===================== Sheets ===================== */

const backdrop = document.getElementById('backdrop');

function openSheet(id) {
  closeSheets();
  backdrop.hidden = false;
  document.getElementById(id).hidden = false;
}
function closeSheets() {
  ['sheet', 'formSheet', 'eventSheet', 'menuSheet'].forEach(id => {
    document.getElementById(id).hidden = true;
  });
  backdrop.hidden = true;
}
backdrop.onclick = closeSheets;
document.getElementById('sheetClose').onclick = closeSheets;
document.getElementById('formClose').onclick = closeSheets;
document.getElementById('eventClose').onclick = closeSheets;
document.getElementById('menuClose').onclick = closeSheets;
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheets(); });

function openPerson(id) {
  const p = byId(id);
  if (!p) return;
  const body = document.getElementById('sheetBody');

  const parents = (p.parents || []).map(byId).filter(Boolean);
  const partners = (p.partners || []).map(byId).filter(Boolean);
  const kids = state.persons.filter(x => (x.parents || []).includes(p.id));
  const siblings = parents.length
    ? state.persons.filter(x => x.id !== p.id && (x.parents || []).some(pid => (p.parents || []).includes(pid)))
    : [];
  const group = p.kind === 'companion' ? GROUPS.find(g => g.id === p.group) : null;

  let html = '<div class="detail-head ' + sexClass(p) + '">' + avatarHTML(p) +
    '<div><h2>' + esc(p.name) + '</h2>' +
    (p.role ? '<p class="sub">' + esc(p.role) + '</p>' : '') +
    (lifespan(p) || p.place
      ? '<p class="dates">' + esc([lifespan(p), p.place].filter(Boolean).join(' · ')) + '</p>' : '') +
    '</div></div>';

  if (group) html += '<p class="detail-rel"><b>' + esc(group.label) + '</b></p>';
  if (p.photo) html += '<img class="detail-photo" src="' + p.photo + '" alt="">';
  if (p.notes) html += '<p class="detail-text">' + esc(p.notes) + '</p>';

  html += relRow('Eltern', parents);
  html += relRow('Partner', partners);
  html += relRow('Kinder', kids);
  html += relRow('Geschwister', siblings);

  html += '<div class="detail-actions">' +
    '<button class="primary-btn" data-act="edit">Bearbeiten</button>' +
    (p.kind === 'family'
      ? '<button class="ghost-btn" data-act="addchild">+ Kind</button>' +
        '<button class="ghost-btn" data-act="addpartner">+ Partner</button>'
      : '') +
    '</div>';

  body.innerHTML = html;
  body.querySelectorAll('.chip').forEach(c => { c.onclick = () => openPerson(c.dataset.id); });
  body.querySelector('[data-act="edit"]').onclick = () => openPersonForm(p.id);
  const ac = body.querySelector('[data-act="addchild"]');
  if (ac) ac.onclick = () => openPersonForm(null, { childOf: p.id });
  const ap = body.querySelector('[data-act="addpartner"]');
  if (ap) ap.onclick = () => openPersonForm(null, { partnerOf: p.id });

  openSheet('sheet');
}

function relRow(label, list) {
  if (!list.length) return '';
  return '<p class="detail-rel"><b>' + label + '</b></p><div class="chip-row">' +
    list.map(p => '<button class="chip" data-id="' + p.id + '">' + esc(p.name) + '</button>').join('') +
    '</div>';
}

/* ---------- Personen-Formular ---------- */

function openPersonForm(id, preset) {
  editingPersonId = id;
  pendingPhoto = null;
  const p = id ? byId(id) : null;
  const form = document.getElementById('personForm');
  const isCompanion = p ? p.kind === 'companion' : !!(preset && preset.kind === 'companion');

  document.getElementById('formTitle').textContent = p ? 'Person bearbeiten' : 'Neue Person';
  form.name.value = p ? p.name : '';
  form.role.value = p ? (p.role || '') : '';
  form.born.value = p ? (p.born || '') : '';
  form.died.value = p ? (p.died || '') : '';
  form.place.value = p ? (p.place || '') : '';
  form.notes.value = p ? (p.notes || '') : '';
  form.sex.value = p ? (p.sex || 'm') : 'm';

  setPhotoPreview(p && p.photo ? p.photo : '');

  form.group.innerHTML = GROUPS.map(g =>
    '<option value="' + g.id + '">' + esc(g.label) + '</option>').join('');
  form.group.value = p && p.group ? p.group : GROUPS[0].id;

  document.getElementById('groupField').hidden = !isCompanion;
  document.getElementById('relationFields').hidden = isCompanion;

  const famOptions = family().filter(x => !p || x.id !== p.id);
  fillSelect(form.parent1, famOptions, p ? (p.parents || [])[0] : (preset && preset.childOf) || '');
  fillSelect(form.parent2, famOptions, p ? (p.parents || [])[1] : '');
  fillSelect(form.partner, state.persons.filter(x => !p || x.id !== p.id),
    p ? (p.partners || [])[0] : (preset && preset.partnerOf) || '');

  if (!p && preset && preset.childOf) {
    const parent = byId(preset.childOf);
    const other = parent && (parent.partners || [])[0];
    if (other) form.parent2.value = other;
  }

  form.dataset.kind = isCompanion ? 'companion' : 'family';
  document.getElementById('btnDelete').hidden = !p;
  openSheet('formSheet');
}

function fillSelect(sel, list, value) {
  sel.innerHTML = '<option value="">—</option>' +
    list.map(p => '<option value="' + p.id + '">' + esc(p.name) +
      (lifespan(p) ? ' (' + esc(lifespan(p)) + ')' : '') + '</option>').join('');
  sel.value = value || '';
}

function setPhotoPreview(src) {
  const el = document.getElementById('photoPreview');
  el.innerHTML = src ? '<img src="' + src + '" alt="">' : 'kein Foto';
}

document.getElementById('photoInput').addEventListener('change', e => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  resizeImage(file, 700, dataUrl => {
    pendingPhoto = dataUrl;
    setPhotoPreview(dataUrl);
  });
  e.target.value = '';
});

document.getElementById('photoRemove').onclick = () => {
  pendingPhoto = '';
  setPhotoPreview('');
};

function resizeImage(file, max, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => toast('Bild konnte nicht gelesen werden');
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById('personForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const kind = form.dataset.kind === 'companion' ? 'companion' : 'family';
  let p = editingPersonId ? byId(editingPersonId) : null;

  if (!p) {
    p = { id: newId(form.name.value), kind, parents: [], partners: [], photo: '' };
    state.persons.push(p);
  }
  p.name = form.name.value.trim();
  p.role = form.role.value.trim();
  p.born = form.born.value.trim();
  p.died = form.died.value.trim();
  p.place = form.place.value.trim();
  p.notes = form.notes.value.trim();
  p.sex = form.sex.value;
  if (pendingPhoto !== null) p.photo = pendingPhoto;

  if (kind === 'companion') {
    p.group = form.group.value;
  } else {
    p.parents = [form.parent1.value, form.parent2.value]
      .filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
  }

  const newPartner = form.partner.value;
  (p.partners || []).forEach(pid => {
    const other = byId(pid);
    if (other && other.partners) other.partners = other.partners.filter(x => x !== p.id);
  });
  p.partners = newPartner ? [newPartner] : [];
  if (newPartner) {
    const other = byId(newPartner);
    if (other) {
      other.partners = other.partners || [];
      if (!other.partners.includes(p.id)) other.partners.push(p.id);
    }
  }

  save();
  renderAll();
  closeSheets();
  toast('Gespeichert');
});

document.getElementById('btnDelete').onclick = () => {
  const p = editingPersonId ? byId(editingPersonId) : null;
  if (!p) return;
  if (!confirm('„' + p.name + '“ wirklich löschen?')) return;
  state.persons = state.persons.filter(x => x.id !== p.id);
  state.persons.forEach(x => {
    x.parents = (x.parents || []).filter(id => id !== p.id);
    x.partners = (x.partners || []).filter(id => id !== p.id);
  });
  save();
  renderAll();
  closeSheets();
  toast('Gelöscht');
};

/* ---------- Ereignis-Formular ---------- */

function openEventForm(id) {
  editingEventId = id;
  const ev = id ? state.events.find(e => e.id === id) : null;
  const form = document.getElementById('eventForm');
  document.getElementById('eventTitle').textContent = ev ? 'Ereignis bearbeiten' : 'Neues Ereignis';
  form.date.value = ev ? ev.date : '';
  form.title.value = ev ? ev.title : '';
  form.text.value = ev ? ev.text : '';
  document.getElementById('btnDeleteEvent').hidden = !ev;
  openSheet('eventSheet');
}

document.getElementById('eventForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  let ev = editingEventId ? state.events.find(x => x.id === editingEventId) : null;
  if (!ev) {
    ev = { id: 'ev-' + Date.now() };
    state.events.push(ev);
  }
  ev.date = form.date.value.trim();
  ev.title = form.title.value.trim();
  ev.text = form.text.value.trim();
  save();
  renderTimeline();
  closeSheets();
  toast('Gespeichert');
});

document.getElementById('btnDeleteEvent').onclick = () => {
  if (!editingEventId) return;
  if (!confirm('Ereignis wirklich löschen?')) return;
  state.events = state.events.filter(x => x.id !== editingEventId);
  save();
  renderTimeline();
  closeSheets();
  toast('Gelöscht');
};

document.getElementById('btnAddEvent').onclick = () => openEventForm(null);
document.getElementById('btnAddCompanion').onclick = () => openPersonForm(null, { kind: 'companion' });

/* ===================== Menü ===================== */

document.getElementById('btnMenu').onclick = () => {
  const bytes = new Blob([JSON.stringify(state)]).size;
  document.getElementById('storageNote').textContent =
    'Auf diesem Gerät gespeichert: ' + family().length + ' Personen im Stammbaum, ' +
    companions().length + ' Weggefährten, ' + state.events.length + ' Ereignisse (' +
    Math.round(bytes / 1024) + ' KB). Der Browser kann ungefähr 5 MB halten. Bei vielen Fotos regelmäßig eine Sicherung speichern.';
  openSheet('menuSheet');
};

document.getElementById('btnAddPerson').onclick = () => openPersonForm(null, {});

document.getElementById('btnExport').onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'stammbaum-fanderl-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('Sicherung heruntergeladen');
};

document.getElementById('importInput').addEventListener('change', e => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || !Array.isArray(data.persons)) throw new Error('Format');
      state = normalize(data);
      save();
      renderAll();
      closeSheets();
      toast('Sicherung geladen');
    } catch (err) {
      toast('Datei konnte nicht gelesen werden');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
});

document.getElementById('btnPrint').onclick = () => { closeSheets(); setTimeout(() => window.print(), 200); };

document.getElementById('btnReset').onclick = () => {
  if (!confirm('Alle eigenen Änderungen und Fotos verwerfen?')) return;
  state = normalize(clone(INITIAL_DATA));
  save();
  renderAll();
  closeSheets();
  toast('Zurückgesetzt');
};

/* ===================== Tabs, Zoom-Knöpfe, Suche ===================== */

document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.getElementById(tab.dataset.view).classList.add('is-active');
    startViews();
    requestAnimationFrame(startViews);
    setTimeout(startViews, 120);
  };
});

document.getElementById('btnZoomIn').onclick = () => treeVP.zoomCenter(1.2);
document.getElementById('btnZoomOut').onclick = () => treeVP.zoomCenter(0.83);
document.getElementById('btnFit').onclick = treeVP.fit;
document.getElementById('btnNetIn').onclick = () => netVP.zoomCenter(1.2);
document.getElementById('btnNetOut').onclick = () => netVP.zoomCenter(0.83);
document.getElementById('btnNetFit').onclick = netVP.fit;

document.getElementById('searchCompanions').addEventListener('input', e => filterNetwork(e.target.value));

let toastTimer = null;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
}

/* ===================== Start ===================== */

let firstRender = true;
let needTreeStart = true, needNetStart = true;

function renderAll() {
  document.getElementById('docTitle').textContent = state.title || 'Stammbaum';
  document.getElementById('docSubtitle').textContent = state.subtitle || '';
  renderTree();
  renderNetwork();
  renderTimeline();
  document.getElementById('netHint').textContent =
    companions().length + ' Weggefährten aus dem Heft · antippen für Details';
  if (firstRender) {
    firstRender = false;
    requestAnimationFrame(startViews);
    setTimeout(startViews, 300);
  } else {
    treeVP.apply();
    netVP.apply();
    filterNetwork(document.getElementById('searchCompanions').value);
  }
}

/* Startansicht erst setzen, wenn die Bühne wirklich Platz hat. */
function startViews() {
  if (needTreeStart && treeStage.getBoundingClientRect().width) {
    const star = state.persons.find(p => p.star) || family()[0];
    const el = star && document.querySelector('#nodes .node[data-id="' + star.id + '"]');
    if (el) { treeVP.focusEl(el); needTreeStart = false; }
  }
  if (needNetStart && netStage.getBoundingClientRect().width) {
    netVP.fit();
    needNetStart = false;
  }
}
if (window.ResizeObserver) {
  new ResizeObserver(startViews).observe(treeStage);
  new ResizeObserver(startViews).observe(netStage);
}

renderAll();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => { renderTree(); renderNetwork(); treeVP.apply(); netVP.apply(); });
}
