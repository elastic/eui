import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const ButtonsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        background: ${euiTheme.components.buttons.backgroundPrimary};
      `}
    >
      <strong>
        background: {euiTheme.components.buttons.backgroundPrimary}
      </strong>
    </div>
  );
};
