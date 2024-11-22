import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { transparentize, useEuiMemoizedStyles, type UseEuiTheme } from '@elastic/eui';

const getSpacerPreviewWrapper = ({ euiTheme }: UseEuiTheme) => css`
  .euiCode {
    margin-block-end: ${euiTheme.size.base};
    white-space: nowrap;
  }

  .euiSpacer {
    background: ${transparentize(euiTheme.colors.primary, 0.1)};
  }
`;

export const SpacerPreviewWrapper = ({ children }: PropsWithChildren) => {
  const styles = useEuiMemoizedStyles(getSpacerPreviewWrapper);

  return (
    <div css={styles}>
      {children}
    </div>
  );
};
