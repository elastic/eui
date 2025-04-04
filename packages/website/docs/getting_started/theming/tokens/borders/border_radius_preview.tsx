import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const BorderRadiusPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div css={css`
      padding: ${euiTheme.size.s};
      border: ${euiTheme.border.thick};
      border-radius: ${euiTheme.border.radius.medium};
    `}>
      <strong>border-radius: {euiTheme.border.radius.medium}</strong>
    </div>
  );
};
