import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import {
  transparentize,
  useEuiMemoizedStyles,
  type UseEuiTheme,
} from '@elastic/eui';

const getFlexPreviewWrapperStyles = ({ euiTheme }: UseEuiTheme) => css`
  .euiFlexItem {
    background: ${transparentize(euiTheme.colors.primary, 0.1)};
    padding: ${euiTheme.size.base};
  }
`;

const FlexPreviewWrapper = ({ children }: PropsWithChildren) => {
  const styles = useEuiMemoizedStyles(getFlexPreviewWrapperStyles);

  return <div css={styles}>{children}</div>;
};

export default FlexPreviewWrapper;
