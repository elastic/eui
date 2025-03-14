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
  logicalSizeCSS,
  mathWithUnits,
} from '../../global_styling';
import { highContrastModeStyles } from '../../global_styling/functions/high_contrast';
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

export const euiDatePickerVariables = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const unsetHighContrastBorder = <T extends object>(styles: T) => ({
    ...styles,
    border: undefined,
  });

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

    colors: {
      day: {
        inMonth: euiTheme.colors.textHeading,
        outsideMonth: euiTheme.colors.textSubdued,
        header: euiTheme.colors.textSubdued,
        today: euiTheme.colors.primary,
      },

      hover: unsetHighContrastBorder(
        euiButtonColor(euiThemeContext, 'primary')
      ),
      disabled: unsetHighContrastBorder(
        euiButtonColor(euiThemeContext, 'disabled')
      ),

      get inRange() {
        return this.hover;
      },
      inRangeAndDisabled: {
        backgroundColor: euiButtonEmptyColor(euiThemeContext, 'primary')
          .backgroundColor,
      },

      selected:
        highContrastMode !== 'forced'
          ? euiButtonFillColor(euiThemeContext, 'primary')
          : {
              color: euiTheme.colors.emptyShade,
              backgroundColor: euiTheme.colors.fullShade,
              forcedColorAdjust: 'none',
            },
      selectedAndDisabled:
        highContrastMode !== 'forced'
          ? euiButtonColor(euiThemeContext, 'danger')
          : {
              color: euiTheme.colors.textDanger,
              backgroundColor: euiTheme.colors.emptyShade,
              border: `${euiTheme.border.width.thin} solid ${euiTheme.colors.textDanger};`,
            },

      highlighted: euiButtonColor(euiThemeContext, 'success'),
    },

    animationSpeed: euiTheme.animation.fast,
  };
};
type DatePickerVars = ReturnType<typeof euiDatePickerVariables>;

export const euiReactDatePickerStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const datePickerVars = euiDatePickerVariables(euiThemeContext);
  const { gapSize, paddingSize, headerOffset } = datePickerVars;

  return {
    euiReactDatePicker: css`
      display: flex;
      justify-content: center;
      padding: ${paddingSize};
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      color: ${euiTheme.colors.textParagraph};
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

      ${_monthYearDropdowns(euiThemeContext, datePickerVars)}
      ${_dayCalendarStyles(euiThemeContext, datePickerVars)}
      ${_timeSelectStyles(euiThemeContext, datePickerVars)}
    `,
  };
};

const _monthYearDropdowns = (
  euiThemeContext: UseEuiTheme,
  { colors }: DatePickerVars
) => {
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
      ${euiShadowSmall(euiThemeContext, { borderAllInHighContrastMode: true })}
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
      display: flex;
      align-items: center;
      ${logicalCSS('height', euiTheme.size.l)}
      ${logicalCSS('margin-vertical', euiTheme.size.xs)}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      font-size: ${euiFontSize(euiThemeContext, 's').fontSize};
      border-radius: ${euiTheme.border.radius.small};
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &--preselected {
        ${colors.hover}
      }

      &--selected_year,
      &--selected_month {
        ${colors.selected}
      }

      /* Hide checkmark next to selected option */
      &--selected {
        display: none;
      }
    }
  `;
};

const _dayCalendarStyles = (
  euiThemeContext: UseEuiTheme,
  { gapSize, colors, animationSpeed }: DatePickerVars
) => {
  const { euiTheme } = euiThemeContext;

  const daySize = euiTheme.size.xl;
  const dayMargin = mathWithUnits(gapSize, (x) => x / 2);
  const rangeMarginOffset = mathWithUnits(dayMargin, (x) => x * 1.5);

  return css`
    .react-datepicker__day-names,
    .react-datepicker__week {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      color: ${colors.day.header};
    }

    .react-datepicker__day-name,
    .react-datepicker__day {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      ${logicalSizeCSS(daySize)}
      margin: ${dayMargin};
      font-weight: ${euiTheme.font.weight.medium};
    }

    .react-datepicker__day {
      color: ${colors.day.inMonth};
      border-radius: ${euiTheme.border.radius.small};

      ${euiCanAnimate} {
        transition: transform ${animationSpeed} ease-in-out,
          background-color ${animationSpeed} ease-in;
      }

      &:hover {
        ${colors.hover}
        text-decoration: underline;
        cursor: pointer;

        /* Setting the transform under can animate because its jarring */
        ${euiCanAnimate} {
          transform: scale(1.1);
        }
      }

      &--today {
        color: ${colors.day.today};
        font-weight: ${euiTheme.font.weight.bold};
      }

      &--outside-month {
        color: ${colors.day.outsideMonth};
      }

      &--highlighted,
      &--highlighted:hover {
        ${colors.highlighted}
      }

      &--in-range,
      &--in-range:hover {
        ${colors.inRange}
      }

      ${highContrastModeStyles(euiThemeContext, {
        // Ranges use 2 side box-shadows that are the same as the button
        // background to fill the gap between margins
        none: `
          &--in-range:not(&--selected):not(:hover):not(&--disabled) {
            box-shadow: -${rangeMarginOffset} 0 ${colors.inRange.backgroundColor},
              ${rangeMarginOffset} 0 ${colors.inRange.backgroundColor};
            border-radius: 0;

            &:first-child {
              box-shadow: ${rangeMarginOffset} 0 ${colors.inRange.backgroundColor};
            }

            &:last-child {
              box-shadow: -${rangeMarginOffset} 0 ${colors.inRange.backgroundColor};
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
        `,
        // In Windows high contrast mode, use borders and pseudo elements instead of background colors
        forced: `
          &--in-range:not(&--selected) {
            position: relative;
            transform: none;

            &::before {
              content: '';
              position: absolute;
              inset-inline: -${dayMargin};
              inset-block: ${dayMargin};
              border-block: ${euiTheme.border.thin};
              pointer-events: none;
            }
          }
          &--range-start:not(&--selected)::before {
            border-inline-start: ${euiTheme.border.thin};
          }
          &--range-end:not(&--selected)::before {
            border-inline-end: ${euiTheme.border.thin};
          }
        `,
      })}

      &--selected,
      &--selected:hover,
      &--in-selecting-range,
      &--in-selecting-range:hover {
        ${colors.selected}
      }

      &--disabled,
      &--disabled:hover {
        ${colors.disabled}
        ${highContrastModeStyles(euiThemeContext, {
          forced: 'opacity: 0.5;',
        })}
        cursor: not-allowed;
        text-decoration: none;
        transform: none;
      }

      &--disabled.react-datepicker__day--in-range:not(&--selected) {
        &,
        &:hover {
          ${colors.inRangeAndDisabled}
        }
      }

      &--in-selecting-range:not(&--in-range),
      &--disabled.react-datepicker__day--selected,
      &--disabled.react-datepicker__day--selected:hover {
        ${colors.selectedAndDisabled}
        ${highContrastModeStyles(euiThemeContext, {
          forced: 'opacity: 1;',
        })}
      }
    }
  `;
};

const _timeSelectStyles = (
  euiThemeContext: UseEuiTheme,
  { gapSize, colors, animationSpeed }: DatePickerVars
) => {
  const { euiTheme } = euiThemeContext;

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
      display: flex;
      justify-content: align-center;
      align-items: center;
      ${logicalCSS('min-height', euiTheme.size.l)}
      ${logicalCSS('margin-horizontal', 'auto')}
      ${logicalCSS('padding-horizontal', euiTheme.size.s)}
      font-size: ${euiFontSize(euiThemeContext, 'xs').fontSize};
      font-weight: ${euiTheme.font.weight.medium};
      white-space: nowrap;
      border-radius: ${euiTheme.border.radius.small};

      &:not(:disabled):hover {
        text-decoration: underline;
        cursor: pointer;
      }

      &--disabled {
        cursor: not-allowed;
        color: ${colors.disabled.color};
      }

      &--injected {
        ${colors.highlighted}
      }

      &--selected {
        ${colors.selected}
      }

      /* closest current time but not selected (also applied when using arrow keys to indicate focus) */
      &--preselected {
        ${colors.hover}
        ${highContrastModeStyles(euiThemeContext, {
          // Use negative margins to offset the added border width
          forced: `
            border: ${euiTheme.border.thin};
            margin-inline: -${euiTheme.border.width.thin};
          `,
        })}
      }

      ${euiCanAnimate} {
        transition: background-color ${animationSpeed} ease-in;
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
