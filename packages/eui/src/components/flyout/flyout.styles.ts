/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, keyframes } from '@emotion/react';
import { euiShadowXLarge } from '@elastic/eui-theme-common';

import {
  _EuiFlyoutPaddingSize,
  EuiFlyoutSize,
  isEuiFlyoutSizeNamed,
} from './const';
import {
  euiCanAnimate,
  euiMaxBreakpoint,
  euiMinBreakpoint,
  logicalCSS,
  logicalStyles,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiFormMaxWidth } from '../form/form.styles';

export const EUI_FLYOUT_CONTAINER_NAME = 'euiFlyout' as const;

export const FLYOUT_BREAKPOINT = 'm' as const;

export const euiFlyoutSlideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const euiFlyoutSlideOutRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0%);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const euiFlyoutSlideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const euiFlyoutSlideOutLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiFlyout: css`
      position: fixed;
      ${logicalCSS('bottom', 0)}
      ${logicalCSS('top', 'var(--euiFixedHeadersOffset, 0)')}
      ${logicalCSS('height', 'inherit')}
      background: ${euiTheme.colors.backgroundBasePlain};
      display: flex;
      flex-direction: column;
      align-items: stretch;

      &:focus {
        /* Remove focus ring because of tabindex=0 */
        outline: none;
      }

      &.euiFlyout--hasChildBackground {
        background: ${euiTheme.colors.backgroundBaseSubdued};
      }

      ${maxedFlyoutWidth(euiThemeContext)}
    `,
    // Flyout sizes
    // When a child flyout is stacked on top of the parent, the parent flyout size will match the child flyout size
    s: css`
      ${composeFlyoutSizing(euiThemeContext, 's')}

      &.euiFlyout--hasChild--stacked.euiFlyout--hasChild--m {
        ${composeFlyoutSizing(euiThemeContext, 'm')}
      }
    `,
    m: css`
      ${composeFlyoutSizing(euiThemeContext, 'm')}

      &.euiFlyout--hasChild--stacked.euiFlyout--hasChild--s {
        ${composeFlyoutSizing(euiThemeContext, 's')}
      }
    `,
    l: css`
      ${composeFlyoutSizing(euiThemeContext, 'l')}
    `,
    fill: css`
      ${composeFlyoutSizing(euiThemeContext, 'fill')}
    `,
    noMaxWidth: css`
      ${logicalCSS('max-width', 'none')}
    `,

    // Side
    right: css`
      clip-path: polygon(-50% 0, 100% 0, 100% 100%, -50% 100%);
      ${logicalCSS('right', 0)}

      /*
        Jump animation states immediately unless
        prefers-reduced-motion: reduce is *not* set
      */
      animation: ${euiFlyoutSlideInRight} 0s ${euiTheme.animation
        .resistance} forwards;

      ${euiCanAnimate} {
        animation-duration: ${euiTheme.animation.normal};
      }

      &.euiFlyout--hasChild {
        clip-path: none;
      }
    `,
    // Left-side flyouts should only be used for navigation
    left: css`
      ${logicalCSS('left', 0)}
      clip-path: polygon(0 0, 150% 0, 150% 100%, 0 100%);

      /*
        Jump animation states immediately unless
        prefers-reduced-motion: reduce is *not* set
      */
      animation: ${euiFlyoutSlideInLeft} 0s ${euiTheme.animation.resistance}
        forwards;

      ${euiCanAnimate} {
        animation-duration: ${euiTheme.animation.normal};
      }
    `,

    // Type
    overlay: {
      overlay: css`
        &:has(.euiResizableButton) {
          border-inline: none;
        }
      `,
      left: css`
        ${euiShadowXLarge(euiThemeContext, {
          borderAllInHighContrastMode: true,
          border: 'right',
        })}
      `,
      right: css`
        ${euiShadowXLarge(euiThemeContext, {
          borderAllInHighContrastMode: true,
          border: 'left',
        })}
      `,
    },
    push: {
      push: css`
        clip-path: none;
        /* Make sure the header shadows are above */
        z-index: ${Number(euiTheme.levels.flyout) - 1};
      `,
      right: css`
        ${logicalCSS('border-left', euiTheme.border.thick)}
      `,
      left: css`
        ${logicalCSS('border-right', euiTheme.border.thick)}
      `,
      noAnimation: css`
        /* Don't animate on loading a docked nav */
        animation-duration: 0s !important; /* stylelint-disable-line declaration-no-important */
      `,
    },

    // Padding
    paddingSizes: {
      none: css`
        ${composeFlyoutPadding(euiThemeContext, 'none')}
      `,
      s: css`
        ${composeFlyoutPadding(euiThemeContext, 's')}
      `,
      m: css`
        ${composeFlyoutPadding(euiThemeContext, 'm')}
      `,
      l: css`
        ${composeFlyoutPadding(euiThemeContext, 'l')}
      `,
    },
  };
};

export const maxedFlyoutWidth = (euiThemeContext: UseEuiTheme) => `
  ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
    ${logicalCSS('max-width', '90vw !important')}
  }
`;

export const composeFlyoutSizing = (
  euiThemeContext: UseEuiTheme,
  size: EuiFlyoutSize
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);

  // 1. Calculating the minimum width based on the screen takeover breakpoint
  const flyoutSizes = {
    s: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.5)}px`, // 1.
      width: '25vw',
      max: `${Math.round(euiTheme.breakpoint.s * 0.7)}px`,
    },

    m: {
      // Calculated for forms plus padding
      min: `${mathWithUnits(formMaxWidth, (x) => x + 24)}`,
      width: '50vw',
      max: `${euiTheme.breakpoint.m}px`,
    },

    l: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.9)}px`, // 1.
      width: '75vw',
      max: `${euiTheme.breakpoint.l}px`,
    },

    // NOTE: These styles are for the flyout system in `stacked` layout mode.
    // In `side-by-side` mode, @flyout.component.tsx uses inline styles.
    fill: {
      min: '90vw',
      width: '90vw',
      max: '90vw',
    },
  };

  return `
    ${logicalCSS('max-width', flyoutSizes[size].max)}

    ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
      ${logicalCSS('min-width', 0)}
      ${logicalCSS('width', flyoutSizes[size].min)}
    }
    ${euiMinBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
      ${logicalCSS('min-width', flyoutSizes[size].min)}
      ${logicalCSS('width', flyoutSizes[size].width)}
    }
  `;
};

const composeFlyoutPadding = (
  euiThemeContext: UseEuiTheme,
  paddingSize: _EuiFlyoutPaddingSize
) => {
  const euiTheme = euiThemeContext.euiTheme;

  const paddingModifierMap = {
    none: 0,
    s: euiTheme.size.s,
    m: euiTheme.size.base,
    l: euiTheme.size.l,
  };

  // Footer padding
  const footerPaddingSizes = {
    none: 0,
    s: euiTheme.size.s,
    m: `${mathWithUnits(euiTheme.size.base, (x) => x * 0.75)} ${
      euiTheme.size.base
    };`,
    l: `${mathWithUnits(euiTheme.size.l, (x) => x / 1.5)} ${euiTheme.size.l};`,
  };

  return `
    .euiFlyoutHeader {
      ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
      ${logicalCSS('padding-top', paddingModifierMap[paddingSize])}
    }

    [class*='euiFlyoutHeader-hasBorder'] {
      ${logicalCSS('padding-bottom', paddingModifierMap[paddingSize])}
    }

    .euiFlyoutBody__overflowContent {
      padding: ${paddingModifierMap[paddingSize]};
    }

    .euiFlyoutBody__banner .euiCallOut {
      ${logicalCSS('padding-horizontal', paddingModifierMap[paddingSize])}
    }

    .euiFlyoutFooter {
      padding: ${footerPaddingSizes[paddingSize]};
    }
  `;
};

/**
 * Helper for `composeFlyoutInlineStyles`
 * Handles maxWidth prop overrides to ensure they take precedence over base CSS
 */
const composeMaxWidthOverrides = (
  maxWidth: boolean | number | string | undefined,
  isFill: boolean | undefined
): React.CSSProperties => {
  if (typeof maxWidth === 'boolean') {
    return {};
  }

  const overrides: React.CSSProperties = {
    maxWidth,
  };

  // For fill size flyouts, we need to override min-width to allow dynamic sizing
  if (isFill) {
    overrides.minWidth = '0';

    // When maxWidth is provided for fill flyouts, we need to override the CSS rule
    // that sets min-inline-size: 90vw. We calculate min(maxWidth, 90vw) to ensure
    // the flyout respects both constraints and doesn't get stuck at 90vw minimum.
    if (maxWidth) {
      const maxWidthWithUnits =
        typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      overrides.minWidth = `min(${maxWidthWithUnits}, 90vw)`;
    }
  }

  return logicalStyles(overrides);
};

/**
 * Composes all inline styles for a flyout based on its configuration
 */
export const composeFlyoutInlineStyles = (
  size: EuiFlyoutSize | string | number,
  layoutMode: 'side-by-side' | 'stacked',
  siblingFlyoutId: string | null,
  siblingFlyoutWidth: number | null,
  maxWidth: boolean | number | string | undefined,
  zIndex?: number
): React.CSSProperties => {
  // Handle custom width values (non-named sizes)
  const customWidthStyles = !isEuiFlyoutSizeNamed(size)
    ? logicalStyles({ width: size })
    : {};

  const isFill = size === 'fill';

  // Handle dynamic width calculation for fill size in side-by-side mode
  const dynamicStyles =
    isFill &&
    layoutMode === 'side-by-side' &&
    siblingFlyoutId &&
    siblingFlyoutWidth
      ? logicalStyles({
          width: `calc(90vw - ${siblingFlyoutWidth}px)`,
          minWidth: '0',
        })
      : {};

  // For fill flyouts with maxWidth, we need to ensure the minWidth override is applied
  // to override the CSS rule that sets min-inline-size: 90vw
  let minWidthOverride = {};
  if (isFill && maxWidth) {
    if (
      layoutMode === 'side-by-side' &&
      siblingFlyoutId &&
      siblingFlyoutWidth &&
      dynamicStyles.inlineSize
    ) {
      // For fill flyouts with maxWidth and a sibling: min(maxWidth, calc(90vw - siblingWidth))
      const dynamicWidth = dynamicStyles.inlineSize;
      const maxWidthWithUnits =
        typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      minWidthOverride = {
        minWidth: `min(${maxWidthWithUnits}, ${dynamicWidth})`,
      };
    } else {
      // For fill flyouts with maxWidth but no sibling: min(maxWidth, 90vw)
      const maxWidthOverrides = composeMaxWidthOverrides(maxWidth, isFill);
      minWidthOverride = { minWidth: maxWidthOverrides.minInlineSize };
    }
  }

  // Calculate the final maxWidth based on conditions
  let finalMaxWidth: string | undefined;

  if (
    maxWidth &&
    isFill &&
    layoutMode === 'side-by-side' &&
    siblingFlyoutId &&
    siblingFlyoutWidth &&
    dynamicStyles.inlineSize
  ) {
    // For fill flyouts with maxWidth and a sibling: min(maxWidth, calc(90vw - siblingWidth))
    const dynamicWidth = dynamicStyles.inlineSize;
    const maxWidthWithUnits =
      typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    finalMaxWidth = `min(${maxWidthWithUnits}, ${dynamicWidth})`;
  } else if (maxWidth) {
    // For all other cases with maxWidth: use the original maxWidth value
    finalMaxWidth =
      typeof maxWidth === 'number' ? `${maxWidth}px` : (maxWidth as string);
  }

  return logicalStyles({
    ...customWidthStyles,
    ...dynamicStyles,
    ...minWidthOverride,
    ...(finalMaxWidth ? { maxWidth: finalMaxWidth } : {}),
    zIndex,
  });
};
