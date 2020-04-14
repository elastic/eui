import React, { Fragment, FunctionComponent } from 'react';
import { prettyDuration } from '../pretty_duration';

import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiLink } from '../../../link';
import { EuiText } from '../../../text';
import { EuiHorizontalRule } from '../../../horizontal_rule';
import { DurationRange, ApplyTime } from '../../types';

export interface EuiRecentlyUsedProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
  dateFormat: string;
  recentlyUsedRanges?: DurationRange[];
}

export const EuiRecentlyUsed: FunctionComponent<EuiRecentlyUsedProps> = ({
  applyTime,
  commonlyUsedRanges,
  dateFormat,
  recentlyUsedRanges = [],
}) => {
  if (recentlyUsedRanges.length === 0) {
    return null;
  }

  const links = recentlyUsedRanges.map(({ start, end }) => {
    const applyRecentlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <EuiFlexItem grow={false} key={`${start}-${end}`}>
        <EuiLink onClick={applyRecentlyUsed}>
          {prettyDuration(start, end, commonlyUsedRanges, dateFormat)}
        </EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <Fragment>
      <EuiTitle size="xxxs">
        <span>Recently used date ranges</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" className="euiQuickSelectPopover__section">
        <EuiFlexGroup gutterSize="s" direction="column">
          {links}
        </EuiFlexGroup>
      </EuiText>
      <EuiHorizontalRule margin="s" />
    </Fragment>
  );
};

EuiRecentlyUsed.displayName = 'EuiRecentlyUsed';
