# Technical Review: examined. v3.3

## Bugs Fixed

### 1. Share image maxP mismatch (FIXED)
`shareResult()` used a hardcoded tiered formula (`<=10?6:<=15?8:10`) while `showResults()` used `Math.round(Math.min(activeScenarios.length * 0.6, 14))`. This caused the share image to render different axis values than what the user saw on the results page. Particularly wrong for Essential path (maxP 7 vs 6) and Deep path (maxP 14 vs 10). Now both use the same formula.

### 2. EXAMINED path scenario count (FIXED)
Path card said "15 scenarios" but EXAMINED_IDS has 15 entries + The Last Question = 16 total. Updated card text to say "16 scenarios". (Essential: 9+1=10 ✓, Deep: 23+1=24 ✓, both were correct.)

### 3. copyResults() feedback on wrong button (FIXED)
`copyResults()` used `document.querySelector('.share-row .btn-small')` which selected the first button ("share image") instead of the second ("copy result"). The "copied!" feedback text appeared on the wrong button. Now correctly targets the second button.

---

## Review Findings

### 1. Contradiction Interstitial Logic ✅
- `checkContradiction()` correctly maps `activeScenarios` indices → SCENARIOS indices via `SCENARIOS.indexOf()`.
- All 3 paths are covered: Essential pairs (ci1-ci8) use scenarios 0-8 only. Examined pairs (ci9-ci17) combine essential with examined-exclusive scenarios (11, 13, 15, 17, 22). Deep pairs (ci18-ci25) use scenarios only in the full set.
- The check runs after `selectChoice()` pushes to `answers[]`, so the current answer is always in scope. Will trigger correctly for real users.
- Minor: `shownContradictions` (Set) is not persisted to localStorage. On page refresh mid-quiz, a contradiction could re-trigger. Very low severity since re-seeing a philosophical insight is harmless.

### 2. Scoring ✅
- Schwartz centering is correct: subtract mean of raw scores, then re-normalize to 0-1.
- The `|| 1` guard on `cRange` correctly handles the degenerate case where all axes are equal.
- Distance-based archetype matching (Euclidean distance in 7D space) works properly. The Philosophical Pluralist has all-0.5 ideals, which acts as a natural fallback for centered profiles.
- Edge case: if a user picks choices that perfectly cancel out (all axes = 0), normalized values become all-0 after centering. Closest match would be an archetype with low ideal values. Extremely unlikely in practice.

### 3. Wall Integration ✅
- `WALL_API = '/api/wall'` — relative URL is correct for deployment on pranshul.cafe.
- `fetchWall()` and `postToWall()` both have try/catch with graceful error handling.
- `renderWall()` handles null (fetch error) and empty array correctly.
- `escapeHtml()` uses DOM-based escaping (createElement + textContent → innerHTML), safe against XSS.
- `addToWall()` disables the button during submission and handles failures.
- Input is capped at `maxlength="40"` in HTML and checked in JS.

### 4. Share Image Generation ✅
- Uses system fonts (Georgia, Courier New) — no web font loading issues.
- Custom word-wrapping handles long archetype names across two lines.
- Canvas dimensions are 1080×1080 (standard social share size).
- Radar chart rendering mirrors the SVG version correctly.
- Web Share API is used with graceful fallback to download link.
- `event.target` in `shareResult()` relies on implicit `event` global from `onclick` attribute — works in all modern browsers but is slightly fragile. Not a bug.

### 5. State Management ✅ (with notes)
- `selectChoice()` has `if (selectedChoice !== null) return;` guard — prevents double-selection.
- `resetScores()` properly resets: scores, traditions, deliberationTimes, scenarioStartTime, shownContradictions.
- `startExam()` calls `resetScores()` and resets answers, currentScenario, rebuilds activeScenarios.
- `renderScenario()` resets `selectedChoice` to null.
- `restart()` clears localStorage and selectedPath.
- `saveProgress()` persists: currentScenario, scores, answers, selectedPath, traditions, activeScenarioIndices, screen.
- `resumeIfSaved()` correctly rebuilds activeScenarios from saved indices.
- Not persisted across reloads: `deliberationTimes` (nice-to-have feature, acceptable loss), `shownContradictions` (could cause re-triggers, very minor).

### 6. Edge Cases ✅
- **Fast clicking:** Guarded by `selectedChoice !== null` check in `selectChoice()`.
- **Back button during interstitial:** The interstitial is a fixed overlay. Browser back navigates away entirely; state is saved in localStorage. On return, `resumeIfSaved()` restores the quiz at the current scenario. The interstitial is not reshown, and the user can simply continue.
- **Navigate away and back:** `saveProgress()` is called after each choice and on results. Resume IIFE runs on page load. Works correctly.
- **Interstitial dismiss:** `hideContradictionInterstitial()` uses a fade-out timeout (400ms), then calls the continue callback. No race conditions since the callback is nulled after invocation.

### 7. Performance ✅
- No unnecessary DOM operations in hot paths. Scenario rendering uses string concatenation + `innerHTML`, which is efficient for this scale.
- `checkContradiction()` is O(answers × scenarios × pairs) per call, but with max 24 answers, 24 scenarios, and 25 pairs, this is ~15K operations worst case — negligible.
- `analyzeConsistency()` uses `findIndex()` in a loop but runs only once at results time.
- Radar chart draws via SVG string concatenation — simple and efficient.
- CSS animations use `transform` and `opacity` (GPU-accelerated properties).
- No memory leaks: event listeners are set once, no intervals or observers running.

---

## Non-Critical Observations

1. **`wallLoaded` variable is set but never read** — dead code, no impact.
2. **TENSION_PAIRS and CONTRADICTION_PAIRS overlap conceptually** — TENSION_PAIRS power the consistency check on the results page, while CONTRADICTION_PAIRS power mid-quiz interstitials. Some tensions are represented in both systems (e.g., ci1/ci3 vs tension pair 1). This is intentional — same tensions, different presentation moments.
4. **`emailResults()` may hit URL length limits** for `mailto:` links with very long body content. Works fine for most email clients but could be truncated in some.

## Verdict

The codebase is solid. Two bugs fixed (maxP mismatch in share image, scenario count label). No logic errors in the core quiz flow. State management is robust. The contradiction system correctly maps between activeScenarios and SCENARIOS indices across all three paths.
