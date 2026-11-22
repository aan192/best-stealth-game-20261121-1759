export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 16;
    this.speed = 3.2;
    this.vx = 0;
    this.vy = 0;
    this.facing = 0;
    this.footstepTimer = 0;
  }

  update(keys, level, audio) {
    this.vx = 0;
    this.vy = 0;

    if (keys['KeyW'] || keys['ArrowUp']) {
      this.vy = -this.speed;
      this.facing = -Math.PI / 2;
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      this.vy = this.speed;
      this.facing = Math.PI / 2;
    }
    if (keys['KeyA'] || keys['ArrowLeft']) {
      this.vx = -this.speed;
      this.facing = Math.PI;
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      this.vx = this.speed;
      this.facing = 0;
    }

    if (this.vx !== 0 && this.vy !== 0) {
      this.vx *= 0.7071;
      this.vy *= 0.7071;
    }

    this.x += this.vx;
    if (this.checkCollision(level)) {
      this.x -= this.vx;
    }

    this.y += this.vy;
    if (this.checkCollision(level)) {
      this.y -= this.vy;
    }

    if (this.vx !== 0 || this.vy !== 0) {
      this.footstepTimer++;
      if (this.footstepTimer > 18) {
        audio.playFootstep();
        this.footstepTimer = 0;
      }
    } else {
      this.footstepTimer = 0;
    }
  }

  checkCollision(level) {
    const rects = [...level.walls, ...level.crates];
    for (const r of rects) {
      if (this.circleRectCollision(this.x, this.y, this.radius, r)) {
        return true;
      }
    }
    return false;
  }

  circleRectCollision(cx, cy, cr, rect) {
    let testX = cx;
    let testY = cy;
    if (cx < rect.x) testX = rect.x;
    else if (cx > rect.x + rect.w) testX = rect.x + rect.w;
    if (cy < rect.y) testY = rect.y;
    else if (cy > rect.y + rect.h) testY = rect.y + rect.h;
    const distX = cx - testX;
    const distY = cy - testY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    return distance < cr;
  }
}
