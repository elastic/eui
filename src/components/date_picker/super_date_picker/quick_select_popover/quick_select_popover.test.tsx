/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { RenderI18nTimeOptions } from '../time_options';
import {
  EuiQuickSelectPopover,
  EuiQuickSelectPopoverProps,
} from './quick_select_popover';

const noop = () => {};

const defaultProps: Omit<EuiQuickSelectPopoverProps, 'timeOptions'> = {
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
};

describe('EuiQuickSelectPopover', () => {
  test('is rendered', () => {
    const component = shallow(
      <RenderI18nTimeOptions>
        {(timeOptions) => (
          <EuiQuickSelectPopover {...defaultProps} timeOptions={timeOptions} />
        )}
      </RenderI18nTimeOptions>
    ).dive();
    expect(component).toMatchSnapshot();
  });
});
