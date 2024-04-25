import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { EuiCode, EuiColorPickerSwatch } from '../../../../../src';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

import { ThemeExample } from '../_components/_theme_example';

import { ThemeRowType } from '../_props';
import { ThemeValuesTable } from '../_components/_theme_values_table';
import {
  coreColors,
  coreTextVariants,
  grayColors,
  textOnly,
} from './_contrast_sass';

const euiBrandColors = [...coreColors];

export const BrandSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiColor[Brand]</code>}
        description={description}
        example={
          <div className="guideSass__euiColorWarning">
            <strong>background: {values.euiColorWarning}</strong>
          </div>
        }
        snippet={'background: $euiColorWarning;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const BrandValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiBrandColors.map((color) => {
          return {
            id: color,
            token: `$${color}`,
            value: values[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

const euiTextColors = [...textOnly, ...coreTextVariants];

export const TextSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiColor[Text]</code>}
        description={
          <>
            {description}
            <p>
              If your background color is anything other than or darker than the{' '}
              <EuiCode>$euiPageBackgroundColor</EuiCode>, you will want to
              re-calculate the high contrast version by using the{' '}
              <Link to="/theming/colors/utilities">
                <EuiCode>
                  @include makeHighContrastColor($foreground, $background)
                </EuiCode>
              </Link>{' '}
              method.
            </p>
          </>
        }
        example={
          <div className="guideSass__euiColorWarningText">
            <strong>color: {values.euiColorWarningText}</strong>
          </div>
        }
        snippet={'color: $euiColorWarningText;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const TextValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiTextColors.map((color) => {
          return {
            id: color,
            token: `$${color}`,
            value: values[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

const euiShadeColors = [...grayColors];

export const ShadeSass: FunctionComponent<ThemeRowType> = ({ description }) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiColor[Shade]</code>}
        description={description}
        example={
          <div className="guideSass__tintMediumShade">
            <strong>background: {values.euiColorWarning}</strong>
          </div>
        }
        snippet={'background: tintOrShade($euiColorMediumShade, 90%, 70%);'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const ShadeValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiShadeColors.map((color) => {
          return {
            id: color,
            token: `$${color}`,
            value: values[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};

const euiSpecialColors = [
  'euiPageBackgroundColor',
  'euiColorHighlight',
  'euiColorDisabled',
  'euiColorDisabledText',
  'euiColorGhost',
  'euiColorInk',
];

export const SpecialSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  return (
    <>
      <ThemeExample
        title={<code>$euiColor[Special]</code>}
        description={description}
        example={
          <div className="guideSass__special">
            <strong>
              This text is always white and the background always black.
            </strong>
          </div>
        }
        snippet={`color: \$euiColorGhost;
background-color: \$euiColorInk;`}
        snippetLanguage="scss"
      />
    </>
  );
};

export const SpecialValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <ThemeValuesTable
        items={euiSpecialColors.map((color) => {
          return {
            id: color,
            token: `$${color}`,
            value: values[color],
          };
        })}
        render={(item) => <EuiColorPickerSwatch color={item.value} disabled />}
      />
    </>
  );
};
