import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCode,
} from '../../../../src/components';

import {
  fontBase,
  fontWeight,
  fontScale,
} from '../../../../src/global_styling/variables/_typography';

import { ThemeValue } from './_values';

import {
  getPropsFromThemeKey,
  EuiThemeFontBase,
  EuiThemeFontWeight,
  _EuiFontScale,
} from './_props';

const baseKeys = Object.keys(fontBase);
const weightKeys = Object.keys(fontWeight);
const scaleKeys = Object.keys(fontScale);

export default () => {
  const { euiTheme } = useEuiTheme();
  const font = euiTheme.font;

  const baseProps = getPropsFromThemeKey(EuiThemeFontBase);
  const weightProps = getPropsFromThemeKey(EuiThemeFontWeight);
  const scaleProps = getPropsFromThemeKey(_EuiFontScale);

  return (
    <div>
      <EuiText>
        <h2>Typography</h2>
        <p>
          The typography specific theme keys start with the{' '}
          <EuiCode>font</EuiCode> key.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Base</h3>
            <p>
              The base font settings determine things like{' '}
              <EuiCode>family</EuiCode> and <EuiCode>featureSettings</EuiCode>.
            </p>
            <p>
              The <EuiCode>lineHeightMultiplier</EuiCode> established the
              line-height in percentages compared to the font-size, but it is
              the <EuiCode>baseline</EuiCode> integer that establishes the final
              pixel/rem value by ensuring it falls on a multiplier of this
              baseline.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {baseKeys.map((key) => (
              <ThemeValue
                key={key}
                property={'font'}
                type={baseProps[key]}
                name={key}
                value={font[key]}
                groupProps={{ wrap: true, gutterSize: 'none' }}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Weight</h3>
            <p>
              Matches up colloqual weight names with their appropriate number
              values.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {weightKeys.map((key) => (
              <ThemeValue
                key={key}
                property="font.weight"
                type={weightProps[key]}
                name={key}
                value={font.weight[key]}
                buttonStyle={css`
                  font-weight: ${font.weight[key]};
                `}
                example={'Aa'}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false} size="s">
            <h3>Scale</h3>
            <p>
              The typographic scale that is used to calculate the font size
              variables. These are multipliers applied the{' '}
              <EuiCode>euiTheme.base</EuiCode> value.
            </p>
            <p>The default scale is loosely based on Major Third (1.250).</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {scaleKeys.map((key) => (
              <ThemeValue
                key={key}
                property="font.scale"
                type={scaleProps[key]}
                name={key}
                value={font.scale[key]}
                buttonStyle={css`
                  font-size: ${font.scale[key] * euiTheme.base}px;
                  min-width: ${euiTheme.size.xxl};
                  text-align: left;
                `}
                example={'Aa'}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
