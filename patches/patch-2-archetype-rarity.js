/**
 * PATCH 2: ARCHETYPE RARITY FEATURE
 * 
 * Adds a "only X% of people share your archetype" badge to results screen
 * based on community wall data.
 * 
 * INTEGRATION INSTRUCTIONS:
 * 
 * 1. Add this function near the top of the <script> section (after WALL_API constant):
 */

/**
 * Calculate what percentage of wall entries share a given archetype
 * @param {Array} entries - Wall entries from API (each has { name, archetype, date })
 * @param {String} archetypeName - The archetype to calculate rarity for
 * @returns {Number} - Percentage (0-100) of people with this archetype
 */
function calculateArchetypeRarity(entries, archetypeName) {
  if (!entries || entries.length === 0) return null;
  
  const matchCount = entries.filter(e => e.archetype === archetypeName).length;
  const percentage = (matchCount / entries.length) * 100;
  
  return Math.round(percentage * 10) / 10; // Round to 1 decimal place
}

/**
 * Generate HTML for a styled rarity badge
 * @param {Number} percentage - Percentage (0-100) of people with this archetype
 * @param {String} archetypeName - Name of the archetype
 * @returns {String} - HTML for the rarity indicator
 */
function renderRarityBadge(percentage, archetypeName) {
  if (percentage === null) {
    return ''; // No data yet - don't show anything
  }
  
  let label, description;
  
  if (percentage < 10) {
    label = 'rare';
    description = `only ${percentage}% share your archetype`;
  } else if (percentage < 25) {
    label = 'uncommon';
    description = `${percentage}% share your archetype`;
  } else {
    label = null; // No special label for common archetypes
    description = `${percentage}% of examined thinkers share your archetype`;
  }
  
  return `
    <div class="rarity-badge" data-rarity="${percentage < 10 ? 'rare' : percentage < 25 ? 'uncommon' : 'common'}">
      ${label ? `<span class="rarity-label">${label}</span>` : ''}
      <span class="rarity-description">${description}</span>
    </div>
  `;
}

/**
 * INTEGRATION STEP 2:
 * 
 * In the showResults() function, find this section (around line 950-960):
 * 
 *   document.getElementById('archetype-name').textContent = archetype.name;
 *   document.getElementById('archetype-sub').textContent = archetype.subtitle;
 * 
 * Replace it with:
 * 
 *   document.getElementById('archetype-name').textContent = archetype.name;
 *   document.getElementById('archetype-sub').textContent = archetype.subtitle;
 *   
 *   // Fetch wall data to calculate rarity (async - badge appears after load)
 *   fetchWall().then(entries => {
 *     if (entries) {
 *       const rarity = calculateArchetypeRarity(entries, archetype.name);
 *       const badge = renderRarityBadge(rarity, archetype.name);
 *       
 *       // Insert badge right after subtitle
 *       const header = document.querySelector('.results-header');
 *       const existingBadge = header.querySelector('.rarity-badge');
 *       if (existingBadge) existingBadge.remove(); // Don't duplicate on refresh
 *       
 *       if (badge) {
 *         const container = document.createElement('div');
 *         container.innerHTML = badge;
 *         header.appendChild(container.firstElementChild);
 *       }
 *     }
 *   });
 */

/**
 * INTEGRATION STEP 3:
 * 
 * Add this CSS to the <style> section (before the closing </style> tag):
 */

const RARITY_BADGE_CSS = `
/* ===== RARITY BADGE ===== */
.rarity-badge {
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(201, 168, 76, 0.08);
  border: 1px solid var(--accent-dim);
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  animation: rarityFadeIn 0.6s ease 0.3s both;
}

@keyframes rarityFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.rarity-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 700;
}

.rarity-description {
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  color: var(--text-dim);
  line-height: 1.6;
}

/* Rare archetypes get a subtle glow */
.rarity-badge[data-rarity="rare"] {
  border-color: var(--accent);
  background: rgba(201, 168, 76, 0.12);
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.15);
}

.rarity-badge[data-rarity="rare"] .rarity-label {
  text-shadow: 0 0 8px rgba(201, 168, 76, 0.3);
}

/* Pink mode styling */
[data-theme="pink"] .rarity-badge {
  border: 2px solid var(--accent);
  border-radius: 2px 8px 2px 12px;
  box-shadow: 3px 3px 0px var(--accent-dim);
  background: rgba(196, 68, 122, 0.08);
}

[data-theme="pink"] .rarity-badge[data-rarity="rare"] {
  animation: rarityFadeIn 0.6s ease 0.3s both, rarityPulse 2s ease-in-out infinite;
}

@keyframes rarityPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
`;

/**
 * COMPLETE INTEGRATION REFERENCE:
 * 
 * The badge will appear between the archetype subtitle and the radar chart.
 * It loads asynchronously, so there's no delay to showing results.
 * 
 * The styling matches the site's existing aesthetic:
 * - Space Mono for labels (consistent with other UI elements)
 * - Accent color #c9a84c (the site's signature gold)
 * - Subtle animation on appearance
 * - Special treatment for rare archetypes (<10%)
 * - Pink mode support with the funky border style
 * 
 * Language progression:
 * - Under 10%: "rare — only X% share your archetype" (with glow effect)
 * - 10-25%: "uncommon — X% share your archetype"
 * - 25%+: "X% of examined thinkers share your archetype"
 * 
 * This makes rarity feel special without being obnoxious.
 * The badge is informative but doesn't steal focus from the main results.
 */
