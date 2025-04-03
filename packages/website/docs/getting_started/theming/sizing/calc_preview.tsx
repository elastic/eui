import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const CalcPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: calc(${euiTheme.size.base} * 2);
        background: ${euiTheme.colors.highlight};
        font-weight: ${euiTheme.font.weight.bold};
      `}
    >
      {`padding: calc(${euiTheme.size.base} * 2)`}
    </div>
  );
}
