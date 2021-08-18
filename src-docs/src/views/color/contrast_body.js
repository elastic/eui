import React, { Fragment } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components';

import { useEuiTheme, makeHighContrastColor } from '../../../../src/services';

export default () => {
  const { euiTheme } = useEuiTheme();

  const FOREGROUND = [
    '#bfa180',
    'rgb(249, 133, 16)',
    'rgba(0, 179, 164, 1)',
    'white',
  ];

  return (
    <Fragment>
      <EuiFlexGrid>
        {FOREGROUND.map((foreground) => {
          const color = makeHighContrastColor(foreground)(euiTheme.colors.body);

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
    </Fragment>
  );
};
