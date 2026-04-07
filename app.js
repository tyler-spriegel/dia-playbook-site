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
  "https://pwc.sharepoint.com/:p:/r/teams/US-INT-ADVS-Enterprise-Application-Integration/Shared%20Documents/10.%20Large%20Scale%20Solution%20delivery/2.%20Delivery/Delivery%20Playbook/%5BDRAFT%5D%20DIA%20Delivery%20Playbook.pptx?d=w5cbc36da055d4fc9af36433a8a8d0b38&csf=1&web=1&e=dDRHTh";

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
  return s
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
    history.replaceState(null, "", " ");
  } else {
    history.replaceState(null, "", `#${viewId}`);
  }
  const main = document.getElementById("main-content");
  if (main) main.focus();
}

function buildHome() {
  const grid = document.getElementById("section-grid");
  const G = window.DIA_GAMIFY;
  const prog = G ? G.load() : null;
  grid.innerHTML = sections
    .map((s) => {
      const passed = prog && prog.quiz[s.id] && prog.quiz[s.id].passed;
      const cls = passed ? " section-card--cleared" : "";
      const star = passed
        ? '<span class="section-card__star" title="Checkpoint cleared">★</span>'
        : "";
      return `
    <button type="button" class="section-card${cls}" data-section="${s.id}" aria-label="Open section ${s.num}: ${escapeHtml(s.title)}">
      ${star}
      <span class="section-card__num">Section ${s.num}</span>
      <span class="section-card__title">${escapeHtml(s.title)}</span>
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
  buildHome();
};

function buildSectionPages() {
  const host = document.getElementById("section-pages");
  const G = window.DIA_GAMIFY;
  host.innerHTML = sections
    .map((s) => {
      const qs = G ? G.quizStatus(s.id) : { label: "Checkpoint quiz", passed: false };
      return `
    <div class="view" id="view-${s.id}" tabindex="-1">
      <div class="back-bar">
        <button type="button" class="btn-back" data-nav="home">← Back to all sections</button>
      </div>
      <header class="section-page__header">
        <p class="section-page__label">Section ${s.num} of 12</p>
        <h2>${escapeHtml(s.title)}</h2>
        <p class="section-page__deck">${escapeHtml(s.short)}</p>
      </header>
      <div class="section-playbar">
        <button type="button" class="btn-quiz" data-quiz-section="${s.id}">${escapeHtml(qs.label)}</button>
        <p class="section-playbar__hint">
          <strong>Gamify:</strong> Pass with ≥66% correct to earn XP and a section badge. You also get <strong>+5 XP</strong> the first time you open each section.
        </p>
      </div>
      ${linkifyDeckSlides(s.body)}
      ${deckTablesHtml(s.id)}
      ${renderRepo(s.repo)}
    </div>
  `;
    })
    .join("");

  host.querySelectorAll(".btn-back").forEach((btn) => {
    btn.addEventListener("click", () => showView("home"));
  });

  host.querySelectorAll(".btn-quiz").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sid = btn.getAttribute("data-quiz-section");
      if (window.DIA_GAMIFY) window.DIA_GAMIFY.openQuiz(sid);
    });
  });
}

window.refreshSectionQuizButtons = function refreshSectionQuizButtons() {
  const G = window.DIA_GAMIFY;
  if (!G) return;
  document.querySelectorAll(".btn-quiz").forEach((btn) => {
    const sid = btn.getAttribute("data-quiz-section");
    const qs = G.quizStatus(sid);
    btn.textContent = qs.label;
  });
};

function showSection(id) {
  if (window.DIA_GAMIFY) window.DIA_GAMIFY.markSectionOpened(id);
  showView(id);
}

function initFromHash() {
  const h = (location.hash || "").replace(/^#/, "");
  if (h && sections.some((s) => s.id === h)) {
    showView(h);
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
