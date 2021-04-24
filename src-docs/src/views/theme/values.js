import React from 'react';
import { css } from '@emotion/react';

import { useEuiTheme } from '../../../../src/services';

import Colors from './_colors';

import { EuiSpacer, EuiCodeBlock, EuiIcon } from '../../../../src/components';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  const style = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${euiTheme.font.family};
  `;

  return (
    <div>
      <div css={style}>
        <div css={[euiTheme.title.xxl, { color: euiTheme.colors.primary }]}>
          <strong>colorMode:</strong> {colorMode}
        </div>
        <div>
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: euiTheme.colors.primary }}
          />
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: euiTheme.colors.success }}
          />
          <EuiIcon
            aria-hidden="true"
            type="stopFilled"
            size="xxl"
            css={{ color: euiTheme.colors.text }}
          />
        </div>
      </div>

      <EuiSpacer />

      <Colors />

      <EuiSpacer />

      <EuiCodeBlock>{JSON.stringify(euiTheme, null, 2)}</EuiCodeBlock>
    </div>
  );
};
