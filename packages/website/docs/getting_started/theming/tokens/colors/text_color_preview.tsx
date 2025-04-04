import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const TextColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        color: ${euiTheme.colors.textWarning};
      `}
    >
      <strong>color: {euiTheme.colors.textWarning}</strong>
    </div>
  );
};
