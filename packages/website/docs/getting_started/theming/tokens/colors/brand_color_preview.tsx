import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const BrandColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        background: ${euiTheme.colors.warning};
      `}
    >
      <strong>background: {euiTheme.colors.warning}</strong>
    </div>
  )
}
