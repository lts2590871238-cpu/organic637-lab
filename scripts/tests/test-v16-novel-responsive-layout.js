const assert = require('assert');
const fs = require('fs');

const css = fs.readFileSync('styles.css', 'utf8');
const reader = fs.readFileSync('js/novel-reader.js', 'utf8');

assert.match(css, /\.v16-novel-reader\s*\{[^}]*max-width:\s*(?:8[0-9]{2}|900)px/i,
  'desktop novel reader must cap line length with an 800–900px reading column');
assert.match(css, /\.v16-novel-reader\s*\{[^}]*margin:\s*[^;}]*auto/i,
  'desktop novel reader must be centered');
assert.match(css, /\.v16-novel-copy\s*\{[^}]*font-size:\s*clamp\([^)]*18px[^)]*21px/i,
  'novel body must use a readable 18–21px responsive font');
assert.match(css, /\.v16-novel-copy\s*\{[^}]*line-height:\s*1\.(?:8[5-9]|9[0-9])/i,
  'novel body must use generous reading line height');
assert.match(css, /\.v16-novel-copy\s+p\s*\{[^}]*margin:/i,
  'novel paragraphs must have explicit vertical rhythm');
assert.match(css, /\.v16-novel-visual\s*\{[^}]*max-width:/i,
  'novel illustration must be constrained instead of spanning the full viewport');
assert.match(css, /\.v16-novel-scene-img\s*\{[^}]*max-height:/i,
  'novel scene image must have a controlled maximum height');
assert.match(css, /\.v16-novel-visual\.is-evidence\s+\.v16-novel-scene-img\s*\{[^}]*object-fit:\s*contain/i,
  'evidence illustrations must preserve the full evidence instead of cropping');
assert.match(css, /\.v16-novel-visual\.is-evidence\s+\.v16-novel-portrait\s*\{[^}]*display:\s*none/i,
  'evidence cards must not be obscured by a portrait overlay');
assert.match(reader, /v16-novel-visual\s+\$\{visual\.evidence\s*\?\s*'is-evidence'/,
  'reader markup must distinguish evidence art from cinematic scene art');

assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.v16-novel-reader\s*\{[^}]*padding:[^;}]*\s(?:16px|18px)(?:\s|;)/i,
  'phone novel reader must keep comfortable 16–18px horizontal padding');
assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.v16-novel-copy\s*\{[^}]*font-size:\s*18px/i,
  'phone novel copy must remain 18px rather than shrinking to desktop default');
assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.v16-novel-actions\s*\{[^}]*grid-template-columns:\s*1fr/i,
  'phone novel actions must stack instead of squeezing horizontally');
assert.match(css, /\.v16-novel-question\s*,\s*\.v16-novel-bridge\s*\{[^}]*max-width:/i,
  'story question and chemistry bridge must stay within the reading column');

console.log('PASS test-v16-novel-responsive-layout');
