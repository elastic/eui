
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { commonlyUsedRangeShape, recentlyUsedRangeShape } from '../types';
import { prettyDuration } from '../pretty_duration';

import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiLink } from '../../../link';
import { EuiText } from '../../../text';

export function RecentlyUsed({ applyTime, commonlyUsedRanges, dateFormat, recentlyUsedRanges }) {
  if (recentlyUsedRanges.length === 0) {
    return null;
  }

  const links = recentlyUsedRanges.map(({ from, to }) => {
    const applyRecentlyUsed = () => {
      applyTime({ from, to });
    };
    return (
      <EuiFlexItem grow={false} key={`${from}-${to}`}>
        <EuiLink onClick={applyRecentlyUsed}>
          {prettyDuration(from, to, commonlyUsedRanges, dateFormat)}
        </EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <Fragment>
      <EuiTitle size="xxxs"><span>Recently used date ranges</span></EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" className="euiSuperDatePicker__popoverSection">
        <EuiFlexGroup gutterSize="s" direction="column">
          {links}
        </EuiFlexGroup>
      </EuiText>
    </Fragment>
  );
}

RecentlyUsed.propTypes = {
  applyTime: PropTypes.func.isRequired,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
  dateFormat: PropTypes.string.isRequired,
  recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape),
};

RecentlyUsed.defaultProps = {
  recentlyUsedRanges: []
};
