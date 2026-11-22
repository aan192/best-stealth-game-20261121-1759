export function renderGame(ctx, state, level, player, guardManager, artifactsCount, lives, detectionMeter, timer, gameState) {
  ctx.clearRect(0, 0, 800, 600);

  ctx.fillStyle = '#181822';
  ctx.fillRect(0, 0, 800, 600);

  ctx.strokeStyle = '#222230';
  ctx.lineWidth = 1;
  for (let x = 0; x < 800; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 600);
    ctx.stroke();
  }
  for (let y = 0; y < 600; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(800, y);
    ctx.stroke();
  }

  ctx.fillStyle = level.exit.collected ? '#333' : '#2ecc71';
  ctx.shadowColor = '#2ecc71';
  ctx.shadowBlur = 15;
  ctx.fillRect(level.exit.x, level.exit.y, level.exit.w, level.exit.h);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#fff';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EXIT', level.exit.x + level.exit.w / 2, level.exit.y + level.exit.h / 2 + 3);

  for (const art of level.artifacts) {
    if (!art.collected) {
      ctx.save();
      ctx.translate(art.x, art.y);
      ctx.fillStyle = '#f1c40f';
      ctx.shadowColor = '#f1c40f';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', 0, 0);
      ctx.restore();
    }
  }

  ctx.fillStyle = '#3f3f59';
  ctx.strokeStyle = '#5a5a7d';
  ctx.lineWidth = 2;
  for (const w of level.walls) {
    ctx.fillRect(w.x, w.y, w.w, w.h);
    ctx.strokeRect(w.x, w.y, w.w, w.h);
  }

  ctx.fillStyle = '#8e44ad';
  ctx.strokeStyle = '#9b59b6';
  for (const c of level.crates) {
    ctx.fillRect(c.x, c.y, c.w, c.h);
    ctx.strokeRect(c.x, c.y, c.w, c.h);
    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x + c.w, c.y + c.h);
    ctx.moveTo(c.x + c.w, c.y);
    ctx.lineTo(c.x, c.y + c.h);
    ctx.stroke();
  }

  for (const g of guardManager.guards) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(g.x, g.y);
    const leftAngle = g.facing - g.visionAngle / 2;
    const rightAngle = g.facing + g.visionAngle / 2;
    ctx.arc(g.x, g.y, g.visionRange, leftAngle, rightAngle);
    ctx.lineTo(g.x, g.y);
    ctx.fillStyle = detectionMeter > 0 ? 'rgba(231, 76, 60, 0.25)' : 'rgba(241, 196, 15, 0.2)';
    ctx.fill();
    ctx.restore();
  }

  for (const g of guardManager.guards) {
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate(g.facing);
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(-4, -14, 8, 6);
    ctx.restore();
  }

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.facing);
  ctx.fillStyle = '#7f8c8d';
  ctx.beginPath();
  ctx.arc(0, 0, player.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.ellipse(6, 0, 6, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f1c40f';
  ctx.beginPath();
  ctx.arc(6, -4, 2, 0, Math.PI * 2);
  ctx.arc(6, 4, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  renderHUD(ctx, level, artifactsCount, lives, detectionMeter, timer);

  if (gameState === 'title') {
    renderTitleScreen(ctx);
  } else if (gameState === 'paused') {
    renderPauseScreen(ctx);
  } else if (gameState === 'gameover') {
    renderGameOverScreen(ctx);
  } else if (gameState === 'win') {
    renderWinScreen(ctx, timer);
  }
}

function renderHUD(ctx, level, artifactsCount, lives, detectionMeter, timer) {
  ctx.fillStyle = 'rgba(15, 15, 22, 0.85)';
  ctx.fillRect(0, 0, 800, 40);
  ctx.strokeStyle = '#333344';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 800, 40);

  ctx.fillStyle = '#ecf0f1';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`Gallery: ${level.levelNum} - ${level.name}`, 15, 25);

  ctx.fillText(`Artifacts: ${artifactsCount}/3`, 260, 25);
  ctx.fillText(`Lives: ${'♥ '.repeat(lives)}`, 400, 25);
  ctx.fillText(`Time: ${Math.floor(timer)}s`, 520, 25);

  ctx.fillText(`Detection:`, 620, 25);
  ctx.fillStyle = '#333';
  ctx.fillRect(700, 12, 80, 16);
  ctx.fillStyle = detectionMeter > 0.5 ? '#e74c3c' : '#f1c40f';
  ctx.fillRect(700, 12, 80 * detectionMeter, 16);
  ctx.strokeStyle = '#fff';
  ctx.strokeRect(700, 12, 80, 16);
}

function renderTitleScreen(ctx) {
  ctx.fillStyle = 'rgba(10, 10, 15, 0.9)';
  ctx.fillRect(0, 0, 800, 600);

  ctx.fillStyle = '#f1c40f';
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TRASH PANDA MIDNIGHT GALLERY', 400, 180);

  ctx.fillStyle = '#bdc3c7';
  ctx.font = '18px sans-serif';
  ctx.fillText('Sneak through the museum, dodge security cones, collect 3 artifacts, and escape!', 400, 240);

  ctx.fillStyle = '#3498db';
  ctx.font = '16px sans-serif';
  ctx.fillText('Controls: WASD or Arrow Keys to Move | P: Pause | M: Mute | R: Restart', 400, 320);

  ctx.fillStyle = '#2ecc71';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('Press SPACE or Click to Start Heist', 400, 420);
}

function renderPauseScreen(ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, 800, 600);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAME PAUSED', 400, 280);

  ctx.font = '18px sans-serif';
  ctx.fillText('Press P to Resume', 400, 330);
}

function renderGameOverScreen(ctx) {
  ctx.fillStyle = 'rgba(120, 20, 20, 0.85)';
  ctx.fillRect(0, 0, 800, 600);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 38px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CAUGHT BY SECURITY!', 400, 240);

  ctx.font = '20px sans-serif';
  ctx.fillText('The Raccoon Burglar was apprehended.', 400, 300);

  ctx.fillStyle = '#f1c40f';
  ctx.fillText('Press R to Try Again', 400, 380);
}

function renderWinScreen(ctx, timer) {
  ctx.fillStyle = 'rgba(20, 40, 20, 0.9)';
  ctx.fillRect(0, 0, 800, 600);

  ctx.fillStyle = '#2ecc71';
  ctx.font = 'bold 40px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HEIST SUCCESSFUL!', 400, 200);

  ctx.fillStyle = '#fff';
  ctx.font = '22px sans-serif';
  ctx.fillText('You escaped the museum with all golden artifacts!', 400, 270);

  ctx.fillStyle = '#f1c40f';
  ctx.font = '20px sans-serif';
  ctx.fillText(`Final Time: ${Math.floor(timer)} seconds`, 400, 340);

  ctx.fillText('Press R to Play Again', 400, 420);
}
