import { css } from '@emotion/react';
import { logicalSizeCSS, useEuiTheme } from '@elastic/eui';
import { ThemeValuesTable } from '../theme_values_table';

export const SizesTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeValuesTable
      items={['xxs', 'xs', 's', 'm', 'base', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'].map((size) => ({
        id: size,
        token: `size.${size}`,
        value: euiTheme.size[size],
      }))}
      render={(size) => (
        <div
          css={css`
                    ${logicalSizeCSS(size.value, size.value)}
                    border-radius: min(25%, ${euiTheme.border.radius.small});
                    background: ${euiTheme.colors.mediumShade};
                  `}
        />
      )}
      sampleColumnProps={{
        width: '100px',
      }}
    />
  );
}
