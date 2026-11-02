/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiCanAnimate } from '../../global_styling';

export const euiCodeBlockCopyIconStyles = ({ euiTheme }: UseEuiTheme) => {
  const speed = euiTheme.animation.normal;
  // Motion study: ease-in-out. This swap does not use the resistance curve.
  const easing = 'ease-in-out';

  return {
    frame: css`
      position: relative;
      display: block;
      inline-size: 100%;
      block-size: 100%;
    `,
    layer: css`
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      ${euiCanAnimate} {
        transition: opacity ${speed} ${easing}, filter ${speed} ${easing},
          transform ${speed} ${easing};
      }
    `,
    visible: css`
      opacity: 1;
      filter: blur(0);
      transform: scale(1);
    `,
    // Motion study: the hidden icon sits at scale .25 with a 2px blur.
    hidden: css`
      opacity: 0;
      filter: blur(2px);
      transform: scale(0.25);
    `,
  };
};
