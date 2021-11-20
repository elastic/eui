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
import { mount } from "enzyme";
import DatePicker from "../src/index.jsx";
import TimeComponent from "../src/time";

describe("DatePicker", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show time component when showTimeSelect prop is present", () => {
    var datePicker = mount(<DatePicker showTimeSelect />);
    var timeComponent = datePicker.find(TimeComponent);
    expect(timeComponent).to.exist;
  });

  it("should have custom time caption", () => {
    const timeComponent = mount(<TimeComponent timeCaption="Custom time" />);

    const caption = timeComponent.find(".react-datepicker-time__header");
    expect(caption.text()).to.equal("Custom time");
  });

  describe("Time Select Only", () => {
    var datePicker = mount(
      <DatePicker showTimeSelect showTimeSelectOnly todayButton="Today" />
    );

    it("should not show month container when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__month-container");
      expect(elem).to.have.length(0);
    });

    it("should not show previous month button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__navigation--previous");
      expect(elem).to.have.length(0);
    });

    it("should not show next month button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__navigation--next");
      expect(elem).to.have.length(0);
    });

    it("should not show today button when showTimeSelectOnly prop is present", () => {
      var elem = datePicker.find(".react-datepicker__today-button");
      expect(elem).to.have.length(0);
    });
  });
});
