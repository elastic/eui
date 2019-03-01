import React from 'react';
import { mount } from 'enzyme';

import { findTestSubject } from './find_test_subject';

describe('findTestSubject', () => {
  test('finds the specified element in a mounted component', () => {
    const TestComponent = () => <div data-test-subj="test" />;
    const component = mount(<TestComponent />);
    const element = findTestSubject(component, 'test');

    expect(element.length).toBe(1);
  });

  test('finds the specified element even if it has multiple identifiers', () => {
    const TestComponent = () => <div data-test-subj="test1 test2" />;
    const component = mount(<TestComponent />);
    const element = findTestSubject(component, 'test2');

    expect(element.length).toBe(1);
  });

  test('finds multiple elements with the same identifier', () => {
    const TestComponent = () => (
      <div>
        <div data-test-subj="test" />
        <div data-test-subj="test" />
      </div>
    );
    const component = mount(<TestComponent />);
    const element = findTestSubject(component, 'test');

    expect(element.length).toBe(2);
  });

  describe('matcher optional argument', () => {
    test('finds multiple elements with identifiers beginning with the same string', () => {
      const TestComponent = () => (
        <div>
          <div data-test-subj="test1" />
          <div data-test-subj="test2" />
        </div>
      );
      const component = mount(<TestComponent />);
      const element = findTestSubject(component, 'test', '^=');

      expect(element.length).toBe(2);
    });
  });
});
