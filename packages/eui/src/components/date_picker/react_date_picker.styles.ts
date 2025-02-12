/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Needs to use vanilla `css` to pass a className directly to react-datepicker
import { css } from '@emotion/css';
import { euiShadowSmall } from '@elastic/eui-theme-common';

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
  euiButtonColor,
  euiButtonEmptyColor,
  euiButtonFillColor,
} from '../../global_styling/mixins';
import {
  euiFormControlStyles,
  euiFormControlText,
  euiFormControlDefaultShadow,
} from '../form/form.styles';

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
          ${logicalCSS('margin-top', gapSize)}
          ${logicalCSS('margin-left', 0)}
        }
      }

      ${_monthYearDropdowns(euiThemeContext)}
      ${_dayCalendarStyles(euiThemeContext)}
      ${_timeSelectStyles(euiThemeContext)}
    `,
  };
};

export const _monthYearDropdowns = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const formStyles = euiFormControlStyles(euiThemeContext);

  return css`
    .react-datepicker__year-read-view,
    .react-datepicker__month-read-view,
    .react-datepicker__month-year-read-view {
      display: flex;
      justify-content: space-between;
      align-items: center;
      ${formStyles.compressed}

      ${euiFormControlText(euiThemeContext)}
      font-weight: ${euiTheme.font.weight.medium};

      ${euiFormControlDefaultShadow(euiThemeContext)}

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .react-datepicker__year-dropdown-container {
      position: relative;
      flex-grow: 1;
    }

    .react-datepicker__month-dropdown-container {
      position: relative;
      flex-grow: 2;
    }

    .react-datepicker__year-dropdown,
    .react-datepicker__month-dropdown {
      z-index: 1;
      position: absolute;
      ${euiYScroll(euiThemeContext, { height: 'auto' })}
      ${logicalCSS('max-height', '250px')}
      ${logicalCSS('width', '100%')}
      padding: ${euiTheme.size.xs};
      background-color: ${euiTheme.colors.emptyShade};
      border-radius: ${euiTheme.border.radius.medium};
      ${euiShadowSmall(euiThemeContext)}
    }

    .react-datepicker__year-dropdown {
      ${logicalCSS('min-width', '100px')}
    }

    .react-datepicker__month-dropdown {
      ${logicalCSS('min-width', '140px')}
    }

    .react-datepicker__year-option,
    .react-datepicker__month-option,
    .react-datepicker__month-year-option {
      ${logicalCSS('margin-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      ${logicalCSS('height', euiTheme.size.l)}
      line-height: ${euiTheme.size.l};
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      border-radius: ${euiTheme.border.radius.small};
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &--preselected {
        background-color: ${euiTheme.focus.backgroundColor};
      }

      &--selected_year,
      &--selected_month {
        ${euiButtonFillColor(euiThemeContext, 'primary')}
      }

      /* Hide checkmark next to selected option */
      &--selected {
        display: none;
      }
    }
  `;
};

export const _dayCalendarStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const { gapSize } = euiDatePickerVariables(euiThemeContext);

  const daySize = euiTheme.size.xl;
  const dayMargin = mathWithUnits(gapSize, (x) => x / 2);
  const rangeBackgroundColor = euiButtonColor(
    euiThemeContext,
    'primary'
  ).backgroundColor;
  const rangeMarginOffset = mathWithUnits(dayMargin, (x) => x * 1.5);

  const animationSpeed = euiTheme.animation.fast;

  return css`
    .react-datepicker__day-names,
    .react-datepicker__week {
      display: flex;
      /* stylelint-disable no-extra-semicolons */
      justify-content: space-between;
      flex-grow: 1;
      color: ${euiTheme.colors.subduedText};
    }

    .react-datepicker__day-name,
    .react-datepicker__day {
      display: inline-block;
      ${logicalCSS('width', daySize)}
      line-height: ${daySize};
      margin: ${dayMargin};
      font-weight: ${euiTheme.font.weight.medium};
      text-align: center;
    }

    .react-datepicker__day {
      color: ${euiTheme.colors.title};
      border-radius: ${euiTheme.border.radius.small};

      ${euiCanAnimate} {
        transition: transform ${animationSpeed} ease-in-out,
          background-color ${animationSpeed} ease-in;
      }

      &:hover {
        ${euiButtonColor(euiThemeContext, 'primary')}
        text-decoration: underline;
        cursor: pointer;

        /* Setting the transform under can animate because its jarring */
        ${euiCanAnimate} {
          transform: scale(1.1);
        }
      }

      &--today {
        color: ${euiTheme.colors.primary};
        font-weight: ${euiTheme.font.weight.bold};
      }

      &--outside-month {
        color: ${euiTheme.colors.subduedText};
      }

      &--highlighted,
      &--highlighted:hover {
        ${euiButtonColor(euiThemeContext, 'success')};
      }

      &--in-range,
      &--in-range:hover {
        ${euiButtonColor(euiThemeContext, 'primary')};
      }

      /* Ranges use 2 side box-shadows that are the same as the button
       * background to fill the gap between margins */
      /* stylelint-disable-next-line selector-not-notation */
      &--in-range:not(&--selected):not(:hover):not(&--disabled) {
        box-shadow: -${rangeMarginOffset} 0 ${rangeBackgroundColor},
          ${rangeMarginOffset} 0 ${rangeBackgroundColor};
        border-radius: 0;

        &:first-child {
          box-shadow: ${rangeMarginOffset} 0 ${rangeBackgroundColor};
        }

        &:last-child {
          box-shadow: -${rangeMarginOffset} 0 ${rangeBackgroundColor};
        }
      }
      /* Animate smoothly on hover */
      &--in-range:not(&--selected) {
        ${euiCanAnimate} {
          transition: transform ${animationSpeed} ease-in-out,
            box-shadow ${animationSpeed} ease-in-out,
            border-radius ${animationSpeed} ease-in-out,
            background-color ${animationSpeed} ease-in;
        }
      }

      &--selected,
      &--selected:hover,
      &--in-selecting-range,
      &--in-selecting-range:hover {
        ${euiButtonFillColor(euiThemeContext, 'primary')}
      }

      &--disabled,
      &--disabled:hover {
        ${euiButtonColor(euiThemeContext, 'disabled')}
        cursor: not-allowed;
        text-decoration: none;
        transform: none;
      }

      &--disabled.react-datepicker__day--in-range:not(&--selected) {
        &,
        &:hover {
          background-color: ${euiButtonEmptyColor(euiThemeContext, 'primary')
            .backgroundColor};
        }
      }

      &--in-selecting-range:not(&--in-range),
      &--disabled.react-datepicker__day--selected,
      &--disabled.react-datepicker__day--selected:hover {
        ${euiButtonColor(euiThemeContext, 'danger')}
      }
    }
  `;
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
