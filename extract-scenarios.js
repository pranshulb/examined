const fs = require('fs');

const html = fs.readFileSync('index-v3.3.html', 'utf8');

// Extract the SCENARIOS array using regex
const match = html.match(/const SCENARIOS = \[([\s\S]*?)\n\];/);
if (!match) {
  console.error('Could not find SCENARIOS array');
  process.exit(1);
}

// Parse the scenarios - this is a bit hacky but should work
const scenariosText = match[1];

// Manual parsing - look for each scenario object
const scenarios = [];
const scenarioMatches = scenariosText.matchAll(/\{\s*chapter:\s*['"]([^'"]+)['"]/g);

let currentPos = 0;
for (const m of scenarioMatches) {
  currentPos = m.index;
}

// Alternative: just execute the JavaScript
try {
  const code = `
    const SCENARIOS = [${match[1]}];
    JSON.stringify(SCENARIOS.map((s, idx) => ({
      index: idx,
      chapter: s.chapter,
      title: s.title,
      tradition: s.tradition,
      choices: s.choices.map(c => ({
        label: c.label,
        position: c.text.substring(0, 60).replace(/<[^>]*>/g, ''),
        scores: c.scores,
        philosopher: c.philosopher.split(',')[0]
      }))
    })), null, 2);
  `;
  
  const result = eval(code);
  console.log(result);
} catch(e) {
  console.error('Error:', e.message);
  process.exit(1);
}
