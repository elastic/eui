/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiI18n } from '../../../i18n';
import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiLink } from '../../../link';
import { EuiHorizontalRule } from '../../../horizontal_rule';
import { htmlIdGenerator } from '../../../../services';
import { DurationRange, ApplyTime } from '../../types';

const generateId = htmlIdGenerator();

export interface EuiCommonlyUsedTimeRangesProps {
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
}

export const EuiCommonlyUsedTimeRanges: FunctionComponent<EuiCommonlyUsedTimeRangesProps> = ({
  applyTime,
  commonlyUsedRanges,
}) => {
  const legendId = generateId();
  const links = commonlyUsedRanges.map(({ start, end, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ start, end });
    };
    const dataTestSubj = label
      ? `superDatePickerCommonlyUsed_${label.replace(' ', '_')}`
      : undefined;
    return (
      <EuiFlexItem
        key={label}
        component="li"
        className="euiQuickSelectPopover__sectionItem">
        <EuiLink onClick={applyCommonlyUsed} data-test-subj={dataTestSubj}>
          {label}
        </EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <fieldset>
      <EuiTitle size="xxxs">
        <legend id={legendId}>
          <EuiI18n
            token="euiCommonlyUsedTimeRanges.legend"
            default="Commonly used"
          />
        </legend>
      </EuiTitle>
      <div className="euiQuickSelectPopover__section">
        <EuiFlexGrid
          aria-labelledby={legendId}
          gutterSize="s"
          columns={2}
          direction="column"
          responsive={false}
          component="ul">
          {links}
        </EuiFlexGrid>
      </div>
      <EuiHorizontalRule margin="s" />
    </fieldset>
  );
};

EuiCommonlyUsedTimeRanges.displayName = 'EuiCommonlyUsedTimeRanges';
