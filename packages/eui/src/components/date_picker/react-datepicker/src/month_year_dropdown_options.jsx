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

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  addMonths,
  cloneDate,
  formatDate,
  getStartOfMonth,
  isAfter,
  isSameMonth,
  isSameYear,
  isBefore
} from "./date_utils";

import { EuiFocusTrap } from '../../../focus_trap';
import { EuiScreenReaderOnly } from '../../../accessibility';

function generateMonthYears(minDate, maxDate) {
  const list = [];

  const currDate = getStartOfMonth(cloneDate(minDate));
  const lastDate = getStartOfMonth(cloneDate(maxDate));

  while (!isAfter(currDate, lastDate)) {
    list.push(cloneDate(currDate));

    addMonths(currDate, 1);
  }

  return list;
}

export default class MonthYearDropdownOptions extends React.Component {
  static propTypes = {
    minDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    scrollableMonthYearDropdown: PropTypes.bool,
    date: PropTypes.object.isRequired,
    dateFormat: PropTypes.string.isRequired,
    accessibleMode: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      monthYearsList: generateMonthYears(
        this.props.minDate,
        this.props.maxDate
      ),
      preSelection: getStartOfMonth(cloneDate(this.props.date)),
      readInstructions: false
    };
  }

  componentDidMount() {
    if (this.preSelectionDiv) {
      this.preSelectionDiv.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.preSelectionDiv) {
      this.preSelectionDiv.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  renderOptions = () => {
    return this.state.monthYearsList.map(monthYear => {
      const monthYearPoint = monthYear.valueOf();

      const isSameMonthYear =
        isSameYear(this.props.date, monthYear) &&
        isSameMonth(this.props.date, monthYear);

      const isPreselectionSameMonthYear =
        isSameYear(this.state.preSelection, monthYear) &&
        isSameMonth(this.state.preSelection, monthYear);

      return (
        <div
          className={classNames("react-datepicker__month-year-option", {
            "--selected_month-year": isSameMonthYear,
            "react-datepicker__month-year-option--preselected":
              this.props.accessibleMode && isPreselectionSameMonthYear
          })}
          key={monthYearPoint}
          ref={div => {
            if (this.props.accessibleMode && isPreselectionSameMonthYear) {
              this.preSelectionDiv = div;
            }
          }}
          onClick={this.onChange.bind(this, monthYearPoint)}
        >
          {isSameMonthYear ? (
            <span className="react-datepicker__month-year-option--selected">
              ✓
            </span>
          ) : (
            ""
          )}
          {formatDate(monthYear, this.props.dateFormat)}
        </div>
      );
    });
  };

  onFocus = () => {
    if (this.props.accessibleMode) {
      this.setState({ readInstructions: true });
    }
  };

  onChange = monthYear => this.props.onChange(monthYear);

  handleClickOutside = () => {
    this.props.onCancel();
  };

  onInputKeyDown = event => {
    const eventKey = event.key;
    let newSelection;
    switch (eventKey) {
      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        newSelection = addMonths(cloneDate(this.state.preSelection), -1);
        break;
      case "ArrowDown":
        event.preventDefault();
        event.stopPropagation();
        newSelection = addMonths(cloneDate(this.state.preSelection), 1);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        this.props.onCancel();
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        event.stopPropagation();
        this.props.onChange(this.state.preSelection.valueOf());
        break;
    }
    if (newSelection) {
      const minMonthYear = this.state.monthYearsList[0];
      const maxMonthYear = this.state.monthYearsList[
        this.state.monthYearsList.length - 1
      ];
      if (isBefore(newSelection, minMonthYear)) newSelection = maxMonthYear;
      if (isAfter(newSelection, maxMonthYear)) newSelection = minMonthYear;
      this.setState({ preSelection: newSelection });
    }
  };

  render() {
    let dropdownClass = classNames({
      "react-datepicker__month-year-dropdown": true,
      "react-datepicker__month-year-dropdown--scrollable": this.props
        .scrollableMonthYearDropdown
    });

    let screenReaderInstructions;
    if (this.state.readInstructions) {
      screenReaderInstructions = (
        <p aria-live>
          You are focused on a month / year selector menu. Use the up and down
          arrows to select a month / year combination, then hit enter to confirm
          your selection.
          {formatDate(this.state.preSelection, this.props.dateFormat)} is the
          currently focused month / year.
        </p>
      );
    }

    return this.props.accessibleMode ? (
      <EuiFocusTrap onClickOutside={this.handleClickOutside}>
        <div
          className={dropdownClass}
          tabIndex="0"
          onKeyDown={this.onInputKeyDown}
          onFocus={this.onFocus}
        >
          <EuiScreenReaderOnly>
            <span>{screenReaderInstructions}</span>
          </EuiScreenReaderOnly>
          {this.renderOptions()}
        </div>
      </EuiFocusTrap>
    ) : (
      <div className={dropdownClass}>{this.renderOptions()}</div>
    );

    return <div className={dropdownClass}>{this.renderOptions()}</div>;
  }
}
