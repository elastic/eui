import React from 'react';
import { css } from '@emotion/react';

import {
  EuiAutoSizer,
  EuiCode,
  EuiPanel,
  logicalSizeCSS,
} from '../../../../src';

export default () => {
  const containerStyles = css`
    ${logicalSizeCSS('100%', '200px')}
  `;

  const panelStyles = css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <div css={containerStyles}>
      <EuiAutoSizer>
        {({ height, width }) => (
          <EuiPanel css={[panelStyles, { height, width }]}>
            <EuiCode>
              height: {height}, width: {width}
            </EuiCode>
          </EuiPanel>
        )}
      </EuiAutoSizer>
    </div>
  );
};
