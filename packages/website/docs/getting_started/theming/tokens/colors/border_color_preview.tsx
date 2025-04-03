import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const BorderColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        border: 1px solid ${euiTheme.colors.borderBaseWarning};
      `}
    >
      <strong>border-color: {euiTheme.colors.borderBaseWarning}</strong>
    </div>
  );
};
