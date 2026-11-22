export class GuardManager {
  constructor(guardConfigs) {
    this.guards = guardConfigs.map(g => ({
      waypoints: g.waypoints,
      wpIndex: 0,
      x: g.waypoints[0].x,
      y: g.waypoints[0].y,
      speed: g.speed,
      visionRange: g.visionRange,
      visionAngle: g.visionAngle,
      facing: 0,
    }));
  }

  update(player, level, detectionMeter, setDetection, audio) {
    let playerSeen = false;

    for (const g of this.guards) {
      const targetWp = g.waypoints[g.wpIndex];
      const dx = targetWp.x - g.x;
      const dy = targetWp.y - g.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < g.speed) {
        g.x = targetWp.x;
        g.y = targetWp.y;
        g.wpIndex = (g.wpIndex + 1) % g.waypoints.length;
      } else {
        const angle = Math.atan2(dy, dx);
        g.facing = angle;
        g.x += Math.cos(angle) * g.speed;
        g.y += Math.sin(angle) * g.speed;
      }

      if (this.canSeePlayer(g, player, level)) {
        playerSeen = true;
      }
    }

    if (playerSeen) {
      let newDet = detectionMeter + 0.018;
      if (newDet > 1) newDet = 1;
      setDetection(newDet);
      audio.playAlarm();
    } else {
      let newDet = detectionMeter - 0.012;
      if (newDet < 0) newDet = 0;
      setDetection(newDet);
    }
  }

  canSeePlayer(guard, player, level) {
    const pdx = player.x - guard.x;
    const pdy = player.y - guard.y;
    const dist = Math.sqrt(pdx * pdx + pdy * pdy);

    if (dist > guard.visionRange) return false;

    const angleToPlayer = Math.atan2(pdy, pdx);
    let angleDiff = angleToPlayer - guard.facing;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;

    if (Math.abs(angleDiff) > guard.visionAngle / 2) return false;

    return !this.isLineBlocked(guard.x, guard.y, player.x, player.y, level);
  }

  isLineBlocked(x1, y1, x2, y2, level) {
    const obstacles = [...level.walls, ...level.crates];
    const steps = 20;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const cx = x1 + (x2 - x1) * t;
      const cy = y1 + (y2 - y1) * t;
      for (const obs of obstacles) {
        if (cx >= obs.x && cx <= obs.x + obs.w && cy >= obs.y && cy <= obs.y + obs.h) {
          return true;
        }
      }
    }
    return false;
  }
}
