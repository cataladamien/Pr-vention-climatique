/* ===== STATE ===== */
const LS_DIAG = 'prevention_climat_diagnostic';
const LS_PROF = 'prevention_climat_profile';
const LS_ACT  = 'prevention_climat_actions';

let state = {
  answers: {},       // { q1: 'oui', q2: 'non', ... }
  currentStep: 0,
  completed: false,
  profile: { name: '', location: '', sector: '', size: '', profileType: '' },
  actionStatus: {}   // { key: true/false }
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
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page-' + name).classList.remove('hidden');
  // update nav
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === name);
  });
  // close mobile menu
  document.getElementById('mobile-nav').classList.add('hidden');
  document.getElementById('menu-icon-open').style.display = '';
  document.getElementById('menu-icon-close').style.display = 'none';
  window.scrollTo(0, 0);

  if (name === 'diagnostic') renderDiagnostic();
  if (name === 'resultats') renderResults();
  if (name === 'actions') renderActions();
  if (name === 'urgence') renderUrgence();
  if (name === 'accueil') renderAccueil();
}

function toggleMenu() {
  const mob = document.getElementById('mobile-nav');
  const open = mob.classList.contains('hidden');
  mob.classList.toggle('hidden', !open);
  document.getElementById('menu-icon-open').style.display = open ? 'none' : '';
  document.getElementById('menu-icon-close').style.display = open ? '' : 'none';
}

/* ===== ACCUEIL ===== */
function renderAccueil() {
  // restore profile fields
  document.getElementById('profile-name').value = state.profile.name;
  document.getElementById('profile-location').value = state.profile.location;
  document.getElementById('profile-sector').value = state.profile.sector;
  document.getElementById('profile-size').value = state.profile.size;

  // show existing banner?
  const hasDiag = Object.keys(state.answers).length > 0;
  document.getElementById('existing-banner').classList.toggle('hidden', !hasDiag);

  // render profile type cards
  const grid = document.getElementById('profile-types');
  grid.innerHTML = PROFILE_TYPES.map(pt => `
    <button class="profile-card${state.profile.profileType === pt.id ? ' selected' : ''}" data-profile="${pt.id}">
      <i data-lucide="${pt.icon}"></i>
      <p class="pc-label">${pt.label}</p>
      <p class="pc-desc">${pt.description}</p>
    </button>
  `).join('');
  grid.querySelectorAll('.profile-card').forEach(btn => {
    btn.addEventListener('click', () => {
      state.profile.profileType = btn.dataset.profile;
      saveState();
      renderAccueil();
      updateStartButton();
    });
  });
  updateStartButton();
  lucide.createIcons();
}

function updateStartButton() {
  const btn = document.getElementById('btn-start');
  const hint = document.getElementById('start-hint');
  const ready = state.profile.profileType !== '';
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
  const cats = GUIDE_DATA.diagnostic.categories;
  const cat = cats[state.currentStep];
  const pct = Math.round(((state.currentStep + 1) / cats.length) * 100);

  // progress
  document.getElementById('progress-step').textContent = `Étape ${state.currentStep + 1} sur ${cats.length}`;
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';

  // category labels
  const labelsDiv = document.getElementById('progress-category-labels');
  labelsDiv.innerHTML = cats.map((c, i) =>
    `<span class="${i <= state.currentStep ? 'active' : ''}">${c.label.split(' ')[0]}</span>`
  ).join('');

  // category header
  document.getElementById('category-header').innerHTML = `
    <div class="cat-icon"><i data-lucide="${cat.icon}"></i></div>
    <h2>${cat.label}</h2>
  `;

  // questions
  const container = document.getElementById('questions-container');
  container.innerHTML = cat.questions.map((q, i) => `
    <div class="question-card" id="qcard-${q.id}">
      <span class="q-number">${i + 1}</span>
      <div class="q-content">
        <p class="q-text">${q.text}</p>
        <div class="q-answers">
          <button class="answer-btn${state.answers[q.id] === 'oui' ? ' selected-oui' : ''}" onclick="setAnswer('${q.id}','oui')">Oui</button>
          <button class="answer-btn${state.answers[q.id] === 'non' ? ' selected-non' : ''}" onclick="setAnswer('${q.id}','non')">Non</button>
          <button class="answer-btn${state.answers[q.id] === 'ne_sais_pas' ? ' selected-nsp' : ''}" onclick="setAnswer('${q.id}','ne_sais_pas')">Ne sais pas</button>
        </div>
        <button class="why-toggle" onclick="toggleWhy('${q.id}')">
          <i data-lucide="help-circle"></i>
          Pourquoi c'est important
          <i data-lucide="chevron-down" id="why-chevron-${q.id}"></i>
        </button>
        <div class="why-box hidden" id="why-${q.id}">${q.why}</div>
      </div>
    </div>
  `).join('');

  // prev/next
  document.getElementById('btn-prev').disabled = state.currentStep === 0;
  updateNextButton();
  lucide.createIcons();
}

function setAnswer(qId, value) {
  state.answers[qId] = value;
  saveState();
  renderDiagnostic();
}

function toggleWhy(qId) {
  const box = document.getElementById('why-' + qId);
  box.classList.toggle('hidden');
}

function updateNextButton() {
  const cat = GUIDE_DATA.diagnostic.categories[state.currentStep];
  const allAnswered = cat.questions.every(q => state.answers[q.id]);
  const btn = document.getElementById('btn-next');
  btn.disabled = !allAnswered;
  const isLast = state.currentStep === GUIDE_DATA.diagnostic.categories.length - 1;
  btn.innerHTML = isLast
    ? 'Voir les résultats <i data-lucide="check-circle"></i>'
    : 'Suivant <i data-lucide="arrow-right"></i>';
  lucide.createIcons();
}

function nextStep() {
  const cats = GUIDE_DATA.diagnostic.categories;
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
  const configs = {
    faible: { color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', label: GUIDE_DATA.diagnostic.scoring.majorite_oui.label, message: GUIDE_DATA.diagnostic.scoring.majorite_oui.message },
    modere: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', label: GUIDE_DATA.diagnostic.scoring.mixte.label, message: GUIDE_DATA.diagnostic.scoring.mixte.message },
    eleve:  { color: '#ef4444', bg: '#fef2f2', border: '#fecaca', label: GUIDE_DATA.diagnostic.scoring.majorite_non.label, message: GUIDE_DATA.diagnostic.scoring.majorite_non.message }
  };
  return configs[level];
}

function calculateScores() {
  const cats = GUIDE_DATA.diagnostic.categories;
  const totalQ = cats.reduce((s, c) => s + c.questions.length, 0);
  const totalOui = Object.values(state.answers).filter(a => a === 'oui').length;
  const pct = totalQ > 0 ? Math.round((totalOui / totalQ) * 100) : 0;
  const level = getRiskLevel(pct);

  const catScores = cats.map(cat => {
    const tot = cat.questions.length;
    const oui = cat.questions.filter(q => state.answers[q.id] === 'oui').length;
    const p = tot > 0 ? Math.round((oui / tot) * 100) : 0;
    return { id: cat.id, label: cat.label, icon: cat.icon, score: oui, total: tot, pct: p, level: getRiskLevel(p) };
  });

  return { score: totalOui, total: totalQ, pct, level, catScores };
}

/* ===== RESULTS ===== */
function renderResults() {
  const container = document.getElementById('results-content');
  if (Object.keys(state.answers).length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding:4rem 0">
        <i data-lucide="alert-triangle" style="width:48px;height:48px;color:var(--accent-orange);margin-bottom:1rem"></i>
        <h2 style="color:var(--gray-700);margin-bottom:0.5rem">Aucun diagnostic réalisé</h2>
        <p class="text-muted" style="margin-bottom:1.5rem">Veuillez d'abord compléter le diagnostic.</p>
        <button class="btn btn-primary" onclick="showPage('diagnostic')">Commencer le diagnostic</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  const s = calculateScores();
  const cfg = getRiskConfig(s.level);
  const circ = 2 * Math.PI * 54;
  const offset = circ - (s.pct / 100) * circ;

  let html = `
    <!-- Global score -->
    <div class="card text-center">
      <span class="risk-badge" style="background:${cfg.bg};color:${cfg.color};border:1px solid ${cfg.border}">${cfg.label}</span>
      <div class="gauge-wrap">
        <svg class="gauge-svg" viewBox="0 0 120 120" style="transform:rotate(-90deg)">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" stroke-width="8"/>
          <circle cx="60" cy="60" r="54" fill="none" stroke="${cfg.color}" stroke-width="8" stroke-linecap="round"
            stroke-dasharray="${circ}" stroke-dashoffset="${offset}" style="transition:stroke-dashoffset 1s"/>
        </svg>
        <div style="position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;width:160px;height:160px;margin-top:-160px">
          <span class="gauge-center" style="color:${cfg.color}">${s.score}/${s.total}</span>
          <span style="font-size:0.75rem;color:var(--gray-400)">réponses positives</span>
        </div>
      </div>
      <p class="text-muted" style="max-width:32rem;margin:0 auto">${cfg.message}</p>
    </div>

    <!-- Category scores -->
    <div class="card">
      <h2>Score par catégorie</h2>
      ${s.catScores.map(cs => {
        const cc = getRiskConfig(cs.level);
        return `
          <div class="cat-score-row">
            <div class="cat-score-icon"><i data-lucide="${cs.icon}"></i></div>
            <div class="cat-score-info">
              <div class="cat-score-header">
                <span class="cat-score-name">${cs.label}</span>
                <span class="cat-score-val" style="color:${cc.color}">${cs.score}/${cs.total}</span>
              </div>
              <div class="cat-bar"><div class="cat-bar-fill" style="width:${cs.pct}%;background:${cc.color}"></div></div>
            </div>
          </div>`;
      }).join('')}
    </div>

    <!-- Vigilance points -->
    <div class="card">
      <h2>Points de vigilance</h2>
      ${getVigilanceItems()}
    </div>
  `;

  container.innerHTML = html;
  lucide.createIcons();
}

function getVigilanceItems() {
  const qMap = {};
  GUIDE_DATA.diagnostic.categories.forEach(c => c.questions.forEach(q => qMap[q.id] = q.text));

  const items = Object.entries(state.answers)
    .filter(([, v]) => v === 'non' || v === 'ne_sais_pas')
    .map(([qId, v]) => `
      <div class="vigilance-item">
        <span class="vigilance-dot" style="background:${v === 'non' ? 'var(--danger)' : 'var(--accent-orange)'}">
          ${v === 'non' ? '!' : '?'}
        </span>
        <span style="color:var(--gray-600)">${qMap[qId] || qId}</span>
      </div>
    `).join('');

  return items || '<p class="text-muted">Aucun point de vigilance.</p>';
}

/* ===== ACTIONS ===== */
function renderActions() {
  const container = document.getElementById('actions-content');

  if (Object.keys(state.answers).length === 0) {
    container.innerHTML = `
      <div class="text-center" style="padding:4rem 0">
        <i data-lucide="alert-triangle" style="width:48px;height:48px;color:var(--accent-orange);margin-bottom:1rem"></i>
        <h2 style="color:var(--gray-700);margin-bottom:0.5rem">Aucun diagnostic réalisé</h2>
        <p class="text-muted" style="margin-bottom:1.5rem">Veuillez d'abord compléter le diagnostic.</p>
        <button class="btn btn-primary" onclick="showPage('diagnostic')">Commencer le diagnostic</button>
      </div>`;
    lucide.createIcons();
    return;
  }

  // Collect all actions
  const questionActions = [];
  GUIDE_DATA.diagnostic.categories.forEach(cat => {
    cat.questions.forEach(q => {
      const ans = state.answers[q.id];
      if (ans === 'non' || ans === 'ne_sais_pas') {
        const actions = (GUIDE_DATA.plan_actions.par_question[q.id] || {}).non || [];
        if (actions.length) questionActions.push({ question: q, catId: cat.id, catLabel: cat.label, catIcon: cat.icon, actions });
      }
    });
  });

  const selectedProfile = GUIDE_DATA.plan_actions.par_profil.find(p => p.id === state.profile.profileType);

  // Count total actions
  let totalActions = questionActions.reduce((s, qa) => s + qa.actions.length, 0);
  if (selectedProfile) totalActions += selectedProfile.prevention.length + selectedProfile.continuite.length;
  const completedActions = Object.values(state.actionStatus).filter(Boolean).length;
  const progressPct = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  let html = `
    <!-- Progress -->
    <div class="card actions-progress">
      <div class="actions-progress-header">
        <span>Progression</span>
        <span>${completedActions}/${totalActions} — ${progressPct}%</span>
      </div>
      <div class="actions-bar"><div class="actions-bar-fill" style="width:${progressPct}%"></div></div>
    </div>
  `;

  // Profile actions
  if (selectedProfile) {
    html += `
      <div class="card">
        <h2>Recommandations pour votre profil</h2>
        <p class="text-muted text-sm" style="margin-bottom:1rem">${selectedProfile.label}</p>
        <div class="section-label"><i data-lucide="shield-check" style="color:var(--primary)"></i><span style="color:var(--primary)">Prévention</span></div>
        ${selectedProfile.prevention.map((a, i) => actionItem(`profile_${selectedProfile.id}_prev_${i}`, a)).join('')}
        <div class="section-label" style="margin-top:1.25rem"><i data-lucide="refresh-cw" style="color:var(--accent-orange)"></i><span style="color:var(--accent-orange)">Continuité d'activité</span></div>
        ${selectedProfile.continuite.map((a, i) => actionItem(`profile_${selectedProfile.id}_cont_${i}`, a)).join('')}
      </div>
    `;
  }

  // Per-question actions
  if (questionActions.length > 0) {
    html += `<div class="card"><h2>Actions par point de vigilance</h2>`;
    questionActions.forEach(qa => {
      html += `
        <div class="question-actions-block">
          <div class="question-actions-cat"><i data-lucide="${qa.catIcon}"></i> ${qa.catLabel}</div>
          <p class="question-actions-text">${qa.question.text}</p>
          ${qa.actions.map((a, i) => actionItem(`q_${qa.question.id}_${i}`, a)).join('')}
        </div>
      `;
    });
    html += '</div>';
  } else {
    html += '<div class="all-green">Toutes les réponses sont positives. Continuez à maintenir vos dispositifs de prévention !</div>';
  }

  // Leviers
  html += `
    <div class="card">
      <div class="section-label"><i data-lucide="lightbulb" style="color:var(--accent-orange)"></i><span style="color:var(--primary)">Arguments clés</span></div>
      <div class="levier-grid">
        ${GUIDE_DATA.leviers_discours.map(l => `
          <div class="levier-card">
            <p class="lev-title">${l.label}</p>
            <p class="lev-arg">${l.argument}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.innerHTML = html;
  // bind action click events
  container.querySelectorAll('.action-item').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.key;
      state.actionStatus[key] = !state.actionStatus[key];
      saveState();
      renderActions();
    });
  });
  lucide.createIcons();
}

function actionItem(key, text) {
  const done = !!state.actionStatus[key];
  return `
    <div class="action-item${done ? ' done' : ''}" data-key="${key}">
      <div class="action-check">${done ? '<i data-lucide="check"></i>' : ''}</div>
      <span class="action-text">${text}</span>
    </div>
  `;
}

/* ===== URGENCE ===== */
function renderUrgence() {
  const container = document.getElementById('urgence-content');
  const perils = Object.values(GUIDE_DATA.urgence);

  container.innerHTML = perils.map(p => `
    <div class="urgence-card peril-${p.icon}">
      <div class="urgence-card-header">
        <div class="urgence-icon"><i data-lucide="${p.icon}"></i></div>
        <h2>${p.label}</h2>
      </div>
      <div class="urgence-grid">
        <div class="urgence-section">
          <div class="urgence-section-title"><i data-lucide="calendar"></i> Quelques jours avant</div>
          <ul class="urgence-list">${p.jours_avant.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        <div class="urgence-section">
          <div class="urgence-section-title"><i data-lucide="clock"></i> Quelques heures avant</div>
          <ul class="urgence-list">${p.heures_avant.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

/* ===== PDF EXPORT ===== */
function exportPdf(elementId, filename) {
  const el = document.getElementById(elementId);
  if (!el) return;
  html2pdf().set({
    margin: 10,
    filename: filename + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }).from(el).save();
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderAccueil();

  // save profile inputs on change
  ['profile-name','profile-location','profile-sector','profile-size'].forEach(id => {
    document.getElementById(id).addEventListener('change', saveProfile);
    document.getElementById(id).addEventListener('input', saveProfile);
  });
});
