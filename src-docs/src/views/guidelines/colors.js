import React, { Component } from 'react';
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
  EuiLink,
  EuiIcon,
  EuiTitle,
  EuiCopy,
  EuiRange,
  EuiFormRow,
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
      <EuiFlexGroup responsive={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiCopy beforeMessage="Click to copy color name" textToCopy={color}>
            {(copy) => (
              <EuiIcon onClick={copy} size="xl" type="stopFilled" color={rgbToHex(lightColors[color].rgba)} />
            )}
          </EuiCopy>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="xxs">
            <h3>{color}</h3>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" color="subdued">
            <p><code>{rgbToHex(lightColors[color].rgba).toUpperCase()}</code></p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" color="subdued">
            <p>
              <code>rgb({lightColors[color].r}, {lightColors[color].g}, {lightColors[color].b})</code>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
}

export default class extends Component {
  constructor(props) {
    super(props);

    this.levels = [
      {
        min: 0,
        max: 2.8,
        color: 'danger'
      },
      {
        min: 2.8,
        max: 4.3,
        color: 'warning'
      },
      {
        min: 4.3,
        max: 7,
        color: 'success'
      }
    ];

    this.ticks = [
      {
        value: 0,
        label: <EuiBadge color="#eee">ALL</EuiBadge>
      },
      {
        value: 3,
        label: ratingAA18
      },
      {
        value: 4.5,
        label: ratingAA
      },
      {
        value: 7,
        label: ratingAAA
      }
    ];

    this.state = {
      value: '3',
    };
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  render() {
    const { value } = this.state;

    return (
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

        <EuiFlexGroup direction="column" gutterSize="s">
          {allowedColors.map(function (color, index) {
            return renderPaletteColor(color, index);
          })}
        </EuiFlexGroup>

        <EuiSpacer size="xxl" />

        <EuiText grow={false} className="guideSection__text">
          <h2>Accessible text contrast</h2>
          <p>
            <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
              WCAG specifications
            </EuiLink> defines specific contrast ratios between forground text and a background color.
            The grid below displays which color combinations pass that rating. In general you sould try to use
            a color combination that is <EuiBadge color="#333">AA</EuiBadge> or above with the exception of using
            large text.
          </p>
          <h3>Rating definitions</h3>
          <ul>
            <li>
              <EuiIcon type="checkInCircleFilled" /> : {ratingAA} {ratingAAA} Passes with a contrast of 4.5+ (7+ for AAA)
            </li>
            <li>
              <EuiIcon type="editorBold" />
              : {ratingAA18} Passes with a contrast of 3+, but only if the text is at least 18px or 14px and bold
            </li>
            <li>
              <EuiIcon type="minusInCircle" /> : Use only for disabled or inconsequential content
            </li>
          </ul>
        </EuiText>

        <EuiSpacer size="xxl" />

        <EuiFlexGroup className="eui-textCenter" justifyContent="center">
          <EuiFlexItem grow={false}>
            <EuiFormRow id="ratingsRange" label="Minimum color contrast combinations to show">
              <EuiRange
                min={0}
                max={7}
                step={.5}
                value={value}
                onChange={this.onChange}
                showTicks
                showValue
                levels={this.levels}
                ticks={this.ticks}
                valueAppend="+"
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xxl" />

        <EuiFlexGrid columns={3}>
          {allowedColors.map(function (color, index) {
            return (
              <EuiFlexItem key={index}>
                <EuiText size="xs">
                  <h3>{color}</h3>
                  {allowedColors.map(function (color2, index) {
                    const contrast = (
                      calculateContrast(
                        [lightColors[color].r, lightColors[color].g, lightColors[color].b],
                        [lightColors[color2].r, lightColors[color2].g, lightColors[color2].b],
                      )
                    );

                    if (contrast < value) {
                      return;
                    }

                    let contrastRating;
                    let contrastRatingBadge;
                    if (contrast >= 7) {
                      contrastRating = (<EuiIcon type="checkInCircleFilled" />);
                      contrastRatingBadge = ratingAAA;
                    } else if (contrast >= 4.5) {
                      contrastRating = (<EuiIcon type="checkInCircleFilled" />);
                      contrastRatingBadge = ratingAA;
                    } else if (contrast >= 3) {
                      contrastRating = (<EuiIcon type="editorBold" />);
                      contrastRatingBadge = ratingAA18;
                    } else if (color2.includes('Shade') && contrast >= 2) {
                      contrastRating = (<EuiIcon type="minusInCircle" />);
                    } else {
                      contrastRating = (<EuiIcon type="cross" />);
                    }

                    const tooltipContent = (
                      <div>{contrastRatingBadge} Contrast is {contrast.toFixed(1)}</div>
                    );
                    const textToCopy = (
                      `background-color: $${color};
color: $${color2};`
                    );

                    return (
                      <EuiCopy
                        key={index}
                        anchorClassName="eui-displayBlock"
                        beforeMessage={tooltipContent}
                        textToCopy={textToCopy}
                      >
                        {(copy) => (
                          <p
                            onClick={copy}
                            style={{
                              backgroundColor: lightColors[color].rgba,
                              color: lightColors[color2].rgba,
                              padding: 6,
                              marginBottom: 2,
                              borderRadius: 4
                            }}
                          >
                            {contrastRating} &ensp; {color2}
                          </p>
                        )}
                      </EuiCopy>
                    );
                  })}
                </EuiText>
              </EuiFlexItem>
            );
          })}
        </EuiFlexGrid>

        <EuiSpacer size="xxl" />

        <EuiText grow={false} className="guideSection__text">
          <h2>Qualitative visualization palette</h2>
          <p>
            The following colors are color-blind safe and should be used in
            qualitative visualizations.
          </p>
          <p>
            For more visualization palettes and rendering services, go to
            the <EuiLink href="/#/utilities/color-palettes">Color Palettes</EuiLink> utility page.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiFlexGroup direction="column" gutterSize="s">
          {visColors.map(function (color, index) {
            return renderPaletteColor(color, index);
          })}
        </EuiFlexGroup>
      </GuidePage>
    );
  }
}
