import React from 'react';

import {
  EuiFieldText,
  EuiFormRow,
  EuiSelect,
  EuiPanel,
  EuiIcon,
} from '../../../../src/components';
import { EuiToolTip } from '../../../../src/components/tool_tip';

export default () => (
  <EuiPanel style={{ maxWidth: 300 }}>
    <EuiFormRow
      label="Text field"
      helpText="Show validation help text only."
      display="columnCompressed">
      <EuiFieldText name="first" compressed />
    </EuiFormRow>

    <EuiFormRow
      label={
        <EuiToolTip content="Otherwise use an EuiToolTip around the label of the form row.">
          <span>
            Label <EuiIcon type="questionInCircle" color="subdued" />
          </span>
        </EuiToolTip>
      }
      display="columnCompressed">
      <EuiSelect
        options={[
          { value: 'option_one', text: 'Option one' },
          { value: 'option_two', text: 'Option two' },
          { value: 'option_three', text: 'Option three' },
        ]}
        compressed
      />
    </EuiFormRow>
  </EuiPanel>
);
