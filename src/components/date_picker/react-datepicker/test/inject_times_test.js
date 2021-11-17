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
import * as utils from "../src/date_utils";
import { setTime, cloneDate, newDate } from "../src/date_utils";
import TimeComponent from "../src/time";

function cloneDateWithTime(date, time) {
  return setTime(cloneDate(date), time);
}

describe("TimeComponent", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should show times specified in injectTimes props", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        injectTimes={[
          utils.addMinutes(cloneDate(today), 1),
          utils.addMinutes(cloneDate(today), 725),
          utils.addMinutes(cloneDate(today), 1439)
        ]}
      />
    );

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems).to.have.length(3);
  });

  it("should not affect existing time intervals", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(cloneDate(today), 0),
          utils.addMinutes(cloneDate(today), 60),
          utils.addMinutes(cloneDate(today), 1440)
        ]}
      />
    );

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems).to.have.length(0);
  });

  it("should allow multiple injected times per interval", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(cloneDate(today), 1),
          utils.addMinutes(cloneDate(today), 2),
          utils.addMinutes(cloneDate(today), 3)
        ]}
      />
    );

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems).to.have.length(3);
  });

  it("should sort injected times automatically", () => {
    const today = utils.getStartOfDay(utils.newDate());
    const timeComponent = mount(
      <TimeComponent
        timeIntervals={60}
        injectTimes={[
          utils.addMinutes(cloneDate(today), 3),
          utils.addMinutes(cloneDate(today), 1),
          utils.addMinutes(cloneDate(today), 2)
        ]}
      />
    );

    const injectedItems = timeComponent.find(
      ".react-datepicker__time-list-item--injected"
    );
    expect(injectedItems.map(node => node.text())).eql([
      "12:01 AM",
      "12:02 AM",
      "12:03 AM"
    ]);
  });
});
