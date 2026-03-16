/**
 * SHARE IMAGE GENERATOR for examined.
 * 
 * INTEGRATION INSTRUCTIONS:
 * 
 * 1. Add this <script> tag in index.html BEFORE the closing </body>:
 *    <script src="patches/patch-1-share-image.js"></script>
 * 
 * 2. In the results footer, replace the "email to myself" button with:
 *    <button class="btn-small" onclick="shareResult()">share result</button>
 * 
 * 3. That's it! The function will auto-detect the current archetype and scores.
 * 
 * USAGE:
 * - Click "share result" → image downloads automatically
 * - On mobile with Web Share API → opens native share sheet
 */

/**
 * Generate a beautiful 1080x1080 share card
 * @param {string} archetypeName - e.g., "The Examined Stoic"
 * @param {string} archetypeSub - e.g., "disciplined freedom through self-awareness"
 * @param {object} normalizedScores - Schwartz-centered scores, keys matching AXES
 * @param {object} AXES - The AXES object from main site
 * @returns {Promise<string>} - PNG data URL
 */
async function generateShareImage(archetypeName, archetypeSub, normalizedScores, AXES) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // === COLORS ===
    const bg = '#0a0a0c';
    const accent = '#c9a84c';
    const text = '#e8e4dc';
    const textDim = '#8a8680';
    const textFaint = '#4a4844';

    // === BACKGROUND ===
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1080);

    // === FONTS (use system fallbacks since we can't load web fonts synchronously in canvas) ===
    const serifFont = 'Georgia, serif';
    const monoFont = '"Courier New", monospace';

    // === TITLE AREA ===
    ctx.textAlign = 'center';
    
    // "examined." label at top
    ctx.font = `bold 24px ${monoFont}`;
    ctx.letterSpacing = '0.3em';
    ctx.fillStyle = accent;
    ctx.fillText('E X A M I N E D .', 540, 100);

    // Archetype name
    ctx.font = `600 56px ${serifFont}`;
    ctx.fillStyle = text;
    ctx.letterSpacing = '0';
    
    // Handle long names (wrap if needed)
    const nameMaxWidth = 900;
    const nameWords = archetypeName.split(' ');
    let nameLine1 = '';
    let nameLine2 = '';
    
    for (let word of nameWords) {
      const testLine = nameLine1 ? nameLine1 + ' ' + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > nameMaxWidth && nameLine1 !== '') {
        nameLine2 = nameLine2 ? nameLine2 + ' ' + word : word;
      } else {
        nameLine1 = testLine;
      }
    }
    
    if (nameLine2) {
      ctx.fillText(nameLine1, 540, 180);
      ctx.fillText(nameLine2, 540, 245);
    } else {
      ctx.fillText(nameLine1, 540, 200);
    }

    // Subtitle (italic, smaller)
    ctx.font = `italic 28px ${serifFont}`;
    ctx.fillStyle = textDim;
    const subY = nameLine2 ? 310 : 270;
    
    // Wrap subtitle if needed
    const subMaxWidth = 850;
    const subWords = archetypeSub.split(' ');
    let subLine1 = '';
    let subLine2 = '';
    
    for (let word of subWords) {
      const testLine = subLine1 ? subLine1 + ' ' + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > subMaxWidth && subLine1 !== '') {
        subLine2 = subLine2 ? subLine2 + ' ' + word : word;
      } else {
        subLine1 = testLine;
      }
    }
    
    ctx.fillText(subLine1, 540, subY);
    if (subLine2) {
      ctx.fillText(subLine2, 540, subY + 38);
    }

    // === RADAR CHART ===
    const radarCenterY = nameLine2 ? 560 : 540;
    const radarRadius = 140;
    const radarCenterX = 540;
    
    const axes = Object.keys(AXES);
    const n = axes.length;

    // Draw grid circles
    ctx.strokeStyle = textFaint;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    for (let i = 1; i <= 4; i++) {
      const r = (radarRadius / 4) * i;
      ctx.beginPath();
      ctx.arc(radarCenterX, radarCenterY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw axis lines
    ctx.globalAlpha = 0.2;
    axes.forEach((axis, j) => {
      const angle = (Math.PI * 2 * j / n) - Math.PI / 2;
      const x2 = radarCenterX + radarRadius * Math.cos(angle);
      const y2 = radarCenterY + radarRadius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(radarCenterX, radarCenterY);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    // Draw data polygon
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = accent;
    ctx.beginPath();
    axes.forEach((axis, j) => {
      const val = normalizedScores[axis];
      const angle = (Math.PI * 2 * j / n) - Math.PI / 2;
      const x = radarCenterX + radarRadius * val * Math.cos(angle);
      const y = radarCenterY + radarRadius * val * Math.sin(angle);
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();

    // Draw data polygon outline
    ctx.globalAlpha = 1;
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    axes.forEach((axis, j) => {
      const val = normalizedScores[axis];
      const angle = (Math.PI * 2 * j / n) - Math.PI / 2;
      const x = radarCenterX + radarRadius * val * Math.cos(angle);
      const y = radarCenterY + radarRadius * val * Math.sin(angle);
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.stroke();

    // Draw points
    ctx.fillStyle = accent;
    axes.forEach((axis, j) => {
      const val = normalizedScores[axis];
      const angle = (Math.PI * 2 * j / n) - Math.PI / 2;
      const x = radarCenterX + radarRadius * val * Math.cos(angle);
      const y = radarCenterY + radarRadius * val * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw axis labels (smaller, cleaner)
    ctx.font = `12px ${monoFont}`;
    ctx.fillStyle = textDim;
    ctx.textAlign = 'center';
    axes.forEach((axis, j) => {
      const angle = (Math.PI * 2 * j / n) - Math.PI / 2;
      const labelRadius = radarRadius + 45;
      const x = radarCenterX + labelRadius * Math.cos(angle);
      const y = radarCenterY + labelRadius * Math.sin(angle);
      
      const label = AXES[axis].right.toUpperCase();
      ctx.save();
      ctx.translate(x, y);
      
      // Align based on position
      if (x < radarCenterX - 10) ctx.textAlign = 'right';
      else if (x > radarCenterX + 10) ctx.textAlign = 'left';
      else ctx.textAlign = 'center';
      
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });

    // === AXIS SCORES (compact, below radar) ===
    const scoresStartY = radarCenterY + 210;
    const scoreLineHeight = 42;
    const scoreLeftX = 180;
    
    ctx.textAlign = 'left';
    ctx.font = `bold 16px ${monoFont}`;
    
    axes.forEach((axis, i) => {
      const axisData = AXES[axis];
      const val = normalizedScores[axis];
      const y = scoresStartY + (i * scoreLineHeight);
      
      // Axis name (uppercase, faint)
      ctx.fillStyle = textFaint;
      ctx.fillText(axisData.left.toUpperCase(), scoreLeftX, y);
      
      // Arrow indicator
      const arrowX = scoreLeftX + 280;
      ctx.fillStyle = accent;
      ctx.font = `20px ${monoFont}`;
      ctx.fillText(val < 0.45 ? '◄' : val > 0.55 ? '►' : '•', arrowX, y);
      
      // Right label
      ctx.font = `bold 16px ${monoFont}`;
      ctx.fillStyle = textFaint;
      ctx.textAlign = 'right';
      ctx.fillText(axisData.right.toUpperCase(), 900, y);
      
      ctx.textAlign = 'left';
    });

    // === BRANDING FOOTER ===
    ctx.textAlign = 'center';
    ctx.font = `italic 20px ${serifFont}`;
    ctx.fillStyle = textFaint;
    ctx.fillText('"the unexamined life is not worth living."', 540, 1000);
    
    ctx.font = `bold 18px ${monoFont}`;
    ctx.fillStyle = accent;
    ctx.fillText('examined. — pranshul.cafe/examined', 540, 1040);

    // === RETURN DATA URL ===
    resolve(canvas.toDataURL('image/png'));
  });
}

/**
 * Share/download the result image
 * Automatically detects archetype and scores from the page
 */
async function shareResult() {
  // Get current archetype and scores from the page
  const archetypeName = document.getElementById('archetype-name')?.textContent;
  const archetypeSub = document.getElementById('archetype-sub')?.textContent;
  
  if (!archetypeName || !archetypeSub) {
    alert('Please complete the quiz first!');
    return;
  }

  // Get normalized scores (need to recalculate the Schwartz centering)
  const maxP = activeScenarios.length <= 10 ? 6 : 10;
  const raw = {};
  for (const axis of Object.keys(AXES)) {
    raw[axis] = Math.max(0, Math.min(1, (scores[axis] + maxP) / (2 * maxP)));
  }
  
  // Schwartz centering
  const axes = Object.keys(AXES);
  const mean = axes.reduce((s, a) => s + raw[a], 0) / axes.length;
  const centered = {};
  for (const a of axes) { centered[a] = raw[a] - mean; }
  
  // Re-normalize
  const vals = axes.map(a => centered[a]);
  const cMin = Math.min(...vals), cMax = Math.max(...vals);
  const cRange = cMax - cMin || 1;
  const normalized = {};
  for (const a of axes) {
    normalized[a] = (centered[a] - cMin) / cRange;
  }

  // Show loading state
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = 'generating...';
  btn.style.pointerEvents = 'none';

  try {
    // Generate the image
    const dataUrl = await generateShareImage(archetypeName, archetypeSub, normalized, AXES);

    // Try Web Share API (mobile-friendly)
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], 'examined-result.png', { type: 'image/png' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `examined. — ${archetypeName}`,
            text: `${archetypeSub}\n\nTake the quiz: pranshul.cafe/examined`,
            files: [file]
          });
          btn.textContent = originalText;
          btn.style.pointerEvents = '';
          return;
        }
      } catch (shareErr) {
        console.log('Share failed, falling back to download:', shareErr);
      }
    }

    // Fallback: Download
    const link = document.createElement('a');
    link.download = `examined-${archetypeName.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();

    btn.textContent = 'downloaded ✓';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.pointerEvents = '';
    }, 2000);

  } catch (err) {
    console.error('Share image generation failed:', err);
    alert('Failed to generate image. Please try again.');
    btn.textContent = originalText;
    btn.style.pointerEvents = '';
  }
}
