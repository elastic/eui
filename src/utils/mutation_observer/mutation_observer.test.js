import React from 'react';
import { mount } from 'enzyme';
import { EuiMutationObserver } from './mutation_observer';

async function sleep(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

/**
 * Helper method to execute - and wait for - any mutation observers within a components's tree
 * @param component {EnzymeComponent} mounted component to find and run observers in
 * @returns {Promise<any[]>}
 */
export async function runObserversOnComponent(component) {
  const observerPromises = [];

  component.find('EuiMutationObserver').forEach(
    mutationObserver => {
      const observer = mutationObserver.instance().observer;
      if (observer != null) {
        // `observer` is an instance of a polyfill (polyfills/mutation_observer.js
        // which has an internal method to force it to update
        observer._notifyListener();
        observerPromises.push(sleep(observer._period));
      }
    }
  );

  return Promise.all(observerPromises);
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

    await runObserversOnComponent(component);

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

    await runObserversOnComponent(component);

    expect(onMutation).toHaveBeenCalledTimes(1);
  });
});
