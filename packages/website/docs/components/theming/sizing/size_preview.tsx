import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const SizePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.xl};
        background: ${euiTheme.colors.highlight};
        font-weight: ${euiTheme.font.weight.bold};
      `}
    >
      {`padding: ${euiTheme.size.xl}`}
    </div>
  );
};
