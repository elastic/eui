import React from 'react';
import { mount } from 'enzyme';
import { EuiResizeObserver } from './resize_observer';

async function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export async function waitforResizeObserver(period = 30) {
  // `period` defaults to 30 because its the delay used by the ResizeObserver polyfill
  await sleep(period);
}

describe('EuiResizeObserver', () => {
  it('watches for a resize', async () => {
    expect.assertions(1);
    const onResize = jest.fn();

    function Wrapper({ children }) {
      return (
        <EuiResizeObserver onResize={onResize}>
          {resizeRef => <div ref={resizeRef}>{children}</div>}
        </EuiResizeObserver>
      );
    }

    const component = mount(<Wrapper children={<div>Hello World</div>} />);

    component.setProps({
      children: (
        <div>
          <div>Hello World</div>
          <div>Hello Again</div>
        </div>
      ),
    });

    await waitforResizeObserver();

    // Expect 2 calls because it's called once on mount
    expect(onResize).toHaveBeenCalledTimes(2);
  });
});
