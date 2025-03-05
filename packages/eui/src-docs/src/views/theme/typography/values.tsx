import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

// @ts-ignore Importing JSON
import themeVars from '../_json/eui_theme_amsterdam_light.json'; // Only grabbing font weight vars, so color mode is irrelevant

import { GuideSection } from '../../../components/guide_section/guide_section';

import {
  useEuiTheme,
  htmlIdGenerator,
  throttle,
  EuiText,
  EuiLink,
  EuiRange,
  EuiCode,
} from '../../../../../src';

import { ThemeExample } from '../_components/_theme_example';
import { ThemeNotice } from '../_components/_theme_notice';
import { ThemeContext } from '../../../components/with_theme';

import {
  FontJS,
  FontScaleJS,
  FontScaleValuesJS,
  FontWeightJS,
  FontWeightValuesJS,
} from './_typography_js';
import {
  FontSass,
  FontWeightSass,
  euiFontWeights,
  FontScaleSass,
  FontScaleValuesSass,
  FontWeightValuesSass,
  FontValuesSass,
} from './_typography_sass';

export const typographyInfo = {
  title: 'Typography',
  notice: <ThemeNotice />,
  showThemeLanguageToggle: true,
  description: (
    <>
      <p>
        For most of your usages we recommend using{' '}
        <Link to="/display/text">
          <strong>EuiText</strong>
        </Link>{' '}
        or{' '}
        <Link to="/display/title">
          <strong>EuiTitle</strong>
        </Link>{' '}
        components directly <strong>instead</strong> of these theme tokens. Or
        head to the{' '}
        <Link to="/theming/typography/utilities">text utilities page</Link> for
        helper classes and functions.
      </p>
    </>
  ),
};

// This array is used inside routes.js to create the sidenav sub-sections
export const typographySections = [
  { title: 'Font scale', id: 'font-scale' },
  { title: 'Font weight', id: 'font-weight' },
  { title: 'Font settings', id: 'font-settings' },
];

export default () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
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
      return <FontScaleSass />;
    } else {
      return <FontScaleJS />;
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
    <>
      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${typographySections[0].id}`}
          >{`${typographySections[0].title}`}</h2>
          <p>
            The typographic scale is loosely based on the{' '}
            <EuiLink href="https://type-scale.com/?size=16&scale=1.250&text=A%20Visual%20Type%20Scale&font=Inter&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.75&backgroundcolor=%23ffffff&fontcolor=%23000000&preview=false">
              Major Third (1.250) typographic scale
            </EuiLink>
            .
          </p>
          <p>
            While these functions and hooks exist to get precise font sizing and
            associated line-height, we still highly recommend using the{' '}
            <Link to="/display/text">
              <strong>EuiText</strong>
            </Link>{' '}
            and{' '}
            <Link to="/display/title">
              <strong>EuiTitle</strong>
            </Link>{' '}
            components as wrappers of your content instead.
          </p>
        </EuiText>

        {scaleContent}
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <FontScaleValuesSass /> : <FontScaleValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${typographySections[1].id}`}
          >{`${typographySections[1].title}`}</h2>
          <p>
            EUI establishes a set of 5 font-weights based on their numeric
            keywords values. When importing the font-family from your service of
            choice, ensure that you have all 5 weights contained in your import.
            See the{' '}
            <Link to="/guidelines/getting-started">Getting Started page</Link>{' '}
            for details on importing fonts.
          </p>
        </EuiText>

        {weightContent}

        <ThemeExample
          title="Variable fonts"
          type={null}
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
                ticks={Object.entries(euiTheme.font.weight).map(
                  ([name, value]) => ({
                    label: name,
                    value: Number(value),
                  })
                )}
                css={css`
                  .euiRangeTick {
                    text-transform: capitalize;
                  }
                `}
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
          snippetLanguage={showSass ? 'scss' : 'emotion'}
        />
      </GuideSection>

      <GuideSection color="transparent">
        {showSass ? <FontWeightValuesSass /> : <FontWeightValuesJS />}
      </GuideSection>

      <GuideSection color="subdued">
        <EuiText grow={false}>
          <h2
            id={`${typographySections[2].id}`}
          >{`${typographySections[2].title}`}</h2>
        </EuiText>

        {baseContent}
      </GuideSection>

      {showSass && (
        <GuideSection color="transparent">
          <FontValuesSass />
        </GuideSection>
      )}
    </>
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
  const weight = euiFontWeights.find(
    (key) => themeVars[key] === Number(fontWeight)
  );
  return `font-weight: ${weight ? `$${weight}` : fontWeight};`;
};
