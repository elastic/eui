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
import { requiredProps } from '../../test/required_props';

import { EuiCollapsibleNav } from './collapsible_nav';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: (props: any) => <div {...props} />,
}));

describe('EuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = render(<EuiCollapsibleNav id="id" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      const component = render(
        <EuiCollapsibleNav id="id" onClose={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDocked', () => {
      const component = render(<EuiCollapsibleNav id="id" isDocked={true} />);

      expect(component).toMatchSnapshot();
    });

    test('isOpen', () => {
      const component = render(<EuiCollapsibleNav id="id" isOpen={true} />);

      expect(component).toMatchSnapshot();
    });

    test('button', () => {
      const component = render(
        <EuiCollapsibleNav id="id" button={<button />} />
      );

      expect(component).toMatchSnapshot();
    });

    test('hideButtonIfDocked', () => {
      const component = render(
        <EuiCollapsibleNav
          id="id"
          button={<button />}
          hideButtonIfDocked={false}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
