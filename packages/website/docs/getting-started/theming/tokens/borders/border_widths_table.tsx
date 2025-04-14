import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeBorderWidthValues,
} from '@elastic/eui';
import { ThemeValuesTable } from '../../theme_values_table';

const borderWidths: Array<keyof _EuiThemeBorderWidthValues> = ['thin', 'thick'];

export const BorderWidthsTable = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <ThemeValuesTable
      items={borderWidths.map((type) => ({
        id: type,
        token: `border.width.${type}`,
        value: euiTheme.border.width[type],
      }))}
      render={(item) => (
        <EuiColorPickerSwatch
          showToolTip={false}
          color={euiTheme.colors.emptyShade}
          css={css`
            border: ${euiTheme.border.thick};
            border-width: ${item.value};
          `}
          disabled
        />
      )}
    />
  );
};
