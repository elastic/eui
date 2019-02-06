import React from 'react';
import { shallow } from 'enzyme';
import { EuiWindowEvent } from './window_event';

describe('EuiWindowEvent', () => {
  beforeEach(() => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('attaches handler to window event on mount', () => {
    const handler = () => null;
    shallow(<EuiWindowEvent event="click" handler={handler} />);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith('click', handler);
  });

  test('removes handler on unmount', () => {
    const handler = () => null;
    const wrapper = shallow(<EuiWindowEvent event="click" handler={handler} />);
    wrapper.unmount();
    expect(window.removeEventListener).toHaveBeenLastCalledWith(
      'click',
      handler
    );
  });

  test('removes and re-attaches handler to window event on update', () => {
    const handler1 = () => null;
    const handler2 = () => null;
    const wrapper = shallow(
      <EuiWindowEvent event="click" handler={handler1} />
    );

    expect(window.addEventListener).toHaveBeenLastCalledWith('click', handler1);

    wrapper.setProps({ event: 'hover', handler: handler2 });

    expect(window.removeEventListener).toHaveBeenLastCalledWith(
      'click',
      handler1
    );
    expect(window.addEventListener).toHaveBeenLastCalledWith('hover', handler2);
  });

  test('does not remove or re-attach handler if update is irrelevant', () => {
    const handler = () => null;
    const wrapper = shallow(<EuiWindowEvent event="click" handler={handler} />);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);

    wrapper.setProps({ whatever: 'ugh' });
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).not.toHaveBeenCalled();
  });
});
