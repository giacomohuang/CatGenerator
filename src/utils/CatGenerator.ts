export type Pattern = 'solid' | 'tuxedo' | 'tabby' | 'calico' | 'siamese' | 'tortoiseshell' | 'bengal' | 'sphynx' | 'bicolor';
export type VoiceType = 'classic' | 'kitten' | 'trill' | 'yowl' | 'chirp';

export interface CatParams {
  baseColor: string;
  altColor: string;
  altColor2?: string;
  eyeColor: string;
  earType: 'pointy' | 'round' | 'folded';
  tailType: 'long' | 'short' | 'up';
  pattern: Pattern;
  isChunky: boolean;
  bgColor: string;
  voice: VoiceType;
  calicoSpots?: {x: number, y: number, w: number, h: number, c: string}[];
  tortieNoise?: {x: number, y: number, c: string}[];
  bengalSpots?: {x: number, y: number}[];
  bicolorPatches?: {x: number, y: number, w: number, h: number}[];
}

const COLORS = {
  orange: '#f59e0b',
  black: '#1f2937',
  white: '#f9fafb',
  gray: '#9ca3af',
  brown: '#78350f',
  cream: '#fef3c7',
  pink: '#f472b6',
  darkGray: '#374151',
};

const EYE_COLORS = ['#10b981', '#fbbf24', '#3b82f6', '#ef4444', '#a855f7', '#14b8a6'];
const BG_COLORS = ['#fbcfe8', '#bfdbfe', '#bbf7d0', '#fef08a', '#e9d5ff', '#fed7aa', '#a7f3d0'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomCatParams(): CatParams {
  const pattern = randomChoice<Pattern>(['solid', 'tuxedo', 'tabby', 'calico', 'siamese', 'tortoiseshell', 'bengal', 'sphynx', 'bicolor']);
  const voice = randomChoice<VoiceType>(['classic', 'kitten', 'trill', 'yowl', 'chirp']);
  
  let baseColor = randomChoice([COLORS.orange, COLORS.black, COLORS.white, COLORS.gray, COLORS.brown]);
  let altColor = randomChoice([COLORS.white, COLORS.black, COLORS.orange]);
  let altColor2 = undefined;

  if (pattern === 'tuxedo') {
    baseColor = randomChoice([COLORS.black, COLORS.gray, COLORS.brown]);
    altColor = COLORS.white;
  } else if (pattern === 'calico') {
    baseColor = COLORS.white;
    altColor = COLORS.orange;
    altColor2 = COLORS.black;
  } else if (pattern === 'siamese') {
    baseColor = COLORS.cream;
    altColor = COLORS.darkGray;
  } else if (pattern === 'tabby') {
    if (baseColor === COLORS.black) baseColor = COLORS.gray;
    if (baseColor === COLORS.white) baseColor = COLORS.cream;
    altColor = baseColor === COLORS.orange ? '#d97706' : 
               baseColor === COLORS.gray ? '#4b5563' : 
               baseColor === COLORS.brown ? '#451a03' : '#d97706';
  } else if (pattern === 'tortoiseshell') {
    baseColor = COLORS.black;
    altColor = COLORS.orange;
    altColor2 = COLORS.brown;
  } else if (pattern === 'bengal') {
    baseColor = randomChoice([COLORS.orange, COLORS.cream]);
    altColor = COLORS.brown;
  } else if (pattern === 'sphynx') {
    baseColor = randomChoice([COLORS.pink, '#e5e7eb']);
    altColor = baseColor;
  } else if (pattern === 'bicolor') {
    baseColor = COLORS.white;
    altColor = randomChoice([COLORS.black, COLORS.gray, COLORS.orange, COLORS.brown]);
  }

  let isChunky = Math.random() > 0.5;
  let earType = randomChoice<'pointy' | 'round' | 'folded'>(['pointy', 'round', 'folded']);
  
  if (pattern === 'sphynx') {
    isChunky = false;
    earType = 'pointy';
  }

  const calicoSpots = [];
  const tortieNoise = [];
  const bengalSpots = [];
  const bicolorPatches = [];
  
  const hw = isChunky ? 16 : 14;
  const hx = isChunky ? 8 : 9;
  const bw = isChunky ? 14 : 10;
  const bx = isChunky ? 9 : 11;

  if (pattern === 'calico') {
    for (let i = 0; i < 10; i++) {
      const rx = hx + Math.floor(Math.random() * hw);
      const ry = 9 + Math.floor(Math.random() * 16);
      const rw = 2 + Math.floor(Math.random() * 3);
      const rh = 2 + Math.floor(Math.random() * 3);
      const c = Math.random() > 0.5 ? altColor : (altColor2 || COLORS.black);
      if ((rx >= hx && rx < hx + hw && ry >= 9 && ry < 17) || 
          (rx >= bx && rx < bx + bw && ry >= 17 && ry < 27)) {
        calicoSpots.push({x: rx, y: ry, w: rw, h: rh, c});
      }
    }
  } else if (pattern === 'tortoiseshell') {
    for(let i=0; i<40; i++) {
        tortieNoise.push({
            x: hx - 2 + Math.floor(Math.random() * (hw + 4)),
            y: 9 + Math.floor(Math.random() * 18),
            c: Math.random() > 0.5 ? altColor : altColor2!
        });
    }
  } else if (pattern === 'bengal') {
    for(let i=0; i<15; i++) {
        bengalSpots.push({
            x: bx + 1 + Math.floor(Math.random() * (bw - 3)),
            y: 18 + Math.floor(Math.random() * 8)
        });
    }
  } else if (pattern === 'bicolor') {
    for(let i=0; i<6; i++) {
        bicolorPatches.push({
            x: hx - 2 + Math.floor(Math.random() * (hw + 4)),
            y: 9 + Math.floor(Math.random() * 15),
            w: 3 + Math.floor(Math.random() * 4),
            h: 3 + Math.floor(Math.random() * 4)
        });
    }
  }

  return {
    baseColor,
    altColor,
    altColor2,
    eyeColor: randomChoice(EYE_COLORS),
    earType,
    tailType: randomChoice(['long', 'short', 'up']),
    pattern,
    isChunky,
    bgColor: randomChoice(BG_COLORS),
    voice,
    calicoSpots,
    tortieNoise,
    bengalSpots,
    bicolorPatches
  };
}

export function drawCat(ctx: CanvasRenderingContext2D, size: number, params: CatParams, time: number = 0) {
  const grid = new Array(32).fill(null).map(() => new Array(32).fill(null));

  const p = (x: number, y: number, w: number, h: number, c: string) => {
    for (let i = Math.floor(x); i < Math.floor(x + w); i++) {
      for (let j = Math.floor(y); j < Math.floor(y + h); j++) {
        if (i >= 0 && i < 32 && j >= 0 && j < 32) grid[j][i] = c;
      }
    }
  };

  const { baseColor, altColor, altColor2, eyeColor, earType, tailType, pattern, isChunky } = params;

  const bw = isChunky ? 14 : 10;
  const bx = isChunky ? 9 : 11;
  const hw = isChunky ? 16 : 14;
  const hx = isChunky ? 8 : 9;

  let earColor = baseColor;
  let tailColor = baseColor;
  let pawColor = baseColor;

  if (pattern === 'siamese') {
    earColor = altColor;
    tailColor = altColor;
    pawColor = altColor;
  } else if (pattern === 'tuxedo' || pattern === 'bicolor') {
    pawColor = altColor;
  }

  // Animation offsets
  const breath = Math.sin(time / 400) > 0.5 ? 1 : 0;
  const isBlinking = (time % 4000) < 150;
  const tailWag = Math.round(Math.sin(time / 150));

  const hy = 9 + breath;
  const by = 17 + breath;
  const ty = 22 + breath;

  // 1. Tail
  if (tailType === 'long') {
    p(bx + bw, ty, 4, 2, tailColor);
    p(bx + bw + 4 + Math.floor(tailWag/2), ty - 2, 2, 2, tailColor);
    p(bx + bw + 4 + tailWag, ty - 4, 2, 2, pattern === 'tuxedo' ? altColor : tailColor);
  } else if (tailType === 'short') {
    p(bx + bw, ty, 3, 2, tailColor);
  } else if (tailType === 'up') {
    p(bx + bw - 2, ty - 7, 2, 4, tailColor);
    p(bx + bw - 2 + tailWag, ty - 11, 2, 4, tailColor);
  }

  // 2. Body
  p(bx, by, bw, 10, baseColor);

  // 3. Head
  p(hx, hy, hw, 8, baseColor);

  // 4. Ears
  const ex1 = hx;
  const ex2 = hx + hw - 4;
  if (earType === 'pointy') {
    if (pattern === 'sphynx') {
      p(ex1, hy - 6, 4, 6, earColor); p(ex1 + 1, hy - 7, 2, 1, earColor);
      p(ex2, hy - 6, 4, 6, earColor); p(ex2 + 1, hy - 7, 2, 1, earColor);
    } else {
      p(ex1, hy - 4, 4, 4, earColor); p(ex1 + 1, hy - 5, 2, 1, earColor);
      p(ex2, hy - 4, 4, 4, earColor); p(ex2 + 1, hy - 5, 2, 1, earColor);
    }
  } else if (earType === 'round') {
    p(ex1, hy - 3, 4, 3, earColor); p(ex1 + 1, hy - 4, 2, 1, earColor);
    p(ex2, hy - 3, 4, 3, earColor); p(ex2 + 1, hy - 4, 2, 1, earColor);
  } else if (earType === 'folded') {
    p(ex1 - 1, hy - 2, 4, 2, earColor); p(ex1 - 2, hy - 1, 2, 2, earColor);
    p(ex2 + 1, hy - 2, 4, 2, earColor); p(ex2 + 2, hy - 1, 2, 2, earColor);
  }

  // 5. Patterns
  if (pattern === 'tuxedo') {
    p(bx + 3, by + 1, bw - 6, 9, altColor); // Belly
    p(hx + 3, hy + 5, hw - 6, 3, altColor); // Snout
  } else if (pattern === 'siamese') {
    p(hx + 3, hy + 3, hw - 6, 5, altColor); // Face mask
  } else if (pattern === 'tabby') {
    // Head stripes
    p(hx + hw / 2 - 1, hy, 2, 3, altColor);
    p(hx + 2, hy, 2, 2, altColor);
    p(hx + hw - 4, hy, 2, 2, altColor);
    // Body stripes
    for (let y = by + 1; y < by + 9; y += 3) {
      p(bx, y, 3, 1, altColor);
      p(bx + bw - 3, y, 3, 1, altColor);
    }
    // Tail stripes
    if (tailType === 'long') {
      p(bx + bw + 1, ty, 1, 2, altColor);
      p(bx + bw + 3, ty, 1, 2, altColor);
      p(bx + bw + 4 + Math.floor(tailWag/2), ty - 2, 2, 1, altColor);
    } else if (tailType === 'up') {
      p(bx + bw - 2, ty - 6, 2, 1, altColor);
      p(bx + bw - 2 + tailWag, ty - 9, 2, 1, altColor);
    }
  } else if (pattern === 'calico' && params.calicoSpots) {
    params.calicoSpots.forEach(spot => {
      let spotY = spot.y;
      if (spotY < 27) spotY += breath;
      p(spot.x, spotY, spot.w, spot.h, spot.c);
    });
  } else if (pattern === 'tortoiseshell' && params.tortieNoise) {
    params.tortieNoise.forEach(spot => {
      let spotY = spot.y;
      if (spotY < 27) spotY += breath;
      if ((spot.x >= hx && spot.x < hx + hw && spotY >= hy && spotY < hy + 8) || 
          (spot.x >= bx && spot.x < bx + bw && spotY >= by && spotY < by + 10)) {
        p(spot.x, spotY, 1, 1, spot.c);
      }
    });
  } else if (pattern === 'bengal' && params.bengalSpots) {
    params.bengalSpots.forEach(spot => {
      p(spot.x, spot.y + breath, 2, 1, altColor);
    });
  } else if (pattern === 'bicolor' && params.bicolorPatches) {
    params.bicolorPatches.forEach(spot => {
      let spotY = spot.y;
      if (spotY < 27) spotY += breath;
      if ((spot.x >= hx && spot.x < hx + hw && spotY >= hy && spotY < hy + 8) || 
          (spot.x >= bx && spot.x < bx + bw && spotY >= by && spotY < by + 10)) {
        p(spot.x, spotY, spot.w, spot.h, altColor);
      }
    });
  }

  // 6. Inner Ears
  if (earType !== 'folded') {
    p(ex1 + 1, hy - 3, 2, 2, COLORS.pink);
    p(ex2 + 1, hy - 3, 2, 2, COLORS.pink);
  }

  // 7. Eyes
  const eyex1 = hx + 3;
  const eyex2 = hx + hw - 5;
  if (isBlinking) {
    p(eyex1, hy + 4, 2, 1, '#111827'); 
    p(eyex2, hy + 4, 2, 1, '#111827');
  } else {
    p(eyex1, hy + 3, 2, 2, eyeColor); p(eyex2, hy + 3, 2, 2, eyeColor);
    // Pupils
    p(eyex1 + 1, hy + 3, 1, 2, COLORS.black); p(eyex2 + 1, hy + 3, 1, 2, COLORS.black);
  }

  // 8. Nose & Mouth
  const nx = Math.floor(hx + hw / 2 - 1);
  p(nx, hy + 5, 2, 1, COLORS.pink); // Nose
  p(nx, hy + 6, 1, 1, COLORS.black); p(nx + 1, hy + 6, 1, 1, COLORS.black); // Small mouth

  // 9. Paws
  p(bx, 27, 3, 2, pawColor); p(bx + bw - 3, 27, 3, 2, pawColor);
  // Toe lines
  p(bx + 1, 28, 1, 1, COLORS.black); p(bx + bw - 2, 28, 1, 1, COLORS.black);

  // 10. Whiskers
  if (pattern !== 'sphynx') {
    p(hx - 2, hy + 4, 2, 1, COLORS.gray); p(hx - 2, hy + 6, 2, 1, COLORS.gray);
    p(hx + hw, hy + 4, 2, 1, COLORS.gray); p(hx + hw, hy + 6, 2, 1, COLORS.gray);
  }


  // --- Outline Pass ---
  const outGrid = new Array(32).fill(null).map(() => new Array(32).fill(null));
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      if (grid[y][x] !== null) {
        outGrid[y][x] = grid[y][x];
      } else {
        // Check neighbors for outline
        if ((x > 0 && grid[y][x - 1] !== null) ||
            (x < 31 && grid[y][x + 1] !== null) ||
            (y > 0 && grid[y - 1][x] !== null) ||
            (y < 31 && grid[y + 1][x] !== null)) {
          outGrid[y][x] = '#111827'; // Dark outline
        }
      }
    }
  }

  // --- Render to Canvas ---
  ctx.fillStyle = params.bgColor;
  ctx.fillRect(0, 0, size, size);

  const pixelSize = size / 32;
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      if (outGrid[y][x] !== null) {
        ctx.fillStyle = outGrid[y][x];
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}

