import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { transparentize, useEuiTheme } from '../../../../../src/services';
import { getPropsFromComponent } from '../../../services/props/get_props';

import {
  useEuiBackgroundColorStyles,
  EuiCode,
  EuiColorPickerSwatch,
  EuiSpacer,
  EuiText,
  useEuiBackgroundColor,
  useEuiPadding,
  BACKGROUND_COLORS,
  euiBackgroundColor,
  useEuiPaddingStyles,
} from '../../../../../src';

import { EuiThemeColors, ThemeRowType } from '../_props';

import { ThemeExample } from '../_components/_theme_example';
import {
  brand_colors,
  brand_text_colors,
  shade_colors,
  special_colors,
  text_colors,
} from '../../../../../src/themes/amsterdam/global_styling/variables/_colors';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export const brandKeys = Object.keys(brand_colors);

export const BrandJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);

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
        snippetLanguage="emotion"
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
  const props = getPropsFromComponent(EuiThemeColors);
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
        snippetLanguage="emotion"
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
  const props = getPropsFromComponent(EuiThemeColors);

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
        snippetLanguage="emotion"
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
  const props = getPropsFromComponent(EuiThemeColors);
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
        snippetLanguage="emotion"
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

export const UtilsJS = () => {
  const euiTheme = useEuiTheme();

  return (
    <>
      <EuiText grow={false}>
        <h3>Background colors</h3>
        <p>
          To all but ensure proper contrast of text to background, we recommend
          using our pre-defined shades of background colors based on the
          EuiTheme brand colors. You can also use{' '}
          <Link to="/layout/panel">
            <strong>EuiPanel</strong>
          </Link>{' '}
          for the same effect plus more options like padding and rounded
          corners.
        </p>
      </EuiText>

      <EuiSpacer size="l" />

      <ThemeExample
        title={<code>{'useEuiBackgroundColorStyles()[color]'}</code>}
        description={
          <>
            <p>
              Returns an object of the available color keys containing the css
              string of the computed background version for the given{' '}
              <EuiCode language="sass">color</EuiCode>.
            </p>
            <p>
              This is best used to map component prop styles to padding output.
            </p>
          </>
        }
        example={
          <p
            css={[
              useEuiBackgroundColorStyles().accent,
              useEuiPaddingStyles().l,
            ]}
          >
            <code>{useEuiBackgroundColorStyles().accent}</code>
          </p>
        }
        snippetLanguage="tsx"
        snippet={`const colorStyles = useEuiBackgroundColorStyles();
const cssStyles = [colorStyles['accent']];

<span css={cssStyles}>
  /* Your content */
</span>`}
      />

      <ThemeExample
        title={<code>useEuiBackgroundColor(color)</code>}
        description={
          <p>
            Returns the just the computed background color for the given{' '}
            <EuiCode language="sass">color</EuiCode>.
          </p>
        }
        example={
          <p
            css={css`
              background: ${useEuiBackgroundColor('subdued')};
              padding: ${useEuiPadding('l')};
            `}
          >
            <code>{useEuiBackgroundColor('subdued')}</code>
          </p>
        }
        snippetLanguage="emotion"
        snippet={"background: ${useEuiBackgroundColor('subdued')};"}
      />

      <ThemeValuesTable
        items={BACKGROUND_COLORS.map((color) => {
          return {
            id: color,
            token: `useEuiBackgroundColor('${color}')`,
            value: euiBackgroundColor(color, euiTheme),
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};
