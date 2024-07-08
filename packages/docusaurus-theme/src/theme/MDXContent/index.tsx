import OriginalMDXContent from '@theme-init/MDXContent';
import type MDXContentType from '@theme-init/MDXContent';
import type { WrapperProps } from '@docusaurus/types';
import { css } from '@emotion/react';
import { EuiText, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

type Props = WrapperProps<typeof MDXContentType>;

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    text: css`
      p {
        margin-block-end: ${euiTheme.size.xl};
      }

      ul,
      ol {
        margin-inline-start: 0;
        margin-block-end: ${euiTheme.size.xl};
      }
    `,
  };
};

const MDXContent = (props: Props): JSX.Element => {
  const styles = useEuiMemoizedStyles(getStyles);

  return (
    <EuiText size="m" css={styles.text}>
      <OriginalMDXContent {...props} />
    </EuiText>
  );
};

export default MDXContent;
