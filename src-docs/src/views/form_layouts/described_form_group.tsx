import React from 'react';

import {
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiDescribedFormGroup,
  EuiFilePicker,
  EuiRange,
  EuiSelect,
  EuiLink,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const describedFormRangeId = useGeneratedHtmlId({
    prefix: 'describedFormRange',
  });

  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        title={<h3>Single text field</h3>}
        description={
          <p>
            Descriptions are wrapped in a small, subdued{' '}
            <EuiLink href="#/display/text">
              <strong>EuiTextBlock</strong>
            </EuiLink>
            . It can have links or any other type of content. Be sure to wrap
            nodes in a paragraph tag.
          </p>
        }
      >
        <EuiFormRow label="Text field">
          <EuiFieldText name="first" aria-label="Example" />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup title={<h3>No description</h3>}>
        <EuiFormRow label="Text field">
          <EuiFieldText name="first" />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup
        title={<h3>Multiple fields</h3>}
        description="Here are three form rows. The first form row does not have a label."
      >
        <EuiFormRow
          hasEmptyLabelSpace
          helpText={<span>This is a help text</span>}
        >
          <EuiSelect
            hasNoInitialSelection
            onChange={() => {}}
            options={[
              { value: 'option_one', text: 'Option one' },
              { value: 'option_two', text: 'Option two' },
              { value: 'option_three', text: 'Option three' },
            ]}
            aria-label="An example of a form element without a visible label"
          />
        </EuiFormRow>

        <EuiFormRow label="File picker">
          <EuiFilePicker />
        </EuiFormRow>

        <EuiFormRow label="Range">
          <EuiRange
            min={0}
            value={50}
            max={100}
            name="range"
            id={describedFormRangeId}
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
