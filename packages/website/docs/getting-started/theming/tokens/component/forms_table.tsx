import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeBorderTypes,
} from '@elastic/eui';
import { ThemeValuesTable } from '../../theme_values_table';

export const FormsTable = () => {
  const { euiTheme } = useEuiTheme();

  const formTokens = euiTheme.components.forms;

  return (
    <ThemeValuesTable
      items={Object.keys(formTokens).map((key) => ({
        id: key,
        token: `components.forms.${key}`,
        value: formTokens[key],
      }))}
      render={(item) => {
        const isColor =
          typeof item.value === 'string' &&
          (item.value === 'transparent' ||
            item.value.startsWith('#') ||
            item.value.startsWith('rgb') ||
            item.value.startsWith('hsl'));

        if (!isColor) return null;

        return (
          <EuiColorPickerSwatch
            showToolTip={false}
            css={css`
              overflow: hidden;
              background: ${item.value} !important;
            `}
            disabled
          />
        );
      }}
    />
  );
};
