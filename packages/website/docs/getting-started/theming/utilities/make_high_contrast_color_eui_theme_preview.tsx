import chroma from 'chroma-js';
import { css } from '@emotion/react';
import { useEuiTheme, makeHighContrastColor } from '@elastic/eui';
import React from 'react';

export const MakeHighContrastColorEuiThemePreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
        color: ${makeHighContrastColor('#fdc791')(euiTheme)};
      `}
    >
      {chroma
        .contrast(
          makeHighContrastColor('#fdc791')(euiTheme),
          euiTheme.colors.body
        )
        .toFixed(2)}
      {': makeHighContrastColor(#fdc791, euiTheme)'}
    </div>
  );
};
