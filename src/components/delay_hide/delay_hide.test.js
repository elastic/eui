import React from 'react';
import { mount } from 'enzyme';
import { EuiDelayHide } from './index';

describe('when EuiDelayHide is visible initially and is changed to hidden', () => {
  let wrapper;
  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(
      <EuiDelayHide hide={false} render={() => <div>Hello World</div>} />
    );
    wrapper.setProps({ hide: true });
  });

  test('it should be visible initially', async () => {
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be visible after 500ms', () => {
    jest.advanceTimersByTime(500);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 1500ms', () => {
    jest.advanceTimersByTime(1500);
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

  test('it should become visible immediately after prop change but not become hidden until after 1000ms', async () => {
    wrapper.setProps({ hide: false });
    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    wrapper.setProps({ hide: true });
    jest.advanceTimersByTime(500);

    expect(wrapper.html()).toEqual('<div>Hello World</div>');

    jest.advanceTimersByTime(1000);

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

  test('it should be visible after 1500ms', () => {
    jest.advanceTimersByTime(1500);
    expect(wrapper.html()).toEqual('<div>Hello World</div>');
  });

  test('it should be hidden after 2500ms', () => {
    jest.advanceTimersByTime(2500);
    expect(wrapper.html()).toEqual(null);
  });
});
