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

import { EuiComment } from './comment';
import { EuiAvatar } from '../avatar';

describe('EuiComment', () => {
  test('is rendered', () => {
    const component = render(
      <EuiComment username="someuser" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment username="someuser" type="update" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('timelineIcon', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment
            username="someuser"
            timelineIcon={<EuiAvatar size="l" name="Mario" />}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('timestamp', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment timestamp="21 days ago" username="someuser" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('event', () => {
      it('is rendered', () => {
        const component = render(
          <EuiComment event="commented" username="someuser" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('renders a body', () => {
    const component = render(
      <EuiComment username="someuser">
        <p>This is the body.</p>
      </EuiComment>
    );

    expect(component).toMatchSnapshot();
  });
});
