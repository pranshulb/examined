/**
 * CONTRADICTION INTERSTITIAL
 * ===========================
 * Displays a contemplative pause when a user's answer contradicts a previous choice.
 * Designed to feel like a philosophical moment, not a popup or error.
 * 
 * Dependencies:
 * - Global TENSION_PAIRS array (from tension-pairs.json)
 * - CSS variables from main stylesheet
 * 
 * Usage:
 * const result = ContradictionInterstitial.check(scenarioIndex, choiceLabel, allAnswers);
 * if (result) {
 *   ContradictionInterstitial.show(result, onContinue);
 * }
 */

const ContradictionInterstitial = (() => {
  
  // ============================================
  // CSS STYLES
  // ============================================
  
  const styles = `
    /* Overlay - full screen, dark backdrop */
    .contradiction-interstitial {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 10, 12, 0.96);
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.6s ease;
    }
    
    .contradiction-interstitial.active {
      display: flex;
      animation: interstitialFadeIn 0.6s ease forwards;
    }
    
    @keyframes interstitialFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Content container */
    .contradiction-content {
      max-width: 580px;
      background: var(--surface);
      border: 1px solid var(--surface-2);
      border-radius: var(--radius);
      padding: 3rem 2.5rem;
      position: relative;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(20px);
      animation: contentSlideIn 0.8s ease 0.3s forwards;
    }
    
    @keyframes contentSlideIn {
      from { 
        opacity: 0; 
        transform: translateY(20px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }
    
    /* Header - subtle indicator */
    .contradiction-header {
      font-family: 'Space Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.3em;
      text-transform: lowercase;
      color: var(--accent-dim);
      text-align: center;
      margin-bottom: 1.5rem;
      opacity: 0;
      animation: textFadeIn 0.6s ease 0.8s forwards;
    }
    
    @keyframes textFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Tension symbol - philosophical marker */
    .contradiction-symbol {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: var(--accent);
      opacity: 0;
      animation: symbolPulse 1.2s ease 0.5s forwards;
    }
    
    @keyframes symbolPulse {
      0% { 
        opacity: 0; 
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.1);
      }
      100% { 
        opacity: 1; 
        transform: scale(1);
      }
    }
    
    /* Choices display */
    .contradiction-choices {
      margin-bottom: 2rem;
      opacity: 0;
      animation: textFadeIn 0.6s ease 1.2s forwards;
    }
    
    .contradiction-choice-item {
      margin-bottom: 1.2rem;
      padding: 1rem;
      background: var(--surface-2);
      border-radius: 8px;
      border-left: 2px solid var(--accent-dim);
    }
    
    .contradiction-choice-label {
      font-family: 'Space Mono', monospace;
      font-size: 0.5rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 0.3rem;
    }
    
    .contradiction-choice-text {
      font-size: 0.95rem;
      color: var(--text);
      line-height: 1.6;
    }
    
    .contradiction-choice-scenario {
      font-family: 'Space Mono', monospace;
      font-size: 0.5rem;
      color: var(--text-faint);
      margin-top: 0.4rem;
      letter-spacing: 0.05em;
    }
    
    /* Commentary - the philosophical reflection */
    .contradiction-commentary {
      font-size: 1rem;
      font-style: italic;
      color: var(--text-dim);
      line-height: 1.8;
      text-align: center;
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      border-top: 1px solid var(--surface-2);
      border-bottom: 1px solid var(--surface-2);
      opacity: 0;
      animation: textFadeIn 0.6s ease 1.4s forwards;
    }
    
    /* Continue button */
    .contradiction-continue {
      font-family: 'Space Mono', monospace;
      font-size: 0.65rem;
      letter-spacing: 0.15em;
      text-transform: lowercase;
      padding: 0.9rem 2rem;
      border: 1px solid var(--accent-dim);
      background: transparent;
      color: var(--accent);
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
      display: block;
      margin: 0 auto;
      opacity: 0;
      animation: textFadeIn 0.6s ease 1.6s forwards;
    }
    
    .contradiction-continue:hover {
      background: var(--accent);
      color: var(--bg);
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
    }
    
    .contradiction-continue:active {
      transform: translateY(0);
    }
    
    /* Pink theme overrides */
    [data-theme="pink"] .contradiction-interstitial {
      background: rgba(255, 240, 243, 0.96);
    }
    
    [data-theme="pink"] .contradiction-content {
      border: 2px solid var(--accent);
      border-radius: 2px 8px 2px 12px;
      box-shadow: 5px 5px 0px var(--accent-dim);
    }
    
    [data-theme="pink"] .contradiction-choice-item {
      border-left: 3px solid var(--accent);
      background: rgba(255, 192, 203, 0.1);
    }
    
    [data-theme="pink"] .contradiction-continue {
      border: 2px solid var(--accent);
      border-radius: 4px;
      box-shadow: 3px 3px 0px var(--accent);
      cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' style='font-size:24px'><text y='24'>👆</text></svg>") 16 0, pointer;
    }
    
    [data-theme="pink"] .contradiction-continue:hover {
      box-shadow: 5px 5px 0px var(--accent);
    }
    
    [data-theme="pink"] .contradiction-continue:active {
      box-shadow: 1px 1px 0px var(--accent);
    }
  `;
  
  // ============================================
  // INJECT STYLES
  // ============================================
  
  function injectStyles() {
    if (document.getElementById('contradiction-styles')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'contradiction-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
  
  // ============================================
  // CREATE DOM STRUCTURE
  // ============================================
  
  function createInterstitialDOM() {
    if (document.querySelector('.contradiction-interstitial')) return;
    
    const container = document.createElement('div');
    container.className = 'contradiction-interstitial';
    container.innerHTML = `
      <div class="contradiction-content">
        <div class="contradiction-header">a tension emerges</div>
        <div class="contradiction-symbol">⚖</div>
        <div class="contradiction-choices"></div>
        <div class="contradiction-commentary"></div>
        <button class="contradiction-continue">continue</button>
      </div>
    `;
    
    document.body.appendChild(container);
    
    // Attach continue handler
    container.querySelector('.contradiction-continue').addEventListener('click', () => {
      hide();
    });
  }
  
  // ============================================
  // CHECK FOR CONTRADICTIONS
  // ============================================
  
  /**
   * Check if current answer contradicts any previous answer
   * @param {number} scenarioIndex - Current scenario index (0-based)
   * @param {string} choiceLabel - Current choice label (e.g., "A", "B", "C")
   * @param {Array} allAnswers - Array of all user answers so far: [{ scenarioIndex, choiceLabel, choiceText, ... }, ...]
   * @returns {Object|null} Tension data if contradiction found, null otherwise
   */
  function check(scenarioIndex, choiceLabel, allAnswers) {
    if (!window.TENSION_PAIRS || !Array.isArray(window.TENSION_PAIRS)) {
      console.warn('TENSION_PAIRS not found or not an array');
      return null;
    }
    
    // Build a map of what the user has chosen: scenarioIndex -> choiceLabel
    const answerMap = {};
    allAnswers.forEach(answer => {
      answerMap[answer.scenarioIndex] = answer.choiceLabel;
    });
    
    // Include the current answer
    answerMap[scenarioIndex] = choiceLabel;
    
    // Check each tension pair
    for (const tension of window.TENSION_PAIRS) {
      const { scenario1, choice1, scenario2, choice2, commentary } = tension;
      
      // Check if user has answered both scenarios in the contradictory way
      if (answerMap[scenario1] === choice1 && answerMap[scenario2] === choice2) {
        // Found a contradiction!
        // Return tension data with scenario/choice text for display
        return {
          scenario1,
          choice1,
          scenario2,
          choice2,
          commentary,
          // We'll need to populate text from the scenarios - caller should do this
          // or we assume TENSION_PAIRS includes full text
          scenario1Text: tension.scenario1Text || `Scenario ${scenario1 + 1}`,
          scenario2Text: tension.scenario2Text || `Scenario ${scenario2 + 1}`,
          choice1Text: tension.choice1Text || choice1,
          choice2Text: tension.choice2Text || choice2
        };
      }
    }
    
    return null;
  }
  
  // ============================================
  // SHOW INTERSTITIAL
  // ============================================
  
  /**
   * Display the contradiction interstitial
   * @param {Object} tensionData - The contradiction data from check()
   * @param {Function} onContinue - Optional callback when user clicks continue
   */
  function show(tensionData, onContinue = null) {
    const container = document.querySelector('.contradiction-interstitial');
    if (!container) {
      console.error('Contradiction interstitial container not found');
      return;
    }
    
    // Populate choices
    const choicesEl = container.querySelector('.contradiction-choices');
    choicesEl.innerHTML = `
      <div class="contradiction-choice-item">
        <div class="contradiction-choice-label">First, you chose</div>
        <div class="contradiction-choice-text">${tensionData.choice1Text}</div>
        <div class="contradiction-choice-scenario">${tensionData.scenario1Text}</div>
      </div>
      <div class="contradiction-choice-item">
        <div class="contradiction-choice-label">Now, you chose</div>
        <div class="contradiction-choice-text">${tensionData.choice2Text}</div>
        <div class="contradiction-choice-scenario">${tensionData.scenario2Text}</div>
      </div>
    `;
    
    // Populate commentary
    const commentaryEl = container.querySelector('.contradiction-commentary');
    commentaryEl.textContent = tensionData.commentary || 
      'These choices reveal a tension in how you weigh competing values. Both answers feel right in their context—yet they pull in different directions.';
    
    // Store callback if provided
    if (onContinue) {
      container._onContinue = onContinue;
    }
    
    // Show with animation
    container.classList.add('active');
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
  }
  
  // ============================================
  // HIDE INTERSTITIAL
  // ============================================
  
  function hide() {
    const container = document.querySelector('.contradiction-interstitial');
    if (!container) return;
    
    // Fade out
    container.style.opacity = '0';
    
    setTimeout(() => {
      container.classList.remove('active');
      container.style.opacity = '';
      document.body.style.overflow = '';
      
      // Call continue callback if exists
      if (container._onContinue) {
        container._onContinue();
        container._onContinue = null;
      }
    }, 400);
  }
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    injectStyles();
    createInterstitialDOM();
  }
  
  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // ============================================
  // PUBLIC API
  // ============================================
  
  return {
    check,
    show,
    hide,
    init
  };
  
})();

// Export for module environments (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContradictionInterstitial;
}
