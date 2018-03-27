import React from 'react';
import { mount } from 'enzyme';
import { EuiDelayHide } from './index';

describe('when EuiDelayHide is visible initially', () => {
  let wrapper;
  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(
      <EuiDelayHide
        hide={false}
        render={() => <div>Hello World</div>}
      />
    );
  });

  test('it should be visible initially', async () => {
    wrapper.setProps({ hide: true });
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 900ms', () => {
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(900);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 1100ms', () => {
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(1100);
    expect(wrapper.html()).toEqual(null);
  });

  test('it should be visible after 1100ms regardless of prop changes in-between', () => {
    wrapper.setProps({ hide: true });
    wrapper.setProps({ hide: false });
    jest.advanceTimersByTime(1100);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should hide immediately after prop change, if it has been displayed for 1100ms', () => {
    const currentTime = Date.now();
    jest.advanceTimersByTime(1100);
    jest.spyOn(Date, 'now').mockReturnValue(currentTime + 1100);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    wrapper.setProps({ hide: true });
    expect(wrapper.html()).toEqual(null);
  });
});

describe('when EuiDelayHide is hidden initially', () => {
  let wrapper;
  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(
      <EuiDelayHide hide={true} render={() => <div>Hello World</div>} />
    );
  });

  test('it should be hidden initially', async () => {
    expect(wrapper.html()).toEqual(null);
  });

  test('it should become visible immediately after prop change', async () => {
    wrapper.setProps({ hide: false });
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible for at least 1100ms before hiding', async () => {
    wrapper.setProps({ hide: false });
    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(900);

    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    jest.advanceTimersByTime(200);
    expect(wrapper.html()).toEqual(null);
  });
});

describe('when EuiDelayHide is visible initially and has a minimumDuration of 2000ms ', () => {
  let wrapper;
  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(
      <EuiDelayHide
        hide={false}
        minimumDuration={2000}
        render={() => <div>Hello World</div>}
      />
    );
    wrapper.setProps({ hide: true });
  });

  test('it should be visible initially', async () => {
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 1900ms', () => {
    jest.advanceTimersByTime(1900);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 2100ms', () => {
    jest.advanceTimersByTime(2100);
    expect(wrapper.html()).toEqual(null);
  });
});
