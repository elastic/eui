import path from 'node:path';
import fs from 'node:fs/promises';
import babelConfig from '../.babelrc.js';
import { generateMappings } from './i18ntokens/traverse.mjs';
import { getTokenChanges } from './i18ntokens/diff.mjs';

const rootDir = path.resolve(import.meta.dirname, '..');
const packagePath = path.resolve(rootDir, 'package.json');
const tokensPath = path.resolve(rootDir, 'i18ntokens.json');
const tokensChangelogPath = path.resolve(rootDir, 'i18ntokens_changelog.json');

async function readJson(filePath) {
  const buffer = await fs.readFile(filePath, 'utf8');
  return JSON.parse(buffer.toString());
}

async function main() {
  const { version: packageVersion } = await readJson(packagePath);

  // Read current state of tokens from i18ntokens.json
  const currentTokens = await readJson(tokensPath);

  // Generate new tokens from sources
  const newTokens = await generateMappings(rootDir, babelConfig);

  const tokenChanges = getTokenChanges(currentTokens, newTokens);

  if (!tokenChanges.length) {
    console.log('[i18ntokens] No token changes found');
    return;
  }

  console.log(`[i18ntokens] Found ${tokenChanges.length} changes`);

  // Save new i18ntokens.json
  await fs.writeFile(tokensPath, JSON.stringify(newTokens, null, 2));

  // Save changelog
  const changelog = await readJson(tokensChangelogPath);
  changelog.unshift({
    version: packageVersion,
    changes: tokenChanges,
  });

  await fs.writeFile(tokensChangelogPath, JSON.stringify(changelog, null, 2));

  console.log('[i18ntokens] Updated i18ntokens.json and i18ntokens_changelog.json');
}

await main();
