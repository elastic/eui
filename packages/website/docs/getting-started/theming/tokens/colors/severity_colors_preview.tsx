import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const SeverityColorsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        color: ${euiTheme.colors.plainDark};
        background-color: ${euiTheme.colors.severity.risk};
      `}
    >
      <strong>background: {euiTheme.colors.severity.risk}</strong>
    </div>
  );
};
