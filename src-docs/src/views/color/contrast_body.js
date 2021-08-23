import React, { Fragment } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components';

import { useEuiTheme, makeHighContrastColor } from '../../../../src/services';

export default () => {
  const { euiTheme } = useEuiTheme();

  const FOREGROUND = [
    '#bfa180',
    'rgb(249,133,16)',
    'rgba(0,179,164,1)',
    'white',
  ];

  return (
    <Fragment>
      <EuiFlexGrid columns={2}>
        {FOREGROUND.map((foreground) => {
          const color = makeHighContrastColor(foreground)(euiTheme);

          return (
            <EuiFlexItem style={{ flexGrow: 1 }} key={foreground}>
              <div
                title={color}
                css={css`
                  padding: ${euiTheme.size.base};
                  border-radius: ${euiTheme.border.radius.small};
                  border: ${euiTheme.border.thin};
                  color: ${color};
                `}
              >
                <code>
                  {chroma.contrast(color, euiTheme.colors.body).toFixed(2)}
                  {`: makeHighContrastColor(${foreground}, euiTheme)`}
                </code>
              </div>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
