/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiSpacer } from './spacer';

describe('EuiSpacer', () => {
  test('is rendered', () => {
    const component = render(<EuiSpacer {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiSpacer />);
});
