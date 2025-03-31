import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeBorderRadiusValues,
} from '@elastic/eui';
import { ThemeValuesTable } from '../theme_values_table';

const borderRadii: Array<keyof _EuiThemeBorderRadiusValues> = [
  'small',
  'medium',
];

export const BorderRadiiTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeValuesTable
      items={borderRadii.map((type) => ({
        id: type,
        token: `border.radius.${type}`,
        value: euiTheme.border.radius[type],
      }))}
      render={(item) => (
        <EuiColorPickerSwatch
          showToolTip={false}
          color={euiTheme.colors.emptyShade}
          css={css`
            border: ${euiTheme.border.thick};
            border-radius: ${item.value};
          `}
          disabled
        />
      )}
    />
  );
};
