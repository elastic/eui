import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore Importing from Sass file
import fonts from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../../src/global_styling/variables/_font_weight.scss';
import { ThemeContext } from '../../../components/with_theme';
import { RenderPaletteColor } from './render_palette';

import {
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiFlexGrid,
  EuiPanel,
  EuiBasicTable,
  EuiCallOut,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiRange,
  htmlIdGenerator,
  throttle,
} from '../../../../../src';

const euiFontSizes = [
  'euiFontSizeXS',
  'euiFontSizeS',
  'euiFontSize',
  'euiFontSizeM',
  'euiFontSizeL',
  'euiFontSizeXL',
];

const euiFontWeights = [
  'euiFontWeightLight',
  'euiFontWeightRegular',
  'euiFontWeightMedium',
  'euiFontWeightSemiBold',
  'euiFontWeightBold',
];

const euiTextColors = ['euiTextColor', 'euiTextSubduedColor', 'euiLinkColor'];

const ImportFontFamily = () => {
  const themeContext = useContext(ThemeContext);
  let importString;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      importString = `@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i');
@import url('https://rsms.me/inter/inter-ui.css');`;
      break;
    default:
      importString =
        "@import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10,300..700;0,300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap');";
  }

  return (
    <EuiCodeBlock language="scss" paddingSize="m" fontSize="m" isCopyable>
      {importString}
    </EuiCodeBlock>
  );
};

const VariableLink = () => {
  const themeContext = useContext(ThemeContext);
  let url;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      url =
        'https://github.com/elastic/eui/blob/master/src/global_styling/variables/_typography.scss';
      break;
    default:
      url =
        'https://github.com/elastic/eui/blob/master/src/themes/eui-amsterdam/global_styling/variables/_typography.scss';
  }

  return <EuiLink href={url}>variables</EuiLink>;
};

const MixinLink = () => {
  const themeContext = useContext(ThemeContext);
  let url;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      url =
        'https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_typography.scss';
      break;
    default:
      url =
        'https://github.com/elastic/eui/blob/master/src/themes/eui-amsterdam/global_styling/mixins/_typography.scss';
  }

  return <EuiLink href={url}>mixins</EuiLink>;
};

const FontWeight = ({ fontWeight }: { fontWeight: number }) => {
  const weight = Object.keys(fonts).find(
    (key) => fonts[key] === Number(fontWeight)
  );
  return (
    <EuiText className="guideSass__fontSizeExample">
      <p>
        <EuiCode style={{ fontWeight: fontWeight }}>
          font-weight: {weight ? `$${weight}` : fontWeight}
        </EuiCode>
      </p>
      <p
        style={{ fontWeight: fontWeight }}
        className="guideSass__fontSize--euiFontSizeL"
      >
        The quick brown fox
      </p>
    </EuiText>
  );
};

export const Typography = ({}) => {
  const themeContext = useContext(ThemeContext);
  const selectedTheme = themeContext.theme;
  const [fontWeight, setFontWeight] = useState(400);

  const onFontWeightChange = throttle((e) => {
    setFontWeight(e.target.value);
  }, 25);

  return (
    <>
      <EuiText>
        <p>
          EUI uses Inter as it&apos;s main font-family and Roboto for monospace.
          You&apos;ll need to import these from your desired location. Our
          recommendations are:
        </p>

        <ImportFontFamily />

        <p>
          View the <VariableLink /> and <MixinLink /> Sass code for typography.
          For most of your components we recommend using{' '}
          <Link to="/display/text">EuiText</Link> or{' '}
          <Link to="/display/title">EuiTitle</Link> instead of these Sass
          variables.
        </p>
      </EuiText>

      <EuiSpacer />
      <EuiText>
        <h3>Text sizes</h3>
        <EuiCallOut
          color="warning"
          title={
            <span>
              It is more common to use these as a mixin (e.g.{' '}
              <EuiCode language="css">@include euiFontSizeS;</EuiCode>) to
              automatically apply line-height as well as size.
            </span>
          }
        />
        <EuiSpacer />

        <EuiBasicTable
          items={euiFontSizes.map(function (size) {
            return {
              id: size,
              variable: `$${size}`,
              mixin: `@include ${size}`,
            };
          })}
          rowHeader="firstName"
          columns={[
            {
              field: 'variable',
              name: 'Variable',
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
            },
          ]}
        />
      </EuiText>
      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiText>
            <EuiText>
              <h3>Text colors</h3>
            </EuiText>

            <EuiSpacer />

            {euiTextColors.map((color) => (
              <RenderPaletteColor key={color} color={color} />
            ))}

            <h3>Font families</h3>

            <EuiSpacer />

            <EuiFlexGroup responsive={false} alignItems="center">
              <EuiFlexItem grow={false} className="guideSass__fontFamily">
                Abc
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiCode language="css">@include euiFont;</EuiCode>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiFlexGroup responsive={false} alignItems="center">
              <EuiFlexItem
                grow={false}
                className="guideSass__fontFamily guideSass__fontFamily--code"
              >
                Abc
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiCode language="css">@include euiCodeFont;</EuiCode>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <div>
            <EuiText>
              <h3>Font weights</h3>
              <p>
                <small>
                  EUI establishes a set of 5 font-weights based on their numeric
                  keywords values. When importing the font-family from your
                  service of choice, ensure that you have all 5 weights
                  contained in your import.{' '}
                  {selectedTheme.includes('amsterdam') ? (
                    <>
                      The Amsterdam theme also supports variable font families
                      which can be{' '}
                      <EuiLink href="https://css-tricks.com/getting-the-most-out-of-variable-fonts-on-google-fonts/">
                        imported from Google fonts using their new API
                      </EuiLink>
                      . Though we still recommend sticking to the Sass variable
                      names.
                    </>
                  ) : (
                    <>
                      See the{' '}
                      <Link to="/guidelines/getting-started">
                        Getting Started page
                      </Link>{' '}
                      for details on static imports.
                    </>
                  )}
                </small>
              </p>
            </EuiText>

            <EuiSpacer />

            {selectedTheme.includes('amsterdam') ? (
              <>
                <EuiRange
                  fullWidth
                  id={htmlIdGenerator()()}
                  min={300}
                  max={700}
                  step={1}
                  value={fontWeight}
                  onChange={onFontWeightChange}
                  showValue
                  aria-label="Font weight"
                  showTicks
                  ticks={euiFontWeights.map(function (name) {
                    return {
                      label: name.split('euiFontWeight').pop(),
                      value: fonts[name],
                    };
                  })}
                />

                <EuiSpacer />
                <EuiPanel color="subdued">
                  <FontWeight fontWeight={fontWeight} />
                </EuiPanel>
              </>
            ) : (
              <EuiBasicTable
                items={euiFontWeights.map(function (weight) {
                  return {
                    id: weight,
                    variable: `$${weight}`,
                    weight: fonts[weight],
                  };
                })}
                rowHeader="firstName"
                columns={[
                  {
                    field: 'variable',
                    name: 'Variable',
                    render: (variable: React.ReactNode) => (
                      <EuiCode>{variable}</EuiCode>
                    ),
                  },
                  {
                    field: 'sample',
                    name: 'Sample',
                    render: (sample, item) => (
                      <p style={{ fontWeight: item.weight }}>
                        The quick brown fox
                      </p>
                    ),
                  },
                ]}
              />
            )}
          </div>
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
