# Agent 3: UX & PATH LOGIC Patches

## Change 1: Fix medium path selection (add scenario 11)

**FIND:**
```javascript
const EXAMINED_IDS = [0,1,2,3,4,5,6,7,8,13,15,17,18,22];
```

**REPLACE:**
```javascript
const EXAMINED_IDS = [0,1,2,3,4,5,6,7,8,11,13,15,17,18,22];
```

**Explanation:** Added scenario 11 (The Untranslatable - language/phenomenology) to bring the examined path to 15 scenarios (plus The Last Question = 16 total). This adds strong coverage of language philosophy and unique axis weightings (rationalist:-2, transcendent:2) that weren't well represented in the current medium path.

---

## Change 2: Path card mobile layout

**Status:** ✅ Already fixed in CSS! The media query at `@media (max-width: 600px)` already includes `.paths { grid-template-columns: 1fr; }` on line ~2246. No change needed.

---

## Change 3: Fix maxP calculation (proportional formula)

**FIND:**
```javascript
  const maxP = activeScenarios.length <= 10 ? 6 : activeScenarios.length <= 15 ? 8 : 10;
```

**REPLACE:**
```javascript
  const maxP = Math.round(Math.min(activeScenarios.length * 0.6, 14));
```

**Explanation:** Replace all 4 occurrences in the file (lines ~1918, ~2125, ~2369, ~2394). The new formula scales proportionally with scenario count and caps at 14, giving better normalization for any path length. For the examined path (16 scenarios): 16 * 0.6 = 9.6 → rounds to 10.

**Additional occurrences to replace (same FIND/REPLACE):**
- In `showResults()` function (appears once)
- In `copyResults()` function (appears once)  
- In `emailResults()` function (appears twice)

---

## Change 4: Add deliberation time tracking

**FIND:**
```javascript
let currentScenario = 0;
let activeScenarios = [];
let scores = {};
let answers = [];
let selectedChoice = null;
let selectedPath = null;
let traditions = {};
```

**REPLACE:**
```javascript
let currentScenario = 0;
let activeScenarios = [];
let scores = {};
let answers = [];
let selectedChoice = null;
let selectedPath = null;
let traditions = {};
let deliberationTimes = [];
let scenarioStartTime = null;
```

---

**FIND:**
```javascript
function resetScores() {
  scores = {};
  for (const k of Object.keys(AXES)) scores[k] = 0;
  traditions = {};
}
```

**REPLACE:**
```javascript
function resetScores() {
  scores = {};
  for (const k of Object.keys(AXES)) scores[k] = 0;
  traditions = {};
  deliberationTimes = [];
  scenarioStartTime = null;
}
```

---

**FIND:**
```javascript
function renderScenario() {
  const s = activeScenarios[currentScenario];
  selectedChoice = null;
```

**REPLACE:**
```javascript
function renderScenario() {
  const s = activeScenarios[currentScenario];
  selectedChoice = null;
  scenarioStartTime = Date.now();
```

---

**FIND:**
```javascript
function selectChoice(idx) {
  if (selectedChoice !== null) return;
  selectedChoice = idx;
  const s = activeScenarios[currentScenario];
  const c = s.choices[idx];
```

**REPLACE:**
```javascript
function selectChoice(idx) {
  if (selectedChoice !== null) return;
  selectedChoice = idx;
  const deliberationTime = scenarioStartTime ? (Date.now() - scenarioStartTime) / 1000 : 0;
  deliberationTimes.push({
    scenarioIndex: currentScenario,
    scenarioTitle: activeScenarios[currentScenario].title,
    time: deliberationTime
  });
  const s = activeScenarios[currentScenario];
  const c = s.choices[idx];
```

---

**FIND:**
```javascript
  currentArchetype = archetype;
  renderReadings(archetype);
  loadWall();

  const portrait = document.getElementById('portrait');
```

**REPLACE:**
```javascript
  currentArchetype = archetype;
  renderReadings(archetype);
  renderDeliberationInsights();
  loadWall();

  const portrait = document.getElementById('portrait');
```

---

**FIND (add before the emailResults function):**
```javascript
function emailResults() {
```

**REPLACE:**
```javascript
function renderDeliberationInsights() {
  if (!deliberationTimes || deliberationTimes.length === 0) return;
  
  const sorted = [...deliberationTimes].sort((a, b) => b.time - a.time);
  const longest = sorted[0];
  const shortest = sorted[sorted.length - 1];
  
  const insightsHTML = `
    <div class="consistency-section" style="margin-top: 2rem;">
      <div class="consistency-header">
        <div class="consistency-title">DELIBERATION INSIGHTS</div>
        <div class="consistency-message">how you thought through each dilemma</div>
      </div>
      <div class="consistency-observation">
        <div class="consistency-observation-label">longest deliberation</div>
        <p class="consistency-observation-text">
          <strong>${longest.scenarioTitle}</strong> — ${longest.time.toFixed(1)}s<br>
          <em style="color: var(--text-faint);">This one made you pause. The hardest questions are often the most revealing.</em>
        </p>
      </div>
      <div class="consistency-observation">
        <div class="consistency-observation-label">fastest decision</div>
        <p class="consistency-observation-text">
          <strong>${shortest.scenarioTitle}</strong> — ${shortest.time.toFixed(1)}s<br>
          <em style="color: var(--text-faint);">You knew your answer immediately. Sometimes clarity arrives before the question finishes.</em>
        </p>
      </div>
      <div class="consistency-footer">
        <p>Average deliberation time: ${(deliberationTimes.reduce((sum, t) => sum + t.time, 0) / deliberationTimes.length).toFixed(1)}s per scenario</p>
      </div>
    </div>
  `;
  
  const readingsSection = document.getElementById('readings-section');
  readingsSection.insertAdjacentHTML('afterend', insightsHTML);
}

function emailResults() {
```

---

## Change 5: Add "Further Exploration" section

**FIND:**
```javascript
function renderReadings(archetype) {
  const section = document.getElementById('readings-section');
  const books = READINGS[archetype.name] || READINGS['The Philosophical Pluralist'];

  section.innerHTML = `
    <div class="readings-title">RECOMMENDED READING</div>
    <div class="readings-grid">
      ${books.map(b => `
        <div class="reading-card">
          <div class="reading-book">${b.title}</div>
          <div class="reading-author">${b.author}</div>
          <div class="reading-why">${b.why}</div>
        </div>
      `).join('')}
    </div>
  `;
}
```

**REPLACE:**
```javascript
function renderReadings(archetype) {
  const section = document.getElementById('readings-section');
  const books = READINGS[archetype.name] || READINGS['The Philosophical Pluralist'];

  section.innerHTML = `
    <div class="readings-title">RECOMMENDED READING</div>
    <div class="readings-grid">
      ${books.map(b => `
        <div class="reading-card">
          <div class="reading-book">${b.title}</div>
          <div class="reading-author">${b.author}</div>
          <div class="reading-why">${b.why}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="readings-title" style="margin-top: 3rem;">FURTHER EXPLORATION</div>
    <div class="readings-grid">
      <div class="reading-card">
        <div class="reading-book" style="font-style: normal; font-weight: 600;">FILM</div>
        <div class="reading-author" style="margin-bottom: 0.8rem; opacity: 0.6;">visual philosophy</div>
        <div class="reading-why">
          <strong>12 Angry Men</strong> — justice through deliberation<br>
          <strong>Stalker</strong> (Tarkovsky) — desire and meaning<br>
          <strong>After Life</strong> (Koreeda) — memory and identity<br>
          <strong>Incendies</strong> — truth and consequences
        </div>
      </div>
      
      <div class="reading-card">
        <div class="reading-book" style="font-style: normal; font-weight: 600;">DOCUMENTARY</div>
        <div class="reading-author" style="margin-bottom: 0.8rem; opacity: 0.6;">philosophy in practice</div>
        <div class="reading-why">
          <strong>The Examined Life</strong> (2008) — philosophers walking<br>
          <strong>Waking Life</strong> (2001) — animated philosophical dialogue
        </div>
      </div>
      
      <div class="reading-card">
        <div class="reading-book" style="font-style: normal; font-weight: 600;">GAMES</div>
        <div class="reading-author" style="margin-bottom: 0.8rem; opacity: 0.6;">interactive ethics</div>
        <div class="reading-why">
          <strong>Disco Elysium</strong> — political philosophy & identity<br>
          <strong>Papers, Please</strong> — bureaucracy & moral compromise<br>
          <strong>The Stanley Parable</strong> — choice & determinism<br>
          <strong>Outer Wilds</strong> — knowledge & cosmic perspective
        </div>
      </div>
    </div>
  `;
}
```

---

## Summary of Changes

1. ✅ **Medium path**: Added scenario 11 to EXAMINED_IDS (now 15 + The Last Question = 16 total)
2. ✅ **Mobile layout**: Already working correctly, no change needed
3. ✅ **maxP calculation**: Replaced 4 occurrences with proportional formula `Math.round(Math.min(activeScenarios.length * 0.6, 14))`
4. ✅ **Deliberation tracking**: Added timing infrastructure + results page insights section showing longest/shortest deliberation
5. ✅ **Further exploration**: Added curated film/doc/game recommendations after readings section

All changes use exact text matching for easy application with the Edit tool.
