import PropTypes from 'prop-types';
import React from 'react';
import { commonlyUsedRangeShape } from '../types';
import { EuiI18n } from '../../../i18n';
import { EuiFlexGrid, EuiFlexItem } from '../../../flex';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiLink } from '../../../link';
import { EuiText } from '../../../text';
import { EuiHorizontalRule } from '../../../horizontal_rule';
import { htmlIdGenerator } from '../../../../services';

const generateId = htmlIdGenerator();

export function EuiCommonlyUsedTimeRanges({ applyTime, commonlyUsedRanges }) {
  const legendId = generateId();
  const links = commonlyUsedRanges.map(({ start, end, label }) => {
    const applyCommonlyUsed = () => {
      applyTime({ start, end });
    };
    return (
      <EuiFlexItem key={label} component="li">
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
    <fieldset>
      <EuiTitle size="xxxs">
        <legend id={legendId} aria-label="Commonly used time ranges">
          <EuiI18n
            token="euiCommonlyUsedTimeRanges.legend"
            default="Commonly used"
          />
        </legend>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiText size="s" className="euiQuickSelectPopover__section">
        <EuiFlexGrid
          aria-labelledby={legendId}
          gutterSize="s"
          columns={2}
          direction="column"
          responsive={false}
          component="ul"
          className="euiQuickSelectPopover__list">
          {links}
        </EuiFlexGrid>
      </EuiText>
      <EuiHorizontalRule margin="s" />
    </fieldset>
  );
}

EuiCommonlyUsedTimeRanges.propTypes = {
  applyTime: PropTypes.func.isRequired,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
};
