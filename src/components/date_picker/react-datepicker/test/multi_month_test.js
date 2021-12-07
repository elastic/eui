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
import Calendar from "../src/calendar";
import Month from "../src/month";
import YearDropdown from "../src/year_dropdown";
import { shallow } from "enzyme";

describe("Multi month calendar", function() {
  var dateFormat = "MMMM YYYY";

  function getCalendar(extraProps) {
    return shallow(
      <Calendar
        dateFormat={dateFormat}
        onSelect={() => {}}
        onClickOutside={() => {}}
        hideCalendar={() => {}}
        dropdownMode="scroll"
        {...extraProps}
      />
    );
  }

  it("should render multiple months if the months property is present", () => {
    var calendar = getCalendar({ monthsShown: 2 });
    var months = calendar.find(Month);
    expect(months).to.have.length(2);
  });

  it("should render dropdown only on first month", () => {
    var calendar = getCalendar({ monthsShown: 2, showYearDropdown: true });
    var datepickers = calendar.find(YearDropdown);
    expect(datepickers).to.have.length(1);
  });
});
