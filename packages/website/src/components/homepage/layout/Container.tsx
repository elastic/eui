import { css } from '@emotion/react';
import { CommonProps, useEuiMemoizedStyles, UseEuiTheme } from '@elastic/eui';
import { PropsWithChildren } from 'react';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  container: css`
    display: flex;
    gap: ${euiTheme.size.base};
    justify-content: center;

    inline-size: 100%;
    max-inline-size: 1280px;
    padding: 0 ${euiTheme.size.m};

    @media (min-width: 997px) {
      padding: 0 ${euiTheme.size.xxxxl};
    }
  `,
  column: css`
    flex-direction: column;
  `,
  row: css`
    flex-direction: row;
  `,
  dynamic: css`
    flex-direction: column;
    gap: ${euiTheme.size.xxl};

    @media (min-width: 997px) {
      flex-direction: row;
      gap: ${euiTheme.size.xxxxl};
    }
  `,
});

export const HomepageContainer = ({
  children,
  layout = 'dynamic',
  css,
  ...rest
}: { layout?: 'column' | 'dynamic' | 'row' } & PropsWithChildren &
  CommonProps) => {
  const styles = useEuiMemoizedStyles(getStyles);
  const cssStyles = [styles.container, styles[layout], css];

  return (
    <div css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
