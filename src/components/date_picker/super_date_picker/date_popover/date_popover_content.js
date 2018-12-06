
import PropTypes from 'prop-types';
import React from 'react';

import { EuiTabbedContent } from '../../../tabs';

import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from './date_modes';

export function DatePopoverContent({ value, roundUp, onValueChange }) {

  const onTabClick = (selectedTab) => {
    switch(selectedTab.id) {
      case DATE_MODES.ABSOLUTE:
        onValueChange(toAbsoluteString(value, roundUp));
        break;
      case DATE_MODES.RELATIVE:
        onValueChange(toRelativeString(value));
        break;
      case DATE_MODES.NOW:
        onValueChange('now');
        break;
    }
  };

  const renderTabs = () => {
    return [
      {
        id: DATE_MODES.ABSOLUTE,
        name: 'Absolute',
        content: (
          <div>absolute: {value}</div>
        ),
      },
      {
        id: DATE_MODES.RELATIVE,
        name: 'Relative',
        content: (
          <div>relative: {value}</div>
        ),
      },
      {
        id: DATE_MODES.NOW,
        name: 'Now',
        content: (
          <div>now: {value}</div>
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
  onValueChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
};

DatePopoverContent.defaultProps = {
  roundUp: false,
};
