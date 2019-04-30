import React from 'react';

import { EuiI18n } from '../../../../src/components';

export default () => {
  return (
    <p>
      <EuiI18n
        token="euiI18nBasic.basicexample"
        default="This is the English copy that would be replaced by a translation defined by the i18n.basicexample token."
      />
    </p>
  );
};
