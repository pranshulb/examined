// ═══════════════════════════════════════════════════════════════════════════════
// PHILOSOPHER MATCH FEATURE
// for examined. (pranshul.cafe/examined)
// ═══════════════════════════════════════════════════════════════════════════════
//
// INTEGRATION INSTRUCTIONS:
//
// 1. Add this script tag in index.html BEFORE the closing </body> tag:
//    <script src="patches/patch-3-philosopher-match.js"></script>
//
// 2. In showResults(), after the portrait rendering, add:
//    renderPhilosopherMatches(normalized);
//
// 3. The philosopher match section will appear automatically below the portrait.
//
// STYLE: Uses existing fonts (EB Garamond, Space Mono) and CSS variables for
// seamless integration with the current design system.
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * PHILOSOPHERS database
 * Each philosopher has ideal scores on all 7 axes (0-1 scale)
 * Scores are carefully researched to reflect their actual philosophical positions
 */
const PHILOSOPHERS = [
  {
    name: 'Socrates',
    dates: '470–399 BCE',
    description: 'Athenian gadfly who chose death over compromise',
    scores: {
      consequence: 0.2,   // virtue ethics over outcomes
      individual: 0.5,    // cared about polis but emphasized individual virtue
      stoic: 0.5,         // balanced - examined life but not resigned
      pragmatist: 0.15,   // idealist about truth and Forms
      agency: 0.75,       // examined life requires free choice
      rationalist: 0.9,   // dialectical method, reason as path to truth
      transcendent: 0.8   // Forms, soul immortality
    }
  },
  {
    name: 'Aristotle',
    dates: '384–322 BCE',
    description: 'Practical wisdom embodied — ethics as craft',
    scores: {
      consequence: 0.3,
      individual: 0.35,   // zoon politikon - the political animal
      stoic: 0.5,         // doctrine of the mean
      pragmatist: 0.6,    // phronesis - practical wisdom
      agency: 0.7,        // virtue cultivated through choice
      rationalist: 0.6,   // balanced empirical observation with rational principles
      transcendent: 0.5   // form/matter, unmoved mover but grounded ethics
    }
  },
  {
    name: 'Immanuel Kant',
    dates: '1724–1804',
    description: 'Duty without exception, dignity without price',
    scores: {
      consequence: 0.1,   // categorical imperative - no consequences matter
      individual: 0.75,   // autonomy and dignity of rational beings
      stoic: 0.75,        // discipline, duty despite inclination
      pragmatist: 0.15,   // transcendental idealism
      agency: 0.85,       // transcendental freedom foundational
      rationalist: 0.95,  // pure reason, synthetic a priori
      transcendent: 0.85  // noumena, moral law as transcendent
    }
  },
  {
    name: 'John Stuart Mill',
    dates: '1806–1873',
    description: 'The greatest happiness for the greatest number',
    scores: {
      consequence: 0.95,  // utilitarian calculus
      individual: 0.65,   // On Liberty - harm principle
      stoic: 0.4,
      pragmatist: 0.7,    // practical reform orientation
      agency: 0.6,        // soft determinism
      rationalist: 0.25,  // radical empiricist
      transcendent: 0.2   // naturalist worldview
    }
  },
  {
    name: 'Friedrich Nietzsche',
    dates: '1844–1900',
    description: 'Revaluator of values, philosopher with a hammer',
    scores: {
      consequence: 0.4,   // beyond good and evil - rejects both frameworks
      individual: 0.95,   // radical individualism, Übermensch
      stoic: 0.4,         // life-affirmation, not resignation
      pragmatist: 0.65,   // perspectivism, experimental philosophy
      agency: 0.9,        // will to power, self-overcoming
      rationalist: 0.35,  // suspicious of pure reason
      transcendent: 0.15  // this-worldly, eternal return
    }
  },
  {
    name: 'Simone de Beauvoir',
    dates: '1908–1986',
    description: 'Freedom through situation, ethics of ambiguity',
    scores: {
      consequence: 0.6,   // situational ethics
      individual: 0.55,   // balanced - individual freedom in social context
      stoic: 0.35,        // existential engagement over acceptance
      pragmatist: 0.75,   // concrete situations over abstractions
      agency: 0.85,       // radical freedom despite constraints
      rationalist: 0.4,   // phenomenological approach
      transcendent: 0.3   // existential materialism
    }
  },
  {
    name: 'Lao Tzu',
    dates: 'c. 6th century BCE',
    description: 'The way that can be spoken is not the eternal Way',
    scores: {
      consequence: 0.3,   // wu wei not calculation
      individual: 0.2,    // harmony with Tao over self
      stoic: 0.7,         // acceptance, going with the flow
      pragmatist: 0.7,    // natural way, not idealist systems
      agency: 0.2,        // wu wei - effortless action
      rationalist: 0.15,  // intuitive wisdom beyond words
      transcendent: 0.9   // Tao as ultimate reality
    }
  },
  {
    name: 'Confucius',
    dates: '551–479 BCE',
    description: 'Ritual propriety and filial devotion as social harmony',
    scores: {
      consequence: 0.25,  // virtue over outcomes
      individual: 0.15,   // filial piety, social roles, li
      stoic: 0.5,
      pragmatist: 0.75,   // ritual practice, concrete wisdom
      agency: 0.65,       // self-cultivation through effort
      rationalist: 0.4,   // learning through practice
      transcendent: 0.35  // humanistic focus, Heaven as moral order
    }
  },
  {
    name: 'Ibn Arabi',
    dates: '1165–1240',
    description: 'Mystic of the unity of being, poet of divine love',
    scores: {
      consequence: 0.2,
      individual: 0.15,   // wahdat al-wujud - unity of being
      stoic: 0.65,        // contemplative acceptance
      pragmatist: 0.2,    // metaphysical speculation
      agency: 0.4,        // divine will but human moral responsibility
      rationalist: 0.25,  // mystical intuition over logic
      transcendent: 0.95  // all is manifestation of the Real
    }
  },
  {
    name: 'Nāgārjuna',
    dates: 'c. 150–250 CE',
    description: 'Emptiness is form, form is emptiness',
    scores: {
      consequence: 0.45,  // Middle Way ethics
      individual: 0.1,    // anatta - no-self, interdependence
      stoic: 0.75,        // equanimity, non-attachment
      pragmatist: 0.5,    // neither eternalism nor nihilism
      agency: 0.2,        // no inherent self to have agency
      rationalist: 0.3,   // uses logic to transcend logic
      transcendent: 0.8   // emptiness as ultimate truth
    }
  },
  {
    name: 'bell hooks',
    dates: '1952–2021',
    description: 'Love as practice of freedom, theory from the margins',
    scores: {
      consequence: 0.65,  // practical outcomes of liberation
      individual: 0.2,    // community, solidarity, collective care
      stoic: 0.25,        // engaged activism over acceptance
      pragmatist: 0.85,   // lived experience, concrete change
      agency: 0.75,       // liberation requires action
      rationalist: 0.3,   // embodied, experiential knowledge
      transcendent: 0.25  // materialist focus on earthly justice
    }
  },
  {
    name: 'Marcus Aurelius',
    dates: '121–180 CE',
    description: 'Emperor and Stoic — duty, discipline, acceptance',
    scores: {
      consequence: 0.25,  // Stoic virtue ethics
      individual: 0.6,    // self-discipline and inner citadel
      stoic: 0.95,        // paradigmatic Stoic
      pragmatist: 0.55,   // practical wisdom applied to rule
      agency: 0.5,        // amor fati - love of fate
      rationalist: 0.75,  // reason and logos
      transcendent: 0.7   // divine reason pervading nature
    }
  },
  {
    name: 'Ludwig Wittgenstein',
    dates: '1889–1951',
    description: 'Silence on what cannot be said, clarity on what can',
    scores: {
      consequence: 0.35,
      individual: 0.4,    // language games are communal
      stoic: 0.6,         // austere, ascetic tendencies
      pragmatist: 0.7,    // later work - meaning as use
      agency: 0.55,
      rationalist: 0.45,  // empiricist turn in later work
      transcendent: 0.75  // mystical - what can be shown not said
    }
  },
  {
    name: 'Hannah Arendt',
    dates: '1906–1975',
    description: 'Action, natality, and the space of appearance',
    scores: {
      consequence: 0.45,  // action over outcomes
      individual: 0.65,   // plurality - each person unique
      stoic: 0.35,        // vita activa over contemplation
      pragmatist: 0.65,   // judgment in concrete situations
      agency: 0.8,        // natality - capacity to begin anew
      rationalist: 0.45,  // phenomenological approach
      transcendent: 0.3   // worldly politics over metaphysics
    }
  },
  {
    name: 'Iris Murdoch',
    dates: '1919–1999',
    description: 'Attention as love, the Good beyond the self',
    scores: {
      consequence: 0.3,   // virtue over calculation
      individual: 0.45,   // self must be unselfed
      stoic: 0.55,        // patient attention
      pragmatist: 0.35,   // Platonic realism
      agency: 0.7,        // moral attention is active work
      rationalist: 0.7,   // Platonic rationalism
      transcendent: 0.85  // the Good as transcendent reality
    }
  },
  {
    name: 'Zhuangzi',
    dates: 'c. 369–286 BCE',
    description: 'Butterfly dreamer, skeptic of certainty and categories',
    scores: {
      consequence: 0.25,  // spontaneous action not calculation
      individual: 0.7,    // authentic self beyond social roles
      stoic: 0.6,         // acceptance and inner freedom
      pragmatist: 0.75,   // natural spontaneity
      agency: 0.4,        // wu wei but authentic selfhood
      rationalist: 0.2,   // intuitive, anti-rational
      transcendent: 0.85  // Dao beyond words
    }
  },
  {
    name: 'Epicurus',
    dates: '341–270 BCE',
    description: 'Pleasure as absence of pain, tranquility as goal',
    scores: {
      consequence: 0.8,   // pleasure calculus
      individual: 0.75,   // personal ataraxia
      stoic: 0.05,        // definitionally epicurean
      pragmatist: 0.7,    // practical wisdom about pleasure
      agency: 0.6,
      rationalist: 0.25,  // sensory empiricism
      transcendent: 0.1   // atomist materialism
    }
  },
  {
    name: 'Thomas Aquinas',
    dates: '1225–1274',
    description: 'Faith seeking understanding, natural law as divine order',
    scores: {
      consequence: 0.3,   // natural law virtue ethics
      individual: 0.35,   // common good central
      stoic: 0.5,
      pragmatist: 0.4,    // synthesis but idealist leaning
      agency: 0.65,       // free will within providence
      rationalist: 0.85,  // natural theology, demonstration
      transcendent: 0.9   // divine essence and existence
    }
  },
  {
    name: 'David Hume',
    dates: '1711–1776',
    description: 'Sentiment as moral foundation, skeptic of reason alone',
    scores: {
      consequence: 0.75,  // utilitarian sympathies
      individual: 0.5,
      stoic: 0.45,
      pragmatist: 0.75,   // pragmatic skepticism
      agency: 0.35,       // soft determinism
      rationalist: 0.1,   // radical empiricist - all from impressions
      transcendent: 0.15  // naturalist, anti-metaphysical
    }
  },
  {
    name: 'Baruch Spinoza',
    dates: '1632–1677',
    description: 'God or Nature — substance, necessity, intellectual love',
    scores: {
      consequence: 0.2,   // ethics of understanding
      individual: 0.5,    // individual as mode of substance
      stoic: 0.8,         // amor dei intellectualis, acceptance of necessity
      pragmatist: 0.25,   // idealist monism
      agency: 0.15,       // strict determinism
      rationalist: 0.95,  // geometric method, demonstration
      transcendent: 0.9   // substance/God as all reality
    }
  },
  {
    name: 'Judith Butler',
    dates: '1956–',
    description: 'Gender as performance, precarity as ethical ground',
    scores: {
      consequence: 0.55,
      individual: 0.25,   // relational ontology
      stoic: 0.3,         // precarity and vulnerability central
      pragmatist: 0.8,    // performativity, iteration
      agency: 0.6,        // agency through constrained iteration
      rationalist: 0.3,   // poststructuralist
      transcendent: 0.2   // materialist embodiment
    }
  }
];

/**
 * Calculate Euclidean distance between user scores and philosopher profile
 * Uses all 7 axes with equal weighting
 */
function calculateDistance(userScores, philosopherScores) {
  const axes = ['consequence', 'individual', 'stoic', 'pragmatist', 'agency', 'rationalist', 'transcendent'];
  let sumSquares = 0;
  
  for (const axis of axes) {
    const diff = (userScores[axis] || 0.5) - philosopherScores[axis];
    sumSquares += diff * diff;
  }
  
  return Math.sqrt(sumSquares);
}

/**
 * Find the top 3 closest philosophers to user's profile
 * Returns array of {philosopher, matchPercentage}
 * 
 * @param {Object} normalizedScores - User's normalized axis scores (0-1)
 * @returns {Array} Top 3 matches with philosopher data and match percentage
 */
function findClosestPhilosophers(normalizedScores) {
  // Calculate distance for each philosopher
  const matches = PHILOSOPHERS.map(phil => {
    const distance = calculateDistance(normalizedScores, phil.scores);
    // Convert distance to match percentage
    // Max possible distance is sqrt(7) ≈ 2.646 when all axes are maximally different
    // Convert to 0-100 scale where 0 distance = 100% match
    const maxDistance = Math.sqrt(7);
    const matchPercentage = Math.round((1 - (distance / maxDistance)) * 100);
    
    return {
      philosopher: phil,
      distance: distance,
      matchPercentage: matchPercentage
    };
  });
  
  // Sort by distance (ascending) and return top 3
  matches.sort((a, b) => a.distance - b.distance);
  return matches.slice(0, 3);
}

/**
 * Render the philosopher match section with styled HTML
 * Shows primary match prominently, with two runner-ups
 * 
 * @param {Array} matches - Array of top 3 philosopher matches
 * @returns {string} HTML string for philosopher match section
 */
function renderPhilosopherMatch(matches) {
  if (!matches || matches.length === 0) {
    return '<div class="philosopher-section">No philosopher matches found.</div>';
  }
  
  const [primary, second, third] = matches;
  
  return `
    <div class="philosopher-section">
      <div class="philosopher-title">YOUR PHILOSOPHICAL KINDRED SPIRIT</div>
      
      <div class="philosopher-primary">
        <div class="philosopher-primary-name">${primary.philosopher.name}</div>
        <div class="philosopher-primary-dates">${primary.philosopher.dates}</div>
        <div class="philosopher-primary-desc">${primary.philosopher.description}</div>
        <div class="philosopher-match-bar">
          <div class="philosopher-match-fill" data-width="${primary.matchPercentage}%" style="width: 0%">
            <span class="philosopher-match-label">${primary.matchPercentage}% philosophical alignment</span>
          </div>
        </div>
      </div>
      
      ${second && third ? `
        <div class="philosopher-runners">
          <div class="philosopher-runner-title">close contenders</div>
          <div class="philosopher-runners-grid">
            <div class="philosopher-runner">
              <div class="philosopher-runner-name">${second.philosopher.name}</div>
              <div class="philosopher-runner-dates">${second.philosopher.dates}</div>
              <div class="philosopher-runner-desc">${second.philosopher.description}</div>
              <div class="philosopher-runner-match">${second.matchPercentage}% match</div>
            </div>
            
            <div class="philosopher-runner">
              <div class="philosopher-runner-name">${third.philosopher.name}</div>
              <div class="philosopher-runner-dates">${third.philosopher.dates}</div>
              <div class="philosopher-runner-desc">${third.philosopher.description}</div>
              <div class="philosopher-runner-match">${third.matchPercentage}% match</div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Main integration function - call this in showResults() after portrait rendering
 * Finds matches, renders HTML, and animates the match bar
 * 
 * @param {Object} normalizedScores - User's normalized axis scores
 */
function renderPhilosopherMatches(normalizedScores) {
  const matches = findClosestPhilosophers(normalizedScores);
  const html = renderPhilosopherMatch(matches);
  
  // Insert after the portrait section
  const portrait = document.getElementById('portrait');
  if (portrait) {
    portrait.insertAdjacentHTML('afterend', html);
    
    // Animate the match bar after a brief delay
    setTimeout(() => {
      const bar = document.querySelector('.philosopher-match-fill');
      if (bar) {
        bar.style.width = bar.getAttribute('data-width');
      }
    }, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLES - Add these to the <style> section in index.html
// ═══════════════════════════════════════════════════════════════════════════════
/*

.philosopher-section {
  margin: 3rem 0;
  padding: 2.5rem;
  background: var(--surface);
  border-radius: var(--radius);
  border: 1px solid var(--surface-2);
}

.philosopher-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.6rem;
  color: var(--accent);
  letter-spacing: 0.15em;
  margin-bottom: 2rem;
  text-align: center;
}

.philosopher-primary {
  text-align: center;
  margin-bottom: 3rem;
}

.philosopher-primary-name {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.philosopher-primary-dates {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.philosopher-primary-desc {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  color: var(--text-dim);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.philosopher-match-bar {
  max-width: 400px;
  margin: 0 auto;
  height: 32px;
  background: var(--surface-2);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.philosopher-match-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-dim), var(--accent));
  transition: width 1.5s cubic-bezier(0.4, 0.0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
}

.philosopher-match-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  color: var(--bg);
  letter-spacing: 0.05em;
  font-weight: 700;
  white-space: nowrap;
}

.philosopher-runners {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--surface-2);
}

.philosopher-runner-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.5rem;
  color: var(--text-faint);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1.5rem;
}

.philosopher-runners-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.philosopher-runner {
  padding: 1.5rem;
  background: var(--bg);
  border-radius: var(--radius);
  border: 1px solid var(--surface-2);
  transition: border-color 0.3s ease;
}

.philosopher-runner:hover {
  border-color: var(--accent-dim);
}

.philosopher-runner-name {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 0.3rem;
}

.philosopher-runner-dates {
  font-family: 'Space Mono', monospace;
  font-size: 0.5rem;
  color: var(--text-faint);
  letter-spacing: 0.05em;
  margin-bottom: 0.8rem;
}

.philosopher-runner-desc {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 0.9rem;
  font-style: italic;
  color: var(--text-dim);
  line-height: 1.6;
  margin-bottom: 0.8rem;
}

.philosopher-runner-match {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  color: var(--accent);
  letter-spacing: 0.05em;
  font-weight: 700;
}

/* Pink theme overrides */
[data-theme="pink"] .philosopher-section {
  border: 2px solid var(--accent);
  border-radius: 2px 8px 2px 12px;
  box-shadow: 3px 3px 0px var(--accent-dim);
}

[data-theme="pink"] .philosopher-runner {
  border: 2px solid var(--surface-2);
  border-radius: 4px;
  box-shadow: 2px 2px 0px rgba(0,0,0,0.05);
  transform: rotate(-0.5deg);
}

[data-theme="pink"] .philosopher-runner:nth-child(2) {
  transform: rotate(0.5deg);
}

[data-theme="pink"] .philosopher-runner:hover {
  transform: rotate(0deg) scale(1.02);
  box-shadow: 3px 3px 0px var(--accent-dim);
}

[data-theme="pink"] .philosopher-match-bar {
  border: 2px solid var(--accent-dim);
  box-shadow: 2px 2px 0px var(--accent-dim);
}

/* Mobile responsive */
@media (max-width: 600px) {
  .philosopher-runners-grid {
    grid-template-columns: 1fr;
  }
  
  .philosopher-primary-name {
    font-size: 1.6rem;
  }
  
  .philosopher-match-label {
    font-size: 0.5rem;
    padding-right: 0.5rem;
  }
}

*/
// ═══════════════════════════════════════════════════════════════════════════════
// END STYLES
// ═══════════════════════════════════════════════════════════════════════════════
