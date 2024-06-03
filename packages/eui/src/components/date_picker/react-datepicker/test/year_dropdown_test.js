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

import React from 'react';
import YearDropdown from '../src/year_dropdown.jsx';
import YearDropdownOptions from '../src/year_dropdown_options.jsx';
import { mount } from 'enzyme';
import { newDate } from '../src/date_utils';

const range = (start, end, step = 1) =>
  Array.from(
    { length: (end - start + step - 1) / step },
    (_, i) => i * step + start
  );

describe('YearDropdown', () => {
  var yearDropdown;
  var lastOnChangeValue;

  function onChangeMock(value) {
    lastOnChangeValue = value;
  }

  function getYearDropdown(overrideProps) {
    return mount(
      <YearDropdown
        dropdownMode="scroll"
        year={2015}
        onChange={onChangeMock}
        {...overrideProps}
      />
    );
  }

  beforeEach(() => {
    lastOnChangeValue = null;
  });

  describe('scroll mode', () => {
    beforeEach(function() {
      yearDropdown = getYearDropdown();
    });

    it('shows the selected year in the initial view', () => {
      expect(yearDropdown.text()).to.contain('2015');
    });

    it('starts with the year options list hidden', () => {
      var optionsView = yearDropdown.find(YearDropdownOptions);
      expect(optionsView).to.have.length(0);
    });

    it('opens a list when read view is clicked', () => {
      yearDropdown.find('.react-datepicker__year-read-view').simulate('click');
      var optionsView = yearDropdown.find(YearDropdownOptions);
      expect(optionsView).to.exist;
    });

    it('closes the dropdown when a year is clicked', () => {
      yearDropdown.find('.react-datepicker__year-read-view').simulate('click');
      yearDropdown
        .find('.react-datepicker__year-option')
        .at(1)
        .simulate('click');
      expect(yearDropdown.find(YearDropdownOptions)).to.have.length(0);
    });

    it('does not call the supplied onChange function when the same year is clicked', () => {
      yearDropdown.find('.react-datepicker__year-read-view').simulate('click');
      yearDropdown
        .find('.react-datepicker__year-option')
        .at(6)
        .simulate('click');
      expect(lastOnChangeValue).to.be.null;
    });

    it('calls the supplied onChange function when a different year is clicked', () => {
      yearDropdown.find('.react-datepicker__year-read-view').simulate('click');
      yearDropdown
        .find('.react-datepicker__year-option')
        .at(7)
        .simulate('click');
      expect(lastOnChangeValue).to.eq(2014);
    });
  });

  describe('select mode', () => {
    it('renders a select with default year range options', () => {
      yearDropdown = getYearDropdown({ dropdownMode: 'select' });
      const select = yearDropdown.find('.react-datepicker__year-select');
      expect(select).to.have.length(1);
      expect(select.prop('value')).to.eq(2015);

      const options = select.find('option');
      expect(options.map(o => o.text())).to.eql(
        range(1900, 2101).map(n => `${n}`)
      );
    });

    it('renders a select with min and max year range options', () => {
      yearDropdown = getYearDropdown({
        dropdownMode: 'select',
        minDate: newDate('1988-01-01'),
        maxDate: newDate('2016-01-01'),
      });
      const select = yearDropdown.find('.react-datepicker__year-select');
      expect(select).to.have.length(1);
      expect(select.prop('value')).to.eq(2015);

      const options = select.find('option');
      expect(options.map(o => o.text())).to.eql(
        range(1988, 2017).map(n => `${n}`)
      );
    });

    it('does not call the supplied onChange function when the same year is clicked', () => {
      yearDropdown = getYearDropdown({ dropdownMode: 'select' });
      const select = yearDropdown.find('.react-datepicker__year-select');
      select.simulate('click', { target: { value: 2015 } });
      expect(lastOnChangeValue).to.be.null;
    });

    it('calls the supplied onChange function when a different year is clicked', () => {
      yearDropdown = getYearDropdown({ dropdownMode: 'select' });
      const select = yearDropdown.find('.react-datepicker__year-select');
      select.simulate('change', { target: { value: 2014 } });
      expect(lastOnChangeValue).to.eq(2014);
    });
  });
});
