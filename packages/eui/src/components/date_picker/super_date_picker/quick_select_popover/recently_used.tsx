/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { useGeneratedHtmlId } from '../../../../services';
import { useEuiI18n } from '../../../i18n';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiLink } from '../../../link';

import { DurationRange, ApplyTime } from '../../types';
import { PrettyDuration } from '../pretty_duration';
import { EuiQuickSelectPanel } from './quick_select_panel';

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
  const title = useEuiI18n(
    'euiRecentlyUsed.legend',
    'Recently used date ranges'
  );
  const legendId = useGeneratedHtmlId();

  if (recentlyUsedRanges.length === 0) {
    return null;
  }

  const links = recentlyUsedRanges.map(({ start, end }) => {
    const applyRecentlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <EuiFlexItem component="li" key={`${start}-${end}`}>
        <EuiLink onClick={applyRecentlyUsed}>
          <PrettyDuration
            timeFrom={start}
            timeTo={end}
            quickRanges={commonlyUsedRanges}
            dateFormat={dateFormat}
          />
        </EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <EuiQuickSelectPanel component="fieldset" titleId={legendId} title={title}>
      <EuiFlexGroup component="ul" gutterSize="s" direction="column">
        {links}
      </EuiFlexGroup>
    </EuiQuickSelectPanel>
  );
};

EuiRecentlyUsed.displayName = 'EuiRecentlyUsed';
