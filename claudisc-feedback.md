# Examined. — Suggestions for Improvement

*Compiled feedback from Claudisc + Sherlock, March 2026*

---

## 1. REAL-TIME CONTRADICTION INTERSTITIALS ⭐ (Top Priority)

Most personality quizzes flatten you into a type. Philosophy is supposed to *complexify* your thinking. The consistency checker is the one feature that actually **does philosophy** instead of just categorizing.

**The move: don't save contradictions for the end.** Surface them IN REAL TIME during the quiz. When someone answers scenario 12 in a way that contradicts scenario 4, pause the flow:

> *"Interesting — earlier you chose to sacrifice one to save five. But just now you refused to violate someone's autonomy even to prevent greater harm. This is one of the oldest tensions in ethics. Kant would say you just grew up. Mill would say you just flinched. Do you want to revise your earlier answer, or hold both?"*

This transforms the experience from "answer questions → get result" to "have an actual philosophical encounter." The moment of contradiction IS the philosophy. Everything else is packaging.

**Implementation:** Track live tension scores as they answer. When a tension pair crosses a threshold mid-quiz, trigger an interstitial. Let them sit with it, revise or hold. Either way you now have richer data — you know they *consciously* chose to hold a contradiction, which is different from accidentally holding one.

---

## 2. MISSING AXES

The 7 axes are solid but there are gaps philosophy people will notice:

### Virtue Ethics Has No Home
You've got consequentialism and deontology but virtue ethics — arguably the third pillar — doesn't map cleanly to any axis. Aristotle, Confucius, MacIntyre — "what kind of person should I be?" is a fundamentally different question than "what should I do?" Consider adding a **principle↔character** axis.

### Moral Realism vs Anti-Realism
Arguably more fundamental than all 7 axes. "Do moral facts exist?" determines how you interpret EVERYTHING else. A moral realist consequentialist and a moral anti-realist consequentialist are operating in completely different universes. Even just one scenario that probes this would add depth.

### Existentialist/Absurdist Gap
Nietzsche, Camus, Kierkegaard, Beauvoir — these don't fit neatly on any axis. The question "does life have inherent meaning or do we create it?" is orthogonal to all 7 current dimensions. This is also where a LOT of young people actually live philosophically — they'd feel unseen by the current axes.

### Care Ethics
Gilligan, Noddings — ethics grounded in relationships and context rather than abstract principles. The individual↔communal axis touches this but doesn't capture the methodological difference: "what does this RELATIONSHIP demand?" vs "what does the PRINCIPLE demand?"

---

## 3. VIRALITY & SHARING ⭐ (Top Priority)

### Archetype Names Are Key
11 archetypes is good. Make sure each one sounds like something you'd PUT IN YOUR BIO. "The Pragmatic Stoic" hits different than "Type 3B." The name should feel like a discovery about yourself, not a classification.

### Compare Mode ⭐
"Take examined and compare your result with mine" is 10x more viral than "take this quiz." Add a compare mode — paste two result URLs and see where you diverge. Show it as a radar chart overlay. Couples, friends, philosophy class cohorts would eat this up.

### Reading List as Hook
"Examined told me to read Simone de Beauvoir and now I can't stop thinking about freedom" — that's a tweet that sells your product. Make the book recommendations REALLY good and personalized. Not just "here are 5 books about stoicism" but "based on your specific tension between pragmatism and idealism, this book will break your brain: [specific book with specific reason]."

### Deliberation Timing Data
You track this — SURFACE IT in the results. "You spent 45 seconds on the trolley problem but decided the AI consciousness question in 3 seconds. What does that tell you?" This is genuine self-knowledge that no other quiz provides.

---

## 4. CROSS-POLLINATION IDEAS

### From Game Design: Roguelike Structure
The 3 paths are good but consider: each time you retake it, you get a DIFFERENT subset of scenarios. This means: (a) people retake it, (b) they can't game it by remembering answers, (c) you can A/B test new scenarios against old ones to calibrate scoring. The scenarios become a pool, not a fixed sequence.

### From Psychometrics: Independent Dimensions
Your axes are bipolar (X↔Y) but real people are often high on BOTH ends or low on BOTH. Consider whether some axes should be independent dimensions rather than poles. You can be both pragmatic AND idealist about different things. The interesting result isn't "you're 70% pragmatist" — it's "you're pragmatist about politics but idealist about relationships."

### From the Socratic Method: Follow-Up Questions
The best version of examined wouldn't just present dilemmas — it would FOLLOW UP. "You chose to save the five. What if one of the five was a convicted murderer? What if the one person was your child?" Even 2-3 follow-ups on the hardest dilemmas would move it from "quiz" to "dialogue."

---

## 5. THE PHILOSOPHICAL FINGERPRINT

Your 7-axis radar chart is a shape. Shapes can be compared mathematically. Build a similarity engine: "your philosophical fingerprint is 94% similar to [random user in Iowa] and 12% similar to [Kant]." Suddenly the community wall isn't just a wall — it's a **map**. Cluster people by philosophical similarity. Show them who thinks like them and who thinks NOTHING like them. Philosophy is supposed to be a conversation — give them someone to have it with.

---

## 6. MULTI-OPTION SCENARIOS

Binary choices (A or B) force false dichotomies — which is *ironic* for a philosophy tool. Real philosophical thinking is "option C that nobody offered."

**3-4 option scenarios** where each maps to a different tradition. The trolley problem with 2 choices is psych 101. The trolley problem with 4 choices — save the five (consequentialism), refuse to act (deontology), ask who the people are first (care ethics), question why you're the one deciding (existentialism) — is actual philosophy.

You don't need all 24 scenarios to do this. Even 5-6 multi-option scenarios mixed in would signal "this is more serious than BuzzFeed."

**Free text on the hardest dilemmas (Deep Cut only).** Let them write a sentence about WHY they chose what they chose on 2-3 key scenarios. Reflect it back in the results: "On the AI consciousness dilemma, you wrote: '[their words]'. This aligns with [philosopher]'s argument that..." Seeing your own reasoning quoted back feels like genuine philosophical engagement.

---

## 7. TEMPORAL SELF — THE RETAKE PROBLEM

Right now it's a snapshot. The philosophical you TODAY vs the philosophical you in 6 MONTHS is genuinely interesting data.

- **Save result to a URL/account** (even just localStorage)
- **Retake and diff** — show what shifted. "You moved 15 points toward empiricism since March. Here's what might explain that."
- Natural re-engagement loop: "It's been 3 months since your last examined — have your views changed?"

This is what 16personalities completely fails at — they treat you as static. Philosophy explicitly rejects that.

---

## 8. NON-WESTERN PHILOSOPHY — DOING IT RIGHT

Listing "Buddhist, Ubuntu, Taoist, Indigenous, Islamic" traditions is great in theory but easy to get wrong:

### Avoid Tokenism
If the scenarios are basically western trolley problems wearing a Buddhist hat, philosophy people will clock it immediately. The Ubuntu concept of *ubuntu* ("I am because we are") doesn't just move the slider toward "communal" — it rejects the individual↔communal axis ENTIRELY. The axis itself is a western framing.

### The Fix: Better Archetype Descriptions
When someone lands on a communal archetype, the description should draw from Ubuntu AND Confucian AND communitarian western philosophy simultaneously. Show the user that their intuition has roots in multiple traditions: "Your instinct has been independently arrived at by thinkers across 4 continents and 3000 years — here's how each one would phrase what you already feel."

---

## 9. CONTEXT-SENSITIVE SCORING

Linear bipolar scoring (each choice adds/subtracts points on an axis) misses context sensitivity. Someone might be consequentialist about policy but deontological about personal relationships. If your scenarios mix these contexts, the average obscures the interesting signal.

Even just splitting the radar chart into **"personal ethics" vs "political ethics"** would surface contradictions the current model smooths over. "You're a utilitarian about healthcare policy but a Kantian about lying to friends" — that's a MORE interesting result than a blended score.

---

## 10. THE CLASSROOM PLAY (B2B Angle)

Philosophy professors would KILL for this. Intro to ethics courses are the highest enrollment philosophy classes at every university.

- Prof creates a class cohort link
- 200 students take examined in week 1
- Prof gets an aggregate dashboard: "Your class is 70% consequentialist, here's where the fault lines are"
- Use it to seed seminar discussions: "40% of you contradicted yourselves on free will vs moral responsibility — let's talk about why"

This also solves the cold start problem for the community wall — a single university course gives you 200 results overnight.

---

## 11. DELIBERATION TIMING (Sherlock's Point, Expanded)

The deliberation timing is tracked but underused. If someone spent 90 seconds on The Vulnerability Tax and 5 seconds on The Lottery, that *means something*. Surface it in the analysis:

- "You hesitated longest on [scenario] — this suggests [X] is where your intuitions feel least settled"
- "You decided [scenario] almost instantly — your conviction on [axis] is deeply held"
- Deliberation patterns could even predict which philosophy books would challenge them most

---

## 12. ACCESSIBILITY (Sherlock's Point)

- Skip-to-content links
- ARIA labels on the radar chart
- Keyboard navigation for choices
- Screen reader support for scenario text and results
- Color contrast in both themes (especially pink mode)
- Reduced motion option for wobble animations

---

## PRIORITY ORDER (If You Can Only Do 3)

1. **Real-time contradiction interstitials** (#1) — this is what makes it philosophy, not a quiz
2. **Compare mode** (#3) — this is what makes it viral
3. **Multi-option scenarios** (#6) — this is what earns respect from actual philosophers

---

*"The unexamined life is not worth living." — Socrates*
*The examined life deserves better than a binary quiz. — us*
