import React from 'react';
import { css } from '@emotion/react';

import {
  useEuiTheme,
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCode,
  EuiColorPickerSwatch,
  EuiCodeBlock,
  EuiTitle,
  logicalCSS,
} from '../../../../../src';

import {
  background_colors,
  border_colors,
  brand_colors,
  brand_text_colors,
  shade_colors,
  special_colors,
  text_colors,
} from '../../../../../src/themes/amsterdam/global_styling/variables/_colors';

import { getPropsFromComponent } from '../../../services/props/get_props';

import { ThemeValue } from './_values';

import { EuiThemeColors } from '../_props';

const brandKeys = Object.keys(brand_colors);
const brandTextKeys = Object.keys(brand_text_colors);
const backgroundKeys = Object.keys(background_colors);
const borderKeys = Object.keys(border_colors);
const shadeKeys = Object.keys(shade_colors);
const specialKeys = Object.keys(special_colors);
const textKeys = Object.keys(text_colors);

export default ({ onThemeUpdate }) => {
  const { euiTheme, colorMode } = useEuiTheme();
  const colors = euiTheme.colors;
  const props = getPropsFromComponent(EuiThemeColors);

  const updateColor = (property, value) => {
    onThemeUpdate({
      colors: {
        [colorMode]: {
          [property]: value,
        },
      },
    });
  };

  return (
    <div>
      <EuiText>
        <h2>
          Colors &emsp;
          <small>
            <code>EuiThemeColors</code>
          </small>
        </h2>
      </EuiText>

      <EuiSpacer size="xl" />

      <EuiFlexGroup>
        <EuiFlexItem grow={2}>
          <EuiTitle size="xs">
            <h3>
              <code>{'ColorModeSwitch<>'}</code>
            </h3>
          </EuiTitle>
          <EuiSpacer />
          <EuiText size="s">
            <p>
              EUI created this custom type to indicate when a key can accept
              either a singular <EuiCode>{'<string>'}</EuiCode> or separate
              strings for each color mode.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCodeBlock language="tsx" paddingSize="m" isCopyable>
            {`key: {
  LIGHT: <string>,
  DARK: <string>,
}`}
          </EuiCodeBlock>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeBrandColors</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {brandKeys.map((color) => (
          <ThemeValue
            key={color}
            property="colors"
            type={props[color]}
            name={color}
            value={colors[color].toUpperCase()}
            example={<EuiColorPickerSwatch color={colors[color]} />}
            onUpdate={(hex) => updateColor(color, hex)}
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeBrandTextColors</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            These are calculated against the brand colors to ensure proper
            contrast against <EuiCode>colors.body</EuiCode>. Adjust cautiously.
          </p>
        </EuiText>

        <EuiSpacer />

        {brandTextKeys.map((color, index) => (
          <ThemeValue
            key={color}
            property="colors"
            name={brandTextKeys[index]}
            type={props[color]}
            value={colors[brandTextKeys[index]].toUpperCase()}
            onUpdate={(hex) => updateColor(color, hex)}
            example={
              <button
                css={css`
                  color: ${colors[color]};
                  ${logicalCSS('min-width', euiTheme.size.l)}
                  ${logicalCSS('min-height', euiTheme.size.l)}
                `}
              >
                <strong>Aa</strong>
              </button>
            }
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeTextColors</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {textKeys.map((color) => (
          <ThemeValue
            key={color}
            property="colors"
            name={color}
            type={props[color]}
            value={colors[color].toUpperCase()}
            onUpdate={(hex) => updateColor(color, hex)}
            example={
              <button
                css={css`
                  color: ${colors[color]};
                  ${logicalCSS('min-width', euiTheme.size.l)}
                  ${logicalCSS('min-height', euiTheme.size.l)}
                `}
              >
                <strong>Aa</strong>
              </button>
            }
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeBackgroundColors</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {backgroundKeys.map((color) => (
          <ThemeValue
            key={color}
            property="colors"
            type={props[color]}
            name={color}
            value={colors[color].toUpperCase()}
            example={<EuiColorPickerSwatch color={colors[color]} />}
            onUpdate={(hex) => updateColor(color, hex)}
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeBorderColors</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {borderKeys.map((color) => (
          <ThemeValue
            key={color}
            property="colors"
            type={props[color]}
            name={color}
            value={colors[color].toUpperCase()}
            example={<EuiColorPickerSwatch color={colors[color]} />}
            onUpdate={(hex) => updateColor(color, hex)}
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeShadeColors</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {shadeKeys.map((color) => (
          <ThemeValue
            key={color}
            property="colors"
            type={props[color]}
            name={color}
            value={colors[color].toUpperCase()}
            example={<EuiColorPickerSwatch color={colors[color]} />}
            onUpdate={(hex) => updateColor(color, hex)}
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="l" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeSpecialColors</code>
          </h3>
        </EuiTitle>

        <EuiSpacer />

        {specialKeys.map((color) => {
          if (color.includes('Text')) {
            return (
              <ThemeValue
                key={color}
                property="colors"
                name={color}
                type={props[color]}
                value={colors[color].toUpperCase()}
                onUpdate={(hex) => updateColor(color, hex)}
                example={
                  <button
                    css={css`
                      color: ${colors[color]};
                      ${logicalCSS('min-width', euiTheme.size.l)}
                      ${logicalCSS('min-height', euiTheme.size.l)}
                    `}
                  >
                    <strong>Aa</strong>
                  </button>
                }
              />
            );
          } else {
            return (
              <ThemeValue
                key={color}
                property="colors"
                name={color}
                type={props[color]}
                value={colors[color].toUpperCase()}
                example={<EuiColorPickerSwatch color={colors[color]} />}
                onUpdate={(hex) => updateColor(color, hex)}
              />
            );
          }
        })}
      </EuiPanel>
    </div>
  );
};
