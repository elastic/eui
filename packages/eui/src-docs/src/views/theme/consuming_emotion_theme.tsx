import React from 'react';
import { ThemeProvider, css } from '@emotion/react';
import { EuiIcon, EuiText } from '../../../../src';

export default () => {
  return (
    <EuiText>
      <p
        css={({ euiTheme }) => css`
          background-color: ${euiTheme.colors.lightestShade};
          padding: ${euiTheme.size.l};
        `}
      >
        <EuiIcon
          type="faceHappy"
          // The current `colorMode` is also available in the passed Emotion theme
          // which may be useful for certain conditional styles
          css={({ euiTheme, colorMode }) => ({
            color:
              colorMode === 'LIGHT'
                ? euiTheme.colors.primary
                : euiTheme.colors.accent,
          })}
        />{' '}
        This box sets its icon color, background color, and padding via Emotion
        theme context
      </p>

      <ThemeProvider
        theme={{
          // @ts-ignore - if providing your own Emotion theme, create your own emotion.d.ts - see https://emotion.sh/docs/typescript#define-a-theme
          brandColor: 'pink',
          backgroundColor: 'black',
          padding: '1rem',
        }}
      >
        <p
          css={(theme: any) => css`
            color: ${theme.brandColor};
            background-color: ${theme.backgroundColor};
            padding: ${theme.padding};
          `}
        >
          This box sets its own Emotion ThemeProvider and theme variables
        </p>
      </ThemeProvider>
    </EuiText>
  );
};
