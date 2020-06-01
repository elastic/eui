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

import { EuiIconTip } from './icon_tip';

describe('EuiIconTip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiIconTip title="title" id="id" content="content" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      test('is rendered as the icon', () => {
        const component = render(
          <EuiIconTip type="alert" id="id" content="content" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      test('is rendered as the icon color', () => {
        const component = render(
          <EuiIconTip color="warning" id="id" content="content" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('is rendered as the icon size', () => {
        const component = render(
          <EuiIconTip size="xl" id="id" content="content" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
