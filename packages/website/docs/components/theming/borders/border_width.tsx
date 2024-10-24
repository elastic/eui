import { css } from '@emotion/react';
import { useEuiTheme } from '@elastic/eui';

export const BorderWidthPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div css={css`
      padding: ${euiTheme.size.s};
      border: ${euiTheme.border.width.thick} dashed ${euiTheme.border.color};
    `}>
      <strong>border: {euiTheme.border.width.thick} dashed {euiTheme.border.color}</strong>
    </div>
  );
};
