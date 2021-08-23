/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { EuiTabbedContent, EuiTabbedContentProps } from '../../../tabs';
import { EuiText } from '../../../text';
import { EuiButton } from '../../../button';

import { EuiAbsoluteTab } from './absolute_tab';
import { EuiRelativeTab } from './relative_tab';

import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from '../date_modes';
import { LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

export interface EuiDatePopoverContentProps {
  value: string;
  onChange(date: string | null, event?: React.SyntheticEvent<any>): void;
  roundUp?: boolean;
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  position: 'start' | 'end';
  utcOffset?: number;
}

export const EuiDatePopoverContent: FunctionComponent<EuiDatePopoverContentProps> = ({
  value,
  roundUp = false,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  position,
  utcOffset,
}) => {
  const onTabClick: EuiTabbedContentProps['onTabClick'] = (selectedTab) => {
    switch (selectedTab.id) {
      case DATE_MODES.ABSOLUTE:
        onChange(toAbsoluteString(value, roundUp));
        break;
      case DATE_MODES.RELATIVE:
        onChange(toRelativeString(value));
        break;
    }
  };

  const ariaLabel = `${position === 'start' ? 'Start' : 'End'} date:`;

  const renderTabs = [
    {
      id: DATE_MODES.ABSOLUTE,
      name: 'Absolute',
      content: (
        <EuiAbsoluteTab
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          locale={locale}
          value={value}
          onChange={onChange}
          roundUp={roundUp}
          position={position}
          utcOffset={utcOffset}
        />
      ),
      'data-test-subj': 'superDatePickerAbsoluteTab',
      'aria-label': `${ariaLabel} Absolute`,
    },
    {
      id: DATE_MODES.RELATIVE,
      name: 'Relative',
      content: (
        <EuiRelativeTab
          dateFormat={dateFormat}
          locale={locale}
          value={toAbsoluteString(value, roundUp)}
          onChange={onChange}
          roundUp={roundUp}
          position={position}
        />
      ),
      'data-test-subj': 'superDatePickerRelativeTab',
      'aria-label': `${ariaLabel} Relative`,
    },
    {
      id: DATE_MODES.NOW,
      name: 'Now',
      content: (
        <EuiText
          size="s"
          color="subdued"
          className="euiDatePopoverContent__padded--large"
        >
          <p>
            Setting the time to &quot;now&quot; means that on every refresh this
            time will be set to the time of the refresh.
          </p>
          <EuiButton
            data-test-subj="superDatePickerNowButton"
            onClick={() => {
              onChange('now');
            }}
            fullWidth
            size="s"
            fill
          >
            Set {position} date and time to now
          </EuiButton>
        </EuiText>
      ),
      'data-test-subj': 'superDatePickerNowTab',
      'aria-label': `${ariaLabel} Now`,
    },
  ];

  const initialSelectedTab = renderTabs.find(
    (tab) => tab.id === getDateMode(value)
  );

  return (
    <EuiTabbedContent
      className="euiDatePopoverContent"
      tabs={renderTabs}
      autoFocus="selected"
      initialSelectedTab={initialSelectedTab}
      onTabClick={onTabClick}
      size="s"
      expand
    />
  );
};

EuiDatePopoverContent.displayName = 'EuiDatePopoverContent';
