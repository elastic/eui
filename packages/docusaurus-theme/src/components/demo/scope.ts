import React from 'react';
import * as EUI from '@elastic/eui';
import * as EmotionReact from '@emotion/react';

/**
 * A custom client-side require() alternative to inform users it's not available
 * and
 */
const clientSideRequire = () => {
  throw new Error('require() is not accessible in the interactive demo environment! All EUI and React exports are available in the global scope for you to use without the need to import them.');
}

export const demoDefaultScope: Record<string, unknown> = {
  // React
  React,
  ...React,

  // EUI exports
  ...EUI,

  // Emotion
  ...EmotionReact,

  require: clientSideRequire,
};
