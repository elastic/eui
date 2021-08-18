import React, { Fragment } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  // EuiSpacer,
} from '../../../../src/components';

import { useEuiTheme, makeHighContrastColor } from '../../../../src/services';

export default () => {
  const { euiTheme } = useEuiTheme();

  const BACKGROUND = ['#006837', 'rgb(165, 0, 38)', 'rgba(0, 0, 0, 1)', 'pink'];

  const FOREGROUND = [
    '#bfa180',
    'rgb(249, 133, 16)',
    'rgba(0, 179, 164, 1)',
    'white',
  ];

  return (
    <Fragment>
      {/* TODO: Fix contrast function when not passing a background */}
      {/* <EuiFlexGrid>
        {FOREGROUND.map((foreground) => {
          const color = makeHighContrastColor(foreground);

          return (
            <EuiFlexItem key={foreground}>
              <div
                css={css`
                  padding: ${euiTheme.size.base};
                  color: ${color};
                `}>
                <strong>
                  Contrast:{' '}
                  {chroma.contrast(color, euiTheme.colors.body).toFixed(2)}
                </strong>
              </div>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
      <EuiSpacer /> */}
      <EuiFlexGrid>
        {BACKGROUND.map((background, i) => {
          const foreground = makeHighContrastColor(FOREGROUND[i])(background);

          return (
            <EuiFlexItem key={background}>
              <div
                css={css`
                  padding: ${euiTheme.size.base};
                  background: ${background};
                  color: ${foreground};
                `}>
                <strong>
                  Contrast: {chroma.contrast(background, foreground).toFixed(2)}
                </strong>
              </div>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
