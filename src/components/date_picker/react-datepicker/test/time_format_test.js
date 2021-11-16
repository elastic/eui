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
import TimeComponent from "../src/time";
import moment from "moment";

describe("TimeComponent", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    // mock global time to June 14, 1990 13:28:12, so test results will be constant
    sandbox.useFakeTimers({
      now: moment("1990-06-14 13:28").valueOf(),
      toFake: ["Date"]
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Format", () => {
    it("should forward the time format provided in timeFormat props", () => {
      var timeComponent = mount(<TimeComponent format="HH:mm" />);

      var timeListItem = timeComponent.find(
        ".react-datepicker__time-list-item"
      );
      expect(timeListItem.at(0).text()).to.eq("00:00");
    });
  });

  describe("Initial position", () => {
    let spy;
    beforeEach(() => {
      spy = sandbox.spy(TimeComponent, "calcCenterPosition");
    });

    it("should call calcCenterPosition once", () => {
      mount(<TimeComponent format="HH:mm" />);
      expect(spy.calledOnce).to.eq(true);
    });

    it("should call calcCenterPosition with centerLi ref, closest to the current time", () => {
      mount(<TimeComponent format="HH:mm" />);
      expect(spy.args[0][1].innerHTML).to.eq("13:00");
    });

    it("should call calcCenterPosition with centerLi ref, closest to the selected time", () => {
      mount(
        <TimeComponent format="HH:mm" selected={moment("1990-06-14 08:11")} />
      );
      expect(spy.args[0][1].innerHTML).to.eq("08:00");
    });

    it("should call calcCenterPosition with centerLi ref, which is selected", () => {
      mount(
        <TimeComponent format="HH:mm" selected={moment("1990-06-14 08:00")} />
      );
      expect(
        spy.args[0][1].classList.contains(
          "react-datepicker__time-list-item--selected"
        )
      ).to.be.true;
    });

    it("should calculate scroll for the first item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 0,
          clientHeight: 50
        })
      ).to.be.eq(-75);
    });

    it("should calculate scroll for the last item of 4 (even) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(200, {
          offsetTop: 150,
          clientHeight: 50
        })
      ).to.be.eq(75);
    });

    it("should calculate scroll for the first item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, { offsetTop: 0, clientHeight: 30 })
      ).to.be.eq(-30);
    });

    it("should calculate scroll for the last item of 3 (odd) items list", () => {
      expect(
        TimeComponent.calcCenterPosition(90, {
          offsetTop: 60,
          clientHeight: 30
        })
      ).to.be.eq(30);
    });
  });
});
