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

import { EuiCode } from './code';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCode', () => {
  test('renders a code snippet', () => {
    const component = render(<EuiCode {...requiredProps}>{code}</EuiCode>);

    expect(component).toMatchSnapshot();
  });
});
