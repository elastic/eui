import { css } from '@emotion/react';

import { EuiPanel, logicalCSS, useEuiTheme } from '@elastic/eui';

type PropsType = {
  direction?: 'vertical' | 'horizontal';
};

export const ScrollContent = ({ direction = 'vertical' }: PropsType) => {
  const { euiTheme } = useEuiTheme();

  const baseStyle = css`
    padding: ${euiTheme.size.xxl};
    margin: ${euiTheme.size.base};
  `;

  const horizontalStyle = css`
    ${logicalCSS('height', euiTheme.size.xxxl)}
    ${logicalCSS('width', euiTheme.size.xxxxl)}
  `;

  const style = [baseStyle, direction === 'horizontal' ? horizontalStyle : {}];

  return (
    <>
      <EuiPanel css={style} color="primary" />
      <EuiPanel css={style} color="primary" />
      <EuiPanel css={style} color="primary" />
      <EuiPanel css={style} color="primary" />
      <EuiPanel css={style} color="primary" />
    </>
  );
};
