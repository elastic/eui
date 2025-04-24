import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';

import { EuiCode, EuiColorPickerSwatch } from '../../../../../src';

import {
  _EuiThemeBorderColorValues,
  _EuiThemeBorderTypes,
  _EuiThemeBorderRadiusValues,
  _EuiThemeBorderWidthValues,
} from '../../../../../src/global_styling/variables/borders';

import {
  EuiThemeBorderColorValues,
  EuiThemeBorderRadiusValues,
  EuiThemeBorderTypes,
  EuiThemeBorderWidthValues,
  ThemeRowType,
} from '../_props';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';
import { getDescription } from '../../../services/props/get_description';

export const TypesJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  return (
    <>
      <ThemeExample
        title={<code>euiTheme.border[type]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              border: ${euiTheme.border.thin};
            `}
          >
            <strong>{`border: ${euiTheme.border.thin}`}</strong>
          </div>
        }
        snippet={'border: ${euiTheme.border.thin};'}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const TypesValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const typeProps = getPropsFromComponent(EuiThemeBorderTypes);
  const types = Object.keys(typeProps) as Array<keyof _EuiThemeBorderTypes>;
  return (
    <>
      <ThemeValuesTable
        items={types.map((type) => {
          return {
            id: type,
            token: `border.${type}`,
            type: typeProps[type],
            value: euiTheme.border[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={euiTheme.colors.emptyShade}
            disabled
            css={[
              css`
                border: ${item.value};
              `,
            ]}
          />
        )}
      />
    </>
  );
};

export const ColorJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();
  const colorProps = getPropsFromComponent(EuiThemeBorderColorValues);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.border.color</code>}
        description={
          <>
            {getDescription(colorProps.color)}
            {description}
          </>
        }
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              border-width: 1px;
              border-style: solid;
              border-color: ${euiTheme.border.color};
            `}
          >
            <strong>{`border-color: ${euiTheme.border.color}`}</strong>
          </div>
        }
        snippet={'border-color: ${euiTheme.border.color};'}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const ColorValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const colorProps = getPropsFromComponent(EuiThemeBorderColorValues);
  const types = Object.keys(colorProps) as Array<
    keyof _EuiThemeBorderColorValues
  >;

  return (
    <>
      <ThemeValuesTable
        items={types.map((type) => {
          return {
            id: type,
            token: `border.${type}`,
            type: colorProps[type],
            value: euiTheme.border[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={item.value}
            disabled
          />
        )}
      />
    </>
  );
};

export const WidthJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();

  const wrappingExampleStyle = {
    padding: euiTheme.size.s,
  };

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.border.width[size]</code>}
        description={
          <p>
            {description}
            <EuiCode>border.color</EuiCode>.
          </p>
        }
        example={
          <div
            style={wrappingExampleStyle}
            css={css`
              border: ${euiTheme.border.width.thick} dashed
                ${euiTheme.border.color};
            `}
          >
            <strong>{`border: ${euiTheme.border.width.thick} dashed ${euiTheme.border.color}`}</strong>
          </div>
        }
        snippet={
          'border: ${euiTheme.border.width.thick} dashed ${euiTheme.border.color};'
        }
        snippetLanguage="emotion"
      />
    </>
  );
};

export const WidthValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const widthProps = getPropsFromComponent(EuiThemeBorderWidthValues);
  const widths = Object.keys(widthProps) as Array<
    keyof _EuiThemeBorderWidthValues
  >;

  return (
    <>
      <ThemeValuesTable
        items={widths.map((type) => {
          return {
            id: type,
            token: `border.width.${type}`,
            type: widthProps[type],
            value: euiTheme.border.width[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={euiTheme.colors.emptyShade}
            disabled
            css={css`
              border: ${euiTheme.border.thick};
              border-width: ${item.value};
            `}
          />
        )}
      />
    </>
  );
};

export const RadiusJS: FunctionComponent<ThemeRowType> = ({ description }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.border.radius[size]</code>}
        description={description}
        example={
          <div
            css={css`
              padding: ${euiTheme.size.s};
              border: ${euiTheme.border.thick};
              border-radius: ${euiTheme.border.radius.medium};
            `}
          >
            <strong>{`border-radius: ${euiTheme.border.radius.medium}`}</strong>
          </div>
        }
        snippet={'border-radius: ${euiTheme.border.radius.medium};'}
        snippetLanguage="emotion"
      />
    </>
  );
};

export const RadiusValuesJS = () => {
  const { euiTheme } = useEuiTheme();
  const radiusProps = getPropsFromComponent(EuiThemeBorderRadiusValues);
  const radii = Object.keys(radiusProps) as Array<
    keyof _EuiThemeBorderRadiusValues
  >;

  return (
    <>
      <ThemeValuesTable
        items={radii.map((type) => {
          return {
            id: type,
            token: `border.radius.${type}`,
            type: radiusProps[type],
            value: euiTheme.border.radius[type],
          };
        })}
        render={(item) => (
          <EuiColorPickerSwatch
            showToolTip={false}
            color={euiTheme.colors.emptyShade}
            disabled
            css={css`
              border: ${euiTheme.border.thick};
              border-radius: ${item.value};
            `}
          />
        )}
      />
    </>
  );
};
