// Complete scenario extraction with all philosophical positions and scores
// Based on index-v3.3.html SCENARIOS array

const SCENARIOS = [
  {
    id: 0, chapter: "I", title: "The Promise", tradition: "Western Ethics",
    choices: [
      { label: "a", position: "deontological duty", scores: {consequence: -2, pragmatist: -1, individual: 1} },
      { label: "b", position: "consequentialist calculation", scores: {consequence: 2, individual: -1, agency: 1} },
      { label: "c", position: "pragmatic presence", scores: {pragmatist: 1, individual: -1} }
    ]
  },
  {
    id: 1, chapter: "II", title: "The Forecast", tradition: "Stoicism & Existentialism",
    choices: [
      { label: "a", position: "epicurean maximization", scores: {stoic: -2, individual: 1, agency: -1, pragmatist: -1} },
      { label: "b", position: "stoic preparation", scores: {stoic: 2, pragmatist: 1, agency: 1} },
      { label: "c", position: "existential freedom", scores: {agency: 1, stoic: 0, consequence: -1, individual: 1, rationalist: -1} }
    ]
  },
  {
    id: 2, chapter: "III", title: "The Dinner Party", tradition: "Confucian & Western Ethics",
    choices: [
      { label: "a", position: "trust preservation", scores: {consequence: -1, agency: -1, rationalist: -1} },
      { label: "b", position: "utilitarian disclosure", scores: {consequence: 2, individual: -1, agency: 1} },
      { label: "c", position: "virtue ethics mediation", scores: {pragmatist: 1, rationalist: 1} }
    ]
  },
  {
    id: 3, chapter: "IV", title: "The Absurd Commute", tradition: "Existentialism & Absurdism",
    choices: [
      { label: "a", position: "absurdist discontinuation", scores: {agency: 1, individual: 1, consequence: -1} },
      { label: "b", position: "pragmatic revision", scores: {pragmatist: 1, rationalist: 1} },
      { label: "c", position: "existential commitment", scores: {stoic: 1, consequence: -1, agency: 1, individual: 1} }
    ]
  },
  {
    id: 4, chapter: "V", title: "The Lottery", tradition: "Political Philosophy",
    choices: [
      { label: "a", position: "utilitarian aggregate", scores: {consequence: 2, individual: -2, rationalist: 1} },
      { label: "b", position: "libertarian rights", scores: {consequence: -2, individual: 2, rationalist: 1} },
      { label: "c", position: "pragmatic sustainability", scores: {pragmatist: 2, rationalist: 0, consequence: 1} }
    ]
  },
  {
    id: 5, chapter: "VI", title: "The Ship", tradition: "Metaphysics & Buddhist Philosophy",
    choices: [
      { label: "a", position: "continuity obligation", scores: {individual: 1, agency: -1, rationalist: 1} },
      { label: "b", position: "nietzschean self-overcoming", scores: {agency: 1, individual: 1, transcendent: -1} },
      { label: "c", position: "buddhist non-attachment", scores: {pragmatist: -1, transcendent: 2, agency: -1} }
    ]
  },
  {
    id: 6, chapter: "VII", title: "The Vulnerability Tax", tradition: "Existentialism & Virtue Ethics",
    choices: [
      { label: "a", position: "aristotelian intimacy", scores: {stoic: -2, individual: -2, agency: 1} },
      { label: "b", position: "partial disclosure", scores: {pragmatist: 1, individual: 2, rationalist: 1} },
      { label: "c", position: "rilkean solitude", scores: {stoic: 1, consequence: -1, individual: 2} }
    ]
  },
  {
    id: 7, chapter: "VIII", title: "The Room", tradition: "Taoism & Political Philosophy",
    choices: [
      { label: "a", position: "benevolent control", scores: {consequence: 1, individual: -1, agency: -2, pragmatist: 1} },
      { label: "b", position: "taoist withdrawal", scores: {agency: 1, transcendent: 2, consequence: -1} },
      { label: "c", position: "democratic disruption", scores: {individual: -2, pragmatist: 1, agency: 1, rationalist: 1} }
    ]
  },
  {
    id: 8, chapter: "IX", title: "The Four Thousand Weeks", tradition: "Existentialism & Phenomenology",
    choices: [
      { label: "a", position: "arendtian action", scores: {agency: 1, stoic: -1, transcendent: -1, consequence: 1} },
      { label: "b", position: "presence over impact", scores: {stoic: 1, pragmatist: -2, individual: -2, transcendent: 1, agency: -1} },
      { label: "c", position: "illichian scale", scores: {pragmatist: 1, agency: 1, individual: -1, rationalist: -1} }
    ]
  },
  {
    id: 9, chapter: "X", title: "The Last Question", tradition: "Socratic Method",
    choices: [
      { label: "a", position: "socratic examination", scores: {agency: 1, pragmatist: -1, rationalist: 1, individual: 1} },
      { label: "b", position: "relational attention", scores: {individual: -2} },
      { label: "c", position: "nagelian absurdism", scores: {transcendent: -1, rationalist: 1, individual: 1} }
    ]
  },
  {
    id: 10, chapter: "XI", title: "The Library of Babel", tradition: "Epistemology · East & West",
    choices: [
      { label: "a", position: "empiricist pragmatism", scores: {consequence: 1, rationalist: -2, pragmatist: 1, transcendent: -1} },
      { label: "b", position: "rationalist cultivation", scores: {rationalist: 2, pragmatist: -2, consequence: -1} },
      { label: "c", position: "confucian adaptation", scores: {pragmatist: 1, agency: 1, consequence: 1} }
    ]
  },
  {
    id: 11, chapter: "XII", title: "The Untranslatable", tradition: "Philosophy of Language · Phenomenology",
    choices: [
      { label: "a", position: "wittgensteinian silence", scores: {transcendent: 2, rationalist: -2, individual: -1, agency: -1} },
      { label: "b", position: "mono no aware honesty", scores: {individual: 1, stoic: 1, pragmatist: -1} },
      { label: "c", position: "gadamerian fusion", scores: {pragmatist: 1, individual: -1} }
    ]
  },
  {
    id: 12, chapter: "XIII", title: "The Burning Gallery", tradition: "Aesthetics · African & Western",
    choices: [
      { label: "a", position: "communal ownership", scores: {consequence: 1, individual: -1, pragmatist: 1, transcendent: -1, rationalist: -1} },
      { label: "b", position: "adornian integrity", scores: {individual: 1, transcendent: 1, rationalist: -1} },
      { label: "c", position: "zhuangzian pragmatism", scores: {pragmatist: 2, rationalist: -1, consequence: 1} }
    ]
  },
  {
    id: 13, chapter: "XIV", title: "The Circle", tradition: "Ubuntu · African Philosophy",
    choices: [
      { label: "a", position: "ubuntu loyalty", scores: {individual: -2, agency: -1} },
      { label: "b", position: "thoreauvian conscience", scores: {individual: 2, agency: 1, consequence: -1, rationalist: 1} },
      { label: "c", position: "lordean resistance", scores: {agency: 1, individual: -1, consequence: 1, rationalist: 1} }
    ]
  },
  {
    id: 14, chapter: "XV", title: "The Last Forest", tradition: "Environmental Philosophy · Indigenous Thought",
    choices: [
      { label: "a", position: "utilitarian calculus", scores: {consequence: 2, transcendent: -2, individual: -1} },
      { label: "b", position: "deep ecology", scores: {consequence: -2, transcendent: 2, agency: -1, individual: -1, rationalist: 1} },
      { label: "c", position: "reciprocal ownership", scores: {pragmatist: 2, individual: -1, agency: 1} }
    ]
  },
  {
    id: 15, chapter: "XVI", title: "The Immortality Pill", tradition: "Existentialism · Buddhist Philosophy",
    choices: [
      { label: "a", position: "lucretian embrace", scores: {stoic: -1, transcendent: -1, agency: 1, consequence: 1} },
      { label: "b", position: "heideggerian finitude", scores: {stoic: 2, transcendent: 1, agency: -1, rationalist: 1} },
      { label: "c", position: "buddhist middle way", scores: {agency: 1, pragmatist: 1, individual: 1} }
    ]
  },
  {
    id: 16, chapter: "XVII", title: "The Scholar's Doubt", tradition: "Islamic Philosophy · Epistemology",
    choices: [
      { label: "a", position: "ghazalian truth", scores: {rationalist: 2, agency: 1, pragmatist: -1, consequence: -1, individual: 1} },
      { label: "b", position: "kuhnian transition", scores: {pragmatist: 1, agency: 1} },
      { label: "c", position: "strategic correction", scores: {pragmatist: 2, rationalist: -2, consequence: 1} }
    ]
  },
  {
    id: 17, chapter: "XVIII", title: "The Invisible Labor", tradition: "Feminist Philosophy · Ethics of Care",
    choices: [
      { label: "a", position: "gilliganian visibility", scores: {agency: 1, individual: -1, rationalist: 1, pragmatist: -1} },
      { label: "b", position: "noddingsian reciprocity", scores: {pragmatist: 1, individual: -2, agency: 1, consequence: 1} },
      { label: "c", position: "hooksian listening", scores: {individual: -1, consequence: -1, rationalist: -1, transcendent: 1} }
    ]
  },
  {
    id: 18, chapter: "XIX", title: "The Whistleblower's Weight", tradition: "Maat (Egyptian Ethics)",
    choices: [
      { label: "a", position: "maat alignment", scores: {consequence: -2, individual: -1, stoic: 1, pragmatist: -2, agency: 2, transcendent: 2} },
      { label: "b", position: "systemic maat", scores: {pragmatist: 2, rationalist: 2, agency: 1, consequence: 1} },
      { label: "c", position: "restorative maat", scores: {consequence: 0, individual: -1, stoic: 2, rationalist: 1, transcendent: 2} }
    ]
  },
  {
    id: 19, chapter: "XX", title: "The Inheritance Interview", tradition: "Ubuntu (Southern African Ethics)",
    choices: [
      { label: "a", position: "individual advancement", scores: {individual: 2, pragmatist: 2, consequence: 1, rationalist: 1} },
      { label: "b", position: "ubuntu refusal", scores: {consequence: -1, individual: -2, stoic: 2, pragmatist: -2, agency: 2, transcendent: 2} },
      { label: "c", position: "pragmatic ubuntu", scores: {pragmatist: 2, agency: 2, stoic: 1, transcendent: 1} }
    ]
  },
  {
    id: 20, chapter: "XXI", title: "The River's Memory", tradition: "Buen Vivir (Andean Philosophy)",
    choices: [
      { label: "a", position: "utilitarian scale", scores: {consequence: 2, stoic: -1, transcendent: -2, individual: -1, pragmatist: 1} },
      { label: "b", position: "sumak kawsay", scores: {transcendent: 2, pragmatist: -1, consequence: -1, stoic: 1} },
      { label: "c", position: "phased partnership", scores: {pragmatist: 2, rationalist: 1, agency: 1, transcendent: 1} }
    ]
  },
  {
    id: 21, chapter: "XXII", title: "The Banking Hours", tradition: "Freire (Latin American Pedagogy)",
    choices: [
      { label: "a", position: "credentialist pragmatism", scores: {consequence: 2, pragmatist: 2, agency: -1, transcendent: -2, rationalist: 1} },
      { label: "b", position: "freirean liberation", scores: {consequence: -1, pragmatist: -2, agency: 2, transcendent: 2, individual: -1, rationalist: -1} },
      { label: "c", position: "transgressive integration", scores: {pragmatist: 1, agency: 1, consequence: 1, rationalist: 1} }
    ]
  },
  {
    id: 22, chapter: "XXIII", title: "The Listening", tradition: "Dadirri (Aboriginal Australian Philosophy)",
    choices: [
      { label: "a", position: "empirical data", scores: {rationalist: 2, pragmatist: 1, consequence: 1, transcendent: -2, agency: 1} },
      { label: "b", position: "dadirri listening", scores: {transcendent: 2, rationalist: -2, agency: -1, individual: -1, consequence: -1, stoic: 1} },
      { label: "c", position: "epistemological bridge", scores: {pragmatist: 1, transcendent: 1, agency: 1, rationalist: 0, individual: -1} }
    ]
  },
  {
    id: 23, chapter: "XXIV", title: "The Patent", tradition: "Indigenous Reciprocity (Potawatomi/Kimmerer)",
    choices: [
      { label: "a", position: "consequentialist pragmatism", scores: {consequence: 2, pragmatist: 1, individual: 1, transcendent: -2} },
      { label: "b", position: "gift economy", scores: {agency: 2, pragmatist: -2, transcendent: 1, consequence: -1, rationalist: 1} },
      { label: "c", position: "reciprocal retrofit", scores: {pragmatist: 2, consequence: 1, transcendent: 0, agency: 1, individual: -1, rationalist: 1} }
    ]
  }
];

// Find all philosophical contradictions
function findTensionPairs() {
  const tensions = [];
  const idGen = { current: 1 }; // Use object to pass by reference

  // Helper: describe axis direction
  const axisDescriptions = {
    consequence: {
      high: "consequentialist calculation",
      low: "deontological principle",
      axis_name: "ethics"
    },
    individual: {
      high: "radical individualism",
      low: "communal obligation",
      axis_name: "self"
    },
    stoic: {
      high: "stoic acceptance",
      low: "epicurean pursuit",
      axis_name: "endurance"
    },
    pragmatist: {
      high: "pragmatic adaptation",
      low: "idealist commitment",
      axis_name: "method"
    },
    agency: {
      high: "libertarian free will",
      low: "determinist constraint",
      axis_name: "freedom"
    },
    rationalist: {
      high: "rationalist reasoning",
      low: "empiricist experience",
      axis_name: "knowledge"
    },
    transcendent: {
      high: "transcendent meaning",
      low: "materialist grounding",
      axis_name: "reality"
    }
  };

  // Check every pair of scenarios
  for (let i = 0; i < SCENARIOS.length; i++) {
    for (let j = i + 1; j < SCENARIOS.length; j++) {
      const s1 = SCENARIOS[i];
      const s2 = SCENARIOS[j];

      // Check all choice combinations
      for (const c1 of s1.choices) {
        for (const c2 of s2.choices) {
          
          // Find axis contradictions
          for (const axis in c1.scores) {
            if (c2.scores[axis] !== undefined) {
              const score1 = c1.scores[axis];
              const score2 = c2.scores[axis];
              const gap = Math.abs(score1 - score2);
              
              // Significant contradiction: ≥3 points apart
              if (gap >= 3) {
                const desc = axisDescriptions[axis];
                const dir1 = score1 > 0 ? desc.high : desc.low;
                const dir2 = score2 > 0 ? desc.high : desc.low;
                
                tensions.push({
                  id: `tension_${idGen.current++}`,
                  scenario1: {
                    chapter: s1.chapter,
                    title: s1.title,
                    choiceLabel: c1.label,
                    position: c1.position
                  },
                  scenario2: {
                    chapter: s2.chapter,
                    title: s2.title,
                    choiceLabel: c2.label,
                    position: c2.position
                  },
                  axis: axis,
                  tensionDescription: `In "${s1.title}" you chose ${dir1} (${c1.position}), but in "${s2.title}" you opted for ${dir2} (${c2.position}).`,
                  severity: gap >= 4 ? "high" : "medium"
                });
              }
            }
          }

          // Check for specific philosophical contradictions beyond just axes
          checkPhilosophicalContradictions(s1, c1, s2, c2, tensions, idGen);
        }
      }
    }
  }

  return tensions;
}

function checkPhilosophicalContradictions(s1, c1, s2, c2, tensions, idGen) {
  // Specific position-based contradictions that matter philosophically
  const contradictions = [
    // Deontology vs Consequentialism
    {
      pos1: ["deontological duty", "maat alignment", "ghazalian truth"],
      pos2: ["consequentialist calculation", "utilitarian aggregate", "utilitarian disclosure", "utilitarian calculus"],
      description: "You honored absolute principles in one scenario, but calculated outcomes in another."
    },
    // Individual vs Communal
    {
      pos1: ["libertarian rights", "nietzschean self-overcoming", "thoreauvian conscience", "individual advancement"],
      pos2: ["ubuntu loyalty", "ubuntu refusal", "communal ownership", "noddingsian reciprocity", "pragmatic ubuntu"],
      description: "You championed individual autonomy in one scenario, but prioritized communal bonds in another."
    },
    // Rationalist vs Empiricist
    {
      pos1: ["rationalist cultivation", "ghazalian truth", "empirical data"],
      pos2: ["empiricist pragmatism", "dadirri listening", "wittgensteinian silence"],
      description: "You trusted reason and analysis in one scenario, but direct experience in another."
    },
    // Action vs Contemplation
    {
      pos1: ["arendtian action", "freirean liberation", "lordean resistance"],
      pos2: ["presence over impact", "rilkean solitude", "taoist withdrawal", "dadirri listening"],
      description: "You chose active engagement in one scenario, but contemplative withdrawal in another."
    },
    // System vs Exit
    {
      pos1: ["strategic correction", "transgressive integration", "reciprocal retrofit"],
      pos2: ["gift economy", "deep ecology", "ubuntu refusal", "thoreauvian conscience"],
      description: "You worked within the system in one scenario, but rejected it entirely in another."
    }
  ];

  for (const contra of contradictions) {
    const matchesPos1 = contra.pos1.some(p => c1.position.includes(p) || p.includes(c1.position));
    const matchesPos2 = contra.pos2.some(p => c2.position.includes(p) || p.includes(c2.position));
    
    if (matchesPos1 && matchesPos2) {
      tensions.push({
        id: `tension_${idGen.current++}`,
        scenario1: {
          chapter: s1.chapter,
          title: s1.title,
          choiceLabel: c1.label,
          position: c1.position
        },
        scenario2: {
          chapter: s2.chapter,
          title: s2.title,
          choiceLabel: c2.label,
          position: c2.position
        },
        axis: "philosophical_position",
        tensionDescription: contra.description + ` (${s1.title} vs ${s2.title})`,
        severity: "high"
      });
    }
  }
}

// Generate output
const result = {
  metadata: {
    totalScenarios: SCENARIOS.length,
    totalChoices: SCENARIOS.reduce((sum, s) => sum + s.choices.length, 0),
    analysisDate: new Date().toISOString(),
    description: "All meaningful philosophical contradictions between scenario-choice pairs"
  },
  tensionPairs: findTensionPairs()
};

// Write to file
const fs = require('fs');
fs.writeFileSync('tension-pairs.json', JSON.stringify(result, null, 2));

console.log(`✓ Generated ${result.tensionPairs.length} tension pairs`);
console.log(`✓ Written to tension-pairs.json`);
