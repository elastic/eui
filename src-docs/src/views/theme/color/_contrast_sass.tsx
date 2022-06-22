import chroma from 'chroma-js';
import React, { FunctionComponent } from 'react';

import {
  EuiText,
  EuiFlexGrid,
  EuiCopy,
  EuiFlexItem,
  EuiPanel,
  EuiHorizontalRule,
  EuiListGroupItem,
  useEuiTheme,
} from '../../../../../src';

// @ts-ignore Importing from JS
import { useJsonVars } from '../_json/_get_json_vars';

export const coreColors = [
  'euiColorPrimary',
  'euiColorAccent',
  'euiColorSuccess',
  'euiColorWarning',
  'euiColorDanger',
];

export const coreTextVariants = [
  'euiColorPrimaryText',
  'euiColorAccentText',
  'euiColorSuccessText',
  'euiColorWarningText',
  'euiColorDangerText',
];

export const grayColors = [
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
];

export const textOnly = [
  'euiTextColor',
  'euiTextSubduedColor',
  'euiTitleColor',
];

export const textColors = [...textOnly, 'euiColorGhost', 'euiColorInk'];

export const allowedColors = [...coreColors, ...grayColors];

export const textVariants = [...coreTextVariants, ...textColors];

import { getContrastRatings } from './_contrast_utilities';

type ColorSection = {
  color: string;
  minimumContrast: string | number;
  showTextVariants: boolean;
  matchPanelColor?: boolean;
};

export const ColorSectionSass: FunctionComponent<ColorSection> = ({
  color,
  minimumContrast,
  showTextVariants,
  matchPanelColor,
}) => {
  const palette = useJsonVars();
  const colorsForContrast = showTextVariants ? textVariants : allowedColors;

  function colorIsCore(color: string) {
    return coreColors.includes(color) || coreTextVariants.includes(color);
  }

  return (
    <EuiPanel
      color="transparent"
      hasBorder={false}
      paddingSize={matchPanelColor ? 'l' : 'none'}
      style={{ background: matchPanelColor ? palette[color] : undefined }}
    >
      <EuiText size="xs">
        <EuiFlexGrid columns={2} direction="column" gutterSize="s">
          {showTextVariants && colorIsCore(color) && (
            <ColorsContrastItem
              foreground={`${color}Text`}
              background={'euiPageBackgroundColor'}
              minimumContrast={minimumContrast}
            />
          )}
          {colorsForContrast.map((color2) => {
            if (colorIsCore(color) && colorIsCore(color2)) {
              // i.e. don't render if both are core colors
              return;
            }
            return (
              <ColorsContrastItem
                foreground={color2}
                background={color}
                key={color2}
                minimumContrast={minimumContrast}
              />
            );
          })}
        </EuiFlexGrid>
      </EuiText>
    </EuiPanel>
  );
};

type ColorsContrastItem = {
  foreground: string;
  background: string;
  minimumContrast: string | number;
};

const ColorsContrastItem: FunctionComponent<ColorsContrastItem> = ({
  foreground,
  background,
  minimumContrast,
}) => {
  const { euiTheme } = useEuiTheme();
  const palette = useJsonVars();
  const backgroundColor = palette[background];
  const foregroundColor = palette[foreground];
  const backgroundIsBody = background === 'euiPageBackgroundColor';

  const contrast = chroma.contrast(backgroundColor, foregroundColor);

  if (!contrast || contrast < minimumContrast) {
    return <></>;
  }

  const { contrastRating, contrastRatingBadge } = getContrastRatings(
    contrast,
    foreground
  );

  const contrastIsAcceptableToCopy = contrast >= 3;
  const textToCopy = backgroundIsBody
    ? `color: $${foreground};`
    : `background-color: $${background};
color: $${foreground};`;
  const beforeMessage = contrastIsAcceptableToCopy ? (
    <small>
      <code>{`$${foreground} / $${background}`}</code>
      <EuiHorizontalRule margin="xs" />
      <kbd>Click</kbd> to copy SASS configuration
    </small>
  ) : (
    <small>
      Cannot copy configuration because the contrast is not acceptable
    </small>
  );

  return (
    <EuiFlexItem className="eui-textCenter">
      <EuiCopy
        anchorClassName="eui-displayBlock"
        title={
          <span>
            {contrastRatingBadge} Contrast is {contrast.toFixed(1)}
          </span>
        }
        beforeMessage={beforeMessage}
        afterMessage={<small>Copied!</small>}
        textToCopy={textToCopy}
      >
        {(copy) => (
          <EuiListGroupItem
            iconType={contrastRating}
            size="s"
            onClick={contrastIsAcceptableToCopy ? copy : undefined}
            aria-label={
              contrastIsAcceptableToCopy
                ? 'Click to copy Sass configurations'
                : undefined
            }
            style={{
              backgroundColor: backgroundColor,
              color: foregroundColor,
              borderRadius: euiTheme.border.radius.medium,
            }}
            label={sanitizeColorName(foreground)}
          />
        )}
      </EuiCopy>
    </EuiFlexItem>
  );
};

function sanitizeColorName(color: string) {
  const string = color.split('euiColor').pop();
  // Make sure `eui` is removed if it wasnt the full `euiColor` string
  const noEui = string?.split('eui').pop();
  // Add space between caplital letters
  return noEui?.replace(/([A-Z])/g, ' $1').trim();
}
