// Preserved soundtrack: melodies, chords and A–B–A arrangement.
(()=>{
// Original 80-bar A–B–A arrangement in A minor, 120 BPM (2 minutes 40 seconds).
// Eight-note phrases follow their chords; sections build, breathe, then peak.
const chipThemes=[
  [
    [76,0,81,83,84,83,81,76], [79,0,83,84,86,84,83,79],
    [77,0,81,84,88,84,81,77], [76,0,80,83,88,86,83,80],
    [81,76,81,83,84,0,83,81], [79,74,79,83,86,0,84,83],
    [77,72,77,81,84,81,77,74], [76,80,83,86,88,83,80,0]
  ],
  [
    [81,84,88,0,86,84,83,81], [83,86,91,0,89,86,84,83],
    [84,88,89,88,84,81,79,77], [83,80,76,80,83,86,88,0],
    [88,84,81,84,88,86,84,83], [86,83,79,83,86,84,83,79],
    [89,88,84,81,84,88,89,0], [88,86,83,80,76,80,83,88]
  ],
  [
    [72,0,76,0,79,81,79,76], [74,0,77,0,81,79,77,74],
    [76,0,79,0,83,84,83,79], [76,0,80,0,83,0,86,83],
    [77,0,81,0,84,86,84,81], [79,0,83,0,86,88,86,83],
    [81,84,88,84,81,79,76,72], [76,80,83,86,88,86,83,80]
  ],
  [
    [88,81,84,88,93,91,88,84], [86,79,83,86,91,89,86,83],
    [89,81,84,89,93,89,88,84], [88,83,80,83,92,88,86,83],
    [93,88,84,81,84,88,91,93], [91,86,83,79,83,86,89,91],
    [89,88,84,81,84,88,89,93], [92,88,86,83,80,83,88,0]
  ]
];
// Root, third, fifth; the bridge visits C and D minor before returning home.
const chipChords={a:[45,48,52],g:[43,47,50],f:[41,45,48],e:[40,44,47],c:[48,52,55],d:[50,53,57]};
const chipSections=[
  // A: establish the main theme, then build its answering phrase.
  {part:'A',theme:0,chords:'agfeagfe',energy:0},
  {part:'A',theme:0,chords:'agfeagfe',energy:1},
  {part:'A',theme:1,chords:'agfeagfe',energy:2},
  {part:'A',theme:1,chords:'agfeagfe',energy:3},
  // B: lower, spacious melody with C-major and D-minor colours.
  {part:'B',theme:2,chords:'cdcefgae',energy:1},
  {part:'B',theme:2,chords:'cdcefgae',energy:2},
  // A returns with the same melodies and chords, now fully layered.
  {part:'A',theme:0,chords:'agfeagfe',energy:3,harmony:true},
  {part:'A',theme:0,chords:'agfeagfe',energy:4,harmony:true},
  {part:'A',theme:1,chords:'agfeagfe',energy:4,harmony:true},
  {part:'A',theme:1,chords:'agfeagfe',energy:3,harmony:true,outro:true}
];

const tune={chipThemes,chipChords,chipSections};
if(typeof module!=='undefined')module.exports=tune;else globalThis.CircuitTune=tune;
})();
