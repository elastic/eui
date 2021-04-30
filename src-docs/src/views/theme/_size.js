import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCode,
} from '../../../../src/components';

import { getPropsFromThemeKey, EuiTheme, _EuiThemeSize } from './_props';

import { ThemeValue } from './_values';

export default () => {
  const { euiTheme } = useEuiTheme();
  const sizes = euiTheme.size;

  const themeProps = getPropsFromThemeKey(EuiTheme);
  const themeSizeProps = getPropsFromThemeKey(_EuiThemeSize);

  return (
    <div>
      <EuiTitle>
        <h2>Size</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText>
            <p>
              All sizing keys are calculated from a single{' '}
              <EuiCode>base</EuiCode> integer and evaluate to pixel values.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup direction="column" gutterSize="s">
              <ThemeValue
                property=""
                name="base"
                type={themeProps.base}
                value={euiTheme.base}
                buttonStyle={css`
                  width: ${euiTheme.base}px;
                  height: ${euiTheme.base}px;
                  border-radius: min(25%, ${euiTheme.border.radiusSmall});
                  background: ${euiTheme.colors.mediumShade};
                `}
              />
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {Object.keys(sizes).map((size) => (
              <ThemeValue
                property="size"
                type={themeSizeProps[size]}
                key={size}
                name={size}
                value={sizes[size]}
                buttonStyle={css`
                  width: ${sizes[size]};
                  height: ${sizes[size]};
                  border-radius: min(25%, ${euiTheme.border.radiusSmall});
                  background: ${euiTheme.colors.mediumShade};
                `}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
