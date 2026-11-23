// News-image entry for 23 November 2026: the program ships the day's
// front page as entry.png (a 1024x1024 PNG drawn for this competition)
// and writes it, byte for byte, to the grader's output directory.
//
// Run it:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// It uses only the Node standard library, needs no network, and writes
// the same bytes on every run.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);
// Fail loudly instead of shipping a truncated copy: the entry is the
// PNG byte for byte, so the written file must match the source size.
if (statSync(dst).size !== statSync(src).size) {
  throw new Error(`entry.png copy mismatch: wrote ${statSync(dst).size} bytes, source is ${statSync(src).size}`);
}
