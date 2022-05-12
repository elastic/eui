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
import DatePicker from "../src/index.jsx";
import * as utils from "../src/date_utils";

class TimezoneDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { startDate: null, utcOffset: -4 };
  }

  handleChange(date) {
    this.setState({ startDate: date });
  }

  render() {
    var selected =
      this.state.startDate &&
      utils.setUTCOffset(
        utils.cloneDate(this.state.startDate),
        this.state.utcOffset
      );

    return (
      <DatePicker
        utcOffset={this.state.utcOffset}
        dateFormat="YYYY-MM-DD HH:mm"
        selected={selected}
        onChange={this.handleChange}
      />
    );
  }
}

export default TimezoneDatePicker;
