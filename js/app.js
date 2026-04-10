/* ===== INLINE SVG ICONS ===== */
var ICONS = {
  'map-pin': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  'shield': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  'users': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'link': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  'clipboard-check': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>',
  'truck': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
  'package': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  'building': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  'wind': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
  'droplets': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 14.06c1.74 0 3.14-1.44 3.14-3.19 0-.91-.45-1.78-1.34-2.51-.9-.74-1.47-1.63-1.8-2.86-.34 1.23-.91 2.12-1.8 2.86-.9.73-1.34 1.6-1.34 2.51 0 1.75 1.4 3.19 3.14 3.19z"/><path d="M17 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S17.29 6.75 17 5.3c-.29 1.45-1.14 2.84-2.29 3.76S13 11.1 13 12.25c0 2.22 1.8 4.05 4 4.05z"/></svg>',
  'thermometer-sun': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9a4 4 0 0 0-2 7.5"/><path d="M12 3v2"/><path d="m6.6 18.4-1.4 1.4"/><path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M4 13H2"/><path d="M6.34 7.34 4.93 5.93"/></svg>',
  'help-circle': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  'check': '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  'calendar': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
  'clock': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
};

function icon(name, size) {
  const svg = ICONS[name] || '';
  if (size && svg) return svg.replace(/width="\d+"/, 'width="'+size+'"').replace(/height="\d+"/, 'height="'+size+'"');
  return svg;
}

/* ===== STATE ===== */
var LS_DIAG = 'prevention_climat_diagnostic';
var LS_PROF = 'prevention_climat_profile';
var LS_ACT  = 'prevention_climat_actions';

let state = {
  answers: {},
  currentStep: 0,
  completed: false,
  profile: { name: '', location: '', sector: '', size: '', profileType: '' },
  actionStatus: {}
};

function loadState() {
  try {
    const d = localStorage.getItem(LS_DIAG);
    if (d) { const p = JSON.parse(d); Object.assign(state, p); }
    const pr = localStorage.getItem(LS_PROF);
    if (pr) state.profile = JSON.parse(pr);
    const a = localStorage.getItem(LS_ACT);
    if (a) state.actionStatus = JSON.parse(a);
  } catch(e) { /* ignore */ }
}

function saveState() {
  localStorage.setItem(LS_DIAG, JSON.stringify({ answers: state.answers, currentStep: state.currentStep, completed: state.completed }));
  localStorage.setItem(LS_PROF, JSON.stringify(state.profile));
  localStorage.setItem(LS_ACT, JSON.stringify(state.actionStatus));
}

/* ===== NAVIGATION ===== */
function showPage(name) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.add('hidden'); });
  document.getElementById('page-' + name).classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(function(l) {
    l.classList.toggle('active', l.dataset.page === name);
  });
  document.getElementById('mobile-nav').classList.add('hidden');
  document.getElementById('menu-icon-open').style.display = '';
  document.getElementById('menu-icon-close').style.display = 'none';
  window.scrollTo(0, 0);

  if (name === 'accueil') renderAccueil();
  if (name === 'diagnostic') renderDiagnostic();
  if (name === 'resultats') renderResults();
  if (name === 'actions') renderActions();
  if (name === 'urgence') renderUrgence();
}

function toggleMenu() {
  var mob = document.getElementById('mobile-nav');
  var isOpen = mob.classList.contains('hidden');
  mob.classList.toggle('hidden', !isOpen);
  document.getElementById('menu-icon-open').style.display = isOpen ? 'none' : '';
  document.getElementById('menu-icon-close').style.display = isOpen ? '' : 'none';
}

/* ===== ACCUEIL ===== */
function renderAccueil() {
  document.getElementById('profile-name').value = state.profile.name;
  document.getElementById('profile-location').value = state.profile.location;
  document.getElementById('profile-sector').value = state.profile.sector;
  document.getElementById('profile-size').value = state.profile.size;

  var hasDiag = Object.keys(state.answers).length > 0;
  document.getElementById('existing-banner').classList.toggle('hidden', !hasDiag);

  var grid = document.getElementById('profile-types');
  grid.innerHTML = PROFILE_TYPES.map(function(pt) {
    return '<button class="profile-card' + (state.profile.profileType === pt.id ? ' selected' : '') + '" data-profile="' + pt.id + '">' +
      '<span class="pc-icon">' + icon(pt.icon) + '</span>' +
      '<p class="pc-label">' + pt.label + '</p>' +
      '<p class="pc-desc">' + pt.description + '</p>' +
    '</button>';
  }).join('');

  grid.querySelectorAll('.profile-card').forEach(function(btn) {
    btn.addEventListener('click', function() {
      state.profile.profileType = btn.dataset.profile;
      saveState();
      renderAccueil();
    });
  });
  updateStartButton();
}

function updateStartButton() {
  var btn = document.getElementById('btn-start');
  var hint = document.getElementById('start-hint');
  var ready = state.profile.profileType !== '';
  btn.disabled = !ready;
  hint.style.display = ready ? 'none' : '';
}

function saveProfile() {
  state.profile.name = document.getElementById('profile-name').value;
  state.profile.location = document.getElementById('profile-location').value;
  state.profile.sector = document.getElementById('profile-sector').value;
  state.profile.size = document.getElementById('profile-size').value;
  saveState();
}

function startDiagnostic() {
  saveProfile();
  showPage('diagnostic');
}

function resetAll() {
  state.answers = {};
  state.currentStep = 0;
  state.completed = false;
  state.actionStatus = {};
  state.profile = { name: '', location: '', sector: '', size: '', profileType: '' };
  localStorage.removeItem(LS_DIAG);
  localStorage.removeItem(LS_PROF);
  localStorage.removeItem(LS_ACT);
  renderAccueil();
}

/* ===== DIAGNOSTIC ===== */
function renderDiagnostic() {
  var cats = GUIDE_DATA.diagnostic.categories;
  var cat = cats[state.currentStep];
  var pct = Math.round(((state.currentStep + 1) / cats.length) * 100);

  document.getElementById('progress-step').textContent = 'Étape ' + (state.currentStep + 1) + ' sur ' + cats.length;
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';

  document.getElementById('progress-category-labels').innerHTML = cats.map(function(c, i) {
    return '<span class="' + (i <= state.currentStep ? 'active' : '') + '">' + c.label.split(' ')[0] + '</span>';
  }).join('');

  document.getElementById('category-header').innerHTML =
    '<div class="cat-icon">' + icon(cat.icon) + '</div>' +
    '<h2>' + cat.label + '</h2>';

  var container = document.getElementById('questions-container');
  container.innerHTML = cat.questions.map(function(q, i) {
    return '<div class="question-card">' +
      '<span class="q-number">' + (i + 1) + '</span>' +
      '<div class="q-content">' +
        '<p class="q-text">' + q.text + '</p>' +
        '<div class="q-answers">' +
          '<button class="answer-btn' + (state.answers[q.id] === 'oui' ? ' selected-oui' : '') + '" onclick="setAnswer(\'' + q.id + '\',\'oui\')">Oui</button>' +
          '<button class="answer-btn' + (state.answers[q.id] === 'non' ? ' selected-non' : '') + '" onclick="setAnswer(\'' + q.id + '\',\'non\')">Non</button>' +
          '<button class="answer-btn' + (state.answers[q.id] === 'ne_sais_pas' ? ' selected-nsp' : '') + '" onclick="setAnswer(\'' + q.id + '\',\'ne_sais_pas\')">Ne sais pas</button>' +
        '</div>' +
        '<button class="why-toggle" onclick="toggleWhy(\'' + q.id + '\')">' +
          icon('help-circle') + ' Pourquoi c\'est important' +
        '</button>' +
        '<div class="why-box hidden" id="why-' + q.id + '">' + q.why + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  document.getElementById('btn-prev').disabled = state.currentStep === 0;
  updateNextButton();
}

function setAnswer(qId, value) {
  state.answers[qId] = value;
  saveState();
  renderDiagnostic();
}

function toggleWhy(qId) {
  document.getElementById('why-' + qId).classList.toggle('hidden');
}

function updateNextButton() {
  var cat = GUIDE_DATA.diagnostic.categories[state.currentStep];
  var allAnswered = cat.questions.every(function(q) { return state.answers[q.id]; });
  var btn = document.getElementById('btn-next');
  btn.disabled = !allAnswered;
  var isLast = state.currentStep === GUIDE_DATA.diagnostic.categories.length - 1;
  btn.innerHTML = isLast ? 'Voir les résultats &#x2714;' : 'Suivant &#x2192;';
}

function nextStep() {
  var cats = GUIDE_DATA.diagnostic.categories;
  if (state.currentStep === cats.length - 1) {
    state.completed = true;
    saveState();
    showPage('resultats');
  } else {
    state.currentStep++;
    saveState();
    renderDiagnostic();
    window.scrollTo(0, 0);
  }
}

function prevStep() {
  if (state.currentStep > 0) {
    state.currentStep--;
    saveState();
    renderDiagnostic();
    window.scrollTo(0, 0);
  }
}

/* ===== SCORING ===== */
function getRiskLevel(pct) {
  if (pct >= 67) return 'faible';
  if (pct >= 40) return 'modere';
  return 'eleve';
}

function getRiskConfig(level) {
  var configs = {
    faible: { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', label: GUIDE_DATA.diagnostic.scoring.majorite_oui.label, message: GUIDE_DATA.diagnostic.scoring.majorite_oui.message },
    modere: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', label: GUIDE_DATA.diagnostic.scoring.mixte.label, message: GUIDE_DATA.diagnostic.scoring.mixte.message },
    eleve:  { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', label: GUIDE_DATA.diagnostic.scoring.majorite_non.label, message: GUIDE_DATA.diagnostic.scoring.majorite_non.message }
  };
  return configs[level];
}

function calculateScores() {
  var cats = GUIDE_DATA.diagnostic.categories;
  var totalQ = cats.reduce(function(s, c) { return s + c.questions.length; }, 0);
  var totalOui = Object.values(state.answers).filter(function(a) { return a === 'oui'; }).length;
  var pct = totalQ > 0 ? Math.round((totalOui / totalQ) * 100) : 0;
  var level = getRiskLevel(pct);

  var catScores = cats.map(function(cat) {
    var tot = cat.questions.length;
    var oui = cat.questions.filter(function(q) { return state.answers[q.id] === 'oui'; }).length;
    var p = tot > 0 ? Math.round((oui / tot) * 100) : 0;
    return { id: cat.id, label: cat.label, icon: cat.icon, score: oui, total: tot, pct: p, level: getRiskLevel(p) };
  });

  return { score: totalOui, total: totalQ, pct: pct, level: level, catScores: catScores };
}

/* ===== RESULTS ===== */
function renderResults() {
  var container = document.getElementById('results-content');
  if (Object.keys(state.answers).length === 0) {
    container.innerHTML = '<div class="card text-center" style="padding:3rem"><h2 style="color:var(--gray-700)">Aucun diagnostic réalisé</h2><p class="text-muted" style="margin:1rem 0">Veuillez d\'abord compléter le diagnostic.</p><button class="btn btn-primary" onclick="showPage(\'diagnostic\')">Commencer le diagnostic</button></div>';
    return;
  }

  var s = calculateScores();
  var cfg = getRiskConfig(s.level);
  var circ = 2 * Math.PI * 54;
  var offset = circ - (s.pct / 100) * circ;

  var html = '<div class="card text-center">' +
    '<span class="risk-badge" style="background:' + cfg.bg + ';color:' + cfg.color + ';border:1px solid ' + cfg.border + '">' + cfg.label + '</span>' +
    '<div class="gauge-wrap">' +
      '<div style="position:relative;display:inline-block">' +
        '<svg width="160" height="160" viewBox="0 0 120 120" style="transform:rotate(-90deg)">' +
          '<circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" stroke-width="8"/>' +
          '<circle cx="60" cy="60" r="54" fill="none" stroke="' + cfg.color + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '" style="transition:stroke-dashoffset 1s"/>' +
        '</svg>' +
        '<div style="position:absolute;top:0;left:0;width:160px;height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center">' +
          '<span class="gauge-center" style="color:' + cfg.color + '">' + s.score + '/' + s.total + '</span>' +
          '<span style="font-size:0.75rem;color:var(--gray-400)">réponses positives</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<p class="text-muted" style="max-width:32rem;margin:1rem auto 0">' + cfg.message + '</p>' +
  '</div>';

  // Category scores
  html += '<div class="card"><h2>Score par catégorie</h2>';
  s.catScores.forEach(function(cs) {
    var cc = getRiskConfig(cs.level);
    html += '<div class="cat-score-row">' +
      '<div class="cat-score-icon">' + icon(cs.icon) + '</div>' +
      '<div class="cat-score-info">' +
        '<div class="cat-score-header"><span class="cat-score-name">' + cs.label + '</span><span class="cat-score-val" style="color:' + cc.color + '">' + cs.score + '/' + cs.total + '</span></div>' +
        '<div class="cat-bar"><div class="cat-bar-fill" style="width:' + cs.pct + '%;background:' + cc.color + '"></div></div>' +
      '</div></div>';
  });
  html += '</div>';

  // Vigilance
  html += '<div class="card"><h2>Points de vigilance</h2>';
  var qMap = {};
  GUIDE_DATA.diagnostic.categories.forEach(function(c) { c.questions.forEach(function(q) { qMap[q.id] = q.text; }); });
  var hasVigilance = false;
  Object.entries(state.answers).forEach(function(entry) {
    var qId = entry[0], v = entry[1];
    if (v === 'non' || v === 'ne_sais_pas') {
      hasVigilance = true;
      html += '<div class="vigilance-item"><span class="vigilance-dot" style="background:' + (v === 'non' ? 'var(--danger)' : 'var(--accent-orange)') + '">' + (v === 'non' ? '!' : '?') + '</span><span style="color:var(--gray-600)">' + (qMap[qId] || qId) + '</span></div>';
    }
  });
  if (!hasVigilance) html += '<p class="text-muted">Aucun point de vigilance.</p>';
  html += '</div>';

  container.innerHTML = html;
}

/* ===== ACTIONS ===== */
function renderActions() {
  var container = document.getElementById('actions-content');
  if (Object.keys(state.answers).length === 0) {
    container.innerHTML = '<div class="card text-center" style="padding:3rem"><h2 style="color:var(--gray-700)">Aucun diagnostic réalisé</h2><p class="text-muted" style="margin:1rem 0">Veuillez d\'abord compléter le diagnostic.</p><button class="btn btn-primary" onclick="showPage(\'diagnostic\')">Commencer le diagnostic</button></div>';
    return;
  }

  var questionActions = [];
  GUIDE_DATA.diagnostic.categories.forEach(function(cat) {
    cat.questions.forEach(function(q) {
      var ans = state.answers[q.id];
      if (ans === 'non' || ans === 'ne_sais_pas') {
        var actions = (GUIDE_DATA.plan_actions.par_question[q.id] || {}).non || [];
        if (actions.length) questionActions.push({ question: q, catId: cat.id, catLabel: cat.label, catIcon: cat.icon, actions: actions });
      }
    });
  });

  var selectedProfile = GUIDE_DATA.plan_actions.par_profil.find(function(p) { return p.id === state.profile.profileType; });

  var totalActions = questionActions.reduce(function(s, qa) { return s + qa.actions.length; }, 0);
  if (selectedProfile) totalActions += selectedProfile.prevention.length + selectedProfile.continuite.length;
  var completedActions = Object.values(state.actionStatus).filter(Boolean).length;
  var progressPct = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  var html = '<div class="card"><div class="actions-progress-header"><span>Progression</span><span>' + completedActions + '/' + totalActions + ' — ' + progressPct + '%</span></div><div class="actions-bar"><div class="actions-bar-fill" style="width:' + progressPct + '%"></div></div></div>';

  if (selectedProfile) {
    html += '<div class="card"><h2>Recommandations pour votre profil</h2><p class="text-muted text-sm" style="margin-bottom:1rem">' + selectedProfile.label + '</p>';
    html += '<div class="section-label"><span style="color:var(--primary)">&#x1F6E1;&#xFE0F; Prévention</span></div>';
    selectedProfile.prevention.forEach(function(a, i) { html += actionItem('profile_' + selectedProfile.id + '_prev_' + i, a); });
    html += '<div class="section-label" style="margin-top:1.25rem"><span style="color:var(--accent-orange)">&#x1F504; Continuité d\'activité</span></div>';
    selectedProfile.continuite.forEach(function(a, i) { html += actionItem('profile_' + selectedProfile.id + '_cont_' + i, a); });
    html += '</div>';
  }

  if (questionActions.length > 0) {
    html += '<div class="card"><h2>Actions par point de vigilance</h2>';
    questionActions.forEach(function(qa) {
      html += '<div class="question-actions-block">' +
        '<div class="question-actions-cat">' + icon(qa.catIcon, 14) + ' ' + qa.catLabel + '</div>' +
        '<p class="question-actions-text">' + qa.question.text + '</p>';
      qa.actions.forEach(function(a, i) { html += actionItem('q_' + qa.question.id + '_' + i, a); });
      html += '</div>';
    });
    html += '</div>';
  } else {
    html += '<div class="all-green">Toutes les réponses sont positives. Continuez à maintenir vos dispositifs de prévention !</div>';
  }

  // Leviers
  html += '<div class="card"><div class="section-label"><span style="color:var(--primary)">&#x1F4A1; Arguments clés</span></div><div class="levier-grid">';
  GUIDE_DATA.leviers_discours.forEach(function(l) {
    html += '<div class="levier-card"><p class="lev-title">' + l.label + '</p><p class="lev-arg">' + l.argument + '</p></div>';
  });
  html += '</div></div>';

  container.innerHTML = html;
  container.querySelectorAll('.action-item').forEach(function(el) {
    el.addEventListener('click', function() {
      state.actionStatus[el.dataset.key] = !state.actionStatus[el.dataset.key];
      saveState();
      renderActions();
    });
  });
}

function actionItem(key, text) {
  var done = !!state.actionStatus[key];
  return '<div class="action-item' + (done ? ' done' : '') + '" data-key="' + key + '">' +
    '<div class="action-check">' + (done ? icon('check') : '') + '</div>' +
    '<span class="action-text">' + text + '</span>' +
  '</div>';
}

/* ===== URGENCE ===== */
function renderUrgence() {
  var container = document.getElementById('urgence-content');
  var perils = Object.values(GUIDE_DATA.urgence);
  container.innerHTML = perils.map(function(p) {
    return '<div class="urgence-card peril-' + p.icon + '">' +
      '<div class="urgence-card-header">' +
        '<div class="urgence-icon">' + icon(p.icon) + '</div>' +
        '<h2>' + p.label + '</h2>' +
      '</div>' +
      '<div class="urgence-grid">' +
        '<div class="urgence-section">' +
          '<div class="urgence-section-title">' + icon('calendar') + ' Quelques jours avant</div>' +
          '<ul class="urgence-list">' + p.jours_avant.map(function(a) { return '<li>' + a + '</li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="urgence-section">' +
          '<div class="urgence-section-title">' + icon('clock') + ' Quelques heures avant</div>' +
          '<ul class="urgence-list">' + p.heures_avant.map(function(a) { return '<li>' + a + '</li>'; }).join('') + '</ul>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ===== PDF EXPORT ===== */
function exportPdf(elementId, filename) {
  var el = document.getElementById(elementId);
  if (!el) return;
  if (typeof html2pdf === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = function() { doExport(el, filename); };
    script.onerror = function() { alert('Export PDF nécessite une connexion internet. Vous pouvez utiliser Ctrl+P pour imprimer en PDF.'); };
    document.head.appendChild(script);
  } else {
    doExport(el, filename);
  }
}

function doExport(el, filename) {
  html2pdf().set({
    margin: 10,
    filename: filename + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(el).save();
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', function() {
  loadState();
  renderAccueil();

  ['profile-name','profile-location','profile-sector','profile-size'].forEach(function(id) {
    var el = document.getElementById(id);
    el.addEventListener('change', saveProfile);
    el.addEventListener('input', saveProfile);
  });
});
