import { useState } from 'react';
import { css } from '@emotion/react';
import {
  euiFontSize,
  useEuiFontSize,
  useEuiTheme,
  EuiBasicTable,
  EuiButtonGroup,
  EuiCallOut,
  EuiCode,
  EuiCodeBlock,
  EuiDescribedFormGroup,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiThemeFontScales,
  EuiThemeFontUnits,
} from '@elastic/eui';

interface FontScaleDetails {
  id: (typeof EuiThemeFontScales)[number];
  value: string;
  size: string;
  lineHeight: string;
  index: number;
}

export const FontSizePreview = () => (
  <p
    css={css`
      ${useEuiFontSize('l')}
    `}
  >
    The quick brown fox jumped over the blue moon to catch a snail
  </p>
);

export const FontSizeIndividualPreview = () => (
  <p
    css={css`
      font-size: ${useEuiFontSize('xs').fontSize};
    `}
  >
    The quick brown fox jumped over the blue moon to catch a snail
  </p>
);

export const FontScaleTable = () => {
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
