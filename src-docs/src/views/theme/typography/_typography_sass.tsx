import React, { FunctionComponent, ReactNode } from 'react';

import { EuiCode, EuiBasicTable, EuiSpacer } from '../../../../../src';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

import { EuiThemeFontBase, ThemeRowType } from '../_props';
import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeExample } from '../_components/_theme_example';
import {
  getDescription,
  getDescriptionSmall,
} from '../../../services/props/get_description';

export const euiFontMixins: {
  [key: string]: { description: string; sample?: any };
} = {
  euiFont: {
    description:
      'Base font reset including family, weight, letter-spacing, and kerning.',
  },
  euiCodeFont: {
    description: 'Supplies the code font family and resets letter-spacing.',
  },
  euiText: {
    description: 'Base reset for text color and weight.',
  },
  'euiTitle($size)': {
    description:
      "Accepts a `$size` parameter of `'xxxs'` to `'l'` and sets appropriate font-size, weight, color, and line-height. It also ensures long words wrap lines.",
  },
  'fontSize($size)': {
    description:
      'Accepts a `$size` parameter of a pixel value and returns the appropriate `font-size` property in `rem` units.',
    sample: (
      <div className={'guideSass__mixin--fontSize'}>The quick brown fox</div>
    ),
  },
};

export const FontSass = () => {
  const values = useJsonVars();
  const baseProps = getPropsFromComponent(EuiThemeFontBase);

  return (
    <>
      <ThemeExample
        title={<code>$euiFontFamily</code>}
        description={getDescription(baseProps.family)}
        example={values.euiFontFamily}
        snippet={'font-family: $euiFontFamily;'}
        snippetLanguage="scss"
      />

      <ThemeExample
        title={<code>$euiCodeFontFamily</code>}
        description={getDescription(baseProps.familyCode)}
        example={
          <p className="guideSass__fontFamily--code">
            {values.euiCodeFontFamily}
          </p>
        }
        snippet={'font-family: $euiCodeFontFamily;'}
        snippetLanguage="scss"
      />

      <ThemeExample
        title={'Mixins'}
        type={null}
        description={
          <>
            <p>
              EUI also provides mixins for applying a full set of font-based
              resets from these global variables such as{' '}
              <EuiCode>font-family</EuiCode>, <EuiCode>font-weight</EuiCode>,
              and <EuiCode>letter-spacing</EuiCode>.
            </p>
          </>
        }
        example={
          <p className="guideSass__fontFamily--code">The quick brown fox</p>
        }
        snippet="@include euiCodeFont;"
        snippetLanguage="scss"
      />
    </>
  );
};

export const FontValuesSass = () => {
  return (
    <>
      <EuiBasicTable
        items={Object.keys(euiFontMixins).map(function (mixin) {
          return {
            id: mixin,
            mixin: `@include ${mixin}`,
            sample: euiFontMixins[mixin].sample,
          };
        })}
        columns={[
          {
            field: 'mixin',
            name: 'Mixin',
            render: (mixin: React.ReactNode, item) => (
              <div>
                <EuiCode>{mixin}</EuiCode>
                <EuiSpacer size="s" />
                {getDescriptionSmall(euiFontMixins[item.id])}
              </div>
            ),
            mobileOptions: {
              header: false,
              width: '100%',
            },
          },
          {
            field: 'sample',
            name: 'Sample',
            render: (sample, item) =>
              sample || (
                <div
                  className={`guideSass__mixin--${
                    item.id === 'euiTitle($size)' ? 'euiTitle' : item.id
                  }`}
                >
                  The quick brown fox
                </div>
              ),
          },
        ]}
      />
    </>
  );
};

export const euiFontWeights = [
  'euiFontWeightLight',
  'euiFontWeightRegular',
  'euiFontWeightMedium',
  'euiFontWeightSemiBold',
  'euiFontWeightBold',
] as const;

export const FontWeightSass: FunctionComponent<ThemeRowType> = ({
  description,
}) => {
  const values = useJsonVars();

  return (
    <>
      <ThemeExample
        title={<code>$euiFontWeight[Weight]</code>}
        description={description}
        example={
          <div style={{ fontWeight: values.euiFontWeightBold }}>
            I am proper bold
          </div>
        }
        snippet={'font-weight: $euiFontWeightBold;'}
        snippetLanguage="scss"
      />
    </>
  );
};

export const FontWeightValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <EuiBasicTable
        items={euiFontWeights.map(function (weight) {
          return {
            id: weight,
            token: `$${weight}`,
            value: values[weight],
          };
        })}
        columns={[
          {
            field: 'token',
            name: 'Token',
            render: (variable: React.ReactNode) => (
              <EuiCode>{variable}</EuiCode>
            ),
            mobileOptions: {
              header: false,
              width: '100%',
            },
          },
          {
            field: 'sample',
            name: 'Sample',
            render: (sample, item) => (
              <p style={{ fontWeight: item.value }}>The quick brown fox</p>
            ),
          },
          {
            field: 'value',
            name: 'Value',
            width: '60px',
            align: 'right',
            render: (value: ReactNode) => (
              <small>
                <code>{value}</code>
              </small>
            ),
          },
        ]}
      />
    </>
  );
};

const euiFontSizes = [
  'euiFontSizeXS',
  'euiFontSizeS',
  'euiFontSizeM',
  'euiFontSizeL',
  'euiFontSizeXL',
  'euiFontSizeXXL',
];

export const FontScaleSass = () => {
  return (
    <>
      <ThemeExample
        title={'Mixins'}
        type={null}
        description={
          <p>
            It is recommended to use these as a mixin to automatically apply
            line-height as well as size.
          </p>
        }
        example={<p className="guideSass__fontSizeL">The quick brown fox</p>}
        snippet="@include euiFontSizeL;"
        snippetLanguage="scss"
      />
    </>
  );
};

export const FontScaleValuesSass = () => {
  const values = useJsonVars();

  return (
    <>
      <EuiBasicTable
        items={euiFontSizes.map(function (size, index) {
          return {
            id: size,
            token: `$${size}`,
            mixin: `@include ${size}`,
            value: values[size],
            index,
          };
        })}
        columns={[
          {
            field: 'token',
            name: 'Token',
            render: (variable: React.ReactNode) => (
              <EuiCode>{variable}</EuiCode>
            ),
          },
          {
            field: 'mixin',
            name: 'Mixin',
            render: (mixin: React.ReactNode) => (
              <EuiCode language="css">{mixin}</EuiCode>
            ),
          },
          {
            field: 'sample',
            name: 'Sample',
            render: (sample, item) => (
              <div className={`guideSass__fontSize--${item.id}`}>
                The quick brown fox
              </div>
            ),
            mobileOptions: {
              width: '50%',
            },
          },
          {
            field: 'value',
            name: 'Value',
            width: '60px',
            align: 'right',
            render: (value: ReactNode) => (
              <small>
                <code>{value}</code>
              </small>
            ),
          },
        ]}
      />
    </>
  );
};
