import { css } from '@emotion/react';
import { CommonProps, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { PropsWithChildren } from 'react';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  section: css`
    display: flex;
    justify-content: center;
    inline-size: 100%;
    padding: 7rem 0;
  `,
});

export const HomepageSection = ({
  children,
  css,
  ...rest
}: PropsWithChildren & CommonProps) => {
  const styles = useEuiMemoizedStyles(getStyles);
  const cssStyles = [styles.section, css];

  return (
    <section css={cssStyles} {...rest}>
      {children}
    </section>
  );
};
