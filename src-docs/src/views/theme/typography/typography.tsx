import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore Importing from Sass file
import fonts from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../../src/global_styling/variables/_font_weight.scss';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components/guide_page';

import {
  useEuiTheme,
  htmlIdGenerator,
  throttle,
  EuiSpacer,
  EuiText,
  EuiLink,
  EuiRange,
  EuiCode,
  EuiCallOut,
} from '../../../../../src';

import { ThemeExample } from '../_components/_theme_example';

import { FontJS, FontWeightJS } from './_typography_js';
import {
  FontSass,
  FontWeightSass,
  euiFontWeights,
  FontScaleSass,
} from './_typography_sass';
import { ThemeNotice } from '../_components/_theme_notice';
import { ThemeContext } from '../../../components/with_theme';

// This array is used inside routes.js to create the sidenav sub-sections
export const typographySections = [
  { title: 'Font settings', id: 'font-settings' },
  { title: 'Font weight', id: 'font-weight' },
  { title: 'Font scale', id: 'font-scale' },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const legacyTheme = !themeContext.theme.includes('amsterdam');
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const [fontWeight, setFontWeight] = useState(400);
  const onFontWeightChange = throttle((e) => {
    setFontWeight(e.target.value);
  }, 25);

  const baseContent = useMemo(() => {
    if (showSass) return <FontSass />;
    return <FontJS />;
  }, [showSass]);

  const scaleContent = useMemo(() => {
    if (showSass) {
      return (
        <>
          <EuiText grow={false}>
            <h2
              id={`${typographySections[2].id}`}
            >{`${typographySections[2].title}`}</h2>
            <p>
              The typographic scale is loosely based on the{' '}
              <EuiLink href="https://type-scale.com/?size=16&scale=1.250&text=A%20Visual%20Type%20Scale&font=Inter&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.75&backgroundcolor=%23ffffff&fontcolor=%23000000&preview=false">
                Major Third (1.250) typographic scale
              </EuiLink>
              .
            </p>
          </EuiText>
          <EuiSpacer size="xl" />
          <FontScaleSass />
        </>
      );
    } else {
      return (
        <>
          <EuiText grow={false}>
            <h2
              id={`${typographySections[2].id}`}
            >{`${typographySections[2].title}`}</h2>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut title="Coming soon" />
        </>
      );
    }
  }, [showSass]);

  const weightContent = useMemo(() => {
    const description = (
      <p>
        To maintain consistency, EUI establishes the font weight patterns
        directly in the text and title components. However, we recommend using
        the theme keys instead of{' '}
        <EuiCode language="css">font-weight: bold</EuiCode> in your css to
        ensure proper rendering with the imported font family.
      </p>
    );
    if (showSass) return <FontWeightSass description={description} />;
    return <FontWeightJS description={description} />;
  }, [showSass]);

  return (
    <GuidePage
      title="Typography"
      isBeta={!showSass}
      notice={!showSass && <ThemeNotice />}
      showThemeLanguageToggle
      description={
        <>
          For most of your usages we recommend using{' '}
          <Link to="/display/text">
            <strong>EuiText</strong>
          </Link>{' '}
          or{' '}
          <Link to="/display/title">
            <strong>EuiTitle</strong>
          </Link>{' '}
          components directly <strong>instead</strong> of these theme tokens.
        </>
      }
    >
      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2
          id={`${typographySections[0].id}`}
        >{`${typographySections[0].title}`}</h2>
      </EuiText>

      <EuiSpacer size="xl" />

      {baseContent}

      <EuiSpacer size="xl" />

      <EuiText grow={false}>
        <h2
          id={`${typographySections[1].id}`}
        >{`${typographySections[1].title}`}</h2>
        <p>
          EUI establishes a set of 5 font-weights based on their numeric
          keywords values. When importing the font-family from your service of
          choice, ensure that you have all 5 weights contained in your import.
          See the{' '}
          <Link to="/guidelines/getting-started">Getting Started page</Link> for
          details on importing fonts.
        </p>
      </EuiText>

      <EuiSpacer size="xl" />

      {weightContent}

      {!legacyTheme ? (
        <>
          <ThemeExample
            title="Variable fonts"
            description={
              <>
                <p>
                  EUI also supports variable font families which can be{' '}
                  <EuiLink href="https://css-tricks.com/getting-the-most-out-of-variable-fonts-on-google-fonts/">
                    imported from Google fonts using their new API
                  </EuiLink>
                  . Though we still recommend sticking to the theme token names.
                </p>
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
              </>
            }
            example={
              <div style={{ fontWeight: fontWeight }}>The quick brown fox</div>
            }
            snippet={
              showSass
                ? findSassFontWeight({ fontWeight })
                : findJSFontWeight({ fontWeight, euiTheme })
            }
            snippetLanguage={showSass ? 'scss' : 'jsx'}
          />
        </>
      ) : undefined}

      <EuiSpacer size="xl" />
      {scaleContent}
    </GuidePage>
  );
};

const findJSFontWeight = ({
  fontWeight,
  euiTheme,
}: {
  fontWeight: number;
  euiTheme: any;
}) => {
  const weight = Object.keys(euiTheme.font.weight).find(
    (key) => euiTheme.font.weight[key] === Number(fontWeight)
  );
  return `font-weight: ${
    weight ? '${euiTheme.font.weight.' + `${weight}}` : fontWeight
  };`;
};

const findSassFontWeight = ({ fontWeight }: { fontWeight: number }) => {
  const weight = Object.keys(fonts).find(
    (key) => fonts[key] === Number(fontWeight)
  );
  return `font-weight: ${weight ? `$${weight}` : fontWeight};`;
};
