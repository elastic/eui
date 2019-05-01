import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { commonlyUsedRangeShape } from '../types';

import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiLink } from '../../../link';
import { EuiText } from '../../../text';
import { EuiHorizontalRule } from '../../../horizontal_rule';

export function EuiCommonlyUsedTimeRanges({ applyTime, commonlyUsedRanges }) {
  const links = commonlyUsedRanges.map(({ start, end, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <EuiFlexItem key={label}>
        <EuiLink
          onClick={applyCommonlyUsed}
          data-test-subj={`superDatePickerCommonlyUsed_${label.replace(
            ' ',
            '_'
          )}`}>
          {label}
        </EuiLink>
      </EuiFlexItem>
    );
  });

  return (
    <Fragment>
      <EuiTitle size="xxxs">
        <span>Commonly used</span>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" className="euiQuickSelectPopover__section">
        <EuiFlexGrid gutterSize="s" columns={2} responsive={false}>
          {links}
        </EuiFlexGrid>
      </EuiText>
      <EuiHorizontalRule margin="s" />
    </Fragment>
  );
}

EuiCommonlyUsedTimeRanges.propTypes = {
  applyTime: PropTypes.func.isRequired,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
};
