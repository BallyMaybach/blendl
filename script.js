/* Stammbaum Blendl — Vanilla JS, localStorage */

const STORE_KEY = 'stammbaum-blendl-v1';

const NODE_W = 116, NODE_H = 122, H_GAP = 12, V_GAP = 40, SPOUSE_GAP = 6;

let state = load();
let editingPersonId = null;
let editingPreset = null;
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

/* Neue Personen aus einer neueren data.js übernehmen, ohne eigene Änderungen zu verlieren */
function normalize(data) {
  if ((data.version || 1) < INITIAL_DATA.version) {
    INITIAL_DATA.persons.forEach(p => {
      if (!data.persons.some(x => x.id === p.id)) data.persons.push(clone(p));
    });
    data.version = INITIAL_DATA.version;
  }
  data.persons.forEach(p => { if (!p.sex) p.sex = 'm'; });
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
function newId(name) {
  const base = (name || 'person').toLowerCase()
    .replace(/[äÄ]/g, 'ae').replace(/[öÖ]/g, 'oe').replace(/[üÜ]/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'person';
  let id = base, i = 2;
  while (byId(id)) id = base + '-' + (i++);
  return id;
}

function initials(name) {
  /* "Johann (I) Plönl" -> "JP": Zusätze wie (I) oder C. C. überspringen */
  const words = (name || '?').split(/\s+/).filter(w => /^\p{L}{2}/u.test(w));
  if (words.length > 2) words.splice(1, words.length - 2);
  return (words.length ? words : [name || '?']).map(w => w[0].toUpperCase()).join('');
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

/* ===================== Stammbaum-Layout ===================== */

function computeLayout() {
  const people = family();
  const inFam = id => people.some(p => p.id === id);
  const unitOf = {};
  const units = [];

  people.forEach(p => {
    if (unitOf[p.id]) return;
    /* alle Ehepartner zusammenfassen, auch bei zwei Ehen */
    let members = [];
    const stack = [p];
    while (stack.length) {
      const x = stack.shift();
      if (members.includes(x) || unitOf[x.id]) continue;
      members.push(x);
      (x.partners || []).forEach(pid => {
        const partner = people.find(q => q.id === pid);
        if (partner) stack.push(partner);
      });
    }
    if (members.length > 2) {
      const hub = members.reduce((a, b) => (b.partners || []).length > (a.partners || []).length ? b : a);
      const others = members.filter(m => m !== hub);
      members = [others[0], hub, ...others.slice(1)];
    }
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

  /* Kontur-Layout: jeder Teilbaum merkt sich je Generation seinen linken und rechten Rand.
     Geschwister rücken so nah zusammen, wie es auf jeder Ebene einzeln passt,
     statt dass jeder Ast über alle Generationen eine eigene Spalte belegt. */
  function packRow(trees) {
    const L = [], R = [], offs = [];
    trees.forEach(t => {
      let off = 0;
      if (offs.length) {
        off = -Infinity;
        t.L.forEach((l, d) => { if (d < R.length) off = Math.max(off, R[d] + H_GAP - l); });
        if (off === -Infinity) off = 0;
      }
      offs.push(off);
      t.L.forEach((l, d) => { L[d] = d < L.length ? Math.min(L[d], l + off) : l + off; });
      t.R.forEach((r, d) => { R[d] = d < R.length ? Math.max(R[d], r + off) : r + off; });
    });
    return { L, R, offs };
  }

  /* liefert die Kontur des Teilbaums, relativ zur linken Kante von u */
  function build(u, depth) {
    u.depth = depth;
    u.placed = true;
    const kids = u.kids.filter(k => !claimed.has(k));
    kids.forEach(k => claimed.add(k));
    u.packed = kids;
    const w = unitW(u);
    if (!kids.length) { u.offs = []; return { L: [0], R: [w] }; }

    const row = packRow(kids.map(k => build(k, depth + 1)));
    const first = kids[0], last = kids[kids.length - 1];
    const center = (row.offs[0] + row.offs[row.offs.length - 1] + unitW(last)) / 2;
    const px = center - w / 2;
    u.offs = row.offs.map(o => o - px);
    return {
      L: [0, ...row.L.map(l => l - px)],
      R: [w, ...row.R.map(r => r - px)]
    };
  }

  function assign(u, x) {
    u.x = x;
    u.packed.forEach((k, i) => assign(k, x + u.offs[i]));
  }

  const roots = [];
  units.forEach(u => {
    const hasParentsInTree = u.members.some(m => (m.parents || []).some(inFam));
    if (!hasParentsInTree && !claimed.has(u)) { claimed.add(u); roots.push(u); }
  });
  const rootTrees = roots.map(u => build(u, 0));
  units.forEach(u => { if (!u.placed) { claimed.add(u); roots.push(u); rootTrees.push(build(u, 0)); } });
  const top = packRow(rootTrees);
  roots.forEach((u, i) => assign(u, top.offs[i]));

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

    for (let i = 1; i < u.members.length; i++) {
      const a = u.members[i - 1], b = u.members[i];
      if (!(a.partners || []).includes(b.id) && !(b.partners || []).includes(a.id)) continue;
      const x1 = memberX(u, i - 1) + NODE_W;
      const x2 = memberX(u, i);
      const cy = y + NODE_H / 2;
      paths += '<path d="M' + x1 + ' ' + cy + ' H' + x2 + '"/>';
    }

    const kids = u.kids.filter(k => k.placed && k.depth === u.depth + 1);
    if (kids.length) {
      let pcx = u.x + 20 + unitW(u) / 2;
      if (u.members.length > 2) {
        /* bei zwei Ehen: Linie zwischen den Eltern der Kinder ansetzen */
        const k0 = kids[0].members.find(m => m.id === kids[0].anchorId) || kids[0].members[0];
        const idx = u.members.map((m, i) => (k0.parents || []).includes(m.id) ? i : -1).filter(i => i >= 0);
        if (idx.length === 2) pcx = (memberX(u, idx[0]) + memberX(u, idx[1]) + NODE_W) / 2;
      }
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

/* ===================== Sheets ===================== */

const backdrop = document.getElementById('backdrop');

function openSheet(id) {
  closeSheets();
  backdrop.hidden = false;
  document.getElementById(id).hidden = false;
}
function closeSheets() {
  ['sheet', 'formSheet', 'menuSheet'].forEach(id => {
    document.getElementById(id).hidden = true;
  });
  backdrop.hidden = true;
}
backdrop.onclick = closeSheets;
document.getElementById('sheetClose').onclick = closeSheets;
document.getElementById('formClose').onclick = closeSheets;
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

  let html = '<div class="detail-head ' + sexClass(p) + '">' + avatarHTML(p) +
    '<div><h2>' + esc(p.name) + '</h2>' +
    (p.role ? '<p class="sub">' + esc(p.role) + '</p>' : '') +
    (lifespan(p) || p.place
      ? '<p class="dates">' + esc([lifespan(p), p.place].filter(Boolean).join(' · ')) + '</p>' : '') +
    '</div></div>';

  if (p.photo) html += '<img class="detail-photo" src="' + p.photo + '" alt="">';
  if (p.notes) html += '<p class="detail-text">' + esc(p.notes) + '</p>';

  html += relRow('Eltern', parents);
  html += relRow('Partner', partners);
  html += relRow('Kinder', kids);
  html += relRow('Geschwister', siblings);

  html += '<div class="detail-actions">' +
    '<button class="primary-btn" data-act="edit">Bearbeiten</button>' +
    '<button class="ghost-btn" data-act="addchild">+ Kind</button>' +
    '<button class="ghost-btn" data-act="addpartner">+ Partner</button>' +
    ((p.parents || []).length < 2 ? '<button class="ghost-btn" data-act="addparent">+ Elternteil</button>' : '') +
    '<button class="ghost-btn" data-act="addsibling">+ Geschwister</button>' +
    '</div>';

  body.innerHTML = html;
  body.querySelectorAll('.chip').forEach(c => { c.onclick = () => openPerson(c.dataset.id); });
  body.querySelector('[data-act="edit"]').onclick = () => openPersonForm(p.id);
  const ac = body.querySelector('[data-act="addchild"]');
  if (ac) ac.onclick = () => openPersonForm(null, { childOf: p.id });
  const ap = body.querySelector('[data-act="addpartner"]');
  if (ap) ap.onclick = () => openPersonForm(null, { partnerOf: p.id });
  const apar = body.querySelector('[data-act="addparent"]');
  if (apar) apar.onclick = () => openPersonForm(null, { parentOf: p.id });
  body.querySelector('[data-act="addsibling"]').onclick = () => {
    if (!(p.parents || []).length) {
      toast('Erst einen Elternteil eintragen, dann lassen sich Geschwister verbinden');
      return;
    }
    openPersonForm(null, { siblingOf: p.id });
  };

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
  editingPreset = id ? null : (preset || null);
  pendingPhoto = null;
  const p = id ? byId(id) : null;
  const form = document.getElementById('personForm');

  document.getElementById('formTitle').textContent = p ? 'Person bearbeiten' : 'Neue Person';
  form.name.value = p ? p.name : '';
  form.role.value = p ? (p.role || '') : '';
  form.born.value = p ? (p.born || '') : '';
  form.died.value = p ? (p.died || '') : '';
  form.place.value = p ? (p.place || '') : '';
  form.notes.value = p ? (p.notes || '') : '';
  form.sex.value = p ? (p.sex || 'm') : 'm';

  setPhotoPreview(p && p.photo ? p.photo : '');

  const famOptions = family().filter(x => !p || x.id !== p.id);
  fillSelect(form.parent1, famOptions, p ? (p.parents || [])[0] : (preset && preset.childOf) || '');
  fillSelect(form.parent2, famOptions, p ? (p.parents || [])[1] : '');
  fillSelect(form.partner, state.persons.filter(x => !p || x.id !== p.id),
    p ? (p.partners || [])[0] : (preset && preset.partnerOf) || '');

  if (!p && preset && preset.siblingOf) {
    const sib = byId(preset.siblingOf);
    form.parent1.value = (sib.parents || [])[0] || '';
    form.parent2.value = (sib.parents || [])[1] || '';
  }

  /* neuer Elternteil: ist schon einer da, wird der neue gleich sein Partner */
  if (!p && preset && preset.parentOf) {
    const child = byId(preset.parentOf);
    const known = byId((child.parents || [])[0]);
    if (known) {
      form.partner.value = known.id;
      form.sex.value = known.sex === 'w' ? 'm' : 'w';
    }
    if (child.role) {
      const m = child.role.match(/^(\d+)\. Generation/);
      if (m && +m[1] > 1) form.role.value = (+m[1] - 1) + '. Generation';
    }
  }

  if (!p && preset && preset.childOf) {
    const parent = byId(preset.childOf);
    const other = parent && (parent.partners || [])[0];
    if (other) form.parent2.value = other;
  }

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
  let p = editingPersonId ? byId(editingPersonId) : null;

  const isNew = !p;
  if (!p) {
    p = { id: newId(form.name.value), kind: 'family', parents: [], partners: [], photo: '' };
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

  p.parents = [form.parent1.value, form.parent2.value]
    .filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);

  /* Nur der erste Partner steht im Formular, weitere (zweite Ehe) bleiben erhalten */
  const newPartner = form.partner.value;
  const oldFirst = (p.partners || [])[0];
  const rest = (p.partners || []).slice(1).filter(x => x !== newPartner);
  if (oldFirst && oldFirst !== newPartner) {
    const other = byId(oldFirst);
    if (other && other.partners) other.partners = other.partners.filter(x => x !== p.id);
  }
  p.partners = newPartner ? [newPartner, ...rest] : rest;
  if (newPartner) {
    const other = byId(newPartner);
    if (other) {
      other.partners = other.partners || [];
      if (!other.partners.includes(p.id)) other.partners.push(p.id);
    }
  }

  /* "+ Elternteil": neue Person beim Kind als Elternteil eintragen */
  if (isNew && editingPreset && editingPreset.parentOf) {
    const child = byId(editingPreset.parentOf);
    if (child && !(child.parents || []).includes(p.id) && (child.parents || []).length < 2) {
      child.parents = [...(child.parents || []), p.id];
    }
  }
  editingPreset = null;

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

/* ===================== Menü ===================== */

document.getElementById('btnMenu').onclick = () => {
  const bytes = new Blob([JSON.stringify(state)]).size;
  document.getElementById('storageNote').textContent =
    'Auf diesem Gerät gespeichert: ' + family().length + ' Personen (' +
    Math.round(bytes / 1024) + ' KB). Der Browser kann ungefähr 5 MB halten. Bei vielen Fotos regelmäßig eine Sicherung speichern.';
  openSheet('menuSheet');
};

document.getElementById('btnAddPerson').onclick = () => openPersonForm(null, {});

document.getElementById('btnExport').onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'stammbaum-blendl-' + new Date().toISOString().slice(0, 10) + '.json';
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

/* ===================== Zoom-Knöpfe ===================== */

document.getElementById('btnZoomIn').onclick = () => treeVP.zoomCenter(1.2);
document.getElementById('btnZoomOut').onclick = () => treeVP.zoomCenter(0.83);
document.getElementById('btnFit').onclick = treeVP.fit;

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
let needTreeStart = true;

function renderAll() {
  document.getElementById('docTitle').textContent = state.title || 'Stammbaum';
  document.getElementById('docSubtitle').textContent = state.subtitle || '';
  document.title = state.title || 'Stammbaum';
  renderTree();
  if (firstRender) {
    firstRender = false;
    requestAnimationFrame(startViews);
    setTimeout(startViews, 300);
  } else {
    treeVP.apply();
  }
}

/* Startansicht erst setzen, wenn die Bühne wirklich Platz hat. */
function startViews() {
  if (needTreeStart && treeStage.getBoundingClientRect().width) {
    const el = document.querySelector('#nodes .node[data-id="' + (state.focus || INITIAL_DATA.focus) + '"]') ||
      document.querySelector('#nodes .node');
    if (el) { treeVP.focusEl(el); needTreeStart = false; }
  }
}
if (window.ResizeObserver) new ResizeObserver(startViews).observe(treeStage);

renderAll();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => { renderTree(); treeVP.apply(); });
}
