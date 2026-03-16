// Extracted scenario choices with their philosophical positions
const SCENARIO_CHOICES = [
  // I - The Promise (deathbed promise)
  {
    chapter: "I", title: "The Promise",
    choices: [
      { label: "a", position: "strict deontology", scores: {consequence: -2, pragmatist: -1, agency: 0, individual: 1} },
      { label: "b", position: "consequentialist override", scores: {consequence: 2, pragmatist: 0, individual: -1, agency: 1} },
      { label: "c", position: "pragmatic presence", scores: {pragmatist: 1, agency: 0, rationalist: -1, individual: -1} }
    ]
  },
  // II - The Forecast (going blind)
  {
    chapter: "II", title: "The Forecast",
    choices: [
      { label: "a", position: "epicurean maximization", scores: {stoic: -2, individual: 1, agency: -1, pragmatist: -1} },
      { label: "b", position: "stoic preparation", scores: {stoic: 2, pragmatist: 1, individual: 0, agency: 1} },
      { label: "c", position: "existential freedom", scores: {agency: 1, stoic: 0, transcendent: 0, consequence: -1, individual: 1, rationalist: -1} }
    ]
  },
  // III - The Dinner Party (cheating revelation)
  {
    chapter: "III", title: "The Dinner Party",
    choices: [
      { label: "a", position: "trust preservation", scores: {individual: 0, consequence: -1, stoic: 0, agency: -1, rationalist: -1} },
      { label: "b", position: "utilitarian disclosure", scores: {consequence: 2, individual: -1, pragmatist: 0, agency: 1} },
      { label: "c", position: "virtue ethics mediation", scores: {agency: 0, pragmatist: 1, individual: 0, rationalist: 1} }
    ]
  },
  // IV - The Absurd Commute (failed thesis)
  {
    chapter: "IV", title: "The Absurd Commute",
    choices: [
      { label: "a", position: "absurdist discontinuation", scores: {agency: 1, stoic: 0, individual: 1, transcendent: -1, consequence: -1} },
      { label: "b", position: "pragmatic revision", scores: {individual: 0, consequence: 0, pragmatist: 1, rationalist: 1} },
      { label: "c", position: "existential commitment", scores: {pragmatist: 0, stoic: 1, consequence: -1, agency: 1, individual: 1} }
    ]
  },
  // V - The Lottery (wealth tax)
  {
    chapter: "V", title: "The Lottery",
    choices: [
      { label: "a", position: "utilitarian aggregate", scores: {consequence: 2, individual: -2, pragmatist: 0, rationalist: 1} },
      { label: "b", position: "libertarian rights", scores: {consequence: -2, individual: 2, agency: 0, rationalist: 1} },
      { label: "c", position: "pragmatic sustainability", scores: {pragmatist: 2, individual: 0, agency: 0, rationalist: 0, consequence: 1} }
    ]
  },
  // VI - The Ship (past self)
  {
    chapter: "VI", title: "The Ship",
    choices: [
      { label: "a", position: "continuity obligation", scores: {stoic: 0, individual: 1, agency: -1, transcendent: 0, rationalist: 1} },
      { label: "b", position: "nietzschean self-overcoming", scores: {agency: 1, stoic: 0, pragmatist: 0, individual: 1, transcendent: -1} },
      { label: "c", position: "buddhist non-attachment", scores: {pragmatist: -1, stoic: 0, individual: 0, transcendent: 2, agency: -1} }
    ]
  },
  // VII - The Vulnerability Tax (intimacy)
  {
    chapter: "VII", title: "The Vulnerability Tax",
    choices: [
      { label: "a", position: "aristotelian intimacy", scores: {stoic: -2, individual: -2, consequence: 0, agency: 1} },
      { label: "b", position: "partial disclosure", scores: {pragmatist: 1, stoic: 0, individual: 2, rationalist: 1} },
      { label: "c", position: "rilkean solitude", scores: {agency: 0, stoic: 1, consequence: -1, individual: 2, transcendent: 0} }
    ]
  },
  // VIII - The Room (community dependency)
  {
    chapter: "VIII", title: "The Room",
    choices: [
      { label: "a", position: "benevolent control", scores: {consequence: 1, individual: -1, agency: -2, pragmatist: 1} },
      { label: "b", position: "taoist withdrawal", scores: {agency: 1, individual: 0, stoic: 0, transcendent: 2, consequence: -1} },
      { label: "c", position: "democratic disruption", scores: {individual: -2, pragmatist: 1, consequence: 0, agency: 1, rationalist: 1} }
    ]
  },
  // IX - The Four Thousand Weeks (time choice)
  {
    chapter: "IX", title: "The Four Thousand Weeks",
    choices: [
      { label: "a", position: "arendtian action", scores: {individual: 0, agency: 1, stoic: -1, transcendent: -1, consequence: 1} },
      { label: "b", position: "presence over impact", scores: {stoic: 1, pragmatist: -2, individual: -2, transcendent: 1, agency: -1} },
      { label: "c", position: "illichian scale", scores: {pragmatist: 1, consequence: 0, agency: 1, individual: -1, rationalist: -1} }
    ]
  },
  // X - The Last Question
  {
    chapter: "X", title: "The Last Question",
    choices: [
      { label: "a", position: "socratic examination", scores: {stoic: 0, agency: 1, pragmatist: -1, rationalist: 1, individual: 1} },
      { label: "b", position: "relational attention", scores: {individual: -2, consequence: 0, stoic: 0, transcendent: 0} },
      { label: "c", position: "nagelian absurdism", scores: {pragmatist: 0, agency: 0, stoic: 0, transcendent: -1, rationalist: 1, individual: 1} }
    ]
  }
];

// Find all meaningful contradictions
function findTensions() {
  const tensions = [];
  let id = 1;

  for (let i = 0; i < SCENARIO_CHOICES.length; i++) {
    for (let j = i + 1; j < SCENARIO_CHOICES.length; j++) {
      const s1 = SCENARIO_CHOICES[i];
      const s2 = SCENARIO_CHOICES[j];

      // Check all choice pairs between these scenarios
      for (const c1 of s1.choices) {
        for (const c2 of s2.choices) {
          // Look for axis contradictions
          for (const axis in c1.scores) {
            if (c2.scores[axis] !== undefined) {
              const score1 = c1.scores[axis];
              const score2 = c2.scores[axis];
              
              // Strong contradiction: opposite extremes (±2 or significant gap)
              if (Math.abs(score1 - score2) >= 3) {
                tensions.push({
                  id: `tension_${id++}`,
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
                  score1: score1,
                  score2: score2,
                  tensionDescription: generateDescription(s1, c1, s2, c2, axis, score1, score2),
                  severity: Math.abs(score1 - score2) >= 4 ? "high" : "medium"
                });
              }
            }
          }
        }
      }
    }
  }

  return tensions;
}

function generateDescription(s1, c1, s2, c2, axis, score1, score2) {
  const axisLabels = {
    consequence: { pos: "consequentialist", neg: "deontological" },
    individual: { pos: "individualist", neg: "communal" },
    stoic: { pos: "stoic acceptance", neg: "epicurean pursuit" },
    pragmatist: { pos: "pragmatic", neg: "idealist" },
    agency: { pos: "libertarian free will", neg: "determinist" },
    rationalist: { pos: "rationalist", neg: "empiricist" },
    transcendent: { pos: "transcendent", neg: "materialist" }
  };

  const label = axisLabels[axis];
  const dir1 = score1 > 0 ? label.pos : label.neg;
  const dir2 = score2 > 0 ? label.pos : label.neg;

  return `In "${s1.title}" you took a ${dir1} stance (${c1.position}), but in "${s2.title}" you chose a ${dir2} approach (${c2.position}).`;
}

const result = {
  tensionPairs: findTensions()
};

console.log(JSON.stringify(result, null, 2));
