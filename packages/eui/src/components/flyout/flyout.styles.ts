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
import { euiContainerQuery } from '../../global_styling/mixins/_container_query';
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

/**
 * Flyout styles are split into shared base styles and two positioning variants.
 *
 * The base `euiFlyout` styles cover layout, background, and focus behavior that
 * are identical regardless of how the flyout is positioned.
 *
 * Two positioning modes exist because of a fundamental CSS constraint:
 *
 * - **Viewport mode** (`position: fixed`): Used when no `container` is
 *   provided, or when `container={null}` is passed to explicitly opt out of
 *   an inherited container. The flyout is pinned to the viewport and stays
 *   visible during page scroll. Media queries drive responsive breakpoints.
 *
 * - **Container mode** (`position: absolute`): Used when a `container` element
 *   is provided. The flyout is portaled into the container and uses it for both
 *   width and position: right-side flyouts align to the container's right edge,
 *   not the viewport. The container receives `position: relative` and
 *   `container-type: inline-size`. Container queries drive responsive breakpoints
 *   scoped to the container's width.
 *
 * Both modes use `%` for width values. For `position: fixed` elements, `%`
 * resolves against the viewport (identical to `vw`). For `position: absolute`
 * elements, `%` resolves against the containing block.
 *
 * Setting `container-type: inline-size` on `document.body` is not viable
 * because it establishes layout containment, which would change the containing
 * block for every `position: fixed` element on the page.
 */
export const euiFlyoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Shared base styles for all flyouts (viewport and container mode)
    euiFlyout: css`
      ${logicalCSS('bottom', 0)}
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
    `,

    // Position variants — the only CSS that differs between viewport and container mode
    position: {
      fixed: css`
        position: fixed;
        ${logicalCSS('top', 'var(--euiFixedHeadersOffset, 0)')}
        ${maxedFlyoutWidth(euiThemeContext)}
      `,
      absolute: css`
        position: absolute;
        ${logicalCSS('top', 0)}
        ${maxedFlyoutWidth(euiThemeContext, true)}
      `,
    },

    // Viewport-mode sizes (media queries + % sizing)
    viewport: composeFlyoutSizing(euiThemeContext),

    // Container-mode sizes (container queries + % sizing)
    container: composeFlyoutSizing(euiThemeContext, {
      useContainerQuery: true,
    }),

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

/**
 * Applies a max-width constraint at the flyout breakpoint.
 * When `useContainerQuery` is true, uses a named container query;
 * otherwise uses a viewport media query. Both use `%` units — for
 * `position: fixed` elements, `%` resolves identically to `vw`.
 */
export const maxedFlyoutWidth = (
  euiThemeContext: UseEuiTheme,
  useContainerQuery: boolean = false
) => {
  if (useContainerQuery) {
    const breakpointPx = euiThemeContext.euiTheme.breakpoint[FLYOUT_BREAKPOINT];
    return `
      ${euiContainerQuery(`(width < ${breakpointPx}px)`)} {
        ${logicalCSS('max-width', '90% !important')}
      }
    `;
  }
  return `
    ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
      ${logicalCSS('max-width', '90% !important')}
    }
  `;
};

/**
 * Composes the full set of named size styles (`s`, `m`, `l`, `fill`) for a
 * flyout positioning mode.
 *
 * Uses `%` units for widths (identical to `vw` for `position: fixed` elements,
 * and container-relative for `position: absolute` elements).
 *
 * When `useContainerQuery` is true, uses container queries for breakpoints;
 * otherwise uses viewport media queries.
 *
 * When a child flyout is stacked on top of the parent, the parent flyout size
 * will match the child flyout size. The `s` and `m` sizes include overrides
 * for this stacked-child behavior.
 */
export const composeFlyoutSizing = (
  euiThemeContext: UseEuiTheme,
  options: { useContainerQuery: boolean } = { useContainerQuery: false }
) => {
  const { useContainerQuery } = options;
  const euiTheme = euiThemeContext.euiTheme;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);

  // Calculating the minimum width based on the screen takeover breakpoint
  const flyoutSizes = {
    s: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.5)}px`,
      width: '25%',
      max: `${Math.round(euiTheme.breakpoint.s * 0.7)}px`,
    },
    m: {
      // Calculated for forms plus padding
      min: `${mathWithUnits(formMaxWidth, (x) => x + 24)}`,
      width: '50%',
      max: `${euiTheme.breakpoint.m}px`,
    },
    l: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.9)}px`,
      width: '75%',
      max: `${euiTheme.breakpoint.l}px`,
    },
    // NOTE: These styles are for the flyout system in `stacked` layout mode.
    // In `side-by-side` mode, @flyout.component.tsx uses inline styles.
    fill: {
      min: '90%',
      width: '90%',
      max: '90%',
    },
  };

  const sizingRules = (size: EuiFlyoutSize): string => {
    if (useContainerQuery) {
      const breakpointPx = euiTheme.breakpoint[FLYOUT_BREAKPOINT];
      return `
        ${logicalCSS('max-width', flyoutSizes[size].max)}

        ${euiContainerQuery(`(width < ${breakpointPx}px)`)} {
          ${logicalCSS('min-width', 0)}
          ${logicalCSS('width', flyoutSizes[size].min)}
        }
        ${euiContainerQuery(`(width >= ${breakpointPx}px)`)} {
          ${logicalCSS('min-width', flyoutSizes[size].min)}
          ${logicalCSS('width', flyoutSizes[size].width)}
        }
      `;
    }

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

  return {
    s: css`
      ${sizingRules('s')}

      &.euiFlyout--hasChild--stacked.euiFlyout--hasChild--m {
        ${sizingRules('m')}
      }
    `,
    m: css`
      ${sizingRules('m')}

      &.euiFlyout--hasChild--stacked.euiFlyout--hasChild--s {
        ${sizingRules('s')}
      }
    `,
    l: css`
      ${sizingRules('l')}
    `,
    fill: css`
      ${sizingRules('fill')}
    `,
  };
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
 * Handles maxWidth prop overrides to ensure they take precedence over base CSS.
 * Always uses `90%` as the fill unit — identical to `90vw` for `position: fixed`.
 */
const composeMaxWidthOverrides = (
  maxWidth: boolean | number | string | undefined,
  isFill: boolean | undefined
): React.CSSProperties => {
  if (typeof maxWidth === 'boolean') {
    return {};
  }

  const fillUnit = '90%';

  const overrides: React.CSSProperties = {
    maxWidth,
  };

  // For fill size flyouts, we need to override min-width to allow dynamic sizing
  if (isFill) {
    overrides.minWidth = '0';

    // When maxWidth is provided for fill flyouts, we need to override the CSS rule
    // that sets min-inline-size to the fill unit. We calculate min(maxWidth, fillUnit)
    // to ensure the flyout respects both constraints.
    if (maxWidth) {
      const maxWidthWithUnits =
        typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      overrides.minWidth = `min(${maxWidthWithUnits}, ${fillUnit})`;
    }
  }

  return logicalStyles(overrides);
};

/**
 * Composes all inline styles for a flyout based on its configuration.
 * Always uses `%` for fill-size calculations — identical to `vw` for
 * `position: fixed` elements, and container-relative for `position: absolute`.
 * Uses a CSS custom property (`--euiFlyoutMainWidth`) for synchronous
 * tracking of the main flyout width during resize drag, falling back to
 * the pixel value from manager state when the variable is not set.
 */
export const composeFlyoutInlineStyles = (
  size: EuiFlyoutSize | string | number,
  layoutMode: 'side-by-side' | 'stacked',
  siblingFlyoutId: string | null,
  siblingFlyoutWidth: number | null,
  maxWidth: boolean | number | string | undefined,
  zIndex?: number
): React.CSSProperties => {
  const fillUnit = '90%';

  // Handle custom width values (non-named sizes)
  const customWidthStyles = !isEuiFlyoutSizeNamed(size)
    ? logicalStyles({ width: size })
    : {};

  const isFill = size === 'fill';

  // Handle dynamic width calculation for fill size in side-by-side mode.
  const dynamicStyles =
    isFill &&
    layoutMode === 'side-by-side' &&
    siblingFlyoutId &&
    siblingFlyoutWidth
      ? logicalStyles({
          width: `calc(${fillUnit} - var(--euiFlyoutMainWidth, ${siblingFlyoutWidth}px))`,
          minWidth: '0',
        })
      : {};

  // For fill flyouts with maxWidth, we need to ensure the minWidth override is applied
  // to override the CSS rule that sets min-inline-size to the fill unit
  let minWidthOverride = {};
  if (isFill && maxWidth) {
    if (
      layoutMode === 'side-by-side' &&
      siblingFlyoutId &&
      siblingFlyoutWidth &&
      dynamicStyles.inlineSize
    ) {
      // For fill flyouts with maxWidth and a sibling: min(maxWidth, calc(fillUnit - siblingWidth))
      const dynamicWidth = dynamicStyles.inlineSize;
      const maxWidthWithUnits =
        typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      minWidthOverride = {
        minWidth: `min(${maxWidthWithUnits}, ${dynamicWidth})`,
      };
    } else {
      // For fill flyouts with maxWidth but no sibling: min(maxWidth, fillUnit)
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
    // For fill flyouts with maxWidth and a sibling: min(maxWidth, calc(fillUnit - siblingWidth))
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
