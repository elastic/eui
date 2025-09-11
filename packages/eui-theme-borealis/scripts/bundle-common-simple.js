#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Simple script to bundle only the specific eui-theme-common functions we need
 * This avoids TypeScript compilation issues with the full package
 */

const BOREALIS_SRC = path.join(__dirname, '../src');
const COMMON_SRC = path.join(__dirname, '../../eui-theme-common/src');
const BUNDLED_DIR = path.join(BOREALIS_SRC, 'bundled-common');

console.log('Bundling specific eui-theme-common functions...');

// Clean previous bundled common
if (fs.existsSync(BUNDLED_DIR)) {
  fs.rmSync(BUNDLED_DIR, { recursive: true, force: true });
}

// Create bundled directory structure
fs.mkdirSync(BUNDLED_DIR, { recursive: true });
fs.mkdirSync(path.join(BUNDLED_DIR, 'global_styling'), { recursive: true });
fs.mkdirSync(path.join(BUNDLED_DIR, 'global_styling', 'functions'), { recursive: true });
fs.mkdirSync(path.join(BUNDLED_DIR, 'services'), { recursive: true });
fs.mkdirSync(path.join(BUNDLED_DIR, 'services', 'theme'), { recursive: true });

// Copy only the specific files we need
const filesToCopy = [
  'global_styling/functions/size.ts',
  'global_styling/functions/index.ts',
  'global_styling/index.ts',
  'services/theme/types.ts',
  'services/index.ts',
  'index.ts'
];

for (const file of filesToCopy) {
  const srcPath = path.join(COMMON_SRC, file);
  const destPath = path.join(BUNDLED_DIR, file);
  
  if (fs.existsSync(srcPath)) {
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file}`);
  } else {
    console.log(`Warning: ${file} not found`);
  }
}

console.log('Successfully bundled specific eui-theme-common functions');

