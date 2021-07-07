/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import { mount } from 'enzyme';
import { EuiMutationObserver, useMutationObserver } from './mutation_observer';
import { sleep } from '../../../test';

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
          {(mutationRef) => (
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

describe('useMutationObserver', () => {
  it('watches changing content', async () => {
    expect.assertions(2);

    const mutationCallback = jest.fn();
    const Wrapper: FunctionComponent<{}> = jest.fn(({ children }) => {
      const [ref, setRef] = useState<Element | null>(null);
      useMutationObserver(ref, mutationCallback, {
        childList: true,
        subtree: true,
      });
      return <div ref={setRef}>{children}</div>;
    });

    const component = mount(<Wrapper children={<div>Hello World</div>} />);

    await waitforMutationObserver();
    expect(mutationCallback).toHaveBeenCalledTimes(0);

    component.setProps({
      children: (
        <div>
          <div>Hello World</div>
          <div>Hello Again</div>
        </div>
      ),
    });

    await waitforMutationObserver();
    expect(mutationCallback).toHaveBeenCalledTimes(1);
  });
});
