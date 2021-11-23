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
import classnames from "classnames";

import { EuiFocusTrap } from '../../../focus_trap';
import { EuiScreenReaderOnly } from '../../../accessibility';

export default class MonthDropdownOptions extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    accessibleMode: PropTypes.bool
  };

  constructor(...args) {
    super(...args);

    this.state = {
      preSelection: this.props.month,
      readInstructions: false
    };
  }

  renderOptions = () => {
    return this.props.monthNames.map((month, i) => (
      <div
        className={classnames("react-datepicker__month-option", {
          "react-datepicker__month-option--selected_month": this.props.month === i,
          "react-datepicker__month-option--preselected":
            this.props.accessibleMode && this.state.preSelection === i
        })}
        key={month}
        ref={month}
        onClick={this.onChange.bind(this, i)}
      >
        {this.props.month === i ? (
          <span className="react-datepicker__month-option--selected">✓</span>
        ) : (
          ""
        )}
        {month}
      </div>
    ));
  };

  onFocus = () => {
    if (this.props.accessibleMode) {
      this.setState({ readInstructions: true });
    }
  };

  onChange = month => this.props.onChange(month);

  handleClickOutside = () => this.props.onCancel();

  onInputKeyDown = event => {
    const eventKey = event.key;
    let selectionChange = 0;
    switch (eventKey) {
      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        selectionChange = -1;
        break;
      case "ArrowDown":
        event.preventDefault();
        event.stopPropagation();
        selectionChange = 1;
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
        this.props.onChange(this.state.preSelection);
        break;
    }
    if (selectionChange) {
      this.setState(({ preSelection }) => {
        let nextSelection = preSelection + selectionChange;
        if (nextSelection < 0) nextSelection = 11;
        if (nextSelection === 12) nextSelection = 0;
        return { preSelection: nextSelection };
      });
    }
  };

  render() {
    let screenReaderInstructions;
    if (this.state.readInstructions) {
      screenReaderInstructions = (
        <p aria-live>
          You are focused on a month selector menu. Use the up and down arrows
          to select a year, then hit enter to confirm your selection.
          {this.props.monthNames[this.state.preSelection]} is the currently
          focused month.
        </p>
      );
    }

    return this.props.accessibleMode ? (
      <EuiFocusTrap onClickOutside={this.handleClickOutside}>
        <div
          className="react-datepicker__month-dropdown"
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
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    );
  }
}
