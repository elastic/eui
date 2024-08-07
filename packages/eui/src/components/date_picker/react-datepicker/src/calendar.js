/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2018 HackerOne Inc and individual contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

import YearDropdown from "./year_dropdown";
import MonthDropdown from "./month_dropdown";
import MonthYearDropdown from "./month_year_dropdown";
import Month from "./month";
import Time from "./time";
import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import CalendarContainer from "./calendar_container";

import { EuiFocusTrap } from '../../../focus_trap';
import { EuiScreenReaderOnly } from '../../../accessibility/screen_reader_only';
import { EuiButtonIcon } from "../../../button";
import {
  now,
  setMonth,
  getMonth,
  addMonths,
  subtractMonths,
  getStartOfWeek,
  getStartOfDate,
  getStartOfMonth,
  addDays,
  cloneDate,
  formatDate,
  localizeDate,
  setYear,
  getYear,
  isBefore,
  isAfter,
  getLocaleData,
  getFormattedWeekdayInLocale,
  getWeekdayShortInLocale,
  getWeekdayMinInLocale,
  isSameDay,
  allDaysDisabledBefore,
  allDaysDisabledAfter,
  getEffectiveMinDate,
  getEffectiveMaxDate
} from "./date_utils";

const FocusTrapContainer = React.forwardRef((props, ref) => <div ref={ref} className="react-datepicker__focusTrap" {...props}/>);

const DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select"
];

const isDropdownSelect = (element = {}) => {
  const classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(
    testClassname => classNames.indexOf(testClassname) >= 0
  );
};

export default class Calendar extends React.Component {
  static propTypes = {
    adjustDateOnChange: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    container: PropTypes.func,
    dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
      .isRequired,
    dayClassName: PropTypes.func,
    disabledKeyboardNavigation: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(["scroll", "select"]),
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.instanceOf(Map),
    includeDates: PropTypes.array,
    includeTimes: PropTypes.array,
    injectTimes: PropTypes.array,
    inline: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    monthsShown: PropTypes.number,
    onClickOutside: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func,
    onYearChange: PropTypes.func,
    forceShowMonthNavigation: PropTypes.bool,
    onDropdownFocus: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    onWeekSelect: PropTypes.func,
    showTimeSelect: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    onTimeChange: PropTypes.func,
    minTime: PropTypes.object,
    maxTime: PropTypes.object,
    excludeTimes: PropTypes.array,
    timeCaption: PropTypes.string,
    openToDate: PropTypes.object,
    peekNextMonth: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    scrollableMonthYearDropdown: PropTypes.bool,
    preSelection: PropTypes.object,
    selected: PropTypes.object,
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showMonthYearDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.object,
    todayButton: PropTypes.node,
    useWeekdaysShort: PropTypes.bool,
    formatWeekDay: PropTypes.func,
    withPortal: PropTypes.bool,
    utcOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    weekLabel: PropTypes.string,
    yearDropdownItemNumber: PropTypes.number,
    setOpen: PropTypes.func,
    shouldCloseOnSelect: PropTypes.bool,
    useShortMonthInDropdown: PropTypes.bool,
    showDisabledMonthNavigation: PropTypes.bool,
    previousMonthButtonLabel: PropTypes.string,
    nextMonthButtonLabel: PropTypes.string,
    renderCustomHeader: PropTypes.func,
    renderDayContents: PropTypes.func,
    updateSelection: PropTypes.func.isRequired,
    accessibleMode: PropTypes.bool,
    enableFocusTrap: PropTypes.bool
  };

  static get defaultProps() {
    return {
      onDropdownFocus: () => {},
      monthsShown: 1,
      forceShowMonthNavigation: false,
      timeCaption: "Time",
      previousMonthButtonLabel: "Previous Month",
      nextMonthButtonLabel: "Next Month",
      enableFocusTrap: true
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      date: this.localizeDate(this.getDateInView()),
      selectingDate: null,
      monthContainer: null,
      pauseFocusTrap: false
    };
    this.monthRef = React.createRef();
    this.yearRef = React.createRef();
  }

  componentDidMount() {
    // monthContainer height is needed in time component
    // to determine the height for the ul in the time component
    // setState here so height is given after final component
    // layout is rendered
    if (this.props.showTimeSelect) {
      this.assignMonthContainer = (() => {
        this.setState({ monthContainer: this.monthContainer });
      })();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.preSelection &&
      !isSameDay(this.props.preSelection, prevProps.preSelection)
    ) {
      this.setState({
        date: this.localizeDate(this.props.preSelection)
      });
    } else if (
      this.props.openToDate &&
      !isSameDay(this.props.openToDate, prevProps.openToDate)
    ) {
      this.setState({
        date: this.localizeDate(this.props.openToDate)
      });
    }
  }

  setMonthRef = (node) => {
    this.monthRef = node;
  }

  setYearRef = (node) => {
    this.yearRef = node;
  }

  handleOnDropdownToggle = (isOpen, dropdown) => {
    this.setState({pauseFocusTrap: isOpen});
    if (!isOpen) {
      const element = dropdown === 'month' ? this.monthRef : this.yearRef;
      if (element) {
        // The focus trap has been unpaused and will reinitialize focus
        // but does so on the wrong element (calendar)
        // This refocuses the previous element (dropdown button).
        // Duration arrived at by trial-and-error.
        setTimeout(() => element.focus(), 25);
      }
    }
  }

  handleClickOutside = event => {
    this.props.onClickOutside(event);
  };

  handleDropdownFocus = event => {
    if (isDropdownSelect(event.target)) {
      this.props.onDropdownFocus();
    }
  };

  getDateInView = () => {
    const { preSelection, selected, openToDate, utcOffset } = this.props;
    const minDate = getEffectiveMinDate(this.props);
    const maxDate = getEffectiveMaxDate(this.props);
    const current = now(utcOffset);
    const initialDate = openToDate || selected || preSelection;
    if (initialDate) {
      return initialDate;
    } else {
      if (minDate && isBefore(current, minDate)) {
        return minDate;
      } else if (maxDate && isAfter(current, maxDate)) {
        return maxDate;
      }
    }
    return current;
  };

  localizeDate = date => localizeDate(date, this.props.locale);

  increaseMonth = () => {
    this.setState(
      {
        date: addMonths(cloneDate(this.state.date), 1)
      },
      () => this.handleMonthChange(this.state.date)
    );
  };

  decreaseMonth = () => {
    this.setState(
      {
        date: subtractMonths(cloneDate(this.state.date), 1)
      },
      () => this.handleMonthChange(this.state.date)
    );
  };

  handleDayClick = (day, event) => this.props.onSelect(day, event);

  handleDayMouseEnter = day => this.setState({ selectingDate: day });

  handleMonthMouseLeave = () => this.setState({ selectingDate: null });

  handleYearChange = date => {
    if (this.props.onYearChange) {
      this.props.onYearChange(date);
    }
    if (this.props.accessibleMode) {
      this.handleSelectionChange(date);
    }
  };

  handleMonthChange = date => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(date);
    }
    if (this.props.accessibleMode) {
      this.handleSelectionChange(date);
    }
  };

  handleSelectionChange = date => {
    if (this.props.adjustDateOnChange) {
      this.props.updateSelection(date);
    } else {
      this.props.updateSelection(getStartOfMonth(cloneDate(date)));
    }
  }

  handleMonthYearChange = date => {
    this.handleYearChange(date);
    this.handleMonthChange(date);
  };

  changeYear = year => {
    this.setState(
      {
        date: setYear(cloneDate(this.state.date), year)
      },
      () => this.handleYearChange(this.state.date)
    );
  };

  changeMonth = month => {
    this.setState(
      {
        date: setMonth(cloneDate(this.state.date), month)
      },
      () => this.handleMonthChange(this.state.date)
    );
  };

  changeMonthYear = monthYear => {
    this.setState(
      {
        date: setYear(
          setMonth(cloneDate(this.state.date), getMonth(monthYear)),
          getYear(monthYear)
        )
      },
      () => this.handleMonthYearChange(this.state.date)
    );
  };

  header = (date = this.state.date) => {
    const startOfWeek = getStartOfWeek(cloneDate(date));
    const dayNames = [];
    if (this.props.showWeekNumbers) {
      dayNames.push(
        <div key="W" className="react-datepicker__day-name">
          {this.props.weekLabel || "#"}
        </div>
      );
    }

    return dayNames.concat(
      [0, 1, 2, 3, 4, 5, 6].map(offset => {
        const day = addDays(cloneDate(startOfWeek), offset);
        const localeData = getLocaleData(day);
        const weekDayName = this.formatWeekday(localeData, day);
        const weekDayNameLong = localeData.weekdays(day);

        return (
          <div key={offset} className="react-datepicker__day-name">
            {/* we're using sr-only and aria-hidden here instead of aria-label as aria-label is
            not generally applied/read by screen readers for non-semantic element like div */}
            <span aria-hidden="true">{weekDayName}</span>
              <EuiScreenReaderOnly>
                <span>{weekDayNameLong}</span>
              </EuiScreenReaderOnly>
          </div>
        );
      })
    );
  };

  formatWeekday = (localeData, day) => {
    if (this.props.formatWeekDay) {
      return getFormattedWeekdayInLocale(
        localeData,
        day,
        this.props.formatWeekDay
      );
    }
    return this.props.useWeekdaysShort
      ? getWeekdayShortInLocale(localeData, day)
      : getWeekdayMinInLocale(localeData, day);
  };

  renderPreviousMonthButton = () => {
    if (this.props.renderCustomHeader) {
      return;
    }

    const allPrevDaysDisabled = allDaysDisabledBefore(
      this.state.date,
      "month",
      this.props
    );

    if (
      (!this.props.forceShowMonthNavigation &&
        !this.props.showDisabledMonthNavigation &&
        allPrevDaysDisabled) ||
      this.props.showTimeSelectOnly
    ) {
      return;
    }

    const classes = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--previous"
    ];

    let clickHandler = this.decreaseMonth;

    if (allPrevDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--previous--disabled");
      clickHandler = null;
    }

    return (
      <EuiButtonIcon
        iconType="sortLeft"
        size="s"
        color="text"
        className={classes.join(" ")}
        onClick={clickHandler}
        disabled={!this.props.accessibleMode}
        aria-label={this.props.previousMonthButtonLabel}
        title={this.props.previousMonthButtonLabel}
      />
    );
  };

  renderNextMonthButton = () => {
    if (this.props.renderCustomHeader) {
      return;
    }

    const allNextDaysDisabled = allDaysDisabledAfter(
      this.state.date,
      "month",
      this.props
    );

    if (
      (!this.props.forceShowMonthNavigation &&
        !this.props.showDisabledMonthNavigation &&
        allNextDaysDisabled) ||
      this.props.showTimeSelectOnly
    ) {
      return;
    }

    const classes = [
      "react-datepicker__navigation",
      "react-datepicker__navigation--next"
    ];
    if (this.props.showTimeSelect) {
      classes.push("react-datepicker__navigation--next--with-time");
    }
    if (this.props.todayButton) {
      classes.push("react-datepicker__navigation--next--with-today-button");
    }

    let clickHandler = this.increaseMonth;

    if (allNextDaysDisabled && this.props.showDisabledMonthNavigation) {
      classes.push("react-datepicker__navigation--next--disabled");
      clickHandler = null;
    }

    return (
      <EuiButtonIcon
        iconType="sortRight"
        size="s"
        color="text"
        className={classes.join(" ")}
        onClick={clickHandler}
        disabled={!this.props.accessibleMode}
        aria-label={this.props.nextMonthButtonLabel}
        title={this.props.nextMonthButtonLabel}
      />
    );
  };

  renderYearDropdown = (overrideHide = false) => {
    if (!this.props.showYearDropdown || overrideHide) {
      return;
    }
    return (
      <YearDropdown
        adjustDateOnChange={this.props.adjustDateOnChange}
        date={this.state.date}
        onSelect={this.props.onSelect}
        setOpen={this.props.setOpen}
        dropdownMode={this.props.dropdownMode}
        onChange={this.changeYear}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        year={getYear(this.state.date)}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
        accessibleMode={this.props.accessibleMode}
        onDropdownToggle={this.handleOnDropdownToggle}
        buttonRef={this.setYearRef}
      />
    );
  };

  renderMonthDropdown = (overrideHide = false) => {
    if (!this.props.showMonthDropdown || overrideHide) {
      return;
    }
    return (
      <MonthDropdown
        dropdownMode={this.props.dropdownMode}
        locale={this.props.locale}
        dateFormat={this.props.dateFormat}
        onChange={this.changeMonth}
        month={getMonth(this.state.date)}
        useShortMonthInDropdown={this.props.useShortMonthInDropdown}
        accessibleMode={this.props.accessibleMode}
        onDropdownToggle={this.handleOnDropdownToggle}
        buttonRef={this.setMonthRef}
      />
    );
  };

  renderMonthYearDropdown = (overrideHide = false) => {
    if (!this.props.showMonthYearDropdown || overrideHide) {
      return;
    }
    return (
      <MonthYearDropdown
        dropdownMode={this.props.dropdownMode}
        locale={this.props.locale}
        dateFormat={this.props.dateFormat}
        onChange={this.changeMonthYear}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        date={this.state.date}
        scrollableMonthYearDropdown={this.props.scrollableMonthYearDropdown}
        accessibleMode={this.props.accessibleMode}
      />
    );
  };

  renderTodayButton = () => {
    if (!this.props.todayButton || this.props.showTimeSelectOnly) {
      return;
    }
    return (
      <div
        className="react-datepicker__today-button"
        onClick={e =>
          this.props.onSelect(getStartOfDate(now(this.props.utcOffset)), e)
        }
      >
        {this.props.todayButton}
      </div>
    );
  };

  renderDefaultHeader = ({ monthDate, i }) => (
    <div className="react-datepicker__header">
      <div
        className={`react-datepicker__header__dropdown react-datepicker__header__dropdown--${
          this.props.dropdownMode
        }`}
        onFocus={this.handleDropdownFocus}
      >
        {this.renderMonthDropdown(i !== 0)}
        {this.renderMonthYearDropdown(i !== 0)}
        {this.renderYearDropdown(i !== 0)}
      </div>
      <div className="react-datepicker__day-names">
        {this.header(monthDate)}
      </div>
    </div>
  );

  renderCustomHeader = ({ monthDate, i }) => {
    if (i !== 0) {
      return null;
    }

    const prevMonthButtonDisabled = allDaysDisabledBefore(
      this.state.date,
      "month",
      this.props
    );

    const nextMonthButtonDisabled = allDaysDisabledAfter(
      this.state.date,
      "month",
      this.props
    );

    return (
      <div
        className="react-datepicker__header react-datepicker__header--custom"
        onFocus={this.props.onDropdownFocus}
      >
        {this.props.renderCustomHeader({
          ...this.state,
          changeMonth: this.changeMonth,
          changeYear: this.changeYear,
          decreaseMonth: this.decreaseMonth,
          increaseMonth: this.increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        })}
        <div className="react-datepicker__day-names">
          {this.header(monthDate)}
        </div>
      </div>
    );
  };

  renderMonths = () => {
    if (this.props.showTimeSelectOnly) {
      return;
    }

    var monthList = [];
    for (var i = 0; i < this.props.monthsShown; ++i) {
      var monthDate = addMonths(cloneDate(this.state.date), i);
      var monthKey = `month-${i}`;
      monthList.push(
        <div
          key={monthKey}
          ref={div => {
            this.monthContainer = div;
          }}
          className="react-datepicker__month-container"
        >
          {this.props.renderCustomHeader
            ? this.renderCustomHeader({ monthDate, i })
            : this.renderDefaultHeader({ monthDate, i })}
          <Month
            day={monthDate}
            dayClassName={this.props.dayClassName}
            onDayClick={this.handleDayClick}
            onDayMouseEnter={this.handleDayMouseEnter}
            onMouseLeave={this.handleMonthMouseLeave}
            onWeekSelect={this.props.onWeekSelect}
            formatWeekNumber={this.props.formatWeekNumber}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            excludeDates={this.props.excludeDates}
            highlightDates={this.props.highlightDates}
            selectingDate={this.state.selectingDate}
            includeDates={this.props.includeDates}
            inline={this.props.inline}
            fixedHeight={this.props.fixedHeight}
            filterDate={this.props.filterDate}
            preSelection={this.props.preSelection}
            selected={this.props.selected}
            selectsStart={this.props.selectsStart}
            selectsEnd={this.props.selectsEnd}
            showWeekNumbers={this.props.showWeekNumbers}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            peekNextMonth={this.props.peekNextMonth}
            utcOffset={this.props.utcOffset}
            setOpen={this.props.setOpen}
            shouldCloseOnSelect={this.props.shouldCloseOnSelect}
            renderDayContents={this.props.renderDayContents}
            disabledKeyboardNavigation={this.props.disabledKeyboardNavigation}
            updateSelection={this.props.updateSelection}
            accessibleMode={this.props.accessibleMode}
          />
        </div>
      );
    }
    return monthList;
  };

  renderTimeSection = () => {
    if (
      this.props.showTimeSelect &&
      (this.state.monthContainer || this.props.showTimeSelectOnly)
    ) {
      return (
        <Time
          selected={this.props.selected}
          onChange={this.props.onTimeChange}
          format={this.props.timeFormat}
          includeTimes={this.props.includeTimes}
          intervals={this.props.timeIntervals}
          minTime={this.props.minTime}
          maxTime={this.props.maxTime}
          excludeTimes={this.props.excludeTimes}
          timeCaption={this.props.timeCaption}
          todayButton={this.props.todayButton}
          showMonthDropdown={this.props.showMonthDropdown}
          showMonthYearDropdown={this.props.showMonthYearDropdown}
          showYearDropdown={this.props.showYearDropdown}
          withPortal={this.props.withPortal}
          monthRef={this.state.monthContainer}
          injectTimes={this.props.injectTimes}
          accessibleMode={this.props.accessibleMode}
        />
      );
    }
  };

  render() {
    const Container = this.props.container || CalendarContainer;

    const classes = classnames("react-datepicker", this.props.className, {
      "react-datepicker--time-only": this.props.showTimeSelectOnly,
      "react-datepicker--non-interactive": !this.props.isCalendarInteractive,
    });

    const trapFocus = this.props.accessibleMode && !this.props.inline;
    const initialFocusTarget = this.props.showTimeSelectOnly
      ? ".react-datepicker__time-box--accessible"
      : ".react-datepicker__month--accessible";

    if (trapFocus) {
      return (
        <Container className={classes}>
          <EuiFocusTrap
            disabled={this.state.pauseFocusTrap || !this.props.enableFocusTrap}
            className="react-datepicker__focusTrap"
            initialFocus={initialFocusTarget}
            onClickOutside={this.handleClickOutside}
          >
            {this.renderPreviousMonthButton()}
            {this.renderNextMonthButton()}
            {this.renderMonths()}
            {this.renderTodayButton()}
            {this.renderTimeSection()}
            {this.props.children}
          </EuiFocusTrap>
        </Container>
      );
    } else {
      return (
        <Container className={classes}>
          {this.renderPreviousMonthButton()}
          {this.renderNextMonthButton()}
          {this.renderMonths()}
          {this.renderTodayButton()}
          {this.renderTimeSection()}
          {this.props.children}
        </Container>
      );
    }
  }
}
