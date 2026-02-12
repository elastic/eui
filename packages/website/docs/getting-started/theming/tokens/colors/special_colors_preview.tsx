import React from 'react';
import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const SpecialColorsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        background: ${euiTheme.colors.plainDark};
        color: ${euiTheme.colors.textGhost};
      `}
    >
      <strong>
        This text is always white and the background always black.
      </strong>
    </div>
  );
};
