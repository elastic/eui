import React from 'react';

import { EuiI18nNumber } from '../../../../src/components';

export default () => {
  return (
    <p>
      Formatted count of users: <EuiI18nNumber value={5000000} />
    </p>
  );
};
