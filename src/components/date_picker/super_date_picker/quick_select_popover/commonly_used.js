
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { commonlyUsedRange } from '../types';

import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiLink } from '../../../link';
import { EuiText } from '../../../text';

export function CommonlyUsed({ commonlyUsedRanges, applyTime }) {
  const links = commonlyUsedRanges.map(({ from, to, label }) => {
    const applyCommonlyUsedTime = () => {
      applyTime({ from, to });
    };
    return (
      <EuiFlexItem key={label}>
        <EuiLink onClick={applyCommonlyUsedTime}>{label}</EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <Fragment>
      <EuiTitle size="xxxs"><span>Commonly used</span></EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" className="euiSuperDatePicker__popoverSection">
        <EuiFlexGrid gutterSize="s" columns={2} responsive={false}>
          {links}
        </EuiFlexGrid>
      </EuiText>
    </Fragment>
  );
}

CommonlyUsed.propTypes = {
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRange),
  applyTime: PropTypes.func.isRequired,
};

CommonlyUsed.defaultProps = {
  commonlyUsedRanges: [
    { from: 'now/d', to: 'now/d', label: 'Today' },
    { from: 'now-1d/d', to: 'now-1d/d', label: 'Yesterday' },
    { from: 'now/w', to: 'now/w', label: 'This week' },
    { from: 'now/w', to: 'now', label: 'Week to date' },
    { from: 'now/M', to: 'now/M', label: 'This month' },
    { from: 'now/M', to: 'now', label: 'Month to date' },
    { from: 'now/y', to: 'now/y', label: 'This year' },
    { from: 'now/y', to: 'now', label: 'Year to date' },
  ]
};
