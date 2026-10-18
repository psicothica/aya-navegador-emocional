const { execSync } = require('child_process');
const fs = require('fs');

console.log('Generating /app/applet/public/logomarcidentidnov.png...');

// 1. Create base 600x600 transparent image with the floating ambient spheres
const cmd1 = `convert -size 600x600 xc:none \\
  \\( -size 600x600 radial-gradient:"rgba(255,255,255,0.95)-rgba(244,114,182,0.85)" -geometry 260x260+40+30 \\) -composite \\
  \\( -size 600x600 radial-gradient:"rgba(255,255,255,0.9)-rgba(56,189,248,0.75)" -geometry 210x210+380+380 \\) -composite \\
  \\( -size 600x600 radial-gradient:"rgba(255,255,255,0.9)-rgba(186,230,253,0.8)" -geometry 150x150+50+430 \\) -composite \\
  \\( -size 600x600 xc:none -fill "rgba(250,245,255,0.88)" -stroke "rgba(255,255,255,0.9)" -strokewidth 3 -draw "circle 300,300 300,105" \\) -composite \\
  /tmp/base_bubble.png`;

execSync(cmd1, { stdio: 'inherit' });

// 2. Low-poly brain facets in teal / deep cyan
const facets = [
  // Frontal lobe upper
  "polygon 200,240 230,210 270,225 240,260",
  "polygon 230,210 280,185 320,205 270,225",
  "polygon 280,185 340,180 370,210 320,205",
  "polygon 340,180 400,195 420,230 370,210",
  "polygon 400,195 440,235 430,270 380,250",
  // Frontal lobe mid
  "polygon 170,280 200,240 240,260 210,300",
  "polygon 240,260 270,225 320,245 290,290",
  "polygon 270,225 320,205 370,230 320,245",
  "polygon 320,205 370,210 410,240 365,260",
  "polygon 370,210 420,230 430,270 380,275",
  // Temporal & central
  "polygon 165,320 210,300 250,330 195,355",
  "polygon 210,300 290,290 325,325 250,330",
  "polygon 290,290 320,245 365,260 340,310",
  "polygon 365,260 430,270 445,310 385,320",
  "polygon 340,310 385,320 420,350 370,365",
  // Occipital & lower
  "polygon 195,355 250,330 280,375 220,390",
  "polygon 250,330 325,325 350,370 280,375",
  "polygon 325,325 385,320 370,365 350,370",
  "polygon 420,350 445,310 440,365 390,385",
  "polygon 370,365 390,385 360,410 330,395",
  // Cerebellum and brain stem
  "polygon 330,395 360,410 345,450 310,435",
  "polygon 310,435 345,450 330,475 290,445",
  "polygon 280,375 350,370 330,395 290,410"
];

// Draw facets with alternating teal shades
let drawCmd = '';
const colors = [
  '#0e3846', '#144c5f', '#1b637b', '#247a96', 
  '#175469', '#2a87a6', '#0f3a49', '#1d6881',
  '#359bc0', '#104353', '#1e6f8b', '#257f9c'
];

facets.forEach((f, idx) => {
  const col = colors[idx % colors.length];
  drawCmd += ` -fill "${col}" -stroke "#08232c" -strokewidth 1 -draw "${f}" `;
});

const cmd2 = `convert /tmp/base_bubble.png ${drawCmd} /tmp/brain_faceted.png`;
execSync(cmd2, { stdio: 'inherit' });

// 3. Add glowing magenta lines and starburst nodes
const nodes = [
  [200, 240], [270, 225], [320, 205], [400, 195],
  [210, 300], [290, 290], [365, 260], [430, 270],
  [250, 330], [325, 325], [385, 320],
  [280, 375], [350, 370], [330, 395], [360, 410]
];

const lines = [
  [0, 1], [1, 2], [2, 3],
  [0, 4], [1, 5], [2, 6], [3, 7],
  [4, 5], [5, 6], [6, 7],
  [4, 8], [5, 9], [6, 10],
  [8, 9], [9, 10],
  [8, 11], [9, 12], [10, 12],
  [11, 12], [12, 13], [13, 14]
];

let netCmd = '';
// Draw glowing pink lines
lines.forEach(([start, end]) => {
  const [x1, y1] = nodes[start];
  const [x2, y2] = nodes[end];
  netCmd += ` -stroke "rgba(206,87,223,0.7)" -strokewidth 2.5 -draw "line ${x1},${y1} ${x2},${y2}" `;
  netCmd += ` -stroke "rgba(255,255,255,0.9)" -strokewidth 1 -draw "line ${x1},${y1} ${x2},${y2}" `;
});

// Draw glowing starburst flares
nodes.forEach(([x, y]) => {
  // Glow circle
  netCmd += ` -fill "rgba(244,63,94,0.4)" -stroke none -draw "circle ${x},${y} ${x},${y+10}" `;
  // Core flare
  netCmd += ` -fill "white" -stroke none -draw "circle ${x},${y} ${x},${y+4}" `;
  // 4-point cross flare
  netCmd += ` -stroke "rgba(255,255,255,0.95)" -strokewidth 1.5 -draw "line ${x},${y-14} ${x},${y+14}" `;
  netCmd += ` -stroke "rgba(255,255,255,0.95)" -strokewidth 1.5 -draw "line ${x-14},${y} ${x+14},${y}" `;
  netCmd += ` -stroke "rgba(244,63,94,0.8)" -strokewidth 2.5 -draw "line ${x},${y-8} ${x},${y+8}" `;
  netCmd += ` -stroke "rgba(244,63,94,0.8)" -strokewidth 2.5 -draw "line ${x-8},${y} ${x+8},${y}" `;
});

const cmd3 = `convert /tmp/brain_faceted.png ${netCmd} /app/applet/public/logomarcidentidnov.png`;
execSync(cmd3, { stdio: 'inherit' });

// Also copy to logo.png
fs.copyFileSync('/app/applet/public/logomarcidentidnov.png', '/app/applet/public/logo.png');

console.log('Successfully generated /app/applet/public/logomarcidentidnov.png and logo.png');
