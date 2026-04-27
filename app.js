/**
 * SharePoint folder links — server-relative path under the team site's document library.
 * Matches folder structure in /DIA Playbook Accelerator/ (upload that tree to this location).
 */
const SHAREPOINT_FORMS_URL =
  "https://pwc.sharepoint.com/teams/US-INT-ADVS-Enterprise-Application-Integration/Shared%20Documents/Forms/AllItems.aspx";

const SHAREPOINT_FOLDER_ROOT =
  "/teams/US-INT-ADVS-Enterprise-Application-Integration/Shared Documents/10. Large Scale Solution delivery/2. Delivery/Delivery Playbook/DIA Playbook Accelerator";

/** SharePoint “open in browser” URL for the draft deck (also set in deck-tables.js). */
const PLAYBOOK_DECK_URL_FALLBACK =
  "https://pwc.sharepoint.com/:p:/r/teams/US-INT-ADVS-Enterprise-Application-Integration/_layouts/15/Doc.aspx?sourcedoc=%7B5CBC36DA-055D-4FC9-AF36-433A8A8D0B38%7D&file=%5BDRAFT%5D%20DIA%20Delivery%20Playbook.pptx&action=edit&mobileredirect=true";

function playbookDeckBaseUrl() {
  return window.PLAYBOOK_DECK_URL || PLAYBOOK_DECK_URL_FALLBACK;
}

/** PowerPoint for the web: wdSlideIndex is 0-based (slide 1 → 0). */
function playbookSlideUrl(slideNumber1Based) {
  const base = playbookDeckBaseUrl();
  const n = Number(slideNumber1Based);
  if (!n || n < 1) return base;
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}wdSlideIndex=${n - 1}`;
}

function escapeAttributeUrl(url) {
  return String(url).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function linkifyPlainSlideRefs(text) {
  const u = (n) => escapeAttributeUrl(playbookSlideUrl(n));
  return text
    .replace(
      /\bSlides (\d+)\s*[–-]\s*(\d+)\b/gi,
      (_, a, b) =>
        `Slides <a class="deck-slide-link" href="${u(a)}" target="_blank" rel="noopener noreferrer">${a}</a>–<a class="deck-slide-link" href="${u(b)}" target="_blank" rel="noopener noreferrer">${b}</a>`
    )
    .replace(
      /\bSlide (\d+)\b/gi,
      (_, n) =>
        `<a class="deck-slide-link" href="${u(n)}" target="_blank" rel="noopener noreferrer">Slide ${n}</a>`
    );
}

/** Turn “Slide N” / “Slides A–B” in HTML text into links; skip text inside <a>…</a>. */
function linkifyDeckSlides(html) {
  const tagRe = /(<[^>]+>)/g;
  let out = "";
  let depthA = 0;
  let lastIndex = 0;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const chunk = html.slice(lastIndex, m.index);
    out += depthA > 0 ? chunk : linkifyPlainSlideRefs(chunk);
    const tag = m[1];
    if (/^<a\b/i.test(tag)) depthA += 1;
    if (/^<\/a\s*>/i.test(tag)) depthA = Math.max(0, depthA - 1);
    out += tag;
    lastIndex = m.index + tag.length;
  }
  const tail = html.slice(lastIndex);
  out += depthA > 0 ? tail : linkifyPlainSlideRefs(tail);
  return out;
}

/** Build AllItems.aspx?id=… link so subfolders open correctly in the browser. */
function repoUrl(relativePath) {
  const fullPath = `${SHAREPOINT_FOLDER_ROOT}/${relativePath}`.replace(
    /\/+/g,
    "/"
  );
  const segments = fullPath.split("/").filter(Boolean);
  const idParam = "%2F" + segments.map(encodeURIComponent).join("%2F");
  return `${SHAREPOINT_FORMS_URL}?id=${idParam}&csf=1&web=1`;
}

function getBodies() {
  const B = window.DIA_PLAYBOOK_BODIES || {};
  return {
    intro: B.intro || "<p>Content loading… ensure bodies.js is loaded before app.js.</p>",
    operatingModel: B.operatingModel || "",
    mobilization: B.mobilization || "",
    agile: B.agile || "",
    testing: B.testing || "",
    release: B.release || "",
    businessReadiness: B.businessReadiness || "",
    golive: B.golive || "",
    hypercare: B.hypercare || "",
    reporting: B.reporting || "",
    tooling: B.tooling || "",
    appendix: B.appendix || "",
  };
}

const sections = [
  {
    id: "intro",
    num: 1,
    title: "Playbook Introduction & Purpose",
    short:
      "Defines what this playbook is, contents, and purpose.",
    repo: null,
    get body() {
      return getBodies().intro;
    },
  },
  {
    id: "operating-model",
    num: 2,
    title: "Integration Delivery Operating Model",
    short:
      "Describes who executes the work and their core responsibilities.",
    repo: {
      label: "Sample RACI and role deep-dives",
      links: [
        { text: "Open RACI & governance samples", path: "01-Operating-Model/RACI-and-Governance" },
      ],
    },
    get body() {
      return getBodies().operatingModel;
    },
  },
  {
    id: "mobilization",
    num: 3,
    title: "Mobilization & Readiness",
    short:
      "Covers what must be in place before execution begins.",
    repo: {
      label: "Mobilization checklists, calendar templates, RAID setup",
      links: [
        { text: "PMO & governance templates", path: "02-Mobilization/PMO-Governance" },
        { text: "Architecture & backlog readiness", path: "02-Mobilization/Architecture-Backlog" },
        { text: "Platform & environment readiness", path: "02-Mobilization/Platform-Environments" },
      ],
    },
    get body() {
      return getBodies().mobilization;
    },
  },
  {
    id: "agile",
    num: 4,
    title: "Integration Delivery & Agile Processes",
    short:
      "Explains how each integration workstream delivers during build, including cadence, ceremonies, and agile processes.",
    repo: {
      label: "Ceremony guides and automation references",
      links: [
        { text: "Ceremony cheat sheets", path: "03-Agile/Ceremonies" },
        { text: "Documentation & ALM pointers", path: "03-Agile/Tooling-Automation" },
      ],
    },
    get body() {
      return getBodies().agile;
    },
  },
  {
    id: "testing",
    num: 5,
    title: "Testing & Quality",
    short:
      "Defines the testing approach and quality standards.",
    repo: {
      label: "Test strategy samples, UAT materials, defect templates",
      links: [
        { text: "Integrated test planning", path: "04-Testing/Integrated-Test-Plan" },
        { text: "UAT entry/exit and scenarios", path: "04-Testing/UAT" },
        { text: "Test types reference (unit → migration)", path: "04-Testing/Test-Types" },
      ],
    },
    get body() {
      return getBodies().testing;
    },
  },
  {
    id: "release",
    num: 6,
    title: "Release Management",
    short:
      "Describes how integration releases are planned and prepared.",
    repo: {
      label: "Release manifest templates and cadence models",
      links: [
        { text: "Release manifest & plan", path: "05-Release/Manifest-and-Plan" },
        { text: "Definition of done / release criteria", path: "05-Release/Release-DoD" },
        { text: "Packaging, versioning, cadence", path: "05-Release/Packaging-Cadence" },
      ],
    },
    get body() {
      return getBodies().release;
    },
  },
  {
    id: "business-readiness",
    num: 7,
    title: "Business Readiness",
    short:
      "Ensures business teams are prepared to adopt and operate the solution.",
    repo: {
      label: "Change, training, and communications samples",
      links: [
        { text: "Business readiness workstreams", path: "06-Business-Readiness/Workstreams" },
        { text: "Training & enablement", path: "06-Business-Readiness/Training" },
        { text: "Change management activities", path: "06-Business-Readiness/Change-Management" },
      ],
    },
    get body() {
      return getBodies().businessReadiness;
    },
  },
  {
    id: "golive",
    num: 8,
    title: "Go Live Checklist",
    short: "Go Live Checklist",
    repo: {
      label: "Go / no-go checklist and decision templates",
      links: [
        { text: "Go-Live checklist pack", path: "07-Go-Live/Checklist" },
        { text: "Go / No-Go meeting materials", path: "07-Go-Live/Go-No-Go" },
      ],
    },
    get body() {
      return getBodies().golive;
    },
  },
  {
    id: "hypercare",
    num: 9,
    title: "Hypercare",
    short: "Hypercare",
    repo: {
      label: "Hypercare logistics, rosters, defect triage",
      links: [
        { text: "Hypercare sample checklist", path: "08-Hypercare/Checklist" },
        { text: "Defect management during hypercare", path: "08-Hypercare/Defects" },
      ],
    },
    get body() {
      return getBodies().hypercare;
    },
  },
  {
    id: "reporting",
    num: 10,
    title: "Reporting & Metrics",
    short:
      "Covers how delivery progress and quality are measured.",
    repo: {
      label: "KPI dictionaries and report templates",
      links: [
        { text: "Integration KPIs", path: "09-Reporting/Integration-KPIs" },
        { text: "Workstream & program reporting", path: "09-Reporting/Program-Reporting" },
        { text: "Platform health & governance metrics", path: "09-Reporting/Platform-Governance" },
      ],
    },
    get body() {
      return getBodies().reporting;
    },
  },
  {
    id: "tooling",
    num: 11,
    title: "Tooling & Templates",
    short:
      "Lists tools and templates used to support execution.",
    repo: {
      label: "Primary template library (ALM, wiki, pipelines)",
      links: [
        { text: "Master template index", path: "10-Tooling-Templates/All-Templates" },
        { text: "ALM & lifecycle tools overview", path: "10-Tooling-Templates/Tools" },
      ],
    },
    get body() {
      return getBodies().tooling;
    },
  },
  {
    id: "appendix",
    num: 12,
    title: "Appendix",
    short:
      "Provides supporting references and optional materials.",
    repo: {
      label: "Deep cuts: testing cycles, ceremonies, role libraries",
      links: [
        { text: "Testing cycle definitions", path: "11-Appendix/Testing-Cycles" },
        { text: "Program ceremonies (extended)", path: "11-Appendix/Ceremonies" },
        { text: "Role & RACI reference slides", path: "11-Appendix/Roles-RACI" },
      ],
    },
    get body() {
      return getBodies().appendix;
    },
  },
];

const LEARNING_TRACKS = [
  {
    id: "all",
    label: "Full Playbook",
    shortLabel: "Full",
    description: "A complete path through every DIA delivery topic.",
  },
  {
    id: "pm",
    label: "PM / Delivery Lead",
    shortLabel: "PM",
    description: "Governance, mobilization, cadence, reporting, and go-live control.",
  },
  {
    id: "architecture",
    label: "Architecture",
    shortLabel: "Architecture",
    description: "Operating model, technical readiness, design governance, and standards.",
  },
  {
    id: "delivery",
    label: "Delivery Team",
    shortLabel: "Delivery",
    description: "Build cadence, quality practices, release prep, and delivery tooling.",
  },
  {
    id: "qa",
    label: "QA / Testing",
    shortLabel: "QA",
    description: "Testing strategy, UAT readiness, quality gates, and defect flow.",
  },
  {
    id: "release",
    label: "Release / Readiness",
    shortLabel: "Release",
    description: "Release planning, business readiness, go-live, and hypercare.",
  },
];

const SECTION_LMS_META = {
  intro: {
    duration: "8 min",
    tracks: ["pm", "architecture", "delivery", "qa", "release"],
  },
  "operating-model": {
    duration: "12 min",
    tracks: ["pm", "architecture", "delivery", "release"],
  },
  mobilization: {
    duration: "15 min",
    tracks: ["pm", "architecture", "delivery", "qa"],
  },
  agile: {
    duration: "14 min",
    tracks: ["pm", "delivery", "architecture"],
  },
  testing: {
    duration: "16 min",
    tracks: ["qa", "delivery", "release"],
  },
  release: {
    duration: "12 min",
    tracks: ["release", "pm", "delivery"],
  },
  "business-readiness": {
    duration: "10 min",
    tracks: ["release", "pm"],
  },
  golive: {
    duration: "10 min",
    tracks: ["release", "pm", "qa"],
  },
  hypercare: {
    duration: "9 min",
    tracks: ["release", "pm", "delivery"],
  },
  reporting: {
    duration: "8 min",
    tracks: ["pm", "release"],
  },
  tooling: {
    duration: "9 min",
    tracks: ["delivery", "architecture", "qa"],
  },
  appendix: {
    duration: "Optional",
    tracks: ["architecture", "delivery", "qa"],
  },
};

function sectionMeta(section) {
  return SECTION_LMS_META[section.id] || { duration: "10 min", tracks: [] };
}

function getTrackById(trackId) {
  return LEARNING_TRACKS.find((track) => track.id === trackId) || LEARNING_TRACKS[0];
}

function getActiveTrack() {
  return window.DIA_GAMIFY ? window.DIA_GAMIFY.getActiveTrack() : "all";
}

function getProgressState() {
  return window.DIA_GAMIFY
    ? window.DIA_GAMIFY.load()
    : {
        xp: 0,
        badges: [],
        quiz: {},
        openedSections: [],
        completedSections: [],
        activeTrack: "all",
      };
}

function sectionMatchesTrack(section, trackId) {
  if (trackId === "all") return true;
  return sectionMeta(section).tracks.includes(trackId);
}

function sectionsForTrack(trackId) {
  return sections.filter((section) => sectionMatchesTrack(section, trackId));
}

function sectionStatus(sectionId, state) {
  const st = state || getProgressState();
  const quiz = st.quiz && st.quiz[sectionId];
  const completed =
    Boolean(quiz && quiz.passed) ||
    (Array.isArray(st.completedSections) && st.completedSections.includes(sectionId));
  const opened =
    completed ||
    (Array.isArray(st.openedSections) && st.openedSections.includes(sectionId));

  return {
    completed,
    opened,
    score: quiz && typeof quiz.score === "number" ? quiz.score : null,
    label: completed ? "Complete" : opened ? "In progress" : "Not started",
    className: completed ? "is-complete" : opened ? "is-progress" : "is-new",
  };
}

function progressForTrack(trackId, state) {
  const path = sectionsForTrack(trackId);
  const st = state || getProgressState();
  const completed = path.filter((section) => sectionStatus(section.id, st).completed).length;
  const opened = path.filter((section) => sectionStatus(section.id, st).opened).length;
  const total = path.length || 1;
  return {
    path,
    completed,
    opened,
    total,
    percent: Math.round((completed / total) * 100),
  };
}

function getSectionById(sectionId) {
  return sections.find((section) => section.id === sectionId) || null;
}

function nextSectionForTrack(trackId, state) {
  const st = state || getProgressState();
  return (
    sectionsForTrack(trackId).find((section) => !sectionStatus(section.id, st).completed) ||
    null
  );
}

function resumeSectionForTrack(trackId, state) {
  const st = state || getProgressState();
  const path = sectionsForTrack(trackId);
  const last = getSectionById(st.lastSection);
  if (last && path.some((section) => section.id === last.id)) {
    return last;
  }
  return nextSectionForTrack(trackId, st) || path[0] || sections[0];
}

function adjacentSections(sectionId) {
  const trackId = getActiveTrack();
  let path = sectionsForTrack(trackId);
  if (!path.some((section) => section.id === sectionId)) {
    path = sections;
  }
  const idx = path.findIndex((section) => section.id === sectionId);
  return {
    previous: idx > 0 ? path[idx - 1] : null,
    next: idx >= 0 && idx < path.length - 1 ? path[idx + 1] : null,
  };
}

function formatActivityDate(ts) {
  if (!ts) return "Not started";
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return "Recently";
  }
}

function renderRepo(repo) {
  if (!repo) return "";
  const linksHtml = repo.links
    .map(
      (l, i) =>
        `<a href="${repoUrl(l.path)}" target="_blank" rel="noopener noreferrer"${i > 0 ? ' class="secondary"' : ""}>${escapeHtml(l.text)}</a>`
    )
    .join("");
  return `
    <div class="file-repo">
      <h3>File repository</h3>
      <p>${escapeHtml(repo.label)} — opens the DIA Playbook Accelerator folders on SharePoint (see <code>app.js</code> for path constants).</p>
      <div class="file-repo__links">${linksHtml}</div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function deckTablesHtml(sectionId) {
  const map = window.DECK_TABLES_BY_SECTION;
  if (!map || !map[sectionId]) return "";
  const inner = map[sectionId];
  if (!String(inner).trim()) return "";
  const deckUrl = escapeAttributeUrl(playbookDeckBaseUrl());
  return `
    <section class="deck-tables-section" aria-label="Tables from the PowerPoint deck">
      <h3 class="deck-tables-section__title">Deck tables &amp; slide links</h3>
      <p class="deck-tables-section__lede">
        Tables below are <strong>live text</strong> extracted from table objects in the draft file.
        Each caption links to that slide in
        <a class="deck-slide-link" href="${deckUrl}" target="_blank" rel="noopener noreferrer">the SharePoint playbook</a>
        (numbered links use PowerPoint for the web; if a slide opens off by one, your tenant may use a different index—use <em>Link to this slide</em> in PowerPoint to copy an exact URL).
      </p>
      ${inner}
    </section>
  `;
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach((el) => {
    el.classList.toggle("is-active", el.id === `view-${viewId}`);
  });
  if (viewId === "home") {
    history.replaceState(null, "", `${location.pathname}${location.search}`);
  } else {
    history.replaceState(null, "", `#${viewId}`);
  }
  const main = document.getElementById("main-content");
  if (main) main.focus();
}

function buildDashboard() {
  const host = document.getElementById("learner-dashboard");
  if (!host) return;

  const st = getProgressState();
  const activeTrack = getActiveTrack();
  const track = getTrackById(activeTrack);
  const progress = progressForTrack(activeTrack, st);
  const resume = resumeSectionForTrack(activeTrack, st);
  const next = nextSectionForTrack(activeTrack, st);
  const primary = next || resume;
  const lastActivity = formatActivityDate(st.lastActivityAt);
  const trackButtons = LEARNING_TRACKS.map((item) => {
    const selected = item.id === activeTrack;
    return `
      <button type="button" class="path-toggle${selected ? " is-active" : ""}" data-track-id="${item.id}" aria-pressed="${selected}">
        ${escapeHtml(item.shortLabel)}
      </button>
    `;
  }).join("");
  const pathSteps = progress.path
    .map((section) => {
      const status = sectionStatus(section.id, st);
      return `
        <li>
          <button type="button" class="path-step ${status.className}" data-dashboard-section="${section.id}">
            <span class="path-step__marker">${section.num}</span>
            <span class="path-step__text">${escapeHtml(section.title)}</span>
          </button>
        </li>
      `;
    })
    .join("");

  host.innerHTML = `
    <div class="learner-dashboard__summary">
      <div class="learner-dashboard__copy">
        <p class="dashboard-eyebrow">LMS-lite dashboard</p>
        <h2>${escapeHtml(track.label)}</h2>
        <p>${escapeHtml(track.description)}</p>
      </div>
      <div class="dashboard-meter" role="img" aria-label="${progress.percent}% complete" style="--dashboard-angle: ${Math.round(progress.percent * 3.6)}deg">
        <strong>${progress.percent}%</strong>
        <span>complete</span>
      </div>
    </div>
    <div class="dashboard-controls">
      <div class="dashboard-actions">
        <button type="button" class="dashboard-primary" data-dashboard-section="${primary ? primary.id : "intro"}">
          ${next ? "Continue required path" : "Review path"}
        </button>
        <button type="button" class="dashboard-secondary" data-dashboard-section="${resume ? resume.id : "intro"}">
          Resume last module
        </button>
      </div>
      <div class="dashboard-stats" aria-label="Learning progress">
        <div><span>Modules</span><strong>${progress.completed}/${progress.total}</strong></div>
        <div><span>Started</span><strong>${progress.opened}</strong></div>
        <div><span>Badges</span><strong>${st.badges.length}/12</strong></div>
        <div><span>Last activity</span><strong>${escapeHtml(lastActivity)}</strong></div>
      </div>
    </div>
    <div class="path-selector">
      <div>
        <p class="path-selector__label">Learning path</p>
        <div class="path-selector__buttons" role="group" aria-label="Choose learning path">
          ${trackButtons}
        </div>
      </div>
      <ol class="path-steps" aria-label="${escapeHtml(track.label)} modules">
        ${pathSteps}
      </ol>
    </div>
  `;

  host.querySelectorAll("[data-track-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const trackId = btn.getAttribute("data-track-id");
      if (window.DIA_GAMIFY) window.DIA_GAMIFY.setActiveTrack(trackId);
      refreshLmsProgress("home");
    });
  });

  host.querySelectorAll("[data-dashboard-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sectionId = btn.getAttribute("data-dashboard-section");
      showSection(sectionId);
    });
  });
}

function buildHome() {
  buildDashboard();
  const grid = document.getElementById("section-grid");
  const G = window.DIA_GAMIFY;
  const prog = G ? G.load() : getProgressState();
  const activeTrack = getActiveTrack();
  grid.innerHTML = sections
    .map((s) => {
      const status = sectionStatus(s.id, prog);
      const meta = sectionMeta(s);
      const inPath = sectionMatchesTrack(s, activeTrack);
      const cls = [
        status.completed ? "section-card--cleared" : "",
        inPath ? "section-card--in-path" : "section-card--supporting",
      ]
        .filter(Boolean)
        .join(" ");
      const star = status.completed
        ? '<span class="section-card__star" title="Module complete">✓</span>'
        : "";
      return `
    <button type="button" class="section-card ${cls}" data-section="${s.id}" aria-label="Open section ${s.num}: ${escapeHtml(s.title)}">
      ${star}
      <span class="section-card__num">Section ${s.num}</span>
      <span class="section-card__title">${escapeHtml(s.title)}</span>
      <span class="section-card__meta">${escapeHtml(meta.duration)} · ${escapeHtml(status.label)}${inPath ? " · In path" : ""}</span>
      <p class="section-card__desc">${escapeHtml(s.short)}</p>
    </button>
  `;
    })
    .join("");

  grid.querySelectorAll(".section-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-section");
      showSection(id);
    });
  });
}

window.refreshHomeQuizStars = function refreshHomeQuizStars() {
  refreshLmsProgress();
};

function courseOutlineHtml(activeSectionId) {
  const st = getProgressState();
  const trackId = getActiveTrack();
  let track = getTrackById(trackId);
  let path = sectionsForTrack(trackId);
  if (!path.some((section) => section.id === activeSectionId)) {
    track = LEARNING_TRACKS[0];
    path = sections;
  }
  const items = path
    .map((section) => {
      const status = sectionStatus(section.id, st);
      const active = section.id === activeSectionId;
      return `
        <li>
          <button type="button" class="course-outline__item ${status.className}${active ? " is-active" : ""}" data-outline-section="${section.id}">
            <span class="course-outline__num">${section.num}</span>
            <span class="course-outline__main">
              <span class="course-outline__title">${escapeHtml(section.title)}</span>
              <span class="course-outline__status">${escapeHtml(status.label)}</span>
            </span>
          </button>
        </li>
      `;
    })
    .join("");

  return `
    <aside class="course-outline" aria-label="Course outline">
      <div class="course-outline__header">
        <p>Learning path</p>
        <h3>${escapeHtml(track.label)}</h3>
      </div>
      <ol class="course-outline__list">
        ${items}
      </ol>
    </aside>
  `;
}

function completionPanelHtml(section) {
  const st = getProgressState();
  const status = sectionStatus(section.id, st);
  const quiz = st.quiz && st.quiz[section.id];
  const quizTotal =
    window.DIA_GAMIFY &&
    window.DIA_GAMIFY.QUIZZES &&
    window.DIA_GAMIFY.QUIZZES[section.id]
      ? window.DIA_GAMIFY.QUIZZES[section.id].questions.length
      : 3;
  const bestScore =
    quiz && typeof quiz.score === "number" ? `${quiz.score}/${quizTotal}` : "Passed";
  const next = adjacentSections(section.id).next;
  if (status.completed) {
    return `
      <section class="completion-panel completion-panel--done" aria-label="Module completion">
        <div>
          <p class="completion-panel__label">Module complete</p>
          <h3>Checkpoint cleared</h3>
          <p>Best checkpoint score: ${bestScore}.</p>
        </div>
        ${
          next
            ? `<button type="button" class="dashboard-secondary" data-nav-section="${next.id}">Next: ${escapeHtml(next.title)}</button>`
            : `<span class="completion-panel__done-note">Path complete</span>`
        }
      </section>
    `;
  }

  return `
    <section class="completion-panel" aria-label="Module completion">
      <div>
        <p class="completion-panel__label">${status.opened ? "In progress" : "Not started"}</p>
        <h3>Complete this module</h3>
        <p>Pass the checkpoint with at least 66% to complete the module and earn the badge.</p>
      </div>
      <button type="button" class="btn-quiz" data-quiz-section="${section.id}">Take checkpoint</button>
    </section>
  `;
}

function sectionNavHtml(sectionId) {
  const adjacent = adjacentSections(sectionId);
  return `
    <nav class="section-nav" aria-label="Module navigation">
      ${
        adjacent.previous
          ? `<button type="button" class="section-nav__btn" data-nav-section="${adjacent.previous.id}">Previous: ${escapeHtml(adjacent.previous.title)}</button>`
          : `<span class="section-nav__placeholder">Start of path</span>`
      }
      ${
        adjacent.next
          ? `<button type="button" class="section-nav__btn section-nav__btn--primary" data-nav-section="${adjacent.next.id}">Next: ${escapeHtml(adjacent.next.title)}</button>`
          : `<span class="section-nav__placeholder">End of path</span>`
      }
    </nav>
  `;
}

function buildSectionPages() {
  const host = document.getElementById("section-pages");
  const G = window.DIA_GAMIFY;
  const st = getProgressState();
  host.innerHTML = sections
    .map((s) => {
      const qs = G ? G.quizStatus(s.id) : { label: "Checkpoint quiz", passed: false };
      const status = sectionStatus(s.id, st);
      const meta = sectionMeta(s);
      return `
    <div class="view" id="view-${s.id}" tabindex="-1">
      <div class="back-bar">
        <button type="button" class="btn-back" data-nav="home">← Back to all sections</button>
      </div>
      <div class="section-page-shell">
        ${courseOutlineHtml(s.id)}
        <article class="section-page__content">
          <header class="section-page__header">
            <p class="section-page__label">Section ${s.num} of 12</p>
            <h2>${escapeHtml(s.title)}</h2>
            <p class="section-page__deck">${escapeHtml(s.short)}</p>
            <div class="section-page__meta">
              <span>${escapeHtml(meta.duration)}</span>
              <span class="${status.className}">${escapeHtml(status.label)}</span>
            </div>
          </header>
          <div class="section-playbar">
            <button type="button" class="btn-quiz" data-quiz-section="${s.id}">${escapeHtml(qs.label)}</button>
            <p class="section-playbar__hint">
              Complete the module by passing the checkpoint. First opens still earn <strong>+5 XP</strong>; checkpoint XP is capped after completion.
            </p>
          </div>
          ${linkifyDeckSlides(s.body)}
          ${deckTablesHtml(s.id)}
          ${renderRepo(s.repo)}
          ${completionPanelHtml(s)}
          ${sectionNavHtml(s.id)}
        </article>
      </div>
    </div>
  `;
    })
    .join("");

  host.querySelectorAll(".btn-back").forEach((btn) => {
    btn.addEventListener("click", () => showView("home"));
  });

  host.querySelectorAll("[data-quiz-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sid = btn.getAttribute("data-quiz-section");
      if (window.DIA_GAMIFY) window.DIA_GAMIFY.openQuiz(sid);
    });
  });

  host.querySelectorAll("[data-outline-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showSection(btn.getAttribute("data-outline-section"));
    });
  });

  host.querySelectorAll("[data-nav-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showSection(btn.getAttribute("data-nav-section"));
    });
  });
}

window.refreshSectionQuizButtons = function refreshSectionQuizButtons() {
  refreshLmsProgress();
};

function refreshLmsProgress(preferredView) {
  const activeEl = document.querySelector(".view.is-active");
  const currentView = activeEl ? activeEl.id.replace(/^view-/, "") : "home";
  const nextView = preferredView || currentView || "home";
  if (window.DIA_GAMIFY) window.DIA_GAMIFY.updateHud();
  buildHome();
  buildSectionPages();
  if (nextView === "home" || sections.some((section) => section.id === nextView)) {
    showView(nextView);
  } else {
    showView("home");
  }
}

window.refreshLmsProgress = refreshLmsProgress;

function showSection(id) {
  if (!sections.some((section) => section.id === id)) return;
  if (window.DIA_GAMIFY) window.DIA_GAMIFY.markSectionOpened(id);
  refreshLmsProgress(id);
}

function initFromHash() {
  const h = (location.hash || "").replace(/^#/, "");
  if (h && sections.some((s) => s.id === h)) {
    if (window.DIA_GAMIFY) window.DIA_GAMIFY.markSectionOpened(h);
    refreshLmsProgress(h);
  } else {
    showView("home");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.DIA_GAMIFY) {
    window.DIA_GAMIFY.attachModalClose();
    window.DIA_GAMIFY.updateHud();
  }
  buildHome();
  buildSectionPages();
  initFromHash();
  window.addEventListener("hashchange", initFromHash);
});
