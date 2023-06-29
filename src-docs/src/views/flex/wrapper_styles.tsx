import React, { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import {
  useEuiTheme,
  UseEuiTheme,
  transparentize,
} from '../../../../src/services';

export const flexItemHiglightStyles = ({ euiTheme }: UseEuiTheme) => {
  // TODO: DRY this out when removing $guideDemoHighlightColor / all src-docs Sass
  const guideDemoHighlightColor = transparentize(euiTheme.colors.primary, 0.1);

  return css`
    .euiFlexItem {
      background: ${guideDemoHighlightColor};
      padding: ${euiTheme.size.base};
    }
  `;
};

export const FlexItemHighlightWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const euiTheme = useEuiTheme();
  return <div css={flexItemHiglightStyles(euiTheme)}>{children}</div>;
};
