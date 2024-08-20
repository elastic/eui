import type { Plugin } from '@docusaurus/types';

export default function euiDocusaurusTheme(): Plugin<void> {
  return {
    name: 'eui-docusaurus-theme',
    getThemePath() {
      return '../lib/theme';
    },
    getTypeScriptThemePath() {
      return '../src/theme';
    },
  };
}
