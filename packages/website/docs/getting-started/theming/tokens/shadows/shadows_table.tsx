import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeShadowSize,
  EuiThemeAmsterdam,
} from '@elastic/eui';
import { ThemeValuesTable } from '../../theme_values_table';

const shadowTypes: _EuiThemeShadowSize[] = ['xs', 's', 'm', 'l', 'xl'];

export const ShadowsTable = ({ direction = 'down' }) => {
  const { euiTheme } = useEuiTheme();
  const isAmsterdam = euiTheme.themeName === EuiThemeAmsterdam.key;

  console.log(euiTheme.themeName);

  const items = shadowTypes.map((type) => ({
    id: type,
    token: `shadows.${type}.${direction}`,
    value: euiTheme.shadows[type]![direction],
  }));

  if (isAmsterdam) {
    items.push({
      id: 'flat',
      token: `shadows.flat.${direction}`,
      value: euiTheme.shadows.flat![direction],
    });
  }

  return (
    <ThemeValuesTable
      items={items}
      render={(item) => (
        <EuiColorPickerSwatch
          showToolTip={false}
          color={euiTheme.colors.backgroundBasePlain}
          css={css`
            inline-size: 48px;
            block-size: 48px;
            border: none;
            box-shadow: ${item.value};
          `}
          disabled
        />
      )}
    />
  );
};
