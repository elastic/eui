import { css } from '@emotion/react';
import React from 'react';

import { EuiPanel, useEuiTheme } from '../../../../src';

export const ScrollContent = () => {
  const { euiTheme } = useEuiTheme();

  const style = css`
    padding: ${euiTheme.size.xxl};
    margin: ${euiTheme.size.base};
  `;

  return (
    <>
      <EuiPanel css={style} color="primary" />
      <EuiPanel css={style} color="primary" />
      <EuiPanel css={style} color="primary" />
    </>
  );
};
