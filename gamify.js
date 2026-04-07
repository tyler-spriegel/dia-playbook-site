/**
 * Lightweight gamification: checkpoints, XP, badges, localStorage.
 */
const DIA_GAMIFY = (() => {
  const STORAGE = "dia_playbook_progress_v1";

  const defaultState = () => ({
    xp: 0,
    badges: [],
    quiz: {},
    openedSections: [],
  });

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return defaultState();
      return { ...defaultState(), ...JSON.parse(raw) };
    } catch {
      return defaultState();
    }
  }

  function save(state) {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  }

  /** sectionId -> { title, questions: [{ q, choices[], correctIndex, explain }] } */
  const QUIZZES = {
    intro: {
      title: "Section 1 checkpoint",
      questions: [
        {
          q: "What is the primary purpose of this playbook?",
          choices: [
            "Sell DIA engagements commercially",
            "Provide a repeatable execution model for integration delivery during implementation",
            "Replace enterprise architecture strategy",
            "Select integration vendors",
          ],
          correctIndex: 1,
          explain: "The deck states it standardizes build, test, release, and operate execution—not strategy or GTM.",
        },
        {
          q: "In Scenario A (most common), the delivery team primarily:",
          choices: [
            "Builds the integration platform runtime as the product",
            "Builds integrations on an existing or separate platform",
            "Only writes documentation",
            "Owns SteerCo funding decisions",
          ],
          correctIndex: 1,
          explain: "Scenario A: platform exists elsewhere; delivery builds APIs/events on it.",
        },
        {
          q: "Which audience is explicitly listed?",
          choices: [
            "Only sales executives",
            "Integration delivery teams, delivery leadership, and platform/enablement teams",
            "Only offshore developers",
            "External regulators only",
          ],
          correctIndex: 1,
          explain: "Slide 3 lists architects, developers, QA, leads, CoEs, and environment teams.",
        },
      ],
    },
    "operating-model": {
      title: "Section 2 checkpoint",
      questions: [
        {
          q: "How many core execution workstreams does the model describe?",
          choices: ["2", "3", "4", "6"],
          correctIndex: 2,
          explain: "PM, Architecture, Delivery, and Release Readiness.",
        },
        {
          q: "On the program RACI (Slide 15), for “Go/No-Go Decision,” who is Accountable in the Executive Sponsor column?",
          choices: [
            "Executive Sponsor",
            "Delivery only",
            "Architecture only",
            "Release Readiness only",
          ],
          correctIndex: 0,
          explain: "Slide 15 marks Executive Sponsor as A for the Go/No-Go decision row.",
        },
        {
          q: "Which role uses “AI-generated dependency mapping” in the deck?",
          choices: [
            "Reporting Lead only",
            "Release Train Engineer",
            "Only the client CFO",
            "Hypercare only",
          ],
          correctIndex: 1,
          explain: "Slide 11 lists RTE with AI-generated dependency mapping and flow insights.",
        },
      ],
    },
    mobilization: {
      title: "Section 3 checkpoint",
      questions: [
        {
          q: "Mobilization is complete when AI is embedded in:",
          choices: [
            "Only payroll systems",
            "Backlog generation, mapping, validation, and reporting workflows",
            "Only architecture slides",
            "Only executive emails",
          ],
          correctIndex: 1,
          explain: "Slide 17 calls out AI in backlog, mapping, validation, and reporting.",
        },
        {
          q: "A typical integration sprint length called out in the deck is:",
          choices: ["1 week", "2 weeks", "6 months", "1 day"],
          correctIndex: 1,
          explain: "Slide 18 references two-week sprints as typical.",
        },
        {
          q: "Platform readiness exit criteria include:",
          choices: [
            "Only a PowerPoint deck",
            "Dev environment accessible and at least one successful E2E Dev deployment",
            "Skipping CI/CD",
            "No test data",
          ],
          correctIndex: 1,
          explain: "Slide 24 lists Dev access and successful deployment with no open blockers.",
        },
      ],
    },
    agile: {
      title: "Section 4 checkpoint",
      questions: [
        {
          q: "Agentic AI in the agile integration model is described as helping across:",
          choices: [
            "Only payroll",
            "Design through hypercare (specs, tests, release evidence, observability)",
            "Only HR onboarding",
            "Only legal review",
          ],
          correctIndex: 1,
          explain: "Slide 27 spans design, build, test, release, and hypercare.",
        },
        {
          q: "Integration delivery fails when ______ is not managed as aggressively as backlog scope.",
          choices: [
            "Marketing colors",
            "Environment and dependency readiness",
            "Number of meeting invites",
            "Slide font sizes",
          ],
          correctIndex: 1,
          explain: "Slide 28 states sprints fail when env/dependency readiness lags.",
        },
        {
          q: "Concourse Delivery Platform is described as embedding:",
          choices: ["Only spreadsheets", "GenAI for smarter/faster decisions", "Only email", "Only paper"],
          correctIndex: 1,
          explain: "Slide 35 mentions GenAI embedded in Concourse.",
        },
      ],
    },
    testing: {
      title: "Section 5 checkpoint",
      questions: [
        {
          q: "AI-enabled test scope identification produces:",
          choices: [
            "Only paper forms",
            "Heat maps of integration change impact across systems and releases",
            "Only HR policies",
            "Only UI colors",
          ],
          correctIndex: 1,
          explain: "Slide 38 highlights dynamic heat maps from artifact analysis.",
        },
        {
          q: "Shift-left testing combined with AI is aimed at:",
          choices: [
            "Delaying all testing to production",
            "Earlier defect detection and broader coverage",
            "Removing test environments",
            "Eliminating developers",
          ],
          correctIndex: 1,
          explain: "Slide 52 ties shift-left and AI to earlier defects and automation.",
        },
        {
          q: "UAT typically begins after roughly what share of certification scripts have passed?",
          choices: ["0%", "70–80%", "100% only on day one", "Never"],
          correctIndex: 1,
          explain: "Slides 46–47 position UAT late in certification (~70–80%).",
        },
      ],
    },
    release: {
      title: "Section 6 checkpoint",
      questions: [
        {
          q: "Each integration release should have:",
          choices: [
            "No documentation",
            "A single manifest for what deploys, order, and dependencies",
            "Only verbal agreement",
            "Separate undocumented deploys per developer",
          ],
          correctIndex: 1,
          explain: "Slides 55–56 mandate one manifest with assets, order, dependencies, rollback.",
        },
        {
          q: "Semantic versioning MAJOR usually signals:",
          choices: [
            "Cosmetic typo fixes only",
            "Breaking contract changes requiring consumer coordination",
            "No consumer impact ever",
            "Internal-only renames with zero API impact",
          ],
          correctIndex: 1,
          explain: "Slide 59: MAJOR = breaking; consumers must migrate.",
        },
        {
          q: "The release is complete when:",
          choices: [
            "Deployment script starts",
            "Production is confirmed healthy (smoke, monitoring), not merely when deploy finishes",
            "Developers go home",
            "Slides are printed",
          ],
          correctIndex: 1,
          explain: "Slide 61 emphasizes health validation windows after deploy.",
        },
      ],
    },
    "business-readiness": {
      title: "Section 7 checkpoint",
      questions: [
        {
          q: "How many business readiness workstreams are highlighted?",
          choices: ["2", "3", "5", "12"],
          correctIndex: 2,
          explain: "Slide 64 lists five workstreams (BAT, change leadership, process, department readiness, training).",
        },
        {
          q: "Change management is meant to ensure:",
          choices: [
            "Only IT builds code",
            "Teams adopt new integration behaviors with less disruption",
            "Canceling UAT",
            "Removing training",
          ],
          correctIndex: 1,
          explain: "Slide 71 frames outcomes around adoption and sustained value.",
        },
        {
          q: "Blended learning means:",
          choices: [
            "Only one training format forever",
            "Combining ILT, eLearning, super-users, OJT, etc. across the lifecycle",
            "Skipping documentation",
            "Only videos with no SMEs",
          ],
          correctIndex: 1,
          explain: "Slide 74 describes blended methods at different times.",
        },
      ],
    },
    golive: {
      title: "Section 8 checkpoint",
      questions: [
        {
          q: "Go-Live is best described as:",
          choices: [
            "An informal chat",
            "A formal checkpoint confirming readiness across testing, defects, sign-offs, and cutover",
            "Only a marketing milestone",
            "Automatic with no criteria",
          ],
          correctIndex: 1,
          explain: "Slide 82 frames Go-Live as a formal readiness checkpoint.",
        },
        {
          q: "Activation readiness dimensions in the framework include:",
          choices: [
            "Only tech",
            "Tech, business, staffing, and external readiness",
            "Only design fonts",
            "Only slide count",
          ],
          correctIndex: 1,
          explain: "Slide 83 shows four dimensions.",
        },
        {
          q: "A “Conditional Approval” go/no-go outcome means:",
          choices: [
            "Cancel the program",
            "Proceed with documented mitigations and cutover updates",
            "Ignore defects",
            "Skip hypercare",
          ],
          correctIndex: 1,
          explain: "Slide 85 describes conditional path with mitigation plan.",
        },
      ],
    },
    hypercare: {
      title: "Section 9 checkpoint",
      questions: [
        {
          q: "During hypercare, AI is suggested for:",
          choices: [
            "Nothing",
            "Summarizing incidents/metrics for leadership and drafting KB articles from docs",
            "Replacing production databases automatically",
            "Legal contracts only",
          ],
          correctIndex: 1,
          explain: "Slide 88 lists AI for reporting/metrics and KB drafts (with review).",
        },
        {
          q: "Post go-live, knowledge transfer sessions aim to:",
          choices: [
            "Upskill client users on firm-owned processes",
            "Delete all documentation",
            "Stop all monitoring",
            "Remove DevOps",
          ],
          correctIndex: 0,
          explain: "Slide 87 mentions KT sessions for client upskilling.",
        },
        {
          q: "Hypercare focuses on:",
          choices: [
            "Planning the next fiscal year budget only",
            "Stabilizing production after go-live with focused support and defect handling",
            "Skipping defect triage",
            "Eliminating observability",
          ],
          correctIndex: 1,
          explain: "Hypercare is the stabilization window after cutover.",
        },
      ],
    },
    reporting: {
      title: "Section 10 checkpoint",
      questions: [
        {
          q: "Which reporting layer is explicitly titled in the deck (Slides 76–80)?",
          choices: [
            "Only payroll reporting",
            "Integration KPIs, workstream, program, platform health, governance metrics",
            "Only social media metrics",
            "Only facilities seating charts",
          ],
          correctIndex: 1,
          explain: "Those five titles structure the reporting section.",
        },
        {
          q: "ProAct AI is associated in the deck with:",
          choices: [
            "Only catering orders",
            "PM reporting, RAID/status drafts, and leadership narratives",
            "Replacing all humans",
            "Only hardware procurement",
          ],
          correctIndex: 1,
          explain: "Slides 11 and 19 tie ProAct-style AI to reporting and RAID/status.",
        },
        {
          q: "A practical learner tip is to identify:",
          choices: [
            "Every chart in the company",
            "The few metrics leadership actually acts on each week",
            "Only colors used in slides",
            "Zero KPIs",
          ],
          correctIndex: 1,
          explain: "Focus on the metrics that drive decisions.",
        },
      ],
    },
    tooling: {
      title: "Section 11 checkpoint",
      questions: [
        {
          q: "ALM tools in the playbook context primarily support:",
          choices: [
            "Only cafeteria menus",
            "Lifecycle from planning/requirements through test and deployment",
            "Only printing",
            "Only travel booking",
          ],
          correctIndex: 1,
          explain: "Slide 91 defines ALM across planning to deployment.",
        },
        {
          q: "Client tool preferences should:",
          choices: [
            "Always be ignored",
            "Be considered when selecting tooling",
            "Be illegal",
            "Mandate one vendor globally",
          ],
          correctIndex: 1,
          explain: "Slide 91 notes client preferences matter.",
        },
        {
          q: "Wiki + OpenAPI/RAML + Jira/ADO together support:",
          choices: [
            "Traceability from documentation to work tracking and contracts",
            "Only music playlists",
            "Removing testing",
            "Deleting environments",
          ],
          correctIndex: 0,
          explain: "Slide 35 ties documentation, specs, and boards together.",
        },
      ],
    },
    appendix: {
      title: "Section 12 checkpoint",
      questions: [
        {
          q: "Unit testing evidence in the appendix guidance is:",
          choices: [
            "Optional always",
            "Required traceability: stories need UT evidence uploaded",
            "Only for managers",
            "Forbidden",
          ],
          correctIndex: 1,
          explain: "Slide 97 states UT evidence upload to complete stories.",
        },
        {
          q: "E2E testing in the appendix:",
          choices: [
            "Runs only before any coding",
            "Starts in SIT2 in parallel with SIT and ends in SIT3",
            "Never uses production-like data",
            "Skips interfaces",
          ],
          correctIndex: 1,
          explain: "Slide 97 defines E2E timing across SIT2–SIT3.",
        },
        {
          q: "The appendix workstream RACI sample (Slide 103) is marked to:",
          choices: [
            "Be frozen forever without review",
            "Update after SME workstream review",
            "Delete all roles",
            "Remove governance",
          ],
          correctIndex: 1,
          explain: "Slide 103 footer calls for post-SME update.",
        },
      ],
    },
  };

  const BADGE_NAMES = {
    intro: "Navigator",
    "operating-model": "Workstream Mapper",
    mobilization: "Launch Crew",
    agile: "Cadence Pro",
    testing: "Quality Sentinel",
    release: "Release Captain",
    "business-readiness": "Change Ally",
    golive: "Go-Live Guardian",
    hypercare: "Stabilizer",
    reporting: "Signal Reader",
    tooling: "Toolbelt",
    appendix: "Deep Diver",
  };

  function updateHud() {
    const st = load();
    const xpEl = document.getElementById("gamify-xp");
    const barEl = document.getElementById("gamify-bar-fill");
    const barWrap = document.getElementById("gamify-bar");
    const badgeEl = document.getElementById("gamify-badges");
    if (xpEl) xpEl.textContent = String(st.xp);
    const maxXp = 12 * 120;
    let pct = 0;
    if (barEl) {
      pct = Math.min(100, Math.round((st.xp / maxXp) * 100));
      barEl.style.width = pct + "%";
    }
    if (barWrap) barWrap.setAttribute("aria-valuenow", String(pct));
    if (badgeEl) badgeEl.textContent = String(st.badges.length);
  }

  function markSectionOpened(sectionId) {
    const st = load();
    if (!st.openedSections.includes(sectionId)) {
      st.openedSections.push(sectionId);
      st.xp += 5;
      save(st);
      updateHud();
    }
  }

  function openQuiz(sectionId) {
    const quiz = QUIZZES[sectionId];
    if (!quiz) return;
    const modal = document.getElementById("quiz-modal");
    const title = document.getElementById("quiz-modal-title");
    const body = document.getElementById("quiz-modal-body");
    const footer = document.getElementById("quiz-modal-footer");
    if (!modal || !title || !body || !footer) return;

    title.textContent = quiz.title;
    body.innerHTML = "";
    quiz.questions.forEach((question, qi) => {
      const wrap = document.createElement("div");
      wrap.className = "quiz-question";
      wrap.innerHTML = `<p class="quiz-q">${escapeHtml(question.q)}</p>`;
      const opts = document.createElement("div");
      opts.className = "quiz-choices";
      question.choices.forEach((c, ci) => {
        const id = `q${sectionId}-${qi}-${ci}`;
        const row = document.createElement("label");
        row.className = "quiz-choice";
        row.innerHTML = `<input type="radio" name="q${qi}" value="${ci}" id="${id}"/> <span>${escapeHtml(
          c
        )}</span>`;
        opts.appendChild(row);
      });
      wrap.appendChild(opts);
      body.appendChild(wrap);
    });

    footer.innerHTML = "";
    const submit = document.createElement("button");
    submit.type = "button";
    submit.className = "quiz-submit";
    submit.textContent = "Submit answers";
    submit.addEventListener("click", () => {
      let correct = 0;
      quiz.questions.forEach((question, qi) => {
        const picked = body.querySelector(`input[name="q${qi}"]:checked`);
        if (picked && Number(picked.value) === question.correctIndex) correct += 1;
      });
      const pass = correct >= Math.ceil(quiz.questions.length * 0.66);
      const st = load();
      const prev = st.quiz[sectionId];
      let xpGain = 0;
      const alreadyCleared = prev && prev.passed;
      if (pass && !alreadyCleared) {
        xpGain = 35 + correct * 10;
        st.xp += xpGain;
        if (!st.badges.includes(sectionId)) st.badges.push(sectionId);
      }
      st.quiz[sectionId] = {
        passed: pass || alreadyCleared,
        score: Math.max(correct, prev ? prev.score : 0),
        at: Date.now(),
      };
      save(st);
      body.innerHTML = `<div class="quiz-result ${pass ? "quiz-result--pass" : "quiz-result--fail"}">
        <p><strong>${pass ? "Checkpoint cleared!" : "Keep studying"}</strong> — You got ${correct}/${
        quiz.questions.length
      } correct.</p>
        <ul>${quiz.questions
          .map(
            (q, i) =>
              `<li><em>Q${i + 1}:</em> ${escapeHtml(q.explain)}</li>`
          )
          .join("")}</ul>
        <p class="quiz-xp">${
        xpGain > 0
          ? `+${xpGain} XP ${
              BADGE_NAMES[sectionId]
                ? `· Badge: <strong>${escapeHtml(BADGE_NAMES[sectionId])}</strong>`
                : ""
            }`
          : pass && alreadyCleared
            ? "No additional XP (checkpoint already cleared). Review the rationales above anytime."
            : "No XP yet — score at least 66% to earn your checkpoint bonus."
      }</p>
      </div>`;
      footer.innerHTML = `<button type="button" class="btn-back quiz-close">Close</button>`;
      footer.querySelector(".quiz-close").addEventListener("click", () => {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        updateHud();
        if (typeof window.refreshSectionQuizButtons === "function") {
          window.refreshSectionQuizButtons();
        }
        if (typeof window.refreshHomeQuizStars === "function") {
          window.refreshHomeQuizStars();
        }
      });
    });
    footer.appendChild(submit);

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    title.setAttribute("tabindex", "-1");
    title.focus();
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function quizStatus(sectionId) {
    const st = load().quiz[sectionId];
    if (!st) return { label: "Checkpoint quiz", passed: false };
    return {
      label: st.passed ? "Retry quiz (XP capped)" : "Try again",
      passed: st.passed,
    };
  }

  function attachModalClose() {
    const modal = document.getElementById("quiz-modal");
    if (!modal) return;
    const backdrop = modal.querySelector(".quiz-modal__backdrop");
    backdrop.addEventListener("click", () => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  return {
    load,
    save,
    openQuiz,
    updateHud,
    markSectionOpened,
    quizStatus,
    attachModalClose,
    QUIZZES,
  };
})();

window.DIA_GAMIFY = DIA_GAMIFY;
