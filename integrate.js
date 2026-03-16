#!/usr/bin/env node
// Integration script: applies all 4 agent patches to index.html

const fs = require('fs');
const path = '/tmp/personal_website/examined/index.html';
let html = fs.readFileSync(path, 'utf8');

// ===== AGENT 1: PROSE FIXES =====
// Replace body texts for specific scenarios
const PROSE_FIXES = {
  1: `Your doctor calls on a Tuesday. Something in your bloodwork. Not fatal, not painful — but in one year you will lose your eyesight completely. Irreversibly. The rest of your life will be fine, the doctor assures you. Just <em>dark</em>. You have twelve months of seeing left. Twelve months to watch light move across a room at different hours, to memorize the faces of everyone you love, to read a book with your own eyes. The countdown started the moment the phone rang, whether you acknowledge it or not. Every morning you wake now is one morning closer to a horizon you cannot push back.`,

  3: `Three years into a PhD, you are halfway through a thesis on something you used to care about deeply enough to spend years in a library. Last month you read a paper that proves your central argument is wrong — not wrong in a way that can be patched, but structurally, irreparably wrong. You could pivot and lose two years. You could quit and leave with nothing. Or you could push through to completion, producing scholarship you no longer believe in, building on a foundation you know is cracked. Your supervisor says finish. This is normal. No thesis is perfect. But something in you keeps asking <em>why?</em> — and the answer is not coming.`,

  8: `You are twenty-eight when the offer arrives: lead a project that could reshape how education works in your country. The kind of systemic intervention that might give millions of children a better start. The work will consume five years. No weekends, no sustained hobbies, no long dinners that stretch past midnight. Your relationships will narrow to the functional. The texture of daily life will flatten into something instrumental and relentless. Meanwhile, your best friend just had a baby whose early years you will largely miss. Your parents are entering the stage of life where time with them has started to feel finite. You have been meaning to learn piano for a decade. You have roughly <em>four thousand weeks</em> on this earth. The question is not what to do with them but what to sacrifice — because every yes forecloses a dozen other lives you might have lived.`,

  9: `It's late, and you are alone with this. You have been making choices for the last several minutes that you already knew the answers to before you clicked — perhaps you have known them for years but never said them plainly enough to feel their weight. That is the thing about philosophy: it does not teach you what to think. It forces you to <em>admit</em> what you already believe, to look directly at the principles you have been living by without quite naming them. All of this has been a mirror. The question now is not whether the reflection is flattering but whether it is true — and whether you have the courage to sit with what it shows you.`,

  10: `Your child is twelve and has never had to memorize anything substantial. AI does their research, drafts their essays, checks their arithmetic. They are happy, curious, engaged with ideas in their own way — but when you ask them to explain <em>why</em> something is true, not just what the answer is, they shrug and say "the AI told me." Their school wants to ban the tools entirely. Other parents think this is absurd — no different from banning calculators in the 1980s. You find yourself uncertain whether either side has fully grasped what is at stake.`,

  11: `Your best friend's father died last year — someone you were close to as well. At the funeral you said all the things one is supposed to say. Quiet condolences, memories offered carefully, presence maintained with steady attention. Your friend thanked you afterward, told you it helped. You believed them. But last night, unguarded and several drinks past sober, they said something that has been sitting heavy in your chest ever since: <em>"You don't actually understand what this is like."</em> And they are right. You have never lost a parent, never stood in that particular valley. What you offered was compassion filtered through imagination rather than lived knowledge. You were performing empathy, and performing it well enough that it seemed real to both of you — but now the gap between your goodwill and their suffering feels unbridgeable, and you are not sure language was ever built to close it.`,

  13: `Your religious community — the one you grew up in, the one your parents still attend every week — has taken a public stance against something you believe in deeply. Not as a matter of preference. As a moral conviction you hold in your bones. They are wrong, and you know it in a way that does not admit doubt. But these are also the people who fed your family when you couldn't feed yourselves. Who showed up at your door during the worst year of your life without being asked. Who taught you what kindness looks like in practice rather than in principle. You owe them something that cannot be reduced to gratitude, a debt made of presence and care and showing up. And yet staying means endorsing — or at least being complicit in your silence while they do harm under the banner of the same tradition that once held you.`,

  14: `A mining company wants lithium from a valley in Bolivia — the kind that goes into batteries for electric cars, the technology that is supposed to save us from climate collapse. The valley is home to four hundred indigenous people who have lived there for centuries. Their relationship to the land is not ownership in any sense the company's lawyers would recognize. It is closer to kinship. They do not want to move. The company offers money, new housing, jobs in the mine. The community says <em>no</em> — not because the offer is inadequate, but because the premise is unacceptable. The government is considering eminent domain. The planet is warming. The carbon clock is ticking. Millions of lives hang in the balance of whether we decarbonize fast enough. Four hundred people will not move, and you are asked to weigh their home against the aggregate suffering of millions who might lose theirs.`,

  15: `A single injection. Gene therapy. Your telomeres stop shortening — the biological clock that counts down to your body's obsolescence, halted mid-tick. You could live for centuries, perhaps longer. The catch: it is irreversible. No exit clause. No way to change your mind when the weight of centuries becomes unbearable. You will watch everyone you love die. All of them. Again and again — a procession of endings that you alone carry forward. Every relationship will be temporary for you in a way it is not for them, every intimacy shadowed by the knowledge that you will be the one left standing. And the urgency that makes Tuesday mornings feel real, that animal awareness that time is running out — the thought <em>"I should call my mother"</em> that only works because you might not get another chance — that vanishes. There is always tomorrow. And the day after that. And a thousand years of days after that.`,

  19: `The email arrives on a Tuesday morning: "Partner Track — Final Interview." Five years of work, distilled into a subject line. But you didn't build this alone. Your business partner — college roommate, first believer, the person who took a salary cut when the company was a fever dream and a maxed-out credit card — will be pushed out if you take this role. The fund wants you. Not both of you. They see your partner as "operational overhead." You know that's wrong. Every breakthrough was shared. Every crisis, they held the ship steady while you played the face. Your grandmother's phrase echoes: <em>umuntu ngumuntu ngabantu</em> — a person is a person through other people. The success they want to invest in was never yours alone. But the world doesn't reward partnerships the way it rewards individuals.`,

  22: `You are an environmental scientist assessing whether a patch of old-growth forest should be cleared for affordable housing. Three weeks of data — soil samples, biodiversity indexes, carbon sequestration rates, water table measurements — all pointing toward the same conclusion: the forest can be sustainably cleared if certain mitigation measures are followed. The numbers are solid. Your methodology is peer-reviewed. Then the local Aboriginal elder asks if you would sit with her in the forest for a morning before you write your report. You almost say no. You have deadlines, and sitting isn't data collection. But something in how she asks makes you say yes. She doesn't lecture you or argue with your findings. She sits. After a while you begin to hear things your instruments didn't measure: the particular quality of silence between birdcalls, the way light moves through the canopy in patterns that suggest relationships between species your survey never captured. A feeling — unscientific, unmeasurable, but unmistakable — that the forest is not a collection of organisms but a <em>presence</em>. She calls this dadirri. Deep listening. The kind that requires you to be quiet long enough for the land itself to speak.`,

  23: `A decade ago, during ethnobotanical fieldwork, an elder showed you a plant preparation her grandmother had taught her, passed down through a chain of knowledge stretching back further than anyone could trace. She shared it freely — not as transaction but as relationship, carrying with it the obligation of reciprocity and the understanding that gifts must keep moving. You published your findings with attribution and consent. A pharmaceutical company read your paper, synthesized the active compound, and developed a treatment now helping hundreds of thousands of people. The company is filing a patent. They have offered you a consultancy fee and co-inventor credit. The elder and her community have been offered nothing. Traditional knowledge, in the eyes of patent law, belongs to no one — the community's knowledge entered the public domain the moment you published it. You understand the legal logic. You also understand it rests on a foundation the elder would find incomprehensible: that knowledge can be owned, that sharing it freely means losing it, that the gift economy is just the commons waiting to be enclosed.`,
};

// ===== AGENT 2: CHOICE/REFLECTION FIXES =====
// These are scoring fixes and reflection improvements
// We'll apply these as targeted replacements

// Scenario 0: Fix reflections (not the full choices, just reflections)
const REFLECTION_FIXES = {
  0: {
    a: `There\\'s a reason deathbed promises feel different from ordinary ones — they can never be renegotiated, never updated with new information. Kant argued that\\'s exactly what gives them force: a moral law that bends to circumstance isn\\'t a law at all. You\\'re not delivering a letter. You\\'re deciding whether obligations survive the people who created them.`,
    b: `Mill would push back on the idea that promises are sacred in themselves — what matters is what they\\'re *for*. Your friend wanted peace for their sister, not a confession delivered from beyond the grave. When a rule produces the opposite of its intended effect, following it isn\\'t integrity. It\\'s stubbornness wearing a moral costume.`,
  },
  2: {
    c: `You\\'re not choosing truth or silence — you\\'re choosing *who* delivers the truth. The virtue ethicist preserves agency where possible: the person who broke the trust should be the one to face the consequences of breaking it. You\\'re not playing messenger. You\\'re creating the conditions for someone else to do the right thing.`,
  },
  12: {
    b: `Adorno argued that after certain moral horrors, aesthetic experience cannot remain innocent — that the conditions of a work\\'s creation become part of the work itself. Your discomfort isn\\'t squeamishness. It\\'s moral perception doing exactly what it\\'s supposed to do.`,
  },
  16: {
    c: `There\\'s a cynical wisdom here that the academy rarely acknowledges: the system punishes honesty and rewards seamless narratives of progress. Ibn Arabi held that truth reveals itself in its own time — but the question is whether you\\'re trusting that process or just hiding behind it.`,
  },
  17: {
    c: `bell hooks insisted that love is a practice of freedom, not a burden. The person doing the invisible work gets to define what justice looks like — not the person who just noticed. Asking is itself an act of respect that naming and fixing both skip past.`,
  },
};

// ===== Apply prose fixes =====
for (const [idx, newBody] of Object.entries(PROSE_FIXES)) {
  // Find the scenario body in the HTML - match the body field in the SCENARIOS array
  // We need to find the body: ` ... ` for each scenario
  const scenarioNum = parseInt(idx);
  
  // Find the scenario by looking for its chapter marker and then its body field
  const scenarios = html.split(/\n\s*\{[\s\n]*chapter:/);
  // This is fragile - let's use a different approach
  
  // Actually, let's find scenario bodies by matching title patterns
  // Each scenario has: body: `...`,
}

// Since regex on template literals is fragile, let's use a smarter approach
// Parse the SCENARIOS array, modify, and write back

// Extract the script section
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
if (!scriptMatch) { console.error('No script found'); process.exit(1); }
let script = scriptMatch[1];

// For prose fixes, we need to find each scenario's body and replace it
// Strategy: find each scenario by its unique title, then replace its body

const TITLES_TO_BODY = {};
for (const [idx, body] of Object.entries(PROSE_FIXES)) {
  // Get the scenario's title from the current file to use as anchor
  const i = parseInt(idx);
  TITLES_TO_BODY[i] = body;
}

// Parse scenario titles from the current file
const titlePattern = /title:\s*'([^']+)'/g;
let titleMatch;
const titles = [];
while ((titleMatch = titlePattern.exec(script)) !== null) {
  titles.push(titleMatch[1]);
}
console.log(`Found ${titles.length} scenario titles`);

// For each prose fix, find the body field after the title and replace it
for (const [idxStr, newBody] of Object.entries(PROSE_FIXES)) {
  const idx = parseInt(idxStr);
  const title = titles[idx];
  if (!title) { console.log(`Skipping prose fix for index ${idx} - title not found`); continue; }
  
  // Find: title: 'Title',\n    body: `...`,
  // The body field is a template literal that can span multiple lines
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const bodyRegex = new RegExp(
    `(title:\\s*'${escapedTitle}',\\s*\\n\\s*body:\\s*)\`[^]*?\`(,)`,
    ''
  );
  
  if (bodyRegex.test(script)) {
    script = script.replace(bodyRegex, `$1\`${newBody}\`$2`);
    console.log(`✅ Prose fix applied for scenario ${idx}: ${title}`);
  } else {
    console.log(`❌ Could not find body for scenario ${idx}: ${title}`);
  }
}

// ===== AGENT 2: Score fixes =====
// Fix scenario 1, choice B: pragmatist:-1 → pragmatist:1
script = script.replace(
  /scores:\s*\{stoic:\s*2,\s*pragmatist:\s*-1,\s*individual:\s*0,\s*agency:\s*1\}/,
  'scores: {stoic: 2, pragmatist: 1, individual: 0, agency: 1}'
);
console.log('✅ Fixed scenario 1 choice B scoring (pragmatist -1→+1)');

// Fix scenario 7, choice B: agency:-1 → agency:1
script = script.replace(
  /scores:\s*\{agency:\s*-1,\s*individual:\s*0,\s*stoic:\s*0,\s*transcendent:\s*2,\s*consequence:\s*-1\}/,
  'scores: {agency: 1, individual: 0, stoic: 0, transcendent: 2, consequence: -1}'
);
console.log('✅ Fixed scenario 7 choice B scoring (agency -1→+1)');

// Fix scenario 3, choice B: individual:-2 → individual:0, add rationalist:1
script = script.replace(
  /scores:\s*\{individual:\s*-2,\s*consequence:\s*0,\s*pragmatist:\s*1,\s*rationalist:\s*-1\}/,
  'scores: {individual: 0, consequence: 0, pragmatist: 1, rationalist: 1}'
);
console.log('✅ Fixed scenario 3 choice B scoring');

// Fix scenario 3, choice B reflection - replace Levinas with Peirce
script = script.replace(
  /reflection:'Levinas argued that ethics — our responsibility to the Other — is more fundamental than ontology\. You don\\'t need the thesis to be right\. You need the work to mean something to someone\.'/,
  "reflection:'Peirce argued that the whole point of inquiry is self-correction — that getting it wrong and openly revising is not failure but the actual mechanism by which knowledge advances. A thesis that honestly accounts for its own collapse is more scientifically valuable than one that quietly papers over the cracks.'"
);
console.log('✅ Fixed scenario 3 choice B reflection (Levinas→Peirce)');

// Fix scenario 3, choice B philosopher
script = script.replace(
  /philosopher:'Emmanuel Levinas, Totality and Infinity'/,
  "philosopher:'Charles Sanders Peirce, \"The Fixation of Belief\"'"
);
console.log('✅ Fixed scenario 3 choice B philosopher');

// Fix scenario 12, choice B reflection - replace Keats with Adorno
script = script.replace(
  /reflection:'Keats argued for "negative capability" — dwelling in discomfort without reaching for easy resolution\. Sometimes the right response to beauty is to let it become complicated\.'/,
  "reflection:'Adorno argued that after certain moral horrors, aesthetic experience cannot remain innocent — that the conditions of a work\\'s creation become part of the work itself. Your discomfort isn\\'t squeamishness. It\\'s moral perception doing exactly what it\\'s supposed to do.'"
);
console.log('✅ Fixed scenario 12 choice B reflection (Keats→Adorno)');

// Fix scenario 12, choice B philosopher
script = script.replace(
  /philosopher:'John Keats, letter to George & Tom Keats, 1817'/,
  "philosopher:'Theodor Adorno, Aesthetic Theory'"
);
console.log('✅ Fixed scenario 12 choice B philosopher');

// Fix scenario 14, choice A philosopher: Animal Liberation → Practical Ethics
script = script.replace(
  /philosopher:'Peter Singer, Animal Liberation'/,
  "philosopher:'Peter Singer, Practical Ethics'"
);
console.log('✅ Fixed scenario 14 choice A philosopher');

// Fix scenario 16, choice C scoring: transcendent:1 → pragmatist:2, consequence:1
script = script.replace(
  /scores:\s*\{transcendent:\s*1,\s*rationalist:\s*-2,\s*pragmatist:\s*0,\s*stoic:\s*0\}/,
  'scores: {pragmatist: 2, rationalist: -2, stoic: 0, consequence: 1}'
);
console.log('✅ Fixed scenario 16 choice C scoring');

// Fix scenario 16, choice C reflection
script = script.replace(
  /reflection:'Ibn Arabi held that truth reveals itself in its own time\. "My heart has become capable of every form\." Perhaps the flaw is not yours to confess but the field\\'s to discover\.'/,
  "reflection:'There\\'s a cynical wisdom here that the academy rarely acknowledges: the system punishes honesty and rewards seamless narratives of progress. Ibn Arabi held that truth reveals itself in its own time — but the question is whether you\\'re trusting that process or just hiding behind it.'"
);
console.log('✅ Fixed scenario 16 choice C reflection');

// Fix scenario 17, choice C scoring: add transcendent:1
script = script.replace(
  /scores:\s*\{agency:\s*0,\s*individual:\s*-1,\s*consequence:\s*-1,\s*rationalist:\s*-1,\s*transcendent:\s*0\}/,
  'scores: {agency: 0, individual: -1, consequence: -1, rationalist: -1, transcendent: 1}'
);
console.log('✅ Fixed scenario 17 choice C scoring');

// Fix scenario 17, choice C reflection
script = script.replace(
  /reflection:'bell hooks insisted that love is a practice of freedom, not a burden\. The person doing the invisible work gets to define what justice looks like — not the person who just noticed\.'/,
  "reflection:'bell hooks insisted that love is a practice of freedom, not a burden. The person doing the invisible work gets to define what justice looks like — not the person who just noticed. Asking is itself an act of respect that naming and fixing both skip past.'"
);
console.log('✅ Fixed scenario 17 choice C reflection');

// Fix scenario 0 reflections (choice A and B)
script = script.replace(
  /reflection:'Kant would nod\. A promise made to the dying carries the full weight of moral obligation — consequences be damned\. The world holds together because some things are unconditional\.'/,
  "reflection:'There\\'s a reason deathbed promises feel different from ordinary ones — they can never be renegotiated, never updated with new information. Kant argued that\\'s exactly what gives them force: a moral law that bends to circumstance isn\\'t a law at all. You\\'re not delivering a letter. You\\'re deciding whether obligations survive the people who created them.'"
);
console.log('✅ Fixed scenario 0 choice A reflection');

script = script.replace(
  /reflection:'Mill would agree — the promise was made to secure peace, not pain\. When the consequences of a rule clash with its purpose, a thoughtful person adapts\.'/,
  "reflection:'Mill would push back on the idea that promises are sacred in themselves — what matters is what they\\'re *for*. Your friend wanted peace for their sister, not a confession delivered from beyond the grave. When a rule produces the opposite of its intended effect, following it isn\\'t integrity. It\\'s stubbornness wearing a moral costume.'"
);
console.log('✅ Fixed scenario 0 choice B reflection');

// Fix scenario 2 choice C reflection
script = script.replace(
  /reflection:'The virtue ethicist\\'s instinct: preserve agency where you can\. The person who did the wrong thing should be the one to face it\. You\\'re not a messenger — you\\'re a pressure valve\.'/,
  "reflection:'You\\'re not choosing truth or silence — you\\'re choosing *who* delivers the truth. The virtue ethicist preserves agency where possible: the person who broke the trust should be the one to face the consequences of breaking it. You\\'re not playing messenger. You\\'re creating the conditions for someone else to do the right thing.'"
);
console.log('✅ Fixed scenario 2 choice C reflection');

// ===== AGENT 3: EXAMINED_IDS fix (14→15 scenarios) =====
script = script.replace(
  /const EXAMINED_IDS = \[0,1,2,3,4,5,6,7,8,13,15,17,18,22\]/,
  'const EXAMINED_IDS = [0,1,2,3,4,5,6,7,8,11,13,15,17,18,22]'
);
console.log('✅ Fixed EXAMINED_IDS (added scenario 11, now 15 scenarios)');

// ===== AGENT 3: maxP calculation =====
// Replace all instances of the old maxP calc
const oldMaxP = /const maxP = activeScenarios\.length <= 10 \? 6 : activeScenarios\.length <= 15 \? 8 : 10;/g;
const newMaxP = 'const maxP = Math.round(Math.min(activeScenarios.length * 0.6, 14));';
script = script.replace(oldMaxP, newMaxP);
console.log('✅ Fixed maxP calculation (proportional formula)');

// Also fix old format if present
const oldMaxP2 = /const maxP = activeScenarios\.length <= 10 \? 6 : 10;/g;
script = script.replace(oldMaxP2, newMaxP);

// ===== AGENT 3: Deliberation tracking state =====
script = script.replace(
  'let selectedChoice = null;\nlet selectedPath = null;\nlet traditions = {};',
  'let selectedChoice = null;\nlet selectedPath = null;\nlet traditions = {};\nlet deliberationTimes = [];\nlet scenarioStartTime = null;'
);
console.log('✅ Added deliberation tracking state');

// Reset deliberation in resetScores
script = script.replace(
  'function resetScores() {\n  scores = {};\n  for (const k of Object.keys(AXES)) scores[k] = 0;\n  traditions = {};\n}',
  'function resetScores() {\n  scores = {};\n  for (const k of Object.keys(AXES)) scores[k] = 0;\n  traditions = {};\n  deliberationTimes = [];\n  scenarioStartTime = null;\n}'
);
console.log('✅ Added deliberation reset in resetScores()');

// Start timer in renderScenario
script = script.replace(
  'function renderScenario() {\n  const s = activeScenarios[currentScenario];\n  selectedChoice = null;',
  'function renderScenario() {\n  const s = activeScenarios[currentScenario];\n  selectedChoice = null;\n  scenarioStartTime = Date.now();'
);
console.log('✅ Added scenario timer start in renderScenario()');

// Track time in selectChoice
script = script.replace(
  'function selectChoice(idx) {\n  if (selectedChoice !== null) return;\n  selectedChoice = idx;\n  const s = activeScenarios[currentScenario];',
  `function selectChoice(idx) {
  if (selectedChoice !== null) return;
  selectedChoice = idx;
  const deliberationTime = scenarioStartTime ? (Date.now() - scenarioStartTime) / 1000 : 0;
  deliberationTimes.push({
    scenarioIndex: currentScenario,
    scenarioTitle: activeScenarios[currentScenario].title,
    time: deliberationTime
  });
  const s = activeScenarios[currentScenario];`
);
console.log('✅ Added deliberation time tracking in selectChoice()');

// Add deliberation rendering call in showResults
script = script.replace(
  '  currentArchetype = archetype;\n  renderReadings(archetype);\n  loadWall();',
  '  currentArchetype = archetype;\n  renderReadings(archetype);\n  renderDeliberationInsights();\n  loadWall();'
);
console.log('✅ Added renderDeliberationInsights() call in showResults()');

// Add renderDeliberationInsights and renderExploration functions before emailResults
script = script.replace(
  'function emailResults() {',
  `function renderDeliberationInsights() {
  if (!deliberationTimes || deliberationTimes.length === 0) return;
  const sorted = [...deliberationTimes].sort((a, b) => b.time - a.time);
  const longest = sorted[0];
  const meaningful = deliberationTimes.filter(d => d.time >= 5);
  const shortest = meaningful.length > 0 ? meaningful.reduce((min, d) => d.time < min.time ? d : min) : sorted[sorted.length - 1];
  const avgTime = (deliberationTimes.reduce((sum, t) => sum + t.time, 0) / deliberationTimes.length).toFixed(1);
  const formatTime = s => s < 60 ? Math.round(s) + 's' : Math.floor(s/60) + 'm ' + Math.round(s%60) + 's';

  const html = \`
    <div class="deliberation-section">
      <div class="deliberation-title">your deliberation</div>
      <div class="deliberation-list">
        <div class="deliberation-entry">
          <span class="deliberation-scenario">longest pause: "\${longest.scenarioTitle}"</span>
          <span class="deliberation-time">\${formatTime(longest.time)}</span>
        </div>
        <div class="deliberation-entry">
          <span class="deliberation-scenario">quickest choice: "\${shortest.scenarioTitle}"</span>
          <span class="deliberation-time">\${formatTime(shortest.time)}</span>
        </div>
        <div class="deliberation-entry">
          <span class="deliberation-scenario">average deliberation</span>
          <span class="deliberation-time">\${avgTime}s</span>
        </div>
      </div>
    </div>
  \`;
  const readingsSection = document.getElementById('readings-section');
  if (readingsSection) readingsSection.insertAdjacentHTML('afterend', html);
}

function emailResults() {`
);
console.log('✅ Added renderDeliberationInsights() function');

// ===== AGENT 3: Further exploration in renderReadings =====
script = script.replace(
  `    </div>
  \`;
}

function copyResults`,
  `    </div>
    
    <div class="readings-title" style="margin-top: 3rem;">FURTHER EXPLORATION</div>
    <div class="readings-grid">
      <div class="reading-card" style="border-left: 3px solid var(--purple);">
        <div class="reading-book" style="font-style: normal; font-weight: 600;">FILM</div>
        <div class="reading-author" style="margin-bottom: 0.8rem; opacity: 0.6;">visual philosophy</div>
        <div class="reading-why">
          <strong>12 Angry Men</strong> — justice through deliberation<br>
          <strong>Stalker</strong> (Tarkovsky) — desire and meaning<br>
          <strong>After Life</strong> (Koreeda) — memory and identity<br>
          <strong>Incendies</strong> — truth and consequences
        </div>
      </div>
      <div class="reading-card" style="border-left: 3px solid var(--teal);">
        <div class="reading-book" style="font-style: normal; font-weight: 600;">DOCUMENTARY</div>
        <div class="reading-author" style="margin-bottom: 0.8rem; opacity: 0.6;">philosophy in practice</div>
        <div class="reading-why">
          <strong>The Examined Life</strong> (2008) — philosophers walking and talking<br>
          <strong>Waking Life</strong> (2001) — animated philosophical dialogue
        </div>
      </div>
      <div class="reading-card" style="border-left: 3px solid var(--orange);">
        <div class="reading-book" style="font-style: normal; font-weight: 600;">GAMES</div>
        <div class="reading-author" style="margin-bottom: 0.8rem; opacity: 0.6;">interactive ethics</div>
        <div class="reading-why">
          <strong>Disco Elysium</strong> — political philosophy &amp; identity<br>
          <strong>Papers, Please</strong> — bureaucracy &amp; moral compromise<br>
          <strong>The Stanley Parable</strong> — choice &amp; determinism<br>
          <strong>Outer Wilds</strong> — knowledge &amp; cosmic perspective
        </div>
      </div>
    </div>
  \`;
}

function copyResults`
);
console.log('✅ Added Further Exploration section to renderReadings()');

// ===== Reassemble HTML =====
html = html.replace(/<script>[\s\S]*<\/script>/, `<script>${script}</script>`);

// ===== AGENT 4: Add visual CSS before </style> =====
const visualCSS = fs.readFileSync('/root/.openclaw/workspace/projects/examined/patches/agent4-visual.css', 'utf8');
html = html.replace('</style>', `\n${visualCSS}\n</style>`);
console.log('✅ Injected Agent 4 visual CSS');

// Write final file
fs.writeFileSync(path, html, 'utf8');
console.log('\n🎉 Integration complete! File written to', path);

// Validate JS
try {
  const finalScript = html.match(/<script>([\s\S]*)<\/script>/)[1];
  new Function(finalScript);
  console.log('✅ JS validation passed');
} catch(e) {
  console.log('❌ JS validation FAILED:', e.message);
}
