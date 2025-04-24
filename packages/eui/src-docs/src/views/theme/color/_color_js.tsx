import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { transparentize, useEuiTheme } from '../../../../../src/services';
import { getPropsFromComponent } from '../../../services/props/get_props';

import {
  useEuiBackgroundColorCSS,
  EuiCode,
  EuiColorPickerSwatch,
  EuiText,
  BACKGROUND_COLORS,
  logicalCSS,
  useEuiPaddingCSS,
  AMSTERDAM_NAME_KEY,
  EuiThemeAmsterdam,
  colorVis,
} from '../../../../../src';

import { EuiThemeColors, ThemeRowType } from '../_props';

import { ThemeExample } from '../_components/_theme_example';
import {
  background_colors,
  border_colors,
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
    </>
  );
};

export const BrandValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);

  return (
    <>
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

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[colorText]</code>}
        description={
          <>
            {description}
            {euiTheme.themeName === AMSTERDAM_NAME_KEY && (
              <p>
                If your background color is anything other than or darker than
                the <EuiCode>body</EuiCode> color, you will want to re-calculate
                the high contrast version by using the{' '}
                <Link to="/theming/colors/utilities">
                  <EuiCode>
                    makeHighContrastColor(foreground)(background)
                  </EuiCode>
                </Link>{' '}
                method.
              </p>
            )}
          </>
        }
        example={
          <div
            css={css`
              color: ${euiTheme.colors.textWarning};
            `}
          >
            <strong>color: {euiTheme.colors.textWarning}</strong>
          </div>
        }
        snippet={'color: ${euiTheme.colors.textWarning};'}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const TextValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);
  const textColors = textKeys.concat(brandTextKeys);

  return (
    <>
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
              ${logicalCSS('min-width', euiTheme.size.l)}
              ${logicalCSS('min-height', euiTheme.size.l)}
            `}
          >
            <strong>Aa</strong>
          </div>
        )}
      />
    </>
  );
};

export const backgroundKeys = Object.keys(background_colors);

export const BackgroundJS: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[background]</code>}
        description={<>{description}</>}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              color: ${euiTheme.colors.textInverse};
              background-color: ${euiTheme.colors.backgroundFilledWarning};
            `}
          >
            <strong>
              background: {euiTheme.colors.backgroundFilledWarning}
            </strong>
          </div>
        }
        snippet={
          'background-color: ${euiTheme.colors.backgroundFilledWarning};'
        }
        snippetLanguage="emotion"
      />
    </>
  );
};

export const BackgroundValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);

  return (
    <>
      <ThemeValuesTable
        items={backgroundKeys.map((color) => {
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

export const borderKeys = Object.keys(border_colors);

export const BorderJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[border]</code>}
        description={<>{description}</>}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              border: 1px solid ${euiTheme.colors.borderBaseWarning};
            `}
          >
            <strong>border-color: {euiTheme.colors.borderBaseWarning}</strong>
          </div>
        }
        snippet={'border-color: ${euiTheme.colors.borderBaseWarning};'}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const BorderValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);

  return (
    <>
      <ThemeValuesTable
        items={borderKeys.map((color) => {
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

export const shadeKeys = Object.keys(shade_colors);

export const ShadeJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();

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
    </>
  );
};

export const ShadeValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);

  return (
    <>
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

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors[special]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              color: ${euiTheme.colors.plainLight};
              background-color: ${euiTheme.colors.plainDark};
            `}
          >
            <strong>
              This text is always light and the background always dark.
            </strong>
          </div>
        }
        snippet={`color: \${euiTheme.colors.plainLight};
  background-color: \${euiTheme.colors.plainDark};`}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const SpecialValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);
  const allSpecialKeys = specialKeys.concat([
    'ghost',
    'ink',
    'plainLight',
    'plainDark',
  ]);

  return (
    <>
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

export const DataVisJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors.vis[dataVis]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              color: ${euiTheme.colors.plainDark};
              background-color: ${euiTheme.colors.vis.euiColorVis0};
            `}
          >
            <strong>background: {euiTheme.colors.vis.euiColorVis0}</strong>
          </div>
        }
        snippet={`background-color: \${euiTheme.colors.vis.euiColorVis0};`}
        snippetLanguage="emotion"
      />
    </>
  );
};

const dataVisKeys = Object.keys(colorVis).filter((key) =>
  key.match(/euiColorVis[0-9]/)
);
const dataVisAdditionalKeys = Object.keys(colorVis).filter((key) =>
  key.match(/euiColorVisBehindText[0-9]/)
);

export const DataVisValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);
  const colorKeys =
    euiTheme.themeName === EuiThemeAmsterdam.key
      ? [...dataVisKeys, ...dataVisAdditionalKeys]
      : dataVisKeys;

  return (
    <>
      <ThemeValuesTable
        items={colorKeys.map((color) => {
          return {
            id: color,
            token: `colors.vis.${color}`,
            type: props[color],
            // @ts-ignore TODO
            value: euiTheme.colors.vis[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

export const SeverityJS: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.colors.severity[severity]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              color: ${euiTheme.colors.plainDark};
              background-color: ${euiTheme.colors.severity.risk};
            `}
          >
            <strong>background: {euiTheme.colors.severity.risk}</strong>
          </div>
        }
        snippet={`background-color: \${euiTheme.colors.severity.risk};`}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const SeverityValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);
  const colorKeys = Object.keys(euiTheme.colors.severity).filter(
    (item) => item !== '__docgenInfo'
  );

  return (
    <>
      <ThemeValuesTable
        items={colorKeys.map((color) => {
          return {
            id: color,
            token: `colors.severity.${color}`,
            type: props[color],
            // @ts-ignore TODO
            value: euiTheme.colors.severity[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

export const UtilsJS = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <EuiText grow={false}>
        <p>
          To all but ensure proper contrast of text to background, we recommend
          using the semantic background tokens like{' '}
          <EuiCode>backgroundBasePrimary</EuiCode>. You can also use{' '}
          <Link to="/layout/panel">
            <strong>EuiPanel</strong>
          </Link>{' '}
          for the same effect plus more options like padding and rounded
          corners.
        </p>
      </EuiText>

      <ThemeExample
        title={<code>{'useEuiBackgroundColorCSS()[color]'}</code>}
        type="style hook"
        props={`color: '${BACKGROUND_COLORS.join("' | '")}';`}
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
          <p css={[useEuiBackgroundColorCSS().accent, useEuiPaddingCSS().l]}>
            <code>
              background-color: {euiTheme.colors.backgroundBaseAccent}
            </code>
          </p>
        }
        snippetLanguage="tsx"
        snippet={`const colorStyles = useEuiBackgroundColorCSS();
const cssStyles = [colorStyles['accent']];

<span css={cssStyles}>
  /* Your content */
</span>`}
      />
    </>
  );
};
