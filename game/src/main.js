import { levels } from './level.js';
import { Player } from './player.js';
import { GuardManager } from './guards.js';
import { AudioSystem } from './audio.js';
import { renderGame } from './render.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const audio = new AudioSystem();

let gameState = 'title';
let currentLevelIndex = 0;
let level = JSON.parse(JSON.stringify(levels[currentLevelIndex]));
let player = new Player(level.start.x, level.start.y);
let guardManager = new GuardManager(level.guards);
let lives = 3;
let detectionMeter = 0;
let timer = 0;
let keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  audio.init();

  if (e.code === 'KeyM') {
    audio.muted = !audio.muted;
  }
  if (e.code === 'KeyP') {
    if (gameState === 'play') gameState = 'paused';
    else if (gameState === 'paused') gameState = 'play';
  }
  if (e.code === 'KeyR') {
    resetGame();
  }
  if (e.code === 'Space' && gameState === 'title') {
    gameState = 'play';
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

canvas.addEventListener('click', () => {
  if (gameState === 'title') {
    gameState = 'play';
  }
});

function resetGame() {
  currentLevelIndex = 0;
  level = JSON.parse(JSON.stringify(levels[currentLevelIndex]));
  player = new Player(level.start.x, level.start.y);
  guardManager = new GuardManager(level.guards);
  lives = 3;
  detectionMeter = 0;
  timer = 0;
  gameState = 'play';
}

function nextLevel() {
  currentLevelIndex++;
  if (currentLevelIndex < levels.length) {
    level = JSON.parse(JSON.stringify(levels[currentLevelIndex]));
    player = new Player(level.start.x, level.start.y);
    guardManager = new GuardManager(level.guards);
    detectionMeter = 0;
  } else {
    gameState = 'win';
    audio.playWin();
  }
}

const urlParams = new URLSearchParams(window.location.search);
const shot = urlParams.get('shot');
const isShotPlay = (shot === 'play');

if (shot === 'start') {
  gameState = 'title';
} else if (isShotPlay) {
  gameState = 'play';
  detectionMeter = 0.6;
  player.x = level.guards[0].x + 40;
  player.y = level.guards[0].y + 20;
} else if (shot === 'end') {
  gameState = 'win';
  timer = 142;
}

function update() {
  if (gameState === 'play') {
    timer += 1 / 60;
    player.update(keys, level, audio);
    guardManager.update(player, level, detectionMeter, (val) => {
      if (isShotPlay) {
        detectionMeter = 0.6;
      } else {
        detectionMeter = val;
      }
    }, audio);

    if (!isShotPlay && detectionMeter >= 1) {
      lives--;
      detectionMeter = 0;
      if (lives <= 0) {
        gameState = 'gameover';
      } else {
        player.x = level.start.x;
        player.y = level.start.y;
      }
    }

    let artifactsCollected = 0;
    for (const art of level.artifacts) {
      if (!art.collected) {
        const dx = player.x - art.x;
        const dy = player.y - art.y;
        if (Math.sqrt(dx * dx + dy * dy) < player.radius + 12) {
          art.collected = true;
          audio.playPickup();
        }
      }
      if (art.collected) artifactsCollected++;
    }

    if (artifactsCollected >= 3) {
      const ex = level.exit;
      if (
        player.x + player.radius > ex.x &&
        player.x - player.radius < ex.x + ex.w &&
        player.y + player.radius > ex.y &&
        player.y - player.radius < ex.y + ex.h
      ) {
        nextLevel();
      }
    }
  }
}

function loop() {
  update();
  let artifactsCollected = level.artifacts.filter(a => a.collected).length;
  renderGame(ctx, null, level, player, guardManager, artifactsCollected, lives, detectionMeter, timer, gameState);
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
