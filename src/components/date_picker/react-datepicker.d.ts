/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Type definitions for react-datepicker 1.8
// Project: https://github.com/Hacker0x01/react-datepicker
// Definitions by: Rajab Shakirov <https://github.com/radziksh>,
//                 Andrey Balokha <https://github.com/andrewBalekha>,
//                 Greg Smith <https://github.com/smrq>,
//                 Platon Pronko <https://github.com/Rogach>
//                 Roy Xue <https://github.com/royxue>
//                 Koala Human <https://github.com/KoalaHuman>
//                 Sean Kelley <https://github.com/seansfkelley>
//                 Justin Grant <https://github.com/justingrant>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from 'react';
import * as moment from 'moment';

type popperPlacement =
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start'
  | 'left'
  | 'left-end'
  | 'left-start'
  | 'right'
  | 'right-end'
  | 'right-start'
  | 'top'
  | 'top-end'
  | 'top-start';

export interface ReactDatePickerProps {
  /**
   * Whether changes to Year and Month (via dropdowns) should trigger `onChange`
   */
  adjustDateOnChange?: boolean;
  accessibleMode?: boolean;
  allowSameDay?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;

  /**
   * Optional class added to the calendar portion of datepicker
   */
  calendarClassName?: string;
  children?: React.ReactNode;

  /**
   * Added to the actual input of the calendar
   */
  className?: string;

  /**
   * Replaces the input with any node, like a button
   */
  customInput?: React.ReactNode;
  customInputRef?: string;

  /**
   * Accepts any moment format string
   */
  dateFormat?: string | string[];
  dateFormatCalendar?: string;
  dayClassName?(date: moment.Moment): string | null;
  disabled?: boolean;
  disabledKeyboardNavigation?: boolean;
  dropdownMode?: 'scroll' | 'select';
  endDate?: moment.Moment | null;
  excludeDates?: moment.Moment[];
  excludeTimes?: moment.Moment[];
  filterDate?(date: moment.Moment): boolean;
  fixedHeight?: boolean;
  forceShowMonthNavigation?: boolean;
  formatWeekNumber?(date: moment.Moment): string | number;
  highlightDates?: moment.Moment[];
  id?: string;
  includeDates?: moment.Moment[];
  includeTimes?: moment.Moment[];
  inline?: boolean;

  /**
   * Adds additional times to the time selector other then :30 increments
   */
  injectTimes?: moment.Moment[];
  isClearable?: boolean;

  /**
   * Switches the locale / display. "en-us", "zn-ch"...etc
   */
  locale?: moment.LocaleSpecifier;

  /**
   * The max date accepted (in moment format) as a selection
   */
  maxDate?: moment.Moment;

  /**
   * The max time accepted (in moment format) as a selection
   */
  maxTime?: moment.Moment;

  /**
   * The min date accepted (in moment format) as a selection
   */
  minDate?: moment.Moment;

  /**
   * The min time accepted (in moment format) as a selection
   */
  minTime?: moment.Moment;
  monthsShown?: number;
  name?: string;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;

  /**
   * What to do when the input changes
   */
  onChange?(
    date: moment.Moment | null,
    event?: React.SyntheticEvent<any>
  ): void;
  onChangeRaw?(event: React.FocusEvent<HTMLInputElement>): void;
  onClickOutside?(event: React.MouseEvent<HTMLDivElement>): void;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
  onMonthChange?(date: moment.Moment): void;
  onSelect?(date: moment.Moment, event?: React.SyntheticEvent<any>): void;
  onWeekSelect?(
    firstDayOfWeek: moment.Moment,
    weekNumber: string | number,
    event?: React.SyntheticEvent<any>
  ): void;
  onYearChange?(date: moment.Moment): void;
  openToDate?: moment.Moment;
  peekNextMonth?: boolean;
  placeholderText?: string;

  /**
   * Class applied to the popup, when inline is false
   */
  popperClassName?: string;
  popperContainer?(props: { children: React.ReactNode[] }): React.ReactNode;
  popperPlacement?: popperPlacement;
  preventOpenOnFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  scrollableMonthYearDropdown?: boolean;
  scrollableYearDropdown?: boolean;

  /**
   * The selected datetime (in moment format)
   */
  selected?: moment.Moment | null;
  selectsEnd?: boolean;
  selectsStart?: boolean;

  /**
   * Will close the popup on selection
   */
  shouldCloseOnSelect?: boolean;
  showDisabledMonthNavigation?: boolean;
  showMonthDropdown?: boolean;
  showMonthYearDropdown?: boolean;

  /**
   * Show the time selection alongside the calendar
   */
  showTimeSelect?: boolean;

  /**
   * Only show the time selector, not the calendar
   */
  showTimeSelectOnly?: boolean;
  showWeekNumbers?: boolean;
  showYearDropdown?: boolean;
  startDate?: moment.Moment | null;
  startOpen?: boolean;

  /**
   * Use Moment strict mode, allowing exact format matches only
   */
  strictParsing?: boolean;
  tabIndex?: number;
  timeCaption?: string;

  /**
   * The format of the time within the selector, in moment notation
   */
  timeFormat?: string;
  timeIntervals?: number;
  title?: string;
  todayButton?: string;
  useShortMonthInDropdown?: boolean;
  useWeekdaysShort?: boolean;
  utcOffset?: number;
  value?: string;
  weekLabel?: string;
  withPortal?: boolean;
  yearDropdownItemNumber?: number;
}
declare const ReactDatePicker: React.ClassicComponentClass<ReactDatePickerProps>;
export default ReactDatePicker;
