// Drop real archive photos in /public/photos/<id>.jpg (square-ish crops work best).
// If a file is missing, a generated placeholder is used so the game still runs.
export const FOLDERS = [
  { id: "hackathons",   label: "Hackathons",   hue: 205 },
  { id: "workshops",    label: "Workshops",    hue: 140 },
  { id: "events",       label: "Events",       hue: 280 },
  { id: "activities",   label: "Activities",   hue: 35 },
  { id: "competitions", label: "Competitions", hue: 350 },
].map((f) => ({ ...f, photos: [1, 2, 3].map((n) => `/photos/${f.id}-${n}.jpg`) }));

export const LEVELS = {
  easy:   { label: "Easy",   n: 3, hint: "3 × 3 · 9 pieces" },
  medium: { label: "Medium", n: 4, hint: "4 × 4 · 16 pieces" },
  hard:   { label: "Hard",   n: 5, hint: "5 × 5 · 25 pieces" },
};

export function placeholderArt(folder) {
  const h = folder.hue;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'>
<defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='hsl(${h},85%,72%)'/><stop offset='1' stop-color='hsl(${h + 40},90%,92%)'/></linearGradient></defs>
<rect width='800' height='800' fill='url(#s)'/>
<circle cx='620' cy='170' r='90' fill='#fff' opacity='.85'/>
<circle cx='170' cy='250' r='55' fill='#fff' opacity='.5'/>
<circle cx='330' cy='120' r='30' fill='#fff' opacity='.6'/>
<path d='M0 560 Q200 450 400 540 T800 500 V800 H0Z' fill='hsl(${h + 90},60%,55%)'/>
<path d='M0 650 Q250 560 500 650 T800 620 V800 H0Z' fill='hsl(${h + 90},65%,42%)'/>
<rect x='250' y='300' width='300' height='190' rx='22' fill='#fff' stroke='hsl(${h},60%,40%)' stroke-width='10'/>
<rect x='280' y='330' width='240' height='120' rx='10' fill='hsl(${h},70%,50%)'/>
<text x='400' y='410' font-family='Verdana,sans-serif' font-size='44' font-weight='700' fill='#fff' text-anchor='middle'>${folder.label}</text>
<text x='400' y='740' font-family='Verdana,sans-serif' font-size='34' fill='#fff' text-anchor='middle'>CSE archive · placeholder</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
