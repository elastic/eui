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
  'xlHover',
];

export const ShadowsTable = ({ direction = "down" }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeValuesTable
      items={shadowTypes.map((type) => ({
        id: type,
        token: `shadows.${type}.${direction}`,
        value: euiTheme.shadows[type]![direction],
      }))}
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
