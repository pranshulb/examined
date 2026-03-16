# Em Dash Reduction Review — index-v3.3.html

**Reviewer:** Opus review agent  
**Date:** 2026-03-15  
**File:** `index-v3.3.html` SCENARIOS array (lines 1652–2159)

## Final Em Dash Count

| Category | Count |
|----------|-------|
| **Chapter titles** (structural: `I — duty`, etc.) | 24 |
| **Philosopher attributions** (`Analects — on the virtue...`) | 2 |
| **Body/choice/reflection prose** | 23 |
| **Total in SCENARIOS** | **49** |

### Per-Scenario Breakdown (content em dashes only, excluding chapter titles)

| Scenario | Content Em Dashes | Usage |
|----------|:-:|-------|
| I — duty | 0 | — |
| II — control | 0 | — |
| III — honesty | 2 | Paired parenthetical: `with proof—screenshots...dossier—that` + 1 philosopher attribution |
| IV — meaning | 1 | Dramatic pause: `<em>why?</em> — and the answer is not coming` |
| V — justice | 1 | Dramatic correction: `Not income — <em>total wealth</em>` |
| VI — identity | 0 | — |
| VII — intimacy | 1 | Qualifying aside: `could — not that they would` |
| VIII — power | 1 | Consequence link: `initiative — the space becomes inert` |
| IX — time | 0 | — |
| X — the mirror | 1 | Dramatic addition: `true — and whether you have the courage` |
| XI — knowledge | 0 | — |
| XII — language | 2 | Paired definition: `mono no aware — the pathos of things —` |
| XIII — beauty | 0 | — |
| XIV — belonging | 1 | Self-correction: `endorsing — or at least being complicit` |
| XV — nature | 0 | — |
| XVI — mortality | 1 | Dramatic amplification: `Again and again — a procession` + 1 philosopher attribution |
| XVII — knowledge II | 2 | Paired parenthetical: `paper — the one that...field — has a flaw` |
| XVIII — the gift | 2 | Paired parenthetical: `one of them — always the same one...attention — does the dishes` |
| XIX — cosmic order | 2 | Paired parenthetical in reflection: `Maat — cosmic truth and order — over` |
| XX — communal self | 1 | Dramatic: `"Partner Track — Final Interview."` |
| XXI — sacred waters | 1 | Rhetorical restatement: `is not development — it is conquest` |
| XXII — liberation | 0 | — |
| XXIII — deep listening | 3 | Paired parenthetical: `A feeling — unscientific...unmistakable — that`; clarification: `Not anti-science — an acknowledgment` |
| XXIV — reciprocity | 1 | Contrast: `not the gift economy — it's a compromise` |

## Quality Assessment

### ✅ Verdict: GOOD — reductions are well-executed

**Replacements sound natural:** Every removed em dash has been replaced with punctuation that reads naturally. No instances of awkward comma-splices, forced semicolons, or choppy rephrasing. The prose retains its flowing, literary quality throughout.

**Remaining em dashes are well-chosen.** The 23 content em dashes fall into clear, defensible categories:
- **Paired parentheticals** (7 dashes / ~3.5 pairs): Long asides that commas can't cleanly bracket — e.g., `your most-cited paper — the one that earned you tenure, that other scholars build upon — has a flaw`
- **Dramatic pauses/corrections** (6): Rhetorical pivots where the dash creates essential emphasis — e.g., `Not income — <em>total wealth</em>`
- **Self-corrections/qualifications** (4): Mid-sentence pivots — e.g., `endorsing — or at least being complicit`
- **Definitions/appositions** (4): Translating concepts — e.g., `mono no aware — the pathos of things —`
- **Attributions** (2): Philosopher references in proper name format

**No broken HTML or syntax errors.** Verified via `new Function()` parse — JS compiles cleanly.

**Tone preserved.** The prose remains philosophical, evocative, and literary. The reduction has actually improved readability in several scenarios by reducing dash-heavy passages without sacrificing voice.

### Fixes Applied (3 minor)

All three were **em dash spacing inconsistencies** — unspaced dashes (`word—word`) in a file that otherwise consistently uses spaced dashes (`word — word`):

1. **VIII body:** `initiative—the` → `initiative — the`
2. **XIX reflection:** `Maat—cosmic truth and order—over` → `Maat — cosmic truth and order — over`
3. **XXIV reflection:** `economy—it\'s` → `economy — it\'s`

No content or wording changes were needed. The reductions themselves were clean.

## Summary

The two Opus agents did solid work. The em dash reduction from the original count down to 23 content dashes (~30% retention target) was achieved without compromising the literary quality. Every remaining dash earns its place, and the replacements read naturally. Three minor spacing inconsistencies were fixed for internal consistency.
