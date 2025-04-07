import { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { useEuiMemoizedStyles } from '@elastic/eui';

const getPageComponentsPreviewWrapperStyles = () => css`
  overflow: hidden;
`;

export const PageComponentsPreviewWrapper = ({
  children,
}: PropsWithChildren) => {
  const styles = useEuiMemoizedStyles(getPageComponentsPreviewWrapperStyles);

  return <div css={styles}>{children}</div>;
};

const getFixedHeightPreviewWrapperStyles = () => css`
  overflow: hidden;
  height: 460px;

  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export const FixedHeightPreviewWrapper = ({ children }: PropsWithChildren) => {
  const styles = getFixedHeightPreviewWrapperStyles();

  return <div css={styles}>{children}</div>;
};
