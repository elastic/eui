/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent } from 'react';
import { mount } from 'enzyme';
import { EuiMutationObserver } from './mutation_observer';
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
