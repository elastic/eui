import React, { Fragment } from 'react';

import { EuiCode, EuiFieldText, EuiI18n } from '../../../../src/components';

export default () => {
  return (
    <Fragment>
      <p>
        This text field&apos;s placeholder reads from{' '}
        <EuiCode>i18n.renderpropexample</EuiCode>
      </p>
      <div>
        <EuiI18n token="euiI18nRenderprop.placeholderName" default="John Doe">
          {placeholderName => (
            <EuiFieldText
              placeholder={placeholderName}
              aria-label="Passing EuiI18n as a render prop child "
            />
          )}
        </EuiI18n>
      </div>
    </Fragment>
  );
};
