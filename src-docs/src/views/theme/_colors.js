import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
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
  EuiColorPickerSwatch,
} from '../../../../src/components';

import { ThemeValue } from './_values';
import { ThemeSection } from './_theme_section';

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
        <EuiFlexItem grow={2}>
          <EuiText>
            <p>
              The <EuiCode>colors</EuiCode> theme key is a mix of hard-coded hex
              values and computed colors. The <EuiCode>colorMode</EuiCode>{' '}
              determines which values to return based on{' '}
              <EuiCode>LIGHT</EuiCode> or <EuiCode>DARK</EuiCode> mode.
            </p>
            <p>
              When switching between light and dark color modes, the theme keys
              do not change, only their values do. This is why most keys are not
              named for their <strong>evaluated</strong> value but by their{' '}
              <strong>purpose</strong>.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel grow={false} paddingSize="l" color="subdued">
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

      <EuiSpacer size="xxl" />

      <ThemeSection
        code="_EuiThemeBrandColors"
        description={
          <p>
            Elastic has two main brand colors. The other three are used for
            statefulness like indicating between successful and dangerous
            actions.
          </p>
        }
        property="colors"
        themeValues={brandKeys.map((color) => (
          <EuiFlexItem key={color}>
            <ThemeValue
              property="colors"
              type={props[color]}
              name={color}
              value={colors[color].toUpperCase()}
              example={<EuiColorPickerSwatch color={colors[color]} />}
              onUpdate={(hex) => updateColor(color, hex)}
            />
          </EuiFlexItem>
        ))}
      />

      <EuiSpacer size="xxl" />

      <ThemeSection
        code="_EuiThemeBrandTextColors"
        description={
          <p>
            Each brand color also has a corresponding text variant that has been
            calculated for proper (4.5) contrast against{' '}
            <EuiCode>colors.body</EuiCode> and should be used specifically when
            coloring text. As is used in{' '}
            <Link to="/display/text#coloring-text">
              <strong>EuiTextColor</strong>
            </Link>
            .
          </p>
        }
        property="colors"
        themeValues={brandTextKeys.map((color, index) => (
          <EuiFlexItem key={color}>
            <ThemeValue
              property="colors"
              name={brandTextKeys[index]}
              type={props[color]}
              value={colors[brandTextKeys[index]].toUpperCase()}
              onUpdate={(hex) => updateColor(color, hex)}
              example={
                <button
                  css={css`
                    color: ${colors[color]};
                    min-width: ${euiTheme.size.l};
                    min-height: ${euiTheme.size.l};
                  `}>
                  <strong>Aa</strong>
                </button>
              }
            />
          </EuiFlexItem>
        ))}
      />

      <EuiSpacer size="xxl" />

      <ThemeSection
        code="_EuiThemeShadeColors"
        description={
          <p>
            A six-color grayscale palette. Variation beyond these colors is
            minimal and always done through computations against this set.
          </p>
        }
        property="colors"
        themeValues={shadeKeys.map((color) => (
          <EuiFlexItem key={color}>
            <ThemeValue
              key={color}
              property="colors"
              type={props[color]}
              name={color}
              value={colors[color].toUpperCase()}
              example={<EuiColorPickerSwatch color={colors[color]} />}
              onUpdate={(hex) => updateColor(color, hex)}
            />
          </EuiFlexItem>
        ))}
      />

      <EuiSpacer size="xxl" />

      <ThemeSection
        code="_EuiThemeTextColors"
        description={
          <p>
            Specific text colors calculated off either the brand or shade
            colors.
          </p>
        }
        property="colors"
        themeValues={textKeys.map((color) => (
          <EuiFlexItem key={color}>
            <ThemeValue
              property="colors"
              name={color}
              type={props[color]}
              value={colors[color].toUpperCase()}
              onUpdate={(hex) => updateColor(color, hex)}
              example={
                <button
                  css={css`
                    color: ${colors[color]};
                    min-width: ${euiTheme.size.l};
                    min-height: ${euiTheme.size.l};
                  `}>
                  <strong>Aa</strong>
                </button>
              }
            />
          </EuiFlexItem>
        ))}
      />

      <EuiSpacer size="xxl" />

      <ThemeSection
        code="_EuiThemeSpecialColors"
        description={<p>These are used a lot for special cases.</p>}
        property="colors"
        themeValues={specialKeys.map((color) => {
          if (color.includes('Text')) {
            return (
              <EuiFlexItem key={color}>
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
                        min-width: ${euiTheme.size.l};
                        min-height: ${euiTheme.size.l};
                      `}>
                      <strong>Aa</strong>
                    </button>
                  }
                />
              </EuiFlexItem>
            );
          } else {
            return (
              <EuiFlexItem key={color}>
                <ThemeValue
                  key={color}
                  property="colors"
                  name={color}
                  type={props[color]}
                  value={colors[color].toUpperCase()}
                  example={<EuiColorPickerSwatch color={colors[color]} />}
                  onUpdate={(hex) => updateColor(color, hex)}
                />
              </EuiFlexItem>
            );
          }
        })}
      />

      <EuiSpacer size="xxl" />

      <ThemeSection
        code="Constants"
        description={
          <p>These are constant no matter the theme or color mode.</p>
        }
        property="colors"
        themeValues={
          <>
            <EuiFlexItem>
              <ThemeValue
                property="colors"
                name={'ink'}
                type={props.ink}
                value={colors.ink.toUpperCase()}
                example={<EuiColorPickerSwatch disabled color={colors.ink} />}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <ThemeValue
                property="colors"
                name={'ghost'}
                type={props.ghost}
                value={colors.ghost.toUpperCase()}
                example={<EuiColorPickerSwatch disabled color={colors.ghost} />}
              />
            </EuiFlexItem>
          </>
        }
      />
    </div>
  );
};
