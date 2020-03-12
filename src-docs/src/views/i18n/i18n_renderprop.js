import React, { Fragment } from 'react';

import {
  EuiCode,
  EuiFieldText,
  EuiI18n,
  EuiFormRow,
} from '../../../../src/components';

export default () => {
  return (
    <Fragment>
      <div>
        <EuiI18n token="euiI18nRenderprop.placeholderName" default="John Doe">
          {placeholderName => (
            <EuiFormRow
              label={
                <>
                  This text field&apos;s placeholder reads from{' '}
                  <EuiCode>i18n.renderpropexample</EuiCode>
                </>
              }>
              <EuiFieldText placeholder={placeholderName} />
            </EuiFormRow>
          )}
        </EuiI18n>
      </div>
    </Fragment>
  );
};
