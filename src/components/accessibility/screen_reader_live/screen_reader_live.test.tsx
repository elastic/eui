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

import { EuiScreenReaderLive } from './screen_reader_live';

const content = (
  <p>
    This paragraph is not visible to sighted users but will be read by
    screenreaders.
  </p>
);

describe('EuiScreenReaderLive', () => {
  describe('with a static configuration', () => {
    it('renders screen reader content when active', () => {
      const component = render(
        <EuiScreenReaderLive isActive={true}>{content}</EuiScreenReaderLive>
      );

      expect(component).toMatchSnapshot();
    });

    it('does not render screen reader content when inactive', () => {
      const component = render(
        <EuiScreenReaderLive isActive={false}>{content}</EuiScreenReaderLive>
      );

      expect(component).toMatchSnapshot();
    });

    it('accepts `role`', () => {
      const component = render(
        <EuiScreenReaderLive role="log">{content}</EuiScreenReaderLive>
      );

      expect(component).toMatchSnapshot();
    });

    it('accepts `aria-live`', () => {
      const component = render(
        <EuiScreenReaderLive aria-live="assertive">
          {content}
        </EuiScreenReaderLive>
      );

      expect(component).toMatchSnapshot();
    });

    it('accepts `focusRegionOnTextChange`', () => {
      const component = render(
        <EuiScreenReaderLive focusRegionOnTextChange>
          {content}
        </EuiScreenReaderLive>
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
          <EuiScreenReaderLive>
            <p>Number of active options: {activeOptions}</p>
          </EuiScreenReaderLive>
        </div>
      );
    };

    it('initially renders screen reader content in the first live region', () => {
      const component = render(<Component />);

      expect(component).toMatchSnapshot();
    });

    it('alternates rendering screen reader content into the second live region when changed/toggled', () => {
      const component = mount(<Component />);

      findTestSubject(component, 'increment').simulate('click');

      expect(component.render()).toMatchSnapshot();
    });
  });

  describe('with focus behavior', () => {
    it('sets focus correctly', () => {
      const component = mount(
        <EuiScreenReaderLive focusRegionOnTextChange={true}>
          {content}
        </EuiScreenReaderLive>
      );

      const focusableDiv = component.find('div').at(0);

      expect(focusableDiv.is(':focus')).toBe(true);
    });
  });
});
