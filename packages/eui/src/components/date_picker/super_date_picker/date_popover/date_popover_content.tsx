/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { LocaleSpecifier, Moment } from 'moment';

import { useEuiMemoizedStyles } from '../../../../services';
import { useEuiPaddingCSS } from '../../../../global_styling';
import { EuiI18n, useEuiI18n } from '../../../i18n';
import { EuiTabbedContent, EuiTabbedContentProps } from '../../../tabs';
import { EuiText } from '../../../text';
import { EuiButton } from '../../../button';

import { TimeOptions } from '../time_options';
import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from '../date_modes';
import { EuiAbsoluteTab } from './absolute_tab';
import { EuiRelativeTab } from './relative_tab';
import { euiDatePopoverContentStyles } from './date_popover_content.styles';
import { type EuiTimeZoneDisplayProps } from './timezone_display';

export interface EuiDatePopoverContentProps {
  value: string;
  onChange: (date: string) => void;
  canRoundRelativeUnits?: boolean;
  roundUp?: boolean;
  dateFormat: string;
  timeFormat: string;
  locale?: LocaleSpecifier;
  position: 'start' | 'end';
  utcOffset?: number;
  minDate?: Moment;
  maxDate?: Moment;
  timeOptions: TimeOptions;
  timeZoneDisplayProps?: EuiTimeZoneDisplayProps;
}

export const EuiDatePopoverContent: FunctionComponent<
  EuiDatePopoverContentProps
> = ({
  value,
  canRoundRelativeUnits = true,
  roundUp = false,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  position,
  utcOffset,
  timeOptions,
  minDate,
  maxDate,
  timeZoneDisplayProps = {},
}) => {
  const styles = useEuiMemoizedStyles(euiDatePopoverContentStyles);

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

  const startDateLabel = useEuiI18n(
    'euiDatePopoverContent.startDateLabel',
    'Start date'
  );
  const endDateLabel = useEuiI18n(
    'euiDatePopoverContent.endDateLabel',
    'End date'
  );
  const labelPrefix = position === 'start' ? startDateLabel : endDateLabel;

  const absoluteLabel = useEuiI18n(
    'euiDatePopoverContent.absoluteTabLabel',
    'Absolute'
  );
  const relativeLabel = useEuiI18n(
    'euiDatePopoverContent.relativeTabLabel',
    'Relative'
  );
  const nowLabel = useEuiI18n('euiDatePopoverContent.nowTabLabel', 'Now');

  const renderTabs = [
    {
      id: DATE_MODES.ABSOLUTE,
      name: absoluteLabel,
      content: (
        <EuiAbsoluteTab
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          locale={locale}
          value={value}
          onChange={onChange}
          roundUp={roundUp}
          labelPrefix={labelPrefix}
          utcOffset={utcOffset}
          minDate={minDate}
          maxDate={maxDate}
          timeZoneDisplayProps={timeZoneDisplayProps}
        />
      ),
      'data-test-subj': 'superDatePickerAbsoluteTab',
      'aria-label': `${labelPrefix}: ${absoluteLabel}`,
    },
    {
      id: DATE_MODES.RELATIVE,
      name: relativeLabel,
      content: (
        <EuiRelativeTab
          dateFormat={dateFormat}
          locale={locale}
          value={
            canRoundRelativeUnits ? toAbsoluteString(value, roundUp) : value
          }
          onChange={onChange}
          roundUp={roundUp}
          labelPrefix={labelPrefix}
          timeOptions={timeOptions}
          timeZoneDisplayProps={timeZoneDisplayProps}
        />
      ),
      'data-test-subj': 'superDatePickerRelativeTab',
      'aria-label': `${labelPrefix}: ${relativeLabel}`,
    },
    {
      id: DATE_MODES.NOW,
      name: nowLabel,
      content: (
        <EuiText size="s" color="subdued" css={useEuiPaddingCSS().m}>
          <p>
            <EuiI18n
              token="euiDatePopoverContent.nowTabContent"
              default='Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.'
            />
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
            {position === 'start' ? (
              <EuiI18n
                token="euiDatePopoverContent.nowTabButtonStart"
                default="Set start date and time to now"
              />
            ) : (
              <EuiI18n
                token="euiDatePopoverContent.nowTabButtonEnd"
                default="Set end date and time to now"
              />
            )}
          </EuiButton>
        </EuiText>
      ),
      'data-test-subj': 'superDatePickerNowTab',
      'aria-label': `${labelPrefix}: ${nowLabel}`,
    },
  ];

  const initialSelectedTab = renderTabs.find(
    (tab) => tab.id === getDateMode(value)
  );

  return (
    <EuiTabbedContent
      css={styles.euiDatePopoverContent}
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
