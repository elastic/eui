import React from 'react';
import {
  EuiCode,
  EuiDescribedFormGroup,
  EuiForm,
  EuiFormRow,
  EuiSelectable,
} from '../../../../src/components';

export default () => {
  return (
    <EuiForm component="form">
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
          label="Tea categories"
          helpText={
            <>
              The <strong>EuiFormRow</strong> label can&lsquo;t reach{' '}
              <strong>EuiSelectable</strong> without some help. Use{' '}
              <EuiCode>aria-label</EuiCode> or{' '}
              <EuiCode>aria-labelledby</EuiCode> to give a name to{' '}
              <strong>EuiSelectable</strong> that screen readers can use too.
            </>
          }>
          <EuiSelectable
            searchable
            aria-label="Tea categories"
            options={[
              { label: 'Black' },
              { label: 'Oolong' },
              { label: 'Green' },
              { label: 'White' },
              { label: 'Herbal' },
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
