import React, { FunctionComponent } from 'react';
import chroma from 'chroma-js';

import {
  EuiText,
  EuiFlexGrid,
  EuiCopy,
  EuiFlexItem,
  useEuiTheme,
  EuiPanel,
  EuiHorizontalRule,
  EuiListGroupItem,
} from '../../../../../src';
import { _EuiThemeColorsMode } from '../../../../../src/global_styling/variables/colors';

import { getContrastRatings } from './_contrast_utilities';
import { brandKeys, brandTextKeys, shadeKeys, textKeys } from './_color_js';

const textColors = [...textKeys, 'disabledText', 'ghost', 'ink'];
const allowedColors = [...brandKeys, ...shadeKeys, 'disabled', 'ghost', 'ink'];
const textVariants = [...brandTextKeys, ...textColors];

type ColorSection = {
  color: keyof _EuiThemeColorsMode;
  colorValue?: string;
  minimumContrast: number;
  showTextVariants: boolean;
  matchPanelColor?: boolean;
  hookName?: string;
  tokenName?: string;
};

export const ColorSectionJS: FunctionComponent<ColorSection> = ({
  color,
  colorValue: _colorValue,
  minimumContrast,
  showTextVariants,
  matchPanelColor,
  hookName,
  tokenName,
}) => {
  const { euiTheme } = useEuiTheme();

  const colorValue = _colorValue || euiTheme.colors[color];

  const colorsForContrast = showTextVariants ? textVariants : allowedColors;

  const colorsWithMinContrast = colorsForContrast.filter((_color) => {
    const backgroundColor = colorValue;
    const foregroundColor =
      euiTheme.colors[_color as keyof _EuiThemeColorsMode] ?? _color;

    const contrast = chroma.contrast(backgroundColor, foregroundColor) ?? 0;

    return contrast && contrast >= minimumContrast;
  });

  function colorIsCore(color: string) {
    return brandKeys.includes(color) || brandTextKeys.includes(color);
  }

  return (
    <EuiPanel
      color="transparent"
      hasBorder={false}
      paddingSize={matchPanelColor ? 'l' : 'none'}
      style={{
        background: matchPanelColor ? colorValue : undefined,
      }}
    >
      <EuiText size="xs">
        <EuiFlexGrid
          css={{ gridTemplateRows: 'auto', gridAutoFlow: 'row' }}
          columns={2}
          direction="column"
          gutterSize="s"
        >
          {showTextVariants && colorIsCore(colorValue) && (
            <ColorsContrastItem
              foreground={`${color}Text`}
              background={'body'}
              minimumContrast={minimumContrast}
            />
          )}
          {colorsWithMinContrast.map((color2) => {
            if (colorIsCore(colorValue) && colorIsCore(color2)) {
              // i.e. don't render if both are core colors
              return;
            }
            return (
              <ColorsContrastItem
                foreground={color2}
                background={_colorValue ? colorValue : color}
                key={color2}
                minimumContrast={minimumContrast}
                styleString={
                  tokenName ?? (hookName && `${hookName}('${color}')`)
                }
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
  minimumContrast: number;
  styleString?: string;
};

const ColorsContrastItem: FunctionComponent<ColorsContrastItem> = ({
  foreground,
  background,
  minimumContrast,
  styleString,
}) => {
  const { euiTheme } = useEuiTheme();
  const backgroundColorIsToken =
    euiTheme.colors[background as keyof _EuiThemeColorsMode];
  const backgroundColor = backgroundColorIsToken || background;
  const foregroundColorIsToken =
    euiTheme.colors[foreground as keyof _EuiThemeColorsMode];
  const foregroundColor = foregroundColorIsToken || foreground;
  const backgroundIsBody = background === 'body';

  const contrast = chroma.contrast(backgroundColor, foregroundColor);

  if (!contrast || contrast < minimumContrast) {
    return <></>;
  }

  const { contrastRating, contrastRatingBadge } = getContrastRatings(
    contrast,
    foreground
  );

  const backgroundStyleString = styleString || `euiTheme.colors.${background}`;

  const contrastIsAcceptableToCopy = contrast >= 3;
  const textToCopy = backgroundIsBody
    ? `color: $\{euiTheme.colors.${foreground}};`
    : `background-color: $\{${backgroundStyleString}};
color: $\{euiTheme.colors.${foreground}};`;

  const beforeMessage = contrastIsAcceptableToCopy ? (
    <small>
      <code>{`euiTheme.colors.${foreground} / ${backgroundStyleString}`}</code>
      <EuiHorizontalRule margin="xs" />
      <kbd>Click</kbd> to copy CSS-in-JS configuration
    </small>
  ) : (
    <small>
      Cannot copy configuration because the contrast is not acceptable
    </small>
  );

  return (
    <EuiFlexItem className="eui-textCenter">
      <EuiCopy
        display="block"
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
                ? 'Click to copy CSS-in-JS configurations'
                : undefined
            }
            style={{
              backgroundColor: backgroundColor,
              color: foregroundColor,
              borderRadius: euiTheme.border.radius.medium,
            }}
            // @ts-expect-error - this isn't a valid color type, we mostly just want to disable the default EuiListGroupItem button color from being rendered since we're setting our own via `style`
            color="inherit"
            label={sanitizeColorName(foreground)}
          />
        )}
      </EuiCopy>
    </EuiFlexItem>
  );
};

function sanitizeColorName(color: string) {
  // Add space between caplital letters
  const spaced = color.replace(/([A-Z])/g, ' $1').trim();
  // Capitalize first letter
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
