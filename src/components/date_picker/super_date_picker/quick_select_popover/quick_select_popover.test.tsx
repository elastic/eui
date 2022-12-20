/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { render } from '../../../../test/rtl';

import { RenderI18nTimeOptions } from '../time_options';
import {
  EuiQuickSelectPopover,
  EuiQuickSelectPopoverProps,
  EuiQuickSelectPanels,
} from './quick_select_popover';

import { EuiLink } from '../../../link';

import { EuiQuickSelect } from './quick_select';
import { EuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { EuiRecentlyUsed } from './recently_used';
import { EuiRefreshInterval } from '../../auto_refresh/refresh_interval';

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
    const { container } = render(
      <RenderI18nTimeOptions>
        {(timeOptions) => (
          <EuiQuickSelectPopover {...defaultProps} timeOptions={timeOptions} />
        )}
      </RenderI18nTimeOptions>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('EuiQuickSelectPanels', () => {
  const CustomQuickSelectPanel = () => {
    return (
      <EuiLink onClick={noop} data-test-subj="customComponentSelectPanel">
        Entire dataset timerange
      </EuiLink>
    );
  };
  const customQuickSelectPanels = [
    {
      title: 'My custom panel',
      content: <CustomQuickSelectPanel />,
    },
  ];

  describe('customQuickSelectPanels', () => {
    it('should render custom panels', () => {
      const { container } = render(
        <RenderI18nTimeOptions>
          {(timeOptions) => (
            <EuiQuickSelectPanels
              {...defaultProps}
              timeOptions={timeOptions}
              customQuickSelectPanels={customQuickSelectPanels}
            />
          )}
        </RenderI18nTimeOptions>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('customQuickSelectRender', () => {
    it('should render Quick Select sections in default order when customQuickSelectRender is not present', () => {
      const component = shallow(
        <RenderI18nTimeOptions>
          {(timeOptions) => (
            <EuiQuickSelectPanels
              {...defaultProps}
              timeOptions={timeOptions}
              customQuickSelectPanels={customQuickSelectPanels}
            />
          )}
        </RenderI18nTimeOptions>
      ).dive();

      const menu = component.find(
        '[data-test-subj="superDatePickerQuickMenu"]'
      );

      expect(menu.children()).toHaveLength(5);
      expect(menu.children().at(0).is(EuiQuickSelect)).toBeTruthy();
      expect(menu.children().at(1).is(EuiCommonlyUsedTimeRanges)).toBeTruthy();
      expect(menu.children().at(2).is(EuiRecentlyUsed)).toBeTruthy();
      expect(menu.children().at(3).is(EuiRefreshInterval)).toBeTruthy();
      expect(menu.children().at(4).is('div')).toBeTruthy();
    });

    it('should render Quick Select sections in a custom order customQuickSelectRender is present', () => {
      const component = shallow(
        <RenderI18nTimeOptions>
          {(timeOptions) => (
            <EuiQuickSelectPanels
              {...defaultProps}
              timeOptions={timeOptions}
              customQuickSelectPanels={customQuickSelectPanels}
              customQuickSelectRender={({
                refreshInterval,
                quickSelect,
                commonlyUsedRanges,
                recentlyUsedRanges,
                customQuickSelectPanels,
              }) => (
                <>
                  {customQuickSelectPanels}
                  {refreshInterval}
                  {quickSelect}
                  {commonlyUsedRanges}
                  {recentlyUsedRanges}
                </>
              )}
            />
          )}
        </RenderI18nTimeOptions>
      ).dive();

      const menu = component.find(
        '[data-test-subj="superDatePickerQuickMenu"]'
      );

      expect(menu.children()).toHaveLength(5);
      expect(menu.children().at(0).is('div')).toBeTruthy();
      expect(menu.children().at(1).is(EuiRefreshInterval)).toBeTruthy();
      expect(menu.children().at(2).is(EuiQuickSelect)).toBeTruthy();
      expect(menu.children().at(3).is(EuiCommonlyUsedTimeRanges)).toBeTruthy();
      expect(menu.children().at(4).is(EuiRecentlyUsed)).toBeTruthy();
    });
  });
});
