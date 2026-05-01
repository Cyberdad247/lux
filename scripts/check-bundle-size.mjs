#!/usr/bin/env node
// Reads `npm run build` stdout from stdin.
// Extracts First Load JS for each route, fails CI if any exceeds LIMIT_KB.
const LIMIT_KB = 160;

const chunks = [];
process.stdin.on('data', c => chunks.push(c));
process.stdin.on('end', () => {
  const out = Buffer.concat(chunks).toString();

  // Match route table rows — lines that contain ○ or ƒ (static/dynamic markers)
  const rows = out.split('\n').filter(l => /[○ƒ]/.test(l) && /kB/.test(l));
  let max = 0;
  for (const row of rows) {
    // Each route row has two kB values: [route size] [first load JS]
    const nums = [...row.matchAll(/(\d+(?:\.\d+)?)\s+kB/g)].map(m => parseFloat(m[1]));
    if (nums.length >= 2) max = Math.max(max, nums[nums.length - 1]);
  }

  if (max === 0) {
    console.log('⚠ Could not parse bundle sizes from build output — skipping gate.');
    process.exit(0);
  }

  console.log(`Max First Load JS: ${max} kB  |  Limit: ${LIMIT_KB} kB`);

  if (max > LIMIT_KB) {
    process.stderr.write(`::error::First Load JS ${max} kB exceeds ${LIMIT_KB} kB limit\n`);
    process.exit(1);
  }

  console.log(`✓ Bundle size OK`);
});
