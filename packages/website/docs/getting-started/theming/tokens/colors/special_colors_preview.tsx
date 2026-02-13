import React from 'react';
import { useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

export const SpecialColorsPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        padding: ${euiTheme.size.s};
        color: ${euiTheme.colors.textDisabled};
        background-color: ${euiTheme.colors.disabled};
      `}
    >
      <strong>This is disabled text on disabled background.</strong>
    </div>
  );
};
