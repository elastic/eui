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

import { useEuiTextDiff } from './text_diff';
const beforeText =
  'Orbiting this at a distance of roughly ninety-two million miles is an utterly insignificant little blue green planet whose ape- descended life forms are so amazingly primitive that they still think digital watches are a pretty neat idea.';
const afterText =
  'Orbiting those at a distance of roughly ninety-nine billion yards is not insignificant dwaf red green planet whose ape- ascended life forms are so amazingly primitive that they still think digital clocks are a pretty neat idea.';

describe('useEuiTextDiff', () => {
  test('is rendered', () => {
    const Element = () => {
      const renderedComponent = useEuiTextDiff({
        beforeText,
        afterText,
        timeout: 0,
      })[0];
      return <>{renderedComponent}</>;
    };
    const component = shallow(<Element />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('custom components', () => {
      test('is rendered', () => {
        const Element = () => {
          const renderedComponent = useEuiTextDiff({
            beforeText,
            afterText,
            timeout: 0,
            insertComponent: 'strong',
            deleteComponent: 's',
            sameComponent: 'p',
          })[0];
          return <>{renderedComponent}</>;
        };
        const component = shallow(<Element />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
