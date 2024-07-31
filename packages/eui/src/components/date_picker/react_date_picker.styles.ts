/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Needs to use vanilla `css` to pass a className directly to react-datepicker
import { css } from '@emotion/css';

import { UseEuiTheme } from '../../services';
import {
  euiCanAnimate,
  euiMaxBreakpoint,
  euiFontSize,
  euiYScroll,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import {
  euiButtonEmptyColor,
  euiButtonFillColor,
} from '../../themes/amsterdam/global_styling/mixins';

export const euiDatePickerVariables = ({ euiTheme }: UseEuiTheme) => {
  return {
    gapSize: euiTheme.size.xs,
    get paddingSize() {
      return mathWithUnits(this.gapSize, (x) => x * 2);
    },

    headerButtonSize: euiTheme.size.xl,
    get headerOffset() {
      return mathWithUnits(
        [this.headerButtonSize, this.gapSize],
        (x, y) => x + y
      );
    },
  };
};

export const euiReactDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { gapSize, paddingSize, headerOffset } =
    euiDatePickerVariables(euiThemeContext);

  return {
    euiReactDatePicker: css`
      display: flex;
      justify-content: center;
      padding: ${paddingSize};
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      color: ${euiTheme.colors.text};
      border-radius: ${euiTheme.border.radius.medium};

      &.react-datepicker--non-interactive {
        pointer-events: none;
      }

      .react-datepicker__focusTrap {
        display: flex;
        justify-content: center;
        gap: ${paddingSize};
      }

      /* On small screens put the times at the bottom */
      ${euiMaxBreakpoint(euiThemeContext, 's')} {
        &,
        .react-datepicker__focusTrap {
          flex-direction: column;
        }
      }

      /**
       * Header UI - uses absolute positioning trickery to
       * move elements out of their normal DOM position
       */

      .react-datepicker__header__dropdown {
        position: absolute;
        ${logicalCSS('top', 0)}
        ${logicalCSS('horizontal', headerOffset)}
        padding: ${paddingSize};
        display: flex;
        justify-content: center;
        gap: ${gapSize};
      }

      .react-datepicker__navigation {
        z-index: 1;
        position: absolute;
        ${logicalCSS('top', paddingSize)}

        /* Remove default EuiButtonIcon translate-Y */
        &:hover,
        &:focus {
          transform: none;
        }
      }

      .react-datepicker__navigation--previous {
        ${logicalCSS('left', paddingSize)}
      }

      .react-datepicker__navigation--next {
        ${logicalCSS('right', paddingSize)}
      }

      /* Layout remaining containers to account for absolutely positioned header */

      .react-datepicker__month-container {
        flex-grow: 1;
        ${logicalCSS('margin-top', headerOffset)}
      }

      .react-datepicker__time-container {
        flex-grow: 1;
        ${logicalCSS(
          'margin-top',
          // The time select gets a little extra offset
          mathWithUnits([headerOffset, gapSize], (x, y) => x + y)
        )}
        ${logicalCSS('margin-left', paddingSize)}

        /* Account for vertical stacking of time select on small screens */
        ${euiMaxBreakpoint(euiThemeContext, 's')} {
          ${logicalCSS('margin-top', paddingSize)}
          ${logicalCSS('margin-left', 0)}
        }
      }

      ${_timeSelectStyles(euiThemeContext)}
    `,
  };
};

export const _timeSelectStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { gapSize } = euiDatePickerVariables(euiThemeContext);

  return css`
    .react-datepicker__time-container {
      display: flex;
      ${logicalCSS('width', 'auto')}
      background-color: ${euiTheme.colors.body};
      border-radius: ${euiTheme.border.radius.medium};

      &--focus {
        .react-datepicker__time-list-item--preselected {
          text-decoration: underline;
        }
      }
    }

    .react-datepicker__time,
    .react-datepicker__time-box {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .react-datepicker__time-list {
      ${euiYScroll(euiThemeContext, { height: '100px' })}
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      align-items: center;
      gap: ${gapSize};
      ${logicalCSS('padding-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-horizontal', euiTheme.size.m)}

      &:focus-visible {
        outline-style: auto;
      }
    }

    .react-datepicker__time-list-item {
      ${logicalCSS('margin-horizontal', 'auto')};
      ${logicalCSS('padding-horizontal', euiTheme.size.s)};
      ${logicalCSS('height', euiTheme.size.l)}
      line-height: ${euiTheme.size.l};
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      font-weight: ${euiTheme.font.weight.medium};
      white-space: nowrap;
      text-align: center;
      border-radius: ${euiTheme.border.radius.small};

      &:not(:disabled):hover {
        text-decoration: underline;
        cursor: pointer;
      }

      &--disabled {
        cursor: not-allowed;
        color: ${euiTheme.colors.disabledText};
      }

      &--injected {
        ${euiButtonEmptyColor(euiThemeContext, 'success')}
      }

      &--selected {
        ${euiButtonFillColor(euiThemeContext, 'primary')}
      }

      /* closest current time but not selected (also applied when using arrow keys to indicate focus) */
      &--preselected {
        background-color: ${euiTheme.focus.backgroundColor};
      }

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.fast} ease-in;
      }
    }

    /* When in time only mode we make the dropdown look more like combo box styling */
    &.react-datepicker--time-only {
      padding: 0;

      .react-datepicker__time-container {
        background-color: transparent;
        margin: 0;
      }

      .react-datepicker__time-list {
        ${logicalCSS('height', '204px')}
      }

      .react-datepicker__time-list-item {
        ${logicalCSS('min-width', '112px')}
        font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
        text-align: start;
      }
    }
  `;
};
