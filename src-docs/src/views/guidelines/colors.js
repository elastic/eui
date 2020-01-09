import React, { Component } from 'react';
import chroma from 'chroma-js';

import { Link } from 'react-router';

import lightColorsJSON from '../../../../dist/eui_theme_light.json';

import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss';
import {
  calculateContrast,
  rgbToHex,
  isColorDark,
} from '../../../../src/services';
import { createNonTextContrast } from '../../../../src/services/color/luminance_and_contrast';

import { GuidePage } from '../../components';

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
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorWarning',
  'euiColorDanger',
  'euiColorAccent',
];

const ratingAAA = <EuiBadge color="#000">AAA</EuiBadge>;

const ratingAA = <EuiBadge color="#333">AA</EuiBadge>;

const ratingAA18 = <EuiBadge color="#666">AA18</EuiBadge>;

function renderPaletteColor(palette, color, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiFlexGroup responsive={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiCopy beforeMessage="Click to copy color name" textToCopy={color}>
            {copy => (
              <EuiIcon
                onClick={copy}
                size="xl"
                type="stopFilled"
                color={rgbToHex(palette[color].rgba)}
              />
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
            <p>
              <code>{rgbToHex(palette[color].rgba).toUpperCase()}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" color="subdued">
            <p>
              <code>
                rgb({palette[color].r}, {palette[color].g}, {palette[color].b})
              </code>
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
        color: 'danger',
      },
      {
        min: 2.8,
        max: 4.3,
        color: 'warning',
      },
      {
        min: 4.3,
        max: 7,
        color: 'success',
      },
    ];

    this.ticks = [
      {
        value: 0,
        label: <EuiBadge color="#eee">ALL</EuiBadge>,
      },
      {
        value: 3,
        label: ratingAA18,
      },
      {
        value: 4.5,
        label: ratingAA,
      },
      {
        value: 7,
        label: ratingAAA,
      },
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
    const { selectedTheme } = this.props;

    let palette;
    if (selectedTheme === 'amsterdam-dark') {
      palette = darkAmsterdamColors;
    } else if (selectedTheme === 'amsterdam-light') {
      palette = { ...lightColors, ...lightAmsterdamColors };
    } else if (selectedTheme === 'dark') {
      palette = darkColors;
    } else {
      palette = lightColors;
    }

    // Vis colors are the same for all palettes
    const visColors = lightColors.euiColorVisColors;
    const visColorKeys = Object.keys(lightColors.euiColorVisColors);

    function getContrastRatings(color1, color2) {
      if (color1.indexOf('Shade') === -1 && color2.indexOf('Shade') === -1) {
        // Exit out, i.e. don't render, if non-shade top of non-shade
        return;
      }

      const contrast = calculateContrast(
        [palette[color1].r, palette[color1].g, palette[color1].b],
        [palette[color2].r, palette[color2].g, palette[color2].b]
      );

      let contrastRating;
      let contrastRatingBadge;
      if (contrast >= 7) {
        contrastRating = <EuiIcon type="checkInCircleFilled" />;
        contrastRatingBadge = ratingAAA;
      } else if (contrast >= 4.5) {
        contrastRating = <EuiIcon type="checkInCircleFilled" />;
        contrastRatingBadge = ratingAA;
      } else if (contrast >= 3) {
        contrastRating = <EuiIcon type="editorBold" />;
        contrastRatingBadge = ratingAA18;
      } else if (color2.includes('Shade') && contrast >= 2) {
        contrastRating = <EuiIcon type="minusInCircle" />;
      } else {
        contrastRating = <EuiIcon type="cross" />;
      }

      return { contrast, contrastRating, contrastRatingBadge };
    }

    return (
      <GuidePage title="Color guidelines">
        <EuiSpacer size="xl" />

        <EuiText grow={false} className="guideSection__text">
          <h2>Core palette</h2>
          <p>
            Elastic UI builds with a very limited palette. We use a core set of
            three colors, combined with a green / orange / red qualitative set
            of three, and finally combine those against a six-color grayscale.
            Variation beyond these colors is minimal and always done with math
            manipulation against the original set.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiFlexGroup direction="column" gutterSize="s">
          {allowedColors.map(function(color, index) {
            return renderPaletteColor(palette, color, index);
          })}
        </EuiFlexGroup>

        <EuiSpacer size="xxl" />

        <EuiText grow={false} className="guideSection__text">
          <h2>Accessible text contrast</h2>
          <p>
            <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
              WCAG specifications
            </EuiLink>{' '}
            defines specific contrast ratios between foreground text and a
            background color. The grid below displays which color combinations
            pass that rating. In general you should try to use a color
            combination that is <EuiBadge color="#333">AA</EuiBadge> or above
            with the exception of using large text.
          </p>
          <h3>Rating definitions</h3>
          <ul>
            <li>
              <EuiIcon type="checkInCircleFilled" /> : {ratingAA} {ratingAAA}{' '}
              Passes with a contrast of 4.5+ (7+ for AAA)
            </li>
            <li>
              <EuiIcon type="editorBold" />: {ratingAA18} Passes with a contrast
              of 3+, but only if the text is at least 18px or 14px and bold
            </li>
            <li>
              <EuiIcon type="minusInCircle" /> : Use only for disabled or
              inconsequential content
            </li>
          </ul>
        </EuiText>

        <EuiSpacer size="xxl" />

        <EuiFlexGroup className="eui-textCenter" justifyContent="center">
          <EuiFlexItem grow={false}>
            <EuiFormRow
              id="ratingsRange"
              label="Minimum color contrast combinations to show">
              <EuiRange
                min={0}
                max={7}
                step={0.5}
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
          {allowedColors.map(function(color, index) {
            return (
              <EuiFlexItem key={index}>
                <EuiText size="xs">
                  <h3>{color}</h3>
                  {allowedColors.map(function(color2, index) {
                    const contrastRatings = getContrastRatings(color, color2);

                    if (!contrastRatings || contrastRatings.contrast < value) {
                      return;
                    }

                    const {
                      contrast,
                      contrastRating,
                      contrastRatingBadge,
                    } = getContrastRatings(color, color2);

                    const tooltipContent = (
                      <div>
                        {contrastRatingBadge} Contrast is {contrast.toFixed(1)}
                      </div>
                    );
                    const textToCopy = `background-color: $${color};
color: $${color2};`;

                    return (
                      <EuiCopy
                        key={index}
                        anchorClassName="eui-displayBlock"
                        beforeMessage={tooltipContent}
                        textToCopy={textToCopy}>
                        {copy => (
                          <button
                            type="button"
                            onClick={copy}
                            className="eui-fullWidth eui-textLeft"
                            style={{
                              backgroundColor: palette[color].rgba,
                              color: palette[color2].rgba,
                              padding: 6,
                              marginBottom: 2,
                              borderRadius: 4,
                            }}>
                            {contrastRating} &ensp; {color2}
                          </button>
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
          <h2>Categorical visualization palette</h2>
          <p>
            The following colors are color-blind safe and should be used in
            categorically seried visualizations.
          </p>
          <p>
            For more visualization palettes and rendering services, go to the{' '}
            <Link to="/utilities/color-palettes">Color Palettes</Link> utility
            page.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiFlexGroup direction="column" gutterSize="s">
          {visColorKeys.map(function(color, index) {
            return renderPaletteColor(visColors, color, index);
          })}
        </EuiFlexGroup>

        <EuiSpacer />

        <EuiFlexGrid columns={3}>
          {visColorKeys.map(function(color, index) {
            const foreground = visColors[color].rgba;
            const background = palette[allowedColors[0]].rgba;
            return (
              <EuiFlexItem key={index}>
                <EuiText size="xs">
                  <h3>
                    {chroma.contrast(foreground, background).toFixed(1)} {color}
                  </h3>
                  {visPaletteContrast(foreground, background, index, color)}
                </EuiText>
              </EuiFlexItem>
            );
          })}
        </EuiFlexGrid>
      </GuidePage>
    );
  }
}

function visPaletteContrast(foreground, background, index, name) {
  const initialContrast = chroma.contrast(foreground, background);
  const textColor = isColorDark(foreground) ? '#FFFFFF' : '#000000';

  const betterForeground = createNonTextContrast(background, foreground);
  const betterContrast = chroma.contrast(betterForeground, background);
  const betterTextColor = isColorDark(betterForeground) ? '#FFFFFF' : '#000000';

  return (
    <>
      <span
        className="eui-fullWidth eui-textLeft"
        style={{
          backgroundColor: chroma(foreground).hex(),
          color: textColor,
          padding: 6,
          marginBottom: 2,
          borderRadius: 4,
        }}>
        {/* {initialContrast.toFixed(1)} &ensp; Base: {chroma(foreground).hex()} */}
      </span>
      {initialContrast < 3 && (
        <span
          className="eui-fullWidth eui-textLeft"
          style={{
            backgroundColor: chroma(betterForeground).hex(),
            color: betterTextColor,
            padding: 6,
            marginBottom: 2,
            borderRadius: 4,
          }}>
          {betterContrast.toFixed(1)} &ensp; {'better'}
        </span>
      )}
      <EuiBadge color={foreground}>{name}</EuiBadge>
      <EuiBadge
        color={chroma(foreground)
          .brighten(0.5)
          .hex()}>
        JS:{' '}
        {chroma(foreground)
          .brighten(0.5)
          .hex()}
      </EuiBadge>
      <EuiBadge color={lightColorsJSON.euiColorVisColorsBehindText[name]}>
        CSS: {lightColorsJSON.euiColorVisColorsBehindText[name]}
      </EuiBadge>
    </>
  );
}
