import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeShadowSize,
} from '@elastic/eui';
import { ThemeValuesTable } from '../../theme_values_table';

const shadowTypes: _EuiThemeShadowSize[] = [
  'xs',
  's',
  'm',
  'l',
  'xl',
];

export const ShadowsTable = ({ direction = "down" }) => {
  const { euiTheme } = useEuiTheme();
  const items = shadowTypes.map((type) => ({
    id: type,
    token: `shadows.${type}.${direction}`,
    value: euiTheme.shadows[type]![direction],
  }))

  // while testing!
  items.push({
    id: 'flat',
    token: `shadows.flat.${direction}`,
    value: euiTheme.shadows.flat![direction],
  })
  items.push({
    id: 'hover.base',
    token: `shadows.hover.base.${direction}`,
    value: euiTheme.shadows.hover.base![direction],
  })
  items.push({
    id: 'hover.xl',
    token: `shadows.hover.xl.${direction}`,
    value: euiTheme.shadows.hover.xl![direction],
  })

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
