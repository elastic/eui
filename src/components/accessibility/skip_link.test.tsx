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
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiSkipLink, POSITIONS } from './skip_link';

describe('EuiSkipLink', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSkipLink {...requiredProps}>Skip</EuiSkipLink>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('destinationId is rendered', () => {
      const component = render(<EuiSkipLink destinationId="somewhere" />);

      expect(component).toMatchSnapshot();
    });

    test('tabIndex is rendered', () => {
      const component = render(<EuiSkipLink tabIndex={-1} />);

      expect(component).toMatchSnapshot();
    });

    test('onClick is rendered', () => {
      const component = render(<EuiSkipLink onClick={() => {}} />);

      expect(component).toMatchSnapshot();
    });

    test('onClick and destinationId is rendered', () => {
      const component = render(
        <EuiSkipLink onClick={() => {}} destinationId="somewhere" />
      );

      expect(component).toMatchSnapshot();
    });

    describe('position', () => {
      POSITIONS.forEach(position => {
        test(`${position} is rendered`, () => {
          const component = render(<EuiSkipLink position={position} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
