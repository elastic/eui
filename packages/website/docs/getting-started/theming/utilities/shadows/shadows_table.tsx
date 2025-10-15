import { css } from '@emotion/react';
import {
  useEuiTheme,
  EuiColorPickerSwatch,
  _EuiThemeShadowSize,
  euiShadow,
  euiShadowFlat,
  EuiCodeBlock,
} from '@elastic/eui';
import { type EuiShadowOptions } from '@elastic/eui-theme-common';

import { ThemeValuesTable } from '../../theme_values_table';
import { ReactNode } from 'react';

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
    value: getFormattedCSS(
      euiShadow(euiThemeContext, type, {
        direction,
      })
    ),
  }));

  // deprecated, remove once obsolete
  items.push({
    id: 'flat',
    token: `euiShadowFlat(euiThemeContext, { direction: '${direction}' }))`,
    value: getFormattedCSS(
      euiShadowFlat(euiThemeContext, {
        direction,
      })
    ),
  });

  return (
    <ThemeValuesTable
      items={items}
      tokenColumnProps={{ name: 'Utility' }}
      valueColumnProps={{
        name: 'Style output',
        align: 'left',
        render: (value: ReactNode) => (
          <small>
            <EuiCodeBlock language="css">{value}</EuiCodeBlock>
          </small>
        ),
      }}
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

/* CSS formatting utility */
const getFormattedCSS = (cssString: string) => {
  return (
    cssString
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Clean up semicolons
      .replaceAll(';;', ';')
      .replaceAll(' ;', '')
      // Normalize all whitespace to single spaces
      .replace(/\s+/g, ' ')
      // Add line breaks after semicolons (for top-level properties)
      .replace(/;\s*(?![^{]*})/g, ';\n')
      // Add line breaks before selectors like &::after
      .replace(/\s*(&[^{]*)\s*{/g, '\n\n$1 {')
      // Format inside braces: add line breaks and indent
      .replace(/{([^}]*)}/g, (match, content) => {
        const formatted = content
          .split(';')
          .map((prop: string) => prop.trim())
          .filter((prop: string) => prop.length > 0)
          .map((prop: string) => `  ${prop};`)
          .join('\n');
        return `{\n${formatted}\n}`;
      })
      // Clean up any leading newlines
      .replace(/^\n+/, '')
      .trim()
  );
};
