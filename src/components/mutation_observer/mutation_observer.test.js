import React from 'react';
import { mount } from 'enzyme';
import { EuiMutationObserver } from './mutation_observer';

async function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export async function waitforMutationObserver(period = 30) {
  // `period` defaults to 30 because its the delay used by the MutationObserver polyfill
  await sleep(period);
}

describe('EuiMutationObserver', () => {
  it('watches for a mutation', async () => {
    expect.assertions(1);
    const onMutation = jest.fn();

    function Wrapper({ value }) {
      return (
        <EuiMutationObserver observerOptions={{ attributes: true }} onMutation={onMutation}>
          <Child value={value}/>
        </EuiMutationObserver>
      );
    }
    function Child({ value }) {
      return (
        <div data-test-ref={value}>Hello World</div>
      );
    }

    const component = mount(<Wrapper value={5}/>);

    component.setProps({ value: 6 });

    await waitforMutationObserver();

    expect(onMutation).toHaveBeenCalledTimes(1);
  });

  it('watches for mutation against multiple children', async () => {
    expect.assertions(1);
    const onMutation = jest.fn();

    function Wrapper({ value }) {
      return (
        <EuiMutationObserver observerOptions={{ attributes: true }} onMutation={onMutation}>
          <Child value="never-changing"/>
          <Child value={value}/>
          <Child value="never-changing"/>
        </EuiMutationObserver>
      );
    }
    function Child({ value }) {
      return (
        <div data-test-ref={value}>Hello World</div>
      );
    }

    const component = mount(<Wrapper value={5}/>);

    component.setProps({ value: 6 });

    await waitforMutationObserver();

    expect(onMutation).toHaveBeenCalledTimes(1);
  });
});
