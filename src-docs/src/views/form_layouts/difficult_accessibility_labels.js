import React from 'react';
import {
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiSelectable,
} from '../../../../src/components';

export default () => {
  const labelText = 'Tea categories';

  return (
    <EuiForm component="form">
      <EuiFormRow
        label={labelText}
        fullWidth
        helpText={
          <>
            The <strong>EuiFormRow</strong> label can&lsquo;t reach{' '}
            <strong>EuiSelectable</strong> without some help. Use{' '}
            <EuiCode>aria-label</EuiCode> or <EuiCode>aria-labelledby</EuiCode>{' '}
            to give a name to <strong>EuiSelectable</strong> that screen readers
            can use too.
          </>
        }
      >
        <EuiSelectable
          searchable
          aria-label={labelText}
          options={[
            { label: 'Black' },
            { label: 'Oolong' },
            { label: 'Green' },
            { label: 'White' },
            { label: 'Herbal' },
          ]}
          onChange={() => {}}
        >
          {(list, search) => (
            <>
              {search}
              {list}
            </>
          )}
        </EuiSelectable>
      </EuiFormRow>
    </EuiForm>
  );
};
