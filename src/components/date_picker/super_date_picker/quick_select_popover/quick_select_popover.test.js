import React from 'react';
import { shallow } from 'enzyme';

import { EuiQuickSelectPopover } from './quick_select_popover';

const noop = () => {};

const defaultProps = {
  applyTime: noop,
  applyRefreshInterval: noop,
  start: 'now-15m',
  end: 'now',
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
