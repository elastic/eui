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

import {
  EuiQuickSelectPopover,
  EuiQuickSelectPopoverProps,
} from './quick_select_popover';

const noop = () => {};

const defaultProps: EuiQuickSelectPopoverProps = {
  applyTime: noop,
  applyRefreshInterval: noop,
  start: 'now-15m',
  end: 'now',
  isDisabled: false,
  isPaused: true,
  refreshInterval: 0,
  commonlyUsedRanges: [{ start: 'now/d', end: 'now/d', label: 'Today' }],
  dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
  recentlyUsedRanges: [{ start: 'now/d', end: 'now/d', label: 'Today' }],
  isAutoRefreshOnly: false,
};

describe('EuiQuickSelectPopover', () => {
  test('is rendered', () => {
    const component = shallow(<EuiQuickSelectPopover {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  test('isAutoRefreshOnly', () => {
    const component = shallow(
      <EuiQuickSelectPopover {...defaultProps} isAutoRefreshOnly={true} />
    );

    expect(component).toMatchSnapshot();
  });
});
