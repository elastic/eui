import React from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  brand_colors,
  brand_text_colors,
  shade_colors,
  special_colors,
  text_colors,
} from '../../../../src/global_styling/variables/_colors';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiCode,
  EuiIcon,
} from '../../../../src/components';

import { ThemeValue } from './_values';

import { getPropsFromThemeKey, EuiThemeColors } from './_props';

const brandKeys = Object.keys(brand_colors);
const brandTextKeys = Object.keys(brand_text_colors);
const shadeKeys = Object.keys(shade_colors);
const specialKeys = Object.keys(special_colors);
const textKeys = Object.keys(text_colors);

export default ({ onThemeUpdate }) => {
  const { euiTheme, colorMode } = useEuiTheme();
  const colors = euiTheme.colors;
  const props = getPropsFromThemeKey(EuiThemeColors);

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
      <EuiTitle>
        <h2>Colors</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText>
            <p>
              The <EuiCode>colors</EuiCode> theme key is a mix of hard-coded hex
              values and computed colors. The <EuiCode>colorMode</EuiCode>{' '}
              determines which values to return.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            <EuiFlexGroup responsive={false} alignItems="center">
              <EuiFlexItem grow={false}>
                <div>
                  <EuiIcon
                    aria-hidden="true"
                    type="stopFilled"
                    size="s"
                    css={{ color: euiTheme.colors.primary }}
                  />
                  <EuiIcon
                    aria-hidden="true"
                    type="stopFilled"
                    size="s"
                    css={{ color: euiTheme.colors.success }}
                  />
                  <EuiIcon
                    aria-hidden="true"
                    type="stopFilled"
                    size="s"
                    css={{ color: euiTheme.colors.text }}
                  />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s">
                  <EuiCode transparentBackground>colorMode</EuiCode>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiText size="s" color="subdued">
                  <p>
                    <code>{colorMode}</code>
                  </p>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>_EuiThemeBrandColors</h3>
            <p>
              Elastic has two main brand colors the other three are used for
              statefulness like indicating between successful and dangerous
              actions.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiPanel grow={false} paddingSize="l" color="subdued">
            {brandKeys.map((color) => (
              <React.Fragment key={color}>
                <ThemeValue
                  property="color"
                  type={props[color]}
                  name={color}
                  value={colors[color].toUpperCase()}
                  example={
                    <EuiIcon size="l" type="stopFilled" color={colors[color]} />
                  }
                  onUpdate={(hex) => updateColor(color, hex)}
                />
              </React.Fragment>
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>_EuiThemeBrandTextColors</h3>
            <p>
              Each color also has a corresponding text variant that has been
              calculated for proper (4.5) contrast against the body color and
              should be used specifically when coloring text.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiPanel grow={false} paddingSize="l" color="subdued">
            {brandTextKeys.map((color, index) => (
              <React.Fragment key={color}>
                <ThemeValue
                  property="color"
                  name={brandTextKeys[index]}
                  type={props[color]}
                  value={colors[brandTextKeys[index]].toUpperCase()}
                  buttonStyle={css`
                    color: ${colors[brandTextKeys[index]]};
                    min-width: ${euiTheme.size.l};
                    padding-top: 2px;
                  `}
                  example={<strong>Aa</strong>}
                />
              </React.Fragment>
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>_EuiThemeShadeColors</h3>
            <p>Grayscale</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiPanel paddingSize="l" color="subdued">
            {shadeKeys.map((color) => (
              <ThemeValue
                key={color}
                property="color"
                type={props[color]}
                name={color}
                value={colors[color].toUpperCase()}
                example={
                  <EuiIcon size="l" type="stopFilled" color={colors[color]} />
                }
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>_EuiThemeTextColors</h3>
            <p>
              Specific text colors calculated off either the brand or shade
              colors.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiPanel paddingSize="l" color="subdued">
            {textKeys.map((color) => (
              <ThemeValue
                key={color}
                property="color"
                name={color}
                type={props[color]}
                value={colors[color].toUpperCase()}
                buttonStyle={css`
                  color: ${colors[color]};
                  min-width: ${euiTheme.size.l};
                `}
                example={<strong>Aa</strong>}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>_EuiThemeSpecialColors</h3>
            <p>These are used a lot for special cases.</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiPanel paddingSize="l" color="subdued">
            {specialKeys.map((color) => {
              if (color.includes('Text')) {
                return (
                  <ThemeValue
                    key={color}
                    property="color"
                    name={color}
                    type={props[color]}
                    value={colors[color].toUpperCase()}
                    buttonStyle={css`
                      color: ${colors[color]};
                      min-width: ${euiTheme.size.l};
                    `}
                    example={<strong>Aa</strong>}
                  />
                );
              } else {
                return (
                  <ThemeValue
                    key={color}
                    property="color"
                    name={color}
                    type={props[color]}
                    value={colors[color].toUpperCase()}
                    example={
                      <EuiIcon
                        size="l"
                        type="stopFilled"
                        color={colors[color]}
                      />
                    }
                  />
                );
              }
            })}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText size="s">
            <h3>Constants</h3>
            <p>These are constant no matter the theme or color mode.</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiPanel paddingSize="l" color="subdued">
            <ThemeValue
              property="color"
              name={'ink'}
              type={props.ink}
              value={colors.ink.toUpperCase()}
              example={
                <EuiIcon size="l" type="stopFilled" color={colors.ink} />
              }
            />
            <ThemeValue
              property="color"
              name={'ghost'}
              type={props.ghost}
              value={colors.ghost.toUpperCase()}
              example={
                <EuiIcon size="l" type="stopFilled" color={colors.ghost} />
              }
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
