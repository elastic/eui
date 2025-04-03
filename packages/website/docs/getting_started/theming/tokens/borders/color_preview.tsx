import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const ColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div css={css`
      padding: ${euiTheme.size.s};
      border: 1px solid ${euiTheme.border.color};
    `}>
      <strong>border-color: {euiTheme.border.color}</strong>
    </div>
  );
};
