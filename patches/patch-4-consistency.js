// ===== PHILOSOPHICAL CONSISTENCY CHECK =====
// Analyzes internal contradictions in philosophical positions
// Integration: call analyzeConsistency(answers, activeScenarios) after scoring,
// then call renderConsistencyCheck(analysis) to display results

const TENSION_PAIRS = [
  {
    // Strict deontological duty in one case, pure consequentialism in another
    scenarios: [
      { index: 0, choice: 0, label: 'deliver the letter (duty-bound)' },
      { index: 4, choice: 0, label: 'continue the wealth tax (utilitarian)' }
    ],
    tension: 'In one moment you held that promises carry unconditional moral weight — consequences be damned. In another, you calculated aggregate suffering and decided the math justified overriding individual rights. Kant and Mill have been arguing in your head, and they haven't reached a truce.',
    axes: ['consequence'],
    severity: 0.9
  },
  {
    // Radical individual autonomy vs communal obligation
    scenarios: [
      { index: 5, choice: 1, label: 'owe nothing to your past self (radical freedom)' },
      { index: 13, choice: 0, label: 'stay in the community (ubuntu, "I am because we are")' }
    ],
    tension: 'You claimed radical freedom from even your own history — "the old self must die" — yet when it came to community, you chose belonging over conscience. Nietzsche would ask: are you free, or are you just choosing different chains?',
    axes: ['individual', 'agency'],
    severity: 0.85
  },
  {
    // Stoic acceptance of loss vs epicurean maximization before it arrives
    scenarios: [
      { index: 1, choice: 0, label: 'devour everything before blindness (epicurean)' },
      { index: 1, choice: 1, label: 'adapt now, start preparing (stoic)' }
    ],
    tension: 'You cannot be both the person who floods their remaining time with experience and the person who begins adapting to loss before it arrives. One treats the forecast as a reason to grab more; the other treats it as a fact to metabolize now. These are fundamentally different relationships to suffering.',
    axes: ['stoic'],
    severity: 0.8
  },
  {
    // Total transparency in intimacy vs strategic privacy elsewhere
    scenarios: [
      { index: 6, choice: 0, label: 'total intimacy, no walls (vulnerable transparency)' },
      { index: 2, choice: 0, label: 'say nothing about the cheating (protect privacy)' }
    ],
    tension: 'You chose total vulnerability in your own relationship — "to be half-known is to be half-loved" — yet when someone else\'s relationship was at stake, you held sacred the right to privacy. The question is whether intimacy is a universal good or a personal choice.',
    axes: ['individual'],
    severity: 0.75
  },
  {
    // Empiricist trust in lived experience vs rationalist abstract principles
    scenarios: [
      { index: 10, choice: 1, label: 'ban AI tools (rationalist — thinking is a muscle)' },
      { index: 12, choice: 0, label: 'understanding through presence, not words (empiricist)' }
    ],
    tension: 'In one domain you trusted reason and cognitive discipline over convenience. In another, you abandoned language entirely, trusting presence and feeling over articulation. Plato and Hume are wrestling in your belief system, and the referee hasn't shown up.',
    axes: ['rationalist'],
    severity: 0.7
  },
  {
    // Maintaining control vs intentionally creating power vacuum
    scenarios: [
      { index: 7, choice: 0, label: 'keep running the community (benevolent control)' },
      { index: 7, choice: 2, label: 'fail on purpose to force others to lead (strategic withdrawal)' }
    ],
    tension: 'Competence that erodes others\' agency is a trap, yet you chose differently when faced with it. One position says "if it works, it\'s not a problem." The other says "if they can\'t do it without you, you\'ve already failed." Both can\'t be right.',
    axes: ['agency', 'individual'],
    severity: 0.8
  },
  {
    // Grand systemic intervention vs small-scale presence
    scenarios: [
      { index: 8, choice: 0, label: 'take the five-year project (public impact)' },
      { index: 8, choice: 1, label: 'stay present with family (private devotion)' }
    ],
    tension: 'You chose between Hannah Arendt\'s "natality" — the capacity to begin something that outlasts you — and Oliver Burkeman\'s "just be here." One treats time as a resource to invest in legacy; the other treats it as the only thing you actually possess. These imply different answers to what a life is for.',
    axes: ['stoic', 'individual'],
    severity: 0.8
  },
  {
    // Intellectual honesty at all costs vs strategic silence
    scenarios: [
      { index: 16, choice: 0, label: 'publish the correction immediately (truth above reputation)' },
      { index: 2, choice: 0, label: 'say nothing about the infidelity (silence as loyalty)' }
    ],
    tension: 'You held truth as non-negotiable in one domain but allowed loyalty to override it in another. Al-Ghazali walked away from everything when his framework cracked; Confucian virtue holds trust as foundational. You\'ve chosen both, and they don\'t reconcile easily.',
    axes: ['rationalist', 'individual'],
    severity: 0.85
  },
  {
    // Pragmatic compromise vs ideological purity
    scenarios: [
      { index: 4, choice: 2, label: 'oppose wealth tax for practical reasons (pragmatic)' },
      { index: 13, choice: 1, label: 'leave the community (principle over belonging)' }
    ],
    tension: 'You let pragmatism guide you when it came to policy — "beautiful failures don\'t count" — but chose purity over practical compromise when your own community was at stake. The pattern reveals something: you\'re more willing to compromise other people\'s values than your own.',
    axes: ['pragmatist', 'consequence'],
    severity: 0.75
  },
  {
    // Trust in systems vs rejection of institutional authority
    scenarios: [
      { index: 10, choice: 2, label: 'pull child from school entirely (reject the institution)' },
      { index: 3, choice: 2, label: 'finish the thesis (trust the academic system)' }
    ],
    tension: 'When an institution failed to integrate new technology, you abandoned it entirely. When your own academic work collapsed, you stayed within the system and completed it anyway. The question is whether you trust institutions or simply treat them as instrumental when convenient.',
    axes: ['agency', 'pragmatist'],
    severity: 0.7
  },
  {
    // Separation of art from artist vs refusing complicity
    scenarios: [
      { index: 12, choice: 0, label: 'separate art from artist (aesthetic autonomy)' },
      { index: 13, choice: 1, label: 'leave the community (refuse complicity)' }
    ],
    tension: 'You argued that beauty exists independently of its maker, yet when faced with institutional harm, you refused to stay silent or complicit. The Yoruba concept of àṣà — that art belongs to everyone who encounters it — sits uneasily next to the principle that silence enables harm.',
    axes: ['consequence', 'individual'],
    severity: 0.8
  },
  {
    // Visible labor acknowledgment vs quiet reciprocal action
    scenarios: [
      { index: 17, choice: 0, label: 'name the invisible labor publicly (make it visible)' },
      { index: 17, choice: 1, label: 'just start doing more, quietly (embody care)' }
    ],
    tension: 'These aren\'t contradictory choices — they\'re different theories about what justice looks like. One says visibility is a political act; the other says care responds to care. Carol Gilligan vs Nel Noddings. Both ethical, but they imply different ideas about what recognition means.',
    axes: ['individual', 'agency'],
    severity: 0.5
  },
  {
    // Clinging to continuity vs embracing transformation
    scenarios: [
      { index: 5, choice: 0, label: 'owe something to past self (continuity matters)' },
      { index: 5, choice: 1, label: 'let the old self die (growth means transformation)' }
    ],
    tension: 'Locke grounded identity in memory — you are the thread connecting past to present. Nietzsche celebrated outgrowing yourself without guilt. You\'ve planted your flag in one camp, but the question lives beneath every major life decision: do you owe loyalty to who you were, or only to who you\'re becoming?',
    axes: ['agency', 'transcendent'],
    severity: 0.75
  },
  {
    // Immortality as freedom vs mortality as meaning-generator
    scenarios: [
      { index: 15, choice: 0, label: 'take immortality (maximize time)' },
      { index: 15, choice: 1, label: 'refuse immortality (mortality gives urgency)' }
    ],
    tension: 'Heidegger argued that "being-toward-death" is what allows authentic living. Lucretius said removing the fear of death removes all suffering. You cannot hold both. One says the horizon is what makes the journey matter; the other says the horizon was always just a cage.',
    axes: ['stoic', 'transcendent'],
    severity: 0.9
  },
  {
    // Environmental extraction for collective good vs indigenous sovereignty
    scenarios: [
      { index: 14, choice: 0, label: 'build the mine (utilitarian carbon math)' },
      { index: 14, choice: 1, label: 'respect the community\'s refusal (intrinsic value)' }
    ],
    tension: 'Singer\'s preference utilitarianism says aggregate suffering reduction justifies localized harm. Deep ecology says land has intrinsic value, not instrumental. You cannot choose both without a theory about when numbers matter and when they don\'t.',
    axes: ['consequence', 'transcendent'],
    severity: 0.85
  },
  {
    // Language as bridge vs silence as deepest truth
    scenarios: [
      { index: 11, choice: 0, label: 'understanding through silent presence (language fails)' },
      { index: 11, choice: 2, label: 'imperfect understanding is enough (language works)' }
    ],
    tension: 'Wittgenstein ended the Tractatus in silence — "whereof one cannot speak, thereof one must be silent." Gadamer argued understanding is always partial but always possible. You\'re holding two incompatible beliefs about whether language can bridge the gap between minds.',
    axes: ['transcendent', 'rationalist'],
    severity: 0.7
  }
];

/**
 * Analyzes philosophical consistency across user's answers
 * @param {Array} answers - Array of {scenario, choice} objects
 * @param {Array} activeScenarios - The actual scenario objects the user encountered
 * @returns {Object} - { score, tensions: [...], consistent: [...] }
 */
function analyzeConsistency(answers, activeScenarios) {
  const triggered = [];
  const avoided = [];
  
  // Build a map of scenario index to choice for quick lookup
  const choiceMap = new Map();
  answers.forEach(a => {
    choiceMap.set(a.scenario, a.choice);
  });
  
  // Check each tension pair
  TENSION_PAIRS.forEach(pair => {
    const { scenarios, tension, axes, severity } = pair;
    
    // Check if both scenarios were encountered
    const scenario1Index = activeScenarios.findIndex((s, i) => 
      SCENARIOS.indexOf(s) === scenarios[0].index && choiceMap.has(i)
    );
    const scenario2Index = activeScenarios.findIndex((s, i) => 
      SCENARIOS.indexOf(s) === scenarios[1].index && choiceMap.has(i)
    );
    
    if (scenario1Index === -1 || scenario2Index === -1) return;
    
    const choice1 = choiceMap.get(scenario1Index);
    const choice2 = choiceMap.get(scenario2Index);
    
    // Check if the user made the contradictory choices
    if (choice1 === scenarios[0].choice && choice2 === scenarios[1].choice) {
      triggered.push({
        tension,
        scenarios: [
          { ...scenarios[0], scenarioIndex: scenario1Index },
          { ...scenarios[1], scenarioIndex: scenario2Index }
        ],
        axes,
        severity
      });
    } else {
      // Check if they avoided this tension by choosing consistent options
      const avoided1 = choice1 !== scenarios[0].choice;
      const avoided2 = choice2 !== scenarios[1].choice;
      if (avoided1 || avoided2) {
        avoided.push({
          pair,
          consistent: true
        });
      }
    }
  });
  
  // Calculate consistency score (0-100%)
  // Start at 100, deduct points based on severity of triggered tensions
  const maxPossibleTensions = TENSION_PAIRS.filter(pair => {
    const s1Present = activeScenarios.some(s => SCENARIOS.indexOf(s) === pair.scenarios[0].index);
    const s2Present = activeScenarios.some(s => SCENARIOS.indexOf(s) === pair.scenarios[1].index);
    return s1Present && s2Present;
  }).length;
  
  const totalSeverity = triggered.reduce((sum, t) => sum + t.severity, 0);
  const maxSeverity = maxPossibleTensions * 1.0; // Max severity per tension is 1.0
  
  // Score formula: 100 - (percentage of maximum possible tension)
  const score = Math.max(0, Math.round(100 - (totalSeverity / maxSeverity * 100)));
  
  return {
    score,
    tensions: triggered,
    consistent: avoided.length,
    totalChecked: maxPossibleTensions
  };
}

/**
 * Renders the consistency check section as HTML
 * @param {Object} analysis - Result from analyzeConsistency
 * @returns {String} - HTML string to inject into results
 */
function renderConsistencyCheck(analysis) {
  const { score, tensions, consistent, totalChecked } = analysis;
  
  // Determine the consistency message
  let consistencyMessage = '';
  let visualIndicator = '';
  
  if (score >= 85) {
    consistencyMessage = 'remarkably consistent — but is that a feature or a bug?';
    visualIndicator = '━━━━━━━━━━';
  } else if (score >= 70) {
    consistencyMessage = 'mostly coherent, with a few interesting contradictions';
    visualIndicator = '━━━━━━━━━○';
  } else if (score >= 50) {
    consistencyMessage = 'philosophically complicated — you contain multitudes';
    visualIndicator = '━━━━━○○○○○';
  } else {
    consistencyMessage = 'a beautiful mess of competing commitments';
    visualIndicator = '━━○○○○○○○○';
  }
  
  // Build the tensions HTML
  let tensionsHTML = '';
  
  if (tensions.length === 0) {
    tensionsHTML = `
      <div class="consistency-observation" style="background: var(--surface); padding: 1.5rem; border-radius: var(--radius); border-left: 3px solid var(--green); margin-top: 1rem;">
        <p style="font-size: 1rem; color: var(--text-dim); line-height: 1.8; margin: 0;">
          <em>No major tensions detected.</em> Either you have an unusually coherent philosophical framework, or you haven't been pressed hard enough yet. Perfect consistency might mean you're avoiding the questions that would actually test your commitments. Philosophy begins where comfort ends.
        </p>
      </div>
    `;
  } else {
    tensionsHTML = tensions.map(t => `
      <div class="consistency-observation" style="background: var(--surface); padding: 1.5rem; border-radius: var(--radius); border-left: 3px solid var(--accent); margin-top: 1rem;">
        <div style="font-family: 'Space Mono', monospace; font-size: 0.5rem; color: var(--text-faint); letter-spacing: 0.1em; margin-bottom: 0.8rem; text-transform: uppercase;">
          ${t.scenarios[0].label} → ${t.scenarios[1].label}
        </div>
        <p style="font-size: 1rem; color: var(--text-dim); line-height: 1.8; margin: 0;">
          ${t.tension}
        </p>
      </div>
    `).join('');
  }
  
  // Interpretation based on score
  let interpretation = '';
  if (score >= 85) {
    interpretation = `<p style="font-size: 0.95rem; color: var(--text-dim); line-height: 1.8; font-style: italic;">
      High consistency can mean wisdom — or it can mean you haven't encountered the scenarios that would genuinely test your framework. Emerson warned against "foolish consistency" for a reason. The most interesting people are philosophically complicated.
    </p>`;
  } else if (score >= 50) {
    interpretation = `<p style="font-size: 0.95rem; color: var(--text-dim); line-height: 1.8; font-style: italic;">
      Walt Whitman: "Do I contradict myself? Very well, then I contradict myself. I am large, I contain multitudes." Your tensions aren't failures — they're the seams where different moral intuitions meet. The question is whether you can hold them consciously.
    </p>`;
  } else {
    interpretation = `<p style="font-size: 0.95rem; color: var(--text-dim); line-height: 1.8; font-style: italic;">
      You are navigating competing moral frameworks that genuinely cannot be reconciled. This isn't confusion — it's the human condition. The Stoics, the utilitarians, the existentialists, the care ethicists: they're all speaking different languages. You're trying to speak all of them at once.
    </p>`;
  }
  
  return `
    <div class="consistency-section" style="margin: 3rem 0; padding: 2rem; background: var(--surface); border-radius: var(--radius); border: 1px solid var(--surface-2);">
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--accent); letter-spacing: 0.15em; margin-bottom: 0.5rem;">
          PHILOSOPHICAL CONSISTENCY
        </div>
        <div style="font-size: 2.5rem; font-weight: 600; color: var(--text); margin-bottom: 0.5rem;">
          ${score}%
        </div>
        <div style="font-family: 'Space Mono', monospace; font-size: 0.55rem; color: var(--text-faint); letter-spacing: 0.5em; margin-bottom: 0.5rem;">
          ${visualIndicator}
        </div>
        <div style="font-size: 1rem; color: var(--text-dim); font-style: italic;">
          ${consistencyMessage}
        </div>
      </div>
      
      ${interpretation}
      
      <div style="margin-top: 2rem;">
        <div style="font-family: 'Space Mono', monospace; font-size: 0.55rem; color: var(--text-faint); letter-spacing: 0.1em; margin-bottom: 1rem; text-transform: uppercase;">
          Your Philosophical Tensions ${tensions.length > 0 ? `(${tensions.length})` : ''}
        </div>
        ${tensionsHTML}
      </div>
      
      ${tensions.length > 0 ? `
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--surface-2);">
          <p style="font-family: 'Space Mono', monospace; font-size: 0.5rem; color: var(--text-faint); letter-spacing: 0.05em; line-height: 1.6;">
            These tensions don't mean you failed the quiz — they mean you're engaging with it honestly. The goal of philosophy isn't to eliminate contradictions but to see them clearly and choose consciously. Socrates would be proud.
          </p>
        </div>
      ` : ''}
    </div>
  `;
}

// ===== INTEGRATION INSTRUCTIONS =====
/*
HOW TO INTEGRATE INTO index.html:

1. Include this file in a <script> tag after the main SCENARIOS array is defined:
   <script src="patches/patch-4-consistency.js"></script>

2. In the showResults() function, after calculating the archetype but before rendering the portrait,
   add these lines:

   ```javascript
   // ===== CONSISTENCY CHECK =====
   const consistencyAnalysis = analyzeConsistency(answers, activeScenarios);
   const consistencyHTML = renderConsistencyCheck(consistencyAnalysis);
   ```

3. Inject the consistency HTML into the results. Recommended placement: after the radar chart
   and axes grid, before the portrait. Insert this line:

   ```javascript
   // After axes grid rendering, before portrait
   document.getElementById('consistency-container').innerHTML = consistencyHTML;
   ```

4. Add a container div in the results-screen HTML structure (after axes-grid, before portrait):

   ```html
   <div id="consistency-container"></div>
   ```

ALTERNATIVE: If you want it to appear after the portrait, place the container after the portrait div
and it will naturally flow there.

STYLING NOTES:
- Uses existing CSS variables (--surface, --accent, --text-dim, etc.)
- Matches EB Garamond for body text, Space Mono for labels
- Border-left accent matches the reflection boxes
- Visual indicator uses the same spacing aesthetic as progress dots
- Responsive and should work on mobile without modification

ENHANCEMENT IDEAS:
- Add click-to-expand functionality for each tension to show the full scenario text
- Link tension axes back to the radar chart (highlight relevant dimensions)
- Track consistency score over time if users retake the quiz
- Add a "view others' consistency" leaderboard (most/least consistent)
*/
