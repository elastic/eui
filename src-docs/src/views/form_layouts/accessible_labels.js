import React, { useState } from 'react';

import {
  EuiButton,
  EuiSelectable,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFilePicker,
  EuiSwitch,
  EuiCode,
  EuiDescribedFormGroup,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [checkedState, setCheckedState] = useState(true);
  const randomId = htmlIdGenerator()();

  return (
    <EuiForm component="form">
      <EuiDescribedFormGroup
        title={<h3>Not as simple as they look</h3>}
        description={
          <>
            Some form controls come with their own label and don&lsquo;t need
            the one provided by <strong>EuiFormRow</strong>. Include{' '}
            <EuiCode>hasChildLabel:false</EuiCode> on form rows that wrap:{' '}
            <EuiCode>EuiSwitch</EuiCode>, <EuiCode>EuiButton</EuiCode>, or{' '}
            <EuiCode>EuiLink</EuiCode>.
          </>
        }>
        <EuiFormRow
          label="A switch"
          helpText="The name of this switch is &rdquo;Do you love EUI?&ldquo; instead of &rdquo;A switch&ldquo;."
          hasChildLabel={false}>
          <EuiSwitch
            name="switch"
            label="Do you love EUI?"
            onChange={() => {
              setCheckedState(false);
              setTimeout(() => {
                setCheckedState(true);
              }, 500);
            }}
            checked={checkedState}
          />
        </EuiFormRow>
        <EuiFormRow
          label="A button"
          helpText="Navigate to this button using a screen reader, it&lsquo;s read out as &rdquo;A button&ldquo;">
          <EuiButton>By any other name</EuiButton>
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup
        title={
          <h3 id={randomId}>Implicit titles for the first form control</h3>
        }
        description={
          <>
            Just because a form is first, don&lsquo;t mean it doesn&lsquo;t need
            a label. If it won&lsquo;t have its own visual label, either pass in
            an
            <EuiCode>aria-label</EuiCode> or <EuiCode>aria-labelledby</EuiCode>.
          </>
        }>
        <EuiFormRow
          helpText={
            <>
              We use <EuiCode>aria-labelledby</EuiCode> here to point to the{' '}
              <strong>EuiDescribedFormGroup</strong> title.
            </>
          }>
          <EuiFieldText aria-labelledby={randomId} />
        </EuiFormRow>
        <EuiFormRow
          aria-labelledby={randomId}
          helpText={
            <>
              You can add <EuiCode>aria-labelledby</EuiCode> to any form control
              though, it doesn&lsquo;t have to be the first. We do it here too!
            </>
          }>
          <EuiFilePicker aria-labelledby={randomId} />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      <EuiDescribedFormGroup
        title={<h3>Some controls are just hard though</h3>}
        description={
          <>
            More complicated form controls will often require some custom work.
            Refer to an individual component&lsquo;s documentation and remember
            to test!
          </>
        }>
        <EuiFormRow
          label="Searchable example"
          helpText={
            <>
              The <strong>EuiFormRow</strong> label can&lsquo;t reach{' '}
              <strong>EuiSelectable</strong> without some help. Pass the label
              along as an <EuiCode>aria-label</EuiCode> to{' '}
              <strong>EuiSelectable</strong> for maximum effect!
            </>
          }>
          <EuiSelectable
            searchable
            aria-label="Searchable example"
            options={[
              { label: 'hello' },
              { label: 'good day' },
              { label: 'hi' },
              { label: 'hey' },
              { label: 'yo' },
            ]}
            onChange={() => {}}>
            {(list, search) => (
              <>
                {search}
                {list}
              </>
            )}
          </EuiSelectable>
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </EuiForm>
  );
};
