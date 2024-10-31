/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  euiCanAnimate,
  euiFocusRing,
  euiFontSize,
  logicalCSS,
  logicalSizeCSS,
  mathWithUnits,
} from '../../../global_styling';
import { euiFormCustomControlVariables } from '../form.styles';

const euiSwitchVars = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formVars = euiFormCustomControlVariables(euiThemeContext);

  const colors = {
    on: euiTheme.components.switchBackgroundOn,
    off: euiTheme.components.switchBackgroundOff,
    disabled: formVars.colors.disabled,
    thumb: formVars.colors.selectedIcon,
    thumbDisabled: euiTheme.components.switchThumbBackgroundDisabled,
    thumbBorder: euiTheme.components.switchThumbBorderOff,
    thumbBorderOn: euiTheme.components.switchThumbBorderOn,
    thumbBorderDisabled: formVars.colors.disabledBorder,
    iconDisabled: euiTheme.components.switchIconDisabled,
  };

  const sizes = {
    uncompressed: {
      height: mathWithUnits(euiTheme.size.base, (x) => x * 1.25),
      width: mathWithUnits(
        [euiTheme.size.xxl, euiTheme.size.xs],
        (x, y) => x + y
      ),
      thumbScales: {
        default: 1,
        hover: 1.05,
        active: 0.9,
      },
    },
    compressed: {
      height: euiTheme.size.base,
      width: mathWithUnits(euiTheme.size.base, (x) => x * 1.75),
      thumbScales: {
        default: 0.9,
        hover: 0.95,
        active: 0.8,
      },
    },
    get mini() {
      return {
        height: mathWithUnits(this.uncompressed.height, (x) => x / 2),
        width: mathWithUnits(this.uncompressed.width, (x) => x / 2),
        thumbScales: {
          default: 0.8,
          hover: undefined,
          active: undefined,
        },
      };
    },
  };

  const animation = {
    speed: euiTheme.animation.normal,
    easing: euiTheme.animation.bounce,
  };

  const label = {
    disabled: formVars.colors.disabledLabel,
    gap: formVars.sizes.labelGap,
  };

  return { sizes, colors, animation, label };
};
type EuiSwitchVars = ReturnType<typeof euiSwitchVars>;

export const euiSwitchStyles = (euiThemeContext: UseEuiTheme) => {
  const switchVars = euiSwitchVars(euiThemeContext);
  return {
    euiSwitch: css`
      position: relative;
      display: inline-flex;
      align-items: flex-start;
      /* Required for inline-flex CSS to not render an extra 2-3px of strut height
       * @see https://stackoverflow.com/a/27536461/4294462 */
      vertical-align: middle;
    `,
    // Skip css`` to avoid generating an extra Emotion className
    enabled: `
      cursor: pointer;
    `,
    disabled: css`
      cursor: not-allowed;
    `,

    button: buttonStyles(euiThemeContext, switchVars),
    // The track body must be separate from the button wrapper, because the
    // icons have their overflow hidden outside the button, but the thumb doesn't
    body: bodyStyles(euiThemeContext, switchVars),
    icons: iconStyles(euiThemeContext, switchVars),
    thumb: thumbStyles(euiThemeContext, switchVars),
    label: labelStyles(euiThemeContext, switchVars),
  };
};

const buttonStyles = (
  euiThemeContext: UseEuiTheme,
  switchVars: EuiSwitchVars
) => {
  const {
    sizes: { uncompressed, compressed, mini },
  } = switchVars;

  return {
    euiSwitch__button: css`
      flex-shrink: 0; /* ensures the button doesn't lose width because of a long label */
      line-height: 0; /* ensures button takes height of switch inside */
      position: relative;
      cursor: inherit;
      ${euiFocusRing(euiThemeContext, 'outset')}
    `,
    // Skip css`` to avoid generating an Emotion className
    uncompressed: `
      ${logicalSizeCSS(uncompressed.width, uncompressed.height)}
      border-radius: ${uncompressed.height};
    `,
    compressed: css`
      ${logicalSizeCSS(compressed.width, compressed.height)}
      border-radius: ${compressed.height};
    `,
    mini: css`
      ${logicalSizeCSS(mini.width, mini.height)}
      border-radius: ${mini.height};
    `,
  };
};

const bodyStyles = ({ euiTheme }: UseEuiTheme, { colors }: EuiSwitchVars) => {
  return {
    euiSwitch__body: css`
      position: absolute;
      inset: 0;
      overflow: hidden;
      border-radius: inherit;
      pointer-events: none; /* Required for Kibana's Selenium driver to be able to click switches in FTR tests */
    `,
    on: css`
      background-color: ${colors.on};
    `,
    off: css`
      background-color: ${colors.off};
    `,
    disabled: {
      uncompressed: css`
        background-color: ${euiTheme.components
          .switchUncompressedBackgroundDisabled};
      `,
      compressed: css`
        background-color: ${euiTheme.components
          .switchCompressedBackgroundDisabled};
      `,
      mini: css`
        background-color: ${euiTheme.components.switchMiniBackgroundDisabled};
      `,
    },
  };
};

const iconStyles = (
  { euiTheme }: UseEuiTheme,
  { colors, animation }: EuiSwitchVars
) => {
  return {
    euiSwitch__icons: css`
      position: absolute;
      ${logicalCSS('vertical', 0)}
      ${logicalCSS('left', '-50%')}
      ${logicalCSS('width', '200%')}
      display: flex;
      justify-content: space-around;
      align-items: center;
      /* Adjust horizontal offset of icons */
      ${logicalCSS('padding-horizontal', euiTheme.size.xs)}

      ${euiCanAnimate} {
        transition-property: inset-inline-start;
        transition-duration: ${animation.speed};
        transition-timing-function: ${animation.easing};
      }
    `,
    on: css`
      ${logicalCSS('left', '-25%')}
    `,
    off: css`
      ${logicalCSS('left', '-75%')}
    `,
    enabled: css`
      color: ${colors.thumb};
    `,
    disabled: css`
      color: ${colors.iconDisabled};
    `,
  };
};

const thumbStyles = ({ euiTheme }: UseEuiTheme, switchVars: EuiSwitchVars) => {
  const { sizes, colors, animation } = switchVars;
  const { uncompressed, compressed, mini } = sizes;

  const _calculateScale = (
    size: keyof typeof sizes,
    hoverActiveStates: boolean
  ) => {
    const baseScale = `transform: scale(${sizes[size].thumbScales.default});`;
    const states = hoverActiveStates
      ? `
      .euiSwitch:hover & {
        transform: scale(${sizes[size].thumbScales.hover});
      }
      .euiSwitch:active & {
        transform: scale(${sizes[size].thumbScales.active});
      }`
      : '';
    return `${baseScale}${states}`;
  };

  return {
    euiSwitch__thumb: css`
      position: absolute;
      ${logicalCSS('vertical', 0)}
      aspect-ratio: 1;
      /* width+height needed by Safari - aspect-ratio is enough in FF/Chrome */
      ${logicalCSS('width', 'fit-content')}
      ${logicalCSS('height', '100%')}
      border-radius: 50%;
      pointer-events: none; /* Required for Kibana's Selenium driver to be able to click switches in FTR tests */

      ${euiCanAnimate} {
        transition-property: inset-inline-start, transform, background-color,
          border-color;
        transition-duration: ${animation.speed};
        transition-timing-function: ${animation.easing};
      }
    `,
    off: css`
      ${logicalCSS('left', 0)}
    `,
    get on() {
      const baseStyles = `
        border: ${euiTheme.border.width.thin} solid ${colors.thumbBorderOn};
      `;

      // right: 0 works but doesn't transition/animate, so we need to
      // manually calculate the left position per switch size
      const _calculateLeft = (bodyWidth: string, thumbWidth: string) => {
        const leftPosition = mathWithUnits(
          [bodyWidth, thumbWidth],
          (x, y) => x - y
        );
        return css`
          label: on;
          ${logicalCSS('left', leftPosition)}
          ${baseStyles}
        `;
      };
      return {
        uncompressed: _calculateLeft(uncompressed.width, uncompressed.height),
        compressed: _calculateLeft(compressed.width, compressed.height),
        mini: _calculateLeft(mini.width, mini.height),
      };
    },

    enabled: {
      enabled: `
        background-color: ${colors.thumb};
        border: ${euiTheme.border.width.thin} solid ${colors.thumbBorder};
      `,
      uncompressed: _calculateScale('uncompressed', true),
      compressed: _calculateScale('compressed', true),
      mini: _calculateScale('mini', false),
    },

    disabled: {
      disabled: css`
        background-color: ${colors.thumbDisabled};
        border: ${euiTheme.border.width.thin} solid
          ${colors.thumbBorderDisabled};
      `,
      uncompressed: _calculateScale('uncompressed', false),
      compressed: _calculateScale('compressed', false),
      mini: _calculateScale('mini', false),
    },
  };
};

const labelStyles = (
  euiThemeContext: UseEuiTheme,
  { sizes, label }: EuiSwitchVars
) => {
  const { uncompressed, compressed, mini } = sizes;

  return {
    euiSwitch__label: css`
      /* Needs to use padding and not flex gap for extra mouse click area */
      ${logicalCSS('padding-left', label.gap)}
    `,
    // Skip css`` to avoid generating an Emotion className
    uncompressed: `
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${uncompressed.height};
    `,
    compressed: css`
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      line-height: ${compressed.height};
    `,
    mini: css`
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      line-height: ${mini.height};
    `,
    disabled: css`
      color: ${label.disabled};
    `,
  };
};
