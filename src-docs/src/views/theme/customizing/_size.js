import React from 'react';
import { css } from '@emotion/react';

import {
  useEuiTheme,
  EuiText,
  EuiSpacer,
  EuiCode,
  EuiTitle,
  EuiPanel,
  logicalSizeCSS,
} from '../../../../../src';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { useDebouncedUpdate } from '../hooks';
import { EuiTheme, EuiThemeSize } from '../_props';
import { ThemeValue } from './_values';

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const sizes = euiTheme.size;
  const base = euiTheme.base;
  const [baseClone, updateBase] = useDebouncedUpdate({
    base: 'base',
    value: base,
    onUpdate: onThemeUpdate,
  });

  const themeProps = getPropsFromComponent(EuiTheme);
  const themeSizeProps = getPropsFromComponent(EuiThemeSize);

  return (
    <div>
      <EuiText>
        <h2>Sizing</h2>
      </EuiText>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>EuiThemeBase</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            All sizing values, including font size, are calculated from this
            single
            <EuiCode>base</EuiCode> integer. Adjust cautiously.
          </p>
        </EuiText>

        <EuiSpacer />

        <ThemeValue
          property=""
          name="base"
          type={themeProps.base}
          value={baseClone}
          groupProps={{ alignItems: 'center' }}
          buttonStyle={css`
            ${logicalSizeCSS(`${euiTheme.base}px`, `${euiTheme.base}px`)}
            border-radius: min(25%, ${euiTheme.border.radius.small});
            background: ${euiTheme.colors.mediumShade};
          `}
          onUpdate={(value) => updateBase('base', value)}
        />
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h3>
          <code>EuiThemeSize</code>
        </h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" grow={false}>
        <p>
          It is not recommended to adjust the computed sizes, only the top level{' '}
          <EuiCode>base</EuiCode> value in order to keep proper proportions. The
          following scale demonstrates these computed values.
        </p>
      </EuiText>

      <EuiSpacer />

      {Object.keys(sizes).map((size) => (
        <ThemeValue
          key={size}
          property="size"
          type={themeSizeProps[size]}
          name={size}
          value={sizes[size]}
          groupProps={{ alignItems: 'center' }}
          buttonStyle={css`
            ${logicalSizeCSS(sizes[size], sizes[size])}
            border-radius: min(25%, ${euiTheme.border.radius.small});
            background: ${euiTheme.colors.mediumShade};
          `}
        />
      ))}
    </div>
  );
};
