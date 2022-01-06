/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { mount, render } from 'enzyme';

import { findTestSubject } from '../../../test';

import { EuiScreenReaderStatus } from './screen_reader_status';

const content = (
  <p>
    This paragraph is not visibile to sighted users but will be read by
    screenreaders.
  </p>
);

describe('EuiScreenReaderStatus', () => {
  describe('with a static configuration', () => {
    it('is can be active', () => {
      const component = render(
        <EuiScreenReaderStatus id="test" isActive={true} updatePrecipitate={0}>
          {content}
        </EuiScreenReaderStatus>
      );

      expect(component).toMatchSnapshot();
    });

    it('is can be inactive', () => {
      const component = render(
        <EuiScreenReaderStatus id="test" isActive={false} updatePrecipitate={0}>
          {content}
        </EuiScreenReaderStatus>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('with dynamic properties', () => {
    const Component = () => {
      const [activeOptions, setActiveOptions] = useState(0);

      return (
        <div>
          <button
            data-test-subj="increment"
            onClick={() => setActiveOptions(1)}
          >
            Increment
          </button>
          <EuiScreenReaderStatus
            id="test"
            isActive={true}
            updatePrecipitate={activeOptions}
          >
            <p>Number of active options: {activeOptions}</p>
          </EuiScreenReaderStatus>
        </div>
      );
    };
    it('is rendered', () => {
      const component = mount(<Component />);

      expect(component).toMatchSnapshot();
    });

    it('toggles the active live region when changed', () => {
      const component = mount(<Component />);

      findTestSubject(component, 'increment').simulate('click');

      expect(component).toMatchSnapshot();
    });
  });
});
