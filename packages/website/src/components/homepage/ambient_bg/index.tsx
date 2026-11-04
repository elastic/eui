/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createElement } from 'react';
import { css } from '@emotion/react';
import {
  useEuiMemoizedStyles,
  useEuiTheme,
  UseEuiTheme,
} from '@elastic/eui';

// Side-effect: registers <elastic-ambient-bg>
import './ambient_bg.js';

const getStyles = (_: UseEuiTheme) => ({
  // POC: option B — cover DocRoot main column only (right of sidebar)
  frame: css`
    position: fixed;
    z-index: 0;
    pointer-events: none;
    inset-block: var(--ifm-navbar-height) 0;
    inset-inline: 0;

    @media (min-width: 997px) {
      inset-inline-start: var(--doc-sidebar-width);
    }
  `,
});

/**
 * POC: animated dot-blob ambient background for the docs homepage main column.
 * Reduced motion is handled inside the custom element (static frame).
 */
export const HomepageAmbientBg = () => {
  const styles = useEuiMemoizedStyles(getStyles);
  const { euiTheme, colorMode } = useEuiTheme();

  const color =
    colorMode === 'DARK'
      ? euiTheme.colors.lightShade
      : euiTheme.colors.darkShade;

  return (
    <div css={styles.frame} aria-hidden="true">
      {createElement('elastic-ambient-bg', {
        color,
        // POC: quieter than Kibana login defaults (0.24 / 1.1)
        opacity: '0.16',
        speed: '0.9',
        pitch: '10',
        'dot-size': '2',
        feather: '230',
        wobble: '0.23',
        sway: '0.18',
      })}
    </div>
  );
};
