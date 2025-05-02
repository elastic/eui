import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeBorderTypes,
} from '@elastic/eui';
import { ThemeValuesTable } from '../../theme_values_table';

const borderTypes: Array<keyof _EuiThemeBorderTypes> = [
  'thin',
  'thick',
  'editable',
];

export const BordersTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeValuesTable
      items={borderTypes.map((type) => ({
        id: type,
        token: `border.${type}`,
        value: euiTheme.border[type],
      }))}
      render={(item) => (
        <EuiColorPickerSwatch
          showToolTip={false}
          color={euiTheme.colors.backgroundBasePlain}
          css={css`
            border: ${item.value};
          `}
          disabled
        />
      )}
    />
  );
};
