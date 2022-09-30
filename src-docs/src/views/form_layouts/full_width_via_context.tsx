import React from 'react';

import {
  EuiForm,
  EuiFieldSearch,
  EuiRange,
  EuiTextArea,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiDescribedFormGroup,
  EuiSelect,
  EuiFilePicker,
  EuiButton,
} from '../../../../src/components';

export default () => {
  const [range, setRange] = React.useState(42);

  return (
    <EuiForm
      fullWidth
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFieldSearch
            placeholder="Search..."
            aria-label="An example of search with fullWidth"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton>Search</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiFormRow
        label="Works on form rows too"
        helpText="Note that the fullWidth prop is not passed to any of these elements, it's read from the parent <EuiForm> component."
      >
        <EuiRange
          min={0}
          max={100}
          name="range"
          value={range}
          onChange={(e) => {
            if (e.target instanceof HTMLInputElement) {
              setRange(Number.parseInt(e.target.value, 10));
            }
          }}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiDescribedFormGroup
        title={<h3>Works with all form controls and layout components</h3>}
        description={
          <>
            <p>
              Any component that supports the <code>fullWidth</code> prop that
              is.
            </p>
            <p>
              Make sure it is appropriate at all of the widths that the
              container can take. There are many situations where a full-width
              form is inappropriate.
            </p>
          </>
        }
      >
        <EuiFormRow label="Text area">
          <EuiTextArea placeholder="" />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      <EuiFormRow label="Works on EuiSelect">
        <EuiSelect
          options={[
            {
              value: 'option_one',
              text:
                'Option one is very long in order to try justifying the use of fullWidth on a select box',
            },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
        />
      </EuiFormRow>

      <EuiFormRow label="It can be disabled for a specific control">
        <EuiFilePicker display="default" fullWidth={false} />
      </EuiFormRow>
    </EuiForm>
  );
};
