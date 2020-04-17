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
import { Moment, LocaleSpecifier } from 'moment'; // eslint-disable-line import/named

export interface EuiDatePopoverContentProps {
  value: string;
  onChange(
    date: Moment | string | null,
    event?: React.SyntheticEvent<any>
  ): void;
  roundUp?: boolean;
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  position: 'start' | 'end';
}

export const EuiDatePopoverContent: FunctionComponent<
  EuiDatePopoverContentProps
> = ({
  value,
  roundUp = false,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  position,
}) => {
  const onTabClick: EuiTabbedContentProps['onTabClick'] = selectedTab => {
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
          className="euiDatePopoverContent__padded--large">
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
            fill>
            Set {position} date and time to now
          </EuiButton>
        </EuiText>
      ),
      'data-test-subj': 'superDatePickerNowTab',
      'aria-label': `${ariaLabel} Now`,
    },
  ];

  const initialSelectedTab = renderTabs.find(
    tab => tab.id === getDateMode(value)
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
