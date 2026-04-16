// @ts-check

import fs from 'node:fs/promises';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register Tokens Studio transforms (includes ts/color/modifiers for alpha)
register(StyleDictionary);

const OUTPUT_PATH = 'dist';

const ALL_TARGETS = ['css', 'scss', 'ts', 'figma'];
const TARGETS = process.env.EUI_DT_TARGETS?.split(',').filter(Boolean) ?? ALL_TARGETS;

const invalidTargets = TARGETS.filter((t) => !ALL_TARGETS.includes(t));
if (invalidTargets.length > 0) {
  console.error(`Unknown targets: ${invalidTargets.join(', ')}. Valid: ${ALL_TARGETS.join(', ')}`);
  process.exit(1);
}

await fs.rm(OUTPUT_PATH, { recursive: true, force: true });

for (const target of TARGETS) {
  console.log(`\nBuilding target: ${target}`);
  const mod = await import(`../config/${target}.config.js`);

  for (const config of mod.getConfigs()) {
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  }

  // Write Figma manifest separately (not a token-based output)
  if (target === 'figma' && mod.FIGMA_MANIFEST) {
    await fs.mkdir('dist/figma', { recursive: true });
    await fs.writeFile(
      'dist/figma/manifest.json',
      JSON.stringify(mod.FIGMA_MANIFEST, null, 2)
    );
    console.log('✔︎ dist/figma/manifest.json');
  }
}

console.log('\nDone.');
