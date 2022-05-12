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
import YearDropdownOptions from "./year_dropdown_options";
import { getYear } from "./date_utils";

export default class YearDropdown extends React.Component {
  static propTypes = {
    adjustDateOnChange: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(["scroll", "select"]).isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    scrollableYearDropdown: PropTypes.bool,
    year: PropTypes.number.isRequired,
    yearDropdownItemNumber: PropTypes.number,
    date: PropTypes.object,
    onSelect: PropTypes.func,
    setOpen: PropTypes.func,
    accessibleMode: PropTypes.bool,
    onDropdownToggle: PropTypes.func,
    buttonRef: PropTypes.func
  };

  state = {
    dropdownVisible: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.accessibleMode && // in accessibleMode
      prevState.dropdownVisible !== this.state.dropdownVisible && // dropdown visibility changed
      this.state.dropdownVisible === false // dropdown is no longer visible
    ) {
      this.readViewref.focus();
    }
  }

  setReadViewRef = ref => {
    this.readViewref = ref;
    this.props.buttonRef(ref);
  };

  onReadViewKeyDown = event => {
    const eventKey = event.key;
    switch (eventKey) {
      case " ":
      case "Enter":
        event.preventDefault();
        event.stopPropagation();
        this.toggleDropdown();
        break;
    }
  };

  onDropDownKeyDown = event => {
    const eventKey = event.key;
    switch (eventKey) {
      case " ":
      case "Enter":
        event.preventDefault();
        event.stopPropagation();
        this.toggleDropdown();
        break;
    }
  };

  renderSelectOptions = () => {
    const minYear = this.props.minDate ? getYear(this.props.minDate) : 1900;
    const maxYear = this.props.maxDate ? getYear(this.props.maxDate) : 2100;

    const options = [];
    for (let i = minYear; i <= maxYear; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  onSelectChange = e => {
    this.onChange(e.target.value);
  };

  renderSelectMode = () => (
    <select
      value={this.props.year}
      className="react-datepicker__year-select"
      onChange={this.onSelectChange}
    >
      {this.renderSelectOptions()}
    </select>
  );

  renderReadView = visible => (
    <div
      key="read"
      ref={this.setReadViewRef}
      style={{ visibility: visible ? "visible" : "hidden" }}
      className="react-datepicker__year-read-view"
      onClick={event => this.toggleDropdown(event)}
      onKeyDown={this.onReadViewKeyDown}
      tabIndex={this.props.accessibleMode ? "0" : undefined}
      aria-label={`Button. Open the year selector. ${
        this.props.year
      } is currently selected.`}
    >
      <span className="react-datepicker__year-read-view--down-arrow" />
      <span className="react-datepicker__year-read-view--selected-year">
        {this.props.year}
      </span>
    </div>
  );

  renderDropdown = () => (
    <YearDropdownOptions
      key="dropdown"
      ref="options"
      year={this.props.year}
      onChange={this.onChange}
      onCancel={this.toggleDropdown}
      minDate={this.props.minDate}
      maxDate={this.props.maxDate}
      scrollableYearDropdown={this.props.scrollableYearDropdown}
      yearDropdownItemNumber={this.props.yearDropdownItemNumber}
      accessibleMode={this.props.accessibleMode}
    />
  );

  renderScrollMode = () => {
    const { dropdownVisible } = this.state;
    let result = [this.renderReadView(!dropdownVisible)];
    if (dropdownVisible) {
      result.unshift(this.renderDropdown());
    }
    return result;
  };

  onChange = year => {
    this.toggleDropdown();
    if (year === this.props.year) return;
    this.props.onChange(year);
  };

  toggleDropdown = () => {
    const isOpen = !this.state.dropdownVisible;
    this.setState({
      dropdownVisible: isOpen
    });
    this.props.onDropdownToggle(isOpen, 'year');
  };

  onSelect = (date, event) => {
    if (this.props.onSelect) {
      this.props.onSelect(date, event);
    }
  };

  render() {
    let renderedDropdown;
    switch (this.props.dropdownMode) {
      case "scroll":
        renderedDropdown = this.renderScrollMode();
        break;
      case "select":
        renderedDropdown = this.renderSelectMode();
        break;
    }

    return (
      <div
        className={`react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--${
          this.props.dropdownMode
        }`}
      >
        {renderedDropdown}
      </div>
    );
  }
}
