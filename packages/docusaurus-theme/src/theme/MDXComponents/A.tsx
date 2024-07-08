import type AType from '@theme-init/MDXComponents/A';
import type { WrapperProps } from '@docusaurus/types';
import { css } from '@emotion/react';
import { EuiLink, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';

type Props = WrapperProps<typeof AType>;

const getStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    link: css`
      text-decoration: underline;
    `,
  };
};

const A = (props: Props): JSX.Element => {
  const styles = useEuiMemoizedStyles(getStyles);

  return <EuiLink {...props} css={styles.link} />;
};

export default A;
