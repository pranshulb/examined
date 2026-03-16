# Research: Improving "Examined" — Philosophical Personality Quiz

Started: 2026-03-09 02:03
Completed: 2026-03-09 02:40

## Status: Complete

---

## What Examined Currently Does (Baseline)

**URL:** https://pranshul.cafe/examined

**Structure:**
- 7 philosophical axes: Consequence↔Deontology, Individual↔Communal, Stoic↔Epicurean, Pragmatist↔Idealist, Libertarian↔Determinist, Rationalist↔Empiricist, Transcendent↔Materialist
- 18 scenarios total, split into Essential path (10) and Deep Cut path (18)
- 3 choices per scenario, each with a brief rationale + philosophical attribution
- Scoring: -2 to +2 per axis per question; normalizes to 0-1 scale
- 12 archetypes (not 16 as task description stated) — but the quiz claims 16 in some places
- Results: radar chart + axis bars + portrait description + tradition badges + 4 book recommendations + community board
- Two themes: dark monospace and pink/playful
- localStorage progress saving; share-to-clipboard/email

**Immediate Structural Weaknesses:**
1. Only 10 questions for Essential path = ~1.4 questions per axis → catastrophically low for reliability
2. 3-option forced choice eliminates middle-ground nuance and creates false trichotomy
3. Irreversible answers ("life can only be lived forwards") is cute but prevents self-correction
4. 12 archetypes with 7 binary axes = 2^7=128 theoretical positions, but only 12 types = massive information compression
5. Radar chart is the least creative visualization option and universally overused
6. No retake tracking, no temporal drift, no social comparison features

---

## 1. PSYCHOMETRIC DESIGN BEST PRACTICES

### The Reliability Crisis in Examined

**Cronbach's alpha** (coefficient α) is the standard measure of internal consistency for multi-item scales. The accepted threshold is α ≥ 0.70. Research shows:
- At **3 items per dimension** (e.g., BFI-S — the Big Five short form), you can achieve reliable domain-level measurement
- At **2 items** (BFI-10), you retain ~70% of variance, ~85% of retest reliability
- At **1–1.5 items per axis** (Examined's Essential path), reliability is essentially unmeasurable

**Minimum viable item count per axis: 3 questions.** This means Examined's Essential path needs at minimum 21 questions (3 × 7 axes) for statistical defensibility. Currently 10 questions serve 7 axes, so most axes get 1–2 data points. This is not a quiz, it's a coin flip per dimension.

### Item Response Theory (IRT) Basics

IRT shifts focus from the test-as-whole to individual items, measuring:
- **Difficulty (b)**: Where on the trait continuum the item discriminates
- **Discrimination (a)**: How sharply the item distinguishes different levels of the trait
- **Guessing (c)**: Lower bound of correct response probability (less relevant for personality)

Key for Examined: not all scenarios are equally **discriminating**. A question where Kant-aligned vs. Mill-aligned people respond identically is a wasted question. Each scenario should ideally map to a narrow region of the axis continuum and strongly distinguish responses at that point.

**Practical implication:** Some of Examined's current scenarios probably hit the same part of the consequence/deontology axis multiple times while other positions (especially extremes) go unmeasured.

### Acquiescence Bias & Social Desirability

The **3-choice forced scenario format** is actually quite good at reducing acquiescence bias (tendency to agree with whatever is presented). However:
- **Social desirability bias** remains a problem: users may pick the "most philosophical-sounding" answer rather than their genuine intuition
- **Satisficing**: Users may pick the middle option (choice B) as a cognitive shortcut rather than engaging deeply
- Research shows 10–20% of respondents engage in satisficing behaviors

**Countermeasures:**
- Make all three choices philosophically respectable — no "obviously wrong" answer
- Vary which option is the "moderate" choice syntactically
- For some scenarios, use 4 choices (removes the comfortable middle)
- Add brief friction: "Why did you choose this?" (optional, one-sentence response) — this forces cognitive elaboration and reduces satisficing

### What Established Instruments Do

| Instrument | Items | Format | Key Feature |
|---|---|---|---|
| Big Five (BFI-44) | 44 items | 1–5 Likert per item | ~8–9 items per dimension |
| Big Five (BFI-S) | 15 items | Likert | 3 items per dimension — minimum viable |
| Moral Foundations (MFQ-30) | 30 items | 1–6 Likert + relevance rating | 5 items per foundation × 6 foundations |
| World Values Survey | 250+ items | Various | Cross-cultural validity; tested in 120 countries |
| MBTI | 93 items | Forced choice | ~23 per dimension; but has low test-retest reliability |

**Key insight:** MBTI (the most pop-culturally similar instrument to Examined) is broadly criticized for low reliability (39–76% of people get a different type on retake after 5 weeks). Examined risks the same problem at its current item density.

### Differential Item Functioning (DIF)

An often-missed best practice: check whether scenarios mean the same thing across cultural backgrounds. A trolley-problem-style dilemma about a runaway cart hitting strangers reads very differently in cultures with strong communal honor norms vs. individualist autonomy norms. Examined currently includes Ubuntu and Confucian perspectives in attribution but the *scenarios* themselves may be culturally loaded toward Western ethical intuitions.

---

## 2. EXISTING PHILOSOPHY/ETHICS QUIZZES — LANDSCAPE ANALYSIS

### PhilosophyExperiments.com (Jeremy Stangroom)
**URL:** https://www.philosophyexperiments.com/

**What they do well:**
- **Consistency testing**: The "Philosophical Health Test" checks whether your philosophical positions logically contradict each other — this is enormously powerful and Examined has nothing like it
- **Intuition revelation**: Designed to surface pre-theoretical intuitions, not just stated positions
- 24 distinct thought experiments organized by theme (ethics, mind, logic)
- No "right answers" framing encourages authentic response
- Shows how your responses compare to others globally

**What Examined can borrow:**
- After scoring, surface internal tensions: "You chose consequence-based ethics in scenario 3 but deontological reasoning in scenario 7. These positions are in tension around [X] — which do you prioritize when they conflict?"

### ClearerThinking.org (Spencer Greenberg)
**URL:** https://programs.clearerthinking.org/philosophical_beliefs.html

**What they do well:**
- Built with professional academics (David Yaden, Derek Anderson)
- Maps philosophical beliefs to psychological traits (evidence-based connections)
- "Jargon-free" — explains complex positions in plain language
- Shows how your views compare to professional philosophers' stated positions
- 15-framework moral compass tool

**What Examined can borrow:**
- Show percentile scores: "You score in the 82nd percentile on empiricism compared to all quiz-takers"
- Connect philosophical position to psychological research: "People who score high on empiricism tend to have higher openness to experience (Big Five)"
- Compare to named philosophers: "Your profile most resembles David Hume (empiricist) with touches of Aristotle (pragmatist)"

### YourMorals.org (Jonathan Haidt)
**URL:** https://yourmorals.org

**What they do well:**
- Academic-grade methodology (MFQ-30 — 30 items across 6 foundations)
- Cross-political comparison: shows your scores vs. self-identified liberal/conservative averages
- Participates in ongoing research — users contribute data
- 5 items per foundation achieves meaningful reliability

**What Examined can borrow:**
- "Research participation" framing — users feel they're contributing to something larger
- Cross-cultural comparison charts
- More items (30+ for a "deep" path)

### PoliticalCompass.org
**URL:** https://politicalcompass.org

**Design flaws to avoid:**
- 62 questions with Likert scale (strongly agree → strongly disagree) — subject to acquiescence bias
- Opaque scoring algorithm (formula never published)
- Low reliability: high sensitivity to question phrasing
- Forced positions on complex issues with misleading precision
- **Key lesson:** Scenario-based format (what Examined does) is BETTER than abstract proposition-agreement format for philosophical assessment

### Open Psychometrics Philosophy Tests
Tests like the **Philosopher Personality Test** (idrlabs.com) — matches you to historical philosophers — are fun but lack nuance. They score similarly to Myers-Briggs: low item count → low reliability → low validity.

### Key Gap Observed
No existing popular quiz combines:
1. Scenario-based format (Examined has this ✓)
2. Internal consistency checking (PhilosophyExperiments has this)
3. Longitudinal tracking (nobody has this)
4. Community comparison (YourMorals approximates this)
5. Adaptive questioning (nobody has this)

---

## 3. COOL INTERACTIVE FEATURES FROM THE WILD

### Viral Quiz Design (2024 Research)
- **96% completion rate** for well-designed personality quizzes — highest in digital content
- Completion drops sharply when perceived effort exceeds perceived reward
- Social sharing is most likely at the **moment of result reveal** — emotional high

**Key shareable result card features:**
1. Unique visual "identity" (not a generic chart)
2. Personality language that feels flattering yet accurate ("You're the rare type who...")
3. Single-tap share with clean image generation
4. "Only X% of people share your archetype" — scarcity signal drives sharing
5. Comparison angle: "Compare with a friend" as CTA

### Spotify Wrapped Design Patterns (2024)
Wrapped generates ~2.1M social mentions in 48 hours, 400M TikTok views in 3 days. Why it works:
- **Identity expression**: turns data into self-narrative ("I am a person who...")
- **Cognitive Narrative Theory**: frames raw data as a personal story
- **Competitive comparison**: top X% framing ("top 1% listener of X")
- **Visual distinctiveness**: each screen is shareable as a story/reel
- **Annual ritual**: creates anticipation, marks time

**For Examined:** "Your Annual Examined Report" — retake annually, show axis drift over time ("You moved 15% more toward empiricism this year"), compare archetype changes.

### Results Visualization Alternatives to Radar Chart

**The radar chart is played out.** Better options:

1. **Constellation map**: Plot 7 axes as stars/constellations in a personal sky. Position, brightness, and connections between stars encode philosophical proximity. Each user gets a unique "philosophical night sky" image that's shareable.

2. **Humanized data badges** (Giorgia Lupi / Accurat approach): Circular visual systems that feel personal rather than statistical. Each segment encodes a dimension — but designed to feel like a personal sigil or seal.

3. **Nested radar (Item Pool Visualization)**: Show not just position on 7 axes but also *which specific scenarios drove each position* — revealing the narrative of your philosophical journey through the quiz.

4. **Philosophical landscape**: A stylized terrain where you're placed on a map (mountains = stoic/ascetic, coastal = epicurean, etc.). Metaphorical but deeply memorable.

5. **Small multiples**: Show your axis positions as 7 small tide charts, where the shape over the quiz's progression tells a story of internal consistency or tension.

### Progressive Disclosure & Engagement Mechanics

- **Animated result build**: Don't dump all axes at once. Reveal one axis at a time with a brief description, building toward the archetype reveal — like opening acts before the headliner
- **"Your philosophical tension"**: Highlight the axis pair where you're most torn (close to 0.5 on both) — this is often the most interesting part
- **Archetype reveal ritual**: Make the archetype assignment feel earned. A brief philosophical "loading" screen with relevant quotes before the reveal

### Gamification That Doesn't Feel Cheap
- **Philosophical consistency score**: "Your positions are 87% internally consistent" — measured by checking if your answers form a coherent philosophical worldview
- **Exploration badges**: "You've engaged with 8 of 12 major philosophical traditions"
- **Depth unlocks**: Getting a certain score on empiricism unlocks a "rationalism vs empiricism deep dive" bonus track

---

## 4. ACCURACY & DEPTH IMPROVEMENTS

### Are 7 Axes Right? Missing Dimensions

The 7 current axes are solid but miss some philosophically important dimensions:

**Strongly recommended additions:**
1. **Epistemic humility vs. epistemic confidence**: How certain are you about your knowledge claims? Do you foreground the limits of human understanding or proceed from secure foundations? Relates to Socratic/Pyrrhonian skepticism vs. Cartesian/Rationalist certainty
2. **Aesthetic/expressive vs. Functional/instrumental**: How do you value art, beauty, and expression relative to utility? Maps to aesthetic philosophy (Kant, Tolstoy, Dewey) vs. pragmatist/instrumentalist thinking
3. **Process vs. outcome orientation**: Virtue ethics (how you act matters) vs. consequentialism (results matter). Partially covered by deontological axis but distinct — virtue ethics is neither
4. **Sacred vs. secular**: How much do you see the world as containing genuinely transcendent meaning vs. fully explicable through natural/material processes? Partially covered by materialist axis but distinct

**Possible additions (lower priority):**
- **Particularist vs. universalist**: Do moral obligations apply equally to all or are special obligations to family/community primary? (Carol Gilligan's care ethics vs. Kantian universalism)
- **Naturalistic vs. non-naturalistic ethics**: Can moral facts be reduced to natural facts?
- **Optimist vs. pessimist** (re: human nature): Hobbes vs. Rousseau

**Against adding too many:** Each new axis requires 3+ new well-designed scenarios and increases cognitive load. 8-9 axes is probably the sweet spot. Above 10, the results become hard to interpret.

### The Problem with 3 Choices

Three choices is the current industry standard for philosophical scenario quizzes, but creates problems:
- Middle option becomes a "dodge" — satisficing-friendly
- Forces trichotomy on what are really continua
- Some philosophical positions don't fit cleanly into any of 3 options

**Better alternatives:**

**5-choice ordinal scale per scenario:**
Instead of 3 distinct actions, present the scenario and ask:
- "How much do you agree with [consequentialist framing]?" on a 1–5 scale
- This gives continuous data, enables IRT, enables Cronbach's alpha calculation
- Tradeoff: Less narrative immersion, more clinical feel

**4 choices with no middle:**
Remove the "moderate" option, forcing genuine engagement. Research shows this reduces satisficing. The philosophical tradition of "forced dilemma" thought experiments supports this.

**Ranked choice:**
Present 3-4 options and ask users to rank them. Reveals relative preferences rather than absolute positions. More information-dense per question but higher cognitive load.

**Best recommendation:** Keep 3-scenario narrative format for immersion but add a **post-choice slider** on the most important axis: "How confident are you in this choice?" (1–5). This captures conviction strength, which is philosophically meaningful and prevents binary axis scoring from erasing genuine uncertainty.

### Question Weighting

Not all scenarios are equally discriminating. Some questions should weight more heavily:

**High-weight scenarios:** Those that cleanly separate two distinct philosophical traditions (e.g., a Kantian vs. utilitarian scenario where middle ground is philosophically incoherent)

**Low-weight scenarios:** Those that test lived-experience preferences rather than philosophical positions (e.g., "would you prefer ascetic simplicity or comfortable pleasure in daily life" — more temperamental than philosophical)

IRT-based weighting (assigning higher discrimination parameters to more reliable items) could dramatically improve axis accuracy without adding questions.

### Cross-Cultural Validity

Current scenarios use:
- Western-style individual moral dilemmas (strong)
- Some Ubuntu philosophy attribution (but still individual-choice scenarios)
- Confucian thinker references (but scenarios don't test Confucian frameworks)
- Buddhist thought attribution

**The problem:** Scenarios are all framed as individual choices by a single agent. This structurally biases toward individualist philosophical traditions.

**Fix:** Add 2-3 scenarios framed as collective decisions: "Your community must decide..." or "You are advising a governing body..." This tests communal/relational ethical frameworks more authentically.

### The Middle-Choice Satisficing Problem

Examined's answer B is frequently the most moderate option. Research shows 15-20% of users satisfice by choosing the middle option regardless of content.

**Fixes:**
- Rotate which answer is "middle" — don't always put it second
- Occasionally use scenarios where answer B is actually the most extreme position
- For 3-choice scenarios, make ALL three positions strong and defensible

---

## 5. CONTENT & SCENARIO DESIGN

### Writing Dilemmas That Actually Reveal Something

Research from PhilosophyExperiments.com and moral psychology shows:
1. **Good dilemmas have no obviously correct answer** — if 80%+ of users pick the same option, the question is not discriminating
2. **The best scenarios pit competing ethical frameworks against each other** — where utilitarians and deontologists reach genuinely different conclusions
3. **Variants that expose inconsistency are gold** — if you'd push the fat man off the bridge in scenario 5 but not pull the lever in scenario 2, you have an inconsistency worth surfacing
4. **Personal stakes matter** — scenarios involving identifiable people and relationships reveal more than abstract policy questions

### Contemporary Dilemmas as Scenario Material

The current scenarios are rich but skew toward classic philosophical territory. Contemporary dilemmas offer fresh material that tests the same axes:

**AI Ethics (Consequence↔Deontology, Individual↔Communal):**
- Self-driving car sacrifices you vs. five pedestrians: updated trolley problem
- An AI detects you'll commit a crime; should you be pre-arrested?
- Should AI systems be transparent about being AI even when it makes them less helpful?

**Climate Ethics (Individual↔Communal, Pragmatist↔Idealist):**
- You can save your city or your country's ecological zone — choose
- Future generations have no vote; how much should their interests constrain present choices?
- Is it ethical to have children given climate projections?

**Biotechnology (Libertarian↔Determinist, Materialist↔Transcendent):**
- CRISPR can eliminate a genetic disease but also selects for traits; proceed?
- Would you edit your child's genome to eliminate suffering you could not have predicted?
- Memory erasure technology exists; should traumatic memories ever be erased without consent?

**Surveillance/Privacy (Individual↔Communal, Pragmatist↔Idealist):**
- Complete surveillance eliminates crime but eliminates privacy; acceptable trade?
- Government can read encrypted messages to prevent 1 terrorist attack per year

**Why these work:** They map cleanly onto existing axes, feel culturally immediate, and don't have "culturally obvious" answers based on Western philosophical tradition.

### Non-Western Traditions — Representation Gaps

Examined attributes answers to Buddhist, Confucian, Ubuntu, Taoist, and Islamic thinkers — this is good. But the scenario **framing** is almost entirely Western.

**Deep structural bias:** All scenarios present individual agents making choices about their obligations to others. This is the Western liberal model of ethics. Confucian ethics, Ubuntu philosophy, and Buddhist ethics all start from a different premise: the self is relational, not prior to relationships.

**Specific additions needed:**
1. **Ubuntu scenario**: "The village must decide as one. You disagree. What is your obligation?" — tests whether individual conscience outweighs communal harmony
2. **Taoist scenario**: Inaction as wisdom — "Everything is in balance. Intervening will help one but harm the whole. Do you act?" — tests wu wei (non-action) vs. activist ethics
3. **Buddhist scenario**: Suffering is a feature of attachment — how does your philosophy handle someone who wants to escape a relationship that others depend on?

### Avoiding Obvious "Correct" Answers

The biggest quality failure in philosophical quizzes is when the "right" answer is socially obvious. Signs of this problem:
- One option sounds pompous/selfish
- One option sounds compassionate/humble
- The attribution names a "better" philosopher (Kant sounds more respectable than "do whatever feels good")

**Fixes:**
- Pass every scenario through a "social desirability check" — can a test user identify the "good person" answer without thinking?
- If yes, rewrite or replace the scenario
- Make the "selfish" option philosophically rigorous, not just self-interested

---

## 6. FEATURE IDEAS FROM ADJACENT SPACES

### Quick Wins (1 day of dev work)

**1. Shareable result image card**
Generate a static image (SVG/Canvas) at result time: archetype name + axis positions as a visual + "Take the quiz at pranshul.cafe/examined". This is the single highest-ROI viral feature. Currently, copying text to clipboard is a poor substitute for image sharing.

**2. "Only X% of people get this archetype" label**
Calculate archetype frequency from community board data (already collected). Show this on the result page. Creates scarcity/identity signal that drives sharing.

**3. Internal consistency score**
After scoring, check for logical tensions between axis positions: "You lean consequentialist (ethics of outcomes) but also lean determinist (free will is an illusion). These positions are philosophically in tension — determinism challenges the moral responsibility that makes consequences meaningful. Which do you prioritize?" This is the killer feature from PhilosophyExperiments.com's "Philosophical Health Test" and nobody else does it.

**4. Compare-to-philosopher alignment**
Map archetype + axis profile to the 3 closest named philosophers. "Your profile most closely resembles: (1) David Hume — empiricist, consequence-leaning, materialist; (2) John Stuart Mill — consequentialist, individual-leaning pragmatist; (3) Martha Nussbaum — communal, empiricist, care-ethics." Much more memorable than abstract archetype labels.

**5. Axis result with spectrum examples**
Instead of showing a bare radar chart, annotate each axis with historical examples on both ends: "[Rationalist ←────●────→ Empiricist]" where the left end says "Descartes, Kant" and right says "Locke, Hume, William James". This contextualizes scores without requiring users to already know the philosophers.

### Medium Effort (1 week of dev work)

**6. Retake tracking + drift detection**
Store results in localStorage with timestamp. On subsequent retakes, show a "Philosophical Drift Report": which axes moved, by how much, in what direction. "Since your last session (3 months ago), you've moved 18% toward empiricism. This often happens after major life experiences or encountering new ideas."

**7. "Philosophical Tension Map"**
After scoring, show a secondary visualization: a network graph of your 7 axes with edges between axes that are philosophically in tension. Highlight where your positions create cross-axis tensions. This surfaces what's most interesting about your philosophical profile and gives something to think about rather than just a label.

**8. 5-question micro-version ("The 5-Minute Philosopher")**
Create a standalone ultra-brief version (5 questions, 1 per most-discriminating scenario per top-5 axes) for embedding in other sites or social media traffic. Lower friction entry point that links to full quiz.

**9. Comparison mode**
"Compare your results with a friend." User A shares a link with User B; B takes the quiz; result page shows both profiles side-by-side on same radar chart, with axis-by-axis agreement/disagreement annotations. Low-tech social feature with high shareability.

**10. "Argue with your result"**
On the result page, add a "Challenge this archetype" option. The user gets presented with the 2-3 philosophical positions most contrary to their archetype and can indicate which, if any, they find compelling. This creates a structured "philosophical debate with yourself" and often surfaces more nuanced self-understanding.

**11. Expand archetype count**
7 axes → 2^7 = 128 theoretical positions → currently collapsed to 12 archetypes (or 16 per some descriptions). Increasing to 32 archetypes (5 binary axes + 2 tertiary) allows much more specificity without combinatorial explosion. Each archetype needs a distinct portrait, 2 core thinkers, and 4 books — this is content work, not dev work.

### Ambitious (Month+ of work)

**12. Adaptive questioning**
After first 5 questions establish rough axis positions, use IRT-informed selection to prioritize the next questions based on where disambiguation is most needed. If you're clearly at one extreme on empiricism, stop asking empiricism questions and spend more time on your uncertain axes. Requires a question bank 3× larger than current and a basic recommendation algorithm.

**13. Philosophical community matching**
"Find your philosophical neighbors" — show other users whose archetype is similar or interestingly different. Create an opt-in community board where philosophical archetypes can engage in structured debate. Match "complementary opposites" (people who differ on exactly one axis) for interesting dialogue. This is the feature most likely to create retention and return visits.

**14. Annual "Examined Wrapped"**
Annual retake prompt with a Spotify Wrapped-style report: how your philosophical positions evolved over the year, what life events correlated with changes, comparison to the global distribution of archetypes that year. Generates enormous social sharing at a predictable time each year.

**15. "Examined by Year"**
Historical version of the quiz: "What would your archetype have been in 1935? In 1789? In ancient Athens?" Using the same 7 axes but scenarios drawn from historical periods. Tests whether your philosophical commitments are stable across very different social contexts or context-dependent.

**16. Adaptive reading list**
Connect the 4-book reading recommendation to actual reading tracking. If users mark books as "read" or "reading," surface follow-on recommendations that go deeper into their specific philosophical territory — and update the list when axis scores shift on retake. Goodreads API integration or simple manual book logging.

**17. API for philosophical widget**
Public API: submit a user's 3-5 answer choices → receive an archetype estimate. Enables other sites to embed "What's your philosophy?" as a 5-question widget. Referred users land on Examined for the full experience. Low cost, potentially high traffic.

**18. AI-generated philosophical interlocutor**
Based on your archetype, generate a philosophical "sparring partner" — an AI persona representing your weakest axis opponent. If you're a strong Rationalist, the interlocutor argues from radical empiricism using specifically your quiz answers as evidence of your own empiricist moments. More engaging than a static reading list.

---

## 7. STRUCTURAL RECOMMENDATIONS (Summary)

### The Core Reliability Fix
**Non-negotiable: 3 questions per axis minimum.** This means the Essential path needs to go from 10 to 21 questions. The Deep Cut can expand to 32+ questions for a proper psychometric profile. Current item density makes the results essentially unreliable from a measurement standpoint — pretty but not meaningful.

### The Scenario Balance Fix
- Remove scenarios where the "correct" answer is socially obvious
- Add 2 scenarios with collective/communal framing (not individual choice)
- Add 1-2 scenarios using contemporary dilemmas (AI ethics, biotech, climate)
- All 3 options on every scenario should be philosophically defensible

### The Visualization Fix
Replace the radar chart with a **constellation map** or **philosophical landscape** — something visually unique and shareable. The radar chart is fine for data display but terrible for social sharing (no one posts radar charts on Instagram).

### The Consistency Fix
Add a "Philosophical Health Check" step after results — show 1-2 internal tensions in the user's profile and ask a clarifying question. This transforms the quiz from "personality label generator" to "genuine philosophical self-examination tool."

### The Axes Fix
Add **epistemic humility vs. epistemic confidence** as an 8th axis. This maps to a real and underrepresented philosophical dimension (Socratic ignorance, Pyrrhonian skepticism, Popperian fallibilism vs. Cartesian certainty, dogmatic rationalism). 3 new scenarios needed.

---

## 8. ACTIONABLE RECOMMENDATIONS

### Quick Wins (1 day)
1. **Shareable image card** — generate a SVG/canvas at result display with archetype + axes + "pranshul.cafe/examined". Single highest-ROI change.
2. **"X% of people get this archetype"** — calculate from community board data, show at result.
3. **Compare to philosophers** — map 3 named philosophers to each archetype profile.
4. **Annotate radar chart axes** — show philosopher names at each pole.
5. **Consistency alert** — check for 2-3 common axis-pair tensions and surface them in plain language after result.

### Medium Effort (1 week)
6. **Add 11 more scenarios** — bring Essential path to 21 questions (3 per axis).
7. **Drift tracking** — localStorage-based retake history with axis change visualization.
8. **Friend comparison link** — share URL that shows both profiles.
9. **Expand archetypes to 32** — more specific portrait + reading list.
10. **Contemporary scenarios** — 3 new scenarios from AI ethics/biotech/climate domain.
11. **Visual redesign of results** — replace radar chart with constellation map.

### Ambitious (Month+)
12. **Adaptive questioning engine** — IRT-based question selection.
13. **Annual Examined Wrapped** — retake prompt, drift report, global archetype distribution.
14. **Community matching** — opt-in philosophical neighbor discovery.
15. **AI sparring partner** — archetype-based philosophical debate partner.
16. **8th axis** — add epistemic humility dimension.
17. **Non-Western scenario rewrite** — 3 scenarios with collective framing.
18. **API + embeddable widget** — 5-question mini-version for other sites.

---

## KEY SOURCES

- [Item Response Theory — NCBI PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4118016/)
- [Big Five reliability meta-analysis 2024 — Springer](https://link.springer.com/article/10.1186/s40359-024-02271-x)
- [BFI-S 15-item short form](https://www.testable.org/scale/bfi-s-big-five-inventory-short-form-15-items)
- [Moral Foundations Theory — moralfoundations.org](https://moralfoundations.org/)
- [YourMorals.org](https://www.yourmorals.org/)
- [ClearerThinking Philosophy Quiz](https://www.clearerthinking.org/post/discover-your-philosophical-beliefs-with-our-new-quiz)
- [PhilosophyExperiments.com](https://www.philosophyexperiments.com/)
- [Political Compass — Wikipedia](https://en.wikipedia.org/wiki/The_Political_Compass)
- [World Values Survey Wave 8](https://www.worldvaluessurvey.org/documents/WVS-8_QUESTIONNAIRE_V11_FINAL_Jan_2024.pdf)
- [Acquiescence bias countermeasures — Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.02309/full)
- [Social desirability in personality inventories — PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC3618383/)
- [Satisficing in Survey Design — ResearchGate](https://www.researchgate.net/publication/327539913_Satisficing_in_Survey_Design)
- [Spotify Wrapped psychology analysis — UX Medium](https://medium.com/design-bootcamp/why-were-hooked-on-spotify-wrapped-the-perfect-blend-of-ux-and-psychology-b4aa06c9b81f)
- [Spotify Wrapped 2025 multiplayer mode — Cord Cutters](https://cord-cutters.gadgethacks.com/news/spotify-wrapped-2025-adds-first-multiplayer-party-mode/)
- [Giorgia Lupi humanized data visualization — Sandra Rendgen](https://sandrarendgen.wordpress.com/2019/03/25/input-visualising-personality/)
- [Comparative Chinese/Western Philosophy — Nature](https://www.nature.com/articles/s41599-024-04290-w)
- [AI Ethics cases — UNESCO](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics/cases)
- [CRISPR ethics — Tandfonline](https://www.tandfonline.com/doi/full/10.1080/15265161.2024.2361900)
- [Modesty and Humility — Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/entries/modesty-humility/)
- [Cronbach's alpha — Wikipedia](https://en.wikipedia.org/wiki/Cronbach%27s_alpha)
- [Trolley Problem philosophical analysis — Philosophy Now](https://philosophynow.org/issues/116/Could_There_Be_A_Solution_To_The_Trolley_Problem)
- [Neutral response option effects — Longwood University](https://blogs.longwood.edu/incite/2014/05/07/the-effects-of-the-neutral-response-option-on-the-extremeness-of-participant-responses/)
