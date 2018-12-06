
import PropTypes from 'prop-types';
import React from 'react';

import { EuiTabbedContent } from '../../../tabs';
import { EuiText } from '../../../text';

import { AbsoluteTab } from './absolute_tab';
import { RelativeTab } from './relative_tab';

import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from './date_modes';

export function DatePopoverContent({ value, roundUp, onChange, dateFormat }) {

  const onTabClick = (selectedTab) => {
    switch(selectedTab.id) {
      case DATE_MODES.ABSOLUTE:
        onChange(toAbsoluteString(value, roundUp));
        break;
      case DATE_MODES.RELATIVE:
        onChange(toRelativeString(value));
        break;
      case DATE_MODES.NOW:
        onChange('now');
        break;
    }
  };

  const renderTabs = () => {
    return [
      {
        id: DATE_MODES.ABSOLUTE,
        name: 'Absolute',
        content: (
          <AbsoluteTab
            dateFormat={dateFormat}
            value={value}
            onChange={onChange}
            roundUp={roundUp}
          />
        ),
      },
      {
        id: DATE_MODES.RELATIVE,
        name: 'Relative',
        content: (
          <RelativeTab
            dateFormat={dateFormat}
            value={value}
            onChange={onChange}
          />
        ),
      },
      {
        id: DATE_MODES.NOW,
        name: 'Now',
        content: (
          <EuiText size="s" color="subdued" style={{ width: 390, padding: 16 }}>
            <p>
              Setting the time to &quot;Now&quot; means that on every refresh
              this time will be set to the time of the refresh.
            </p>
          </EuiText>
        ),
      }
    ];
  };

  return (
    <EuiTabbedContent
      tabs={renderTabs()}
      initialSelectedTab={{ id: getDateMode(value) }}
      onTabClick={onTabClick}
      size="s"
      expand
    />
  );
}

DatePopoverContent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired,
};

DatePopoverContent.defaultProps = {
  roundUp: false,
};
