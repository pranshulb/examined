// ============================================================
// AGENT 2: CHOICES & REFLECTIONS QUALITY REVIEW
// ============================================================
// Scenarios changed and why:
//
// 0 (The Promise): Reflections A and B echo choice text near-verbatim. Need distinct insight.
// 1 (The Forecast): Choice B pragmatist:-1 is wrong — adapting practically IS pragmatism. Fix to +1.
// 2 (The Dinner Party): Choice C reflection repeats key phrase from choice text.
// 3 (The Absurd Commute): Choice B individual:-2 doesn't fit (pivoting is individual integrity). Levinas reflection feels forced.
// 7 (The Room): Choice B agency:-1 is wrong — stepping away to empower others IS pro-agency. Fix to +1.
// 12 (The Burning Gallery): Choice B uses Keats/negative capability, but the choice is a firm "no" — the opposite of dwelling in uncertainty. Better: Adorno.
// 14 (The Last Forest): Choice A cites Singer's "Animal Liberation" but the scenario is about human welfare calculus, not animal rights. Fix citation.
// 16 (The Scholar's Doubt): Choice C scores transcendent:1 for cynically gaming the system; reflection romanticizes what the choice calls "game the system." Fix scoring and tighten reflection.
// 17 (The Invisible Labor): Choice C has zero positive scores, making it feel like the "wrong" answer when it's genuinely defensible.
//
// Scenarios reviewed and left unchanged (already strong):
// 4 (The Lottery), 5 (The Ship), 6 (The Vulnerability Tax), 8 (Four Thousand Weeks),
// 9 (The Last Question), 10 (Library of Babel), 11 (The Untranslatable),
// 13 (The Circle), 15 (The Immortality Pill), 18 (The Whistleblower's Weight),
// 19 (The Inheritance Interview), 20 (The River's Memory), 21 (The Banking Hours),
// 22 (The Listening), 23 (The Patent)
// ============================================================

const CHOICE_FIXES = {

  0: { choices: [
    { label:'a', text:'Deliver it. A promise made to the dying carries the full weight of moral obligation. It does not become optional because the consequences are ugly.',
      scores: {consequence: -2, pragmatist: -1, agency: 0, individual: 1},
      reflection:'There\'s a reason deathbed promises feel different from ordinary ones — they can never be renegotiated, never updated with new information. Kant argued that\'s exactly what gives them force: a moral law that bends to circumstance isn\'t a law at all. You\'re not delivering a letter. You\'re deciding whether obligations survive the people who created them.',
      philosopher:'Immanuel Kant, Groundwork of the Metaphysics of Morals' },
    { label:'b', text:'Burn it. The promise was made to secure peace, not to inflict pain. Your friend could not have wanted this, and the dead do not get to override the living.',
      scores: {consequence: 2, pragmatist: 0, individual: -1, agency: 1},
      reflection:'Mill would push back on the idea that promises are sacred in themselves — what matters is what they\'re *for*. Your friend wanted peace for their sister, not a confession delivered from beyond the grave. When a rule produces the opposite of its intended effect, following it isn\'t integrity. It\'s stubbornness wearing a moral costume.',
      philosopher:'John Stuart Mill, Utilitarianism' },
    { label:'c', text:'Deliver it, but stay. Sit with her while she reads it. If you are going to honor a deathbed promise, you owe her your presence when the truth lands. You don\'t get to drop a grenade and walk away.',
      scores: {pragmatist: 1, agency: 0, rationalist: -1, individual: -1},
      reflection:'This is the move that refuses to separate the principle from its consequences. You honor the promise *and* take responsibility for what it does — which means the real moral weight isn\'t in the delivery but in what you do after. Responsibility doesn\'t end at the mailbox.',
      philosopher:'William James, Pragmatism' }
  ]},

  1: { choices: [
    { label:'a', text:'Devour everything. Travel, memorize faces, watch every sunrise you can reach. If loss is guaranteed, the only sane response is to <em>flood</em> yourself with what remains.',
      scores: {stoic: -2, individual: 1, agency: -1, pragmatist: -1},
      reflection:'This is the Epicurean wager — if pleasure and connection are what matter, then the rational response to guaranteed loss is to maximize what you have while you have it.',
      philosopher:'Epicurus, Letter to Menoeceus' },
    { label:'b', text:'Start adapting now. Learn braille, train with a cane, reorganize your life for the dark. Grieving is a luxury. Preparing is a choice you can still make.',
      scores: {stoic: 2, pragmatist: 1, individual: 0, agency: 1},
      reflection:'"Begin each day by telling yourself: today I shall meet with interference, ingratitude, insolence." Marcus Aurelius prepared for loss not to prevent feeling, but to keep feeling from destroying judgment.',
      philosopher:'Marcus Aurelius, Meditations, Book II' },
    { label:'c', text:'Change nothing. The countdown is a prison only if you let it be one. The moment you rearrange your life around a future loss, you have already lost the present.',
      scores: {agency: 1, stoic: 0, transcendent: 0, consequence: -1, individual: 1, rationalist: -1},
      reflection:'Sartre would say the diagnosis is irrelevant to how you live today. You are condemned to be free — to choose how you live regardless of what\'s coming. Acting on prophecy is just another form of bad faith.',
      philosopher:'Jean-Paul Sartre, Being and Nothingness' }
  ]},

  2: { choices: [
    { label:'a', text:'Say nothing. You did not ask for this knowledge. Confidence is sacred. The moment people cannot trust you with secrets, you lose access to truth entirely.',
      scores: {individual: 0, consequence: -1, stoic: 0, agency: -1, rationalist: -1},
      reflection:'Trust is the infrastructure of all relationships. Betray a confidence once and you\'ve not just broken one bond — you\'ve signaled that your loyalty is conditional.',
      philosopher:'Confucius, Analects — on the virtue of trustworthiness (xìn)' },
    { label:'b', text:'Tell her. Some truths outweigh the promise of privacy. She is building a life on a lie, and your silence makes you part of the architecture.',
      scores: {consequence: 2, individual: -1, pragmatist: 0, agency: 1},
      reflection:'Sometimes the utilitarian calculus is brutal but clear: the harm of silence outweighs the cost of an uncomfortable conversation. The question is whether you can live knowing and saying nothing.',
      philosopher:'Peter Singer, Practical Ethics' },
    { label:'c', text:'Go to the partner. Tell them what you know. Give them one chance to come clean. The person who did the wrong thing should be the one to face it.',
      scores: {agency: 0, pragmatist: 1, individual: 0, rationalist: 1},
      reflection:'You\'re not choosing truth or silence — you\'re choosing *who* delivers the truth. The virtue ethicist preserves agency where possible: the person who broke the trust should be the one to face the consequences of breaking it. You\'re not playing messenger. You\'re creating the conditions for someone else to do the right thing.',
      philosopher:'Aristotle, Nicomachean Ethics' }
  ]},

  3: { choices: [
    { label:'a', text:'Walk away. There is no dignity in defending something you know to be false. The courage is not in persisting; it is in admitting the ground has shifted beneath you.',
      scores: {agency: 1, stoic: 0, individual: 1, transcendent: -1, consequence: -1},
      reflection:'"One must imagine Sisyphus happy." But Camus never said Sisyphus had to push the same rock. The absurd hero chooses — that\'s the point. Choosing to stop is still a choice.',
      philosopher:'Albert Camus, The Myth of Sisyphus' },
    { label:'b', text:'Pivot, but be honest about why. Tell your supervisor the original argument collapsed. Salvage what you can — the research, the methods, the instincts that got you here — and build something that actually holds. Two years lost is cheaper than a career built on something you don\'t believe in.',
      scores: {individual: 0, consequence: 0, pragmatist: 1, rationalist: 1},
      reflection:'Peirce argued that the whole point of inquiry is self-correction — that getting it wrong and openly revising is not failure but the actual mechanism by which knowledge advances. A thesis that honestly accounts for its own collapse is more scientifically valuable than one that quietly papers over the cracks.',
      philosopher:'Charles Sanders Peirce, "The Fixation of Belief"' },
    { label:'c', text:'Finish it. Being wrong is part of the scholarly record. Write the most rigorous wrong thesis you can, defend it honestly, and let the next person build on the failure.',
      scores: {pragmatist: 0, stoic: 1, consequence: -1, agency: 1, individual: 1},
      reflection:'Kierkegaard called this the "leap." Sometimes commitment means following through even when the foundation cracks — not because you\'re naive, but because completion has its own kind of integrity.',
      philosopher:'Søren Kierkegaard, Fear and Trembling' }
  ]},

  7: { choices: [
    { label:'a', text:'Keep running it. If the community dies without you, that means it needs you. The people are happy. Building something people love is not a problem that requires solving.',
      scores: {consequence: 1, individual: -1, agency: -2, pragmatist: 1},
      reflection:'The benevolent dictator\'s argument. It works — until it doesn\'t. Mill warned that even good paternalism erodes the capacity for self-governance.',
      philosopher:'John Stuart Mill, On Liberty' },
    { label:'b', text:'Step away entirely. If it cannot survive without you, it was never a community. It was a performance. Let it find its own legs, or let it fall.',
      scores: {agency: 1, individual: 0, stoic: 0, transcendent: 2, consequence: -1},
      reflection:'"A leader is best when people barely know he exists." The Taoist principle: true influence empowers others to find their own way.',
      philosopher:'Lao Tzu, Tao Te Ching, Chapter 17' },
    { label:'c', text:'Start failing on purpose. Miss a booking. Let a small problem fester. Force other people into the gap. It will be messy, but dependency only breaks when the thing it depends on disappears.',
      scores: {individual: -2, pragmatist: 1, consequence: 0, agency: 1, rationalist: 1},
      reflection:'Dewey\'s democratic instinct: the answer to problems of leadership isn\'t less leadership — it\'s engineered opportunities for others to lead. Sometimes you have to create the vacuum.',
      philosopher:'John Dewey, The Public and Its Problems' }
  ]},

  12: { choices: [
    { label:'a', text:'Yes. The music exists independently of the person who made it. It moved you, it helped you, and that was real. Separating art from artist is not a cop-out. It is the only honest position.',
      scores: {consequence: 1, individual: -1, pragmatist: 1, transcendent: -1, rationalist: -1},
      reflection:'The Yoruba concept of àṣà holds that art\'s value is communal — once it enters the world, it belongs to everyone who encounters it, not to the person who made it.',
      philosopher:'Yoruba aesthetic philosophy, via Babatunde Lawal' },
    { label:'b', text:'No. You cannot unhear who made it. Every listen is now a small act of looking away, and the discomfort is not a flaw in your response. It <em>is</em> the response.',
      scores: {agency: 0, individual: 1, transcendent: 1, rationalist: -1, stoic: 0},
      reflection:'Adorno argued that after certain moral horrors, aesthetic experience cannot remain innocent — that the conditions of a work\'s creation become part of the work itself. Your discomfort isn\'t squeamishness. It\'s moral perception doing exactly what it\'s supposed to do.',
      philosopher:'Theodor Adorno, Aesthetic Theory' },
    { label:'c', text:'Listen, but don\'t pay. The art is still good; the person does not deserve your money. There is a practical middle that neither purity nor complicity requires you to ignore.',
      scores: {pragmatist: 2, stoic: 0, rationalist: -1, consequence: 1},
      reflection:'Zhuangzi would recognize this: a practical response that refuses the false binary. You don\'t have to choose between purity and pleasure if you\'re willing to be creative about it.',
      philosopher:'Zhuangzi, "The Happy Fish" & Inner Chapters' }
  ]},

  14: { choices: [
    { label:'a', text:'Yes. Four hundred people versus millions of tons of carbon. The calculus is brutal, but it is clear. Compensate them generously. Build the mine. Save what can still be saved.',
      scores: {consequence: 2, pragmatist: 0, transcendent: -2, individual: -1},
      reflection:'Singer\'s preference utilitarianism draws a clear line: aggregate suffering reduction outweighs localised disruption, however painful. The numbers don\'t lie.',
      philosopher:'Peter Singer, Practical Ethics' },
    { label:'b', text:'No. "We will destroy your home for the greater good" is what colonizers have always said. The community said no. That should be the end of it.',
      scores: {consequence: -2, transcendent: 2, agency: -1, individual: -1, rationalist: 1},
      reflection:'Arne Næss\'s deep ecology holds that land and the people who live on it have intrinsic value — not instrumental. You don\'t get to sacrifice someone else\'s home for your clean conscience.',
      philosopher:'Arne Næss, "The Shallow and the Deep" (1973)' },
    { label:'c', text:'Only if the community owns the mine. Not compensation. <em>Ownership</em>. Equity, profits, veto power at every stage. If they still say no, you walk away.',
      scores: {pragmatist: 2, consequence: 0, rationalist: 0, individual: -1, agency: 1},
      reflection:'Robin Wall Kimmerer, drawing on Potawatomi wisdom, speaks of the "Honorable Harvest" — take only what is given, use it well, give back. Extraction without relationship is just theft with better PR.',
      philosopher:'Robin Wall Kimmerer, Braiding Sweetgrass' }
  ]},

  16: { choices: [
    { label:'a', text:'Publish the correction immediately. Your reputation is less important than the truth, and a scholar who hides an error is no longer a scholar. The students will adapt.',
      scores: {rationalist: 2, agency: 1, stoic: 0, pragmatist: -1, consequence: -1, individual: 1},
      reflection:'Al-Ghazali walked away from the most prestigious academic post in the Islamic world because his philosophical framework collapsed in the face of genuine doubt. He called it "the deliverance from error."',
      philosopher:'Al-Ghazali, The Deliverer from Error (al-Munqidh min al-Dalāl)' },
    { label:'b', text:'Tell the PhD students first, privately. Help them pivot before you go public. You owe it to the people who trusted your work not to pull the ground out from under them without warning.',
      scores: {consequence: 0, individual: -1, pragmatist: 1, agency: 1},
      reflection:'Kuhn showed that paradigm shifts aren\'t instant conversions — they\'re slow, messy, social processes. Responsible revolution means bringing people with you.',
      philosopher:'Thomas Kuhn, The Structure of Scientific Revolutions' },
    { label:'c', text:'Quietly fix it in your next paper. Don\'t make a public spectacle — weave the correction into new work that supersedes the old. The academic system rewards confessions less than it rewards progress. Game the system.',
      scores: {pragmatist: 2, rationalist: -2, stoic: 0, consequence: 1},
      reflection:'There\'s a cynical wisdom here that the academy rarely acknowledges: the system punishes honesty and rewards seamless narratives of progress. Ibn Arabi held that truth reveals itself in its own time — but the question is whether you\'re trusting that process or just hiding behind it.',
      philosopher:'Ibn Arabi, Fusus al-Hikam (The Bezels of Wisdom)' }
  ]},

  17: { choices: [
    { label:'a', text:'Name it. Explicitly, publicly, in front of everyone. "You are carrying us, and it is not fair." Invisible problems stay invisible until someone makes them awkward.',
      scores: {consequence: 0, agency: 1, individual: -1, rationalist: 1, pragmatist: -1},
      reflection:'Carol Gilligan argued that the "ethic of care" is systematically devalued because it\'s coded as natural rather than skilled. Making it visible is a political act.',
      philosopher:'Carol Gilligan, In a Different Voice' },
    { label:'b', text:'Skip the speech. Start doing more. Quietly, consistently. Buy the toilet paper first, remember the birthdays, take over the mediation. The ethical response to care is to care <em>back</em>.',
      scores: {pragmatist: 1, stoic: 0, individual: -2, agency: 1, consequence: 1},
      reflection:'Nel Noddings\' care ethics is about responsiveness, not grand gestures. The ethical response to recognizing care is to care back — concretely, not abstractly.',
      philosopher:'Nel Noddings, Caring: A Relational Approach to Ethics' },
    { label:'c', text:'Talk to them privately. Ask what they actually want. Do not assume you know how to fix something you only just noticed.',
      scores: {agency: 0, individual: -1, consequence: -1, rationalist: -1, transcendent: 1},
      reflection:'bell hooks insisted that love is a practice of freedom, not a burden. The person doing the invisible work gets to define what justice looks like — not the person who just noticed. Asking is itself an act of respect that naming and fixing both skip past.',
      philosopher:'bell hooks, All About Love' }
  ]},

};
