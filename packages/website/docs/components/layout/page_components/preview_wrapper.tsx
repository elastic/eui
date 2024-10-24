import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { useEuiMemoizedStyles } from '@elastic/eui';

const getPageComponentsPreviewWrapperStyles = () => css`
  overflow: hidden;
`;

export const PageComponentsPreviewWrapper = ({ children }: PropsWithChildren) => {
  const styles = useEuiMemoizedStyles(getPageComponentsPreviewWrapperStyles);

  return (
    <div css={styles}>
      {children}
    </div>
  );
}
