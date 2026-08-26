// a guard against exactly what just happened: every feature has to still exist
import fs from 'fs';
const h = fs.readFileSync('/home/user/simple-/index.html','utf8');
const must = ['function stopSong','function playSong','function drawSongList','function importMusic',
  'function openPacks','function addPackSprite','function exportSpritePng','function exportSheetPng',
  'function buildRoomTools','function roomShape','function floodRoom','function slideActor',
  'case "collision"','case "music"','case "pause"','case "roomhide"','case "touchinginroom"',
  'function buildHelp','function showHelp','function libLoad','function exportHtml',
  'function changeSpriteSize','function flipSpriteH','case "vehicle"','case "ending"',
  'id="v-music"','id="song"','id="packs-ov"','id="room-tools"'];
const missing = must.filter(m => !h.includes(m));

// iOS 12.5 runs Safari 12, which cannot parse or run any of these
const script = h.slice(h.indexOf('<script>') + 8, h.lastIndexOf('</scr' + 'ipt>'));
const banned = [
  [/\?\./g, 'optional chaining ?.'],
  [/\?\?/g, 'nullish ??'],
  [/\|\|=|&&=/g, 'logical assignment'],
  [/\.matchAll\s*\(/g, 'String.matchAll'],
  [/\.replaceAll\s*\(/g, 'String.replaceAll'],
  [/\bglobalThis\b/g, 'globalThis'],
  [/\bstructuredClone\s*\(/g, 'structuredClone'],
  [/Object\.fromEntries|Object\.hasOwn|Promise\.any|Promise\.allSettled/g, 'ES2019+ statics'],
  [/\bResizeObserver\b/g, 'ResizeObserver'],
];
const modern = [];
for (const [re, name] of banned){
  // a match inside a // comment line doesn't run, so ignore those
  const hits = script.split('\n').filter(l => re.test(l) && !/^\s*(\/\/|\/\*|\*)/.test(l)).length;
  if (hits) modern.push(name + ' \u00d7' + hits);
}
const css = h.slice(0, h.indexOf('</style>'));
for (const [re, name] of [[/inset\s*:/g, 'CSS inset'], [/:has\(|:is\(/g, 'CSS :has/:is'], [/\baccent-color\b/g, 'accent-color']])
  if (re.test(css)) modern.push(name);

const problems = [];
if (missing.length) problems.push('MISSING: ' + missing.join(', '));
if (modern.length) problems.push('NOT iOS 12.5 SAFE: ' + modern.join(', '));
console.log(problems.length ? problems.join('\n') : 'all ' + must.length + ' features present, iOS 12.5 safe');
process.exit(problems.length ? 1 : 0);
