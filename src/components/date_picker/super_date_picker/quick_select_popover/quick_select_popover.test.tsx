/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
