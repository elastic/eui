import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { transparentize, useEuiTheme } from '../../../../../src/services';

import { EuiCode, EuiColorPickerSwatch } from '../../../../../src';

import { EuiThemeColors, getPropsFromThemeKey, ThemeRowType } from '../_props';

import { ThemeExample } from '../_components/_theme_example';
import {
  brand_colors,
  brand_text_colors,
  shade_colors,
  special_colors,
  text_colors,
} from '../../../../../src/global_styling/variables/_colors';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export const brandKeys = Object.keys(brand_colors);

export const BrandJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromThemeKey(EuiThemeColors);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[brand]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              color: ${euiTheme.colors.ink};
              background: ${euiTheme.colors.warning};
            `}
          >
            <strong>background: {euiTheme.colors.warning}</strong>
          </div>
        }
        snippet={'background: ${euiTheme.colors.warning};'}
      />

      <ThemeValuesTable
        items={brandKeys.map((color) => {
          return {
            id: color,
            token: `colors.${color}`,
            type: props[color],
            // @ts-ignore TODO
            value: euiTheme.colors[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

export const brandTextKeys = Object.keys(brand_text_colors);
export const textKeys = Object.keys(text_colors);

export const TextJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromThemeKey(EuiThemeColors);
  const textColors = textKeys.concat(brandTextKeys);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[colorText]</code>}
        description={
          <>
            {description}
            <p>
              If your background color is anything other than or darker than the{' '}
              <EuiCode>body</EuiCode> color, you will want to re-calculate the
              high contrast version by using the{' '}
              <Link to="/utilities/color-functions">
                <EuiCode>makeHighContrastColor(foreground)(background)</EuiCode>
              </Link>{' '}
              method.
            </p>
          </>
        }
        example={
          <div
            css={css`
              color: ${euiTheme.colors.warningText};
            `}
          >
            <strong>color: {euiTheme.colors.warningText}</strong>
          </div>
        }
        snippet={'color: ${euiTheme.colors.warningText};'}
      />

      <ThemeValuesTable
        items={textColors.map((color) => {
          return {
            id: color,
            token: `colors.${color}`,
            type: props[color],
            // @ts-ignore TODO
            value: euiTheme.colors[color],
          };
        })}
        render={(item) => (
          <div
            css={css`
              color: ${item.value};
              min-width: ${euiTheme.size.l};
              min-height: ${euiTheme.size.l};
            `}
          >
            <strong>Aa</strong>
          </div>
        )}
      />
    </>
  );
};

export const shadeKeys = Object.keys(shade_colors);

export const ShadeJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromThemeKey(EuiThemeColors);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[colorShade]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              background: ${transparentize(euiTheme.colors.mediumShade, 0.25)};
            `}
          >
            <strong>
              background: {transparentize(euiTheme.colors.mediumShade, 0.25)}
            </strong>
          </div>
        }
        snippet={
          'background: ${transparentize(euiTheme.colors.mediumShade, .25)};'
        }
      />

      <ThemeValuesTable
        items={shadeKeys.map((color) => {
          return {
            id: color,
            token: `colors.${color}`,
            type: props[color],
            // @ts-ignore TODO
            value: euiTheme.colors[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

const specialKeys = Object.keys(special_colors);

export const SpecialJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromThemeKey(EuiThemeColors);
  const allSpecialKeys = specialKeys.concat(['ghost', 'ink']);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[special]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              color: ${euiTheme.colors.ghost};
              background-color: ${euiTheme.colors.ink};
            `}
          >
            <strong>
              This text is always white and the background always black.
            </strong>
          </div>
        }
        snippet={`color: \${euiTheme.colors.ghost};
  background-color: \${euiTheme.colors.ink};`}
      />

      <ThemeValuesTable
        items={allSpecialKeys.map((color) => {
          return {
            id: color,
            token: `colors.${color}`,
            type: props[color],
            // @ts-ignore TODO
            value: euiTheme.colors[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};
