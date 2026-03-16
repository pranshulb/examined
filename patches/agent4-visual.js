/* ===== AGENT 4: VISUAL POLISH JAVASCRIPT ===== */

// ===== PHILOSOPHER NAME CAPITALIZATION CHECK =====
// After reviewing the PHILOSOPHERS array in index.html, all names are correctly capitalized.
// "bell hooks" is intentionally lowercase (her choice), which is correct.
// No changes needed to the array.

// ===== SCENARIO TRANSITION ENHANCEMENT =====

// Store original renderScenario function
const originalRenderScenario = window.renderScenario;

// Enhanced version with smooth crossfade
window.renderScenario = function() {
  const container = document.querySelector('.scenario-container');
  
  // If container exists, add fade-out before rendering new scenario
  if (container && window.currentScenario > 0) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      originalRenderScenario();
      // Force reflow to restart animation
      container.style.animation = 'none';
      void container.offsetHeight; // Trigger reflow
      container.style.animation = '';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 200);
  } else {
    // First scenario, just render normally
    originalRenderScenario();
  }
};

// ===== INTRO SCREEN ANIMATION CONTROL =====

// Fix typewriter effect to work properly with text wrapping
window.addEventListener('DOMContentLoaded', () => {
  const quoteEl = document.querySelector('.intro-quote');
  
  if (quoteEl && window.innerWidth > 600) {
    // Store original text
    const fullText = quoteEl.textContent;
    
    // Only apply typewriter on desktop (wrapping breaks the effect on mobile)
    quoteEl.style.whiteSpace = 'nowrap';
    quoteEl.style.overflow = 'hidden';
    quoteEl.style.borderRight = '2px solid var(--accent)';
    quoteEl.style.maxWidth = 'fit-content';
    quoteEl.style.marginLeft = 'auto';
    quoteEl.style.marginRight = 'auto';
  } else if (quoteEl) {
    // Mobile: disable typewriter, show full text
    quoteEl.style.animation = 'none';
    quoteEl.style.borderRight = 'none';
    quoteEl.style.whiteSpace = 'normal';
  }
});

// Reset animations when changing screens
const originalShowScreen = window.showScreen;
window.showScreen = function(id) {
  originalShowScreen(id);
  
  // If returning to intro, reset quote animation
  if (id === 'intro-screen') {
    const quoteEl = document.querySelector('.intro-quote');
    if (quoteEl && window.innerWidth > 600) {
      quoteEl.style.animation = 'none';
      void quoteEl.offsetHeight; // Force reflow
      quoteEl.style.animation = '';
    }
  }
};

// ===== DELIBERATION TIME TRACKING =====

// Track time spent on each scenario
let scenarioStartTime = null;
let deliberationTimes = [];

// Enhance nextScenario to track deliberation time
const originalNextScenario = window.nextScenario;
window.nextScenario = function() {
  // Calculate time spent on current scenario
  if (scenarioStartTime !== null) {
    const timeSpent = Math.floor((Date.now() - scenarioStartTime) / 1000); // seconds
    const currentScenarioData = window.activeScenarios[window.currentScenario];
    
    deliberationTimes.push({
      scenarioIndex: window.currentScenario,
      scenarioTitle: currentScenarioData.title,
      timeSeconds: timeSpent
    });
  }
  
  // Call original function
  originalNextScenario();
  
  // Reset timer for next scenario
  scenarioStartTime = Date.now();
};

// Initialize timer when first scenario renders
const originalStartExam = window.startExam;
window.startExam = function() {
  deliberationTimes = [];
  scenarioStartTime = Date.now();
  originalStartExam();
};

// Add deliberation time section to results
const originalShowResults = window.showResults;
window.showResults = function() {
  // Call original function first
  originalShowResults();
  
  // Add deliberation time section if we have data
  if (deliberationTimes.length > 0) {
    renderDeliberationSection();
  }
};

function renderDeliberationSection() {
  // Find where to insert (after philosopher section, before readings)
  const philosopherSection = document.getElementById('philosopher-container');
  const readingsSection = document.getElementById('readings-section');
  
  if (!philosopherSection || !readingsSection) return;
  
  // Calculate some interesting stats
  const totalTime = deliberationTimes.reduce((sum, d) => sum + d.timeSeconds, 0);
  const avgTime = Math.round(totalTime / deliberationTimes.length);
  
  // Find longest deliberation
  const longest = deliberationTimes.reduce((max, d) => 
    d.timeSeconds > max.timeSeconds ? d : max
  );
  
  // Find shortest deliberation (excluding very quick ones < 5 seconds)
  const meaningful = deliberationTimes.filter(d => d.timeSeconds >= 5);
  const shortest = meaningful.length > 0 
    ? meaningful.reduce((min, d) => d.timeSeconds < min.timeSeconds ? d : min)
    : null;
  
  const html = `
    <div class="deliberation-section">
      <div class="deliberation-title">your deliberation time</div>
      <div class="deliberation-list">
        ${longest ? `
        <div class="deliberation-entry">
          <span class="deliberation-scenario">longest pause: "${longest.scenarioTitle}"</span>
          <span class="deliberation-time">${formatTime(longest.timeSeconds)}</span>
        </div>
        ` : ''}
        ${shortest ? `
        <div class="deliberation-entry">
          <span class="deliberation-scenario">quickest choice: "${shortest.scenarioTitle}"</span>
          <span class="deliberation-time">${formatTime(shortest.timeSeconds)}</span>
        </div>
        ` : ''}
        <div class="deliberation-entry">
          <span class="deliberation-scenario">average deliberation</span>
          <span class="deliberation-time">${formatTime(avgTime)}</span>
        </div>
      </div>
    </div>
  `;
  
  // Insert before readings section
  readingsSection.insertAdjacentHTML('beforebegin', html);
}

function formatTime(seconds) {
  if (seconds < 60) {
    return `${seconds}s`;
  } else {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }
}

// ===== EXPLORATION SECTION HELPER (for future agent) =====
// This function can be used by another agent to add exploration items
window.addExplorationSection = function(items) {
  const readingsSection = document.getElementById('readings-section');
  if (!readingsSection) return;
  
  const html = `
    <div class="exploration-section">
      <div class="exploration-title">FURTHER EXPLORATION</div>
      <div class="exploration-grid">
        ${items.map(item => `
          <div class="exploration-card" data-category="${item.category}">
            <span class="exploration-category" data-type="${item.category}">${item.category}</span>
            <div class="exploration-title-text">${item.title}</div>
            <div class="exploration-why">${item.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  readingsSection.insertAdjacentHTML('afterend', html);
};

// ===== ANIMATION PERFORMANCE OPTIMIZATION =====

// Reduce animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-speed', '0.01s');
  
  // Disable complex animations
  const style = document.createElement('style');
  style.textContent = `
    * {
      animation-duration: 0.01s !important;
      animation-delay: 0s !important;
      transition-duration: 0.01s !important;
    }
    .intro-quote {
      animation: none !important;
      border-right: none !important;
      white-space: normal !important;
    }
  `;
  document.head.appendChild(style);
}

// ===== ENHANCED PINK MODE TRANSITIONS =====

// Store original toggle function
const originalToggleTheme = window.toggleTheme;
window.toggleTheme = function() {
  const html = document.documentElement;
  const wasPink = html.getAttribute('data-theme') === 'pink';
  
  // Add transition class
  document.body.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  
  // Call original
  originalToggleTheme();
  
  // If switching to pink mode, add a little celebration
  if (!wasPink) {
    // Briefly wiggle the toggle button
    const btn = document.getElementById('theme-toggle');
    btn.style.animation = 'selectBounce 0.6s ease';
    setTimeout(() => {
      btn.style.animation = '';
    }, 600);
  }
  
  // Reset transition after animation
  setTimeout(() => {
    document.body.style.transition = '';
  }, 600);
};

console.log('🎨 Agent 4 Visual Polish loaded: animations, transitions, and pink mode enhancements active');
