/**
 * Rich section HTML synthesized from [DRAFT] DIA Delivery Playbook slides.
 * Slide numbers refer to the source deck. Loaded before app.js.
 */
window.DIA_PLAYBOOK_BODIES = {
  intro: `
    <p class="deck-ref"><strong>Source:</strong> Slides 3–5 · Playbook Introduction & Purpose</p>
    <div class="diagram-wrap" aria-hidden="true">
      <svg class="diagram-svg" viewBox="0 0 720 120" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#fd5108"/><stop offset="100%" style="stop-color:#fe7c39"/></linearGradient></defs>
        <rect x="8" y="28" width="160" height="64" rx="8" fill="#f5f7f8" stroke="#cbd1d6" stroke-width="2"/>
        <text x="88" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#000">Strategy &amp; roadmap</text>
        <text x="88" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#444">(outside this playbook)</text>
        <path d="M175 60 L215 60" stroke="#a1a8b3" stroke-width="2" marker-end="url(#arr)"/>
        <rect x="220" y="20" width="280" height="80" rx="10" fill="url(#g1)" opacity="0.15" stroke="#fd5108" stroke-width="2"/>
        <text x="360" y="48" text-anchor="middle" font-family="Georgia,serif" font-size="15" font-weight="bold" fill="#000">DIA Delivery Playbook</text>
        <text x="360" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#333">Build · Test · Release · Operate · Hypercare</text>
        <text x="360" y="90" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#555">APIs · Events · Fabrics · AI-connected systems</text>
        <path d="M505 60 L545 60" stroke="#a1a8b3" stroke-width="2"/>
        <rect x="550" y="28" width="162" height="64" rx="8" fill="#fff5ed" stroke="#ffaa72" stroke-width="2"/>
        <text x="631" y="58" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#000">Production value</text>
        <text x="631" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#444">Stable integrations</text>
        <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#a1a8b3"/></marker></defs>
      </svg>
      <p class="diagram-caption">Execution boundary: this playbook covers delivery mechanics after scope is set—not strategy, GTM, or vendor selection.</p>
    </div>
    <div class="learner-block">
      <h3>Purpose of this playbook</h3>
      <p>A <strong>practical, repeatable execution model</strong> for Digital Integration &amp; Architecture during <strong>implementation</strong>. It standardizes how teams build, test, release, and operate APIs, events, and integration services across programs.</p>
      <ul>
        <li>Defines delivery <strong>workstreams, roles, ceremonies, quality gates,</strong> and dependencies.</li>
        <li>Serves as a <strong>single execution reference</strong> across platforms and industries.</li>
        <li>Accelerates <strong>onboarding</strong> with shared language instead of tribal knowledge.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Audience &amp; intended outcomes</h3>
      <div class="two-col">
        <div>
          <p class="subhead">Who should use it</p>
          <ul>
            <li><strong>Integration delivery:</strong> integration architects, API/event developers, platform engineers, QA, DevSecOps.</li>
            <li><strong>Delivery leadership:</strong> engagement managers, release managers, integration leads.</li>
            <li><strong>Platform &amp; enablement:</strong> Integration CoEs, fabric owners, CI/CD and environment teams.</li>
          </ul>
        </div>
        <div>
          <p class="subhead">What “good” looks like</p>
          <ul>
            <li>Predictable, high-quality delivery with clear cadence, artifacts, and sign-offs.</li>
            <li>Lower risk through consistent testing, release, and hypercare.</li>
            <li>Clear ownership across build → test → release → operate.</li>
            <li>Reuse and maintainability through standardized patterns and tooling.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="learner-block">
      <h3>What DIA delivers in execution</h3>
      <ul>
        <li><strong>Production-ready</strong> APIs, events, and integration services.</li>
        <li><strong>Integration fabrics</strong> that decouple channels from core systems.</li>
        <li><strong>Standardized patterns</strong>—API factory, DevSecOps, automated testing.</li>
        <li><strong>End-to-end integration or platform delivery</strong> for large programs (e.g. ERP, core modernization).</li>
      </ul>
      <p>The offering executes enterprise-grade integrations connecting applications, platforms, data, and <strong>AI systems</strong>. This playbook covers delivery roles, workstreams, agile ceremonies, build/test/release/hypercare, quality, governance, and operational readiness—not integration strategy, diagnostics, roadmap-only work, commercial models, or platform/vendor selection.</p>
    </div>
    <div class="ai-panel">
      <h4>AI in scope (from the deck)</h4>
      <p>DIA is positioned to include design, build, test, and operation of integrations that <strong>connect to AI systems</strong>. Downstream sections call out specific AI enablers (e.g. ProAct AI, SDLC Canvas, AgentOS, design agents, TestGenAI) tied to each workstream—use those as your program’s anchor list when standing up tooling.</p>
    </div>
    <div class="learner-block">
      <h3>Two delivery scenarios (know which one you are in)</h3>
      <table class="data-table">
        <thead><tr><th></th><th>Scenario A — Integration on a platform</th><th>Scenario B — Platform delivery</th></tr></thead>
        <tbody>
          <tr><th scope="row">Primary deliverable</th><td>Integrations (APIs, events, services)</td><td>The integration platform as a product</td></tr>
          <tr><th scope="row">Delivery team focus</th><td>Build/configure on existing platform; consume capabilities</td><td>Build runtime, pipelines, governance, tooling; versioned platform releases</td></tr>
          <tr><th scope="row">Release</th><td>Integration releases</td><td>Platform versioned releases + consumer coordination</td></tr>
        </tbody>
      </table>
      <p class="tip"><strong>New learner tip:</strong> Scenario A is most common. If you are in B, the “Delivery” workstream is the platform team—mobilization, testing, and release sections all read differently.</p>
    </div>
  `,

  operatingModel: `
    <p class="deck-ref"><strong>Source:</strong> Slides 8–15 · Operating model, roles, RACI (Slide 7 = table of contents)</p>
    <div class="learner-block">
      <h3>Four core execution workstreams</h3>
      <p>Large programs typically align four teams. Together they cover plan, design, build, and safe production entry.</p>
      <div class="workstream-grid">
        <div class="ws-card"><strong>Project Management</strong><p>Integrated plan, milestones, dependencies, coordination, risks, escalations, ceremonies, stakeholder reporting, business alignment.</p></div>
        <div class="ws-card"><strong>Architecture</strong><p>Reference architectures, integration standards &amp; patterns, solution/integration designs, security &amp; NFR alignment, impact analysis, testing scope input.</p></div>
        <div class="ws-card"><strong>Delivery</strong><p>Build/configure integrations, unit/functional/integration testing, automation &amp; CI/CD, defect resolution, certification support.</p></div>
        <div class="ws-card"><strong>Release Readiness</strong><p>Integrated testing coordination, entry/exit criteria, operational readiness, deployment planning, go-live execution, hypercare transition.</p></div>
      </div>
    </div>
    <div class="learner-block">
      <h3>Client vs PwC roles (how to read the RACI)</h3>
      <p>The deck maps exemplar <strong>client</strong> and <strong>PwC</strong> roles—titles vary by engagement. Testing and release readiness are shown explicitly so accountability for <strong>production quality</strong> and <strong>go-live confidence</strong> stays visible (not buried “somewhere in delivery”).</p>
      <p class="subhead">Illustrative mapping (see Slide 9 for full list)</p>
      <ul class="compact-list">
        <li>Program / Integration Delivery Lead · Client Project Lead · RTE · Scrum Masters · PM support · Reporting Lead</li>
        <li>Integration Architecture Lead · Enterprise Architecture oversight · Platform/Cloud architects</li>
        <li>Delivery/Build Lead · Integration/API developers · Data engineers · DevOps/Platform · Test engineers · Testing Lead</li>
        <li>Release Manager · Environment/Deployment Lead · Ops &amp; Support Readiness · Testing/UAT coordination · Business Readiness Lead · IT Ops / DevOps / Environment support</li>
      </ul>
    </div>
    <div class="ai-panel">
      <h4>AI enablers by workstream (Slides 11–14)</h4>
      <p>These are the deck’s named accelerators—treat them as categories to map to your client-approved tools.</p>
      <table class="data-table data-table--dense">
        <thead><tr><th>Workstream</th><th>Role examples</th><th>Sample AI uses</th><th>Named tools (deck)</th></tr></thead>
        <tbody>
          <tr><td>PM</td><td>Integration Delivery Lead, PM/SM, RTE, PM support</td><td>Scenario modeling for trade-offs; consolidated signals; backlog/ceremony insights; dependency maps; RAID drafts; KPI anomaly detection</td><td>ProAct AI, SDLC Canvas, Jira/ADO agents, AgentOS</td></tr>
          <tr><td>Architecture</td><td>Integration lead, domain/security/data/platform architects</td><td>Pattern &amp; NFR validation; threat modeling; design alternatives; lineage &amp; data quality; environment simulation</td><td>SDLC Canvas, AgentOS, Design Draft/Canvas</td></tr>
          <tr><td>Delivery</td><td>Build lead, developers, DevOps, data, test</td><td>Code patterns &amp; tests; pipeline optimization; test coverage gaps; data mapping suggestions</td><td>SDLC Canvas, TestGenAI, Code Intel</td></tr>
          <tr><td>Release readiness</td><td>Release manager, env lead, ops readiness, UAT coord.</td><td>Release plan consolidation; deployment risk; runbook drafts; UAT scenarios &amp; progress signals</td><td>TestGen AI (UAT)</td></tr>
        </tbody>
      </table>
    </div>
    <div class="learner-block">
      <h3>Sample RACI — program view (Slide 15)</h3>
      <p>Executive sponsor and PM own integrated planning, RAID, and executive reporting. Architecture owns standards, NFR definition, design gates, and sign-off. Delivery owns backlog execution, build, SIT, performance/NFR validation, non-prod env readiness. Release readiness owns release planning, go/no-go, deployment execution, hypercare oversight.</p>
      <p class="tip"><strong>Study trick:</strong> Read across one row (e.g. “Go/No-Go”) to see every stream’s single letter—only one <strong>A/R</strong> per activity should drive the decision.</p>
    </div>
    <div class="learner-block">
      <h3>Scaled programs (Slide 10)</h3>
      <p>For larger SAFe-style programs, the same four streams still apply; map them to ARTs, system teams, and shared services. Use your program’s org chart to rename roles without losing accountability.</p>
    </div>
  `,

  mobilization: `
    <p class="deck-ref"><strong>Source:</strong> Slides 17–24, 108–110 · Mobilization deep dives</p>
    <div class="learner-block">
      <h3>Mobilization overview</h3>
      <p>Mobilization moves the engagement from <strong>approved scope</strong> to <strong>controlled execution</strong>. You are done when core workstreams are operational, Dev/CI/CD is validated for Sprint 1, NFRs exist at story level, the backlog is decomposed and sprint-ready (first pass), unit test standards are defined, and <strong>AI is embedded</strong> in backlog generation, mapping, validation, and reporting.</p>
    </div>
    <div class="learner-block">
      <h3>PMO: delivery plan (Slide 18)</h3>
      <ul>
        <li><strong>Cadence:</strong> Confirm sprint length (often 2 weeks) and alignment to enterprise milestones (SIT, UAT, cutover, SteerCo).</li>
        <li><strong>Integration Sprint Definition of Done:</strong> build complete &amp; peer reviewed; unit tests meet threshold; deployed to non-prod when applicable; traceable to requirements/design; platform standards (security, logging, errors) applied.</li>
        <li><strong>Backlog:</strong> Epics → sprint-ready stories (API, mapping, orchestration, NFR, enablers). <strong>AI-assisted refinement</strong> can draft acceptance criteria, flag missing NFRs, catch sizing inconsistencies, and sequence by dependencies.</li>
        <li><strong>Dependencies:</strong> Maintain integration inventory and context diagrams; tag dependencies in Jira/ADO; use <strong>AI-assisted dependency scanning</strong> for schedule conflicts.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>PMO: governance &amp; reporting (Slide 19)</h3>
      <ul>
        <li>Confirm decision rights for Integration Lead, Architect, PO, PMO, Release Lead; RACI for design, prioritization, readiness, escalation.</li>
        <li><strong>RAID:</strong> Use inventory/maps to spot high-complexity interfaces, vendor timing risks, performance-sensitive paths—with AI support. Launch RAID in Jira/Confluence; <strong>AI summarization</strong> for weekly status and trend escalation.</li>
        <li><strong>Status template:</strong> RAG, sprint vs commitment, risks/mitigations, dependency impacts, milestones (2–4 weeks); lock metric definitions; <strong>AI-assisted drafts</strong> from Jira/ADO.</li>
      </ul>
    </div>
    <div class="ai-panel">
      <h4>AI setup (Slides 20, 23)</h4>
      <p>The deck points to <strong>ProAct AI</strong> and SDLC lifecycle content for preliminary RAID items and status templates—coordinate with your program’s AI/SDLC lead for tenant-specific configuration before Sprint 1.</p>
    </div>
    <div class="learner-block">
      <h3>Architecture readiness (Slide 21)</h3>
      <p>Ensure approved architecture is <strong>consumable</strong>—clear APIs, patterns, deployment model, guardrails. Use AI as a structured peer reviewer for missing NFR coverage (latency, retry, idempotency, observability), ambiguous data ownership, and inconsistencies vs approved patterns. Translate NFRs into enforceable guardrails; publish patterns and decision trees; use <strong>AI pre-read summaries</strong> for exception forums.</p>
      <p class="subhead">Target artifacts</p>
      <ul>
        <li>Context diagrams, interaction flows, deployment topology, event/API patterns.</li>
        <li>NFRs: latency, throughput, retry/failover, residency, security, observability.</li>
        <li>Standards: OpenAPI/AsyncAPI, error framework, correlation IDs, versioning.</li>
        <li><strong>AI-accelerated drafts:</strong> sequence/context views, NFR traceability checks, consistency before approval.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Backlog activation (Slide 22)</h3>
      <p>Ingest designs into <strong>AI-assisted SDLC tooling</strong> to draft stories for APIs, mappings, orchestration, NFR enablers. Auto-generate acceptance criteria (positive, negative, edge, retry/failure). Enforce traceability story → design → inventory. Use AI to detect ambiguity, missing validation, missing NFR criteria, dependency conflicts; draft test cases; apply <strong>readiness scoring</strong> vs Definition of Done before sprint planning.</p>
      <p><strong>Exit:</strong> traceable, complete AC, dependencies sequenced, no architectural clarification needed in-sprint, AI readiness score meets threshold.</p>
    </div>
    <div class="learner-block">
      <h3>Platform &amp; environment readiness (Slides 24, 110)</h3>
      <p>Provision Sprint 1 Dev runtime and connectors; validate access, secrets, network/gateway paths. Activate CI/CD with rollback and security gates. Validate connectivity and test data before story work.</p>
      <p class="subhead">Technical checklist (Slide 110)</p>
      <ul class="compact-list">
        <li>CI/CD including build, test, deploy, rollback · connectors validated · Dev/Test/Prod capacity · network/firewall/routing · secrets &amp; cert rotation · logging/monitoring/alerting · non-prod deployment proof · platform limits/throttles understood</li>
      </ul>
      <p><strong>Exit:</strong> team can access Dev; at least one successful E2E Dev deployment; no open environment blockers.</p>
    </div>
    <div class="learner-block">
      <h3>Mobilization outputs (Slides 108–109)</h3>
      <ul>
        <li><strong>PM:</strong> Executable cadence, visible dependencies, RAID from day one; AI can seed RAID and status drafts.</li>
        <li><strong>Delivery:</strong> Sprint-ready backlog, shared DoD, AI-reviewed acceptance criteria (human-approved).</li>
      </ul>
    </div>
  `,

  agile: `
    <p class="deck-ref"><strong>Source:</strong> Slides 26–35, 27 (agentic AI), 100–107 (appendix ceremonies)</p>
    <div class="diagram-wrap">
      <svg class="diagram-svg" viewBox="0 0 760 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="100" height="50" rx="6" fill="#fff5ed" stroke="#fd5108" stroke-width="2"/><text x="60" y="48" text-anchor="middle" font-size="11" font-family="Arial">Align / backlog</text><text x="60" y="62" text-anchor="middle" font-size="9" fill="#555">inventory</text>
        <path d="M115 50 L135 50" stroke="#a1a8b3" stroke-width="2"/>
        <rect x="140" y="25" width="90" height="50" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="185" y="55" text-anchor="middle" font-size="11" font-family="Arial">Design</text>
        <path d="M235 50 L255 50" stroke="#a1a8b3" stroke-width="2"/>
        <rect x="260" y="25" width="90" height="50" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="305" y="55" text-anchor="middle" font-size="11" font-family="Arial">Build</text>
        <path d="M355 50 L375 50" stroke="#a1a8b3" stroke-width="2"/>
        <rect x="380" y="25" width="90" height="50" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="425" y="48" text-anchor="middle" font-size="11" font-family="Arial">Unit /</text><text x="425" y="62" text-anchor="middle" font-size="11" font-family="Arial">assembly</text>
        <path d="M475 50 L495 50" stroke="#a1a8b3" stroke-width="2"/>
        <rect x="500" y="25" width="100" height="50" rx="6" fill="#ffe8d4" stroke="#fe7c39" stroke-width="2"/><text x="550" y="48" text-anchor="middle" font-size="11" font-family="Arial">SIT / sprint</text><text x="550" y="62" text-anchor="middle" font-size="11" font-family="Arial">demo</text>
        <path d="M605 50 L625 50" stroke="#a1a8b3" stroke-width="2"/>
        <rect x="630" y="25" width="120" height="50" rx="6" fill="#f5f7f8" stroke="#a1a8b3" stroke-width="2"/><text x="690" y="55" text-anchor="middle" font-size="11" font-family="Arial">Release path</text>
      </svg>
      <p class="diagram-caption">Simplified integration delivery flow (see Slide 26 for full lifecycle and “pro tips”).</p>
    </div>
    <div class="learner-block">
      <h3>Agile integration delivery model (Slide 26)</h3>
      <p>From aligned backlog and artifacts (process flows, inventory, context diagrams), teams produce functional specs and data mapping, technical specs in cross-functional design sessions, then build/unit test, assembly testing, and feed SIT. <strong>Pro tips from the deck:</strong> use PwC AI assets for design, mapping, and code generation; use standard templates; document positive and negative scenarios early; align on mappings before build.</p>
    </div>
    <div class="ai-panel">
      <h4>Agentic AI across the lifecycle (Slide 27)</h4>
      <table class="data-table data-table--dense">
        <thead><tr><th>Phase</th><th>AI acceleration (deck)</th></tr></thead>
        <tbody>
          <tr><td>Design</td><td>OpenAPI/AsyncAPI drafts from stories, payloads, canonical models; accelerated mappings, transforms, code lists, validation rules.</td></tr>
          <tr><td>Build &amp; unit test</td><td>Code review for anti-patterns, observability, errors, security; unit tests from specs including boundaries and errors.</td></tr>
          <tr><td>Integration testing</td><td>Synthetic compliant test data; orchestrated E2E flows from contracts, dependencies, environment readiness.</td></tr>
          <tr><td>Release &amp; go-live</td><td>Evidence packs (tests, scans, changelog, runbook deltas); go/no-go checks; cutover steps and rollback decision points.</td></tr>
          <tr><td>Hypercare</td><td>Observability correlation and root-cause hypotheses; incident clustering, failure modes, backlog fixes.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="learner-block">
      <h3>What makes integration delivery different (Slide 28)</h3>
      <ul>
        <li><strong>Cross-system coordination</strong> — dependencies, vendors, environment sync; failures when readiness lags backlog.</li>
        <li><strong>NFR readiness</strong> — latency, throughput, retries, idempotency, monitoring, traceability.</li>
        <li><strong>Contract discipline</strong> — versioning, backward compatibility, consumer impact assessment.</li>
        <li><strong>Regression risk</strong> — many consumers; automation is mandatory.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Ceremonies (Slides 29–34)</h3>
      <p><strong>Team:</strong> planning, daily stand-up, backlog refinement (1–2 iterations ahead), review, retrospective—time-boxed (Slide 30).</p>
      <p><strong>Program:</strong> PI planning prep, PI planning, Scrum of Scrums, PO sync, system demo, architecture board, inspect &amp; adapt (Slide 31).</p>
      <p><strong>Backlog grooming (Slide 32):</strong> PO/BA presents AC; SM ensures depth; dev/test estimate and clarify; typical cadence ~1 hr twice per sprint; outcomes: prioritized backlog, sprint-ready stories, dependencies noted.</p>
      <p><strong>System demo (Slide 33):</strong> end-of-iteration integrated demo to stakeholders; RTE schedules; agenda includes PI context, accomplishments, integrated demo, risks, feedback—target ~1 hour.</p>
      <p><strong>Two-week calendar (Slide 34):</strong> overlays team ceremonies with cross-program touchpoints (SoS, PO sync, system demo, PI prep).</p>
    </div>
    <div class="learner-block">
      <h3>Automation &amp; tooling (Slide 35)</h3>
      <p><strong>Confluence / Azure DevOps Wiki</strong>—central docs for requirements, designs, specs, runbooks. <strong>OpenAPI/RAML</strong> for contracts. <strong>Postman/SoapUI</strong> for API validation; <strong>JMeter</strong> for load. <strong>Concourse Delivery Platform</strong>—PDM, tools, accelerators, <strong>GenAI</strong> embedded. <strong>Jira / Azure Boards</strong>—AI-assisted tracking. <strong>Git repos + Ansible/Jenkins/Azure DevOps</strong> for CI/CD.</p>
    </div>
  `,

  testing: `
    <p class="deck-ref"><strong>Source:</strong> Slides 37–52 · Testing &amp; quality (appendix Slide 97–98 for cycle definitions)</p>
    <div class="diagram-wrap">
      <svg class="diagram-svg" viewBox="0 0 720 88" xmlns="http://www.w3.org/2000/svg">
        <g font-family="Arial,sans-serif" font-size="11">
          <rect x="8" y="20" width="108" height="48" rx="6" fill="#fff5ed" stroke="#fd5108" stroke-width="2"/><text x="62" y="40" text-anchor="middle">1 Strategy &amp;</text><text x="62" y="54" text-anchor="middle">scenarios</text>
          <rect x="128" y="20" width="108" height="48" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="182" y="40" text-anchor="middle">2 Planning &amp;</text><text x="182" y="54" text-anchor="middle">sequencing</text>
          <rect x="248" y="20" width="108" height="48" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="302" y="40" text-anchor="middle">3 Cases &amp;</text><text x="302" y="54" text-anchor="middle">automation</text>
          <rect x="368" y="20" width="108" height="48" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="422" y="40" text-anchor="middle">4 Defect</text><text x="422" y="54" text-anchor="middle">intelligence</text>
          <rect x="488" y="20" width="108" height="48" rx="6" fill="#fff" stroke="#cbd1d6" stroke-width="2"/><text x="542" y="40" text-anchor="middle">5 SIT / E2E</text><text x="542" y="54" text-anchor="middle">execution</text>
          <rect x="608" y="20" width="104" height="48" rx="6" fill="#ffe8d4" stroke="#fe7c39" stroke-width="2"/><text x="660" y="40" text-anchor="middle">6 UAT &amp;</text><text x="660" y="54" text-anchor="middle">business</text>
        </g>
        <path d="M116 44 L128 44 M236 44 L248 44 M356 44 L368 44 M476 44 L488 44 M596 44 L608 44" stroke="#a1a8b3" stroke-width="2"/>
      </svg>
      <p class="diagram-caption">AI-enabled integration testing sequence (Slide 37)—predictive, risk-driven model across the ecosystem.</p>
    </div>
    <div class="ai-panel">
      <h4>AI-enabled test scope (Slide 38)</h4>
      <p>Artifact analysis across blueprints, architectures, contracts, and models → impact mapping and <strong>heat maps</strong> across systems/releases; classify functional vs NFR impact; generate scenario ideas; detect cross-workstream dependency ripples. <strong>Outcomes:</strong> faster scope definition, risk-based prioritization, early high-risk identification, tighter regression targeting, shared stakeholder clarity.</p>
    </div>
    <div class="learner-block">
      <h3>AI-orchestrated integrated planning (Slide 39)</h3>
      <p>Consolidate product test plans into one integration roadmap; automated dependency and impact mapping; predictive sequencing and readiness scoring; prioritize critical business journeys and risky clusters; shift-left signals from architectural risk. <strong>Benefits:</strong> fewer sequencing conflicts, better environment utilization, earlier systemic risk detection.</p>
    </div>
    <div class="learner-block">
      <h3>Iterative test case development (Slide 40)</h3>
      <ul>
        <li><strong>Authoring:</strong> cases from API specs, stories, architecture; map upstream/downstream; positive/negative/boundary/failure paths; gap detection on transforms and events.</li>
        <li><strong>Quality check:</strong> traceability, duplicate detection, pattern standards, weak assertions.</li>
        <li><strong>SME loop:</strong> summarize feedback into structured updates; learn from recurring themes.</li>
        <li><strong>Automation:</strong> candidates by stability; regression sets impacted by changes; NFR scenarios from architecture; refine from defects/incidents.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Tooling &amp; real-time visibility (Slide 41)</h3>
      <p>Four pillars: (1) execution visibility—Jira intelligence, Azure DevOps Copilot, TestRail plugins; (2) defects/dependencies—ServiceNow AI Ops, Dynatrace, GitHub Copilot; (3) asset repository—qTest, Zephyr, AI plugins; (4) collaboration &amp; automation—Teams/SharePoint Copilot, Confluence, pipelines.</p>
    </div>
    <div class="learner-block">
      <h3>Certification &amp; feature sets (Slide 42)</h3>
      <p>Feature sets tested manually once then regression each iteration; certification is the quality gate before release; pre-certification reduces risk incrementally; E2E certification confirms release readiness across functional and NFR dimensions.</p>
    </div>
    <div class="learner-block">
      <h3>Test types in the playbook (Slides 43–46, 51)</h3>
      <ul>
        <li><strong>Functional:</strong> features behave per requirements; regression on impacted flows.</li>
        <li><strong>Integration:</strong> process/data across ecosystem; often majority of certification defects.</li>
        <li><strong>Non-functional:</strong> performance, load, failover, config—often after ~70% scripts pass; frequently off-hours execution.</li>
        <li><strong>UAT:</strong> business perspective; ~70–80% certification complete; preparation/execution/defect tracks (Slides 47–50).</li>
        <li><strong>Migration:</strong> data integrity and behavior across legacy→cloud moves when in scope.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>UAT entry/exit snapshot (Slide 50)</h3>
      <p>Illustrative thresholds from deck: e.g. entry may require prior test stages complete; exit often targets high pass rates and major defect closure—always confirm with your program’s signed criteria.</p>
    </div>
    <div class="ai-panel">
      <h4>Shift-left + AI (Slide 52)</h4>
      <p>Shift-left finds defects earlier; AI automates creation, execution, and analysis for faster feedback and broader coverage—the combination is positioned as a primary quality strategy for modern delivery.</p>
    </div>
  `,

  release: `
    <p class="deck-ref"><strong>Source:</strong> Slides 54–61 · Release management</p>
    <div class="learner-block">
      <h3>Why integration releases are hard (Slide 54)</h3>
      <ul>
        <li><strong>Multi-system</strong> — rollback complexity; AI can map dependencies and conflicts early.</li>
        <li><strong>Environments</strong> — hybrid drift; AI validation of configuration.</li>
        <li><strong>Consumers</strong> — external API/event consumers; versioning and comms.</li>
        <li><strong>Concurrent trains</strong> — alignment across asynchronous schedules; scheduling and dependency visualization.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Release manifest (Slides 55–56)</h3>
      <p>One manifest per release: asset name/version (API, event, pipeline, orchestration), source/target systems, upstream dependencies, downstream consumers, env-specific config, rollback procedure/time, owner/sign-off.</p>
      <p><strong>Accelerate with AI:</strong> draft plan from sprint/milestone data, dependency maps, inventory metadata, API catalog; Release Manager reviews. Tag dependency chains; <strong>AI dependency graphs</strong> for cycles/conflicts. Coordinate timing with upstream/downstream; <strong>AI scan of Jira-style data</strong> for conflicts and missing readiness.</p>
    </div>
    <div class="learner-block">
      <h3>Release plan approved when (Slide 57)</h3>
      <ul>
        <li>Manifest complete—assets, versions, dependencies, owners.</li>
        <li>Sequence validated against dependency map.</li>
        <li>Consumer leads acknowledged scope/timing.</li>
        <li>Rollback documented per asset.</li>
        <li>Environment readiness confirmed for target path.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Release Definition of Done (Slide 58)</h3>
      <p><strong>Functional:</strong> stories meet sprint DoD; SIT passed for release assets; E2E business flows validated; Sev1 clear; Sev2 closed or workaround approved.</p>
      <p><strong>Contract:</strong> APIs versioned in catalog; event schemas registered; backward compatibility or migration confirmed; no unapproved schema drift test→prod.</p>
      <p><strong>NFR &amp; deploy:</strong> performance vs SLAs; retry/idempotency/failover; security scans; CI/CD to pre-prod with production-equivalent artifact/config; rollback tested; secrets/endpoints/flags verified.</p>
    </div>
    <div class="learner-block">
      <h3>Versioning &amp; consumers (Slide 59)</h3>
      <p>Breaking changes without versioning break consumers silently. Use <strong>semantic versioning</strong> aligned with Architecture: MAJOR = breaking (coordinate consumers); MINOR = additive; PATCH = fix. <strong>AI-powered contract analysis</strong> (e.g. SDLC Canvas, design agents) can diff contracts vs registered consumers to surface breaking changes faster than manual review. Platform-as-product releases follow the same clarity rules.</p>
    </div>
    <div class="learner-block">
      <h3>Release cadence models (Slide 60)</h3>
      <table class="data-table">
        <thead><tr><th>Model</th><th>Cadence</th><th>Best for</th><th>Governance</th></tr></thead>
        <tbody>
          <tr><td>A — PI aligned</td><td>~10–12 weeks</td><td>Heavy dependencies, regulated or immature platforms</td><td>Full go/no-go; extended hypercare</td></tr>
          <tr><td>B — Sprint aligned</td><td>~2 weeks</td><td>Stable platform, strong CI/CD</td><td>Lighter checklist; automated gates</td></tr>
          <tr><td>C — Continuous</td><td>Per quality gate pass</td><td>Mature DevSecOps, feature flags, canary</td><td>Automated gates; human override for breaking changes</td></tr>
        </tbody>
      </table>
      <p>Most DIA programs start at A or B and mature toward C.</p>
    </div>
    <div class="ai-panel">
      <h4>After deploy: production health (Slide 61)</h4>
      <p>Release completes when production is <strong>healthy</strong>, not when deploy finishes. First 2h: smoke, sample E2E flows, monitoring/logs/correlation IDs. First 24h: error rates/latency vs baselines—<strong>AI can flag statistical anomalies</strong> beyond static thresholds. First 72h: batches/events complete cycles; review defects; <strong>AI incident correlation</strong>; update runbooks; hand off to hypercare.</p>
    </div>
  `,

  businessReadiness: `
    <p class="deck-ref"><strong>Source:</strong> Slides 64–74 · Business readiness, change, training</p>
    <div class="learner-block">
      <h3>Five business readiness workstreams (Slide 64)</h3>
      <ul>
        <li><strong>Business Acceptance Testing</strong> — usability sign-off; aligns expectations to delivered functionality.</li>
        <li><strong>Change Leadership</strong> — change strategy and communications for shared understanding of change and program objectives.</li>
        <li><strong>Process &amp; Procedure Management</strong> — policies, SOPs, enterprise adherence.</li>
        <li><strong>Department Readiness</strong> — business-as-usual continuity during transition.</li>
        <li><strong>Training</strong> — skills and tools for new processes.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Process &amp; procedure management (Slides 65–66)</h3>
      <p>Steps: determine update approach → procedure backlog (update/new/remove) → author &amp; review → publish plan → publish to frontline. Impact assessment on how processes/policies change with program requirements; project plan with owners and milestones; align timelines with UAT and training; support Training, UAT, QA, and frontline.</p>
    </div>
    <div class="learner-block">
      <h3>Business-facing UAT themes (Slide 67)</h3>
      <p>Validate <strong>effectiveness</strong> (can users complete tasks accurately?), <strong>efficiency</strong> (effort vs legacy?), and <strong>satisfaction</strong>. Develop strategy/plan; end-to-end business scenarios from requirements; test data strategy with testing teams; capability/release-based testing per integrated release plan; coordinate defect resolution; sign off low-priority issues with communications.</p>
    </div>
    <div class="learner-block">
      <h3>Department readiness (Slide 68)</h3>
      <p>Identify impacted departments; resource plans; department-specific changes and day-of-ops planning; tailored comms/guides/handbooks; refresh as scope changes.</p>
    </div>
    <div class="learner-block">
      <h3>Change leadership maturity (Slide 69)</h3>
      <p>Stages: awareness → understanding → acceptance → advocacy. Nominate champions; align vision before build; agree time commitment; escalate decisions; continuous engagement for culture.</p>
    </div>
    <div class="learner-block">
      <h3>Change management scope (Slides 71–72)</h3>
      <p>Covers leadership alignment, process/SOP changes, training, department readiness, BAT. <strong>Why it matters:</strong> correct integration behaviors, less disruption, sustained value post-go-live. Activities: impact assessment; champions; communications; procedure updates aligned to UAT/training; blended learning; operational readiness; scenario-based UAT sign-off.</p>
    </div>
    <div class="learner-block">
      <h3>Training blend (Slide 74)</h3>
      <p>ILT for clarity and engagement; eLearning for scale; super-users for targeted help; OJT close to go-live; war rooms/QRCs/support lines at go-live. Mix methods across pre-launch, just-in-time, and post-implementation.</p>
    </div>
    <div class="ai-panel">
      <h4>AI tie-in</h4>
      <p>Business readiness content in the deck is people- and process-centric. Pair it with <strong>AI-assisted comms drafts</strong>, <strong>training personalization</strong>, and <strong>chatbots</strong> on procedure libraries where your organization allows—always with human review for regulated messaging.</p>
    </div>
  `,

  golive: `
    <p class="deck-ref"><strong>Source:</strong> Slides 82–85 · Go-Live &amp; go/no-go</p>
    <div class="learner-block">
      <h3>Go-Live decision (Slide 82)</h3>
      <p>Final checkpoint before end-user availability: testing complete, critical issues addressed, business and technical alignment. Use a <strong>go/no-go checklist</strong> for transparency.</p>
      <p class="subhead">Common criteria areas</p>
      <ul>
        <li>Regression &amp; impact testing retested; integrated systems behaving.</li>
        <li>Test completion &amp; coverage of planned/critical scenarios.</li>
        <li>Critical/high defects resolved or accepted with mitigation.</li>
        <li>Formal sign-offs from business and QA.</li>
        <li>Cutover &amp; hypercare plans documented and tested.</li>
        <li>Outstanding risks accepted or mitigated.</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Four dimensions of activation readiness (Slide 83)</h3>
      <table class="data-table data-table--dense">
        <thead><tr><th>Tech readiness</th><th>Business readiness</th><th>Staffing readiness</th><th>External readiness</th></tr></thead>
        <tbody>
          <tr>
            <td>Apps tested/certified; production env ready for volume; infrastructure in place; point-of-no-return checklist</td>
            <td>Training complete; cutover awareness; knowledge transfer; contingency workarounds; procedures documented/distributed; CM/BAT activities complete</td>
            <td>Staffing levels scheduled</td>
            <td>Logistics addressed; external comms sent; vendors/partners ready</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="learner-block">
      <h3>Go/No-Go meeting (Slide 84)</h3>
      <p><strong>Goals:</strong> review scope, defects, quality, deliverables; confirm readiness to deploy; review open issues and short-term workarounds. <strong>Timing:</strong> at least one week before release (or earlier). <strong>Attendees:</strong> release readiness, PM, IT delivery, business, steering as needed. <strong>Decision maker:</strong> steering/leadership from release manager and business inputs. <strong>Artifacts:</strong> checklist, dashboard, workarounds list, resolution timeline for non-critical issues.</p>
    </div>
    <div class="learner-block">
      <h3>Outcomes (Slide 85)</h3>
      <ul>
        <li><strong>Approved</strong> — proceed; finalize command center plan.</li>
        <li><strong>Conditional</strong> — proceed with documented mitigations and cutover updates.</li>
        <li><strong>Deferred</strong> — address blockers; reschedule decision.</li>
      </ul>
    </div>
    <div class="ai-panel">
      <h4>AI support</h4>
      <p>Use AI to <strong>cross-check checklist completeness</strong> against RAID, test summaries, and known defects; generate <strong>executive one-pagers</strong> of readiness status—always validate against source systems.</p>
    </div>
  `,

  hypercare: `
    <p class="deck-ref"><strong>Source:</strong> Slides 87–89 · Post go-live &amp; hypercare</p>
    <div class="learner-block">
      <h3>Post go-live transition (Slide 87)</h3>
      <p>After testing: transfer firm-managed processes to client; resolve PwC-owned defects; prepare extended hypercare if in scope. If another test cycle exists, reuse prior cases as templates.</p>
      <p><strong>Hypercare support:</strong> monitor performance; defect resolution and fixes in production (ownership per contract).</p>
      <p><strong>Knowledge transfer:</strong> sessions to upskill client users on PwC-owned processes.</p>
      <p><strong>Data validation:</strong> migrated data/tools accurate and aligned to legacy objectives.</p>
      <p><strong>Next cycle prep:</strong> if applicable, scope review and Jira/dashboard updates.</p>
    </div>
    <div class="learner-block">
      <h3>Hypercare logistics checklist (Slide 88)</h3>
      <ul>
        <li>Structure, teams, detailed process flow, walkthrough scenarios, scripts, resource assignments.</li>
        <li><strong>After-care (ACS) handoffs:</strong> resource plan alignment; daily stand-up/stand-down; leadership cadence; knowledge base articles; call tracker format feeding hypercare report.</li>
        <li><strong>Command center:</strong> rooms, critical metrics in report, business leadership on daily call.</li>
        <li><strong>Production support:</strong> reporting/dashboards, PROD stack for integrated testing, PROD deploy cadence for hypercare bundles.</li>
        <li><strong>Help desk:</strong> KB articles with ticket routing keywords; IVR for P1 during hypercare.</li>
      </ul>
    </div>
    <div class="ai-panel">
      <h4>AI touchpoints (Slide 88)</h4>
      <p><strong>Reporting &amp; metrics:</strong> AI can aggregate incident metrics, summarize recent events, and distribute leadership reports faster.</p>
      <p><strong>Knowledge transfer:</strong> Generative AI (e.g. Copilot, ChatGPT where approved) can <strong>draft KB articles</strong> from technical documentation—human review before publish.</p>
    </div>
    <div class="learner-block">
      <h3>Defect management expectations (Slide 89)</h3>
      <p>The deck includes severity-based response, acknowledgement, follow-up, escalation, and correction-time placeholders—treat as a template to align with client SLAs, not as fixed contractual timing.</p>
    </div>
  `,

  reporting: `
    <p class="deck-ref"><strong>Source:</strong> Slides 75–80 (section headers); detailed AI reporting tied in Slides 11, 19, 41, 61, 88</p>
    <div class="learner-block">
      <h3>Reporting layers in the playbook</h3>
      <p>Slides 76–80 title four metric families—use them to structure dashboards your program actually reads weekly:</p>
      <ul>
        <li><strong>Integration KPIs</strong> — delivery health of integration work (throughput, defect leakage, milestone variance, dependency slips).</li>
        <li><strong>Workstream reporting</strong> — PM, Architecture, Delivery, Release each show status vs plan and blockers.</li>
        <li><strong>Program reporting</strong> — cross-stream milestones, SteerCo views, PI/sprint alignment.</li>
        <li><strong>Platform health metrics</strong> — stability, incidents, capacity, pipeline success.</li>
        <li><strong>Governance metrics</strong> — standards compliance, gate adherence, audit evidence readiness.</li>
      </ul>
    </div>
    <div class="ai-panel">
      <h4>AI-enhanced reporting (from deck themes)</h4>
      <ul>
        <li><strong>Automated KPI aggregation &amp; narratives</strong> for leadership (PM/Reporting Lead — Slide 11).</li>
        <li><strong>Anomaly detection</strong> on velocity, defects, readiness (Slide 11).</li>
        <li><strong>RAID &amp; status draft generation</strong> from Jira/ADO (Slide 19).</li>
        <li><strong>Test execution visibility</strong> with AI plugins in ALM/test tools (Slide 41).</li>
        <li><strong>Post-release statistical deviation</strong> vs baselines (Slide 61).</li>
        <li><strong>Hypercare summaries</strong> for leadership (Slide 88).</li>
      </ul>
    </div>
    <div class="learner-block">
      <h3>Practices for new learners</h3>
      <p>Agree the <strong>three leadership metrics</strong> that trigger action; wire data once; avoid duplicate slide decks. Lock definitions early (Slide 19 “metric drift”).</p>
    </div>
  `,

  tooling: `
    <p class="deck-ref"><strong>Source:</strong> Slides 35, 90–93 · Tooling &amp; templates</p>
    <div class="learner-block">
      <h3>Tool categories (Slide 91)</h3>
      <table class="data-table">
        <thead><tr><th>Category</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>ALM</td><td>Plan → requirements → test → deploy traceability</td></tr>
          <tr><td>Collaboration</td><td>Shared execution toward common objectives; content collaboration</td></tr>
          <tr><td>Knowledge repository</td><td>Captured, organized knowledge (wiki, SharePoint)</td></tr>
          <tr><td>Testing</td><td>Authoring and execution; cross-browser and API</td></tr>
        </tbody>
      </table>
      <p>Client tool preferences take precedence—map playbook patterns to their stack.</p>
    </div>
    <div class="learner-block">
      <h3>Integration delivery stack (Slide 35 recap)</h3>
      <p>Wiki/ADO docs; OpenAPI/RAML; Postman/SoapUI; JMeter; Concourse with <strong>GenAI</strong>; Jira/Azure Boards with AI assistance; Git repos; Ansible/Jenkins/Azure DevOps automation.</p>
    </div>
    <div class="ai-panel">
      <h4>AI in tooling</h4>
      <p>Expect <strong>Copilot-style assistance</strong> in Jira/ADO, Confluence/Teams/SharePoint, GitHub, test tools, and observability platforms. Standardize which features are approved, what data can enter models, and required human review—especially for client environments.</p>
    </div>
    <div class="learner-block">
      <h3>Templates (Slide 93)</h3>
      <p>Store canonical templates in the SharePoint accelerator library: status decks, RAID, integration inventory, manifest, runbooks, UAT plans, hypercare checklists—copy forward each engagement.</p>
    </div>
  `,

  appendix: `
    <p class="deck-ref"><strong>Source:</strong> Slides 94–110 · Appendix &amp; deep references</p>
    <div class="learner-block">
      <h3>Execution boundary &amp; sub-offerings (Slide 95)</h3>
      <p>The playbook sits in the <strong>integration delivery at scale</strong> execution lane alongside large solution delivery—connected to strategy/architecture sub-offerings but focused on implementation mechanics with <strong>AI accelerators</strong>.</p>
    </div>
    <div class="learner-block">
      <h3>Testing cycle definitions (Slides 97–98)</h3>
      <p><strong>Unit</strong>—per build story; evidence uploaded for traceability. <strong>SIT 1–3</strong>—integrated environment behavior vs requirements between systems. <strong>E2E</strong>—full path with upstream/downstream; parallels SIT2–3, ends in SIT3. <strong>UAT</strong>—customer validation in production-like environment. <strong>Automation</strong>—reusable, ADO-integrated, baseline functional cases. <strong>Performance</strong>—SLA validation. <strong>Load/stress</strong>—normal vs threshold limits. <strong>Pen test</strong>—security; cyber-owned; SQE documents dates when executed.</p>
    </div>
    <div class="learner-block">
      <h3>Program ceremonies — 10-week PI lens (Slide 100)</h3>
      <p>Example calendar with PI planning prep, Scrum of Scrums, PO/PM sync across weeks—use as a pattern when your program runs PI boundaries.</p>
    </div>
    <div class="learner-block">
      <h3>DevSecOps &amp; platform enablement (Slide 101)</h3>
      <p>NeuroMesh-style framing: Agile (business + IT), DevSecOps (dev + ops), Cloud Native (dev + infrastructure) breaking down silos; continuous integration/delivery/deployment/security; SRE; APIs, events, microservices, containers, PaaS/serverless—supporting faster value, flexibility, and customer satisfaction.</p>
    </div>
    <div class="learner-block">
      <h3>ART roles summary (Slides 102, 104–106)</h3>
      <p>Program-level: Business Product Managers, Delivery Leaders, Solution Architects, RTE, LPM/EA, etc. Team-level: SM, PO, Tech Lead, DevOps—ceremonies from daily stand-up through PI events. Use these slides when mapping client pod structures to playbook workstreams.</p>
    </div>
    <div class="learner-block">
      <h3>Communication &amp; decisions (Slide 107)</h3>
      <p>Daily stand-ups; preference for face-to-face/video; information radiators (boards, Jira/ADO); demos/retros; PO owns backlog prioritization; consensus for planning; last responsible moment for reversible decisions.</p>
    </div>
    <div class="learner-block">
      <h3>Sample RACI — workstream view (Slide 103)</h3>
      <p>16 governance activities with R/A/C/I across workstreams—update after SME review per deck note.</p>
    </div>
    <div class="learner-block">
      <h3>Optional mapping (Slide 99)</h3>
      <p>Use the “which sections matter most per sub-offering” view when scoping a lighter-weight read for a specific engagement type.</p>
    </div>
  `,
};
