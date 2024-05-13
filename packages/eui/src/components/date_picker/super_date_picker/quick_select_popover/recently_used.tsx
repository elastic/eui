/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { PrettyDuration } from '../pretty_duration';

import { EuiI18n } from '../../../i18n';
import { useGeneratedHtmlId } from '../../../../services';
import { EuiTitle } from '../../../title';
import { EuiLink } from '../../../link';
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
  const legendId = useGeneratedHtmlId();

  if (recentlyUsedRanges.length === 0) {
    return null;
  }

  const links = recentlyUsedRanges.map(({ start, end }) => {
    const applyRecentlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <li
        className="euiQuickSelectPopover__sectionItem euiQuickSelectPopover__sectionItem--recentlyUsed"
        key={`${start}-${end}`}
      >
        <EuiLink onClick={applyRecentlyUsed}>
          <PrettyDuration
            timeFrom={start}
            timeTo={end}
            quickRanges={commonlyUsedRanges}
            dateFormat={dateFormat}
          />
        </EuiLink>
      </li>
    );
  });

  return (
    <fieldset className="euiQuickSelectPopover__panel">
      <EuiTitle size="xxxs">
        <legend id={legendId} className="euiQuickSelectPopover__panelTitle">
          <EuiI18n
            token="euiRecentlyUsed.legend"
            default="Recently used date ranges"
          />
        </legend>
      </EuiTitle>
      <div className="euiQuickSelectPopover__section">
        <ul>{links}</ul>
      </div>
    </fieldset>
  );
};

EuiRecentlyUsed.displayName = 'EuiRecentlyUsed';
