/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { mount } from 'enzyme';

import { findTestSubject } from '../../../test';
import { render } from '../../../test/rtl';

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
      const { container } = render(
        <EuiScreenReaderLive isActive={true}>{content}</EuiScreenReaderLive>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('does not render screen reader content when inactive', () => {
      const { container } = render(
        <EuiScreenReaderLive isActive={false}>{content}</EuiScreenReaderLive>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts `role`', () => {
      const { container } = render(
        <EuiScreenReaderLive role="log">{content}</EuiScreenReaderLive>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts `aria-live`', () => {
      const { container } = render(
        <EuiScreenReaderLive aria-live="assertive">
          {content}
        </EuiScreenReaderLive>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('accepts `focusRegionOnTextChange`', () => {
      const { container } = render(
        <EuiScreenReaderLive focusRegionOnTextChange>
          {content}
        </EuiScreenReaderLive>
      );

      expect(container.firstChild).toMatchSnapshot();
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
      const { container } = render(<Component />);

      expect(container.firstChild).toMatchSnapshot();
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
