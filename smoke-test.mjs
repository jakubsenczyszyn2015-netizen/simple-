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
console.log(missing.length ? 'MISSING: ' + missing.join(', ') : 'all ' + must.length + ' features present');
process.exit(missing.length ? 1 : 0);
