import React, {
  Fragment,
} from 'react';
import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import { calculateContrast, rgbToHex } from '../../../../src/services';

import {
  GuidePage,
} from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiBadge,
  EuiToolTip,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiLink,
} from '../../../../src/components';

const allowedColors = [
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
  'euiColorSlightHue',
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorWarning',
  'euiColorDanger',
  'euiColorAccent',
];

const visColors = [
  'euiColorVis0',
  'euiColorVis1',
  'euiColorVis2',
  'euiColorVis3',
  'euiColorVis4',
  'euiColorVis5',
  'euiColorVis6',
  'euiColorVis7',
  'euiColorVis8',
  'euiColorVis9',
];

const ratingAAA = <EuiBadge color="#000">AAA</EuiBadge>;

const ratingAA = <EuiBadge color="#333">AA</EuiBadge>;

const ratingAA18 = <EuiBadge color="#666">AA18</EuiBadge>;

function renderPaletteColor(color, index) {
  return (
    <EuiFlexItem key={index}>
      <div style={{ background: lightColors[color].rgba, height: 24 }} />
      <div className="guidelineColor__palette">
        <EuiText size="s">
          <strong>{color}</strong>
          <EuiSpacer size="s" />
          RGB {lightColors[color].r}, {lightColors[color].g}, {lightColors[color].b}<br/>
          HEX {rgbToHex(lightColors[color].rgba).toUpperCase()}
        </EuiText>
      </div>
    </EuiFlexItem>
  );
}

export default() => (
  <GuidePage title="Color guidelines">

    <EuiSpacer size="xl" />

    <EuiText grow={false} className="guideSection__text">
      <h2>Core palette</h2>
      <p>
        Elastic UI builds with a very limited palette. We use a core set of three colors,
        combined with a green / orange / red qualitative set of three, and finally combine
        those against a six-color grayscale. Variation behond these colors is minimal and
        always dont with math manipulation against the original set.
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGrid columns={3}>
      {allowedColors.map(function (color, index) {
        return renderPaletteColor(color, index);
      })}
    </EuiFlexGrid>

    <EuiSpacer size="xxl" />

    <EuiText grow={false} className="guideSection__text">
      <h2>Qualitative visualization palette</h2>
      <p>
        The following colors are color-blind safe and should be used in
        qualitative visualizations.
      </p>
    </EuiText>


    <EuiSpacer />

    <EuiFlexGrid columns={3}>
      {visColors.map(function (color, index) {
        return renderPaletteColor(color, index);
      })}
    </EuiFlexGrid>


    <EuiSpacer size="xxl" />

    <EuiText grow={false} className="guideSection__text">
      <h2>Accessible text contrast</h2>
      <p>
        <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
          WCAG specifications
        </EuiLink> defines specific contrast ratios between forground text and a background color.
        The grid below displays which color combinations pass that rating. In general you sould try to use
        a color combination that is <EuiBadge color="#333">AA</EuiBadge> or above except when using
        large text.
      </p>
      <h3>Rating definitions</h3>
      <ul>
        <li>
          {ratingAAA} Passes with a contrast of 7+
        </li>
        <li>
          <EuiBadge color="#333">AA</EuiBadge>{' '}
          {ratingAA} Passes with a contrast of 4.5+
        </li>
        <li>
          <EuiBadge color="#666">AA18</EuiBadge>{' '}
          {ratingAA18} Passes with a contrast of 3+, but only if the text displayed is 18px or larger
        </li>
      </ul>
    </EuiText>

    <EuiSpacer size="xxl" />

    <div>
      {allowedColors.map(function (color, index) {
        return (
          <Fragment key={index}>
            <EuiFlexGroup gutterSize="none">
              {allowedColors.map(function (color2, index) {
                const contrast = (
                  calculateContrast(
                    [lightColors[color].r, lightColors[color].g, lightColors[color].b],
                    [lightColors[color2].r, lightColors[color2].g, lightColors[color2].b],
                  )
                );

                let contrastRating;
                if (contrast > 7) {
                  contrastRating = (
                    <div>
                      <EuiSpacer size="xs" />
                      {ratingAAA}
                    </div>
                  );
                } else if (contrast > 4.4) {
                  contrastRating = (
                    <div>
                      <EuiSpacer size="xs" />
                      {ratingAA}
                    </div>
                  );
                } else if (contrast >= 2.9) {
                  contrastRating = (
                    <div>
                      <EuiSpacer size="xs" />
                      {ratingAA18}
                    </div>
                  );
                }

                return (
                  <EuiFlexItem className="guidelineColor__test" key={index}>
                    <EuiToolTip
                      title={`Contrast is ${contrast.toFixed(1)}`}
                      content={
                        <EuiDescriptionList>
                          <EuiDescriptionListTitle>
                            Text
                          </EuiDescriptionListTitle>
                          <EuiDescriptionListDescription>
                            <EuiFlexGroup alignItems="center" gutterSize="s">
                              <EuiFlexItem grow={false}>
                                <div className="guidelineColor__swatch" style={{ background: lightColors[color2].rgba }} />
                              </EuiFlexItem>
                              <EuiFlexItem grow={false} style={{ color: 'white' }}>
                                {color2}
                              </EuiFlexItem>
                            </EuiFlexGroup>
                          </EuiDescriptionListDescription>
                          <EuiDescriptionListTitle>
                            Background
                          </EuiDescriptionListTitle>
                          <EuiDescriptionListDescription>
                            <EuiFlexGroup alignItems="center" gutterSize="s">
                              <EuiFlexItem grow={false}>
                                <div className="guidelineColor__swatch" style={{ background: lightColors[color].rgba }} />
                              </EuiFlexItem>
                              <EuiFlexItem grow={false} style={{ color: 'white' }}>
                                {color}
                              </EuiFlexItem>
                            </EuiFlexGroup>
                          </EuiDescriptionListDescription>
                        </EuiDescriptionList>
                      }
                    >
                      <div>
                        <div
                          className="guidelineColor__stripe"
                          style={{
                            color: lightColors[color2].rgba, backgroundColor: lightColors[color].rgba
                          }}
                        >
                          <div>Text</div>
                        </div>
                        {contrastRating}
                      </div>
                    </EuiToolTip>
                  </EuiFlexItem>
                );
              })}
            </EuiFlexGroup>
            <EuiSpacer />
          </Fragment>
        );
      })}
    </div>
  </GuidePage>
);
