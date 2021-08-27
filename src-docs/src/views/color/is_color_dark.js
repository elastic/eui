import React, { Fragment } from 'react';
import { css } from '@emotion/react';

import { EuiFlexGrid, EuiFlexItem } from '../../../../src/components';

import { isColorDark, useEuiTheme } from '../../../../src/services';
const rgb = (r, g, b) => {
  return `rgb(${r}, ${g}, ${b})`;
};

export default () => {
  const { euiTheme } = useEuiTheme();

  const SWATCH_STYLE = css`
    padding: ${euiTheme.size.base};
    border-radius: ${euiTheme.border.radius.small};
  `;

  const COLORS = [
    [0, 104, 55],
    [165, 0, 38],
    [0, 0, 0],
    [219, 19, 116],
    [191, 161, 128],
    [249, 133, 16],
    [0, 179, 164],
    [212, 157, 170],
  ];

  return (
    <Fragment>
      <EuiFlexGrid columns={4}>
        {COLORS.map((color) => (
          <EuiFlexItem key={color.join('')}>
            <div
              css={[
                SWATCH_STYLE,
                css`
                  color: ${isColorDark(...color)
                    ? euiTheme.colors.ghost
                    : euiTheme.colors.ink};
                  background: ${rgb(...color)};
                `,
              ]}
            >
              {isColorDark(...color) ? 'Dark' : 'Light'}
            </div>
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </Fragment>
  );
};
