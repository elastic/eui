module.exports = {
  // We're adding EUI-specific wrapper elements in .storybook/preview.tsx.
  // Please keep in sync with .storybook/loki.ts
  chromeSelector: '#story-wrapper > *',
  chromeRetries: 3,
  chromeDockerImage: 'yukinying/chrome-headless-browser-stable:118.0.5993.117', // Loki does not work with latest Chrome images and must be pinned
  chromeFlags: '--headless --disable-gpu --hide-scrollbars --force-prefers-reduced-motion',
  configurations: {
    'chrome.desktop': {
      target: 'chrome.docker',
      width: 1440,
      height: 900,
    },
    'chrome.mobile': {
      target: 'chrome.docker',
      preset: 'iPhone 7',
      // Override default iPhone 7 screen dimensions but keep other
      // preset properties like features and Safari user agent
      width: 390,
      height: 844,
    },
  },
};
