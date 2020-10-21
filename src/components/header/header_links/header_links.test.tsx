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
import { requiredProps } from '../../../test';

import { EuiHeaderLinks, GUTTER_SIZES } from './header_links';

describe('EuiHeaderLinks', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderLinks {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('gutterSize', () => {
    GUTTER_SIZES.forEach((gutterSize) => {
      test(`${gutterSize} is rendered`, () => {
        const component = render(<EuiHeaderLinks gutterSize={gutterSize} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('popover props', () => {
    test('is rendered', () => {
      const component = render(
        <EuiHeaderLinks
          popoverBreakpoints={['xs', 's', 'm', 'l', 'xl']}
          popoverButtonProps={{
            iconType: 'bolt',
            className: 'customButtonClass',
          }}
          popoverProps={{ anchorClassName: 'customAnchorClass' }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('is never rendered with "none"', () => {
      const component = render(<EuiHeaderLinks popoverBreakpoints={'none'} />);

      expect(component).toMatchSnapshot();
    });
  });
});
