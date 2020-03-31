import PropTypes from 'prop-types';
import React from 'react';

import { EuiTabbedContent } from '../../../tabs';
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

export function EuiDatePopoverContent({
  value,
  roundUp,
  onChange,
  dateFormat,
  timeFormat,
  locale,
  position,
}) {
  const onTabClick = selectedTab => {
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

  const renderTabs = () => {
    return [
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
              Setting the time to &quot;now&quot; means that on every refresh
              this time will be set to the time of the refresh.
            </p>
            <EuiButton
              data-test-subj="superDatePickerNowButton"
              onClick={() => onChange('now')}
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
  };

  return (
    <EuiTabbedContent
      className="euiDatePopoverContent"
      tabs={renderTabs()}
      autoFocus="selected"
      initialSelectedTab={{ id: getDateMode(value) }}
      onTabClick={onTabClick}
      size="s"
      expand
    />
  );
}

EuiDatePopoverContent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  locale: PropTypes.string,
  position: PropTypes.oneOf(['start', 'end']),
};

EuiDatePopoverContent.defaultProps = {
  roundUp: false,
};
