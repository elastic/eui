import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import {
  EuiCode,
  EuiColorPickerSwatch,
  EuiThemeAmsterdam,
  useEuiTheme,
} from '../../../../../src';

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
            <strong>color: {values.euiColorTextWarning}</strong>
          </div>
        }
        snippet={'color: $euiColorTextWarning;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const TextValuesSass = () => {
  const values = useJsonVars();
  const textColors = [
    ...Object.keys(values).filter((v) => v.startsWith('euiColorText')),
    ...euiTextColors,
  ];

  return (
    <>
      <ThemeValuesTable
        items={textColors.map((color) => {
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

export const BackgroundSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiColor[Background]</code>}
        description={<>{description}</>}
        example={
          <div className="guideSass__euiColorBackgroundFilledWarning">
            <strong>
              background: {values.euiColorBackgroundFilledWarning}
            </strong>
          </div>
        }
        snippet={'background-color: $euiColorBackgroundFilledWarning;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const BackgroundValuesSass = () => {
  const values = useJsonVars();
  const backgroundColors = Object.keys(values).filter((v) =>
    v.startsWith('euiColorBackground')
  );

  return (
    <>
      <ThemeValuesTable
        items={backgroundColors.map((color) => {
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

export const BorderSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiColor[Border]</code>}
        description={<>{description}</>}
        example={
          <div className="guideSass__euiColorBorderBaseWarning">
            <strong>border-color: {values.euiColorBorderBaseWarning}</strong>
          </div>
        }
        snippet={'border-color: $euiColorBorderBaseWarning;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const BorderValuesSass = () => {
  const values = useJsonVars();
  const borderColors = Object.keys(values).filter((v) =>
    v.startsWith('euiColorBorder')
  );

  return (
    <>
      <ThemeValuesTable
        items={borderColors.map((color) => {
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
  'euiColorPlainLight',
  'euiColorPlainDark',
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
              This text is always light and the background always dark.
            </strong>
          </div>
        }
        snippet={`color: \$euiColorPlainLight;
background-color: \$euiColorPlainDark;`}
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

export const DataVisSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiColor[DataVis]</code>}
        description={description}
        example={
          <div className="guideSass__dataVis">
            <strong>background: {values.euiColorVis0}</strong>
          </div>
        }
        snippet={`background-color: \$euiColorVis0;`}
        snippetLanguage="scss"
      />
    </>
  );
};

export const DataVisValuesSass = () => {
  const { euiTheme } = useEuiTheme();
  const values = useJsonVars();
  const dataVisKeys =
    euiTheme.themeName === EuiThemeAmsterdam.key
      ? Object.keys(values).filter((key: string) =>
          key.match(/euiColorVis[0-9]$|euiColorVis[0-9]_behindText/)
        )
      : Object.keys(values).filter((key: string) =>
          key.match(/euiColorVis[0-9]$/)
        );

  return (
    <>
      <ThemeValuesTable
        items={dataVisKeys.map((color) => {
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
