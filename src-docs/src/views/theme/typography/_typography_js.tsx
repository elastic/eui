import React, { FunctionComponent, useState } from 'react';
import { css } from '@emotion/react';
import { useEuiTheme, EuiThemeProvider } from '../../../../../src/services';
import {
  EuiBasicTable,
  EuiButtonGroup,
  EuiCode,
  EuiCodeBlock,
  EuiDescribedFormGroup,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiCallOut,
  EuiLink,
} from '../../../../../src/components';

import {
  euiFontSize,
  useEuiFontSize,
  EuiThemeFontWeights,
  EuiThemeFontScales,
  EuiThemeFontUnits,
  _EuiThemeFontUnit,
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
        snippetLanguage="emotion"
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
        snippetLanguage="emotion"
      />

      <ThemeExample
        title={<code>euiTheme.font.familySerif</code>}
        description={getDescription(baseProps.familySerif)}
        example={
          <p
            css={css`
              font-family: ${euiTheme.font.familySerif};
            `}
          >
            {euiTheme.font.familySerif}
          </p>
        }
        snippet={'font-family: ${euiTheme.font.familySerif};'}
        snippetLanguage="emotion"
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
        snippetLanguage="emotion"
      />

      <ThemeExample
        title={<code>euiTheme.font.defaultUnits</code>}
        description={getDescription(baseProps.defaultUnits)}
        example={
          <EuiThemeProvider modify={{ font: { defaultUnits: 'px' } }}>
            <EuiText>
              My font size and line height is set using <EuiCode>px</EuiCode>{' '}
              and not <EuiCode>rem</EuiCode>
            </EuiText>
          </EuiThemeProvider>
        }
        snippet={`<EuiProvider modify={{ font: { defaultUnits: 'px' } }}>
  <EuiText>
    <p>Hello world</p>
  </EuiText>
</EuiProvider>
`}
        snippetLanguage="jsx"
      />
    </>
  );
};

export const FontWeightJS: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const { euiTheme } = useEuiTheme();

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
        snippetLanguage="emotion"
      />
    </>
  );
};

export const FontWeightValuesJS = () => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme } = euiThemeContext;
  const weightProps = getPropsFromComponent(EuiThemeFontWeight);
  const weightKeys = EuiThemeFontWeights;

  return (
    <>
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
  return (
    <>
      <ThemeExample
        title={<code>useEuiFontSize()</code>}
        type="hook"
        description={
          <p>
            Font sizing is provided through this React hook (or function
            version) and not the global theme. It returns both the{' '}
            <EuiCode>font-size</EuiCode> and <EuiCode>line-height</EuiCode> for
            the provided <EuiCode>scale</EuiCode>.
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
        snippet="${useEuiFontSize('l')}"
        snippetLanguage="emotion"
      />
      <ThemeExample
        title={<code>useEuiFontSize().fontSize</code>}
        type={null}
        description={
          <p>
            To use precisely only the <EuiCode>font-size</EuiCode> value, you
            will still use the same hook (or function) to grab the individual
            property via the returned object.
          </p>
        }
        example={
          <p
            css={css`
              font-size: ${useEuiFontSize('xs').fontSize};
            `}
          >
            The quick brown fox jumped over the blue moon to catch a snail
          </p>
        }
        snippet="font-size: ${useEuiFontSize('xs').fontSize};"
        snippetLanguage="emotion"
      />
    </>
  );
};

interface FontScaleDetails {
  id: (typeof EuiThemeFontScales)[number];
  value: string;
  size: string;
  lineHeight: string;
  index: number;
}

export const FontScaleValuesJS = () => {
  const euiThemeContext = useEuiTheme();
  const scaleKeys = EuiThemeFontScales;

  const unitButtons = EuiThemeFontUnits.map((m) => {
    return {
      id: m,
      label: m,
    };
  });

  const [unitSelected, setUnitSelected] = useState(unitButtons[0].id);

  return (
    <>
      <EuiPanel color="accent">
        <EuiDescribedFormGroup
          fullWidth
          title={<h3>Font units</h3>}
          description={
            <p>
              The font sizing function also supports three main units for font
              size and line height: <EuiCode>rem | px | em</EuiCode>, with{' '}
              <EuiCode>rem</EuiCode> being default for all EUI components.
            </p>
          }
        >
          <EuiSpacer />
          <EuiButtonGroup
            buttonSize="m"
            legend="Value unit to show in table"
            options={unitButtons}
            idSelected={unitSelected}
            onChange={(id) => setUnitSelected(id as _EuiThemeFontUnit)}
            color="accent"
            isFullWidth
          />
        </EuiDescribedFormGroup>
      </EuiPanel>
      <EuiSpacer size="m" />
      <EuiCallOut
        iconType="accessibility"
        title={
          <>
            We strongly recommend using relative (<EuiCode>rem</EuiCode> or{' '}
            <EuiCode>em</EuiCode>) units instead of <EuiCode>px</EuiCode> when
            possible{' '}
          </>
        }
      >
        <p>
          Relative font units respect configured browser default font sizes,
          which some users may set to larger than than the 16px default due to,
          e.g. visual impairment, monitor size, or personal preference.{' '}
          <EuiLink
            href="https://usability.yale.edu/web-accessibility/articles/zoom-resizing-text"
            target="_blank"
          >
            Read more on accessible text resizing.
          </EuiLink>
        </p>
      </EuiCallOut>
      <EuiSpacer />
      <EuiBasicTable<FontScaleDetails>
        tableLayout="auto"
        items={scaleKeys.map((scale, index) => {
          const { fontSize, lineHeight } = euiFontSize(euiThemeContext, scale, {
            unit: unitSelected,
          });

          return {
            id: scale,
            value: `useEuiFontSize('${scale}'${
              unitSelected !== 'rem' ? `, { unit: '${unitSelected}' }` : ''
            })`,
            size: String(fontSize),
            lineHeight: String(lineHeight),
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
                  ${euiFontSize(euiThemeContext, item.id, {
                    unit: unitSelected,
                  })}
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
              <EuiCodeBlock language="js" paddingSize="s">
                {value}
              </EuiCodeBlock>
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
