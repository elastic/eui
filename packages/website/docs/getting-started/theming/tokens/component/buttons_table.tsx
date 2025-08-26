import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeBorderTypes,
} from '@elastic/eui';
import { ThemeValuesTable } from '../../theme_values_table';

export const ButtonsTable = () => {
  const { euiTheme } = useEuiTheme();

  const buttonTokens = euiTheme.components.buttons;

  return (
    <ThemeValuesTable
      items={Object.keys(buttonTokens).map((key) => ({
        id: key,
        token: `components.buttons.${key}`,
        value: buttonTokens[key],
      }))}
      render={(item) => (
        <EuiColorPickerSwatch
          showToolTip={false}
          css={css`
            overflow: hidden;
            background: ${item.value} !important; // custom override due to transparent color formats
          `}
          disabled
        />
      )}
    />
  );
};
