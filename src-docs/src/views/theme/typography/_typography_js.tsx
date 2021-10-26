import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';
import { EuiCode } from '../../../../../src/components';

import {
  fontWeight,
  _EuiThemeFontWeight,
} from '../../../../../src/global_styling/variables/_typography';

import {
  getPropsFromThemeKey,
  EuiThemeFontBase,
  EuiThemeFontWeight,
  ThemeRowType,
} from '../_props';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';
import { getDescription } from '../_components/_theme_values_descriptions';

export const FontJS = () => {
  const { euiTheme } = useEuiTheme();
  const baseProps = getPropsFromThemeKey(EuiThemeFontBase);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.font.family</code>}
        description={
          <>
            {getDescription(baseProps.family)}
            <br />
            <p>
              All of EUI defaults to the base <EuiCode>font.family</EuiCode>.
              However, you can use this token to change specific instances.
            </p>
          </>
        }
        example={
          <p
            css={css`
              font-family: ${euiTheme.font.family};
            `}
          >
            {euiTheme.font.family}
          </p>
        }
        snippet={'font-family: ${euiTheme.font.family};'}
      />

      <ThemeExample
        title={<code>euiTheme.font.familyCode</code>}
        description={getDescription(baseProps.familyCode)}
        example={
          <p
            css={css`
              font-family: ${euiTheme.font.familyCode};
            `}
          >
            {euiTheme.font.familyCode}
          </p>
        }
        snippet={'font-family: ${euiTheme.font.familyCode};'}
      />

      <ThemeExample
        title={<code>euiTheme.font.featureSettings</code>}
        description={getDescription(baseProps.featureSettings)}
        example={
          <p
            css={css`
              font-feature-settings: ${euiTheme.font.featureSettings};
            `}
          >
            {euiTheme.font.featureSettings}
          </p>
        }
        snippet={'font-feature-settings: ${euiTheme.font.featureSettings};'}
      />
    </>
  );
};

const weightKeys = Object.keys(fontWeight) as Array<keyof _EuiThemeFontWeight>;

export const FontWeightJS: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const { euiTheme } = useEuiTheme();
  const weightProps = getPropsFromThemeKey(EuiThemeFontWeight);

  return (
    <>
      <ThemeExample
        title={<code>euiTheme.font.weight[weight]</code>}
        description={description}
        example={
          <div
            css={css`
              font-weight: ${euiTheme.font.weight.bold};
            `}
          >
            {'I am proper bold'}
          </div>
        }
        snippet={'font-weight: ${euiTheme.font.weight.bold};'}
      />

      <ThemeValuesTable
        items={weightKeys.map((weight) => {
          return {
            id: weight,
            token: `font.weight.${weight}`,
            type: weightProps[weight],
            value: euiTheme.font.weight[weight],
          };
        })}
        render={(item) => (
          <div
            css={css`
              font-weight: ${item.value};
            `}
          >
            Aa
          </div>
        )}
      />
    </>
  );
};
