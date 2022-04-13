import React, { FunctionComponent, useState } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../../src/services';
import {
  EuiBasicTable,
  EuiButtonGroup,
  EuiCode,
  EuiDescribedFormGroup,
  EuiPanel,
  EuiSpacer,
} from '../../../../../src/components';

import {
  _EuiThemeFontWeight,
  _EuiThemeFontSizeMeasurement,
  _EuiThemeFontScale,
  euiFontSize,
  useEuiFontSize,
} from '../../../../../src/global_styling';

import { EuiThemeFontBase, EuiThemeFontWeight, ThemeRowType } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { getDescription } from '../../../services/props/get_description';
import { ThemeExample } from '../_components/_theme_example';
import { ThemeValuesTable } from '../_components/_theme_values_table';

export const FontJS = () => {
  const { euiTheme } = useEuiTheme();
  const baseProps = getPropsFromComponent(EuiThemeFontBase);

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

export const FontWeightJS: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const { euiTheme } = useEuiTheme();
  const weightProps = getPropsFromComponent(EuiThemeFontWeight);
  const weightKeys = Object.keys(euiTheme.font.weight) as Array<
    keyof _EuiThemeFontWeight
  >;

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

export const FontScaleJS = () => {
  const { euiTheme } = useEuiTheme();
  const scaleKeys = Object.keys(euiTheme.font.scale) as _EuiThemeFontScale[];

  const measurements: _EuiThemeFontSizeMeasurement[] = ['rem', 'px', 'em'];

  const measurementButtons = measurements.map((m) => {
    return {
      id: m,
      label: m,
    };
  });

  const [measurementSelected, setMeasurementSelected] = useState<
    _EuiThemeFontSizeMeasurement
  >(measurementButtons[0].id);

  return (
    <>
      <ThemeExample
        title={<code>useEuiFontSize()</code>}
        description={
          <p>
            Font sizing is provided through this React hook (or function
            version) and not the global theme. It returns both the{' '}
            <EuiCode>font-size</EuiCode> and <EuiCode>line-height</EuiCode> for
            the provided <EuiCode>scale</EuiCode>. But you can still grab an
            individual property via the returned object.
          </p>
        }
        example={
          <p
            css={css`
              ${useEuiFontSize('l')}
            `}
          >
            The quick brown fox jumped over the blue moon to catch a snail
          </p>
        }
        snippet="useEuiFontSize('l');"
      />
      <EuiPanel color="accent">
        <EuiDescribedFormGroup
          fullWidth
          title={<h3>Value measurements</h3>}
          description={
            <p>
              The font sizing function also supports the three main measurements
              for font-size, <EuiCode>rem | px | em</EuiCode>, with{' '}
              <EuiCode>rem</EuiCode> being default for all EUI components.
            </p>
          }
        >
          <EuiButtonGroup
            buttonSize="m"
            legend="Value measurement to show in table"
            options={measurementButtons}
            idSelected={measurementSelected}
            onChange={(id) =>
              setMeasurementSelected(id as _EuiThemeFontSizeMeasurement)
            }
            color="accent"
            isFullWidth
          />
        </EuiDescribedFormGroup>
      </EuiPanel>
      <EuiSpacer />
      <EuiBasicTable
        tableLayout="auto"
        items={scaleKeys.map((scale, index) => {
          return {
            id: scale,
            value: `useEuiFontSize('${scale}'${
              measurementSelected !== 'rem' ? `, '${measurementSelected}'` : ''
            })`,
            size: `${
              euiFontSize(scale, euiTheme, measurementSelected).fontSize
            }`,
            lineHeight: `${
              euiFontSize(scale, euiTheme, measurementSelected).lineHeight
            }`,
            index,
          };
        })}
        columns={[
          {
            field: 'sample',
            name: 'Sample',
            valign: 'baseline',
            width: '50%',
            render: (sample, item) => (
              <div
                css={css`
                  ${euiFontSize(item.id, euiTheme, measurementSelected)}
                `}
              >
                The quick brown fox jumped over the blue moon to catch a snail
              </div>
            ),
            mobileOptions: {
              width: '100%',
            },
          },
          {
            field: 'value',
            name: 'Function',
            width: 'auto',
            valign: 'baseline',
            render: (value: React.ReactNode) => (
              <EuiCode language="css">{value}</EuiCode>
            ),
          },
          {
            field: 'size',
            name: 'Font size',
            width: '100px',
            valign: 'baseline',
            align: 'right',
            render: (size: string) => (
              <small>
                <code>{size}</code>
              </small>
            ),
          },
          {
            field: 'lineHeight',
            name: 'Line height',
            width: '100px',
            valign: 'baseline',
            align: 'right',
            render: (lineHeight: string) => (
              <small>
                <code>{lineHeight}</code>
              </small>
            ),
          },
        ]}
      />
    </>
  );
};
