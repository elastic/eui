import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const BorderPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div css={css`
      padding: ${euiTheme.size.s};
      border: ${euiTheme.border.thin};
    `}>
      <strong>border: {euiTheme.border.thin}</strong>
    </div>
  );
};
