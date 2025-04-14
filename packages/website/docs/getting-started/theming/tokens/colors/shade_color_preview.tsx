import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const ShadeColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        background: ${euiTheme.colors.lightShade};
      `}
    >
      <strong>background: {euiTheme.colors.lightShade}</strong>
    </div>
  )
}
