import React from 'react';
import { mount } from 'enzyme';
import { useDependentState } from './useDependentState';

describe('useDependentState', () => {
  it('sets the base state', () => {
    // this is a huge abuse of closure scope
    // but allows for jest's built in mock expect'ing
    let sourceValue = 2;
    const doubler = jest.fn(() => {
      return sourceValue * 2;
    });

    function Foo() {
      const [value] = useDependentState(doubler, [sourceValue]);

      return <div>{value}</div>;
    }

    // mount the component verify the state function was called with no previous state value
    const component = mount(<Foo />);
    expect(doubler).toHaveBeenCalledTimes(1);
    expect(doubler).toHaveBeenCalledWith();
    expect(component.text()).toBe('4'); // 2 * 2

    doubler.mockClear();

    // update the source value, force a re-render, and run checks
    sourceValue = 4;
    component.setProps({});
    expect(doubler).toHaveBeenCalledTimes(1);
    expect(doubler).toHaveBeenCalledWith(4); // check previous state value
    expect(component.text()).toBe('8'); // new value should be 4 * 2
  });
});
