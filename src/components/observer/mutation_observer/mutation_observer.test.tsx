import React, { FunctionComponent } from 'react';
import { mount } from 'enzyme';
import { EuiMutationObserver } from './mutation_observer';

async function sleep(duration: number) {
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

    const Wrapper: FunctionComponent<{ value: number }> = ({ value }) => {
      return (
        <EuiMutationObserver
          observerOptions={{ attributes: true }}
          onMutation={onMutation}>
          {mutationRef => (
            <div ref={mutationRef} data-test-ref={value}>
              Hello World
            </div>
          )}
        </EuiMutationObserver>
      );
    };

    const component = mount(<Wrapper value={5} />);

    component.setProps({ value: 6 });

    await waitforMutationObserver();

    expect(onMutation).toHaveBeenCalledTimes(1);
  });
});
