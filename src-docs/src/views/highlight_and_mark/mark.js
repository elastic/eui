import React, { Fragment } from 'react';

import { EuiMark } from '../../../../src/components';

export function Mark() {
  return (
    <Fragment>
      The quick brown fox <EuiMark>jumped over</EuiMark> the lazy dog
    </Fragment>
  );
}
