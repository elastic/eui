import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const BackgroundColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        color: ${euiTheme.colors.textInverse};
        background-color: ${euiTheme.colors.backgroundFilledWarning};
      `}
    >
      <strong>background: {euiTheme.colors.backgroundFilledWarning}</strong>
    </div>
  );
};
