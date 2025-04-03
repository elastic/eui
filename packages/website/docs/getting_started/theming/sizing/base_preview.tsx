import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const BasePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      style={{
        background: euiTheme.colors.highlight,
        fontWeight: euiTheme.font.weight.bold,
      }}
      css={css`
        padding: ${euiTheme.base * 2}px;
      `}
    >
      {`padding: ${euiTheme.base * 2}px`}
    </div>
  );
};
