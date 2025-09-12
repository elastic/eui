import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeShadowSize,
  euiShadow,
  euiShadowFlat,
} from '@elastic/eui';
import { type EuiShadowOptions } from '@elastic/eui-theme-common';
import { ThemeValuesTable } from '../../theme_values_table';

const shadowTypes: _EuiThemeShadowSize[] = ['xs', 's', 'm', 'l', 'xl'];

export const ShadowsTable = ({
  direction = 'down',
}: {
  direction: EuiShadowOptions['direction'];
}) => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;

  const items = shadowTypes.map((type) => ({
    id: type,
    token: `euiShadow(euiThemeContext, '${type}', { direction: '${direction}' })`,
    value: euiShadow(euiThemeContext, type, {
      direction,
    })
      .replaceAll(';;', ';')
      .replaceAll(' ;', ''),
  }));

  // deprecated, remove once obsolete
  items.push({
    id: 'flat',
    token: `euiShadowFlat(euiThemeContext, { direction: '${direction}' }))`,
    value: euiShadowFlat(euiThemeContext, {
      direction,
    })
      .replaceAll(';;', ';')
      .replaceAll(' ;', ''),
  });

  return (
    <ThemeValuesTable
      items={items}
      tokenColumnProps={{ name: 'Utility' }}
      render={(item) => (
        <EuiColorPickerSwatch
          showToolTip={false}
          color={euiTheme.colors.backgroundBasePlain}
          css={css`
            inline-size: 48px;
            block-size: 48px;
            border: none;

            ${item.value};
          `}
          disabled
        />
      )}
    />
  );
};
