export const levels = [
  {
    levelNum: 1,
    name: "The Grand Hall",
    start: { x: 80, y: 520 },
    exit: { x: 720, y: 80, w: 40, h: 40 },
    artifacts: [
      { x: 400, y: 300, collected: false },
      { x: 700, y: 500, collected: false },
      { x: 150, y: 150, collected: false },
    ],
    walls: [
      { x: 0, y: 0, w: 800, h: 20 },
      { x: 0, y: 580, w: 800, h: 20 },
      { x: 0, y: 0, w: 20, h: 600 },
      { x: 780, y: 0, w: 20, h: 600 },
      { x: 250, y: 120, w: 300, h: 20 },
      { x: 250, y: 460, w: 300, h: 20 },
    ],
    crates: [
      { x: 120, y: 300, w: 40, h: 40 },
      { x: 640, y: 300, w: 40, h: 40 },
      { x: 380, y: 220, w: 40, h: 40 },
    ],
    guards: [
      {
        waypoints: [{ x: 200, y: 200 }, { x: 600, y: 200 }],
        speed: 1.5,
        visionRange: 160,
        visionAngle: Math.PI / 3,
      },
      {
        waypoints: [{ x: 600, y: 400 }, { x: 200, y: 400 }],
        speed: 1.5,
        visionRange: 160,
        visionAngle: Math.PI / 3,
      }
    ]
  },
  {
    levelNum: 2,
    name: "Modern Art Wing",
    start: { x: 80, y: 520 },
    exit: { x: 720, y: 520, w: 40, h: 40 },
    artifacts: [
      { x: 400, y: 100, collected: false },
      { x: 400, y: 500, collected: false },
      { x: 720, y: 80, collected: false },
    ],
    walls: [
      { x: 0, y: 0, w: 800, h: 20 },
      { x: 0, y: 580, w: 800, h: 20 },
      { x: 0, y: 0, w: 20, h: 600 },
      { x: 780, y: 0, w: 20, h: 600 },
      { x: 200, y: 0, w: 20, h: 250 },
      { x: 200, y: 350, w: 20, h: 230 },
      { x: 550, y: 150, w: 20, h: 300 },
    ],
    crates: [
      { x: 100, y: 300, w: 40, h: 40 },
      { x: 350, y: 300, w: 40, h: 40 },
      { x: 670, y: 300, w: 40, h: 40 },
    ],
    guards: [
      {
        waypoints: [{ x: 100, y: 100 }, { x: 100, y: 500 }],
        speed: 1.8,
        visionRange: 170,
        visionAngle: Math.PI / 3,
      },
      {
        waypoints: [{ x: 400, y: 250 }, { x: 400, y: 450 }],
        speed: 2.0,
        visionRange: 180,
        visionAngle: Math.PI / 3,
      },
      {
        waypoints: [{ x: 650, y: 100 }, { x: 650, y: 500 }],
        speed: 1.8,
        visionRange: 170,
        visionAngle: Math.PI / 3,
      }
    ]
  },
  {
    levelNum: 3,
    name: "The Vault of Shadows",
    start: { x: 720, y: 520 },
    exit: { x: 80, y: 80, w: 40, h: 40 },
    artifacts: [
      { x: 400, y: 300, collected: false },
      { x: 80, y: 300, collected: false },
      { x: 720, y: 80, collected: false },
    ],
    walls: [
      { x: 0, y: 0, w: 800, h: 20 },
      { x: 0, y: 580, w: 800, h: 20 },
      { x: 0, y: 0, w: 20, h: 600 },
      { x: 780, y: 0, w: 20, h: 600 },
      { x: 150, y: 150, w: 150, h: 20 },
      { x: 500, y: 150, w: 150, h: 20 },
      { x: 150, y: 430, w: 150, h: 20 },
      { x: 500, y: 430, w: 150, h: 20 },
      { x: 380, y: 220, w: 40, h: 160 },
    ],
    crates: [
      { x: 250, y: 280, w: 40, h: 40 },
      { x: 510, y: 280, w: 40, h: 40 },
      { x: 380, y: 100, w: 40, h: 40 },
      { x: 380, y: 460, w: 40, h: 40 },
    ],
    guards: [
      {
        waypoints: [{ x: 100, y: 100 }, { x: 700, y: 100 }, { x: 700, y: 500 }],
        speed: 2.0,
        visionRange: 180,
        visionAngle: Math.PI / 2.5,
      },
      {
        waypoints: [{ x: 700, y: 500 }, { x: 100, y: 500 }, { x: 100, y: 100 }],
        speed: 2.0,
        visionRange: 180,
        visionAngle: Math.PI / 2.5,
      },
      {
        waypoints: [{ x: 400, y: 150 }, { x: 400, y: 450 }],
        speed: 2.2,
        visionRange: 190,
        visionAngle: Math.PI / 2.5,
      }
    ]
  }
];
