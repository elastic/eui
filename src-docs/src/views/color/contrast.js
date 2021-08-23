import React, { Fragment } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components';

import { useEuiTheme, makeHighContrastColor } from '../../../../src/services';

export default () => {
  const { euiTheme } = useEuiTheme();

  const BACKGROUND = ['#006837', 'rgb(165,0,38)', 'rgba(0,0,0,1)', 'pink'];

  const FOREGROUND = [
    '#bfa180',
    'rgb(249,133,16)',
    'rgba(0,179,164,1)',
    'white',
  ];

  return (
    <Fragment>
      <EuiFlexGrid columns={2}>
        {BACKGROUND.map((background, i) => {
          const color = makeHighContrastColor(FOREGROUND[i])(background);

          return (
            <EuiFlexItem style={{ flexGrow: 1 }} key={background}>
              <div
                title={color}
                css={css`
                  padding: ${euiTheme.size.base};
                  border-radius: ${euiTheme.border.radius.small};
                  background: ${background};
                  color: ${color};
                `}
              >
                <code>
                  {chroma.contrast(color, background).toFixed(2)}
                  {`: makeHighContrastColor(${FOREGROUND[i]}, ${background})`}
                </code>
              </div>
            </EuiFlexItem>
          );
        })}
      </EuiFlexGrid>
    </Fragment>
  );
};
