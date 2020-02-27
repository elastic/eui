import React, { Component } from 'react';
import { Link } from 'react-router';

import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import lightAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
import darkAmsterdamColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss';
import { rgbToHex } from '../../../../src/services';

import { GuidePage } from '../../components';
import { scrollToSelector } from '../../components/guide_page/guide_page_chrome';

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
  EuiToolTip,
} from '../../../../src/components';
import { ColorsContrastItem } from './_colors_contrast_item';

const allowedColors = [
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorAccent',
  'euiColorWarning',
  'euiColorDanger',
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
];

const textVariants = [
  'euiColorPrimaryText',
  'euiColorSecondaryText',
  'euiColorWarningText',
  'euiColorDangerText',
  'euiColorAccentText',
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
];

export const ratingAAA = (
  <EuiBadge iconType="checkInCircleFilled" color="#000">
    AAA
  </EuiBadge>
);
export const ratingAA = (
  <EuiBadge iconType="checkInCircleFilled" color="#333">
    AA
  </EuiBadge>
);
export const ratingAA18 = (
  <EuiBadge iconType="invert" color="#666">
    AA18
  </EuiBadge>
);
export const ratingAll = <EuiBadge color="#eee">ALL</EuiBadge>;

function renderPaletteColor(palette, color, index, key) {
  const hex = key ? palette[color][key] : palette[color];
  const name = key && key !== 'graphic' ? `${color}_${key}` : color;

  return (
    <EuiFlexItem key={index} grow={false}>
      <EuiCopy
        title={`$${color}:
        ${rgbToHex(hex.rgba).toUpperCase()}`}
        beforeMessage={
          <small>
            <kbd>Click</kbd> to copy color name
            <br />
            <kbd>Shift + Click</kbd> to scroll to section
          </small>
        }
        afterMessage={<small>Copied!</small>}
        textToCopy={name}>
        {copy => (
          <EuiIcon
            onClick={e => {
              e.shiftKey ? scrollToSelector(`#${color}`) : copy();
            }}
            size="xxl"
            type="stopFilled"
            color={rgbToHex(hex.rgba)}
          />
        )}
      </EuiCopy>
    </EuiFlexItem>
  );
}

function renderVizPaletteColor(palette, color, index, key) {
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
        <EuiFlexItem grow={false}>
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
      </EuiFlexGroup>
    </EuiFlexItem>
  );
}

function getHexValueFromColorName(palette, colorName, key) {
  const hex = key ? palette[colorName][key] : palette[colorName];
  return rgbToHex(hex.rgba).toUpperCase();
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
        label: (
          <EuiToolTip
            position="bottom"
            content={
              <ul>
                <li>
                  <EuiIcon type="minusInCircle" /> Contrast is between 2 and 3.
                  Use only for disabled or inconsequential content.
                </li>
                <li>
                  <EuiIcon type="cross" /> Contrast is less than 2. Do not use.
                </li>
              </ul>
            }>
            {ratingAll}
          </EuiToolTip>
        ),
      },
      {
        value: 3,
        label: (
          <EuiToolTip
            position="bottom"
            content={
              <p>
                <EuiIcon type="invert" /> Passes with a contrast of 3+, but only
                for graphics or if the text is at least 18px, or 14px and bold
              </p>
            }>
            {ratingAA18}
          </EuiToolTip>
        ),
      },
      {
        value: 4.5,
        label: (
          <EuiToolTip
            position="bottom"
            content={
              <p>
                <EuiIcon type="checkInCircleFilled" /> Passes with a contrast of
                4.5+
              </p>
            }>
            {ratingAA}
          </EuiToolTip>
        ),
      },
      {
        value: 7,
        label: (
          <EuiToolTip
            position="bottom"
            content={
              <p>
                <EuiIcon type="checkInCircleFilled" /> Passes with a contrast of
                7+
              </p>
            }>
            {ratingAAA}
          </EuiToolTip>
        ),
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
    const { value, showTextVariants } = this.state;
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

    const colorsForContrast = showTextVariants ? textVariants : allowedColors;

    // Vis colors are the same for all palettes
    const visColors = lightColors.euiPaletteColorBlind;
    const visColorKeys = Object.keys(lightColors.euiPaletteColorBlind);

    return (
      <GuidePage title="Color guidelines">
        <EuiText grow={false} className="guideSection__text">
          <h2>Elastic UI builds with a very limited palette.</h2>
          <p>
            We use a core set of three colors, combined with a green / orange /
            red qualitative set of three, and finally combine those against a
            six-color grayscale. Variation beyond these colors is minimal and
            always done with math manipulation against the original set.
          </p>
        </EuiText>

        <EuiSpacer />

        <EuiFlexGroup className="guideSection__shadedBox" gutterSize="s" wrap>
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
            background color. The grids below display which color combinations
            pass that rating. In general you should try to use a color
            combination that is {ratingAA} or above with the exception of using
            large text.
          </p>
        </EuiText>

        <EuiSpacer size="m" />

        <EuiCallOut
          color="warning"
          iconType="accessibility"
          title="Amsterdam changes in contrast levels">
          <p>
            The Amsterdam theme introduces a more vibrant core color palette. In
            order to maintain a WCAG contrast of at least 4.5 you should use the
            text variants of the core color variables such as&nbsp;
            <EuiCode>$euiColorSecondaryText</EuiCode>. These new variables have
            also been added to the default EUI theme and can be used in
            components that render text.
          </p>
          <EuiSwitch
            label="Show text variant"
            checked={showTextVariants}
            onChange={this.onTextVariantChange}
          />
        </EuiCallOut>

        <EuiSpacer size="xxl" />

        <EuiFlexGroup
          className="guideSection__shadedBox"
          justifyContent="center">
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

        {allowedColors.map(function(color) {
          const hex = getHexValueFromColorName(palette, color);
          return (
            <React.Fragment key={color}>
              <EuiSpacer size="xxl" />

              <EuiTitle size="xs">
                <h3 id={color}>
                  <EuiIcon
                    aria-hidden="true"
                    type="stopFilled"
                    size="xxl"
                    color={hex}
                  />{' '}
                  &ensp;
                  {color}: <EuiCode>{hex}</EuiCode>
                </h3>
              </EuiTitle>

              <EuiSpacer />

              <EuiText grow={false}>
                <p>
                  Used as the background color of primary page content. While
                  full white in light mode, it is not full black in dark mode.
                </p>
                <p>
                  If you need a color that is full white in both light and dark
                  modes, use <EuiCode>euiColorGhost</EuiCode>.
                </p>
              </EuiText>

              <EuiSpacer />

              <EuiText size="xs">
                <EuiFlexGrid
                  columns={2}
                  className="guideSection__shadedBox"
                  direction="column"
                  gutterSize="s">
                  {showTextVariants && color.indexOf('Shade') === -1 && (
                    <ColorsContrastItem
                      foreground={`${color}Text`}
                      background={'euiPageBackgroundColor'}
                      minimumContrast={value}
                    />
                  )}

                  {colorsForContrast.map(color2 => {
                    if (
                      color2.indexOf('Shade') === -1 &&
                      color.indexOf('Shade') === -1
                    ) {
                      // i.e. don't render, if non-shade top of non-shade
                      return;
                    }
                    return (
                      <ColorsContrastItem
                        foreground={color2}
                        background={color}
                        key={color2}
                        minimumContrast={value}
                      />
                    );
                  })}
                </EuiFlexGrid>
              </EuiText>
              <EuiSpacer size="xxl" />
            </React.Fragment>
          );
        })}

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

        <EuiSpacer />

        <EuiFlexGrid columns={2}>
          <EuiFlexItem>
            <EuiFlexGroup direction="column" gutterSize="s">
              {visColorKeys.map(function(color, index) {
                return renderVizPaletteColor(
                  visColors,
                  color,
                  index,
                  'graphic'
                );
              })}
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup direction="column" gutterSize="s">
              {visColorKeys.map(function(color, index) {
                return renderVizPaletteColor(
                  visColors,
                  color,
                  index,
                  'behindText'
                );
              })}
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGrid>
      </GuidePage>
    );
  }
}
