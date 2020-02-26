import React, { Component } from 'react';
import { Link } from 'react-router';

import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss';
import { calculateContrast, rgbToHex } from '../../../../src/services';

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
  EuiCode,
  EuiSwitch,
  EuiCallOut,
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

const textVariants = [
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
  'euiColorPrimaryText',
  'euiColorSecondaryText',
  'euiColorWarningText',
  'euiColorDangerText',
  'euiColorAccentText',
];

const ratingAAA = <EuiBadge color="#000">AAA</EuiBadge>;

const ratingAA = <EuiBadge color="#333">AA</EuiBadge>;

const ratingAA18 = <EuiBadge color="#666">AA18</EuiBadge>;

function renderPaletteColor(palette, color, index, key) {
  const hex = key ? palette[color][key] : palette[color];
  const name = key && key !== 'graphic' ? `${color}_${key}` : color;

  return (
    <EuiFlexItem key={index} grow={false}>
      <EuiFlexGroup responsive={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiCopy beforeMessage="Click to copy color name" textToCopy={name}>
            {copy => (
              <EuiIcon
                onClick={copy}
                size="xl"
                type="stopFilled"
                color={rgbToHex(hex.rgba)}
              />
            )}
          </EuiCopy>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="xxs">
            <h3>{name}</h3>
          </EuiTitle>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" color="subdued">
            <p>
              <code>{rgbToHex(hex.rgba).toUpperCase()}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" color="subdued">
            <p>
              <code>
                rgb({hex.r}, {hex.g}, {hex.b})
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
      behindTextVariant: false,
      showTextVariants: true,
    };
  }

  onChange = e => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  onBehindTextVariantChange = e => {
    this.setState({
      behindTextVariant: e.target.checked,
    });
  };

  onTextVariantChange = e => {
    this.setState({
      showTextVariants: e.target.checked,
    });
  };

  render() {
    const { value, behindTextVariant, showTextVariants } = this.state;
    const { selectedTheme } = this.props;

    let palette;
    switch (selectedTheme) {
      case 'amsterdam-dark':
        palette = darkAmsterdamColors;
        break;
      case 'amsterdam-light':
        palette = { ...lightColors, ...lightAmsterdamColors };
        break;
      case 'dark':
        palette = darkColors;
        break;
      default:
        palette = lightColors;
        break;
    }

    // Vis colors are the same for all palettes
    const visColors = lightColors.euiPaletteColorBlind;
    const visColorKeys = Object.keys(lightColors.euiPaletteColorBlind);
    const colorsForContrast = showTextVariants ? textVariants : allowedColors;

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
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="Amsterdam changes in contrast levels">
            <p>
              The Amsterdam theme introduces a more vibrant core color palette.
              In order to maintain a WCAG contrast of at least 4.5 you should
              use the text variants of the core color variables such as&nbsp;
              <EuiCode>$euiColorSecondaryText</EuiCode>. These new variables
              have also been added to the default EUI theme and can be used in
              components that render text.
            </p>
            <EuiSwitch
              label="Show text variant"
              checked={showTextVariants}
              onChange={this.onTextVariantChange}
            />
          </EuiCallOut>
          <h3>Rating definitions</h3>
          <ul>
            <li>
              <EuiIcon type="checkInCircleFilled" /> : {ratingAA} {ratingAAA}{' '}
              Passes with a contrast of 4.5+ (7+ for AAA)
            </li>
            <li>
              <EuiIcon type="editorBold" />: {ratingAA18} Passes with a contrast
              of 3+, but only for graphics or if the text is at least 18px, or
              14px and bold
            </li>
            <li>
              <EuiIcon type="minusInCircle" /> : Use only for disabled or
              inconsequential content
            </li>
          </ul>
        </EuiText>

        <EuiSpacer size="xxl" />

        <EuiFlexGroup className="eui-textCenter" justifyContent="center">
          <EuiFlexItem style={{ maxWidth: 400 }}>
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
                  {colorsForContrast.map(function(color2, index) {
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
            categorically seried visualizations and graphics. They are meant to
            be contrasted against the value of{' '}
            <EuiCode>euiColorEmptyShade</EuiCode> for the current theme.
          </p>
          <p>
            For more visualization palettes and rendering services, go to the{' '}
            <Link to="/utilities/color-palettes">Color Palettes</Link> utility
            page.
          </p>
          <p>
            When using the palette as a background for text (i.e. badges), use
            the <EuiCode>_behindText</EuiCode> variant. It is a brightened
            version of the base palette to create better contrast with text.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiSwitch
          label={
            <span>
              Show <EuiCode>_behindText</EuiCode> variant
            </span>
          }
          checked={behindTextVariant}
          onChange={this.onBehindTextVariantChange}
        />

        <EuiSpacer />

        <EuiFlexGroup direction="column" gutterSize="s">
          {visColorKeys.map(function(color, index) {
            return renderPaletteColor(
              visColors,
              color,
              index,
              behindTextVariant ? 'behindText' : 'graphic'
            );
          })}
        </EuiFlexGroup>
      </GuidePage>
    );
  }
}
