import React from 'react';
import { mount } from 'enzyme';
import { EuiDelayHide } from './index';

describe('when EuiDelayHide is visible initially', () => {
  function getWrapper() {
    jest.useFakeTimers();
    return mount(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
  }

  test('it should be visible initially', async () => {
    const wrapper = getWrapper();
    wrapper.setProps({ hide: true });
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 900ms', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(900);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 1100ms', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(1100);
    wrapper.setProps({});
    expect(wrapper.html()).toEqual(null);
  });

  test('it should be visible after 1100ms regardless of prop changes in-between', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ hide: true });
    wrapper.setProps({ hide: false });
    jest.advanceTimersByTime(1100);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should hide immediately after prop change, if it has been displayed for 1100ms', () => {
    const wrapper = getWrapper();
    const currentTime = Date.now();
    jest.advanceTimersByTime(1100);
    jest.spyOn(Date, 'now').mockReturnValue(currentTime + 1100);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    wrapper.setProps({ hide: true });
    expect(wrapper.html()).toEqual(null);
  });
});

describe('when EuiDelayHide parent updates', () => {
  it('should still hide correctly', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    wrapper.setProps({ hide: false });
    jest.advanceTimersByTime(1100);
    wrapper.setProps({}); // simulate parent component re-rendering
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(1100);

    expect(wrapper.html()).toEqual(null);
  });
});

describe('when EuiDelayHide is hidden initially', () => {
  function getWrapper() {
    jest.useFakeTimers();
    return mount(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
  }

  test('it should be hidden initially', async () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toEqual(null);
  });

  test('it should become visible immediately after prop change', async () => {
    const wrapper = getWrapper();
    wrapper.setProps({ hide: false });
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible for at least 1100ms before hiding', async () => {
    const wrapper = getWrapper();
    wrapper.setProps({ hide: false });
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(900);

    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    jest.advanceTimersByTime(200);
    wrapper.setProps({});
    expect(wrapper.html()).toEqual(null);
  });
});

describe('when EuiDelayHide is visible initially and has a minimumDuration of 2000ms ', () => {
  function getWrapper() {
    jest.useFakeTimers();
    const wrapper = mount(
      <EuiDelayHide
        hide={false}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    wrapper.setProps({ hide: true });
    return wrapper;
  }

  test('it should be visible initially', async () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 1900ms', () => {
    const wrapper = getWrapper();
    jest.advanceTimersByTime(1900);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 2100ms', () => {
    const wrapper = getWrapper();
    jest.advanceTimersByTime(2100);
    wrapper.setProps({});
    expect(wrapper.html()).toEqual(null);
  });
});

describe('when EuiDelayHide has been visible and become hidden', () => {
  it('should still be visible for the minimum duration the second time', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );

    wrapper.setProps({ hide: false });
    jest.advanceTimersByTime(1100);
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(100);
    wrapper.setProps({ hide: false });
    wrapper.setProps({ hide: true });

    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    jest.advanceTimersByTime(1100);
    wrapper.setProps({});

    expect(wrapper.html()).toEqual(null);
  });
});
