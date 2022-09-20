import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { transparentize, useEuiTheme } from '../../../../../src/services';
import { getPropsFromComponent } from '../../../services/props/get_props';

import {
  useEuiBackgroundColorCSS,
  EuiCode,
  EuiColorPickerSwatch,
  EuiText,
  useEuiBackgroundColor,
  useEuiPaddingSize,
  BACKGROUND_COLORS,
  euiBackgroundColor,
  useEuiPaddingCSS,
  EuiButtonGroup,
  EuiDescribedFormGroup,
  EuiPanel,
  EuiSpacer,
  _EuiBackgroundColorOptions,
  logicalCSS,
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
            <p>
              If your background color is anything other than or darker than the{' '}
              <EuiCode>body</EuiCode> color, you will want to re-calculate the
              high contrast version by using the{' '}
              <Link to="/theming/colors/utilities">
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
    </>
  );
};

export const SpecialValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const props = getPropsFromComponent(EuiThemeColors);
  const allSpecialKeys = specialKeys.concat(['ghost', 'ink']);

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

export const UtilsJS = () => {
  return (
    <>
      <EuiText grow={false}>
        <p>
          To all but ensure proper contrast of text to background, we recommend
          using our pre-defined shades of background colors based on the{' '}
          <strong>EuiTheme</strong> brand colors. You can also use{' '}
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
            <code>background-color: {useEuiBackgroundColor('accent')}</code>
          </p>
        }
        snippetLanguage="tsx"
        snippet={`const colorStyles = useEuiBackgroundColorCSS();
const cssStyles = [colorStyles['accent']];

<span css={cssStyles}>
  /* Your content */
</span>`}
      />

      <ThemeExample
        title={<code>useEuiBackgroundColor(color, method?)</code>}
        type="hook"
        props={`color: '${BACKGROUND_COLORS.join("' | '")}';

method? 'opaque' | 'transparent';`}
        description={
          <p>
            Returns just the computed background color for the given{' '}
            <EuiCode language="sass">color</EuiCode>.
          </p>
        }
        example={
          <p
            css={css`
              background: ${useEuiBackgroundColor('subdued')};
              padding: ${useEuiPaddingSize('l')};
            `}
          >
            <code>{useEuiBackgroundColor('subdued')}</code>
          </p>
        }
        snippetLanguage="emotion"
        snippet={"background: ${useEuiBackgroundColor('subdued')};"}
      />
    </>
  );
};

export const UtilsValuesJS = () => {
  const euiTheme = useEuiTheme();
  const backgroundButtons = ['opaque', 'transparent'].map((m) => {
    return {
      id: m,
      label: m,
    };
  });
  const [backgroundSelected, setBackgroundSelected] = useState(
    backgroundButtons[0].id
  );

  return (
    <>
      <EuiPanel color="accent">
        <EuiDescribedFormGroup
          fullWidth
          title={<h3>Different colors for different contexts</h3>}
          description={
            <p>
              While the hook accepts rendering the value as opaque or
              transparent, we highly suggest reserving transparent for use only
              during interactive states like hover and focus.
            </p>
          }
        >
          <EuiSpacer />
          <EuiButtonGroup
            buttonSize="m"
            legend="Value measurement to show in table"
            options={backgroundButtons}
            idSelected={backgroundSelected}
            onChange={(id) => setBackgroundSelected(id)}
            color="accent"
            isFullWidth
          />
        </EuiDescribedFormGroup>
      </EuiPanel>
      <EuiSpacer />

      <ThemeValuesTable
        items={BACKGROUND_COLORS.map((color) => {
          return {
            id: color,
            token:
              backgroundSelected === 'transparent'
                ? `useEuiBackgroundColor('${color}', 'transparent')`
                : `useEuiBackgroundColor('${color}')`,
            value: euiBackgroundColor(euiTheme, color, {
              method: backgroundSelected as _EuiBackgroundColorOptions['method'],
            }),
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            color={item.value}
            style={{ background: item.value }}
            disabled
          />
        )}
      />
    </>
  );
};
