/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { FunctionComponent } from 'react';

import { useGeneratedHtmlId } from '../../../../services';
import { useEuiI18n } from '../../../i18n';
import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiLink } from '../../../link';

import { DurationRange, ApplyTime } from '../../types';
import { EuiQuickSelectPanel } from './quick_select_panel';

export interface EuiCommonlyUsedTimeRangesProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
}

export const EuiCommonlyUsedTimeRanges: FunctionComponent<
  EuiCommonlyUsedTimeRangesProps
> = ({ applyTime, commonlyUsedRanges }) => {
  const title = useEuiI18n('euiCommonlyUsedTimeRanges.legend', 'Commonly used');
  const legendId = useGeneratedHtmlId();

  const links = commonlyUsedRanges.map(({ start, end, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ start, end });
    };
    const dataTestSubj = label
      ? `superDatePickerCommonlyUsed_${label.replace(' ', '_')}`
      : undefined;
    return (
      <EuiFlexItem key={label} component="li">
        <EuiLink onClick={applyCommonlyUsed} data-test-subj={dataTestSubj}>
          {label}
        </EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <EuiQuickSelectPanel component="fieldset" titleId={legendId} title={title}>
      <EuiFlexGrid
        aria-labelledby={legendId}
        gutterSize="s"
        columns={2}
        direction="column"
        responsive={false}
        component="ul"
      >
        {links}
      </EuiFlexGrid>
    </EuiQuickSelectPanel>
  );
};

EuiCommonlyUsedTimeRanges.displayName = 'EuiCommonlyUsedTimeRanges';
