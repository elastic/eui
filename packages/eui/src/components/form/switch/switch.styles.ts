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
    on: formVars.colors.selected,
    off: formVars.colors.unselectedBorder,
    disabled: formVars.colors.disabled,
    thumb: formVars.colors.selectedIcon,
    thumbBorder: formVars.colors.unselectedBorder,
    thumbBorderDisabled: formVars.colors.unselectedBorder,
  };

  const sizes = {
    uncompressed: {
      height: mathWithUnits(euiTheme.size.base, (x) => x * 1.25),
      width: mathWithUnits(
        [euiTheme.size.xxl, euiTheme.size.xs],
        (x, y) => x + y
      ),
    },
    compressed: {
      height: euiTheme.size.base,
      width: mathWithUnits(euiTheme.size.base, (x) => x * 1.75),
    },
    get mini() {
      return {
        height: mathWithUnits(this.uncompressed.height, (x) => x / 2),
        width: mathWithUnits(this.uncompressed.width, (x) => x / 2),
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

const bodyStyles = (_: UseEuiTheme, { colors }: EuiSwitchVars) => {
  return {
    euiSwitch__body: css`
      position: absolute;
      inset: 0;
      overflow: hidden;
      border-radius: inherit;
    `,
    on: css`
      background-color: ${colors.on};
    `,
    off: css`
      background-color: ${colors.off};
    `,
    disabled: css`
      background-color: ${colors.disabled};
    `,
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
