import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme, transparentize } from '../../../../src/services';

export const FlexItemHighlightWrapper: React.FC = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  // TODO: DRY this out when removing $guideDemoHighlightColor / all src-docs Sass
  const guideDemoHighlightColor = transparentize(euiTheme.colors.primary, 0.1);

  return (
    <div
      css={css`
        .euiFlexItem {
          background: ${guideDemoHighlightColor};
          padding: ${euiTheme.size.base};
        }
      `}
    >
      {children}
    </div>
  );
};
