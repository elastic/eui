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

import React from 'react';
import { shallow } from 'enzyme';
import { EuiCopy } from './copy';
import { requiredProps } from '../../test';

describe('EuiCopy', () => {
  test('is rendered', () => {
    const component = shallow(
      <EuiCopy textToCopy="some text" {...requiredProps}>
        {copy => <button onClick={copy}>Click to copy input text</button>}
      </EuiCopy>
    );
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('beforeMessage', () => {
      const component = shallow(
        <EuiCopy textToCopy="some text" beforeMessage="copy this">
          {copy => <button onClick={copy}>Click to copy input text</button>}
        </EuiCopy>
      );
      expect(component.state('tooltipText')).toBe('copy this');
    });

    test('afterMessage', () => {
      const component = shallow<EuiCopy>(
        <EuiCopy textToCopy="some text" afterMessage="successfuly copied">
          {copy => <button onClick={copy}>Click to copy input text</button>}
        </EuiCopy>
      );
      const instance = component.instance();
      expect(instance.props.afterMessage).toBe('successfuly copied');
    });
  });
});
