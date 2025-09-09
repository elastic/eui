import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const FormsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        background: ${euiTheme.components.forms.backgroundDisabled};
      `}
    >
      <strong>
        background: {euiTheme.components.forms.backgroundDisabled}
      </strong>
    </div>
  );
};
