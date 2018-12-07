
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { commonlyUsedRangeShape } from '../types';

import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiLink } from '../../../link';
import { EuiText } from '../../../text';
import { EuiHorizontalRule } from '../../../horizontal_rule';

export function EuiCommonlyUsed({ applyTime, commonlyUsedRanges }) {
  const links = commonlyUsedRanges.map(({ from, to, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ from, to });
    };
    return (
      <EuiFlexItem key={label}>
        <EuiLink
          onClick={applyCommonlyUsed}
          data-test-subj={`superDatePickerCommonlyUsed_${label.replace(' ', '_')}`}
        >
          {label}
        </EuiLink>
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
      <EuiHorizontalRule margin="s" />
    </Fragment>
  );
}

EuiCommonlyUsed.propTypes = {
  applyTime: PropTypes.func.isRequired,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
};
