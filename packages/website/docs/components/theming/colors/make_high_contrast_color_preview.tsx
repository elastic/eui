import chroma from 'chroma-js';
import { css } from '@emotion/react';
import { useEuiTheme, makeHighContrastColor } from '@elastic/eui';

export const MakeHighContrastColorPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <div
      css={css`
            padding: ${euiTheme.size.base};
            border-radius: ${euiTheme.border.radius.small};
            background: pink;
            color: ${makeHighContrastColor('white')('pink')};
          `}
    >
      {chroma
        .contrast(makeHighContrastColor('white')('pink'), 'pink')
        .toFixed(2)}
      {": makeHighContrastColor('white')('pink')"}
    </div>
  );
};
