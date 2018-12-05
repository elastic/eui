
import PropTypes from 'prop-types';
import React from 'react';

import { EuiTabbedContent } from '../../../tabs';

import {
  getDateMode,
  DATE_MODES,
  toAbsoluteString,
  toRelativeString,
} from './date_modes';

export function DateInput({ value, roundUp, onChange }) {

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

DateInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  roundUp: PropTypes.bool,
};

DateInput.defaultProps = {
  roundUp: false,
};
