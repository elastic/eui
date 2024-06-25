import OriginalContent from '@theme-init/DocItem/Content';
import type ContentType from '@theme-init/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

type Props = WrapperProps<typeof ContentType>;

const getContentStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    content: css`
      // required specificity to apply styles
      .markdown header > h1 {
        --ifm-h1-font-size: 2.86rem;
        --ifm-h1-vertical-rhythm-bottom: 1.486;
      }
    `,
  };
};

/* OriginalContent holds the document title and markdown content
NOTE: ejecting this results in an error due to using useDoc() hook outside of DocProvider 
https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/DocItem/Content/index.tsx */
const Content = (props: Props): JSX.Element => {
  const styles = useEuiMemoizedStyles(getContentStyles);
  return (
    <div css={styles.content}>
      <OriginalContent {...props} />
    </div>
  );
};

export default Content;
