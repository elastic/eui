/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';

import { EuiTableHeaderMobile } from './table_header_mobile';

describe('EuiTableHeaderMobile', () => {
  test('is rendered', () => {
    const { container } = render(<EuiTableHeaderMobile {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
