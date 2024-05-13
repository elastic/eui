import React from 'react';

import {
  EuiI18n,
  EuiTitle,
  EuiSpacer,
  useEuiI18n,
} from '../../../../src/components';

export default () => {
  return (
    <>
      <EuiTitle size="xs">
        <h3>Basic useEuiI18n usage</h3>
      </EuiTitle>
      <p>
        {useEuiI18n(
          'euiI18nBasic.basicexample',
          'This is the English copy that would be replaced by a translation defined by the i18n.basicexample token.'
        )}
      </p>

      <EuiSpacer size="l" />

      <EuiTitle size="xs">
        <h3>Basic EuiI18n usage</h3>
      </EuiTitle>
      <p>
        <EuiI18n
          token="euiI18nBasic.basicexample"
          default="This is the English copy that would be replaced by a translation defined by the i18n.basicexample token."
        />
      </p>
    </>
  );
};
